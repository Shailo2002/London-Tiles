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

  const validateAddress = (address: AddressFormData, type: string) => {
    const requiredFields = [
      "firstName",
      "lastName",
      "street1",
      "city",
      "postcode",
      "country",
      "phone",
      "email",
    ];

    for (const field of requiredFields) {
      if (!address[field as keyof AddressFormData]?.trim()) {
        alert(`${type} field "${field}" is required.`);
        return false;
      }
    }
    return true;
  };

  const handleProceedToPayment = async () => {
    const isBillingValid = validateAddress(billingAddress, "Billing");
    const isShippingValid =
      !differentShippingAddress || validateAddress(shippingAddress, "Shipping");

    if (!isBillingValid || !isShippingValid) return;

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
      if (data.success) {
        window.location.href = data.paypalUrl;
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  return (
    <div className="w-full min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Dark mode toggle */}
      <button
        onClick={() => document.documentElement.classList.toggle("dark")}
        className="absolute top-4 right-4 text-xs border px-3 py-1 rounded bg-white dark:bg-gray-800 dark:text-white"
      >
        Toggle Dark
      </button>

      <div className="container mx-auto px-6 md:px-12 py-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-light mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between pb-4 last:pb-0 border-b last:border-b-0 border-gray-300 dark:border-gray-700"
                >
                  <div>
                    <p className="font-light text-lg">{item.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Quantity: {item.quantity} | Height: {item.options.height}
                      mm | Length: {item.options.length}mm
                    </p>
                  </div>
                  <p className="font-medium text-blue-600 dark:text-blue-400">
                    £{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="border-t border-gray-300 dark:border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    VAT (20%)
                  </span>
                  <span>£{vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Shipping
                  </span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-medium pt-3 border-t border-gray-300 dark:border-gray-700">
                  <span>Total</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    £{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Address Forms */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-light mb-6">Billing Address</h2>
              <AddressForm
                address={billingAddress}
                setAddress={setBillingAddress}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="differentShipping"
                  checked={differentShippingAddress}
                  onChange={(e) =>
                    setDifferentShippingAddress(e.target.checked)
                  }
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
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
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors font-medium"
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
        <Input
          label="First Name *"
          name="firstName"
          value={address.firstName}
          onChange={handleChange}
          required
        />
        <Input
          label="Last Name *"
          name="lastName"
          value={address.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        label="Company Name (Optional)"
        name="company"
        value={address.company || ""}
        onChange={handleChange}
      />

      <Input
        label="Street Address *"
        name="street1"
        value={address.street1}
        onChange={handleChange}
        required
      />
      <Input
        label="Apartment, suite, etc. (Optional)"
        name="street2"
        value={address.street2 || ""}
        onChange={handleChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="City *"
          name="city"
          value={address.city}
          onChange={handleChange}
          required
        />
        <Input
          label="Postcode *"
          name="postcode"
          value={address.postcode}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label
          htmlFor="country"
          className="block text-sm text-gray-600 dark:text-gray-300 mb-1"
        >
          Country *
        </label>
        <select
          id="country"
          name="country"
          value={address.country}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-blue-600 focus:ring-0 transition-colors"
        >
          <option value="">Select a country</option>
          <option value="United Kingdom">United Kingdom</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Phone *"
          name="phone"
          value={address.phone}
          onChange={handleChange}
          required
          type="tel"
        />
        <Input
          label="Email *"
          name="email"
          value={address.email}
          onChange={handleChange}
          required
          type="email"
        />
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}) {
  const id = name;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm text-gray-600 dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-blue-600 focus:ring-0 transition-colors"
      />
    </div>
  );
}
