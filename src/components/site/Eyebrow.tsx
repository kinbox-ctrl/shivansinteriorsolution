import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type EyebrowProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Hide the 24px copper rule. */
  bare?: boolean;
};

/** Copper rule + spaced uppercase label ("WHAT WE BUILD"). */
export function Eyebrow({ children, className, as: Tag = "p", bare = false }: EyebrowProps) {
  return (
    <Tag className={cn("eyebrow", bare && "before:hidden", className)}>
      <span>{children}</span>
    </Tag>
  );
}
