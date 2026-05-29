/**
 * Badge component for product tags
 * @module components/takhton/common/Badge
 */

import { cn } from "@/lib/utils";

export interface BadgeProps {
  variant: "new" | "sale" | "limited";
  className?: string;
}

const variantStyles: Record<BadgeProps["variant"], string> = {
  new: "bg-[#dfc38a] text-[#030c1b]",
  sale: "bg-[#f3ebd8] text-[#030c1b]",
  limited: "bg-[#030c1b] text-[#dfc38a] border border-[#dfc38a]/40",
};

const variantLabels: Record<BadgeProps["variant"], string> = {
  new: "New",
  sale: "Sale",
  limited: "Limited",
};

export function Badge({ variant, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]",
        variantStyles[variant],
        className,
      )}
    >
      {variantLabels[variant]}
    </span>
  );
}
