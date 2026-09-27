import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ContainerProps = {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

/** Page-width wrapper: max-w 1320px with the responsive gutters from the design system. */
export function Container({ as: Tag = "div", className, children, ...rest }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10", className)} {...rest}>
      {children}
    </Tag>
  );
}
