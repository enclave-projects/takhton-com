/**
 * Search modal component
 * @module components/takhton/search/SearchModal
 */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { products } from "@/lib/data";
import { formatPrice } from "@/store/cart.store";

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  "Dress Shirt",
  "Trousers",
  "Tuxedo",
  "Linen Shirt",
  "Crest Tee",
  "Chinos",
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const filteredProducts =
    query.length > 0
      ? products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.description.toLowerCase().includes(query.toLowerCase()) ||
              p.category.name.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 6)
      : [];

  // Reset query, lock scroll, and listen for Escape while open.
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#030c1b]/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="absolute top-0 right-0 left-0 border-b border-[#dfc38a]/20 bg-[#030c1b] text-[#f3ebd8] shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
        <div className="mx-auto max-w-3xl px-4 py-7 sm:px-6">
          {/* Search Input */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#dfc38a]" />
              <label htmlFor="takhton-search" className="sr-only">
                Search products
              </label>
              <input
                id="takhton-search"
                type="search"
                name="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the collection..."
                className={cn(
                  "w-full border border-[#dfc38a]/30 bg-[#05142c] py-4 pr-4 pl-12 text-base text-[#f3ebd8]",
                  "placeholder:text-[#f3ebd8]/40",
                  "focus:border-[#dfc38a] focus:outline-none focus:ring-2 focus:ring-[#dfc38a]/40",
                )}
                autoFocus
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "rounded-full p-3 text-[#dfc38a] transition-colors hover:bg-[#dfc38a]/10",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a]",
              )}
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Results */}
          {query.length > 0 && (
            <div className="mt-7">
              {filteredProducts.length > 0 ? (
                <>
                  <p className="t-eyebrow mb-4 text-[#dfc38a]">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1 ? "result" : "results"}
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className={cn(
                          "flex gap-4 border border-transparent p-3 transition-colors",
                          "hover:border-[#dfc38a]/30 hover:bg-[#05142c]",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a]",
                        )}
                      >
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden border border-[#dfc38a]/20 bg-[#071b47]">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium uppercase tracking-wide text-[#f3ebd8]">
                            {product.name}
                          </p>
                          <p className="text-xs text-[#f3ebd8]/55">
                            {product.category.name}
                          </p>
                          <p className="mt-1 text-sm font-semibold tabular-nums text-[#dfc38a]">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <p className="py-10 text-center text-sm text-[#f3ebd8]/60">
                  No products found for &ldquo;{query}&rdquo;
                </p>
              )}
            </div>
          )}

          {/* Popular Searches */}
          {query.length === 0 && (
            <div className="mt-7">
              <p className="t-eyebrow mb-4 text-[#dfc38a]">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className={cn(
                      "border border-[#dfc38a]/30 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#f3ebd8]/85 transition-colors",
                      "hover:border-[#dfc38a] hover:bg-[#dfc38a]/10 hover:text-[#dfc38a]",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a]",
                    )}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
