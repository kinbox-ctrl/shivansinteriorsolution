import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";

export type ButtonVariant = "primary" | "secondary" | "teal" | "ghost" | "whatsapp" | "white";
export type ButtonSize = "sm" | "md" | "lg";

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Append an arrow-right icon after the label. */
  arrow?: boolean;
  /** Leading icon node (e.g. `<Phone className="size-4" />`). */
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
  /** Full width (useful on mobile stacks). */
  block?: boolean;
};

export type ButtonAsLink = Common & {
  /** Internal route: renders a TanStack `<Link>`. */
  to: string;
  href?: never;
  params?: Record<string, string>;
} & Omit<ComponentPropsWithoutRef<"a">, "className" | "children" | "href">;

export type ButtonAsAnchor = Common & {
  /** External URL: renders an `<a>`. */
  href: string;
  to?: never;
} & Omit<ComponentPropsWithoutRef<"a">, "className" | "children" | "href">;

export type ButtonAsButton = Common & {
  to?: never;
  href?: never;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton;

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-copper text-white shadow-[0_10px_24px_-12px_rgba(169,83,31,0.65)] hover:bg-copper-hover hover:shadow-[0_14px_28px_-12px_rgba(169,83,31,0.7)]",
  secondary: "border border-teal/70 bg-transparent text-teal hover:bg-teal hover:text-white",
  teal: "bg-teal text-white hover:bg-teal-hover shadow-[0_10px_24px_-14px_rgba(0,60,72,0.7)]",
  ghost: "bg-transparent text-teal hover:bg-teal-soft/60",
  whatsapp: "bg-copper text-white hover:bg-copper-hover",
  white: "glass text-teal hover:bg-white",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-[14px] gap-2 [&_svg]:size-4",
  md: "h-12 px-7 text-[15px] gap-2.5 [&_svg]:size-[18px]",
  lg: "h-14 px-9 text-[16px] gap-3 [&_svg]:size-5",
};

function classes(
  variant: ButtonVariant,
  size: ButtonSize,
  block: boolean | undefined,
  className: string | undefined,
) {
  return cn(
    "group/btn inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-full font-semibold leading-none",
    "transition-[background-color,color,box-shadow,transform] duration-300 ease-soft",
    "hover:-translate-y-px active:translate-y-0",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANT[variant],
    SIZE[size],
    block && "flex h-auto min-h-12 w-full whitespace-normal py-3 text-center leading-snug",
    className,
  );
}

/**
 * Pill button. Renders `<Link>` when `to` is set, `<a>` when `href` is set, else `<button>`.
 * `arrow` appends an ArrowRight that nudges on hover; `icon` prepends a node.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    arrow = false,
    icon,
    className,
    children,
    block,
    ...rest
  } = props;

  const leading =
    icon ?? (variant === "whatsapp" ? <WhatsAppIcon className="size-[18px]" /> : null);

  const inner = (
    <>
      {leading}
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          strokeWidth={1.75}
          className="transition-transform duration-300 ease-soft group-hover/btn:translate-x-0.5"
        />
      )}
    </>
  );

  const cls = classes(variant, size, block, className);

  if ("to" in rest && typeof rest.to === "string") {
    const { to, params, ...linkRest } = rest as ButtonAsLink;
    // NAV/content links are plain strings; TanStack's typed `to` needs a literal, so we widen it.
    const linkProps = { to, params } as unknown as LinkProps;
    return (
      <Link {...(linkRest as Omit<LinkProps, "to" | "params">)} {...linkProps} className={cls}>
        {inner}
      </Link>
    );
  }

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...aRest } = rest as ButtonAsAnchor;
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...aRest}
      >
        {inner}
      </a>
    );
  }

  const { type = "button", ...btnRest } = rest as ButtonAsButton;
  return (
    <button type={type} className={cls} {...btnRest}>
      {inner}
    </button>
  );
}
