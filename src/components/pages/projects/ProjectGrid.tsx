import { ArrowDown, Heart } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { Button, ProjectCard, Reveal } from "@/components/site";
import { img } from "@/content/images";
import { PROJECT_COUNT, PROJECTS_PAGE, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { SOFT_EASE } from "./filters";

export type ProjectGridProps = {
  projects: Project[];
};

/** Everything except the featured project fits on one page of nine cards. */
const PAGE_SIZE = 9;

function toCardData(p: Project) {
  return {
    slug: p.slug,
    title: p.title,
    place: p.place,
    // The shared card joins category and area with "  ·  "; we want "BEDROOM · PREMIUM · 2024".
    category: `${p.kind}  ·  ${p.grade}`,
    year: p.year,
    image: img(p.image),
    imageAlt: `${p.title}, ${p.place}`,
  };
}

/** Filterable three-column grid with FLIP re-flow, favourites and the load-more footer. */
export function ProjectGrid({ projects }: ProjectGridProps) {
  const [saved, setSaved] = useState<ReadonlySet<string>>(() => new Set());
  const visible = projects.slice(0, PAGE_SIZE);
  const canLoadMore = projects.length > visible.length;

  const toggleSaved = (slug: string) =>
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  return (
    <div>
      <LayoutGroup id="projects-grid">
        <motion.ul
          layout
          transition={{ duration: 0.6, ease: SOFT_EASE }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          aria-live="polite"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((p, i) => {
              const isSaved = saved.has(p.slug);
              return (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: SOFT_EASE, delay: i * 0.04 }}
                  className="group relative"
                >
                  <ProjectCard project={toCardData(p)} loading={i < 3 ? "eager" : "lazy"} />
                  {/* Copper "View" badge over the photo on hover (pure CSS, pointer-events none). */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 flex aspect-[4/3] items-center justify-center"
                  >
                    <span className="flex size-14 scale-75 items-center justify-center rounded-full bg-copper font-mono text-[10px] tracking-[0.2em] text-white uppercase opacity-0 shadow-lift transition-[opacity,transform] duration-500 ease-soft group-hover:scale-100 group-hover:opacity-100">
                      View
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSaved(p.slug)}
                    aria-pressed={isSaved}
                    aria-label={isSaved ? `Remove ${p.title} from saved` : `Save ${p.title}`}
                    className={cn(
                      "glass absolute top-3 right-3 flex size-9 items-center justify-center rounded-full transition-[background-color,color,transform] duration-300 ease-soft hover:bg-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
                      isSaved ? "text-copper" : "text-teal",
                    )}
                  >
                    <Heart
                      strokeWidth={1.5}
                      className="size-4"
                      fill={isSaved ? "currentColor" : "none"}
                      aria-hidden
                    />
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      {visible.length === 0 && (
        <Reveal className="rounded-2xl border border-dashed border-line-strong bg-white/60 px-6 py-14 text-center">
          <p className="font-display text-[24px] text-teal">No projects match those filters yet.</p>
          <p className="mt-2 text-[15px] text-ink-soft">
            Try another category, or clear the location and grade to see everything.
          </p>
        </Reveal>
      )}

      <div className="mt-8 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr] lg:mt-10">
        <p className="text-center font-mono text-[11px] tracking-[0.18em] text-ink-soft uppercase sm:text-left">
          Showing {visible.length} of {PROJECT_COUNT} projects
        </p>
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="secondary"
            size="md"
            disabled={!canLoadMore}
            aria-describedby={canLoadMore ? undefined : "projects-load-more-note"}
          >
            {PROJECTS_PAGE.loadMore}
            <ArrowDown strokeWidth={1.5} aria-hidden />
          </Button>
          {!canLoadMore && (
            <p id="projects-load-more-note" className="text-center text-[12px] text-ink-soft">
              That is every project we have published online so far. New ones are added each month.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
