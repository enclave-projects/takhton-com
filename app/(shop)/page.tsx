/**
 * Homepage for Takhton
 * @module app/page
 */

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductGrid } from "@/components/takhton/product/ProductGrid";
import { BRAND_TAGLINE } from "@/lib/constants";
import { getNewArrivals, categories } from "@/lib/data";

export default function HomePage() {
  const newArrivals = getNewArrivals(6);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Dark Cinematic */}
      <section className="relative min-h-[90vh] bg-black text-white flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1920x1080/000000/333333/png?text=TAKHTON"
            alt="Takhton Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="t-eyebrow text-white/80 mb-6">New Collection 2025</p>
            <h1 className="t-display-xl text-white mb-6">{BRAND_TAGLINE}</h1>
            <p className="t-body-lg text-white/70 mb-10 max-w-lg">
              Crafted with intention. Worn with presence. Discover elevated
              essentials for the modern wardrobe.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full",
                  "bg-white text-black hover:bg-white/90 transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2",
                )}
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/shop?sort=newest"
                className={cn(
                  "inline-flex items-center px-8 py-4 text-sm font-medium rounded-full",
                  "border border-white/30 text-white hover:bg-white/10 transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2",
                )}
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="t-eyebrow text-gray-500 mb-4">Explore</p>
            <h2 className="t-heading-xl mb-4">Shop by Category</h2>
            <p className="t-body-md text-gray-500 max-w-md mx-auto">
              Curated collections for every moment and mood.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group relative aspect-4/5 overflow-hidden rounded-sm"
              >
                <Image
                  src={
                    category.image ||
                    `https://placehold.co/600x750/1a1a1a/FFFFFF/png?text=${category.name}`
                  }
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-medium text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <p className="t-eyebrow text-gray-500 mb-4">Just In</p>
              <h2 className="t-heading-xl">New Arrivals</h2>
            </div>
            <Link
              href="/shop?sort=newest"
              className="text-sm font-medium underline underline-offset-4 hover:text-gray-600"
            >
              View All
            </Link>
          </div>

          <ProductGrid products={newArrivals} columns={4} />
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="relative py-32 bg-black text-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="t-eyebrow text-white/60 mb-6">The Edit</p>
              <h2 className="t-display-md text-white mb-6">
                The Summer Lookbook
              </h2>
              <p className="t-body-lg text-white/70 mb-8 max-w-md">
                An exploration of texture, tone, and timeless silhouettes.
                Discover our curated selection for the season ahead.
              </p>
              <Link
                href="/lookbook"
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full",
                  "border border-white/30 text-white hover:bg-white/10 transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2",
                )}
              >
                Explore Lookbook
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative aspect-4/5 lg:aspect-3/4 overflow-hidden rounded-sm">
              <Image
                src="https://placehold.co/800x1000/222222/444444/png?text=LOOKBOOK"
                alt="Summer Lookbook"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="t-heading-xl mb-4">Join the Inner Circle</h2>
          <p className="t-body-md text-gray-500 mb-8">
            Subscribe for early access to new releases, exclusive offers, and
            curated style inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className={cn(
                "flex-1 px-4 py-3 text-sm rounded-sm border border-gray-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black",
                "placeholder:text-gray-400",
              )}
            />
            <button
              type="submit"
              className={cn(
                "px-8 py-3 text-sm font-medium rounded-full",
                "bg-black text-white hover:bg-gray-800 transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
              )}
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates.
          </p>
        </div>
      </section>
    </div>
  );
}
