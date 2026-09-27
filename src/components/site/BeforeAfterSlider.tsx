import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type BeforeAfterImage = { src: string; alt: string; label: string };

export type BeforeAfterSliderProps = {
  before: BeforeAfterImage;
  after: BeforeAfterImage;
  /** Starting position in percent. Default 50. */
  initial?: number;
  /** CSS aspect ratio. Default "16/9". */
  aspect?: string;
  className?: string;
  radius?: "md" | "lg" | "xl";
  ariaLabel?: string;
};

const RADIUS = { md: "rounded-2xl", lg: "rounded-3xl", xl: "rounded-4xl" } as const;

/**
 * Before/after comparison: the "before" layer is clipped to the handle position. A transparent
 * range input over the whole panel gives mouse, touch and keyboard (arrow keys) control.
 */
export function BeforeAfterSlider({
  before,
  after,
  initial = 50,
  aspect = "16/9",
  className,
  radius = "lg",
  ariaLabel = "Compare before and after",
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(() => Math.min(100, Math.max(0, initial)));
  const id = useId();

  return (
    <div
      className={cn(
        "relative select-none overflow-hidden bg-linen shadow-lift",
        RADIUS[radius],
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      <img
        src={after.src}
        alt={after.alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        aria-hidden
      >
        <img
          src={before.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>

      {/* divider + handle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-px bg-white/90 shadow-[0_0_0_1px_rgba(0,60,72,0.12)]"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-teal shadow-lift">
          <svg
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 8 4 12l4 4" />
            <path d="m16 8 4 4-4 4" />
            <path d="M12 5.5v13" className="opacity-40" />
            <circle cx="12" cy="12" r="2" className="fill-copper stroke-copper" />
          </svg>
        </span>
      </div>

      {/* labels */}
      <span className="glass pointer-events-none absolute bottom-4 left-4 rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] text-teal uppercase">
        {before.label}
      </span>
      <span className="glass pointer-events-none absolute right-4 bottom-4 rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] text-teal uppercase">
        {after.label}
      </span>

      <label htmlFor={id} className="sr-only">
        {ariaLabel}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={ariaLabel}
        aria-valuetext={`${pos}% ${before.label}`}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-copper [&::-moz-range-thumb]:h-full [&::-moz-range-thumb]:w-12 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:appearance-none"
      />
    </div>
  );
}
