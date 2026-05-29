/**
 * Color swatch selector component
 * @module components/takhton/common/ColorSwatch
 */

import { cn } from "@/lib/utils";
import type { ColorOption } from "@/types/product";

export interface ColorSwatchProps {
  colors: readonly ColorOption[];
  selected: string;
  onChange: (colorName: string) => void;
  disabled?: boolean;
  variant?: "dark" | "light";
}

export function ColorSwatch({
  colors,
  selected,
  onChange,
  disabled,
  variant = "dark",
}: ColorSwatchProps) {
  const labelActive =
    variant === "dark" ? "text-[#dfc38a]" : "text-[#030c1b]";
  const labelInactive =
    variant === "dark" ? "text-[#f3ebd8]/55" : "text-[#030c1b]/55";
  const ringSelected =
    variant === "dark" ? "ring-[#dfc38a]" : "ring-[#030c1b]";

  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => {
        const isSelected = selected === color.name;

        return (
          <button
            key={color.name}
            type="button"
            onClick={() => onChange(color.name)}
            disabled={disabled}
            aria-label={`Select color ${color.name}`}
            aria-pressed={isSelected}
            className={cn(
              "group relative flex flex-col items-center gap-2",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <span
              className={cn(
                "h-8 w-8 rounded-full transition-all duration-200",
                "ring-1 ring-[#dfc38a]/20",
                isSelected &&
                  cn("ring-2 ring-offset-2 ring-offset-transparent scale-110", ringSelected),
              )}
              style={{ backgroundColor: color.hex }}
            />
            <span
              className={cn(
                "text-[11px] uppercase tracking-wider transition-colors",
                isSelected ? `${labelActive} font-semibold` : labelInactive,
              )}
            >
              {color.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
