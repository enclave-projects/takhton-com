/**
 * Navigation bar component
 * @module components/takhton/layout/Navbar
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { BRAND_NAME, BRAND_LOGO } from "@/lib/constants";
import { SearchModal } from "@/components/takhton/search/SearchModal";

export interface NavbarProps {
  dark?: boolean;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=men", label: "Men" },
  { href: "/shop?category=women", label: "Women" },
  { href: "/shop?category=accessories", label: "Accessories" },
];

export function Navbar({ dark = false }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount, setCartOpen } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  const bgClass = dark ? "bg-black text-white" : "bg-white text-black";
  const borderClass = dark ? "border-white/10" : "border-gray-100";
  const iconBgClass = dark ? "hover:bg-white/10" : "hover:bg-gray-100";

  return (
    <>
      <header
        className={cn("sticky top-0 z-50 border-b", bgClass, borderClass)}
      >
        <nav className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  "p-2 rounded-sm transition-colors focus:outline-none focus-visible:ring-2",
                  dark
                    ? "focus-visible:ring-white"
                    : "focus-visible:ring-black",
                  iconBgClass,
                )}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm"
              >
                <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden">
                  <Image
                    src={BRAND_LOGO}
                    alt={BRAND_NAME}
                    width={40}
                    height={40}
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-xl font-semibold tracking-tight hidden sm:block">
                  {BRAND_NAME}
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    "hover:opacity-70 focus:outline-none focus-visible:ring-2 rounded-sm",
                    dark
                      ? "focus-visible:ring-white"
                      : "focus-visible:ring-black",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                className={cn(
                  "p-2 rounded-sm transition-colors focus:outline-none focus-visible:ring-2",
                  dark
                    ? "focus-visible:ring-white"
                    : "focus-visible:ring-black",
                  iconBgClass,
                )}
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/account?tab=wishlist"
                className={cn(
                  "relative p-2 rounded-sm transition-colors focus:outline-none focus-visible:ring-2",
                  dark
                    ? "focus-visible:ring-white"
                    : "focus-visible:ring-black",
                  iconBgClass,
                )}
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-black text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
                className={cn(
                  "relative p-2 rounded-sm transition-colors focus:outline-none focus-visible:ring-2",
                  dark
                    ? "focus-visible:ring-white"
                    : "focus-visible:ring-black",
                  iconBgClass,
                )}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-black text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              {/* Account */}
              <Link
                href="/account"
                className={cn(
                  "hidden sm:block px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  "border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  dark
                    ? "border-white/20 hover:bg-white/10 focus-visible:ring-white"
                    : "border-black hover:bg-gray-100 focus-visible:ring-black",
                )}
              >
                Account
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
