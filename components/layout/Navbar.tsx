"use client";
import { useEffect, useState } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "../theme/ThemeToggle";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const itemCount = 0;
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
    router.push("/login");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${
        isHomePage
          ? scrolled
            ? "bg-white text-black shadow-md dark:bg-gray-900 dark:text-white dark:shadow-gray-800"
            : "bg-transparent text-white"
          : "bg-white text-black border-b border-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-800"
      } flex justify-between items-center`}
    >
      {/* Logo */}
      <Link href="/" className="text-3xl font-serif tracking-wide uppercase">
        LONDON TILES
      </Link>

      {/* Mobile Toggle */}
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

      {/* Desktop Nav */}
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
                  : "bg-black text-white dark:bg-white dark:text-black"
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
                  : "bg-black text-white dark:bg-gray-700 dark:text-white"
              } flex items-center justify-center cursor-pointer`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
            >
              U
            </div>
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-md dark:bg-gray-800 dark:text-white"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
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

        <ThemeToggle />
      </nav>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden text-black dark:bg-gray-800 dark:text-white">
          <nav className="flex flex-col p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span className="text-sm font-light uppercase tracking-wider">
                Search
              </span>
            </div>
            <Link
              href="/product"
              className="text-sm font-light uppercase tracking-wider hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-light uppercase tracking-wider">
                Cart
              </span>
              {itemCount > 0 && (
                <span className="bg-black text-white text-xs rounded-full px-1 dark:bg-white dark:text-black">
                  {itemCount}
                </span>
              )}
            </Link>

            {loggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-light uppercase tracking-wider hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm font-light uppercase tracking-wider text-left w-full hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm font-light uppercase tracking-wider hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <span className="text-sm font-light uppercase tracking-wider">
                Theme
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
