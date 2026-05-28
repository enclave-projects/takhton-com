/**
 * Order type definitions for Takhton
 * @module types/order
 */

import type { CartItem } from './cart'

export interface ShippingAddress {
  fullName: string
  email: string
  address: string
  city: string
  postalCode: string
  country: string
  phone?: string
}

export interface PaymentMethod {
  type: 'card' | 'cod'
  cardNumber?: string
  cardExpiry?: string
  cardCvv?: string
}

export interface Order {
  id: string
  orderNumber: string
  items: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface CheckoutStep {
  step: number
  title: string
  description: string
}

export const CHECKOUT_STEPS: CheckoutStep[] = [
  { step: 1, title: 'Shipping', description: 'Delivery details' },
  { step: 2, title: 'Payment', description: 'Secure checkout' },
  { step: 3, title: 'Review', description: 'Confirm order' },
]
