/**
 * Quantity input component with +/- controls
 * @module components/takhton/common/QuantityInput
 */

"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  /** Render variant for light surfaces (e.g. product detail on cream). Defaults to dark. */
  variant?: "dark" | "light";
}

export function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 10,
  disabled = false,
  variant = "dark",
}: QuantityInputProps) {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!Number.isNaN(newValue)) {
      onChange(Math.max(min, Math.min(max, newValue)));
    }
  };

  const containerStyles =
    variant === "dark"
      ? "border border-[#dfc38a]/30 bg-[#030c1b]/40"
      : "border border-[#030c1b]/15 bg-white";
  const buttonActive =
    variant === "dark"
      ? "text-[#dfc38a] hover:bg-[#dfc38a]/10"
      : "text-[#030c1b] hover:bg-[#030c1b]/5";
  const buttonInactive =
    variant === "dark" ? "text-[#dfc38a]/30" : "text-[#030c1b]/25";
  const inputStyles =
    variant === "dark"
      ? "bg-transparent text-[#f3ebd8] border-x border-[#dfc38a]/30"
      : "bg-transparent text-[#030c1b] border-x border-[#030c1b]/15";

  return (
    <div
      className={cn(
        "inline-flex items-center",
        containerStyles,
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
        className={cn(
          "p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-inset",
          value <= min ? buttonInactive : buttonActive,
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
          "w-12 text-center text-sm font-medium tabular-nums",
          inputStyles,
          "focus:outline-none focus:ring-2 focus:ring-[#dfc38a] focus:ring-inset",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
        )}
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
        className={cn(
          "p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-inset",
          value >= max ? buttonInactive : buttonActive,
        )}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
