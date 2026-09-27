import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, Clock, Search } from "lucide-react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react";
import { useId, useMemo, useState } from "react";
import {
  Button,
  Chip,
  Container,
  Eyebrow,
  HandNote,
  Heading,
  Reveal,
  Section,
  Sketch,
} from "@/components/site";
import { img } from "@/content/images";
import {
  ARTICLE_CATEGORY_CHIPS,
  ARTICLES,
  FEATURED_ARTICLE,
  GRID_ARTICLES,
  JOURNAL_PAGE,
  type Article,
} from "@/content/journal";
import { cn } from "@/lib/utils";
import { JournalCard } from "./JournalCard";
import { SubscribeForm } from "./SubscribeForm";

type ChipId = (typeof ARTICLE_CATEGORY_CHIPS)[number]["id"];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Only offer category chips that have at least one article, so no chip leads to an empty state. */
const CHIPS = ARTICLE_CATEGORY_CHIPS.filter(
  (c) => c.category === null || ARTICLES.some((a) => a.category === c.category),
);

function matches(article: Article, chip: ChipId, query: string) {
  const def = ARTICLE_CATEGORY_CHIPS.find((c) => c.id === chip);
  const byCategory = !def?.category || article.category === def.category;
  const q = query.trim().toLowerCase();
  const byQuery =
    q.length === 0 ||
    article.title.toLowerCase().includes(q) ||
    article.dek.toLowerCase().includes(q) ||
    article.category.toLowerCase().includes(q);
  return byCategory && byQuery;
}

export function JournalPage() {
  const [chip, setChip] = useState<ChipId>("all");
  const [query, setQuery] = useState("");
  const searchId = useId();

  const showFeatured = matches(FEATURED_ARTICLE, chip, query);
  const gridArticles = useMemo(
    () => GRID_ARTICLES.filter((a) => matches(a, chip, query)),
    [chip, query],
  );
  const isEmpty = !showFeatured && gridArticles.length === 0;
  const noteLines = JOURNAL_PAGE.handNote.split(". ");

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.45, ease: EASE }}>
      {/* 1 · Masthead */}
      <Section
        as="header"
        tone="cloud"
        wash
        flush
        className="overflow-hidden border-b border-line/70 pt-8 pb-5 lg:pt-9 lg:pb-6"
      >
        <img
          src={img("sketch-plant-left")}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -top-2 -left-6 hidden w-[260px] lg:block"
        />
        <img
          src={img("sketch-arch-right")}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -top-4 right-[72px] hidden w-[340px] lg:block"
        />
        <Sketch
          kind="plant-large"
          className="pointer-events-none absolute right-0 -bottom-4 hidden w-[120px] lg:block"
          opacity={0.9}
        />
        <Container className="relative">
          <div className="flex items-start gap-8">
            <Reveal suppressHydrationWarning className="min-w-0 flex-1 lg:w-[760px] lg:flex-none">
              <Eyebrow className="mb-3">{JOURNAL_PAGE.eyebrow}</Eyebrow>
              <Heading as="h1" size="lg" tone="teal" className="lg:text-[56px]">
                {JOURNAL_PAGE.title}
              </Heading>
              <p className="mt-2 max-w-[48rem] text-[16px] leading-relaxed text-teal/85 lg:text-[18px]">
                {JOURNAL_PAGE.sub}
              </p>
            </Reveal>
            <Reveal
              suppressHydrationWarning
              delay={140}
              className="hidden shrink-0 pt-1 lg:block lg:pl-6"
            >
              <HandNote arrow="down-left" rotate={-8}>
                {noteLines.map((line, i) => (
                  <span key={line} className="block" style={{ paddingLeft: i * 12 }}>
                    {line}
                  </span>
                ))}
              </HandNote>
            </Reveal>
          </div>

          <Reveal
            suppressHydrationWarning
            delay={120}
            className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <LayoutGroup id="journal-chips">
              {/* Right-edge fade below lg signals that the chip row scrolls. */}
              <div className="relative -mx-5 min-w-0 after:pointer-events-none after:absolute after:top-0 after:right-0 after:h-full after:w-12 after:bg-gradient-to-l after:from-cloud after:to-transparent sm:-mx-8 lg:mx-0 lg:flex-1 lg:after:hidden">
                <div
                  role="group"
                  aria-label="Filter articles by category"
                  className="hide-scrollbar flex snap-x gap-2.5 overflow-x-auto px-5 pb-1 sm:px-8 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0"
                >
                  {CHIPS.map((c) => {
                    const active = c.id === chip;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setChip(c.id)}
                        className={cn(
                          "relative inline-flex h-10 shrink-0 snap-start items-center rounded-full border px-5 text-[13.5px] font-semibold whitespace-nowrap transition-[color,border-color,background-color] duration-300 ease-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
                          active
                            ? "border-teal text-white"
                            : "border-line bg-white text-ink hover:border-teal/40 hover:text-teal",
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="journal-chip-fill"
                            aria-hidden
                            className="absolute inset-0 rounded-full bg-teal"
                            transition={{ type: "spring", stiffness: 420, damping: 38 }}
                          />
                        )}
                        <span className="relative">{c.label}</span>
                      </button>
                    );
                  })}
                  {/* Trailing spacer so the last chip clears the fade when scrolled to the end. */}
                  <span aria-hidden className="w-6 shrink-0 lg:hidden" />
                </div>
              </div>
            </LayoutGroup>

            <div className="relative lg:w-[300px] lg:shrink-0 xl:w-[320px]">
              <label htmlFor={searchId} className="sr-only">
                Search articles
              </label>
              <Search
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-teal"
                strokeWidth={1.5}
                aria-hidden
              />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={JOURNAL_PAGE.searchPlaceholder}
                className="h-11 w-full rounded-full border border-line bg-white pr-4 pl-11 text-[14px] text-ink shadow-soft transition-[border-color,box-shadow] duration-300 ease-soft outline-none placeholder:text-ink-soft/70 focus:border-copper focus:ring-2 focus:ring-copper/30"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 2 + 3 · Featured card and article grid */}
      <Section tone="cloud" flush className="pt-8 pb-14 lg:pt-10 lg:pb-16">
        <Container>
          <p className="sr-only" aria-live="polite">
            {isEmpty
              ? "No articles match."
              : `${gridArticles.length + (showFeatured ? 1 : 0)} articles shown.`}
          </p>

          <AnimatePresence initial={false} mode="popLayout">
            {showFeatured && (
              <motion.div
                key="featured"
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-5"
              >
                <Reveal suppressHydrationWarning>
                  <FeaturedCard article={FEATURED_ARTICLE} />
                </Reveal>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {gridArticles.map((a, i) => (
                <motion.div
                  key={a.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                >
                  <Reveal suppressHydrationWarning delay={Math.min(i, 5) * 70} className="h-full">
                    <JournalCard article={a} loading={i < 3 ? "eager" : "lazy"} />
                  </Reveal>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {isEmpty && (
            <div className="rounded-2xl border border-dashed border-line-strong bg-white/60 px-6 py-14 text-center">
              <p className="font-display text-[24px] text-teal">No articles match that yet.</p>
              <p className="mt-2 text-[15px] text-ink-soft">
                Try another category or a shorter search term.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-6"
                onClick={() => {
                  setChip("all");
                  setQuery("");
                }}
              >
                Show all articles
              </Button>
            </div>
          )}
        </Container>
      </Section>

      {/* 4 · Subscribe */}
      <Section tone="linen" jali flush className="overflow-hidden py-7 lg:py-8">
        <Sketch
          kind="arch"
          className="pointer-events-none absolute top-1/2 left-2 hidden w-[150px] -translate-y-1/2 text-teal lg:block xl:left-8"
          opacity={0.4}
        />
        <Sketch
          kind="plant"
          className="pointer-events-none absolute -bottom-6 left-36 hidden w-[110px] text-teal lg:block xl:left-44"
          opacity={0.45}
        />
        <Sketch
          kind="plant-large"
          className="pointer-events-none absolute top-1/2 right-4 hidden w-[150px] -translate-y-1/2 text-teal lg:block xl:right-12"
          opacity={0.4}
        />
        <Container className="relative">
          <Reveal
            suppressHydrationWarning
            className="mx-auto grid max-w-[1120px] gap-6 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-8"
          >
            <div>
              <Eyebrow className="mb-3">{JOURNAL_PAGE.subscribe.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                tone="teal"
                className="max-w-[360px] text-[28px] leading-[1.1] text-wrap sm:text-[30px] lg:text-[30px]"
              >
                {JOURNAL_PAGE.subscribe.titleLead} <em>{JOURNAL_PAGE.subscribe.titleEm}</em>
              </Heading>
              <p className="mt-3 max-w-[40rem] text-[14px] leading-relaxed text-ink-soft">
                {JOURNAL_PAGE.subscribe.text}
              </p>
            </div>
            <SubscribeForm />
          </Reveal>
        </Container>
      </Section>

      {/* 5 · Pagination — only page 1 exists today; the other controls are visibly inert. */}
      <Section tone="white" flush className="border-t border-line py-6">
        <Container>
          <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
            {Array.from({ length: JOURNAL_PAGE.pagination.pages }, (_, i) => i + 1).map((n) => {
              const current = n === 1;
              return (
                <button
                  key={n}
                  type="button"
                  disabled={!current}
                  aria-current={current ? "page" : undefined}
                  aria-disabled={!current || undefined}
                  aria-label={`Page ${n}`}
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-full border text-[14px] font-semibold transition-[background-color,color,border-color] duration-300 ease-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
                    current
                      ? "border-teal bg-teal text-white"
                      : "cursor-not-allowed border-line bg-white text-ink/60",
                  )}
                >
                  {n}
                </button>
              );
            })}
            <button
              type="button"
              disabled
              aria-disabled
              className="inline-flex h-10 cursor-not-allowed items-center gap-2 rounded-full border border-line bg-white px-5 text-[14px] font-semibold text-ink/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
            >
              {JOURNAL_PAGE.pagination.next}
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
            </button>
          </nav>
        </Container>
      </Section>
    </MotionConfig>
  );
}

/** Wide white card: rounded photo left, tag / title / dek / author row right. */
function FeaturedCard({ article }: { article: Article }) {
  const linkProps = {
    to: "/journal/$slug",
    params: { slug: article.slug },
  } as unknown as LinkProps;
  return (
    <Link
      {...linkProps}
      className="group/card grid gap-6 rounded-2xl border border-line bg-white p-3 shadow-soft transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper lg:grid-cols-[1.4fr_1fr] lg:gap-7 lg:p-3.5"
    >
      <div className="aspect-[16/9] overflow-hidden rounded-xl lg:aspect-auto lg:min-h-[200px]">
        {/* Decorative: the title text in this link already names the article. */}
        <img
          src={img(article.image)}
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover/card:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col justify-center px-3 pb-3 lg:py-2 lg:pr-5 lg:pl-0">
        <Chip tone="copper" size="sm" mono className="self-start">
          {article.category}
        </Chip>
        <h2 className="mt-2.5 font-display text-[26px] leading-[1.08] font-medium tracking-[-0.02em] text-teal lg:text-[30px]">
          {article.title}
        </h2>
        <p className="mt-2 text-[14px] leading-[1.5] text-ink-soft">{article.dek}</p>
        <div className="mt-3 flex items-center gap-3 border-t border-line pt-3">
          <img
            src={img(article.author.avatar)}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-11 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-[14px] font-semibold text-teal">{article.author.name}</p>
            <p className="mt-0.5 text-[12px] text-ink-soft">{article.author.role}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[12px] whitespace-nowrap text-ink-soft sm:text-[13px]">
            <Clock className="size-3.5" strokeWidth={1.5} aria-hidden />
            {article.readTime}
          </span>
          <span
            aria-hidden
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-copper text-copper transition-[background-color,color] duration-300 ease-soft group-hover/card:bg-copper group-hover/card:text-white"
          >
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-soft group-hover/card:translate-x-0.5"
              strokeWidth={1.5}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
