import type { CSSProperties, ReactElement } from "react";
import { cn } from "@/lib/utils";

export type SketchKind = "plant" | "plant-large" | "arch" | "jali" | "ladder";

export type SketchProps = {
  kind: SketchKind;
  /** Position it with absolute/inset classes; width via w-*. */
  className?: string;
  style?: CSSProperties;
  /** Stroke opacity. Default 0.55. */
  opacity?: number;
};

const COMMON = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Plant() {
  return (
    <svg viewBox="0 0 120 160" {...COMMON}>
      <path d="M40 120h40l-4 32H44z" />
      <path d="M36 120h48" />
      <path d="M60 120V70" />
      <path d="M60 96c-14-4-26-16-28-34 16 2 26 14 28 34z" />
      <path d="M60 84c14-4 26-18 26-38-16 4-26 18-26 38z" />
      <path d="M60 70c-10-8-14-24-8-40 10 8 14 24 8 40z" />
      <path d="M60 104c-8-2-18-4-26-2 8 8 18 10 26 2z" />
      <path d="M60 100c8-2 18-6 24-12-8 0-18 4-24 12z" />
      <path d="M48 44c2 6 4 10 8 14M76 54c-2 6-6 10-10 14" />
    </svg>
  );
}

function PlantLarge() {
  return (
    <svg viewBox="0 0 200 320" {...COMMON}>
      <path d="M80 250h40l-6 60H86z" />
      <path d="M74 250h52" />
      <path d="M100 250V130" />
      <path d="M100 200c-30-6-56-36-58-78 30 6 54 36 58 78z" />
      <path d="M100 176c30-8 54-40 52-86-30 10-52 42-52 86z" />
      <path d="M100 150c-22-14-32-48-20-84 20 16 30 50 20 84z" />
      <path d="M100 214c-18-6-40-8-58-2 18 16 40 18 58 2z" />
      <path d="M100 210c18-6 38-14 52-30-18 0-38 10-52 30z" />
      <path d="M100 236c-12-8-28-10-42-6 14 10 28 12 42 6z" />
      <path d="M68 138c6 10 12 18 22 26M144 108c-4 12-10 22-20 30M88 84c4 12 8 20 12 26" />
    </svg>
  );
}

function Arch() {
  return (
    <svg viewBox="0 0 200 300" {...COMMON}>
      <path d="M20 290V120c0-30 14-52 34-64 12-8 26-14 46-26 20 12 34 18 46 26 20 12 34 34 34 64v170" />
      <path d="M34 290V126c0-26 12-44 30-54 12-7 24-13 36-22 12 9 24 15 36 22 18 10 30 28 30 54v164" />
      <path d="M100 50v-20M92 34l8-10 8 10" />
      <path d="M12 290h176" />
      <path d="M12 300h176" />
      <g>
        <path d="M60 130l40 40 40-40M60 170l40 40 40-40M60 210l40 40 40-40M60 250l40 40" />
        <path d="M100 130l-40 40M140 170l-40 40M140 210l-40 40M140 250l-40 40" />
        <path d="M60 130l-26 26M140 130l26 26M60 210l-26 26M140 210l26 26" />
        <circle cx="100" cy="150" r="5" />
        <circle cx="100" cy="190" r="5" />
        <circle cx="100" cy="230" r="5" />
      </g>
    </svg>
  );
}

function Jali() {
  return (
    <svg viewBox="0 0 160 160" {...COMMON}>
      <defs>
        <pattern id="sketch-jali" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 2 38 20 20 38 2 20Z" />
          <circle cx="20" cy="20" r="6" />
          <path d="M20 0v40M0 20h40" strokeOpacity="0.5" />
        </pattern>
      </defs>
      <rect width="160" height="160" fill="url(#sketch-jali)" stroke="none" />
      <rect x="0.6" y="0.6" width="158.8" height="158.8" />
    </svg>
  );
}

function Ladder() {
  return (
    <svg viewBox="0 0 120 260" {...COMMON}>
      <path d="M30 250 50 10M90 250 70 10" />
      <path d="M46 40h26M44 70h28M42 100h30M40 130h32M38 160h34M36 190h36M34 220h38" />
      <path d="M50 10c-4-4-16-4-20 0M70 10c4-4 16-4 20 0" strokeOpacity="0.6" />
    </svg>
  );
}

const KIND: Record<SketchKind, () => ReactElement> = {
  plant: Plant,
  "plant-large": PlantLarge,
  arch: Arch,
  jali: Jali,
  ladder: Ladder,
};

/**
 * Pale-teal line-art decoration (1.2px strokes). Position with absolute classes; it never
 * receives pointer events and is hidden from assistive tech.
 */
export function Sketch({ kind, className, style, opacity = 0.55 }: SketchProps) {
  const Art = KIND[kind];
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none text-teal [&>svg]:h-auto [&>svg]:w-full", className)}
      style={{ opacity, ...style }}
    >
      <Art />
    </div>
  );
}
