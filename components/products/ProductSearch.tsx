// components/ProductSearch.tsx
"use client";

import { useState, useEffect } from "react";
import ProductCard from "./productCard";

interface Product {
  id: string;
  name: string;
  image: string;
  priceIncVAT: number;
  priceExVAT: number;
}

export default function ProductSearch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);
  const filteredProducts = products.filter((product) =>
    product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={[product.image]} // Convert single string to string array
              priceIncVAT={product.priceIncVAT}
              priceExVAT={product.priceExVAT}
            />
          ))}
        </div>
      )}
    </div>
  );
}
