import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getProducts } from '@/lib/product';


export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Check if product with same name already exists
    const existingProduct = await prisma.products.findUnique({
  where: { name: formData.get('name') as string },
});

if (existingProduct) {
  return NextResponse.json(
    { error: 'Product with this name already exists' },
    { status: 409 } // 409 Conflict
  );
}
    const imageFiles = formData.getAll('image') as File[];

    const tmpDir = path.join(process.cwd(), 'tmp');

    // Create tmp directory if not exists
    try {
      await fs.mkdir(tmpDir, { recursive: true });
    } catch (e) {
      console.error('Error creating tmp directory:', e);
    }

    const uploadResults = await Promise.all(
      imageFiles.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const tmpPath = path.join(tmpDir, file.name);
        await fs.writeFile(tmpPath, buffer);

        const uploadRes = await cloudinary.uploader.upload(tmpPath, {
          folder: 'london-tiles/products',
        });

        // Delete temp file after upload
        await fs.unlink(tmpPath);

        return uploadRes.secure_url;
      })
    );

    const imageUrls = uploadResults;

const newProduct = await prisma.products.create({
  data: {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    productCategory: formData.get('productCategory') as string,
    image: imageUrls,
    Height: JSON.parse(formData.get('Height') as string),
    Length: JSON.parse(formData.get('Length') as string),
    Thickness: JSON.parse(formData.get('Thickness') as string),
    Finish: JSON.parse(formData.get('Finish') as string),
    Rebate: JSON.parse(formData.get('Rebate') as string),
    priceIncVAT: parseFloat(formData.get('priceIncVAT') as string),
    priceExVAT: parseFloat(formData.get('priceExVAT') as string),
  },
});

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
