/**
 * Mock data for Takhton e-commerce
 * @module lib/data
 */

import type { Product, Category } from "@/types/product";
import { CATEGORIES, SIZES, COMMON_COLORS } from "@/lib/constants";

// Generate reliable placeholder images using picsum.photos
// Format: https://picsum.photos/seed/{SEED}/600/800
function getCategoryImage(category: string): string {
  const seeds: Record<string, string> = {
    men: "mens-fashion-1",
    women: "womens-fashion-1",
    accessories: "accessories-1",
    limited: "limited-edition-1",
  };
  return `https://picsum.photos/seed/${seeds[category] || "product"}/800/600`;
}

function getProductImage(id: string, index: number = 0): string {
  return `https://picsum.photos/seed/${id}-${index}/600/800`;
}

export const categories: Category[] = CATEGORIES.map((cat) => ({
  id: cat.id,
  slug: cat.slug,
  name: cat.name,
  description: cat.description,
  image: getCategoryImage(cat.slug),
}));

export const products: Product[] = [
  // Men's Products
  {
    id: "1",
    slug: "merino-wool-overshirt",
    name: "Merino Wool Overshirt",
    description:
      "A versatile merino wool overshirt that seamlessly transitions from office to evening.",
    price: 245,
    originalPrice: 295,
    category: categories[0],
    sizes: SIZES,
    colors: [COMMON_COLORS[0], COMMON_COLORS[3], COMMON_COLORS[7]],
    images: [getProductImage("merino-1"), getProductImage("merino-2")],
    badge: "sale",
    inStock: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    slug: "tailored-linen-blazer",
    name: "Tailored Linen Blazer",
    description:
      "Expertly tailored linen blazer featuring a relaxed silhouette.",
    price: 395,
    category: categories[0],
    sizes: ["S", "M", "L", "XL"],
    colors: [COMMON_COLORS[2], COMMON_COLORS[1]],
    images: [getProductImage("linen-1"), getProductImage("linen-2")],
    badge: "new",
    inStock: true,
    createdAt: new Date("2024-05-28"),
    updatedAt: new Date("2024-05-28"),
  },
  {
    id: "3",
    slug: "cotton-cashmere-crewneck",
    name: "Cotton Cashmere Crewneck",
    description: "Luxurious cotton-cashmere blend crewneck sweater.",
    price: 165,
    category: categories[0],
    sizes: SIZES,
    colors: [COMMON_COLORS[0], COMMON_COLORS[6], COMMON_COLORS[3]],
    images: [getProductImage("cashmere-1"), getProductImage("cashmere-2")],
    inStock: true,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    id: "4",
    slug: "stretch-selvedge-denim",
    name: "Stretch Selvedge Denim",
    description:
      "Japanese selvedge denim with just the right amount of stretch.",
    price: 195,
    category: categories[0],
    sizes: ["30", "32", "34", "36", "38"],
    colors: [{ name: "Indigo", hex: "#0f172a" }],
    images: [getProductImage("denim-1"), getProductImage("denim-2")],
    badge: "limited",
    inStock: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },

  // Women's Products
  {
    id: "5",
    slug: "silk-midi-dress",
    name: "Silk Midi Dress",
    description: "A fluid silk midi dress with subtle draping.",
    price: 425,
    originalPrice: 525,
    category: categories[1],
    sizes: ["XS", "S", "M", "L"],
    colors: [COMMON_COLORS[1], COMMON_COLORS[5], COMMON_COLORS[0]],
    images: [getProductImage("silk-1"), getProductImage("silk-2")],
    badge: "sale",
    inStock: true,
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-05"),
  },
  {
    id: "6",
    slug: "relaxed-cashmere-cardigan",
    name: "Relaxed Cashmere Cardigan",
    description: "Oversized cashmere cardigan with dropped shoulders.",
    price: 395,
    category: categories[1],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [COMMON_COLORS[6], COMMON_COLORS[7], COMMON_COLORS[2]],
    images: [getProductImage("w-cashmere-1"), getProductImage("w-cashmere-2")],
    inStock: true,
    createdAt: new Date("2024-04-12"),
    updatedAt: new Date("2024-04-12"),
  },
  {
    id: "7",
    slug: "wide-leg-trouser",
    name: "Wide Leg Trouser",
    description: "High-waisted wide leg trousers in premium wool crepe.",
    price: 285,
    category: categories[1],
    sizes: ["2", "4", "6", "8", "10", "12"],
    colors: [COMMON_COLORS[0], COMMON_COLORS[3]],
    images: [getProductImage("trouser-1"), getProductImage("trouser-2")],
    badge: "new",
    inStock: true,
    createdAt: new Date("2024-05-20"),
    updatedAt: new Date("2024-05-20"),
  },
  {
    id: "8",
    slug: "structured-wool-coat",
    name: "Structured Wool Coat",
    description: "Timeless double-breasted wool coat.",
    price: 675,
    category: categories[1],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Camel", hex: "#C19A6B" },
      COMMON_COLORS[0],
      COMMON_COLORS[7],
    ],
    images: [getProductImage("coat-1"), getProductImage("coat-2")],
    inStock: true,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
  },

  // Accessories
  {
    id: "9",
    slug: "leather-weekender-bag",
    name: "Leather Weekender Bag",
    description: "Full-grain Italian leather weekender bag.",
    price: 385,
    category: categories[2],
    sizes: ["One Size"],
    colors: [COMMON_COLORS[6], COMMON_COLORS[0]],
    images: [getProductImage("bag-1"), getProductImage("bag-2")],
    badge: "new",
    inStock: true,
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-15"),
  },
  {
    id: "10",
    slug: "cashmere-scarf",
    name: "Cashmere Scarf",
    description: "Ultrafine cashmere scarf in generous proportions.",
    price: 145,
    category: categories[2],
    sizes: ["One Size"],
    colors: [
      COMMON_COLORS[6],
      COMMON_COLORS[7],
      COMMON_COLORS[3],
      COMMON_COLORS[5],
    ],
    images: [getProductImage("scarf-1"), getProductImage("scarf-2")],
    inStock: true,
    createdAt: new Date("2024-03-22"),
    updatedAt: new Date("2024-03-22"),
  },
  {
    id: "11",
    slug: "minimalist-leather-belt",
    name: "Minimalist Leather Belt",
    description:
      "Clean, buckle-free leather belt with hidden magnetic closure.",
    price: 125,
    category: categories[2],
    sizes: ["32", "34", "36", "38", "40"],
    colors: [COMMON_COLORS[6], COMMON_COLORS[0]],
    images: [getProductImage("belt-1"), getProductImage("belt-2")],
    inStock: true,
    createdAt: new Date("2024-02-18"),
    updatedAt: new Date("2024-02-18"),
  },
  {
    id: "12",
    slug: "silk-pocket-square",
    name: "Silk Pocket Square",
    description: "Hand-rolled silk pocket square with geometric pattern.",
    price: 55,
    category: categories[2],
    sizes: ["One Size"],
    colors: [COMMON_COLORS[6], COMMON_COLORS[3], COMMON_COLORS[5]],
    images: [getProductImage("pocket-1"), getProductImage("pocket-2")],
    badge: "limited",
    inStock: true,
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-01"),
  },

  // Limited Edition
  {
    id: "13",
    slug: "collaboration-cashmere-hoodie",
    name: "Collaboration Cashmere Hoodie",
    description: "Exclusive collaboration piece. Pure cashmere hoodie.",
    price: 525,
    category: categories[3],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Charcoal", hex: "#36454F" }],
    images: [getProductImage("hoodie-1")],
    badge: "limited",
    inStock: true,
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: "14",
    slug: "hand-finished-sunglass",
    name: "Hand-Finished Sunglasses",
    description: "Japanese acetate frames with Carl Zeiss lenses.",
    price: 375,
    category: categories[3],
    sizes: ["One Size"],
    colors: [{ name: "Tortoise", hex: "#3d2b1f" }, COMMON_COLORS[0]],
    images: [getProductImage("sunglass-1"), getProductImage("sunglass-2")],
    badge: "limited",
    inStock: true,
    createdAt: new Date("2024-05-05"),
    updatedAt: new Date("2024-05-05"),
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
