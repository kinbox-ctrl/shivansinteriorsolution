import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Eases a number towards `target` over `duration` ms with requestAnimationFrame. Renders the
 * target directly on the server and under prefers-reduced-motion, so nothing ever "counts up"
 * from zero on first paint.
 */
export function useTween(target: number, duration = 500): number {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(target);
  const shown = useRef(target);

  useEffect(() => {
    if (reduced) {
      shown.current = target;
      return;
    }
    const from = shown.current;
    if (from === target) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = p < 1 ? from + (target - from) * eased : target;
      shown.current = next;
      setValue(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduced]);

  return reduced ? target : value;
}
