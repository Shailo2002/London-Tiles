"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";
import { svg2pdf } from "svg2pdf.js";

// Interfaces remain the same...
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

    const primaryColor: [number, number, number] = [23, 55, 94];
    doc.setFillColor(250, 250, 250);
    doc.rect(0, 0, 210, 297, "F");

    // Create SVG element
    const svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElement.setAttribute("width", "210");
    svgElement.setAttribute("height", "50");
    svgElement.setAttribute("viewBox", "0 0 1200 150");

    const path1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path1.setAttribute("fill", "#173B5E");
    path1.setAttribute(
      "d",
      "M0,0 L1200,0 L1200,50 C900,120 600,30 300,90 C150,120 50,90 0,70 Z"
    );

    const path2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path2.setAttribute("fill", "white");
    path2.setAttribute(
      "d",
      "M0,70 C50,90 150,120 300,90 C600,30 900,120 1200,50 L1200,150 L0,150 Z"
    );

    svgElement.appendChild(path1);
    svgElement.appendChild(path2);

    // Render SVG
    await svg2pdf(svgElement, doc, {
      x: 0,
      y: 0,
      width: 210,
      height: 50,
    });

    // Now continue with your jsPDF rendering logic...
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text("LONDON", 20, 20);
    doc.text("TILES", 20, 25);

    doc.setFontSize(24);
    doc.text("Invoice", 150, 25);

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("Invoice to", 20, 60);

    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text(
      `${order.billingAddress.firstName} ${order.billingAddress.lastName}`,
      20,
      67
    );
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(order.billingAddress.street || "Address Line 1", 20, 74);
    doc.text(order.billingAddress.city || "Building Name", 20, 79);
    doc.text(order.billingAddress.country || "Country", 20, 84);

    doc.setFontSize(11);
    doc.setTextColor(100, 10, 100);
    doc.text("Invoice #", 100, 60);
    doc.text("Date", 100, 67);
    doc.setTextColor(0, 0, 0);
    doc.text(order.id || "12345", 120, 60);
    doc.text(new Date().toLocaleDateString("en-GB"), 120, 67);

    // Table header
    doc.setFillColor(...primaryColor);
    doc.rect(20, 95, 170, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("SL.", 25, 101);
    doc.text("Item Description", 55, 101);
    doc.text("Price", 130, 101);
    doc.text("Qty.", 145, 101);
    doc.text("Total", 165, 101);

    let y = 110;
    doc.setTextColor(0, 0, 0);

    order.items.forEach((item, index) => {
      doc.text((index + 1).toString(), 25, y);

      const description = item.name || "Tile Product";
      const dimensions = `${item.height}H × ${item.length}L × ${item.thickness}T`;
      const finish = `${item.finish}${item.rebate ? ` / ${item.rebate}` : ""}`;

      doc.text(description, 45, y);
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(dimensions, 45, y + 5);
      doc.text(finish, 45, y + 10);

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`£${item.price.toFixed(2)}`, 130, y);
      doc.text(item.quantity.toString(), 145, y);
      doc.text(`£${(item.quantity * item.price).toFixed(2)}`, 165, y);

      y += 15;
      doc.setDrawColor(220, 220, 220);
      doc.line(20, y, 190, y);
      y += 5;
    });

    y += 10;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(12);
    doc.text("Payment info:", 20, y);
    y += 8;

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text("Account #", 20, y);
    doc.text("3256 2295 2020", 60, y);
    y += 6;
    doc.text("A/C Name", 20, y);
    doc.text("London Tiles Ltd", 60, y);
    y += 6;
    doc.text("Bank Details", 20, y);
    doc.text("Barclays Bank", 60, y);

    // Totals
    doc.setTextColor(100, 100, 100);
    doc.text("Sub Total:", 140, y - 12);
    doc.text("Tax:", 140, y - 6);
    doc.setLineWidth(0.5);
    doc.line(140, y + 2, 190, y + 2);
    doc.setTextColor(...primaryColor);
    doc.setFontSize(12);
    doc.text("Total:", 140, y + 8);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`£${order.subtotal.toFixed(2)}`, 170, y - 12);
    doc.text(`${((order.vat / order.subtotal) * 100).toFixed(2)}%`, 170, y - 6);
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.text(`£${order.total.toFixed(2)}`, 170, y + 8);

    // Terms
    y += 20;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(11);
    doc.text("Terms & Conditions", 20, y);
    y += 6;
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.text(
      "Goods sold are non-refundable. Warranty valid for 12 months from purchase date.",
      20,
      y
    );
    doc.line(20, y + 5, 190, y + 5);
    doc.setTextColor(...primaryColor);
    doc.text("Authorised Sign", 160, y + 15);

    // Footer
    y = 270;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(20, y, 170, 15, 2, 2, "F");

    for (let i = 0; i < 4; i++) {
      doc.setFillColor(100, 100, 100);
      doc.circle(80 + i * 10, y + 7.5, 2.5, "F");
    }

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.text("www.londontiles.co.uk", 140, y + 8);

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
