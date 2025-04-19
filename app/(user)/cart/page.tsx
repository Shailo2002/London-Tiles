"use client";

import { useCart } from "@/lib/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="w-full min-h-screen pt-20">
        <div className="container mx-auto px-6 md:px-12 py-12">
          <h1 className="text-4xl md:text-5xl font-light mb-6">Your Cart</h1>
          <div className="text-center py-16">
            <p className="text-gray-600 mb-6 text-lg">Your cart is empty</p>
            <Link
              href="/"
              className="inline-block border border-black text-black px-8 py-3 hover:bg-black hover:text-white transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-20">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <h1 className="text-4xl md:text-5xl font-light mb-12">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="relative w-24 h-24 overflow-hidden rounded-md">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-light text-lg mb-2">{item.name}</h3>
                    <div className="text-sm text-gray-600 mb-3 space-y-1">
                      {Object.entries(item.options).map(([key, value]) => (
                        <div key={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                        </div>
                      ))}
                    </div>
                    <div className="font-medium text-blue-600">
                      £{item.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-black transition-colors text-sm"
                    >
                      Remove
                    </button>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200">
                      <button
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-light mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">£{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-medium text-blue-600">
                    £{total.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
