"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";
import { svg2pdf } from "svg2pdf.js";

interface OrderItem {
  id: string;
  name?: string;
  quantity: number;
  price: number;
  height: string;
  length: string;
  thickness: string;
  finish: string;
  rebate: string;
}

interface BillingAddress {
  firstName: string;
  lastName: string;
  street?: string;
  city: string;
  postcode: string;
  country: string;
  email: string;
  company?: string | null;
}

interface Order {
  id: string;
  total: number;
  subtotal: number;
  vat: number;
  shipping: string | null;
  billingAddress: BillingAddress;
  items: OrderItem[];
}

export default function ThankYouPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order/${orderId}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        if (!data.order) throw new Error("Order not found");

        setOrder(data.order);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const downloadInvoice = async () => {
    if (!order) return;

    setIsGeneratingInvoice(true);

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    doc.save(`invoice-${order.id}.pdf`);

    setIsGeneratingInvoice(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen relative bg-white dark:bg-zinc-900 transition-colors duration-300">
        <div className="absolute top-1/3 flex flex-col items-center">
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            Loading your order...
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-300">
        <p className="text-red-500 dark:text-red-400">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl bg-white dark:bg-zinc-900 transition-colors duration-300">
      <div className="border rounded-xl p-6 shadow-md bg-white dark:bg-zinc-800 dark:border-zinc-700 transition-colors duration-300">
        <h1 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
          Thank you for your purchase!
        </h1>

        <div className="mb-4 space-y-2 text-gray-800 dark:text-gray-300">
          <p>
            <span className="font-semibold">Order ID:</span> {order.id}
          </p>
          <p>
            <span className="font-semibold">Customer:</span>{" "}
            {order.billingAddress.firstName} {order.billingAddress.lastName}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {order.billingAddress.email}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Items:
          </h2>
          <ul className="space-y-4">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="border-b pb-4 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Specifications:</p>
                    <p className="text-sm">
                      {item.height}H × {item.length}L × {item.thickness}T
                    </p>
                    <p className="text-sm">
                      {item.finish} Finish{item.rebate && `, ${item.rebate}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>Qty: {item.quantity}</p>
                    <p>£{item.price.toFixed(2)} each</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 border-t pt-4 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>£{order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>VAT:</span>
            <span>£{order.vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>{order.shipping || "Free"}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>£{order.total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={downloadInvoice}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          {isGeneratingInvoice ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            "Download Invoice"
          )}
        </button>
      </div>
    </div>
  );
}
