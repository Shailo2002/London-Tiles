// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        orders: {
          include: {
            items: true,
            billingAddress: true,
            shippingAddress: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Map orders to a simpler format for the frontend
    const formattedOrders = user.orders.map(order => ({
      id: order.id,
      paypalOrderId: order.paypalOrderId,
      status: order.status,
      subtotal: order.subtotal,
      shipping: order.shipping,
      vat: order.vat,
      total: order.total,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items: order.items,
      billingAddress: order.billingAddress,
      shippingAddress: order.shippingAddress
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}