// lib/products.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getProductsByCategory(category: string) {
  try {
    const products = await prisma.products.findMany({
      where: { 
        productCategory: category 
      },
      select: {
        id: true,
        name: true,
        image: true,
        priceIncVAT: true,
        priceExVAT: true,
      }
    });
    return products;
  } catch (error) {
    console.error(`Failed to fetch products in category ${category}:`, error);
    return [];
  }
}