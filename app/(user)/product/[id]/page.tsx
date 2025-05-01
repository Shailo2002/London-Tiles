import ProductDetail from "@/components/products/productDetail";
import { PrismaClient } from "@prisma/client";
import Breadcrumb from "@/components/layout/Breadcrumb";

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
  // Ensure required fields are not null
  const product = {
    ...productData,
    description: productData.description || "",
    category: productData.category || "",
  };


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 md:px-12 py-8">
        <Breadcrumb productName={product.name} category={product.category} />
        <ProductDetail product={product} />
      </div>
    </div>
  );
}

async function getProductById(productId: string) {
  try {
    const product = await prisma.products.findUnique({
      where: { id: productId },
      include: {
        variants: true,
      },
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
