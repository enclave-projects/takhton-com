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
}

export function ColorSwatch({
  colors,
  selected,
  onChange,
  disabled,
}: ColorSwatchProps) {
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
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <span
              className={cn(
                "h-8 w-8 rounded-full transition-all duration-200",
                "border-2",
                isSelected
                  ? "border-black scale-110"
                  : "border-transparent hover:border-gray-300",
              )}
              style={{ backgroundColor: color.hex }}
            />
            <span
              className={cn(
                "text-xs transition-colors",
                isSelected ? "text-black font-medium" : "text-gray-500",
              )}
            >
              {color.name}
            </span>
            {isSelected && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-black rounded-full border-2 border-white" />
            )}
          </button>
        );
      })}
    </div>
  );
}
