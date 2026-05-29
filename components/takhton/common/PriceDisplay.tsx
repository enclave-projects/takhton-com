/**
 * Price display component with optional sale pricing
 * @module components/takhton/common/PriceDisplay
 */

import { cn } from "@/lib/utils";
import { formatPrice } from "@/store/cart.store";

export interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** When true, force the muted/strikethrough color appropriate for dark surfaces. Defaults to true (the brand surface). */
  onDark?: boolean;
}

const sizeStyles: Record<NonNullable<PriceDisplayProps["size"]>, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function PriceDisplay({
  price,
  originalPrice,
  size = "md",
  className,
  onDark = true,
}: PriceDisplayProps) {
  const hasDiscount = originalPrice !== undefined && originalPrice > price;

  // Sale price emphasis: gold on dark surfaces, deep gold on light surfaces.
  const salePriceColor = onDark ? "text-[#dfc38a]" : "text-[#c5a880]";
  const strikeColor = onDark ? "text-[#f3ebd8]/45" : "text-[#030c1b]/40";

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-medium tabular-nums",
          sizeStyles[size],
          hasDiscount && salePriceColor,
        )}
      >
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <span
          className={cn(
            "tabular-nums line-through",
            sizeStyles[size],
            strikeColor,
          )}
        >
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  );
}
