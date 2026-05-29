/**
 * Product detail page for Takhton
 * @module app/product/[slug]/page
 */

"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { useCartStore } from "@/store/cart.store";
import { Badge } from "@/components/takhton/common/Badge";
import { ColorSwatch } from "@/components/takhton/common/ColorSwatch";
import { PriceDisplay } from "@/components/takhton/common/PriceDisplay";
import { QuantityInput } from "@/components/takhton/common/QuantityInput";
import { SizeSelector } from "@/components/takhton/common/SizeSelector";
import { WishlistButton } from "@/components/takhton/common/WishlistButton";
import { ProductGrid } from "@/components/takhton/product/ProductGrid";

export interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

type AccordionTab = "description" | "shipping" | "care";

const ACCORDION_TABS: ReadonlyArray<{ id: AccordionTab; label: string }> = [
  { id: "description", label: "Description" },
  { id: "shipping", label: "Shipping & Returns" },
  { id: "care", label: "Care Instructions" },
];

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const { addToCart } = useCartStore();
  const relatedProducts = getRelatedProducts(product.id, 4);

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0] ?? "",
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name ?? "",
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<AccordionTab>("description");

  const handleAddToCart = () => {
    const color = product.colors.find((c) => c.name === selectedColor);
    if (color) {
      addToCart(product, selectedSize, color, quantity);
    }
  };

  return (
    <div className="min-h-screen bg-[#030c1b] text-[#f3ebd8]">
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-12">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-[#f3ebd8]/55"
        >
          <Link href="/" className="hover:text-[#dfc38a]">
            Home
          </Link>
          <span className="text-[#dfc38a]/40">/</span>
          <Link href="/shop" className="hover:text-[#dfc38a]">
            Shop
          </Link>
          <span className="text-[#dfc38a]/40">/</span>
          <Link
            href={`/shop?category=${product.category.slug}`}
            className="hover:text-[#dfc38a]"
          >
            {product.category.name}
          </Link>
          <span className="text-[#dfc38a]/40">/</span>
          <span className="text-[#dfc38a]">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <div>
            <div className="relative mb-4 aspect-3/4 overflow-hidden border border-[#dfc38a]/20 bg-[#071b47]">
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

            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    aria-label={`View image ${idx + 1}`}
                    aria-pressed={selectedImage === idx}
                    className={cn(
                      "relative h-20 w-20 flex-shrink-0 overflow-hidden border-2 transition-colors",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a]",
                      selectedImage === idx
                        ? "border-[#dfc38a]"
                        : "border-transparent hover:border-[#dfc38a]/50",
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
            <p className="t-eyebrow mb-3 text-[#dfc38a]">
              {product.category.name}
            </p>
            <h1 className="mb-4 font-serif text-3xl uppercase tracking-wide text-[#f3ebd8] md:text-4xl">
              {product.name}
            </h1>
            <PriceDisplay
              price={product.price}
              originalPrice={product.originalPrice}
              size="lg"
              className="mb-6"
            />

            {/* Short Description */}
            <p className="mb-9 max-w-md text-sm leading-7 text-[#f3ebd8]/75">
              {product.description.length > 150
                ? `${product.description.substring(0, 150)}…`
                : product.description}
            </p>

            {/* Color Selector */}
            <div className="mb-8">
              <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#dfc38a]">
                Color
              </h2>
              <ColorSwatch
                colors={product.colors}
                selected={selectedColor}
                onChange={setSelectedColor}
              />
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#dfc38a]">
                  Size
                </h2>
                <Link
                  href="#size-guide"
                  className="text-[11px] uppercase tracking-wider text-[#f3ebd8]/55 underline-offset-4 hover:text-[#dfc38a] hover:underline"
                >
                  Size Guide
                </Link>
              </div>
              <SizeSelector
                sizes={product.sizes}
                selected={selectedSize}
                onChange={setSelectedSize}
                disabledSizes={product.sizes.slice(-2) as string[]}
              />
            </div>

            {/* Quantity */}
            <div className="mb-9">
              <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#dfc38a]">
                Quantity
              </h2>
              <QuantityInput
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={10}
              />
            </div>

            {/* Actions */}
            <div className="mb-12 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className={cn(
                  "flex-1 border border-[#dfc38a] bg-[#dfc38a] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#030c1b]",
                  "transition-colors hover:bg-[#f3ebd8]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
                )}
              >
                Add to Bag
              </button>
              <WishlistButton product={product} variant="solid" />
              <button
                type="button"
                aria-label="Share product"
                className={cn(
                  "border border-[#dfc38a]/40 p-3 text-[#dfc38a] transition-colors hover:border-[#dfc38a] hover:bg-[#dfc38a]/10",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
                )}
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Accordion Info */}
            <div className="border-t border-[#dfc38a]/20">
              {ACCORDION_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <div key={tab.id} className="border-b border-[#dfc38a]/15">
                    <button
                      type="button"
                      onClick={() => setActiveTab(isActive ? tab.id : tab.id)}
                      aria-expanded={isActive}
                      aria-controls={`tab-${tab.id}`}
                      className={cn(
                        "flex w-full items-center justify-between py-4 text-left",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-inset",
                      )}
                    >
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#f3ebd8]">
                        {tab.label}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-[#dfc38a] transition-transform",
                          isActive && "rotate-180",
                        )}
                      />
                    </button>
                    {isActive && (
                      <div
                        id={`tab-${tab.id}`}
                        className="pb-5 text-sm leading-7 text-[#f3ebd8]/70"
                      >
                        {tab.id === "description" && <p>{product.description}</p>}
                        {tab.id === "shipping" && (
                          <div className="space-y-1.5">
                            <p>Free shipping on orders over $150.</p>
                            <p>Standard shipping: 5–7 business days ($12).</p>
                            <p>Express shipping: 2–3 business days ($25).</p>
                          </div>
                        )}
                        {tab.id === "care" && (
                          <p>
                            Dry clean or hand wash cold. Lay flat to dry. Cool
                            iron if needed.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-[#dfc38a]/15 bg-[#030c1b] py-16">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
            <p className="t-eyebrow mb-3 text-[#dfc38a]">More from the kingdom</p>
            <h2 className="mb-9 font-serif text-3xl uppercase tracking-wide text-[#f3ebd8] md:text-4xl">
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        </section>
      )}
    </div>
  );
}
