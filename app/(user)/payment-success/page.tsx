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
            router.replace("/thank-you");
          }
        } catch (error) {
          console.error("Confirmation failed:", error);
        }
      };
      confirmOrder();
    }
  }, [orderId, isConfirmed, clearCart, router]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Processing your payment...</h1>
      <p>Please wait while we confirm your order.</p>
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
