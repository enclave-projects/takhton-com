/**
 * Cart type definitions for Takhton
 * @module types/cart
 */

import type { Product, ColorOption } from './product'

export interface CartItem {
  id: string
  product: Product
  size: string
  color: ColorOption
  quantity: number
  addedAt: Date
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  itemCount: number
}

export interface CartUpdateAction {
  type: 'add' | 'remove' | 'updateQuantity'
  itemId: string
  quantity?: number
}
