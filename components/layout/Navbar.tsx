"use client";
import { useEffect, useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    signOut({ redirect: false });
    window.location.href = "/login";
  };

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

        {loggedIn ? (
          <div className="relative group">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center cursor-pointer">
              U
            </div>
            <div className="absolute right-0 mt-2 w-24 bg-white text-black rounded-md shadow-md hidden group-hover:block">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link href="/login" className="text-sm underline cursor-pointer">
            Sign In/Register
          </Link>
        )}
      </div>
    </header>
  );
}
