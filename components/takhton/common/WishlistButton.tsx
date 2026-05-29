/**
 * Wishlist button component with heart icon
 * @module components/takhton/common/WishlistButton
 */

"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist.store";
import type { Product } from "@/types/product";

export interface WishlistButtonProps {
  product: Product;
  className?: string;
  /** Render variant. 'overlay' is the default for dark image overlays; 'solid' is for the product detail action row. */
  variant?: "overlay" | "solid";
}

export function WishlistButton({
  product,
  className,
  variant = "overlay",
}: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const overlayStyles = inWishlist
    ? "bg-[#dfc38a] text-[#030c1b]"
    : "bg-[#030c1b]/70 text-[#dfc38a] hover:bg-[#030c1b]/90 hover:text-[#f3ebd8] backdrop-blur";

  const solidStyles = inWishlist
    ? "border-[#dfc38a] bg-[#dfc38a] text-[#030c1b]"
    : "border-[#dfc38a]/40 bg-transparent text-[#dfc38a] hover:border-[#dfc38a] hover:bg-[#dfc38a]/10";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
      }}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={inWishlist}
      className={cn(
        "transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
        variant === "overlay"
          ? cn("p-2 rounded-full", overlayStyles)
          : cn("border p-3", solidStyles),
        className,
      )}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all duration-200",
          inWishlist && "fill-current",
        )}
      />
    </button>
  );
}
