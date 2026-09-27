import { Check, Clock, Droplets } from "lucide-react";
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Button, Card, Container, Eyebrow, Reveal, Section } from "@/components/site";
import { img } from "@/content/images";
import type { ServiceOptionItem, ServiceOptions as ServiceOptionsData } from "@/content/services";
import { WHATSAPP_PHOTO } from "@/content/site";
import { cn } from "@/lib/utils";
import { iconFor } from "./icons";
import { ctaTarget, linkSpread } from "./links";

type Props = { options: ServiceOptionsData; galleryTo: string };

function DimensionLine() {
  return (
    <svg viewBox="0 0 120 8" className="h-2 w-24" fill="none" aria-hidden>
      <path
        d="M1 4h118M1 4l6-3M1 4l6 3M119 4l-6-3M119 4l-6 3"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
      />
    </svg>
  );
}

function DrawingCard({ item }: { item: ServiceOptionItem }) {
  const [w, h] = item.dimensions ?? [];
  return (
    <div className="grid-paper relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-line bg-white p-9 lg:aspect-auto lg:min-h-[280px]">
      {item.drawing && (
        <img
          key={item.id}
          src={img(item.drawing)}
          alt={`${item.label} plan drawing`}
          className="max-h-full w-full object-contain animate-in fade-in-0 zoom-in-95 duration-500"
        />
      )}
      {w && (
        <span className="absolute top-3 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 font-mono text-[11px] tracking-[0.08em] text-copper">
          {w}
          <DimensionLine />
        </span>
      )}
      {h && (
        <span className="absolute top-1/2 left-1 flex -translate-y-1/2 -rotate-90 flex-col items-center gap-1 font-mono text-[11px] tracking-[0.08em] text-copper">
          {h}
          <DimensionLine />
        </span>
      )}
    </div>
  );
}

function WaterMeter({ level }: { level: number }) {
  return (
    <div
      className="mt-3 flex items-center gap-2"
      role="img"
      aria-label={`Water resistance ${level} of 5`}
    >
      <Droplets className="size-3.5 text-teal" strokeWidth={1.5} aria-hidden />
      <span className="flex gap-1" aria-hidden>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={cn(
              "size-2 rounded-full",
              n <= level ? "bg-teal" : "border border-line-strong bg-white",
            )}
          />
        ))}
      </span>
      <span className="font-mono text-[10px] tracking-[0.14em] text-ink-soft uppercase">Water</span>
    </div>
  );
}

function CheckList({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="mt-5 first:mt-0">
      <h3 className="font-sans text-[17px] font-semibold tracking-normal text-teal">{title}</h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((b) => (
          <li key={b} className="flex gap-3 text-[14px] leading-snug text-ink">
            <Check className="mt-0.5 size-4 shrink-0 text-teal" strokeWidth={2} aria-hidden />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MoreButton({ label, galleryTo }: { label: string; galleryTo: string }) {
  const l = label.toLowerCase();
  if (l.includes("photo")) {
    return (
      <Button variant="secondary" href={WHATSAPP_PHOTO} arrow className="mt-6">
        {label}
      </Button>
    );
  }
  if (l.includes("plan my") || l.includes("estimat")) {
    return (
      <Button variant="secondary" to={ctaTarget(label)} arrow className="mt-6">
        {label}
      </Button>
    );
  }
  if (l.includes("compare")) {
    return (
      <Button variant="secondary" to="/services" arrow className="mt-6">
        {label}
      </Button>
    );
  }
  return (
    <Button variant="secondary" {...linkSpread(galleryTo)} arrow className="mt-6">
      {label}
    </Button>
  );
}

/** Tabbed options (layouts, door types, ceiling styles, packages, rooms). */
function OptionTabs({ options, galleryTo }: Props) {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const items = options.items;
  const item = items[active] ?? items[0];
  if (!item) return null;

  const focusTab = (i: number) => {
    const next = (i + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight") focusTab(i + 1);
    else if (e.key === "ArrowLeft") focusTab(i - 1);
    else if (e.key === "Home") focusTab(0);
    else if (e.key === "End") focusTab(items.length - 1);
    else return;
    e.preventDefault();
  };

  const threePart = Boolean(item.drawing);

  return (
    <>
      <div
        role="tablist"
        aria-label={options.label}
        className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-1 hide-scrollbar sm:mx-0 sm:px-0 lg:grid lg:overflow-visible lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
        style={{ "--cols": items.length } as CSSProperties}
      >
        {items.map((it, i) => {
          const Icon = iconFor(it.icon);
          const selected = i === active;
          return (
            <button
              key={it.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${it.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "flex min-w-[168px] shrink-0 snap-start items-center gap-3 rounded-xl border px-4 py-3 text-left text-[14px] font-semibold transition-[background-color,color,border-color,box-shadow] duration-300 ease-soft lg:min-w-0",
                selected
                  ? "border-teal bg-teal text-white shadow-[0_10px_24px_-14px_rgba(0,60,72,0.7)]"
                  : "border-line bg-white text-ink hover:border-line-strong hover:shadow-soft",
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg",
                  selected ? "bg-white/15 text-white" : "bg-mist text-teal",
                )}
              >
                <Icon className="size-[18px]" strokeWidth={1.5} aria-hidden />
              </span>
              {it.label}
            </button>
          );
        })}
      </div>

      <div
        key={item.id}
        role="tabpanel"
        id={`${base}-panel`}
        aria-labelledby={`${base}-tab-${item.id}`}
        className={cn(
          "mt-5 grid gap-5 animate-in fade-in-0 duration-500",
          threePart
            ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)_minmax(0,0.95fr)]"
            : "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]",
        )}
      >
        {threePart && <DrawingCard item={item} />}
        {item.image && (
          <div className="overflow-hidden rounded-2xl shadow-soft">
            <img
              src={img(item.image)}
              alt={`${item.label} example`}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
        )}
        <div className="rounded-2xl bg-mist p-6 lg:p-7">
          {item.note && <p className="mb-4 text-[14px] leading-snug text-ink-soft">{item.note}</p>}
          {item.bestFor && <CheckList items={item.bestFor} title="Best for" />}
          {item.checklist && <CheckList items={item.checklist} title="Included" />}
          {item.timeline && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 font-mono text-[11px] tracking-[0.16em] text-teal uppercase">
              <Clock className="size-3.5" strokeWidth={1.5} aria-hidden />
              {item.timeline}
            </p>
          )}
          {item.water !== undefined && <WaterMeter level={item.water} />}
          {options.moreLabel && <MoreButton label={options.moreLabel} galleryTo={galleryTo} />}
        </div>
      </div>
    </>
  );
}

/** Material rows (walls / floors) as white cards with a macro photo and a water meter. */
function MaterialRows({ options }: { options: ServiceOptionsData }) {
  const groups: string[] = [];
  for (const it of options.items) {
    const g = it.group ?? "";
    if (!groups.includes(g)) groups.push(g);
  }
  return (
    <div className="space-y-8">
      {groups.map((g) => (
        <div key={g || "all"}>
          {g && <p className="mono-meta mb-3">{g}</p>}
          <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-1 hide-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {options.items
              .filter((it) => (it.group ?? "") === g)
              .map((it) => (
                <Card
                  key={it.id}
                  flush
                  hover
                  className="w-[240px] shrink-0 snap-start overflow-hidden sm:w-auto"
                >
                  {it.image && (
                    <img
                      src={img(it.image)}
                      alt={`${it.label} close-up`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-sans text-[15px] font-semibold tracking-normal text-ink">
                      {it.label}
                    </h3>
                    {it.note && <p className="mt-0.5 text-[12px] text-ink-soft">{it.note}</p>}
                    {it.bestFor && (
                      <p className="mt-2 text-[13px] leading-snug text-ink">
                        <span className="font-semibold text-teal">Best for: </span>
                        {it.bestFor.join(", ")}
                      </p>
                    )}
                    {it.water !== undefined && <WaterMeter level={it.water} />}
                  </div>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ServiceOptions({ options, galleryTo }: Props) {
  return (
    <Section className="py-12 lg:py-16">
      <Container>
        <Reveal>
          <Eyebrow className="mb-5">{options.label}</Eyebrow>
          {options.kind === "materials" ? (
            <MaterialRows options={options} />
          ) : (
            <OptionTabs options={options} galleryTo={galleryTo} />
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
