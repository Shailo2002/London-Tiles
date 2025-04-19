// dashboard/page.tsx
"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

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
  const [email, setEmail] = useState("");
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
        setEmail(emailParam);
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
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar */}
        <div className="w-full md:w-1/4">
          <nav className="bg-gray-50 p-4 rounded-lg">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full text-left p-2 ${
                    activeTab === "dashboard"
                      ? "text-green-600 font-medium"
                      : ""
                  }`}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left p-2 ${
                    activeTab === "orders" ? "text-green-600 font-medium" : ""
                  }`}
                >
                  Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("downloads")}
                  className={`w-full text-left p-2 ${
                    activeTab === "downloads"
                      ? "text-green-600 font-medium"
                      : ""
                  }`}
                >
                  Downloads
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full text-left p-2 ${
                    activeTab === "addresses"
                      ? "text-green-600 font-medium"
                      : ""
                  }`}
                >
                  Addresses
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn");
                    router.push("/login");
                  }}
                  className="w-full text-left p-2"
                >
                  Log out
                </button>
              </li>
            </ul>
          </nav>

          {/* Interested items section */}
          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Find Products</h3>
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="flex-1 border rounded-l-md px-4 py-2"
              />
              <button
                onClick={handleSearch}
                className="bg-green-600 text-white px-4 py-2 rounded-r-md"
              >
                Search
              </button>
            </div>

            {interestedItems.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Found Items:</h4>
                <ul className="space-y-2">
                  {interestedItems.map((item) => (
                    <li key={item.id} className="border-b pb-2">
                      <Link
                        href={`/product/${item.id}`}
                        className="hover:text-green-600"
                      >
                        {item.name}
                      </Link>
                      <div className="text-sm text-gray-500">
                        £{item.priceIncVAT.toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          {activeTab === "dashboard" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
              <p>
                Hello, <strong>{email}</strong> (not {email}?{" "}
                <button
                  className="text-green-600"
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn");
                    router.push("/login");
                  }}
                >
                  Log out
                </button>
                )
              </p>
              <p className="mt-4">
                From your account dashboard you can view your recent orders,
                manage your shipping and billing addresses, and more.
              </p>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Orders</h2>

              {loading ? (
                <p>Loading orders...</p>
              ) : orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4">Order</th>
                        <th className="text-left py-4">Date</th>
                        <th className="text-left py-4">Status</th>
                        <th className="text-left py-4">Total</th>
                        <th className="text-left py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="py-4">
                            <Link
                              href={`/order/${order.id}`}
                              className="text-green-600"
                            >
                              #{order.id.substring(0, 6)}
                            </Link>
                          </td>
                          <td className="py-4">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </td>
                          <td
                            className={`py-4 ${getStatusClass(order.status)}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1).replace("_", " ")}
                          </td>
                          <td className="py-4">
                            £{order.total.toFixed(2)} for {order.items.length}{" "}
                            items
                          </td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              {order.status === "payment_failed" && (
                                <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">
                                  Pay
                                </button>
                              )}
                              <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">
                                View
                              </button>
                              {order.status === "pending" && (
                                <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">
                                  Cancel
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "downloads" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Downloads</h2>
              <p>No downloads available.</p>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Addresses</h2>
              <p>
                The following addresses will be used on the checkout page by
                default.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Billing Address</h3>
                  <p>You have not set up this type of address yet.</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
                  <p>You have not set up this type of address yet.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
