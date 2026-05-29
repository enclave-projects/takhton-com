/**
 * Navigation bar component
 * @module components/takhton/layout/Navbar
 */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { SearchModal } from "@/components/takhton/search/SearchModal";
import { BRAND_LOGO, BRAND_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Collection" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Returns true when the link should render in its active visual state for the given pathname.
 * - Home matches only on exact pathname '/'
 * - Other links match on prefix (so /product/foo highlights /shop if it starts with /shop, etc.)
 */
function isActiveLink(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar(): React.ReactElement {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, setCartOpen } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  // Close mobile menu on route change.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu is open + Escape closes it.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#dfc38a]/15 bg-[#030c1b]/95 text-[#f3ebd8] backdrop-blur">
        <nav className="mx-auto flex h-[74px] max-w-[1600px] items-center justify-between px-5 lg:px-12">
          <Link
            href="/"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a]"
            aria-label={`${BRAND_NAME} home`}
          >
            <span className="relative block h-14 w-32 sm:h-16 sm:w-36 md:h-[60px] md:w-40">
              <Image
                src={BRAND_LOGO}
                alt={BRAND_NAME}
                fill
                sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
                className="object-contain object-left"
                priority
              />
            </span>
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActiveLink(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:text-[#dfc38a]",
                    active ? "text-[#dfc38a]" : "text-[#f3ebd8]/82",
                  )}
                >
                  {link.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-3 left-0 h-px w-full bg-[#dfc38a]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-[#dfc38a]">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="transition-colors hover:text-[#f3ebd8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a]"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden transition-colors hover:text-[#f3ebd8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] sm:inline-flex"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              href="/account?tab=wishlist"
              aria-label={
                wishlistItems.length > 0
                  ? `Wishlist, ${wishlistItems.length} items`
                  : "Wishlist"
              }
              className="relative hidden transition-colors hover:text-[#f3ebd8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] sm:inline-flex"
            >
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#dfc38a] px-1 text-[10px] font-bold text-[#030c1b]">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={
                itemCount > 0 ? `Open cart, ${itemCount} items` : "Open cart"
              }
              className="relative inline-flex items-center transition-colors hover:text-[#f3ebd8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a]"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#dfc38a] px-1 text-[10px] font-bold text-[#030c1b]">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="inline-flex transition-colors hover:text-[#f3ebd8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        pathname={pathname}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  pathname: string;
  onClose: () => void;
}

function MobileMenu({ isOpen, pathname, onClose }: MobileMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#030c1b]/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!isOpen}
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-sm border-l border-[#dfc38a]/20 bg-[#030c1b] text-[#f3ebd8] shadow-[0_0_60px_rgba(0,0,0,0.6)]",
          "transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-[#dfc38a]/15 px-5 py-5">
          <span className="font-serif text-xl tracking-[0.12em] text-[#dfc38a]">
            {BRAND_NAME.toUpperCase()}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-2 text-[#dfc38a] transition-colors hover:bg-[#dfc38a]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-2 py-6">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const active = isActiveLink(link.href, pathname);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block px-5 py-4 text-sm font-semibold uppercase tracking-[0.16em] transition-colors",
                      active
                        ? "text-[#dfc38a]"
                        : "text-[#f3ebd8]/85 hover:text-[#dfc38a]",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 border-t border-[#dfc38a]/15 px-5 pt-6">
            <Link
              href="/account"
              className="flex items-center gap-3 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#f3ebd8]/85 transition-colors hover:text-[#dfc38a]"
            >
              <User className="h-4 w-4" />
              Account
            </Link>
            <Link
              href="/account?tab=wishlist"
              className="flex items-center gap-3 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#f3ebd8]/85 transition-colors hover:text-[#dfc38a]"
            >
              <Heart className="h-4 w-4" />
              Wishlist
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
