// app/api/products/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
  }

  try {
    const products = await prisma.products.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { productCategory: { contains: query, mode: 'insensitive' } }
        ]
      },
      take: 5, // Limit to 5 results
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json({ error: 'Failed to search products' }, { status: 500 });
  }
}


