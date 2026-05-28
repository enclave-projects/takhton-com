/**
 * Checkout page for Takhton
 * @module app/checkout/page
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Truck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/cart.store'
import { CartSummary } from '@/components/takhton/cart/CartSummary'
import { StepIndicator } from '@/components/takhton/checkout/StepIndicator'
import { CHECKOUT_STEPS } from '@/types/order'

export default function CheckoutPage() {
  const { items, subtotal, shipping, tax, total } = useCartStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card')

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="t-heading-xl mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add some items to proceed to checkout.</p>
        <Link
          href="/shop"
          className={cn(
            'inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full',
            'bg-black text-white hover:bg-gray-800 transition-colors',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
          )}
        >
          Continue Shopping
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/cart"
          className={cn(
            'inline-flex items-center gap-2 mb-8 text-sm font-medium',
            'text-gray-600 hover:text-black transition-colors',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-black'
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <h1 className="t-heading-xl mb-8">Checkout</h1>

        {/* Step Indicator */}
        <div className="mb-12">
          <StepIndicator steps={CHECKOUT_STEPS} currentStep={currentStep} />
        </div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Shipping Step */}
            {currentStep === 1 && (
              <section>
                <h2 className="t-heading-lg mb-6">Shipping Information</h2>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                      placeholder="Enter your address"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                        placeholder="Postal code"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-2">
                      Country
                    </label>
                    <select
                      id="country"
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black bg-white"
                    >
                      <option value="">Select country</option>
                      <option value="us">United States</option>
                      <option value="ca">Canada</option>
                      <option value="uk">United Kingdom</option>
                      <option value="au">Australia</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className={cn(
                      'w-full py-4 text-sm font-medium rounded-full',
                      'bg-black text-white hover:bg-gray-800 transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
                    )}
                  >
                    Continue to Payment
                  </button>
                </form>
              </section>
            )}

            {/* Payment Step */}
            {currentStep === 2 && (
              <section>
                <h2 className="t-heading-lg mb-6">Payment Method</h2>

                {/* Payment Options */}
                <div className="space-y-4 mb-8">
                  <label
                    className={cn(
                      'flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition-colors',
                      'hover:border-black focus-within:ring-2 focus-within:ring-black',
                      paymentMethod === 'card' ? 'border-black' : 'border-gray-200'
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="h-4 w-4 text-black focus:ring-black"
                    />
                    <CreditCard className="h-5 w-5" />
                    <span className="font-medium">Credit / Debit Card</span>
                  </label>

                  <label
                    className={cn(
                      'flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition-colors',
                      'hover:border-black focus-within:ring-2 focus-within:ring-black',
                      paymentMethod === 'cod' ? 'border-black' : 'border-gray-200'
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="h-4 w-4 text-black focus:ring-black"
                    />
                    <Truck className="h-5 w-5" />
                    <span className="font-medium">Cash on Delivery</span>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                          placeholder="MM / YY"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className={cn(
                      'px-8 py-4 text-sm font-medium rounded-full',
                      'border border-gray-200 hover:border-black transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
                    )}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className={cn(
                      'flex-1 py-4 text-sm font-medium rounded-full',
                      'bg-black text-white hover:bg-gray-800 transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
                    )}
                  >
                    Continue to Review
                  </button>
                </div>
              </section>
            )}

            {/* Review Step */}
            {currentStep === 3 && (
              <section>
                <h2 className="t-heading-lg mb-6">Review Your Order</h2>

                <div className="space-y-6 mb-8">
                  {/* Order Items Summary */}
                  <div className="border border-gray-200 rounded-sm p-4">
                    <h3 className="text-sm font-medium mb-4">Order Items ({items.length})</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.product.name} × {item.quantity}
                          </span>
                          <span className="font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Summary */}
                  <div className="border border-gray-200 rounded-sm p-4">
                    <h3 className="text-sm font-medium mb-4">Shipping Address</h3>
                    <p className="text-sm text-gray-600">
                      Your shipping details will appear here after completing the shipping form.
                    </p>
                  </div>

                  {/* Payment Summary */}
                  <div className="border border-gray-200 rounded-sm p-4">
                    <h3 className="text-sm font-medium mb-4">Payment Method</h3>
                    <p className="text-sm text-gray-600">
                      {paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className={cn(
                      'px-8 py-4 text-sm font-medium rounded-full',
                      'border border-gray-200 hover:border-black transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
                    )}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className={cn(
                      'flex-1 py-4 text-sm font-medium rounded-full',
                      'bg-black text-white hover:bg-gray-800 transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
                    )}
                  >
                    Place Order
                  </button>
                </div>
              </section>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
