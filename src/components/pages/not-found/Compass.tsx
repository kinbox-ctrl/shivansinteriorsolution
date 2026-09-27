import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type CompassProps = {
  /** id of the element the needle should settle pointing at. */
  targetId: string;
  className?: string;
};

/** Default heading (clockwise from north) used for SSR and when the target is not found. */
const DEFAULT_ANGLE = -52;

const LETTERS: ReadonlyArray<{ label: string; x: number; y: number }> = [
  { label: "N", x: 60, y: 13 },
  { label: "E", x: 108, y: 63 },
  { label: "S", x: 60, y: 113 },
  { label: "W", x: 12, y: 63 },
];

/** Tick marks every 30 degrees, rounded to 2 dp so the SSR markup matches the client exactly. */
const TICKS: ReadonlyArray<{ x1: string; y1: string; x2: string; y2: string }> = Array.from(
  { length: 12 },
  (_, i) => {
    const rad = (i * 30 * Math.PI) / 180;
    const r1 = i % 3 === 0 ? 33 : 36;
    const f = (n: number) => n.toFixed(2);
    return {
      x1: f(60 + Math.sin(rad) * r1),
      y1: f(60 - Math.cos(rad) * r1),
      x2: f(60 + Math.sin(rad) * 39),
      y2: f(60 - Math.cos(rad) * 39),
    };
  },
);

/**
 * Hand-drawn compass rose: teal ring, N/E/S/W letters and a copper needle that wobbles and
 * settles pointing at `targetId` (CSS keyframes; the global reduced-motion rules collapse the
 * animation to its final frame, so the needle is static there).
 */
export function Compass({ targetId, className }: CompassProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const aim = () => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const a = el.getBoundingClientRect();
      const b = target.getBoundingClientRect();
      const dx = b.left + b.width / 2 - (a.left + a.width / 2);
      const dy = b.top + b.height / 2 - (a.top + a.height / 2);
      // Clockwise degrees from north (needle art points up by default).
      const deg = Math.round((Math.atan2(dx, -dy) * 180) / Math.PI);
      el.style.setProperty("--nf-angle", `${deg}deg`);
    };

    aim();
    window.addEventListener("resize", aim);
    return () => window.removeEventListener("resize", aim);
  }, [targetId]);

  return (
    <div
      ref={ref}
      className={cn("relative size-[104px] text-teal lg:size-[118px]", className)}
      style={{ "--nf-angle": `${DEFAULT_ANGLE}deg` } as CSSProperties}
      role="img"
      aria-label="Compass pointing towards the Back to home button"
    >
      <svg viewBox="0 0 120 120" fill="none" className="size-full" aria-hidden>
        <g stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="60" cy="60" r="44" opacity={0.9} />
          <circle cx="60" cy="60" r="39" strokeWidth={0.9} opacity={0.6} />
          <circle cx="60" cy="60" r="27" strokeWidth={0.8} opacity={0.4} />
          {/* tick marks every 30 degrees */}
          {TICKS.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              strokeWidth={i % 3 === 0 ? 1.2 : 0.8}
              opacity={0.7}
            />
          ))}
          {/* faint cross hair */}
          <path d="M60 24v72M24 60h72" strokeWidth={0.6} opacity={0.35} />
        </g>
        {LETTERS.map((l) => (
          <text
            key={l.label}
            x={l.x}
            y={l.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-hand)"
            fontSize={l.label === "N" ? 15 : 13}
            fontWeight={600}
            fill="currentColor"
          >
            {l.label}
          </text>
        ))}
        {/* needle: copper head to the north, pale tail to the south */}
        <g className="nf-needle">
          <path d="M60 26 L66 60 L54 60 Z" fill="#C66935" />
          <path d="M60 94 L66 60 L54 60 Z" fill="#E8F0EE" stroke="#0F2E30" strokeWidth={0.8} />
          <path d="M60 26 L66 60 L54 60 Z" fill="none" stroke="#A9531F" strokeWidth={0.8} />
        </g>
        <circle cx="60" cy="60" r="3.4" fill="#FBFAF7" stroke="currentColor" strokeWidth={1.2} />
      </svg>
    </div>
  );
}
