/**
 * Cart summary component for order totals
 * @module components/takhton/cart/CartSummary
 */

import { cn } from "@/lib/utils";
import { formatPrice } from "@/store/cart.store";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  className?: string;
  /** 'card' for a standalone container (cart page); 'compact' for inline use (drawer footer). */
  variant?: "card" | "compact";
}

export function CartSummary({
  subtotal,
  shipping,
  tax,
  total,
  className,
  variant = "card",
}: CartSummaryProps) {
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal,
  );

  return (
    <div
      className={cn(
        variant === "card" &&
          "border border-[#dfc38a]/20 bg-[#05142c] p-7 text-[#f3ebd8]",
        variant === "compact" && "text-[#f3ebd8]",
        className,
      )}
    >
      {variant === "card" && (
        <h3 className="mb-6 font-serif text-lg uppercase tracking-[0.16em] text-[#dfc38a]">
          Order Summary
        </h3>
      )}

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#f3ebd8]/70">Subtotal</span>
          <span className="font-medium tabular-nums text-[#f3ebd8]">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-[#f3ebd8]/70">Shipping</span>
          <span className="font-medium tabular-nums text-[#f3ebd8]">
            {shipping === 0 ? (
              <span className="text-[#dfc38a]">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-[#f3ebd8]/70">Tax</span>
          <span className="font-medium tabular-nums text-[#f3ebd8]">
            {formatPrice(tax)}
          </span>
        </div>

        {remainingForFreeShipping > 0 && (
          <p className="pt-1 text-[11px] uppercase tracking-wider text-[#dfc38a]/80">
            Add {formatPrice(remainingForFreeShipping)} for free shipping
          </p>
        )}

        <div className="mt-4 border-t border-[#dfc38a]/15 pt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#dfc38a]">
              Total
            </span>
            <span className="font-serif text-2xl tabular-nums text-[#f3ebd8]">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
