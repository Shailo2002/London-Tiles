// app/product-category/architrave/page.tsx
import ProductCard from "@/components/products/productCard";
import { PrismaClient } from "@prisma/client";

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Architrave</h1>
      <p className="text-gray-600 mb-8">
        Discover our range of architrave trim options for professional door and
        window framing.
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
            No architrave products found.
          </p>
        )}
      </div>
    </div>
  );
}
