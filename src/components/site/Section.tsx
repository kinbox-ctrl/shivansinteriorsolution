import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionTone = "cloud" | "linen" | "mist" | "white";

export type SectionProps = {
  id?: string;
  as?: ElementType;
  tone?: SectionTone;
  /** Radial Mist (top-left) + Copper Tint (bottom-right) gradient wash. */
  wash?: boolean;
  /** Faint blueprint grid. */
  grid?: boolean;
  /** Faint jali lattice. */
  jali?: boolean;
  /** Remove the default vertical padding. */
  flush?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"section">, "className" | "children" | "id">;

const TONE: Record<SectionTone, string> = {
  cloud: "bg-cloud",
  linen: "bg-linen",
  mist: "bg-mist",
  white: "bg-white",
};

/** Section band with `py-16 lg:py-24` rhythm and optional background textures. */
export function Section({
  id,
  as: Tag = "section",
  tone = "cloud",
  wash = false,
  grid = false,
  jali = false,
  flush = false,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative",
        TONE[tone],
        wash && "wash",
        grid && "grid-paper",
        jali && "jali",
        !flush && "py-16 lg:py-24",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
