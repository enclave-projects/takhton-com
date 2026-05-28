/**
 * Cart state management using Zustand
 * @module store/cart
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Cart } from '@/types/cart'
import type { Product, ColorOption } from '@/types/product'
import { CURRENCY_SYMBOL, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST, TAX_RATE } from '@/lib/constants'

interface CartState extends Cart {
  isOpen: boolean
  addToCart: (product: Product, size: string, color: ColorOption, quantity?: number) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
}

function generateItemId(productId: string, size: string, colorName: string): string {
  return `${productId}-${size}-${colorName}`
}

function calculateCartTotals(items: CartItem[]): Omit<Cart, 'items'> {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST
  const tax = subtotal * TAX_RATE
  const total = subtotal + shipping + tax
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return {
    subtotal,
    shipping,
    tax,
    total,
    itemCount,
  }
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
      itemCount: 0,
      isOpen: false,

      addToCart: (product, size, color, quantity = 1) => {
        const items = get().items
        const itemId = generateItemId(product.id, size, color.name)

        const existingItem = items.find((item) => item.id === itemId)

        let newItems: CartItem[]

        if (existingItem) {
          newItems = items.map((item) =>
            item.id === itemId
              ? { ...item, quantity: Math.min(item.quantity + quantity, 10) }
              : item
          )
        } else {
          const newItem: CartItem = {
            id: itemId,
            product,
            size,
            color,
            quantity,
            addedAt: new Date(),
          }
          newItems = [...items, newItem]
        }

        const totals = calculateCartTotals(newItems)
        set({ items: newItems, ...totals })
      },

      removeFromCart: (itemId) => {
        const items = get().items.filter((item) => item.id !== itemId)
        const totals = calculateCartTotals(items)
        set({ items, ...totals })
      },

      updateQuantity: (itemId, quantity) => {
        const items = get().items
          .map((item) => (item.id === itemId ? { ...item, quantity: Math.max(1, Math.min(quantity, 10)) } : item))
          .filter((item) => item.quantity > 0)

        const totals = calculateCartTotals(items)
        set({ items, ...totals })
      },

      clearCart: () => {
        set({
          items: [],
          subtotal: 0,
          shipping: 0,
          tax: 0,
          total: 0,
          itemCount: 0,
        })
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen })
      },

      setCartOpen: (open) => {
        set({ isOpen: open })
      },
    }),
    {
      name: 'takhton-cart',
      partialize: (state) => ({
        items: state.items,
        subtotal: state.subtotal,
        shipping: state.shipping,
        tax: state.tax,
        total: state.total,
        itemCount: state.itemCount,
      }),
    }
  )
)

// Formatter helpers
export function formatPrice(price: number): string {
  return `${CURRENCY_SYMBOL}${price.toFixed(2)}`
}
