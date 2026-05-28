/**
 * Product type definitions for Takhton
 * @module types/product
 */

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  sizes: readonly string[];
  colors: readonly ColorOption[];
  images: readonly string[];
  badge?: "new" | "sale" | "limited";
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
}

export interface ProductFilterState {
  categories: readonly string[];
  priceRange: readonly [number, number];
  sizes: readonly string[];
  colors: readonly string[];
  sortBy: "newest" | "price-low" | "price-high" | "name";
}
