import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonVariant } from "./Button";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Heading } from "./Heading";
import { Sketch } from "./Sketch";

export type CtaAction = {
  label: string;
  to?: string;
  href?: string;
  icon?: ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
};

export type CtaBandProps = {
  /** May include `<em>` for the copper italic phrase. */
  title: ReactNode;
  eyebrow?: string;
  text?: ReactNode;
  primary: CtaAction;
  secondary?: CtaAction;
  /** `center` stacks everything centred (home); `split` puts buttons on the right (services). */
  align?: "center" | "split";
  className?: string;
  /** Render without the outer Container (when already inside one). */
  bare?: boolean;
};

function Action({ action, fallback }: { action: CtaAction; fallback: ButtonVariant }) {
  const common = {
    variant: action.variant ?? fallback,
    size: "lg" as const,
    arrow: action.arrow ?? true,
    ...(action.icon !== undefined ? { icon: action.icon } : {}),
  };
  if (action.to) {
    return (
      <Button {...common} to={action.to}>
        {action.label}
      </Button>
    );
  }
  return (
    <Button {...common} href={action.href ?? "#"}>
      {action.label}
    </Button>
  );
}

/** Gradient-wash call-to-action band with jali texture and margin sketches. */
export function CtaBand({
  title,
  eyebrow,
  text,
  primary,
  secondary,
  align = "center",
  className,
  bare = false,
}: CtaBandProps) {
  const centred = align === "center";
  const card = (
    <div
      className={cn(
        "wash relative overflow-hidden rounded-3xl border border-line bg-cloud px-6 py-14 shadow-soft sm:px-10 lg:px-16",
        centred ? "text-center lg:py-20" : "lg:py-16",
        className,
      )}
    >
      <div aria-hidden className="jali absolute inset-0 opacity-70" />
      <Sketch
        kind="plant-large"
        className="absolute -bottom-6 left-2 hidden w-[150px] lg:block"
        opacity={0.45}
      />
      <Sketch
        kind="arch"
        className="absolute -right-4 -bottom-10 hidden w-[170px] lg:block"
        opacity={0.4}
      />

      <div
        className={cn(
          "relative",
          centred
            ? "mx-auto flex max-w-3xl flex-col items-center"
            : "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between",
        )}
      >
        <div className={cn(!centred && "max-w-2xl")}>
          {eyebrow && (
            <Eyebrow className={cn("mb-4", centred && "justify-center before:hidden")}>
              {eyebrow}
            </Eyebrow>
          )}
          <Heading as="h2" size="lg">
            {title}
          </Heading>
          {text && (
            <p
              className={cn(
                "mt-4 text-[17px] leading-relaxed text-ink-soft",
                centred && "mx-auto max-w-xl",
              )}
            >
              {text}
            </p>
          )}
        </div>
        <div className={cn("flex flex-wrap gap-3", centred ? "mt-8 justify-center" : "shrink-0")}>
          <Action action={primary} fallback="primary" />
          {secondary && <Action action={secondary} fallback="secondary" />}
        </div>
      </div>
    </div>
  );
  return bare ? card : <Container>{card}</Container>;
}
