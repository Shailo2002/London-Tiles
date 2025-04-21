// components/ReturnsPolicy.tsx

import React from "react";

export default function ReturnAndRefund() {
  return (
    <>
      {/* Hero Content */}
      <div className="bg-[#1E2122] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              Return and Refund Policy
            </h1>
            <p className="text-gray-300 text-lg">
              Learn about our return process and refund policies for your
              purchases.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <div className="prose max-w-none text-gray-600">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Return Policy
            </h2>
            <p className="mb-4">
              We want you to be completely satisfied with your purchase. If
              you're not entirely happy with your order, we're here to help.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Returns are accepted within 30 days of delivery</li>
              <li>Items must be unused and in original packaging</li>
              <li>Custom orders are non-refundable</li>
              <li>
                Return shipping costs are the responsibility of the customer
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Refund Process
            </h2>
            <p className="mb-4">
              Once we receive your return, we will inspect the items and process
              your refund.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Refunds will be processed within 5-7 business days</li>
              <li>Original shipping costs are non-refundable</li>
              <li>Refunds will be issued to the original payment method</li>
              <li>
                You will receive an email confirmation when your refund is
                processed
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Damaged or Defective Items
            </h2>
            <p className="mb-4">If you receive damaged or defective items:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact us within 48 hours of delivery</li>
              <li>Provide photos of the damaged items</li>
              <li>We will arrange replacement or refund</li>
              <li>Return shipping for damaged items will be covered by us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p>
              If you have any questions about our return and refund policy,
              please contact us at:{" "}
              <a
                href="mailto:londontiles7@gmail.com"
                className="text-blue-600 hover:text-blue-800"
              >
                londontiles7@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
