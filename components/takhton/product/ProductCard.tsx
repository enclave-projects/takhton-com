/**
 * Product card component for product grid
 * @module components/takhton/product/ProductCard
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/takhton/common/Badge";
import { PriceDisplay } from "@/components/takhton/common/PriceDisplay";
import { WishlistButton } from "@/components/takhton/common/WishlistButton";
import type { Product } from "@/types/product";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { slug, name, images, badge, price, originalPrice } = product;

  return (
    <Link href={`/product/${slug}`} className="group block">
      <article
        className={cn(
          "relative flex flex-col transition-all duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
          className,
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-3/4 overflow-hidden bg-gray-100 rounded-sm">
          {images[0] && (
            <Image
              src={images[0]}
              alt={name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Badge */}
          {badge && (
            <div className="absolute top-3 left-3">
              <Badge variant={badge} />
            </div>
          )}

          {/* Wishlist Button */}
          <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <WishlistButton product={product} />
          </div>

          {/* Quick Add Button (appears on hover) */}
          <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              className={cn(
                "w-full py-3 px-4 text-sm font-medium text-center",
                "bg-white/90 backdrop-blur-sm text-black rounded-full",
                "hover:bg-white transition-colors duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black",
              )}
            >
              Quick Add
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 flex flex-col gap-1">
          <h3 className="text-sm font-medium text-black group-hover:underline underline-offset-4">
            {name}
          </h3>
          <PriceDisplay price={price} originalPrice={originalPrice} size="sm" />
        </div>
      </article>
    </Link>
  );
}
