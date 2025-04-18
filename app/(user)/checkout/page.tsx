"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/context/CartContext";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  height: number;
  length: number;
}

interface AddressFormData {
  firstName: string;
  lastName: string;
  company?: string;
  street1: string;
  street2?: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  email: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, subtotal, vat } = useCart();
  const [differentShippingAddress, setDifferentShippingAddress] =
    useState(false);
  const [billingAddress, setBillingAddress] = useState<AddressFormData>({
    firstName: "",
    lastName: "",
    street1: "",
    city: "",
    postcode: "",
    country: "",
    phone: "",
    email: "",
  });
  const [shippingAddress, setShippingAddress] = useState<AddressFormData>({
    firstName: "",
    lastName: "",
    street1: "",
    city: "",
    postcode: "",
    country: "",
    phone: "",
    email: "",
  });

  const handleProceedToPayment = async () => {
    try {
      // Create order in the database
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          billingAddress,
          shippingAddress: differentShippingAddress
            ? shippingAddress
            : billingAddress,
          subtotal,
          vat,
          total,
          shipping: "Free", // You can modify this based on your shipping logic
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to PayPal payment
        window.location.href = data.paypalUrl;
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity} | Height: {item.options.height}mm |
                    Length: {item.options.length}mm
                  </p>
                </div>
                <p className="font-medium">
                  £{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>£{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>VAT:</p>
                <p>£{vat.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Total:</p>
                <p>£{total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Address Forms */}
        <div className="space-y-8">
          {/* Billing Address Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Billing Address</h2>
            <AddressForm
              address={billingAddress}
              setAddress={setBillingAddress}
            />
          </div>

          {/* Different Shipping Address Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="differentShipping"
              checked={differentShippingAddress}
              onChange={(e) => setDifferentShippingAddress(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="differentShipping">
              Deliver to a different address?
            </label>
          </div>

          {/* Shipping Address Form */}
          {differentShippingAddress && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
              <AddressForm
                address={shippingAddress}
                setAddress={setShippingAddress}
              />
            </div>
          )}

          <button
            onClick={handleProceedToPayment}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}

// Address Form Component
function AddressForm({
  address,
  setAddress,
}: {
  address: AddressFormData;
  setAddress: (address: AddressFormData) => void;
}) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={address.firstName}
          onChange={(e) =>
            setAddress({ ...address, firstName: e.target.value })
          }
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={address.lastName}
          onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
          className="border p-2 rounded"
          required
        />
      </div>
      <input
        type="text"
        placeholder="Company (optional)"
        value={address.company || ""}
        onChange={(e) => setAddress({ ...address, company: e.target.value })}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Street Address"
        value={address.street1}
        onChange={(e) => setAddress({ ...address, street1: e.target.value })}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Apartment, suite, etc. (optional)"
        value={address.street2 || ""}
        onChange={(e) => setAddress({ ...address, street2: e.target.value })}
        className="border p-2 rounded w-full"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={address.postcode}
          onChange={(e) => setAddress({ ...address, postcode: e.target.value })}
          className="border p-2 rounded"
          required
        />
      </div>
      <input
        type="text"
        placeholder="Country"
        value={address.country}
        onChange={(e) => setAddress({ ...address, country: e.target.value })}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={address.phone}
        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={address.email}
        onChange={(e) => setAddress({ ...address, email: e.target.value })}
        className="border p-2 rounded w-full"
        required
      />
    </form>
  );
}
