/**
 * Homepage for Takhton
 * @module app/page
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/takhton/product/ProductGrid";
import { BRAND_LOGO, BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";
import { getNewArrivals } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const featuredProducts = getNewArrivals(4);

  return (
    <div className="min-h-screen bg-[#030c1b] text-[#f3ebd8]">
      {/* Hero */}
      <section className="relative min-h-[82dvh] overflow-hidden border-b border-[#dfc38a]/20 bg-[#030c1b]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(26,64,130,0.58),transparent_34%),radial-gradient(circle_at_32%_8%,rgba(4,20,55,0.9),transparent_38%),linear-gradient(115deg,#020713_0%,#061638_46%,#020713_100%)]" />
        <div className="absolute inset-0 opacity-45 bg-[linear-gradient(135deg,transparent_0%,rgba(223,195,138,0.08)_42%,transparent_68%)]" />
        <div className="relative mx-auto grid min-h-[82dvh] max-w-[1600px] grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-20">
          <div className="max-w-xl">
            <p className="t-eyebrow mb-5 text-[#dfc38a]">
              Legacy in every thread
            </p>
            <h1 className="mb-6 font-serif text-4xl font-normal leading-[1.05] tracking-wide text-[#f3ebd8] md:text-5xl lg:text-6xl">
              Regal threads.
              <br />
              <span className="text-[#dfc38a]">Modern soul.</span>
            </h1>
            <p className="mb-10 max-w-lg text-base leading-8 text-[#f3ebd8]/86 md:text-lg">
              {BRAND_TAGLINE}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/shop"
                className={cn(
                  "inline-flex items-center justify-center border border-[#dfc38a] bg-[#dfc38a] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#030c1b] transition-colors hover:bg-[#f3ebd8]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
                )}
              >
                Shop Collection
              </Link>
              <Link
                href="/about"
                className={cn(
                  "inline-flex items-center justify-center border border-[#dfc38a]/70 px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#dfc38a] transition-colors hover:bg-[#dfc38a]/10",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
                )}
              >
                Explore the Brand
              </Link>
            </div>
          </div>

          <div className="relative flex min-h-[360px] items-center justify-center lg:min-h-[620px]">
            <div className="absolute bottom-12 h-32 w-[82%] rounded-[50%] border border-[#dfc38a]/25 bg-[#071b47]/70 blur-sm" />
            <div className="relative h-[320px] w-[320px] md:h-[470px] md:w-[470px] lg:h-[560px] lg:w-[560px]">
              <Image
                src={BRAND_LOGO}
                alt={`${BRAND_NAME} crown logo`}
                fill
                priority
                sizes="(max-width: 768px) 320px, (max-width: 1024px) 470px, 560px"
                className="object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured collection */}
      <section className="border-b border-[#dfc38a]/15 bg-[#030c1b] px-6 py-16 lg:px-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="t-eyebrow mb-3 text-[#dfc38a]">New arrivals</p>
              <h2 className="font-serif text-3xl font-normal uppercase tracking-wide text-[#f3ebd8] md:text-4xl">
                Featured Collection
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#dfc38a] hover:text-[#f3ebd8]"
            >
              View all collections <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} columns={4} />
        </div>
      </section>

      {/* Story */}
      <section className="grid min-h-[360px] grid-cols-1 overflow-hidden bg-[#f3ebd8] text-[#030c1b] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex items-center px-6 py-16 lg:px-20">
          <div className="max-w-lg">
            <p className="t-eyebrow mb-4 text-[#c5a880]">Our story</p>
            <h2 className="mb-6 font-serif text-3xl font-normal uppercase leading-tight tracking-wide md:text-4xl">
              Built on heritage.
              <br /> Designed for the throne.
            </h2>
            <p className="mb-8 max-w-md text-sm leading-7 text-[#030c1b]/80 md:text-base">
              TAKHTON is more than clothing — it is a statement of identity,
              power, and timeless elegance. Inspired by royalty, crafted for the
              modern era.
            </p>
            <Link
              href="/about"
              className="inline-flex bg-[#030c1b] px-7 py-4 text-xs font-bold uppercase tracking-wider text-[#dfc38a] transition-colors hover:bg-[#071b47]"
            >
              Discover our story
            </Link>
          </div>
        </div>
        <div className="relative min-h-[360px]">
          <Image
            src="/placeholders/product1.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f3ebd8] via-[#f3ebd8]/30 to-transparent" />
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative overflow-hidden border-b border-[#dfc38a]/15 bg-[#030c1b] px-6 py-14 text-center lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,33,66,0.9),transparent_52%)]" />
        <div className="relative mx-auto max-w-2xl">
          <p className="t-eyebrow mb-3 text-[#dfc38a]">Join the kingdom</p>
          <h2 className="mb-4 font-serif text-3xl font-normal uppercase tracking-wide text-[#f3ebd8]">
            Get exclusive access
          </h2>
          <p className="mb-7 text-sm text-[#f3ebd8]/78">
            Be the first to know about new drops, private collections, and royal
            offers.
          </p>
          <form
            className="mx-auto flex max-w-xl flex-col gap-0 sm:flex-row"
            aria-label="Newsletter signup"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
              className="min-h-12 flex-1 border border-[#dfc38a]/70 bg-transparent px-5 text-sm text-[#f3ebd8] placeholder:text-[#f3ebd8]/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a]"
            />
            <button
              type="submit"
              className="min-h-12 border border-[#dfc38a] bg-[#dfc38a] px-10 text-xs font-bold uppercase tracking-wider text-[#030c1b] transition-colors hover:bg-[#f3ebd8]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
