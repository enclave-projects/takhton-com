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
}

export function SizeSelector({
  sizes,
  selected,
  onChange,
  disabledSizes = [],
}: SizeSelectorProps) {
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
              "min-w-12 px-4 py-2 text-sm font-medium transition-all duration-200",
              "border rounded-sm",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
              isSelected
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-200 hover:border-gray-400",
              isDisabled && "opacity-40 cursor-not-allowed line-through",
            )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
