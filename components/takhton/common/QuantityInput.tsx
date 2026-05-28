/**
 * Quantity input component with +/- controls
 * @module components/takhton/common/QuantityInput
 */

'use client'

import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface QuantityInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  disabled?: boolean
}

export function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 10,
  disabled = false,
}: QuantityInputProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10)
    if (!isNaN(newValue)) {
      onChange(Math.max(min, Math.min(max, newValue)))
    }
  }

  return (
    <div
      className={cn(
        'inline-flex items-center border border-gray-200 rounded-sm',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
        className={cn(
          'p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black',
          value <= min ? 'text-gray-300' : 'text-black hover:bg-gray-100'
        )}
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        disabled={disabled}
        aria-label="Quantity"
        className={cn(
          'w-12 text-center text-sm font-medium',
          'border-x border-gray-200',
          'focus:outline-none',
          '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        )}
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
        className={cn(
          'p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black',
          value >= max ? 'text-gray-300' : 'text-black hover:bg-gray-100'
        )}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
