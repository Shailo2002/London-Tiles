"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  productName?: string;
  category?: string;
}

export default function Breadcrumb({ productName, category }: BreadcrumbProps) {
  const pathname = usePathname();

  const isProductPage = pathname.includes("/product/") && productName;
  const isCategoryPage = pathname.includes("/product-category/");

  const categoryName =
    category ||
    (pathname.includes("/skirting")
      ? "Skirting"
      : pathname.includes("/architrave")
      ? "Architrave"
      : "");

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <Link href="/" className="hover:text-black transition-colors">
        Home
      </Link>

      <ChevronRight className="w-4 h-4" />

      {(isProductPage || isCategoryPage) && (
        <>
          <Link
            href={`/product-category/${categoryName.toLowerCase()}`}
            className="hover:text-black transition-colors"
          >
            {categoryName}
          </Link>

          {isProductPage && (
            <>
              <ChevronRight className="w-4 h-4" />
              <span className="text-black">{productName}</span>
            </>
          )}
        </>
      )}
    </nav>
  );
}
