/**
 * Wishlist state management using Zustand
 * @module store/wishlist
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WishlistItem } from '@/types/user'
import type { Product } from '@/types/product'

interface WishlistState {
  items: WishlistItem[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  toggleWishlist: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) => {
        const items = get().items
        const exists = items.some((item) => item.product.id === product.id)

        if (!exists) {
          const newItem: WishlistItem = {
            id: `wish-${product.id}`,
            product,
            addedAt: new Date(),
          }
          set({ items: [...items, newItem] })
        }
      },

      removeFromWishlist: (productId) => {
        const items = get().items.filter((item) => item.product.id !== productId)
        set({ items })
      },

      toggleWishlist: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeFromWishlist(product.id)
        } else {
          get().addToWishlist(product)
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.product.id === productId)
      },

      clearWishlist: () => {
        set({ items: [] })
      },
    }),
    {
      name: 'takhton-wishlist',
    }
  )
)
