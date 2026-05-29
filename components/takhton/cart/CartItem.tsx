/**
 * Cart item component for cart page and drawer
 * @module components/takhton/cart/CartItem
 */

"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuantityInput } from "@/components/takhton/common/QuantityInput";
import { PriceDisplay } from "@/components/takhton/common/PriceDisplay";
import { useCartStore } from "@/store/cart.store";
import type { CartItem as CartItemType } from "@/types/cart";

export interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCartStore();
  const { id, product, size, color, quantity } = item;

  return (
    <div className="flex gap-4 border-b border-[#dfc38a]/15 py-5 last:border-b-0">
      {/* Product Image */}
      <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden border border-[#dfc38a]/20 bg-[#071b47]">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-3">
          <div className="min-w-0">
            <h4 className="truncate text-sm font-medium uppercase tracking-wide text-[#f3ebd8]">
              {product.name}
            </h4>
            <p className="mt-1 text-xs text-[#f3ebd8]/60">
              <span>Size {size}</span>
              <span className="mx-2 text-[#dfc38a]/40">·</span>
              <span>{color.name}</span>
            </p>
          </div>
          <PriceDisplay price={product.price * quantity} size="sm" />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <QuantityInput
            value={quantity}
            onChange={(value) => updateQuantity(id, value)}
            min={1}
            max={10}
          />

          <button
            type="button"
            onClick={() => removeFromCart(id)}
            aria-label={`Remove ${product.name} from cart`}
            className={cn(
              "p-2 text-[#f3ebd8]/50 transition-colors hover:text-[#dfc38a]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
