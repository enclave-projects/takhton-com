/**
 * Application-wide constants for Takhton
 * @module lib/constants
 */

// Brand
export const BRAND_NAME = "Takhton";
export const BRAND_TAGLINE = "Regal Threads. Modern Soul.";
// Use a placeholder logo for now
export const BRAND_LOGO =
  "https://placehold.co/100x100/1a365d/ffd700/png?text=T&font=playfair-display";

// Currency
export const CURRENCY = "INR";
export const CURRENCY_SYMBOL = "₹";

// Shipping
export const FREE_SHIPPING_THRESHOLD = 150;
export const STANDARD_SHIPPING_COST = 12;
export const EXPRESS_SHIPPING_COST = 25;

// Pagination
export const PRODUCTS_PER_PAGE = 12;

// Product categories
export const CATEGORIES = [
  { id: "men", slug: "men", name: "Men", description: "Contemporary menswear" },
  {
    id: "women",
    slug: "women",
    name: "Women",
    description: "Elegant womenswear",
  },
  {
    id: "accessories",
    slug: "accessories",
    name: "Accessories",
    description: "Refined accents",
  },
  {
    id: "limited",
    slug: "limited",
    name: "Limited Edition",
    description: "Exclusive drops",
  },
] as const;

// Clothing sizes
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

// Common colors
export const COMMON_COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Cream", hex: "#F5F5DC" },
  { name: "Navy", hex: "#1A1A2E" },
  { name: "Olive", hex: "#556B2F" },
  { name: "Burgundy", hex: "#800020" },
  { name: "Camel", hex: "#C19A6B" },
  { name: "Charcoal", hex: "#36454F" },
] as const;

// Order statuses
export const ORDER_STATUSES = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

// Tax rate
export const TAX_RATE = 0.08;
