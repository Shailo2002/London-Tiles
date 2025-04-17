// app/product-category/skirting/page.tsx

import ProductCard from "@/components/products/productCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const metadata = {
  title: "Skirting Products | London-Tiles",
  description: "Browse our selection of high-quality skirting boards",
};

async function getSkirtingProducts() {
  try {
    const products = await prisma.products.findMany({
      where: {
        productCategory: "skirting",
      },
      select: {
        id: true,
        name: true,
        image: true,
        priceIncVAT: true,
        priceExVAT: true,
      },
    });
    return products;
  } catch (error) {
    console.error("Failed to fetch skirting products:", error);
    return [];
  }
}

export default async function SkirtingPage() {
  const products = await getSkirtingProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Skirting Boards</h1>
      <p className="text-gray-600 mb-8">
        Browse our selection of high-quality MDF skirting boards in various
        styles and sizes.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              priceIncVAT={product.priceIncVAT}
              priceExVAT={product.priceExVAT}
            />
          ))
        ) : (
          <p className="col-span-full text-center py-10 text-gray-500">
            No skirting products found.
          </p>
        )}
      </div>
    </div>
  );
}
