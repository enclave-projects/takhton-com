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
}

const sizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function PriceDisplay({
  price,
  originalPrice,
  size = "md",
  className,
}: PriceDisplayProps) {
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-medium",
          sizeStyles[size],
          hasDiscount && "text-red-600",
        )}
      >
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <span className={cn("text-gray-400 line-through", sizeStyles[size])}>
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  );
}
