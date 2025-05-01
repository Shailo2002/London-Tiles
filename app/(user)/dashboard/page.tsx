// dashboard/page.tsx
"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  height: string;
  length: string;
  thickness: string;
  finish: string;
  rebate: string;
}

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

interface Product {
  id: string;
  name: string;
  priceIncVAT: number;
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [interestedItems, setInterestedItems] = useState<Product[]>([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      const emailParam = searchParams.get("email");
      if (emailParam) {
        fetchOrders(emailParam);
      }
    }
  }, [router, searchParams]);

  async function fetchOrders(email: string) {
    try {
      setLoading(true);
      const response = await fetch(`/api/orders?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(`/api/products/search?q=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setInterestedItems(data);
      }
    } catch (error) {
      console.error("Failed to search products:", error);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "placed":
        return "text-green-600";
      case "payment_failed":
      case "failed":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      default:
        return "";
    }
  };

  return (
    <div className="w-full min-h-screen pt-24 bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-light mb-8">My Account</h1>
        </div>
        <div className="mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`py-4 px-6 font-light ${
                activeTab === "orders"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
            <button
              className={`py-4 px-6 font-light ${
                activeTab === "search"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("search")}
            >
              Search Products
            </button>
          </div>
        </div>

        {activeTab === "orders" && (
          <div>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Loading orders...
                </p>
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm bg-white dark:bg-gray-800"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-light text-black dark:text-white">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-black dark:text-white">
                          £{order.total.toFixed(2)}
                        </p>
                        <p
                          className={`text-sm ${getStatusClass(order.status)}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm text-black dark:text-white"
                        >
                          <div>
                            <p>Quantity: {item.quantity}</p>
                            <p>
                              Height: {item.height}mm | Length: {item.length}mm
                              | Thickness: {item.thickness}mm
                            </p>
                          </div>
                          <p className="font-medium">
                            £{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No orders found.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "search" && (
          <div>
            <div className="mb-8">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-black dark:focus:border-white focus:ring-0 transition-colors"
                />
                <button
                  onClick={handleSearch}
                  className="border border-black dark:border-white text-black dark:text-white px-6 py-3 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {interestedItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interestedItems.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm bg-white dark:bg-gray-800"
                  >
                    <h3 className="text-lg font-light mb-2 text-black dark:text-white">
                      {product.name}
                    </h3>
                    <p className="font-medium mb-4 text-black dark:text-white">
                      £{product.priceIncVAT.toFixed(2)}
                    </p>
                    <Link href={`/product/${product.id}`}>
                      <button className="w-full border border-black dark:border-white text-black dark:text-white py-2 px-4 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors">
                        View Product
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery
                    ? "No products found matching your search."
                    : "Search for products to see results."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
