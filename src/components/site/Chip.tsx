import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ChipTone = "mist" | "copper" | "white" | "teal" | "glass" | "linen";

export type ChipProps = {
  tone?: ChipTone;
  /** Selected state (teal-soft fill, teal text). */
  selected?: boolean;
  icon?: ReactNode;
  size?: "sm" | "md";
  /** Uppercase DM Mono lettering (location chips, meta tags). */
  mono?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"span">, "className" | "children">;

const TONE: Record<ChipTone, string> = {
  mist: "bg-mist text-teal border-transparent",
  copper: "bg-copper-tint text-copper border-transparent",
  white: "bg-white text-ink border-line",
  teal: "bg-teal text-white border-transparent",
  glass: "glass text-teal",
  linen: "bg-linen text-ink border-transparent",
};

/** Small pill tag / filter chip. */
export function Chip({
  tone = "mist",
  selected = false,
  icon,
  size = "md",
  mono = false,
  className,
  children,
  ...rest
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold leading-none whitespace-nowrap",
        size === "sm" ? "h-7 px-3 text-[11px]" : "h-9 px-4 text-[13px]",
        mono && "font-mono font-normal tracking-[0.16em] uppercase",
        selected ? "border-teal/20 bg-teal-soft text-teal" : TONE[tone],
        "[&_svg]:size-3.5 [&_svg]:shrink-0",
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </span>
  );
}
