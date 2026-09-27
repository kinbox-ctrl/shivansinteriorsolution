import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ServicesFaqItem = { q: string; a: ReactNode };

export type ServicesFaqAccordionProps = {
  items: readonly ServicesFaqItem[];
  /** Index open on first render; `null` for all closed. Default 0. */
  defaultOpen?: number | null;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Page-local FAQ list, denser than the shared `<FaqAccordion>` to match the services reference:
 * ~40px closed rows with 8px gaps, plain sans numerals ("01", not the mono slashed zero) and an
 * outlined teal circle with a teal minus on the open item.
 */
export function ServicesFaqAccordion({
  items,
  defaultOpen = 0,
  className,
}: ServicesFaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const buttonId = `${base}-button-${i}`;
        return (
          <div
            key={i}
            className={cn(
              "rounded-xl border bg-white transition-[border-color,box-shadow] duration-300 ease-soft",
              isOpen ? "border-line-strong shadow-soft" : "border-line",
            )}
          >
            <h3 className="m-0 font-sans text-base font-semibold tracking-normal">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper lg:px-5 lg:py-3"
              >
                <span className="w-7 shrink-0 font-sans text-[13px] font-semibold text-copper tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[14px] font-semibold text-ink lg:text-[15px]">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "relative flex size-7 shrink-0 items-center justify-center rounded-full border text-teal transition-colors duration-300",
                    isOpen ? "border-teal" : "border-line-strong",
                  )}
                >
                  <span className="absolute h-px w-3 bg-current" />
                  <span
                    className={cn(
                      "absolute h-3 w-px bg-current transition-transform duration-300 ease-soft",
                      isOpen ? "scale-y-0" : "scale-y-100",
                    )}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-3.5 pl-[56px] text-[13.5px] leading-relaxed text-ink-soft lg:px-5 lg:pb-4 lg:pl-[60px]">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
