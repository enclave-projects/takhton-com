/**
 * Cart item component for cart page
 * @module components/takhton/cart/CartItem
 */

'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { QuantityInput } from '@/components/takhton/common/QuantityInput'
import { PriceDisplay } from '@/components/takhton/common/PriceDisplay'
import { useCartStore } from '@/store/cart.store'
import type { CartItem as CartItemType } from '@/types/cart'

export interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCartStore()
  const { id, product, size, color, quantity } = item

  return (
    <div className="flex gap-4 py-6 border-b border-gray-100">
      {/* Product Image */}
      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-gray-100 rounded-sm">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium text-black">{product.name}</h4>
            <p className="text-sm text-gray-500 mt-1">
              Size: {size} · Color: {color.name}
            </p>
          </div>
          <PriceDisplay price={product.price * quantity} size="sm" />
        </div>

        <div className="flex items-center justify-between mt-4">
          <QuantityInput
            value={quantity}
            onChange={(value) => updateQuantity(id, value)}
            min={1}
            max={10}
          />

          <button
            type="button"
            onClick={() => removeFromCart(id)}
            aria-label="Remove item from cart"
            className={cn(
              'p-2 text-gray-400 hover:text-red-500 transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm'
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
