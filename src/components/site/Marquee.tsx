import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type MarqueeProps = {
  items: readonly string[];
  /** Seconds for one full loop. Default 40. */
  speed?: number;
  className?: string;
  /** Class for each item (defaults to Fraunces teal ~40px). */
  itemClassName?: string;
  /** Band background. Default linen. */
  tone?: "linen" | "mist" | "cloud" | "white";
};

const TONE = { linen: "bg-linen", mist: "bg-mist", cloud: "bg-cloud", white: "bg-white" } as const;

/** Endless CSS marquee with copper ✦ separators; pauses on hover. */
export function Marquee({
  items,
  speed = 40,
  className,
  itemClassName,
  tone = "linen",
}: MarqueeProps) {
  const style = { "--marquee-duration": `${speed}s` } as CSSProperties;
  const list = (ariaHidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center">
          <span
            className={cn(
              "px-6 font-display text-[28px] font-normal tracking-[-0.01em] text-teal sm:px-8 lg:text-[40px]",
              itemClassName,
            )}
          >
            {item}
          </span>
          <span aria-hidden className="select-none text-[18px] text-copper lg:text-[22px]">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className={cn(
        "marquee relative overflow-hidden border-y border-line py-4 lg:py-5",
        TONE[tone],
        className,
      )}
      style={style}
    >
      <div className="marquee-track flex w-max">
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}
