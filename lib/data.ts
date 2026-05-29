/**
 * Mock data for Takhton e-commerce (menswear only)
 * @module lib/data
 */

import type { Product, Category } from "@/types/product";
import { CATEGORIES, COMMON_COLORS, SIZES } from "@/lib/constants";

function getCategoryImage(category: string): string {
  return `https://picsum.photos/seed/takhton-${category}/900/700`;
}

function getProductImage(seed: string): string {
  return `https://picsum.photos/seed/takhton-${seed}/700/900`;
}

export const categories: Category[] = CATEGORIES.map((cat) => ({
  id: cat.id,
  slug: cat.slug,
  name: cat.name,
  description: cat.description,
  image: getCategoryImage(cat.slug),
}));

const [SHIRTS, TSHIRTS, PANTS, OUTERWEAR] = categories;

export const products: Product[] = [
  {
    id: "1",
    slug: "royal-sapphire-dress-shirt",
    name: "Royal Sapphire Dress Shirt",
    description:
      "Sapphire-blue dress shirt cut from long-staple cotton with mother-of-pearl buttons and a discreet gold-embroidered crown at the cuff.",
    price: 145,
    category: SHIRTS,
    sizes: SIZES,
    colors: [
      { name: "Sapphire", hex: "#0d2142" },
      { name: "White", hex: "#ffffff" },
    ],
    images: [
      getProductImage("royal-sapphire-dress-shirt"),
      getProductImage("royal-sapphire-dress-shirt-cuff"),
    ],
    badge: "new",
    inStock: true,
    createdAt: new Date("2026-05-28"),
    updatedAt: new Date("2026-05-28"),
  },
  {
    id: "2",
    slug: "embroidered-crest-tee",
    name: "Embroidered Crest Tee",
    description:
      "Heavyweight black tee with an ornate gold crest embroidered across the back. Garment-dyed for depth, pre-shrunk for shape retention.",
    price: 95,
    category: TSHIRTS,
    sizes: SIZES,
    colors: [COMMON_COLORS[0], { name: "Crest Gold", hex: "#c5a880" }],
    images: [
      getProductImage("embroidered-crest-tee"),
      getProductImage("embroidered-crest-tee-back"),
    ],
    inStock: true,
    createdAt: new Date("2026-05-27"),
    updatedAt: new Date("2026-05-27"),
  },
  {
    id: "3",
    slug: "palace-tailored-trousers",
    name: "Palace Tailored Trousers",
    description:
      "Mid-weight wool trousers with a clean tapered leg, side-tab adjusters, and a subtle Takhton crown at the back-pocket bartack.",
    price: 185,
    category: PANTS,
    sizes: SIZES,
    colors: [
      { name: "Midnight", hex: "#030c1b" },
      { name: "Charcoal", hex: "#36454f" },
    ],
    images: [
      getProductImage("palace-tailored-trousers"),
      getProductImage("palace-tailored-trousers-detail"),
    ],
    badge: "new",
    inStock: true,
    createdAt: new Date("2026-05-26"),
    updatedAt: new Date("2026-05-26"),
  },
  {
    id: "4",
    slug: "heritage-linen-shirt",
    name: "Heritage Linen Shirt",
    description:
      "Pure Italian linen shirt in cream, cut for warm climates with a relaxed regal silhouette and tonal horn buttons.",
    price: 130,
    category: SHIRTS,
    sizes: SIZES,
    colors: [
      COMMON_COLORS[2],
      { name: "Sand", hex: "#d6c2a3" },
      { name: "White", hex: "#ffffff" },
    ],
    images: [
      getProductImage("heritage-linen-shirt"),
      getProductImage("heritage-linen-shirt-collar"),
    ],
    inStock: true,
    createdAt: new Date("2026-05-25"),
    updatedAt: new Date("2026-05-25"),
  },
  {
    id: "5",
    slug: "crown-black-tie-suit",
    name: "Crown Black-Tie Suit",
    description:
      "Two-piece tuxedo in midnight blue with satin peak lapels, gold-thread buttonhole, and a single-vent half-canvas construction.",
    price: 480,
    originalPrice: 560,
    category: OUTERWEAR,
    sizes: SIZES,
    colors: [
      { name: "Midnight", hex: "#030c1b" },
      { name: "Black", hex: "#000000" },
    ],
    images: [
      getProductImage("crown-black-tie-suit"),
      getProductImage("crown-black-tie-suit-lapel"),
    ],
    badge: "limited",
    inStock: true,
    createdAt: new Date("2026-05-24"),
    updatedAt: new Date("2026-05-24"),
  },
  {
    id: "6",
    slug: "velvet-throne-chinos",
    name: "Velvet Throne Chinos",
    description:
      "Cotton-stretch chinos in a deep royal-blue velvet finish, slightly tapered, with a subtle gold-thread topstitch along the inseam.",
    price: 165,
    category: PANTS,
    sizes: SIZES,
    colors: [
      { name: "Royal Blue", hex: "#071b47" },
      { name: "Navy", hex: "#06142f" },
      COMMON_COLORS[0],
    ],
    images: [
      getProductImage("velvet-throne-chinos"),
      getProductImage("velvet-throne-chinos-back"),
    ],
    inStock: true,
    createdAt: new Date("2026-05-23"),
    updatedAt: new Date("2026-05-23"),
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category.slug === slug);
}

export function getNewArrivals(limit = 6): Product[] {
  return [...products]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];

  return products
    .filter((p) => p.id !== productId && p.category.id === product.category.id)
    .slice(0, limit);
}
