import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

export async function GET() {
  try {
    const products = await prisma.products.findMany({
      include: {
        variants: true,
      },
    });
    return NextResponse.json({ products });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const productCategory = formData.get('productCategory') as string;
    const variantsStr = formData.get('variants') as string;
    
    // Parse the variants array
    const variants = JSON.parse(variantsStr) as Array<{
      height: string;
      length: string;
      thickness: string;
      priceIncVAT: string;
      priceExVAT: string;
    }>;

    const slug = slugify(name, { lower: true });

    // Check for existing product
    const existingProduct = await prisma.products.findUnique({
      where: { slug },
    });
    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this name already exists' },
        { status: 409 }
      );
    }

    // Handle image uploads
    const imageFiles = formData.getAll('images') as File[];
    const tmpDir = path.join(process.cwd(), 'tmp');
    await fs.mkdir(tmpDir, { recursive: true });

    const imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const tmpPath = path.join(tmpDir, file.name);
        await fs.writeFile(tmpPath, buffer);

        const uploadRes = await cloudinary.uploader.upload(tmpPath, {
          folder: 'london-tiles/products',
        });

        await fs.unlink(tmpPath);
        return uploadRes.secure_url;
      })
    );

    // Create product with variants
    const newProduct = await prisma.products.create({
      data: {
        name,
        slug,
        description,
        category: productCategory,
        images: imageUrls,
        variants: {
          create: variants.map(variant => ({
            id: uuidv4(),
            height: variant.height,
            length: variant.length,
            thickness: variant.thickness,
            priceIncVAT: parseFloat(variant.priceIncVAT),
            priceExVAT: parseFloat(variant.priceExVAT),
            stock: 0,
          })),
        },
      },
      include: { variants: true },
    });

    return NextResponse.json({ 
      success: true, 
      product: newProduct 
    }, { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create product', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}