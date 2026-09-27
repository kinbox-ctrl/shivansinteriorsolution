import { Download, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type Ref } from "react";
import { Button } from "@/components/site";
import {
  ESTIMATOR_COPY,
  GRADE_LABEL,
  estimateWaLink,
  formatINR,
  formatLakh,
  formatLakhRange,
  getHomeType,
  roundTo100,
  type EstimateConfig,
  type EstimateResult,
} from "@/content/pricing";
import { cn } from "@/lib/utils";
import { contentIcon } from "./icons";
import { SPACE_BY_ID } from "@/content/pricing";
import { Tween } from "./Tween";
import { useTween } from "./use-tween";

const COPY = ESTIMATOR_COPY.receipt;

/** Segment colours in line order: copper, oak, teal, then bright copper and teal-hover. */
const SEGMENT = [
  "var(--copper)",
  "var(--oak)",
  "var(--teal)",
  "var(--copper-bright)",
  "var(--teal-hover)",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export type TweenRangeProps = { low: number; high: number; className?: string };

/** "₹4.13 – 4.69 lakh" with both ends tweening. */
export function TweenRange({ low, high, className }: TweenRangeProps) {
  const l = useTween(low);
  const h = useTween(high);
  return <span className={className}>{formatLakhRange(l, h)}</span>;
}

type DonutProps = { result: EstimateResult };

function Donut({ result }: DonutProps) {
  const total = useTween(result.total);
  const [amount, unit] = formatLakh(total).split(" ");
  const r = 44;
  const c = 2 * Math.PI * r;
  const gap = result.lines.length > 1 ? 2.5 : 0;
  let cursor = 0;
  const arcs = result.lines.map((line, i) => {
    const frac = result.total > 0 ? line.amount / result.total : 0;
    const len = Math.max(0, frac * c - gap);
    const start = cursor * c + gap / 2;
    cursor += frac;
    return { id: line.id, len, start, color: SEGMENT[i % SEGMENT.length] ?? SEGMENT[0] };
  });

  return (
    <div className="relative size-[150px] shrink-0">
      <svg viewBox="0 0 120 120" className="size-full" aria-hidden>
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--linen)" strokeWidth="17" />
        <g transform="rotate(-90 60 60)">
          {arcs.map((a) => (
            <circle
              key={a.id}
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke={a.color}
              strokeWidth="17"
              strokeDasharray={`${a.len} ${c - a.len}`}
              strokeDashoffset={-a.start}
              className="transition-[stroke-dasharray,stroke-dashoffset] duration-700 ease-soft"
            />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-[22px] leading-none font-medium tracking-[-0.02em] text-copper">
          {amount}
        </span>
        <span className="mt-1 font-display text-[13px] leading-none text-copper">{unit}</span>
        <span className="mt-1 text-[9px] leading-none text-ink-soft">{COPY.approx}</span>
      </div>
    </div>
  );
}

export type ReceiptProps = {
  config: EstimateConfig;
  result: EstimateResult;
  className?: string;
  ref?: Ref<HTMLDivElement>;
};

/** Sticky itemised bill: donut, line items, big range and the WhatsApp / PDF actions. */
export function Receipt({ config, result, className, ref }: ReceiptProps) {
  const home = getHomeType(config.homeType);
  const [opening, setOpening] = useState(false);
  useEffect(() => {
    if (!opening) return;
    const t = window.setTimeout(() => setOpening(false), 2500);
    return () => window.clearTimeout(t);
  }, [opening]);

  return (
    <div
      ref={ref}
      id="estimate-receipt"
      className={cn(
        "rounded-2xl border border-line bg-white p-5 shadow-lift sm:p-6 lg:p-7",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-[26px] leading-none font-medium tracking-[-0.02em] text-teal lg:text-[28px]">
            {COPY.title}
          </h2>
          <p className="mt-2 text-[12px] leading-snug text-ink-soft">{COPY.sub}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-xl border border-line bg-mist/60 py-1.5 pr-3 pl-1.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-white text-teal shadow-soft">
            <MapPin className="size-4" strokeWidth={1.5} aria-hidden />
          </span>
          <span className="leading-tight">
            <span className="block text-[12px] font-semibold text-ink">{home.label}</span>
            <span className="block text-[11px] text-ink-soft">{home.range}</span>
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-5 sm:flex-row sm:gap-7">
        <Donut result={result} />
        <ul className="m-0 flex w-full min-w-0 flex-1 list-none flex-col gap-3 p-0">
          {result.shares.length === 0 && (
            <li className="text-[13px] text-ink-soft">Switch on a space to see its share.</li>
          )}
          {result.shares.map((share, i) => (
            <li key={share.id} className="flex items-center gap-2.5 text-[14px]">
              <span
                aria-hidden
                className="size-3 shrink-0 rounded-full"
                style={{ background: SEGMENT[i % SEGMENT.length] }}
              />
              <span className="min-w-0 flex-1 truncate text-ink">{share.label}</span>
              <span className="font-mono text-[13px] text-ink-soft">{share.pct}%</span>
            </li>
          ))}
        </ul>
      </div>

      <table className="mt-6 w-full border-collapse">
        <thead>
          <tr className="border-b border-line text-left">
            {COPY.columns.map((col, i) => (
              <th
                key={col}
                scope="col"
                className={cn(
                  "mono-meta pb-2 font-normal",
                  i === 3 && "text-right",
                  i === 1 && "hidden sm:table-cell",
                  i === 2 && "hidden sm:table-cell",
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
            {result.lines.map((line) => {
              const Icon = contentIcon(SPACE_BY_ID[line.id].icon);
              return (
                <motion.tr
                  key={line.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="border-b border-line/80"
                >
                  <td className="py-3 pr-2">
                    <span className="flex items-center gap-2.5">
                      <Icon
                        className="size-[18px] shrink-0 text-teal"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <span className="text-[13px] leading-tight font-medium text-ink">
                        {line.label}
                        <span className="block font-mono text-[11px] text-ink-soft sm:hidden">
                          {line.area} sq.ft · {GRADE_LABEL[line.grade]}
                        </span>
                      </span>
                    </span>
                  </td>
                  <td className="hidden py-3 pr-2 font-mono text-[13px] text-ink-soft sm:table-cell">
                    {line.area} sq.ft
                  </td>
                  <td className="hidden py-3 pr-2 text-[13px] text-ink-soft sm:table-cell">
                    {GRADE_LABEL[line.grade]}
                  </td>
                  <td className="py-3 text-right">
                    <Tween
                      value={line.amount}
                      format={(n) => formatINR(roundTo100(n))}
                      className="font-display text-[20px] leading-none font-medium tracking-[-0.01em] text-ink"
                    />
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
          {result.lines.length === 0 && (
            <tr>
              <td colSpan={4} className="py-4 text-[13px] text-ink-soft">
                No spaces selected yet. Switch one on above to build your estimate.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-6">
        <p className="text-[15px] font-medium text-ink">{COPY.totalLabel}</p>
        <p className="mt-1 font-display text-[36px] leading-none font-medium tracking-[-0.02em] text-teal sm:text-[42px] lg:text-[44px]">
          <TweenRange low={result.low} high={result.high} />
        </p>
        <p className="mt-3 text-[12px] leading-snug text-ink-soft">{COPY.note}</p>
      </div>

      <div className="mt-5 flex flex-col gap-3" data-print-hide>
        <Button
          variant="whatsapp"
          block
          arrow
          href={estimateWaLink(result, config)}
          onClick={() => setOpening(true)}
        >
          {COPY.primary}
        </Button>
        <p
          aria-live="polite"
          className={cn("text-center text-[12px] text-ink-soft", !opening && "sr-only")}
        >
          {opening ? "Opening WhatsApp…" : ""}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="secondary"
            icon={<Download strokeWidth={1.5} aria-hidden />}
            onClick={() => window.print()}
          >
            {COPY.secondary}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            arrow
            to="/contact"
            className="px-3 underline-offset-4 hover:underline"
          >
            {COPY.link}
          </Button>
        </div>
      </div>
    </div>
  );
}
