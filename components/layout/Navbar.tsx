"use client";
import { useEffect, useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();

  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHomePage = pathname === "/";

  useEffect(() => {
    setLoggedIn(localStorage.getItem("isLoggedIn") === "true");

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    signOut({ redirect: false });
    window.location.href = "/login";
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${
        isHomePage
          ? scrolled
            ? "bg-white text-black shadow-md"
            : "bg-transparent text-white"
          : "bg-white text-black border-b border-gray-100"
      } flex justify-between items-center`}
    >
      {/* Center: Logo */}
      <Link href="/" className="text-lg font-light tracking-widest uppercase">
        LONDON TILES
      </Link>

      {/* Right: Navigation Links */}
      <nav className="hidden md:flex items-center gap-8">
        <Search className="w-4 h-4 cursor-pointer" />

        <Link
          href="/product"
          className="text-sm font-light uppercase tracking-wider hover:underline"
        >
          Products
        </Link>

        <Link href="/cart" className="relative">
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
          {itemCount > 0 && (
            <span
              className={`absolute -top-2 -right-2 text-xs ${
                isHomePage && !scrolled
                  ? "bg-white text-black"
                  : "bg-black text-white"
              } rounded-full px-1`}
            >
              {itemCount}
            </span>
          )}
        </Link>

        {loggedIn ? (
          <div className="relative">
            <div
              className={`w-8 h-8 rounded-full ${
                isHomePage && !scrolled
                  ? "bg-white text-black"
                  : "bg-black text-white"
              } flex items-center justify-center cursor-pointer`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
            >
              U
            </div>
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-md"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="text-sm font-light uppercase tracking-wider hover:underline"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
