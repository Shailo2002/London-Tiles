import React from "react";

export default function TermsAndConditions() {
  return (
    <>
      {/* Hero Content */}
      <div className="bg-[#1E2122] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-gray-300 text-lg">
              Please read our terms and conditions carefully before using our
              services.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <div className="prose max-w-none text-gray-600 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to London Tiles. By accessing and using our website and
              services, you agree to be bound by these terms and conditions.
              Please read them carefully before proceeding with any purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              2. Products and Services
            </h2>
            <p>
              All products and services are subject to availability. We reserve
              the right to discontinue or modify any product without prior
              notice. Images of products on our website are for illustrative
              purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              3. Pricing and Payment
            </h2>
            <p>
              All prices are in GBP and include VAT where applicable. We reserve
              the right to change prices without prior notice. Payment must be
              made in full before products are dispatched or services are
              rendered.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              4. Delivery
            </h2>
            <p>
              Delivery times are estimates only. We are not responsible for
              delays beyond our control. Risk of loss and title for products
              pass to you upon delivery to the carrier.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              5. Returns and Refunds
            </h2>
            <p>
              Products may be returned within 30 days of delivery if unused and
              in original packaging. Custom orders are non-refundable. Please
              refer to our Returns Policy for full details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              6. Privacy and Data Protection
            </h2>
            <p>
              We collect and process your personal data in accordance with UK
              data protection laws. Please refer to our Privacy Policy for more
              information.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
