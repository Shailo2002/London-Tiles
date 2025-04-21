import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Remove the await from params destructuring
    const id = (await params).id
    
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        billingAddress: true,
        items: true
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      order: {
        id: order.id,
        total: order.total,
        subtotal: order.subtotal,
        vat: order.vat,
        shipping: order.shipping,
        billingAddress: order.billingAddress,
        items: order.items
      }
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}