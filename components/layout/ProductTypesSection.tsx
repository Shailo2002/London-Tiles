"use client";

import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "Skirting Board",
    image:
      "https://res.cloudinary.com/dfapgsapr/image/upload/v1745078860/WhatsApp_Image_2025-04-18_at_13.38.54_13511acc_gylpge.jpg",
    link: "/product-category/skirting",
  },
  {
    name: "Architrave",
    image:
      "https://res.cloudinary.com/dfapgsapr/image/upload/v1745078789/WhatsApp_Image_2025-04-18_at_13.39.22_c4b631cb_fh4x8r.jpg",
    link: "/product-category/architrave",
  },
];

export default function ProductTypesSection() {
  return (
    <section className="py-12 px-6 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-center mb-8 dark:text-white">
        Explore Our Bestsellers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 max-w-3xl mx-auto">
        {products.map((product) => (
          <Link
            href={product.link}
            key={product.name}
            className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold dark:text-white">
                  {product.name}
                </h3>
                <span className="text-gray-600 group-hover:text-green-600 dark:text-gray-300 dark:group-hover:text-green-400 transition-colors duration-300">
                  →
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                View Collection
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
