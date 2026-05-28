/**
 * Footer component
 * @module components/takhton/layout/Footer
 */

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/constants'

export interface FooterProps {
  dark?: boolean
}

const footerLinks = {
  shop: [
    { href: '/shop', label: 'All Products' },
    { href: '/shop?category=men', label: 'Men' },
    { href: '/shop?category=women', label: 'Women' },
    { href: '/shop?category=accessories', label: 'Accessories' },
    { href: '/shop?category=limited', label: 'Limited Edition' },
  ],
  help: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/shipping', label: 'Shipping Info' },
    { href: '/returns', label: 'Returns & Exchanges' },
    { href: '/size-guide', label: 'Size Guide' },
    { href: '/faq', label: 'FAQ' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/careers', label: 'Careers' },
    { href: '/press', label: 'Press' },
    { href: '/sustainability', label: 'Sustainability' },
  ],
}

export function Footer({ dark = false }: FooterProps) {
  const bgClass = dark ? 'bg-black text-white' : 'bg-gray-50 text-black'
  const borderClass = dark ? 'border-white/10' : 'border-gray-200'
  const mutedTextClass = dark ? 'text-gray-400' : 'text-gray-500'

  return (
    <footer className={cn(bgClass, 'mt-auto')}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">{BRAND_NAME}</h2>
            <p className={cn(mutedTextClass, 'mb-6 max-w-sm')}>
              {BRAND_TAGLINE}
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Subscribe to our newsletter</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={cn(
                    'flex-1 px-4 py-2 text-sm rounded-sm border',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black',
                    dark
                      ? 'bg-white/5 border-white/20 placeholder:text-gray-500'
                      : 'bg-white border-gray-300 placeholder:text-gray-400'
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    'px-6 py-2 text-sm font-medium rounded-sm transition-colors',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    dark
                      ? 'bg-white text-black hover:bg-gray-100 focus-visible:ring-white'
                      : 'bg-black text-white hover:bg-gray-800 focus-visible:ring-black'
                  )}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-medium mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm transition-colors hover:text-black',
                      mutedTextClass
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-medium mb-4">Help</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm transition-colors hover:text-black',
                      mutedTextClass
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm transition-colors hover:text-black',
                      mutedTextClass
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={cn('mt-16 pt-8 border-t', borderClass)}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className={cn('text-sm', mutedTextClass)}>
              &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className={cn('text-sm hover:text-black', mutedTextClass)}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={cn('text-sm hover:text-black', mutedTextClass)}>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
