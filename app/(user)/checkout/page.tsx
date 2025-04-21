"use client";

import { useState } from "react";
import { useCart } from "@/lib/context/CartContext";

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
          shipping: "Free",
        }),
      });

      const data = await response.json();
      console.log("data", data);

      if (data.success) {
        // ⏩ Redirect to PayPal
        window.location.href = data.paypalUrl;
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="w-full min-h-screen pt-20">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-light mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between pb-4 last:pb-0 border-b last:border-b-0"
                >
                  <div>
                    <p className="font-light text-lg">{item.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Quantity: {item.quantity} | Height: {item.options.height}
                      mm | Length: {item.options.length}mm
                    </p>
                  </div>
                  <p className="font-medium text-blue-600">
                    £{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VAT (20%)</span>
                  <span>£{vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-medium pt-3 border-t">
                  <span>Total</span>
                  <span className="text-blue-600">£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Address Forms */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-light mb-6">Billing Address</h2>
              <AddressForm
                address={billingAddress}
                setAddress={setBillingAddress}
              />
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="differentShipping"
                  checked={differentShippingAddress}
                  onChange={(e) =>
                    setDifferentShippingAddress(e.target.checked)
                  }
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="differentShipping" className="font-light">
                  Ship to a different address?
                </label>
              </div>

              {differentShippingAddress && (
                <div>
                  <h2 className="text-2xl font-light mb-6">Shipping Address</h2>
                  <AddressForm
                    address={shippingAddress}
                    setAddress={setShippingAddress}
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleProceedToPayment}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddressForm({
  address,
  setAddress,
}: {
  address: AddressFormData;
  setAddress: (address: AddressFormData) => void;
}) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm text-gray-600 mb-1"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={address.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm text-gray-600 mb-1"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={address.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm text-gray-600 mb-1">
          Company Name (Optional)
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={address.company}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="street1" className="block text-sm text-gray-600 mb-1">
          Street Address *
        </label>
        <input
          type="text"
          id="street1"
          name="street1"
          value={address.street1}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="street2" className="block text-sm text-gray-600 mb-1">
          Apartment, suite, etc. (Optional)
        </label>
        <input
          type="text"
          id="street2"
          name="street2"
          value={address.street2}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm text-gray-600 mb-1">
            City *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="postcode"
            className="block text-sm text-gray-600 mb-1"
          >
            Postcode *
          </label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={address.postcode}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="country" className="block text-sm text-gray-600 mb-1">
          Country *
        </label>
        <select
          id="country"
          name="country"
          value={address.country}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors"
        >
          <option value="">Select a country</option>
          <option value="United Kingdom">United Kingdom</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={address.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
