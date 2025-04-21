"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What types of tiles do you offer?",
    answer:
      "We offer a wide range of tiles including ceramic, porcelain, natural stone, mosaic, and decorative tiles suitable for both indoor and outdoor use.",
  },
  {
    question: "Do you provide installation services?",
    answer:
      "Yes, we offer professional installation services for all our products. Our experienced team ensures proper installation following industry best practices.",
  },
  {
    question: "What are your delivery options?",
    answer:
      "We offer delivery across London and surrounding areas. Delivery times and costs vary depending on your location and order size. Contact us for specific delivery information.",
  },
  {
    question: "Can I return products?",
    answer:
      "Yes, unused products in their original packaging can be returned within 30 days of purchase. Please check our Returns Policy for full details.",
  },
  {
    question: "Do you offer samples?",
    answer:
      "Yes, we provide samples for most of our products to help you make the right choice. Contact us to request samples.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero Content */}
      <div className="bg-[#1E2122] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-300 text-lg">
              Find answers to common questions about our products, services, and
              policies.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">
                  {faq.question}
                </span>
                <span className="text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
