/**
 * Shop page for Takhton
 * @module app/shop/page
 */

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductGrid } from "@/components/takhton/product/ProductGrid";
import { categories, products } from "@/lib/data";
import { COMMON_COLORS, SIZES } from "@/lib/constants";

export default function ShopPage() {
  // In a real app, we'd filter based on searchParams.
  // For now, we show all products.

  return (
    <div className="min-h-screen bg-[#030c1b] text-[#f3ebd8]">
      {/* Page Header */}
      <div className="border-b border-[#dfc38a]/15 bg-[#030c1b]">
        <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-12 lg:py-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="t-eyebrow mb-3 text-[#dfc38a]">The Collection</p>
              <h1 className="font-serif text-4xl uppercase tracking-wide text-[#f3ebd8] md:text-5xl">
                All Pieces
              </h1>
              <p className="mt-2 text-xs uppercase tracking-wider text-[#f3ebd8]/55">
                {products.length} pieces
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <label htmlFor="shop-sort" className="sr-only">
                Sort products by
              </label>
              <select
                id="shop-sort"
                name="sort"
                className={cn(
                  "appearance-none border border-[#dfc38a]/30 bg-[#05142c] py-3 pr-12 pl-5 text-xs font-semibold uppercase tracking-wider text-[#f3ebd8]",
                  "cursor-pointer transition-colors hover:border-[#dfc38a]",
                  "focus:border-[#dfc38a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a]",
                )}
                defaultValue="newest"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#dfc38a]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Filter Sidebar - Desktop */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-24 space-y-9 border border-[#dfc38a]/15 bg-[#05142c]/40 p-6">
              {/* Categories */}
              <FilterGroup title="Categories">
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="group flex cursor-pointer items-center gap-3"
                    >
                      <input
                        type="checkbox"
                        name="category"
                        value={cat.slug}
                        className="h-4 w-4 cursor-pointer accent-[#dfc38a]"
                      />
                      <span className="text-sm text-[#f3ebd8]/75 transition-colors group-hover:text-[#dfc38a]">
                        {cat.name}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterGroup>

              {/* Price Range */}
              <FilterGroup title="Price Range">
                <div className="space-y-4">
                  <label htmlFor="shop-price" className="sr-only">
                    Price range
                  </label>
                  <input
                    id="shop-price"
                    name="price"
                    type="range"
                    min="0"
                    max="1000"
                    defaultValue="1000"
                    className="w-full accent-[#dfc38a]"
                  />
                  <div className="flex justify-between text-xs text-[#f3ebd8]/65 tabular-nums">
                    <span>$0</span>
                    <span>$1000+</span>
                  </div>
                </div>
              </FilterGroup>

              {/* Sizes */}
              <FilterGroup title="Size">
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={cn(
                        "border border-[#dfc38a]/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#f3ebd8]/85 transition-colors",
                        "hover:border-[#dfc38a] hover:text-[#dfc38a]",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a]",
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </FilterGroup>

              {/* Colors */}
              <FilterGroup title="Color">
                <div className="flex flex-wrap gap-3">
                  {COMMON_COLORS.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      title={color.name}
                      aria-label={`Filter by color ${color.name}`}
                      className={cn(
                        "h-7 w-7 rounded-full ring-1 ring-[#dfc38a]/30 transition-all",
                        "hover:scale-110 hover:ring-2 hover:ring-[#dfc38a]",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
                      )}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </FilterGroup>

              {/* Apply Filters */}
              <button
                type="button"
                className={cn(
                  "w-full border border-[#dfc38a] bg-[#dfc38a] py-3 text-xs font-bold uppercase tracking-wider text-[#030c1b]",
                  "transition-colors hover:bg-[#f3ebd8]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
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
                "w-full border border-[#dfc38a]/30 py-3 text-xs font-semibold uppercase tracking-wider text-[#dfc38a]",
                "transition-colors hover:border-[#dfc38a] hover:bg-[#dfc38a]/5",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a]",
              )}
            >
              Filters
            </button>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid products={products} columns={4} />

            {/* Pagination */}
            <div className="mt-14 flex justify-center">
              <nav
                className="flex items-center gap-1"
                aria-label="Pagination"
              >
                <Link
                  href="#"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#f3ebd8]/45"
                  aria-disabled="true"
                  tabIndex={-1}
                >
                  Previous
                </Link>
                <Link
                  href="#"
                  className="border border-[#dfc38a] bg-[#dfc38a] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#030c1b]"
                  aria-current="page"
                >
                  1
                </Link>
                <span className="px-2 text-[#f3ebd8]/40">…</span>
                <Link
                  href="#"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#f3ebd8]/75 hover:text-[#dfc38a]"
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

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
}

function FilterGroup({ title, children }: FilterGroupProps) {
  return (
    <div>
      <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#dfc38a]">
        {title}
      </h3>
      {children}
    </div>
  );
}
