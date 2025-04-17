import ProductDetail from "@/components/products/productDetail";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const metadata = {
  title: "Product Details | London-Tiles",
  description: "View detailed information about our products",
};

// Make this a server component to fetch data
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // Get the product ID from the URL
  const productId = (await params).id;

  // Fetch the product data
  const productData = await getProductById(productId);

  return <ProductDetail product={productData} />;
}

async function getProductById(productId: string) {
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    return product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw error; // Re-throw to be handled by the error boundary
  }
}
