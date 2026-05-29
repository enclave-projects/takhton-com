/**
 * About page for Takhton — brand story, craft, and values.
 * @module app/(shop)/about/page
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown, Hammer, Leaf, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About | ${BRAND_NAME}`,
  description:
    "The story behind Takhton — a menswear house built on heritage, craft, and modern tailoring.",
};

interface Pillar {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}

const PILLARS: ReadonlyArray<Pillar> = [
  {
    icon: Scissors,
    title: "Tailored by Hand",
    body: "Every shirt and trouser is finished by hand in our atelier — buttonholes hand-sewn, hems pressed under steam, seams reinforced for a lifetime of wear.",
  },
  {
    icon: Crown,
    title: "Regal Materials",
    body: "Long-staple cotton, Italian linen, and mid-weight wool sourced from mills with century-old reputations. We use materials worthy of a throne.",
  },
  {
    icon: Hammer,
    title: "Built to Last",
    body: "Half-canvas construction on our suits, bartacked stress points on our trousers, and reinforced placket on every shirt. Pieces meant to be worn, not replaced.",
  },
  {
    icon: Leaf,
    title: "Considered Sourcing",
    body: "Small production runs, low-impact dyeing, and natural fibres. We make less, better — and we publish where every fabric comes from.",
  },
];

interface Milestone {
  year: string;
  title: string;
  body: string;
}

const MILESTONES: ReadonlyArray<Milestone> = [
  {
    year: "2019",
    title: "The first stitch",
    body: "Founded in a single tailoring studio with one cutter, one machinist, and a single dress shirt pattern.",
  },
  {
    year: "2021",
    title: "The Crown collection",
    body: "Our signature crown-embroidered crest debuts on a heavyweight tee — the piece that defined our visual language.",
  },
  {
    year: "2023",
    title: "Tailored expansion",
    body: "Pants and outerwear join the line. Our half-canvas tuxedo becomes the house's flagship occasion piece.",
  },
  {
    year: "2026",
    title: "A wider kingdom",
    body: "We open direct shipping worldwide and publish a full transparency report on materials, mills, and makers.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#030c1b] text-[#f3ebd8]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#dfc38a]/15 bg-[#030c1b]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(26,64,130,0.45),transparent_38%),linear-gradient(115deg,#020713_0%,#061638_46%,#020713_100%)]"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 py-24 lg:px-12 lg:py-32">
          <p className="t-eyebrow mb-5 text-[#dfc38a]">Our story</p>
          <h1 className="mb-7 max-w-3xl font-serif text-4xl leading-[1.05] tracking-wide text-[#f3ebd8] md:text-5xl lg:text-6xl">
            A menswear house built for the
            <span className="text-[#dfc38a]"> modern king.</span>
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[#f3ebd8]/80 md:text-lg">
            {BRAND_TAGLINE}
          </p>
        </div>
      </section>

      {/* Origin */}
      <section className="border-b border-[#dfc38a]/15 bg-[#030c1b] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="t-eyebrow mb-4 text-[#dfc38a]">The beginning</p>
            <h2 className="font-serif text-3xl leading-tight tracking-wide text-[#f3ebd8] md:text-4xl">
              From a single
              <br /> tailoring room.
            </h2>
          </div>
          <div className="space-y-6 text-[15px] leading-8 text-[#f3ebd8]/80">
            <p>
              {BRAND_NAME} began with a refusal — a refusal to accept that
              menswear had to choose between heritage tailoring and a modern
              silhouette. Founded in 2019, our atelier started with one cutter
              and one pattern: a dress shirt that fit the way a shirt should
              fit, in cloth that aged into the wearer.
            </p>
            <p>
              From that single shirt, the kingdom grew. Pants followed the same
              logic — clean tapered legs, hand-finished hems, regal weight
              without stiffness. Then tees, suits, and the crown-embroidered
              pieces that became our signature.
            </p>
            <p>
              We are still small. We make less than three thousand pieces a
              season, every one finished by hand in our own studio. That
              constraint is the point. It is what lets us cut on the bias when
              the cloth asks for it, switch a button thread to gold when a
              detail deserves it, and stand behind every garment we ship.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-[#dfc38a]/15 bg-[#05142c] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 max-w-2xl">
            <p className="t-eyebrow mb-4 text-[#dfc38a]">What we stand for</p>
            <h2 className="font-serif text-3xl leading-tight tracking-wide text-[#f3ebd8] md:text-4xl">
              Four pillars of the kingdom.
            </h2>
          </div>

          <div className="grid gap-px bg-[#dfc38a]/15 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <article
                key={pillar.title}
                className="flex flex-col gap-4 bg-[#030c1b] p-8"
              >
                <pillar.icon
                  aria-hidden="true"
                  className="h-7 w-7 text-[#dfc38a]"
                />
                <h3 className="font-serif text-xl uppercase tracking-wide text-[#f3ebd8]">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-7 text-[#f3ebd8]/70">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Craft / Photo split */}
      <section className="grid grid-cols-1 overflow-hidden bg-[#f3ebd8] text-[#030c1b] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[320px] lg:min-h-[560px]">
          <Image
            src="/placeholders/product3.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center px-6 py-16 lg:px-16 lg:py-20">
          <div className="max-w-md">
            <p className="t-eyebrow mb-4 text-[#c5a880]">Craft</p>
            <h2 className="mb-6 font-serif text-3xl leading-tight tracking-wide text-[#030c1b] md:text-4xl">
              Hands first.
              <br /> Machines second.
            </h2>
            <p className="mb-6 text-sm leading-7 text-[#030c1b]/80 md:text-base">
              The shoulder of a shirt is shaped over a steam pad before it ever
              meets a sewing machine. The waistband of every trouser is pressed
              by hand, twice. We use machines where they make a stronger
              garment — and we put hands where they make a more beautiful one.
            </p>
            <p className="text-sm leading-7 text-[#030c1b]/80 md:text-base">
              Roughly 38 separate operations go into a single dress shirt.
              Roughly 22 of them happen on a workbench, not a machine. Slowness
              is a feature, not a bug.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section id="sustainability" className="border-y border-[#dfc38a]/15 bg-[#030c1b] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 max-w-2xl">
            <p className="t-eyebrow mb-4 text-[#dfc38a]">Heritage</p>
            <h2 className="font-serif text-3xl leading-tight tracking-wide text-[#f3ebd8] md:text-4xl">
              Milestones of the house.
            </h2>
          </div>

          <ol className="space-y-px">
            {MILESTONES.map((milestone) => (
              <li
                key={milestone.year}
                className="grid grid-cols-[80px_1fr] gap-6 border-b border-[#dfc38a]/15 py-6 last:border-b-0 sm:grid-cols-[120px_1fr] sm:gap-12"
              >
                <span className="font-serif text-2xl tabular-nums text-[#dfc38a] md:text-3xl">
                  {milestone.year}
                </span>
                <div>
                  <h3 className="mb-2 font-serif text-lg uppercase tracking-wide text-[#f3ebd8] md:text-xl">
                    {milestone.title}
                  </h3>
                  <p className="text-sm leading-7 text-[#f3ebd8]/70 md:text-base">
                    {milestone.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#030c1b] px-6 py-20 text-center lg:px-12 lg:py-28">
        <div className="mx-auto max-w-2xl">
          <p className="t-eyebrow mb-4 text-[#dfc38a]">Take a seat</p>
          <h2 className="mb-6 font-serif text-3xl leading-tight tracking-wide text-[#f3ebd8] md:text-4xl">
            Step into the collection.
          </h2>
          <p className="mb-10 text-sm leading-7 text-[#f3ebd8]/75 md:text-base">
            Shirts, trousers, and outerwear made the slow way — designed for
            men who want a wardrobe with weight.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/shop"
              className={cn(
                "inline-flex items-center gap-2 border border-[#dfc38a] bg-[#dfc38a] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#030c1b]",
                "transition-colors hover:bg-[#f3ebd8]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
              )}
            >
              Shop the Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center border border-[#dfc38a]/70 px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#dfc38a]",
                "transition-colors hover:bg-[#dfc38a]/10",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
              )}
            >
              Speak with Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
