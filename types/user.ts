/**
 * User type definitions for Takhton
 * @module types/user
 */

import type { Product } from './product'

export interface User {
  id: string
  email: string
  fullName: string
  avatarUrl?: string
  phone?: string
  addresses: ShippingAddress[]
  createdAt: Date
}

export interface WishlistItem {
  id: string
  product: Product
  addedAt: Date
}

export interface UserProfile {
  fullName: string
  email: string
  phone?: string
  avatarUrl?: string
}

import type { ShippingAddress as OrderShippingAddress } from './order'
type ShippingAddress = OrderShippingAddress
