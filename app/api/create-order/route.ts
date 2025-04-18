import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import paypal from '@paypal/checkout-server-sdk';

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID!,
  process.env.PAYPAL_CLIENT_SECRET!
);
const client = new paypal.core.PayPalHttpClient(environment);

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

    const user = await prisma.user.upsert({
      where: { email: billingAddress.email },
      update: {},
      create: { email: billingAddress.email },
    });

    const billingAddressRecord = await prisma.address.create({ data: billingAddress });

    let shippingAddressRecord = billingAddressRecord;
    if (JSON.stringify(billingAddress) !== JSON.stringify(shippingAddress)) {
      shippingAddressRecord = await prisma.address.create({ data: shippingAddress });
    }

    const order = await prisma.order.create({
      data: {
        userId: user.id,
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
            height: item.options?.height,
            length: item.options?.length,
            thickness: item.options?.thickness,
            finish: item.options?.finish,
            rebate: item.options?.rebate,
          })),
        },
      },
    });

    // 🔁 Create PayPal Order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: "GBP",
          value: total.toFixed(2),
        },
        custom_id: order.id, // so you can use it later in webhook
      }],
      application_context: {
        return_url: `http://localhost:3000/payment-success?orderId=${order.id}`,
        cancel_url: `http://localhost:3000/payment-cancelled`,
      },
    });

    const paypalOrder = await client.execute(request);
    
    // Update the order with PayPal's order ID
    await prisma.order.update({
      where: { id: order.id },
      data: { 
        paypalOrderId: paypalOrder.result.id 
      }
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      paypalUrl: paypalOrder.result.links.find((link: any) => link.rel === "approve").href,
    });

  } catch (error) {
    console.error("Error in create-order route:", error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
