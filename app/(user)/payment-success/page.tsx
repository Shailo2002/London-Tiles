"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface OrderItem {
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
}

// Extend jsPDF type with autoTable plugin
interface CustomJsPDF extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

export default function ThankYouPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order/${orderId}`);
        const data = await res.json();
        if (res.ok) {
          setOrder(data.order);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
        setIsError(true);
      }
    };

    fetchOrder();
  }, [orderId]);

  const downloadInvoice = () => {
    if (!order) return;

    const doc = new jsPDF() as CustomJsPDF;
    doc.text("Invoice", 14, 20);
    doc.text(`Order ID: ${order.id}`, 14, 30);
    doc.text(`Customer: ${order.customerName}`, 14, 40);

    autoTable(doc, {
      startY: 50,
      head: [["Product", "Qty", "Price"]],
      body: order.items.map((item) => [
        item.title,
        item.quantity,
        `₹${item.price}`,
      ]),
    });

    const finalY = doc.lastAutoTable?.finalY || 50;
    doc.text(`Total: ₹${order.total}`, 14, finalY + 10);
    doc.save(`Invoice-${order.id}.pdf`);
  };

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">Order not found.</div>
    );
  }

  if (!order) {
    return <div className="text-center py-20">Loading your bill...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <div className="border rounded-xl p-6 shadow-md bg-white">
        <h1 className="text-2xl font-bold mb-4 text-green-700">
          Thank you for your purchase!
        </h1>
        <p className="text-gray-700 mb-6">
          Your order was successful. Here&apos;s your bill:
        </p>

        <ul className="mb-4">
          {order.items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between text-sm border-b py-2"
            >
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>₹{item.price}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>₹{order.total}</span>
        </div>

        <button
          onClick={downloadInvoice}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Download Invoice as PDF
        </button>
      </div>
    </div>
  );
}
