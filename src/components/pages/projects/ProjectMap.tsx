import { ChevronRight, LocateFixed, Minus, Plus, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Button, Reveal } from "@/components/site";
import { img } from "@/content/images";
import { PROJECTS_PAGE, PROJECT_COUNT_LABEL, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { SOFT_EASE, projectMeta } from "./filters";

export type ProjectMapProps = {
  projects: Project[];
};

/** Six rows in the list panel, as in the reference. */
const LIST_SIZE = 6;

function Pin({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 32"
      aria-hidden
      className={cn(
        "drop-shadow-[0_6px_10px_rgba(169,83,31,0.35)] transition-transform duration-300 ease-soft",
        active ? "h-11 w-8" : "h-8 w-6",
      )}
    >
      <path
        d="M12 1C6 1 1.5 5.6 1.5 11.4 1.5 19.5 12 31 12 31s10.5-11.5 10.5-19.6C22.5 5.6 18 1 12 1z"
        fill="var(--copper)"
      />
      <circle cx="12" cy="11.5" r="3.6" fill="#fff" />
    </svg>
  );
}

/** Left list panel synced with copper pins over the pale region map. */
export function ProjectMap({ projects }: ProjectMapProps) {
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState<string | null>(projects[0]?.slug ?? null);
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const searchId = useId();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const hits = q
      ? projects.filter((p) =>
          `${p.title} ${p.place} ${p.kind} ${p.grade} ${p.year}`.toLowerCase().includes(q),
        )
      : projects;
    return hits.slice(0, LIST_SIZE);
  }, [projects, query]);

  // Keep the active pin inside the visible list when filters or the search change.
  useEffect(() => {
    if (!visible.some((p) => p.slug === activeSlug)) {
      setActiveSlug(visible[0]?.slug ?? null);
    }
  }, [visible, activeSlug]);

  const active = visible.find((p) => p.slug === activeSlug) ?? null;
  /** Pins in the upper half open their card below the pin so it never clips. */
  const popupBelow = (active?.mapPin.y ?? 100) < 52;

  const select = (slug: string, fromPin = false) => {
    setActiveSlug(slug);
    if (fromPin) {
      rowRefs.current[slug]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  };

  return (
    <Reveal className="grid gap-5 lg:grid-cols-[340px_1fr] lg:gap-6">
      {/* List panel */}
      <div className="flex flex-col rounded-3xl border border-line bg-white p-4 shadow-soft lg:max-h-[640px] lg:p-5">
        <h2 className="font-display text-[24px] leading-tight font-medium text-teal">
          {PROJECT_COUNT_LABEL}
        </h2>
        <label htmlFor={searchId} className="relative mt-4 block">
          <span className="sr-only">Search projects</span>
          <Search
            aria-hidden
            strokeWidth={1.5}
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-soft"
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={PROJECTS_PAGE.mapSearch}
            autoComplete="off"
            className="h-10 w-full rounded-lg border border-line bg-linen pr-3 pl-10 text-[14px] text-ink placeholder:text-ink-soft/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
          />
        </label>

        <ul
          aria-label="Projects on the map"
          className="hide-scrollbar mt-4 -mr-1 flex flex-col gap-2 overflow-y-auto pr-1"
        >
          {visible.map((p) => {
            const isActive = p.slug === activeSlug;
            return (
              <li key={p.slug}>
                <button
                  type="button"
                  ref={(el) => {
                    rowRefs.current[p.slug] = el;
                  }}
                  onClick={() => select(p.slug)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl border p-2 text-left transition-[background-color,border-color,box-shadow] duration-300 ease-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
                    isActive
                      ? "border-line bg-cloud shadow-soft"
                      : "border-transparent hover:border-line hover:bg-cloud",
                  )}
                >
                  <img
                    src={img(p.image)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-12 shrink-0 rounded-xl object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[15px] leading-tight font-medium text-teal">
                      {p.title}
                    </span>
                    <span className="mt-0.5 block text-[12px] text-ink-soft">{p.place}</span>
                    <span className="mt-0.5 block truncate font-mono text-[10px] tracking-[0.14em] text-ink-soft uppercase">
                      {projectMeta(p)}
                    </span>
                  </span>
                  <ChevronRight
                    aria-hidden
                    strokeWidth={1.5}
                    className={cn(
                      "size-4 shrink-0 transition-transform duration-300 ease-soft",
                      isActive ? "translate-x-0.5 text-copper" : "text-ink-soft",
                    )}
                  />
                </button>
              </li>
            );
          })}
          {visible.length === 0 && (
            <li className="rounded-2xl border border-dashed border-line-strong px-4 py-8 text-center text-[14px] text-ink-soft">
              No projects match that search.
            </li>
          )}
        </ul>
      </div>

      {/* Map panel */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-linen shadow-soft sm:aspect-[16/10] lg:aspect-auto lg:h-[620px]">
        <img
          src={img("map-region")}
          alt="Map of the Sambhar, Nawa and Jaipur region with project locations"
          loading="lazy"
          decoding="async"
          className="absolute bottom-0 left-1/2 h-auto w-[180%] max-w-none -translate-x-1/2 sm:w-full"
        />

        {visible.map((p) => {
          const isActive = p.slug === activeSlug;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => select(p.slug, true)}
              aria-pressed={isActive}
              aria-label={`${p.title}, ${p.place}`}
              style={{ left: `${p.mapPin.x}%`, top: `${p.mapPin.y}%` }}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-full rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper",
                isActive ? "z-20" : "z-10 hover:z-20",
              )}
            >
              {isActive && (
                <span
                  aria-hidden
                  className="absolute bottom-0 left-1/2 size-4 -translate-x-1/2 translate-y-1/2 animate-ping rounded-full bg-copper/40"
                />
              )}
              <Pin active={isActive} />
            </button>
          );
        })}

        <AnimatePresence initial={false}>
          {active && (
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 6 }}
              transition={{ duration: 0.4, ease: SOFT_EASE }}
              style={{
                // Keep the card (240 / 260px wide) inside the panel on every viewport.
                left: `clamp(136px, ${active.mapPin.x}%, calc(100% - 136px))`,
                top: `${active.mapPin.y}%`,
              }}
              className={cn(
                "absolute z-30 w-[240px] -translate-x-1/2 rounded-2xl border border-line bg-white p-3 shadow-lift sm:w-[260px]",
                // Small panels: dock the card inside the map instead of pinning it above the marker.
                "max-lg:!top-auto max-lg:!right-3 max-lg:!bottom-3 max-lg:!left-3 max-lg:!w-auto max-lg:!translate-0",
                popupBelow ? "translate-y-4" : "translate-y-[calc(-100%-3.25rem)]",
              )}
            >
              <img
                src={img(active.image)}
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full rounded-xl object-cover"
              />
              <p className="mt-3 font-display text-[18px] leading-tight font-medium text-teal">
                {active.title}
              </p>
              <p className="mt-1 text-[12px] text-ink-soft">{active.place}</p>
              <p className="mt-0.5 font-mono text-[10px] tracking-[0.14em] text-ink-soft uppercase">
                {projectMeta(active)}
              </p>
              <Button
                variant="primary"
                size="sm"
                arrow
                to="/projects/$slug"
                params={{ slug: active.slug }}
                className="mt-3"
              >
                {PROJECTS_PAGE.mapCta}
              </Button>
              <span
                aria-hidden
                className={cn(
                  "absolute left-1/2 size-3 -translate-x-1/2 rotate-45 border-line bg-white",
                  popupBelow
                    ? "top-0 -translate-y-1/2 border-t border-l"
                    : "bottom-0 translate-y-1/2 border-r border-b",
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative zoom / locate controls */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-4 bottom-4 flex flex-col gap-2 [&>span]:flex [&>span]:size-9 [&>span]:items-center [&>span]:justify-center [&>span]:rounded-lg [&>span]:border [&>span]:border-line [&>span]:bg-white [&>span]:text-teal [&>span]:shadow-soft [&_svg]:size-4"
        >
          <span>
            <LocateFixed strokeWidth={1.5} />
          </span>
          <span>
            <Plus strokeWidth={1.5} />
          </span>
          <span>
            <Minus strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </Reveal>
  );
}
