import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "@/lib/use-reveal";
import { cn } from "@/lib/utils";

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
 * Page-local `<Reveal>` (same markup and behaviour as the shared one) with
 * `suppressHydrationWarning`. This route is a `lazyRouteComponent`, so the chrome's global
 * `observeReveals()` runs before the page chunk hydrates and has already added `is-in` to the
 * SSR'd `[data-reveal]` elements in the viewport; the class attribute then legitimately differs
 * from what React renders and must not be reported as a hydration mismatch. Shared components are
 * read-only for this page, hence the local copy.
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
      suppressHydrationWarning
      className={cn(className)}
      style={vars}
      {...rest}
    >
      {children}
    </Tag>
  );
}
