import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const {
      items,
      billingAddress,
      shippingAddress,
      subtotal,
      vat,
      total,
      shipping
    } = await req.json();

    // First, create or get user using billing address email
    const user = await prisma.user.upsert({
      where: { 
        email: billingAddress.email 
      },
      update: {}, // No updates if user exists
      create: {
        email: billingAddress.email,
      },
    });

    // Create billing address
    const billingAddressRecord = await prisma.address.create({
      data: billingAddress,
    });

    // Create shipping address if different
    let shippingAddressRecord = billingAddressRecord;
    if (shippingAddress !== billingAddress) {
      shippingAddressRecord = await prisma.address.create({
        data: shippingAddress,
      });
    }

    // Create order with user association
    const order = await prisma.order.create({
      data: {
        userId: user.id, // Now we associate the order with the user
        status: 'pending',
        subtotal,
        shipping,
        vat,
        total,
        billingAddressId: billingAddressRecord.id,
        shippingAddressId: shippingAddressRecord.id,
        items: {
          create: items.map((item: any) => ({
            quantity: item.quantity,
            price: item.price,
            height: item.height,
            length: item.length,
            thickness: item.thickness,
            finish: item.finish,
            rebate: item.rebate,
          })),
        },
      },
    });

    // Initialize PayPal payment
    // Replace with your PayPal integration code
    const paypalUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${order.id}`;

    return NextResponse.json({
      success: true,
      orderId: order.id,
      paypalUrl,
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}