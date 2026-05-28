/**
 * Cart drawer component that slides in from the right
 * @module components/takhton/cart/CartDrawer
 */

"use client";

import { X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, setCartOpen, subtotal, shipping, tax, total } =
    useCartStore();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setCartOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <span className="text-sm text-gray-500">
              ({items.length} items)
            </span>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100vh-140px)] overflow-hidden">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Your cart is empty
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Add some items to get started
              </p>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className={cn(
                  "px-6 py-3 text-sm font-medium rounded-full",
                  "bg-black text-white hover:bg-gray-800 transition-colors",
                )}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <CartSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                />
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className={cn(
                    "block w-full mt-4 py-3 text-center text-sm font-medium rounded-full",
                    "bg-black text-white hover:bg-gray-800 transition-colors",
                  )}
                >
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
