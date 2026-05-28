/**
 * 404 Not Found page
 * @module app/not-found
 */

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-[120px] font-light leading-none text-gray-100 mb-4">404</h1>
      <h2 className="t-heading-xl mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className={cn(
          'inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full',
          'bg-black text-white hover:bg-gray-800 transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  )
}
