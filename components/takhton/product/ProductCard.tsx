/**
 * Product card component for product grid
 * @module components/takhton/product/ProductCard
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/takhton/common/Badge";
import { PriceDisplay } from "@/components/takhton/common/PriceDisplay";
import { WishlistButton } from "@/components/takhton/common/WishlistButton";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import type { Product } from "@/types/product";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { slug, name, images, badge, price, originalPrice } = product;
  const { addToCart, setCartOpen } = useCartStore();

  /**
   * Quick Add: add the first available size + first color, then open the cart drawer.
   * Falls through to navigation (parent Link) if data is malformed (no sizes/colors).
   */
  const handleQuickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    const firstSize = product.sizes[0];
    const firstColor = product.colors[0];
    if (!firstSize || !firstColor) return;

    e.preventDefault();
    e.stopPropagation();
    addToCart(product, firstSize, firstColor, 1);
    setCartOpen(true);
  };

  return (
    <Link href={`/product/${slug}`} className="group block">
      <article
        className={cn(
          "relative flex flex-col transition-transform duration-300 hover:-translate-y-1",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
          className,
        )}
      >
        <div className="relative aspect-3/4 overflow-hidden border border-[#dfc38a]/20 bg-[#071b47]">
          {images[0] && (
            <Image
              src={images[0]}
              alt={name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-95 transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030c1b]/18 to-transparent" />

          {badge && (
            <div className="absolute top-3 left-3">
              <Badge variant={badge} />
            </div>
          )}

          <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
            <WishlistButton product={product} />
          </div>

          <div className="absolute right-4 bottom-4 left-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <button
              type="button"
              onClick={handleQuickAdd}
              aria-label={`Quick add ${name} to cart`}
              className={cn(
                "w-full border border-[#dfc38a] bg-[#030c1b]/90 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-[#dfc38a] backdrop-blur",
                "transition-colors hover:bg-[#dfc38a] hover:text-[#030c1b]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
              )}
            >
              Quick Add
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <h3 className="text-sm font-medium uppercase tracking-wide text-[#f3ebd8] group-hover:text-[#dfc38a]">
            {name}
          </h3>
          <PriceDisplay
            price={price}
            originalPrice={originalPrice}
            size="sm"
          />
        </div>
      </article>
    </Link>
  );
}
