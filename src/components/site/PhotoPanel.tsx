import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PhotoPanelProps = {
  src: string;
  alt: string;
  /** 20px (`lg`, default) or 24px (`xl`) corners; `md` = 16px. */
  radius?: "md" | "lg" | "xl";
  /** Draw a 12px-offset Mist rectangle behind the photo. */
  offset?: "mist" | "copper" | "linen";
  /** Tailwind aspect class value, e.g. "4/3", "16/10", "1/1". Default "4/3". */
  aspect?: string;
  /** Extra content layered over the photo (chips, toggles). */
  children?: ReactNode;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
} & Omit<ComponentPropsWithoutRef<"figure">, "className" | "children">;

const RADIUS = { md: "rounded-2xl", lg: "rounded-3xl", xl: "rounded-4xl" } as const;
const OFFSET = { mist: "bg-mist", copper: "bg-copper-tint", linen: "bg-linen" } as const;

/** Rounded photo with a soft shadow and an optional offset colour block behind it. */
export function PhotoPanel({
  src,
  alt,
  radius = "lg",
  offset,
  aspect = "4/3",
  children,
  className,
  imgClassName,
  loading = "lazy",
  fetchPriority,
  sizes,
  ...rest
}: PhotoPanelProps) {
  return (
    <figure className={cn("relative", className)} {...rest}>
      {offset && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -bottom-3 -left-3 h-full w-full",
            RADIUS[radius],
            OFFSET[offset],
          )}
        />
      )}
      <div
        className={cn("relative overflow-hidden shadow-lift", RADIUS[radius])}
        style={{ aspectRatio: aspect }}
      >
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          {...(fetchPriority ? { fetchPriority } : {})}
          {...(sizes ? { sizes } : {})}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
        {children}
      </div>
    </figure>
  );
}
