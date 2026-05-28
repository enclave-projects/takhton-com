/**
 * Wishlist button component with heart icon
 * @module components/takhton/common/WishlistButton
 */

'use client'

import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useWishlistStore } from '@/store/wishlist.store'
import type { Product } from '@/types/product'

export interface WishlistButtonProps {
  product: Product
  className?: string
}

export function WishlistButton({ product, className }: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleWishlist(product)
      }}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={inWishlist}
      className={cn(
        'p-2 rounded-full transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
        inWishlist
          ? 'bg-red-50 text-red-500 hover:bg-red-100'
          : 'bg-white/80 text-gray-600 hover:bg-white hover:text-black',
        className
      )}
    >
      <Heart
        className={cn(
          'h-5 w-5 transition-all duration-200',
          inWishlist && 'fill-current'
        )}
      />
    </button>
  )
}
