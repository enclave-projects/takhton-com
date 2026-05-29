/**
 * Product grid component for displaying products
 * @module components/takhton/product/ProductGrid
 */

import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/product";

export interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

const columnStyles: Record<2 | 3 | 4, string> = {
  2: "grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="w-full border border-[#dfc38a]/15 bg-[#05142c]/40 px-6 py-20 text-center">
        <p className="text-sm uppercase tracking-wider text-[#f3ebd8]/60">
          No products found
        </p>
        <p className="mt-2 text-xs text-[#f3ebd8]/40">
          Try adjusting your filters or check back soon for new arrivals.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${columnStyles[columns]} gap-x-6 gap-y-10`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
