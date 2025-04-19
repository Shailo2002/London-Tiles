// app/product-category/architrave/page.tsx
import ProductCard from "@/components/products/productCard";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";

const prisma = new PrismaClient();

export const metadata = {
  title: "Architrave Products | London-Tiles",
  description: "Browse our selection of high-quality architrave trim",
};

async function getArchitraveProducts() {
  try {
    const products = await prisma.products.findMany({
      where: {
        productCategory: "architrave",
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
    console.error("Failed to fetch architrave products:", error);
    return [];
  }
}

export default async function ArchitravePage() {
  const products = await getArchitraveProducts();

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[400px] w-full">
        <Image
          src="https://res.cloudinary.com/dfapgsapr/image/upload/v1745089911/skirting-king-home_se2guz.jpg"
          alt="Architrave"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-light mb-4 text-white">
              Architrave
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Discover our range of architrave trim options for professional
              door and window framing. Each piece is designed to add elegance
              and finish to your interior spaces.
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 text-lg">
                No architrave products found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
