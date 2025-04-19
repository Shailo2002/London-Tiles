import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  console.log("confirm-order route starting");
  const body = await req.json();
  const { orderId } = body;


  try {
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Order not found' }, 
        { status: 404 }
      );
    }

    if (existingOrder.status === 'placed') {
      return NextResponse.json(
        { success: true, message: 'Order already confirmed' },
        { status: 200 }
      );
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'placed' },
    });

    return NextResponse.json({ success: true, updated });

  } catch (err) {
    console.error('Error updating order:', err);
    return NextResponse.json(
      { 
        error: 'Failed to update order', 
        details: err instanceof Error ? err.message : 'Unknown error' // Type-safe error handling
      },
      { status: 500 }
    );
  }
}