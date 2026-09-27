import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/use-reveal";

export type RevealProps = {
  as?: ElementType;
  /** Delay in ms before the transition starts (stagger with 70ms steps). */
  delay?: number;
  /** Starting translateY in px. Default 24. */
  y?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children" | "style">;

/**
 * Wraps children in a `[data-reveal]` element that fades/slides in once it scrolls into view.
 * Renders fully visible for SSR, no-JS and reduced-motion visitors.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  y = 24,
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  const ref = useReveal<HTMLElement>();
  const vars = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-y": `${y}px`,
    ...style,
  } as CSSProperties;
  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-reveal-react=""
      className={cn(className)}
      style={vars}
      suppressHydrationWarning
      {...rest}
    >
      {children}
    </Tag>
  );
}
