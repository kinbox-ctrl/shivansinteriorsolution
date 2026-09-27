import { ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { Button } from "@/components/site";
import {
  ESTIMATOR_COPY,
  GRADE_LABEL,
  estimateWaLink,
  formatINR,
  type EstimateConfig,
  type EstimateResult,
} from "@/content/pricing";
import { cn } from "@/lib/utils";
import { TweenRange } from "./Receipt";

const COPY = ESTIMATOR_COPY.receipt;
const EASE = [0.22, 1, 0.36, 1] as const;

export type MobileSheetProps = {
  config: EstimateConfig;
  result: EstimateResult;
  /** The inline receipt: the sheet hides while it (or anything after it) is on screen. */
  receiptRef: RefObject<HTMLElement | null>;
};

/**
 * Sticky bottom sheet for < lg, sitting above the chrome's action bar: drag handle, the range in
 * teal and a "View breakdown" toggle that expands the line items and the WhatsApp button.
 */
export function MobileSheet({ config, result, receiptRef }: MobileSheetProps) {
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const panelId = useId();
  const dragStart = useRef<number | null>(null);

  useEffect(() => {
    const el = receiptRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setHidden(entry.isIntersecting || entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [receiptRef]);

  const toggle = () => setExpanded((v) => !v);

  return (
    <div
      className={cn(
        "fixed inset-x-0 z-[54] transition-transform duration-500 ease-soft lg:hidden print:hidden",
        hidden && "translate-y-[130%]",
      )}
      style={{ bottom: "calc(72px + env(safe-area-inset-bottom))" }}
      aria-hidden={hidden}
      inert={hidden}
    >
      <div className="mx-2 rounded-t-2xl border border-b-0 border-line bg-white shadow-[0_-18px_44px_-20px_rgba(15,46,48,0.45)]">
        <button
          type="button"
          onClick={toggle}
          onPointerDown={(e) => {
            dragStart.current = e.clientY;
          }}
          onPointerUp={(e) => {
            const start = dragStart.current;
            dragStart.current = null;
            if (start === null) return;
            const delta = e.clientY - start;
            if (delta < -24) setExpanded(true);
            else if (delta > 24) setExpanded(false);
          }}
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={expanded ? "Collapse estimate" : "Expand estimate"}
          className="flex w-full items-center justify-center pt-2.5 pb-1.5 [touch-action:none]"
        >
          <span aria-hidden className="h-1.5 w-11 rounded-full bg-line-strong" />
        </button>
        <div className="flex items-end justify-between gap-3 px-4 pb-3">
          <div className="min-w-0">
            <p className="mono-meta">{COPY.totalLabel}</p>
            <p className="mt-1 font-display text-[26px] leading-none font-medium tracking-[-0.02em] text-teal">
              <TweenRange low={result.low} high={result.high} />
            </p>
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls={panelId}
            className="flex h-10 shrink-0 items-center gap-1 rounded-full px-2 text-[13px] font-semibold text-copper"
          >
            View breakdown
            <ChevronUp
              className={cn(
                "size-4 transition-transform duration-300 ease-soft",
                expanded && "rotate-180",
              )}
              strokeWidth={1.5}
              aria-hidden
            />
          </button>
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="border-t border-line px-4 pt-3 pb-4">
                <ul className="m-0 flex list-none flex-col p-0">
                  {result.lines.map((line) => (
                    <li
                      key={line.id}
                      className="flex items-center justify-between gap-3 border-b border-line/80 py-2.5 text-[13px]"
                    >
                      <span className="min-w-0">
                        <span className="block font-medium text-ink">{line.label}</span>
                        <span className="block font-mono text-[11px] text-ink-soft">
                          {line.area} sq.ft · {line.summary || GRADE_LABEL[line.grade]}
                        </span>
                      </span>
                      <span className="font-display text-[18px] font-medium text-ink">
                        {formatINR(line.amount)}
                      </span>
                    </li>
                  ))}
                  {result.lines.length === 0 && (
                    <li className="py-2 text-[13px] text-ink-soft">No spaces selected yet.</li>
                  )}
                  {result.lines.length > 0 && (
                    <li className="flex items-center justify-between gap-3 py-2 text-[12px] text-ink-soft">
                      <span>
                        {COPY.logisticsLabel} + {COPY.gstLabel}
                      </span>
                      <span className="font-mono">{formatINR(result.logistics + result.gst)}</span>
                    </li>
                  )}
                </ul>
                <p className="mt-2 text-[11px] leading-snug text-ink-soft">{COPY.note}</p>
                <Button
                  variant="whatsapp"
                  block
                  arrow
                  className="mt-3"
                  href={estimateWaLink(result, config)}
                >
                  {COPY.primary}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
