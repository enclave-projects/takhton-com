/**
 * Product grid component for displaying products
 * @module components/takhton/product/ProductGrid
 */

import { ProductCard } from './ProductCard'
import type { Product } from '@/types/product'

export interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
}

const columnStyles = {
  2: 'grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="w-full py-20 text-center">
        <p className="text-gray-500">No products found</p>
      </div>
    )
  }

  return (
    <div className={`grid ${columnStyles[columns]} gap-x-6 gap-y-10`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
