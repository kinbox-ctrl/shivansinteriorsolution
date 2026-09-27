import { getRouteApi } from "@tanstack/react-router";
import {
  Calculator,
  CookingPot,
  DoorClosed,
  Layers,
  Lightbulb,
  Palette,
  PanelsTopLeft,
  Search,
  Square,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useDeferredValue, useId, useMemo, useState } from "react";
import {
  Button,
  Container,
  CtaBand,
  Eyebrow,
  HandNote,
  Heading,
  Reveal,
  Section,
  Sketch,
  VerticalRuler,
} from "@/components/site";
import {
  CATALOGUE_CATEGORIES,
  CATALOGUE_PAGE,
  CATALOGUE_TAGS,
  PRODUCTS,
  getCategory,
  type CatalogueCategoryId,
  type CatalogueTag,
  type Product,
} from "@/content/catalogue";
import { img } from "@/content/images";
import { formatINR } from "@/content/pricing";
import { WHATSAPP_DEFAULT, waLink } from "@/content/site";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

const route = getRouteApi("/catalogue");

const ICONS: Record<string, LucideIcon> = {
  CookingPot,
  DoorClosed,
  Layers,
  Palette,
  Wrench,
  PanelsTopLeft,
  Lightbulb,
  Square,
};

const TAG_TONE: Record<CatalogueTag, string> = {
  Recommended: "border-copper/30 bg-copper-tint text-copper",
  Popular: "border-teal/20 bg-mist text-teal",
  Waterproof: "border-teal/20 bg-mist text-teal",
  Budget: "border-line bg-white text-ink-soft",
  Premium: "border-line bg-linen text-ink",
};

function matches(p: Product, q: string): boolean {
  if (!q) return true;
  const hay = [p.name, p.tagline, p.brands ?? "", ...p.specs, ...p.tags].join(" ").toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((w) => hay.includes(w));
}

/** /catalogue — searchable, filterable product catalogue with indicative prices. */
export function CataloguePage() {
  const search = route.useSearch();
  const navigate = route.useNavigate();
  const category = getCategory(search.c ?? "")?.id ?? null;
  const [query, setQuery] = useState(search.q ?? "");
  const [tag, setTag] = useState<CatalogueTag | null>(null);
  const deferredQuery = useDeferredValue(query);
  const searchId = useId();

  const setCategory = (c: CatalogueCategoryId | null) =>
    navigate({
      search: (prev) => {
        const next: { c?: string; q?: string } = {};
        if (c) next.c = c;
        if (prev.q) next.q = prev.q;
        return next;
      },
      resetScroll: false,
    });

  const visible = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (!category || p.category === category) &&
          (!tag || p.tags.includes(tag)) &&
          matches(p, deferredQuery),
      ),
    [category, tag, deferredQuery],
  );

  const groups = useMemo(
    () =>
      CATALOGUE_CATEGORIES.map((c) => ({
        category: c,
        products: visible.filter((p) => p.category === c.id),
      })).filter((g) => g.products.length > 0),
    [visible],
  );

  const copy = CATALOGUE_PAGE;

  return (
    <>
      {/* Hero ------------------------------------------------------------------------ */}
      <Section wash className="overflow-hidden pt-10 pb-8 lg:pt-14 lg:pb-10">
        <VerticalRuler />
        <Sketch
          kind="arch"
          opacity={0.3}
          className="absolute -top-6 right-[-40px] hidden w-[260px] xl:block"
        />
        <Sketch
          kind="plant"
          opacity={0.35}
          className="absolute bottom-2 left-[52%] hidden w-28 xl:block"
        />
        <Container className="relative">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow className="mb-4">{copy.eyebrow}</Eyebrow>
              <Heading as="h1" size="xl" className="max-w-[640px] lg:text-[60px]">
                {copy.headlineLead} <em>{copy.headlineEm}</em>
              </Heading>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-soft lg:text-[17px]">
                {copy.sub}
              </p>
            </div>
            <div className="relative lg:col-span-5">
              <HandNote
                arrow="down-left"
                rotate={-6}
                className="absolute -top-14 right-2 hidden xl:inline-flex"
              >
                {PRODUCTS.length} products, ex-GST rates
              </HandNote>
              <label htmlFor={searchId} className="sr-only">
                Search the catalogue
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-soft"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <input
                  id={searchId}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={copy.searchPlaceholder}
                  className="h-14 w-full rounded-full border border-line bg-white pr-5 pl-12 text-[15px] text-ink shadow-soft transition-colors duration-300 placeholder:text-ink-soft/70 focus:border-copper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {CATALOGUE_TAGS.map((t) => {
                  const on = tag === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setTag(on ? null : t)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors duration-300 ease-soft",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
                        on ? "border-teal bg-teal text-white" : TAG_TONE[t],
                      )}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Category tabs --------------------------------------------------------------- */}
      <div className="sticky top-[86px] z-30 border-y border-line bg-white/85 backdrop-blur-xl lg:top-[90px]">
        <Container>
          <nav
            aria-label="Catalogue categories"
            className="hide-scrollbar -mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
          >
            <ul className="m-0 flex w-max list-none items-center gap-1 p-0 py-2 lg:w-auto">
              <li>
                <TabButton active={category === null} onClick={() => setCategory(null)}>
                  {copy.allLabel}
                  <span className="ml-1.5 font-mono text-[11px] text-ink-soft">
                    {PRODUCTS.length}
                  </span>
                </TabButton>
              </li>
              {CATALOGUE_CATEGORIES.map((c) => {
                const Icon = ICONS[c.icon] ?? Square;
                const count = PRODUCTS.filter((p) => p.category === c.id).length;
                return (
                  <li key={c.id}>
                    <TabButton active={category === c.id} onClick={() => setCategory(c.id)}>
                      <Icon className="size-4" strokeWidth={1.5} aria-hidden />
                      {c.label}
                      <span className="ml-1 font-mono text-[11px] opacity-70">{count}</span>
                    </TabButton>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Container>
      </div>

      {/* Products -------------------------------------------------------------------- */}
      <Section tone="cloud" className="py-10 lg:py-14">
        <Container>
          {groups.length === 0 && (
            <Reveal className="rounded-2xl border border-dashed border-line-strong bg-white px-6 py-14 text-center">
              <Heading as="h2" size="md">
                {copy.emptyTitle}
              </Heading>
              <p className="mx-auto mt-2 max-w-md text-[15px] text-ink-soft">{copy.emptyText}</p>
              <Button
                variant="whatsapp"
                className="mt-6"
                href={waLink(`Hello Shivansh Interior Solutions, do you have "${query}"?`)}
              >
                {copy.askLabel}
              </Button>
            </Reveal>
          )}
          <div className="flex flex-col gap-14 lg:gap-16">
            {groups.map(({ category: c, products }) => {
              const Icon = ICONS[c.icon] ?? Square;
              return (
                <section
                  key={c.id}
                  id={c.id}
                  aria-labelledby={`cat-${c.id}`}
                  className="scroll-mt-40"
                >
                  <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
                    <div className="max-w-xl">
                      <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-copper uppercase">
                        <Icon className="size-4 text-teal" strokeWidth={1.5} aria-hidden />
                        {products.length} {products.length === 1 ? "item" : "items"}
                      </p>
                      <Heading as="h2" size="lg" id={`cat-${c.id}`} className="mt-2 lg:text-[40px]">
                        {c.label}
                      </Heading>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{c.blurb}</p>
                    </div>
                    {products[0]?.estimatorSpace && (
                      <Button
                        variant="secondary"
                        size="sm"
                        arrow
                        to="/estimator"
                        icon={<Calculator strokeWidth={1.5} aria-hidden />}
                      >
                        Estimate {c.label.toLowerCase()}
                      </Button>
                    )}
                  </Reveal>
                  <ul className="m-0 mt-6 grid list-none gap-5 p-0 sm:grid-cols-2 xl:grid-cols-3">
                    {products.map((p, i) => (
                      <Reveal as="li" key={p.id} delay={Math.min(i, 5) * 60} className="min-w-0">
                        <ProductCard product={p} image={img(p.image)} />
                      </Reveal>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* How to read prices ----------------------------------------------------------- */}
      <Section tone="linen" jali className="py-12 lg:py-16">
        <Container>
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <Eyebrow className="mb-4">Rates</Eyebrow>
              <Heading as="h2" size="md" className="lg:text-[34px] lg:leading-[1.08]">
                {copy.pricesTitle}
              </Heading>
              <p className="mt-3 text-[14px] text-ink-soft">
                Kitchen from {formatINR(1350)}/sq.ft · Wardrobes from {formatINR(1550)}/sq.ft ·
                Ceilings from {formatINR(85)}/sq.ft
              </p>
            </div>
            <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:col-span-8">
              {copy.prices.map((line, i) => (
                <li
                  key={line}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-copper-tint font-mono text-[12px] text-copper">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] leading-relaxed text-ink">{line}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </Section>

      <Section tone="cloud" flush className="pt-10 pb-10 lg:pt-14 lg:pb-14">
        <Reveal>
          <CtaBand
            eyebrow={copy.cta.eyebrow}
            title={
              <>
                {copy.cta.titleLead} <em>{copy.cta.titleEm}</em>
              </>
            }
            text={copy.cta.text}
            primary={{ label: copy.cta.primary, to: "/contact" }}
            secondary={{ label: copy.cta.secondary, href: WHATSAPP_DEFAULT, variant: "whatsapp" }}
          />
        </Reveal>
      </Section>
    </>
  );
}

type TabButtonProps = { active: boolean; onClick: () => void; children: React.ReactNode };

function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold whitespace-nowrap transition-colors duration-300 ease-soft",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
        active ? "bg-teal text-white" : "text-ink hover:bg-mist hover:text-teal",
      )}
    >
      {children}
    </button>
  );
}
