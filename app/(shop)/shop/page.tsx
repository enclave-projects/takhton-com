/**
 * Shop page for Takhton
 * @module app/shop/page
 */

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductGrid } from "@/components/takhton/product/ProductGrid";
import { products, categories } from "@/lib/data";

export interface ShopPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ShopPage() {
  // In a real app, we'd filter based on searchParams
  // For now, we'll show all products

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="t-heading-xl">All Products</h1>
              <p className="text-sm text-gray-500 mt-1">
                {products.length} products
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                className={cn(
                  "appearance-none pl-4 pr-10 py-2 text-sm font-medium",
                  "border border-gray-200 rounded-sm bg-white",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-black",
                  "cursor-pointer",
                )}
                defaultValue="newest"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                        {cat.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input type="range" min="0" max="1000" className="w-full" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>$0</span>
                    <span>$1000+</span>
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-sm font-medium mb-4">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={cn(
                        "px-3 py-1 text-xs font-medium border rounded-sm",
                        "hover:border-black transition-colors",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black",
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium mb-4">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {["Black", "White", "Cream", "Navy", "Olive", "Camel"].map(
                    (color) => (
                      <button
                        key={color}
                        type="button"
                        title={color}
                        className={cn(
                          "w-6 h-6 rounded-full border border-gray-200",
                          "hover:scale-110 transition-transform",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-black",
                        )}
                        style={{
                          backgroundColor:
                            color === "Black"
                              ? "#000"
                              : color === "White"
                                ? "#fff"
                                : color === "Cream"
                                  ? "#f5f5dc"
                                  : color === "Navy"
                                    ? "#1a1a2e"
                                    : color === "Olive"
                                      ? "#556b2f"
                                      : "#c19a6b",
                        }}
                      />
                    ),
                  )}
                </div>
              </div>

              {/* Apply Filters Button */}
              <button
                type="button"
                className={cn(
                  "w-full py-3 text-sm font-medium rounded-full",
                  "bg-black text-white hover:bg-gray-800 transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-black",
                )}
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button
              type="button"
              className={cn(
                "w-full py-3 text-sm font-medium border rounded-sm",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black",
              )}
            >
              Filters
            </button>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid products={products} columns={4} />

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2" aria-label="Pagination">
                <Link
                  href="#"
                  className="px-4 py-2 text-sm text-gray-500 hover:text-black disabled:opacity-50"
                  aria-disabled="true"
                >
                  Previous
                </Link>
                <Link
                  href="#"
                  className="px-4 py-2 text-sm font-medium bg-black text-white rounded-sm"
                  aria-current="page"
                >
                  1
                </Link>
                <span className="px-2 text-gray-400">...</span>
                <Link
                  href="#"
                  className="px-4 py-2 text-sm text-gray-600 hover:text-black"
                >
                  Next
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
