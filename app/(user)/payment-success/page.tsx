"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/lib/context/CartContext";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const router = useRouter();
  const { clearCart } = useCart();
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (orderId && !isConfirmed) {
      const confirmOrder = async () => {
        try {
          const res = await fetch("/api/confirm-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId }),
          });

          const data = await res.json();

          if (data.success) {
            clearCart();
            setIsConfirmed(true);
            router.replace(`/thank-you/${orderId}`);

          }
        } catch (error) {
          console.error("Confirmation failed:", error);
        }
      };
      confirmOrder();
    }
  }, [orderId, isConfirmed, clearCart, router]);

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
      <div className="w-full max-w-md border-2 border-blue-300 rounded-2xl p-8 shadow-lg bg-white">
        <div className="flex flex-col items-center text-center">
          <img
            src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
            alt="PayPal Logo"
            className="w-20 h-20 mb-6 animate-pulse"
          />
          <h1 className="text-2xl font-semibold text-blue-700 mb-3">
            Processing Payment via PayPal
          </h1>
          <p className="text-gray-600 mb-6">
            Please wait while we confirm your order. Do not refresh or close
            this tab.
          </p>

          {/* Bouncing dots loader */}
          <div className="flex space-x-2 mt-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
