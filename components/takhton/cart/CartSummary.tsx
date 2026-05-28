/**
 * Cart summary component for order totals
 * @module components/takhton/cart/CartSummary
 */

import { cn } from '@/lib/utils'
import { formatPrice } from '@/store/cart.store'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants'

export interface CartSummaryProps {
  subtotal: number
  shipping: number
  tax: number
  total: number
  className?: string
}

export function CartSummary({ subtotal, shipping, tax, total, className }: CartSummaryProps) {
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  return (
    <div className={cn('bg-gray-50 p-6 rounded-lg', className)}>
      <h3 className={cn('text-lg font-medium text-black mb-6')}>
        Order Summary
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-black">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-black">
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-black">{formatPrice(tax)}</span>
        </div>

        {remainingForFreeShipping > 0 && (
          <p className="text-xs text-gray-500">
            Add {formatPrice(remainingForFreeShipping)} more for free shipping
          </p>
        )}

        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between">
            <span className="font-medium text-black">Total</span>
            <span className="font-semibold text-lg text-black">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
