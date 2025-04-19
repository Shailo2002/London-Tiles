import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    console.log('Payment cancelled backend ');
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

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'payment_failed' },
    });

    return NextResponse.json({ success: true, updated });

  } catch (err) {
    console.error('Error updating order:', err);
    return NextResponse.json(
      { 
        error: 'Failed to update order', 
        details: err instanceof Error ? err.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}