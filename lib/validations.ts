/**
 * Zod validation schemas for Takhton
 * @module lib/validations
 */

import { z } from 'zod'

// Product schemas
export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string().min(1, 'Product name is required'),
  description: z.string(),
  price: z.number().positive('Price must be positive'),
  originalPrice: z.number().positive().optional(),
  category: z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
  sizes: z.array(z.string()),
  colors: z.array(z.object({
    name: z.string(),
    hex: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color'),
  })),
  images: z.array(z.string().url()),
  badge: z.enum(['new', 'sale', 'limited']).optional(),
  inStock: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Cart schemas
export const CartItemSchema = z.object({
  id: z.string(),
  product: ProductSchema,
  size: z.string().min(1, 'Size is required'),
  color: z.object({
    name: z.string(),
    hex: z.string(),
  }),
  quantity: z.number().int().positive().min(1).max(10),
  addedAt: z.date(),
})

export const AddToCartSchema = z.object({
  productId: z.string(),
  size: z.string().min(1, 'Please select a size'),
  colorName: z.string().min(1, 'Please select a color'),
  quantity: z.number().int().positive().min(1).max(10).default(1),
})

export type AddToCartValues = z.infer<typeof AddToCartSchema>

// Order schemas
export const ShippingAddressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(3, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  phone: z.string().optional(),
})

export type ShippingAddressValues = z.infer<typeof ShippingAddressSchema>

export const PaymentMethodSchema = z.object({
  type: z.enum(['card', 'cod']),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
}).refine((data) => {
  if (data.type === 'card') {
    return data.cardNumber && data.cardExpiry && data.cardCvv
  }
  return true
}, {
  message: 'Card details are required for card payment',
  path: ['cardNumber'],
})

export type PaymentMethodValues = z.infer<typeof PaymentMethodSchema>

// Checkout form schema (combines shipping + payment)
export const CheckoutFormSchema = z.object({
  shipping: ShippingAddressSchema,
  payment: PaymentMethodSchema,
})

export type CheckoutFormValues = z.infer<typeof CheckoutFormSchema>

// Newsletter schema
export const NewsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export type NewsletterValues = z.infer<typeof NewsletterSchema>

// User profile schema
export const UserProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
})

export type UserProfileValues = z.infer<typeof UserProfileSchema>
