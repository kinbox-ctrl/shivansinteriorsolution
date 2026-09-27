import { ArrowRight } from "lucide-react";
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Card, Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import { img } from "@/content/images";
import { MATERIAL_TABS, type MaterialItem } from "@/content/materials";
import { HOW_WE_BUILD_PAGE } from "@/content/process";
import { cn } from "@/lib/utils";

function WaterMeter({ value, label }: { value: number; label: string }) {
  return (
    <div className="mt-3">
      <p className="text-[12px] text-ink-soft">{label}</p>
      <div
        role="img"
        aria-label={`${label}: ${value} out of 5`}
        className="mt-1.5 flex items-center gap-1.5"
      >
        {Array.from({ length: 5 }, (_, i) => {
          const on = i < value;
          return (
            <span
              key={i}
              className={cn(
                "hwb-dot size-2.5 rounded-full border border-teal",
                on ? "is-on bg-teal" : "bg-transparent opacity-50",
              )}
              style={{ "--d": `${200 + i * 80}ms` } as CSSProperties}
            />
          );
        })}
      </div>
    </div>
  );
}

function MaterialCard({ item, label }: { item: MaterialItem; label: string }) {
  return (
    <Card
      hover
      flush
      as="li"
      className={cn(
        "w-[248px] shrink-0 snap-start p-3 sm:w-auto",
        item.recommended && "border-copper ring-1 ring-copper/70",
      )}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-xl">
        <img
          src={img(item.image)}
          alt={`${item.name} close-up`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="px-1.5 pt-4 pb-2">
        <h3 className="font-sans text-[17px] leading-tight font-semibold text-teal">{item.name}</h3>
        <p className="mt-1.5 text-[14px] leading-snug text-ink-soft">{item.bestFor}</p>
        <WaterMeter value={item.water} label={label} />
      </div>
    </Card>
  );
}

export function MaterialLibrary() {
  const copy = HOW_WE_BUILD_PAGE.materials;
  const [activeId, setActiveId] = useState(MATERIAL_TABS[0]?.id ?? "boards");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const active = MATERIAL_TABS.find((t) => t.id === activeId) ?? MATERIAL_TABS[0];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const n = MATERIAL_TABS.length;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (index + 1) % n;
    else if (e.key === "ArrowLeft") next = (index - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    const tab = MATERIAL_TABS[next];
    if (tab) setActiveId(tab.id);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section tone="white" id="materials">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <Eyebrow className="mb-4">{copy.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg">
              {copy.title}
            </Heading>
            <p className="mt-4 max-w-[300px] text-[16px] leading-relaxed text-ink-soft">
              {copy.text}
            </p>
          </Reveal>

          <div className="min-w-0">
            <Reveal className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <div
                role="tablist"
                aria-label="Material categories"
                className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0"
              >
                {MATERIAL_TABS.map((tab, i) => {
                  const selected = tab.id === activeId;
                  return (
                    <button
                      key={tab.id}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`${baseId}-tab-${tab.id}`}
                      aria-selected={selected}
                      aria-controls={`${baseId}-panel-${tab.id}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveId(tab.id)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      className={cn(
                        "h-10 shrink-0 rounded-full border px-5 text-[14px] font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow] duration-300 ease-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
                        selected
                          ? "border-teal bg-teal text-white shadow-[0_10px_24px_-14px_rgba(0,60,72,0.7)]"
                          : "border-line bg-white text-teal hover:border-teal/40 hover:bg-mist/60",
                      )}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <a
                href="#grade-comparison"
                className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-teal transition-colors duration-300 hover:text-copper"
              >
                {copy.compareLink}
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-4 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                />
              </a>
            </Reveal>

            {active && (
              <Reveal
                key={active.id}
                as="ul"
                y={20}
                role="tabpanel"
                id={`${baseId}-panel-${active.id}`}
                aria-labelledby={`${baseId}-tab-${active.id}`}
                className="hide-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-5"
              >
                {active.items.map((item) => (
                  <MaterialCard key={item.id} item={item} label={copy.waterLabel} />
                ))}
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
