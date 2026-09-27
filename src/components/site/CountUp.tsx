import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/scroll";
import { useInView } from "@/lib/use-reveal";
import { cn } from "@/lib/utils";

export type CountUpProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  /** Animation duration in ms. Default 1400. */
  duration?: number;
  /** Decimal places to show. Default 0. */
  decimals?: number;
  /** Indian digit grouping (12,34,567). Default true. */
  group?: boolean;
  className?: string;
};

function format(value: number, decimals: number, group: boolean) {
  return group
    ? value.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : value.toFixed(decimals);
}

/**
 * Number that counts up from 0 when it scrolls into view. SSR, no-JS and reduced-motion visitors
 * see the final value immediately.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1400,
  decimals = 0,
  group = true,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { threshold: 0.4 });
  const [value, setValue] = useState(to);
  const [armed, setArmed] = useState(false);

  // After hydration, decide whether to animate at all.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    setArmed(true);
    setValue(0);
  }, []);

  useEffect(() => {
    if (!armed || !inView) return;
    let raf = 0;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(to * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [armed, inView, to, duration]);

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
      aria-label={`${prefix}${format(to, decimals, group)}${suffix}`}
    >
      {prefix}
      {format(value, decimals, group)}
      {suffix}
    </span>
  );
}
