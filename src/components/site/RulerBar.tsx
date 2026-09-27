import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type RulerBarProps = { className?: string };

const LABELS = Array.from({ length: 26 }, (_, i) => i * 100);

/**
 * Fixed 14px ruler along the very top of the page: ticks every 10px, taller every 50px, DM Mono
 * numbers every 100px, and a copper progress line whose width tracks scroll progress.
 */
export function RulerBar({ className }: RulerBarProps) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[70] h-[14px] overflow-hidden border-b border-line-strong/70 bg-cloud",
        className,
      )}
    >
      {/* minor ticks every 10px, major every 50px */}
      <div
        className="absolute inset-x-0 bottom-0 h-[5px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, var(--line-strong) 0 1px, transparent 1px 10px)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[9px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, var(--copper) 0 1px, transparent 1px 50px)",
          opacity: 0.55,
        }}
      />
      {LABELS.map((n) => (
        <span
          key={n}
          className="absolute top-0 -translate-x-1/2 font-mono text-[7px] leading-none text-ink-soft"
          style={{ left: n, top: 1 }}
        >
          {n}
        </span>
      ))}
      <div
        ref={bar}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-copper"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
