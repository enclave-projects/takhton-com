/**
 * Badge component for product tags
 * @module components/takhton/common/Badge
 */

import { cn } from "@/lib/utils"

export interface BadgeProps {
  variant: 'new' | 'sale' | 'limited'
  className?: string
}

const variantStyles = {
  new: 'bg-black text-white',
  sale: 'bg-red-600 text-white',
  limited: 'bg-[#1e2c31] text-white',
}

const variantLabels = {
  new: 'New',
  sale: 'Sale',
  limited: 'Limited',
}

export function Badge({ variant, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-medium tracking-wider uppercase',
        variantStyles[variant],
        className
      )}
    >
      {variantLabels[variant]}
    </span>
  )
}
