"use client";
import { ShoppingCart, Search } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";

export default function Navbar() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-black/40 backdrop-blur-md text-white flex justify-between items-center">
      {/* Left: Contact Info */}
      <div className="text-sm hidden md:flex space-x-6">
        <span>📧 info@londontiles.co.uk</span>
        <span>📞 +44 (0)333 700 4400</span>
      </div>

      {/* Center: Logo */}
      <Link href="/" className="text-lg font-semibold tracking-widest">
        London Tiles
      </Link>

      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        <Search className="w-5 h-5 cursor-pointer" />
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-white text-black rounded-full px-1">
              {itemCount}
            </span>
          )}
        </Link>
        <span className="text-sm underline cursor-pointer">
          Sign In/Register
        </span>
      </div>
    </header>
  );
}
