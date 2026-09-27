import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Button, Card, Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import {
  DEFAULT_GRADE,
  ESTIMATOR_COPY,
  FULL_HOME_FROM,
  GRADE_IDS,
  GRADE_LABEL,
  SPACE_BY_ID,
  formatINRRange,
  formatLakh,
  quickEstimate,
  quickEstimateWaLink,
  type GradeId,
  type SpaceId,
} from "@/content/pricing";
import { WHATSAPP_FLOOR_PLAN } from "@/content/site";
import { prefersReducedMotion } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const TEASER = ESTIMATOR_COPY.teaser;

type Choice = SpaceId | "full";

const OPTIONS: { id: Choice; label: string }[] = [
  ...TEASER.spaces.map((id) => ({ id, label: SPACE_BY_ID[id].short })),
  { id: "full", label: TEASER.fullHomeLabel },
];

/** Eases a number towards its target over `duration` ms (instant under reduced motion). */
function useTween(target: number, duration = 400): number {
  const [value, setValue] = useState(target);
  const shown = useRef(target);

  useEffect(() => {
    const from = shown.current;
    const start = performance.now();
    const instant = prefersReducedMotion();
    let raf = 0;
    const tick = (now: number) => {
      const t = instant ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (target - from) * eased;
      shown.current = next;
      setValue(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

/** Arrow-key navigation for a roving-tabindex radio group. */
function rovingKeyDown<T>(
  e: KeyboardEvent<HTMLDivElement>,
  ids: readonly T[],
  current: T,
  onChange: (id: T) => void,
) {
  const i = ids.indexOf(current);
  if (i < 0) return;
  let next = i;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % ids.length;
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + ids.length) % ids.length;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = ids.length - 1;
  else return;
  e.preventDefault();
  const id = ids[next];
  if (id === undefined) return;
  onChange(id);
  e.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]')[next]?.focus();
}

/** "Quick estimate" teaser card: space, area and grade in, an indicative range out. */
export function HomeEstimate() {
  const [choice, setChoice] = useState<Choice>("kitchen");
  const [area, setArea] = useState<number>(SPACE_BY_ID.kitchen.defaultArea);
  const [grade, setGrade] = useState<GradeId>(DEFAULT_GRADE);
  const areaId = useId();

  const space = choice === "full" ? null : SPACE_BY_ID[choice];
  const quick = space ? quickEstimate(space.id, area, grade) : null;
  const low = useTween(quick ? quick.low : FULL_HOME_FROM);
  const high = useTween(quick ? quick.high : FULL_HOME_FROM);

  const selectSpace = (id: Choice) => {
    setChoice(id);
    if (id !== "full") setArea(SPACE_BY_ID[id].defaultArea);
  };

  const rangeText = quick ? formatINRRange(low, high) : `From ${formatLakh(FULL_HOME_FROM)}`;
  const meta = space
    ? `${area} sq.ft. · ${GRADE_LABEL[grade]} · Indicative`
    : "Complete home · 2–3 BHK · Indicative";
  const waHref = space ? quickEstimateWaLink(space.id, area, grade) : WHATSAPP_FLOOR_PLAN;
  const pct = space ? ((area - space.min) / (space.max - space.min)) * 100 : 0;
  const choiceIds = OPTIONS.map((o) => o.id);

  return (
    <Section tone="cloud" className="overflow-x-clip">
      <Container>
        <Reveal>
          <Card
            flush
            className="grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-3xl lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]"
          >
            <div className="min-w-0 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="min-w-0">
                  <Eyebrow className="mb-3">{TEASER.eyebrow}</Eyebrow>
                  <Heading as="h2" size="lg" className="text-[26px] sm:text-[30px] lg:text-[32px]">
                    {TEASER.title}
                  </Heading>
                </div>
                <div
                  role="radiogroup"
                  aria-label="Space"
                  onKeyDown={(e) => rovingKeyDown(e, choiceIds, choice, selectSpace)}
                  className="hide-scrollbar -mx-1 flex max-w-[calc(100%+0.5rem)] min-w-0 overflow-x-auto px-1 xl:mx-0 xl:max-w-none xl:shrink-0 xl:px-0"
                >
                  <div className="inline-flex shrink-0 rounded-full bg-linen p-1">
                    {OPTIONS.map((option) => {
                      const selected = option.id === choice;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          tabIndex={selected ? 0 : -1}
                          onClick={() => selectSpace(option.id)}
                          className={cn(
                            "h-10 rounded-full px-3.5 text-[13px] font-semibold whitespace-nowrap transition-[background-color,color,box-shadow] duration-300 ease-soft",
                            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
                            selected
                              ? "bg-copper text-white shadow-[0_8px_18px_-10px_rgba(169,83,31,0.7)]"
                              : "text-ink-soft hover:text-teal",
                          )}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_auto] lg:items-center lg:gap-10">
                <div
                  className={cn(!space && "pointer-events-none opacity-40")}
                  aria-disabled={!space}
                >
                  <div className="flex items-baseline gap-4">
                    <label htmlFor={areaId} className="text-[13px] font-semibold text-ink-soft">
                      Area:
                    </label>
                    <output htmlFor={areaId} className="text-[20px] font-semibold text-ink">
                      {area} <span className="text-[14px] font-medium text-ink-soft">sq.ft</span>
                    </output>
                  </div>
                  <input
                    id={areaId}
                    type="range"
                    min={space?.min ?? 0}
                    max={space?.max ?? 100}
                    step={space?.step ?? 10}
                    value={area}
                    disabled={!space}
                    onChange={(e) => setArea(Number(e.target.value))}
                    aria-valuetext={`${area} sq.ft`}
                    style={{
                      background: `linear-gradient(to right, var(--copper) ${pct}%, var(--line) ${pct}%)`,
                    }}
                    className={cn(
                      "mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full",
                      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper",
                      "[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-copper [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(15,46,48,0.25)]",
                      "[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-copper",
                    )}
                  />
                  <div className="mt-2 flex justify-between font-mono text-[11px] text-ink-soft">
                    <span>{space?.min ?? ""}</span>
                    <span>{space?.max ?? ""}</span>
                  </div>
                </div>

                <div
                  role="radiogroup"
                  aria-label="Material grade"
                  onKeyDown={(e) => rovingKeyDown(e, GRADE_IDS, grade, setGrade)}
                  className={cn(
                    "flex flex-wrap items-center gap-2 lg:border-l lg:border-line lg:pl-8",
                    !space && "pointer-events-none opacity-40",
                  )}
                >
                  <span className="mr-1 text-[13px] font-semibold text-ink-soft">Grade:</span>
                  {GRADE_IDS.map((id) => {
                    const selected = id === grade;
                    return (
                      <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        tabIndex={selected ? 0 : -1}
                        disabled={!space}
                        onClick={() => setGrade(id)}
                        className={cn(
                          "h-9 rounded-full border px-4 text-[13px] font-semibold transition-[background-color,color,border-color] duration-300 ease-soft",
                          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
                          selected
                            ? "border-copper/20 bg-copper-tint text-copper"
                            : "border-transparent bg-linen text-ink-soft hover:text-teal",
                        )}
                      >
                        {GRADE_LABEL[id]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-center border-t border-line bg-mist p-6 sm:p-8 lg:border-t-0 lg:border-l lg:p-10">
              <p className="text-[14px] font-semibold text-ink">{TEASER.rangeLabel}</p>
              <p
                className="mt-2 font-display text-[28px] leading-[1.05] font-medium tracking-[-0.02em] text-teal tabular-nums sm:text-[34px] lg:text-[32px] xl:text-[38px] 2xl:whitespace-nowrap"
                aria-live="polite"
              >
                {rangeText}
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-ink-soft uppercase">
                {meta}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Button
                  variant="whatsapp"
                  href={waHref}
                  className="w-full whitespace-normal sm:w-auto"
                >
                  {TEASER.primary}
                </Button>
                <Button variant="ghost" size="sm" arrow to="/estimator" className="px-2">
                  {TEASER.link}
                </Button>
              </div>
            </div>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}
