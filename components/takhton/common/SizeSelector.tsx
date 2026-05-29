/**
 * Size selector component with pill-style toggles
 * @module components/takhton/common/SizeSelector
 */

import { cn } from "@/lib/utils";

export interface SizeSelectorProps {
  sizes: readonly string[];
  selected: string;
  onChange: (size: string) => void;
  disabledSizes?: string[];
  variant?: "dark" | "light";
}

export function SizeSelector({
  sizes,
  selected,
  onChange,
  disabledSizes = [],
  variant = "dark",
}: SizeSelectorProps) {
  const baseRest =
    variant === "dark"
      ? "bg-transparent text-[#f3ebd8]/85 border-[#dfc38a]/30 hover:border-[#dfc38a] hover:text-[#dfc38a]"
      : "bg-white text-[#030c1b] border-[#030c1b]/20 hover:border-[#030c1b]";
  const baseSelected =
    variant === "dark"
      ? "bg-[#dfc38a] text-[#030c1b] border-[#dfc38a]"
      : "bg-[#030c1b] text-[#dfc38a] border-[#030c1b]";

  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => {
        const isSelected = selected === size;
        const isDisabled = disabledSizes.includes(size);

        return (
          <button
            key={size}
            type="button"
            onClick={() => !isDisabled && onChange(size)}
            disabled={isDisabled}
            aria-label={`Select size ${size}`}
            aria-pressed={isSelected}
            className={cn(
              "min-w-12 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200",
              "border",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              isSelected ? baseSelected : baseRest,
              isDisabled && "cursor-not-allowed opacity-40 line-through",
            )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
