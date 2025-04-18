import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  console.log("confirm-order route starting");
  const body = await req.json();
  const { orderId } = body;

  console.log("Received orderId:", orderId);

  try {
    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!existingOrder) {
      console.log("Order not found");
      return NextResponse.json(
        { error: 'Order not found' }, 
        { status: 404 }
      );
    }

    // Prevent redundant updates
    if (existingOrder.status === 'placed') {
      console.log("Order already confirmed");
      return NextResponse.json(
        { success: true, message: 'Order already confirmed' },
        { status: 200 }
      );
    }

    // Update order status
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'placed' },
    });

    console.log("Order updated successfully:", updated);
    return NextResponse.json({ success: true, updated });

  } catch (err) {
    console.error('Error updating order:', err);
    return NextResponse.json(
      { error: 'Failed to update order', details: err.message }, 
      { status: 500 }
    );
  }
}