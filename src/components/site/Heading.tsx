import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type HeadingSize = "display" | "xl" | "lg" | "md" | "sm";
export type HeadingTone = "teal" | "ink" | "white";

export type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div";
  size?: HeadingSize;
  tone?: HeadingTone;
  className?: string;
  /** May include `<em>` for the italic copper-bright key phrase. */
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"h2">, "className" | "children">;

const SIZE: Record<HeadingSize, string> = {
  display: "text-[42px] sm:text-[60px] lg:text-[84px]",
  xl: "text-[38px] sm:text-[52px] lg:text-[68px]",
  lg: "text-[32px] sm:text-[40px] lg:text-[48px]",
  md: "text-[24px] lg:text-[28px]",
  sm: "text-[20px] lg:text-[22px]",
};

// Applied after `className`: tailwind-merge treats font-size overrides as conflicting with
// line-height, so leading must come last or a resized heading falls back to body leading.
const LEADING: Record<HeadingSize, string> = {
  display: "leading-[1.02] lg:leading-[0.98]",
  xl: "leading-[1.04]",
  lg: "leading-[1.08]",
  md: "leading-[1.15]",
  sm: "leading-[1.2]",
};

const TONE: Record<HeadingTone, string> = {
  teal: "text-teal",
  ink: "text-ink",
  white: "text-white",
};

/** Fraunces heading. `<em>` children render italic in copper-bright. */
export function Heading({
  as: Tag = "h2",
  size = "lg",
  tone = "teal",
  className,
  children,
  ...rest
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display font-medium tracking-[-0.02em] text-balance",
        "[&_em]:font-normal [&_em]:italic [&_em]:text-copper-bright",
        SIZE[size],
        TONE[tone],
        className,
        !className?.includes("leading-") && LEADING[size],
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
