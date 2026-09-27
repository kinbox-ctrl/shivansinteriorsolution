import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/lib/use-reveal";
import { cn } from "@/lib/utils";

export type SlatRevealProps = {
  /** Usually an `<img>`; the wrapper is `relative overflow-hidden`. */
  children: ReactNode;
  className?: string;
  /** Number of slats. Default 7. */
  slats?: number;
  /** Slat colour. Default linen. */
  tone?: "linen" | "mist" | "cloud" | "white";
};

const TONE = { linen: "bg-linen", mist: "bg-mist", cloud: "bg-cloud", white: "bg-white" } as const;

/**
 * Image wrapper: 7 vertical Linen slats cover the image and collapse (scaleY → 0) with a 60ms
 * stagger when the wrapper scrolls into view. Nothing covers the image without JS or under
 * reduced motion.
 */
export function SlatReveal({ children, className, slats = 7, tone = "linen" }: SlatRevealProps) {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
    <div ref={ref} className={cn("slat-reveal relative overflow-hidden", className)}>
      {children}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex">
        {Array.from({ length: slats }, (_, i) => (
          <span
            key={i}
            className={cn("slat h-full flex-1", TONE[tone])}
            style={{ "--slat-index": i } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
