import ProductCard from "@/components/products/productCard";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export const metadata = {
  title: "Skirting Products | London-Tiles",
  description: "Browse our selection of high-quality skirting boards",
};

type Product = {
  id: string;
  name: string;
  images: string[];
  variants: {
    priceIncVAT: number;
    priceExVAT: number;
  }[];
};

type FlattenedProduct = {
  id: string;
  name: string;
  images: string[];
  priceIncVAT: number;
  priceExVAT: number;
};

async function getSkirtingProducts(): Promise<FlattenedProduct[]> {
  try {
    const products = await prisma.products.findMany({
      where: {
        category: "skirting",
      },
      select: {
        id: true,
        name: true,
        images: true,
        variants: {
          select: {
            priceIncVAT: true,
            priceExVAT: true,
          },
          take: 1,
        },
      },
    });

    return products.map((product: Product) => ({
      ...product,
      priceIncVAT: product.variants[0]?.priceIncVAT ?? 0,
      priceExVAT: product.variants[0]?.priceExVAT ?? 0,
    }));
  } catch (error) {
    console.error("Failed to fetch skirting products:", error);
    return [];
  }
}

export default async function SkirtingPage() {
  const products = await getSkirtingProducts();

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[360px] w-full">
        <Image
          src="https://res.cloudinary.com/dfapgsapr/image/upload/v1745089911/skirting-king-home_se2guz.jpg"
          alt="Skirting Boards"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-light mb-4 text-white">
              Skirting Boards
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Browse our selection of high-quality MDF skirting boards in
              various styles and sizes. Each piece is crafted with precision and
              attention to detail.
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
                image={product.images}
                priceIncVAT={product.priceIncVAT}
                priceExVAT={product.priceExVAT}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 text-lg">
                No skirting products found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
