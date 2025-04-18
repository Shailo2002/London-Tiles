import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const paypalData = await req.json();
    
    // Verify PayPal webhook signature (implement PayPal's verification logic)
    
    // Extract order ID from PayPal data
    const orderId = paypalData.resource.custom_id;
    
    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'placed' },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PayPal webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process PayPal webhook' },
      { status: 500 }
    );
  }
}