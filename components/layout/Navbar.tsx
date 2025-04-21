"use client";
import { useEffect, useState } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <Link href="/" className="text-3xl font-serif tracking-wide uppercase">
        LONDON TILES
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Desktop Navigation */}
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

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-lg md:hidden text-black ${
            isHomePage && !scrolled ? "mt-0" : "mt-0"
          }`}
        >
          <nav className="flex flex-col p-4 space-y-4">
            <div className="flex items-center gap-2 text-black hover:text-gray-600">
              <Search className="w-4 h-4" />
              <span className="text-sm font-light uppercase tracking-wider">
                Search
              </span>
            </div>

            <Link
              href="/product"
              className="text-sm font-light uppercase tracking-wider text-black hover:text-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-2 text-black hover:text-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-light uppercase tracking-wider">
                Cart
              </span>
              {itemCount > 0 && (
                <span className="bg-black text-white text-xs rounded-full px-1">
                  {itemCount}
                </span>
              )}
            </Link>

            {loggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-light uppercase tracking-wider text-black hover:text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm font-light uppercase tracking-wider text-black hover:text-gray-600 text-left w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm font-light uppercase tracking-wider text-black hover:text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
