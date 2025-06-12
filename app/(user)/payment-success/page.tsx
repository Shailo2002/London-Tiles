"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/lib/context/CartContext";
import Image from "next/image";

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
      <div className="w-full max-w-md border-2 border-blue-300 dark:border-blue-700 rounded-2xl p-8 shadow-lg bg-white dark:bg-zinc-900">
        <div className="flex flex-col items-center text-center">
          {/* <Image
            src="/success.png"
            alt="success"
            width={128}
            height={128}
            className="w-32 h-32"
          /> */}
          <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-3">
            Processing Payment via PayPal
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please wait while we confirm your order. Do not refresh or close
            this tab.
          </p>

          <div className="flex space-x-2 mt-4">
            <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" />
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
