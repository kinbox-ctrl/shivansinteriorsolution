import { Link } from "@tanstack/react-router";
import monogram from "@/assets/brand/monogram.png";
import { cn } from "@/lib/utils";

export type LogoProps = {
  className?: string;
  /** Monogram height in px. Default 40. */
  size?: number;
  /** Hide the two-line wordmark. */
  markOnly?: boolean;
  onClick?: () => void;
};

/** Monogram + "Shivansh / INTERIOR SOLUTIONS" wordmark, linking home. */
export function Logo({ className, size = 40, markOnly = false, onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Shivansh Interior Solutions — home"
      className={cn("inline-flex shrink-0 items-center gap-3 rounded-md", className)}
    >
      <img
        src={monogram}
        alt=""
        width={Math.round(size * (592 / 516))}
        height={size}
        style={{ height: size, width: "auto" }}
        decoding="async"
        fetchPriority="high"
      />
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[22px] leading-none font-medium tracking-[-0.01em] text-teal">
            Shivansh
          </span>
          <span className="mt-1 font-sans text-[9px] leading-none font-semibold tracking-[0.22em] text-copper uppercase">
            Interior Solutions
          </span>
        </span>
      )}
    </Link>
  );
}
