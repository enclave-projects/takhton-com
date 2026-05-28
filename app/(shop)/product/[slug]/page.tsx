/**
 * Product detail page for Takhton
 * @module app/product/page
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Share2, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { products, getRelatedProducts, getProductBySlug } from '@/lib/data'
import { useCartStore } from '@/store/cart.store'
import { useWishlistStore } from '@/store/wishlist.store'
import { Badge } from '@/components/takhton/common/Badge'
import { PriceDisplay } from '@/components/takhton/common/PriceDisplay'
import { SizeSelector } from '@/components/takhton/common/SizeSelector'
import { ColorSwatch } from '@/components/takhton/common/ColorSwatch'
import { QuantityInput } from '@/components/takhton/common/QuantityInput'
import { ProductGrid } from '@/components/takhton/product/ProductGrid'

export interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = { slug: 'merino-wool-overshirt' } // Mock for now
  const product = getProductBySlug(resolvedParams.slug) || products[0]
  const { addToCart } = useCartStore()
  const { isInWishlist, toggleWishlist } = useWishlistStore()
  const relatedProducts = getRelatedProducts(product.id, 4)

  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '')
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'description' | 'shipping' | 'returns'>('description')

  const handleAddToCart = () => {
    const color = product.colors.find((c) => c.name === selectedColor)
    if (color) {
      addToCart(product, selectedSize, color, quantity)
    }
  }

  const inWishlist = isInWishlist(product.id)

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category.slug}`} className="hover:text-black">
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden mb-4">
              {product.images[selectedImage] && (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              )}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant={product.badge} />
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      'relative h-20 w-20 flex-shrink-0 rounded-sm overflow-hidden',
                      'border-2 transition-colors',
                      selectedImage === idx ? 'border-black' : 'border-transparent hover:border-gray-300',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-black'
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex-1">
              <h1 className="t-heading-xl mb-2">{product.name}</h1>
              <PriceDisplay
                price={product.price}
                originalPrice={product.originalPrice}
                size="lg"
                className="mb-4"
              />

              {/* Short Description */}
              <p className="text-gray-600 mb-8">
                {product.description.substring(0, 150)}...
              </p>

              {/* Color Selector */}
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-3">Color</h3>
                <ColorSwatch
                  colors={product.colors}
                  selected={selectedColor}
                  onChange={setSelectedColor}
                />
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Size</h3>
                  <Link
                    href="#"
                    className="text-xs underline underline-offset-4 text-gray-500 hover:text-black"
                  >
                    Size Guide
                  </Link>
                </div>
                <SizeSelector
                  sizes={product.sizes}
                  selected={selectedSize}
                  onChange={setSelectedSize}
                  disabledSizes={product.sizes.slice(-2)} // Mock out of stock
                />
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-3">Quantity</h3>
                <QuantityInput
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={10}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mb-12">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={cn(
                    'flex-1 py-4 px-8 text-sm font-medium rounded-full',
                    'bg-black text-white hover:bg-gray-800 transition-colors',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
                  )}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    'p-4 rounded-sm border transition-colors',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black',
                    inWishlist
                      ? 'border-red-200 bg-red-50 text-red-500'
                      : 'border-gray-200 hover:border-black'
                  )}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
                </button>
                <button
                  type="button"
                  className="p-4 rounded-sm border border-gray-200 hover:border-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  aria-label="Share product"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {/* Accordion Info */}
              <div className="border-t border-gray-200">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'shipping', label: 'Shipping & Returns' },
                  { id: 'returns', label: 'Care Instructions' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className="w-full py-4 flex items-center justify-between border-b border-gray-100"
                  >
                    <span className="text-sm font-medium">{tab.label}</span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        activeTab === tab.id && 'rotate-180'
                      )}
                    />
                  </button>
                ))}

                {activeTab === 'description' && (
                  <div className="py-4 text-sm text-gray-600">
                    {product.description}
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="py-4 text-sm text-gray-600 space-y-2">
                    <p>Free shipping on orders over $150</p>
                    <p>Standard shipping: 5-7 business days ($12)</p>
                    <p>Express shipping: 2-3 business days ($25)</p>
                  </div>
                )}
                {activeTab === 'returns' && (
                  <div className="py-4 text-sm text-gray-600">
                    <p>Dry clean or hand wash cold. Lay flat to dry. Cool iron if needed.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 border-t border-gray-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="t-heading-xl mb-8">You May Also Like</h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        </section>
      )}
    </div>
  )
}
