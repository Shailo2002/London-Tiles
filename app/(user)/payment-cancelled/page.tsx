"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "lucide-react";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto mb-4 text-red-600 dark:text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12A9 9 0 103 12a9 9 0 0018 0z"
          />
        </svg>
        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          {error ? "Error" : "Payment Cancelled"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {error
            ? error
            : isProcessed
            ? "Your payment has been cancelled. You can retry if you'd like to complete your purchase."
            : "Processing cancellation..."}
        </p>
        <Link
          href="/"
          className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default function PaymentCancelledPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
          <div className="text-gray-700 dark:text-gray-300">Loading...</div>
        </div>
      }
    >
      <CancelledContent />
    </Suspense>
  );
}
