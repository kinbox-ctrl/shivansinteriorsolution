import { useEffect, useRef, useState, type RefObject } from "react";

export type ReadingTapeProps = {
  /** The element whose scroll-through is measured (the reading body). */
  trackRef: RefObject<HTMLElement | null>;
};

/** Distance from the viewport top at which the tape sits once sticky (chrome + tape). */
const TAPE_TOP = 112;
const LABELS = Array.from({ length: 13 }, (_, i) => i * 100);

/**
 * Article reading progress styled like a measuring tape: ticks every 10px, taller every 50px,
 * DM Mono numbers every 100px, and a copper line that grows as the body is read. Sticky just
 * below the site header (14px ruler + 76px glass bar).
 */
export function ReadingTape({ trackRef }: ReadingTapeProps) {
  const bar = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    let last = -1;
    const update = () => {
      raf = 0;
      const track = trackRef.current;
      const line = bar.current;
      if (!track || !line) return;
      const rect = track.getBoundingClientRect();
      const readable = rect.height - (window.innerHeight - TAPE_TOP);
      let p: number;
      if (readable <= 0) p = rect.top < TAPE_TOP ? 1 : 0;
      else p = Math.min(1, Math.max(0, (TAPE_TOP - rect.top) / readable));
      line.style.transform = `scaleX(${p})`;
      const rounded = Math.round(p * 100);
      if (rounded !== last) {
        last = rounded;
        setPct(rounded);
      }
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
  }, [trackRef]);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className="sticky top-[86px] z-40 -mx-5 h-[22px] overflow-hidden border-b border-line bg-cloud/90 backdrop-blur-md sm:-mx-8 lg:top-[90px] lg:mx-0 lg:rounded-b-lg lg:border-x"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[5px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, var(--line-strong) 0 1px, transparent 1px 10px)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[10px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, var(--copper) 0 1px, transparent 1px 50px)",
          opacity: 0.55,
        }}
      />
      {LABELS.map((n) => (
        <span
          key={n}
          aria-hidden
          className="absolute top-[2px] -translate-x-1/2 font-mono text-[8px] leading-none text-ink-soft"
          style={{ left: n === 0 ? 8 : n }}
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
