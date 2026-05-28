/**
 * Cart page for Takhton
 * @module app/cart/page
 */

"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { CartItem } from "@/components/takhton/cart/CartItem";
import { CartSummary } from "@/components/takhton/cart/CartSummary";

export default function CartPage() {
  const { items, subtotal, shipping, tax, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h1 className="t-heading-xl mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">
            Looks like you have not added anything to your cart yet.
          </p>
          <Link
            href="/shop"
            className={cn(
              "inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full",
              "bg-black text-white hover:bg-gray-800 transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
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
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="t-heading-xl mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-[1fr,380px] gap-12">
          {/* Cart Items */}
          <div>
            <div className="border-t border-gray-200">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <Link
              href="/shop"
              className={cn(
                "inline-flex items-center gap-2 mt-8 text-sm font-medium",
                "text-gray-600 hover:text-black transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black",
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Cart Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              className="mb-6"
            />

            <h3 className="text-sm font-medium mb-4">
              Accepted Payment Methods
            </h3>
            <div className="flex gap-2 text-sm text-gray-500 mb-6">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>Amex</span>
              <span>PayPal</span>
            </div>

            <Link
              href="/checkout"
              className={cn(
                "block w-full py-4 text-center text-sm font-medium rounded-full",
                "bg-black text-white hover:bg-gray-800 transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed",
              )}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
