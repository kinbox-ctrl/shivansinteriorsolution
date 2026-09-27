import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: ReactNode };

export type FaqAccordionProps = {
  items: readonly FaqItem[];
  /** Index open on first render; `null` for all closed. Default 0. */
  defaultOpen?: number | null;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Numbered FAQ list (01, 02 …) with a rotating plus/minus toggle and a height animation. */
export function FaqAccordion({ items, defaultOpen = 0, className }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const buttonId = `${base}-button-${i}`;
        return (
          <div
            key={i}
            className={cn(
              "rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300 ease-soft",
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
                className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left lg:px-6 lg:py-5"
              >
                <span className="w-7 shrink-0 font-mono text-[13px] text-copper">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[15px] font-semibold text-ink lg:text-[16px]">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "relative flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                    isOpen ? "border-teal bg-teal text-white" : "border-line-strong text-teal",
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
                  <div className="px-5 pb-5 pl-16 text-[15px] leading-relaxed text-ink-soft lg:px-6 lg:pb-6 lg:pl-[68px]">
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
