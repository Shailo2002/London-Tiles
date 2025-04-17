import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    const product = await prisma.products.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, deleted: product });
  } catch (error) {
    console.error("Delete Product Error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  try {
    const body = await req.json();
    const updated = await prisma.products.update({
      where: { id: params.id },
      data: {
        ...body, // must include valid keys
        updatedAt: new Date(),
      },
    });
    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("Update Product Error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
