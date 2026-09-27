import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CardProps = {
  as?: ElementType;
  /** Lift + stronger shadow on hover. */
  hover?: boolean;
  /** Remove the default padding. */
  flush?: boolean;
  tone?: "white" | "linen" | "mist" | "cloud";
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

const TONE = {
  white: "bg-white",
  linen: "bg-linen",
  mist: "bg-mist",
  cloud: "bg-cloud",
} as const;

/** White card: 16px radius, hairline border, soft shadow. */
export function Card({
  as: Tag = "div",
  hover = false,
  flush = false,
  tone = "white",
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        "relative rounded-2xl border border-line shadow-soft",
        TONE[tone],
        !flush && "p-6 lg:p-7",
        hover &&
          "transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
