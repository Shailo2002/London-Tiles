"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// This component will use the search params after suspense
function CancelledContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [isProcessed, setIsProcessed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId && !isProcessed) {
      const cancelOrder = async () => {
        try {
          const response = await fetch("/api/payement-cancelled", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId }),
          });
          const data = await response.json();
          if (data.success) {
            setIsProcessed(true);
          } else {
            setError(data.error || "Failed to process cancellation");
          }
        } catch (error) {
          console.error("Error processing cancellation:", error);
          setError("An error occurred while processing your cancellation");
        }
      };
      cancelOrder();
    }
  }, [orderId, isProcessed]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold mb-4">
        {error ? "Error" : "Payment Cancelled"}
      </h1>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <p>
          {isProcessed
            ? "Your payment was cancelled successfully. Please try again if you wish to complete your purchase."
            : "Processing cancellation..."}
        </p>
      )}
    </div>
  );
}

// Main page component
export default function PaymentCancelledPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8 text-center">
          Loading...
        </div>
      }
    >
      <CancelledContent />
    </Suspense>
  );
}
