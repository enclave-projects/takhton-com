/**
 * Application-wide constants for Takhton
 * @module lib/constants
 */

// Brand
export const BRAND_NAME = "Takhton";
export const BRAND_TAGLINE =
  "A kingdom of style. Where velvet whispers power and every stitch wears the crown.";
export const BRAND_LOGO = "/takhton-logo.png";

// Currency
export const CURRENCY = "USD";
export const CURRENCY_SYMBOL = "$";

// Shipping
export const FREE_SHIPPING_THRESHOLD = 150;
export const STANDARD_SHIPPING_COST = 12;
export const EXPRESS_SHIPPING_COST = 25;

// Pagination
export const PRODUCTS_PER_PAGE = 12;

// Product categories (Takhton is menswear only — categorised by garment type)
export const CATEGORIES = [
  {
    id: "shirts",
    slug: "shirts",
    name: "Shirts",
    description: "Tailored shirts crafted for the modern king",
  },
  {
    id: "t-shirts",
    slug: "t-shirts",
    name: "T-Shirts",
    description: "Heavyweight tees with regal embellishments",
  },
  {
    id: "pants",
    slug: "pants",
    name: "Pants",
    description: "Trousers and chinos with palace tailoring",
  },
  {
    id: "outerwear",
    slug: "outerwear",
    name: "Outerwear",
    description: "Jackets and suits for ceremonial presence",
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
