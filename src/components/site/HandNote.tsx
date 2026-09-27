import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type HandNoteArrow = "down-left" | "down-right" | "left" | "right" | "up-left" | "up-right";

export type HandNoteProps = {
  children: ReactNode;
  /** Draw a curved hand-drawn arrow next to the note. */
  arrow?: HandNoteArrow;
  /** Rotation in degrees. Default -3. */
  rotate?: number;
  tone?: "teal" | "copper" | "ink";
  className?: string;
  style?: CSSProperties;
};

const TONE = { teal: "text-teal", copper: "text-copper", ink: "text-ink" } as const;

function Arrow({ dir }: { dir: HandNoteArrow }) {
  const common = {
    viewBox: "0 0 60 60",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "size-10 shrink-0",
    "aria-hidden": true,
  };
  switch (dir) {
    case "down-left":
      return (
        <svg {...common}>
          <path d="M50 8c-4 18-16 34-36 42" />
          <path d="M20 40l-6 10 12 1" />
        </svg>
      );
    case "down-right":
      return (
        <svg {...common}>
          <path d="M10 8c4 18 16 34 36 42" />
          <path d="M40 40l6 10-12 1" />
        </svg>
      );
    case "up-left":
      return (
        <svg {...common}>
          <path d="M50 52c-4-18-16-34-36-42" />
          <path d="M20 20l-6-10 12-1" />
        </svg>
      );
    case "up-right":
      return (
        <svg {...common}>
          <path d="M10 52c4-18 16-34 36-42" />
          <path d="M40 20l6-10-12-1" />
        </svg>
      );
    case "left":
      return (
        <svg {...common}>
          <path d="M52 22c-14-6-30-4-44 8" />
          <path d="M16 22l-8 8 10 6" />
        </svg>
      );
    case "right":
    default:
      return (
        <svg {...common}>
          <path d="M8 22c14-6 30-4 44 8" />
          <path d="M44 22l8 8-10 6" />
        </svg>
      );
  }
}

/** Handwritten Caveat annotation ("Thoughtful interiors, built to last") with a little arrow. */
export function HandNote({
  children,
  arrow,
  rotate = -3,
  tone = "teal",
  className,
  style,
}: HandNoteProps) {
  const before = arrow === "left" || arrow === "up-left" || arrow === "down-left";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-hand text-[20px] leading-tight lg:text-[22px]",
        TONE[tone],
        arrow?.startsWith("down") && "items-start",
        arrow?.startsWith("up") && "items-end",
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      {arrow && before && <Arrow dir={arrow} />}
      <span>{children}</span>
      {arrow && !before && <Arrow dir={arrow} />}
    </span>
  );
}
