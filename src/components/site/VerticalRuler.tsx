import { cn } from "@/lib/utils";

export type VerticalRulerProps = {
  className?: string;
  /** Labels down the ruler. Default ["300","600","900"]. */
  labels?: readonly string[];
};

/**
 * Decorative vertical ruler for the left margin of hero sections (absolute, hidden below lg).
 * Place inside a `relative` section.
 */
export function VerticalRuler({ className, labels = ["300", "600", "900"] }: VerticalRulerProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-0 bottom-0 left-0 hidden w-10 lg:block",
        className,
      )}
    >
      <div
        className="absolute top-6 bottom-6 left-0 w-[5px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--line-strong) 0 1px, transparent 1px 10px)",
        }}
      />
      <div
        className="absolute top-6 bottom-6 left-0 w-[10px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--copper) 0 1px, transparent 1px 50px)",
          opacity: 0.55,
        }}
      />
      {labels.map((label, i) => (
        <span
          key={label}
          className="absolute left-3 font-mono text-[9px] leading-none text-ink-soft"
          style={{ top: `calc(1.5rem + ${(i + 1) * 22}% )` }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
