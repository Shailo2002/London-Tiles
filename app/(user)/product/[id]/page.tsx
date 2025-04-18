import ProductDetail from "@/components/products/productDetail";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const metadata = {
  title: "Product Details | London-Tiles",
  description: "View detailed information about our products",
};

export default async function ProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const productData = await getProductById(id);

  return <ProductDetail product={productData} />;
}

async function getProductById(productId: string) {
  try {
    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    return product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw error;
  }
}
