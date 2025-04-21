import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/products/productCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getAllProducts() {
  try {
    const products = await prisma.products.findMany({
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
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function ProductPage() {
  const products = await getAllProducts();

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[300px] w-full">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://res.cloudinary.com/dfapgsapr/image/upload/v1745089911/skirting-king-home_se2guz.jpg"
            alt="Our Products"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-light mb-4 text-white">
              Our Products
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Discover our premium collection of skirting boards and
              architraves, crafted with precision and quality materials.
            </p>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="">
        <div className="container mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/product-category/skirting"
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
            >
              Skirting Boards
            </Link>
            <Link
              href="/product-category/architrave"
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
            >
              Architrave
            </Link>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        {/* Products Grid */}
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
              <p className="text-gray-500 text-lg">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
