import { Check } from "lucide-react";
import { ESTIMATOR_COPY } from "@/content/pricing";
import { cn } from "@/lib/utils";

export type StepperProps = { active: number; className?: string };

/** Home · Spaces · Materials · Estimate. Completed steps teal with a check, active copper. */
export function Stepper({ active, className }: StepperProps) {
  return (
    <ol aria-label="Estimator progress" className={cn("flex items-start", className)}>
      {ESTIMATOR_COPY.steps.map((label, i) => {
        const n = i + 1;
        const done = n < active;
        const current = n === active;
        return (
          <li
            key={label}
            className="relative flex flex-1 flex-col items-center"
            {...(current ? { "aria-current": "step" as const } : {})}
          >
            {i > 0 && (
              <span
                aria-hidden
                className={cn(
                  "absolute top-[15px] right-1/2 left-[-50%] h-px",
                  done || current ? "bg-teal" : "bg-line-strong",
                )}
              />
            )}
            <span
              className={cn(
                "relative z-10 flex size-8 items-center justify-center rounded-full border font-mono text-[13px] leading-none transition-colors duration-500 ease-soft",
                done && "border-teal bg-teal text-white",
                current && "border-copper bg-copper text-white",
                !done && !current && "border-line-strong bg-white text-ink-soft",
              )}
            >
              {done ? <Check className="size-4" strokeWidth={2} aria-hidden /> : n}
              {done && <span className="sr-only">completed</span>}
            </span>
            <span
              className={cn(
                "mt-2 text-[13px] font-semibold",
                current ? "text-copper" : done ? "text-teal" : "text-ink-soft",
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
