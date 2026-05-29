/**
 * Footer component
 * @module components/takhton/layout/Footer
 */

import Image from "next/image";
import Link from "next/link";
import { Circle, Music2, Play, Send } from "lucide-react";
import { FooterColumn } from "@/components/takhton/layout/FooterColumn";
import { BRAND_LOGO, BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";

const footerLinks = {
  shop: [
    { label: "All Pieces", href: "/shop" },
    { label: "Shirts", href: "/shop?category=shirts" },
    { label: "T-Shirts", href: "/shop?category=t-shirts" },
    { label: "Pants", href: "/shop?category=pants" },
    { label: "Outerwear", href: "/shop?category=outerwear" },
  ],
  brand: [
    { label: "Our Story", href: "/about" },
    { label: "Craft & Materials", href: "/about#sustainability" },
    { label: "Sustainability", href: "/about#sustainability" },
    { label: "Careers", href: "/contact" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/contact#faqs" },
    { label: "Shipping & Returns", href: "/contact#shipping" },
    { label: "Size Guide", href: "/contact#size-guide" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export interface FooterProps {
  dark?: boolean;
}

export function Footer() {
  return (
    <footer className="border-t border-[#dfc38a]/15 bg-[#030c1b] text-[#f3ebd8]">
      <div className="mx-auto max-w-[1600px] px-6 py-12 lg:px-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr_0.8fr]">
          <div>
            <Link
              href="/"
              className="mb-5 inline-flex items-center"
              aria-label={`${BRAND_NAME} home`}
            >
              <span className="relative block h-16 w-40">
                <Image
                  src={BRAND_LOGO}
                  alt={BRAND_NAME}
                  fill
                  sizes="160px"
                  className="object-contain object-left"
                />
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-7 text-[#f3ebd8]/72">
              {BRAND_TAGLINE}
            </p>
          </div>

          <FooterColumn title="Shop" links={footerLinks.shop} />
          <FooterColumn title="Brand" links={footerLinks.brand} />
          <FooterColumn title="Support" links={footerLinks.support} />

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#dfc38a]">
              Follow us
            </h3>
            <div className="flex gap-5 text-[#dfc38a]">
              <Circle className="h-5 w-5" />
              <Music2 className="h-5 w-5" />
              <Play className="h-5 w-5" />
              <Send className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[#dfc38a]/15 pt-6 text-xs text-[#f3ebd8]/55 sm:flex-row">
          <p>© 2024 {BRAND_NAME.toUpperCase()}. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-[#dfc38a]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#dfc38a]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
