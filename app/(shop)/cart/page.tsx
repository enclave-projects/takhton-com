/**
 * Cart page for Takhton
 * @module app/cart/page
 */

"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { CartItem } from "@/components/takhton/cart/CartItem";
import { CartSummary } from "@/components/takhton/cart/CartSummary";

export default function CartPage() {
  const { items, subtotal, shipping, tax, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#030c1b] px-4 text-[#f3ebd8]">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-5 h-12 w-12 text-[#dfc38a]/40" />
          <h1 className="mb-3 font-serif text-3xl uppercase tracking-wide text-[#f3ebd8] md:text-4xl">
            Your bag is empty
          </h1>
          <p className="mb-9 max-w-md text-sm text-[#f3ebd8]/65">
            You haven&apos;t added anything to your bag yet. Browse the
            collection to find your next piece.
          </p>
          <Link
            href="/shop"
            className={cn(
              "inline-flex items-center gap-2 border border-[#dfc38a] bg-[#dfc38a] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#030c1b]",
              "transition-colors hover:bg-[#f3ebd8]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
            )}
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030c1b] text-[#f3ebd8]">
      <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="t-eyebrow mb-3 text-[#dfc38a]">Step 1 of 2</p>
          <h1 className="font-serif text-4xl uppercase tracking-wide text-[#f3ebd8] md:text-5xl">
            Shopping Bag
          </h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Cart Items */}
          <div>
            <div className="border-t border-[#dfc38a]/20">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <Link
              href="/shop"
              className={cn(
                "mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider",
                "text-[#f3ebd8]/70 transition-colors hover:text-[#dfc38a]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a]",
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Cart Summary */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              className="mb-6"
            />

            <Link
              href="/checkout"
              className={cn(
                "block w-full border border-[#dfc38a] bg-[#dfc38a] py-4 text-center text-xs font-bold uppercase tracking-wider text-[#030c1b]",
                "transition-colors hover:bg-[#f3ebd8]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
              )}
            >
              Proceed to Checkout
            </Link>

            <div className="mt-6">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#dfc38a]/80">
                Accepted Payment Methods
              </p>
              <p className="text-xs text-[#f3ebd8]/60">
                Visa · Mastercard · American Express · PayPal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
