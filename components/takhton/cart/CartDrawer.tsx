/**
 * Cart drawer component that slides in from the right
 * @module components/takhton/cart/CartDrawer
 */

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

export function CartDrawer() {
  const { items, isOpen, setCartOpen, subtotal, shipping, tax, total } =
    useCartStore();

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, setCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#030c1b]/80 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full sm:w-[420px]",
          "border-l border-[#dfc38a]/20 bg-[#030c1b] text-[#f3ebd8] shadow-[0_0_60px_rgba(0,0,0,0.6)]",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dfc38a]/15 px-5 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-[#dfc38a]" />
            <h2 className="font-serif text-lg uppercase tracking-[0.16em] text-[#f3ebd8]">
              Your Bag
            </h2>
            <span className="text-xs text-[#f3ebd8]/60">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="rounded-full p-2 text-[#dfc38a] transition-colors hover:bg-[#dfc38a]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a]"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100dvh-73px)] flex-col overflow-hidden">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <ShoppingBag className="mb-5 h-12 w-12 text-[#dfc38a]/40" />
              <p className="mb-2 font-serif text-xl uppercase tracking-wider text-[#f3ebd8]">
                Your bag is empty
              </p>
              <p className="mb-7 max-w-xs text-sm leading-6 text-[#f3ebd8]/65">
                Add a piece from the collection and it will appear here.
              </p>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className={cn(
                  "border border-[#dfc38a] bg-[#dfc38a] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#030c1b]",
                  "transition-colors hover:bg-[#f3ebd8]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
                )}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-5">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-[#dfc38a]/15 bg-[#05142c] px-5 py-5">
                <CartSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                  variant="compact"
                />
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className={cn(
                    "mt-5 block w-full border border-[#dfc38a] bg-[#dfc38a] py-3.5 text-center text-xs font-bold uppercase tracking-wider text-[#030c1b]",
                    "transition-colors hover:bg-[#f3ebd8]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
                  )}
                >
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
