import { ChevronRight, MapPin, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useMemo, useState } from "react";
import { Button, Reveal } from "@/components/site";
import { img } from "@/content/images";
import { PROJECTS_PAGE, PROJECT_COUNT_LABEL, type Project } from "@/content/projects";
import { mapEmbedFor } from "@/content/site";
import { cn } from "@/lib/utils";
import { SOFT_EASE, projectMeta } from "./filters";

export type ProjectMapProps = {
  projects: Project[];
};

/** Six rows in the list panel, as in the reference. */
const LIST_SIZE = 6;

/** Left list panel synced with a Google map that pans to the selected project's town. */
export function ProjectMap({ projects }: ProjectMapProps) {
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState<string | null>(projects[0]?.slug ?? null);
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

  const select = (slug: string) => setActiveSlug(slug);

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
      <div className="relative aspect-[10/7] overflow-hidden rounded-3xl border border-line bg-linen shadow-soft lg:aspect-auto lg:h-[620px]">
        <iframe
          key={active?.place ?? "region"}
          src={mapEmbedFor(active?.place ?? PROJECTS_PAGE.mapRegion)}
          title={
            active
              ? `Google map of ${active.place}, where ${active.title} was built`
              : "Google map of the Sambhar, Nawa and Jaipur region"
          }
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen={false}
          className="absolute inset-0 h-full w-full border-0"
        />

        <AnimatePresence initial={false}>
          {active && (
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: SOFT_EASE }}
              className="absolute bottom-3 left-3 z-10 w-[calc(100%-1.5rem)] rounded-2xl border border-line bg-white p-3 shadow-lift sm:w-[280px] lg:bottom-5 lg:left-5"
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
              <p className="mt-1 flex items-center gap-1 text-[12px] text-ink-soft">
                <MapPin className="size-3.5 text-copper" strokeWidth={1.5} aria-hidden />
                {active.place}
              </p>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
