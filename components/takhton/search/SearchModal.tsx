/**
 * Search modal component
 * @module components/takhton/search/SearchModal
 */

"use client";

import { useState } from "react";
import { X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { products } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const filteredProducts = query.length > 0
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="absolute top-0 left-0 right-0 bg-white shadow-2xl">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {/* Search Input */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
                autoFocus
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close search"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Results */}
          {query.length > 0 && (
            <div className="mt-6">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category.name}</p>
                        <p className="text-sm font-medium">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No products found for "{query}"
                </p>
              )}
            </div>
          )}

          {/* Popular Searches */}
          {query.length === 0 && (
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-3">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {["Merino Wool", "Cashmere", "Linen Blazer", "Silk Dress", "Accessories"].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className={cn(
                      "px-4 py-2 text-sm rounded-full",
                      "bg-gray-100 hover:bg-gray-200 transition-colors"
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
