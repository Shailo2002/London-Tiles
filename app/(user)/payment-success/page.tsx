"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/lib/context/CartContext";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const router = useRouter();
  const { clearCart } = useCart();
  const [isConfirmed, setIsConfirmed] = useState(false); // Track confirmation state

  useEffect(() => {
    if (orderId && !isConfirmed) {
      console.log("Initiating order confirmation for:", orderId);

      const confirmOrder = async () => {
        try {
          const res = await fetch("/api/confirm-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId }),
          });

          const data = await res.json();
          console.log("Confirmation response:", data);

          if (data.success) {
            clearCart();
            setIsConfirmed(true); // Block future runs
            router.replace("/thank-you"); // Remove orderId from URL
          }
        } catch (error) {
          console.error("Confirmation failed:", error);
        }
      };

      confirmOrder();
    }
  }, [orderId, isConfirmed, clearCart, router]); // Key dependency: isConfirmed

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Processing your payment...</h1>
      <p>Please wait while we confirm your order.</p>
    </div>
  );
}
