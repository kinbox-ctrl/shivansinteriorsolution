import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Eyebrow,
  Heading,
  ProjectCard,
  Reveal,
  Section,
} from "@/components/site";
import { FEATURED_SECTION } from "@/content/home";
import { img } from "@/content/images";
import { HOME_PROJECT_SLUGS, PROJECTS, getProject, type Project } from "@/content/projects";
import { prefersReducedMotion } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const TOTAL = Number(FEATURED_SECTION.counterTotal) || 6;
const GAP = 24;

/** The three home projects first, then the next newest projects up to the "/ 06" counter. */
const RAIL: Project[] = (() => {
  const home = HOME_PROJECT_SLUGS.map((slug) => getProject(slug)).filter(
    (p): p is Project => p !== undefined,
  );
  const rest = PROJECTS.filter((p) => !home.includes(p)).slice(0, Math.max(0, TOTAL - home.length));
  return [...home, ...rest];
})();

type RailState = { index: number; atStart: boolean; atEnd: boolean };

function RailButton({
  dir,
  disabled,
  onClick,
}: {
  dir: -1 | 1;
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = dir === -1 ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === -1 ? "Previous projects" : "Next projects"}
      className={cn(
        "flex size-11 items-center justify-center rounded-full transition-[background-color,color,opacity,transform] duration-300 ease-soft",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper disabled:opacity-35",
        dir === -1
          ? "border border-line-strong bg-white text-teal hover:bg-teal-soft/60"
          : "bg-teal text-white hover:bg-teal-hover",
      )}
    >
      <Icon className="size-[18px]" strokeWidth={1.5} aria-hidden />
    </button>
  );
}

/** "Recent homes": horizontal scroll-snap rail of project cards that bleeds off the right edge. */
export function HomeProjects() {
  const railRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RailState>({ index: 0, atStart: true, atEnd: false });

  const stepSize = () => {
    const el = railRef.current;
    const first = el?.firstElementChild;
    return first instanceof HTMLElement ? first.offsetWidth + GAP : (el?.clientWidth ?? 0);
  };

  const update = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const step = stepSize() || 1;
    setState({
      index: Math.min(RAIL.length - 1, Math.round(el.scrollLeft / step)),
      atStart: el.scrollLeft <= 2,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollTo = (left: number) => {
    railRef.current?.scrollTo({ left, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };
  const go = (dir: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;
    scrollTo(el.scrollLeft + dir * stepSize());
  };

  return (
    <Section tone="cloud" className="overflow-x-clip">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="mb-4">{FEATURED_SECTION.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg">
              {FEATURED_SECTION.title}
            </Heading>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" arrow to="/projects" className="px-3">
              {FEATURED_SECTION.link}
            </Button>
            <RailButton dir={-1} disabled={state.atStart} onClick={() => go(-1)} />
            <RailButton dir={1} disabled={state.atEnd} onClick={() => go(1)} />
          </div>
        </Reveal>

        <div
          ref={railRef}
          onScroll={update}
          role="region"
          aria-roledescription="carousel"
          aria-label={FEATURED_SECTION.title}
          className={cn(
            "hide-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pt-2 pb-4 sm:-mx-8 sm:px-8",
            "lg:mx-0 lg:mr-[calc(50%-50vw)] lg:px-0 lg:pr-[calc(50vw-50%)]",
          )}
        >
          {RAIL.map((project, i) => (
            <ProjectCard
              key={project.slug}
              index={i + 1}
              total={RAIL.length}
              project={{
                slug: project.slug,
                title: project.title,
                place: project.place,
                category: project.kind,
                area: project.area,
                image: img(project.image),
                imageAlt: `${project.title}, ${project.place}`,
              }}
              className="w-[min(84vw,400px)] shrink-0 snap-start lg:w-[416px]"
            />
          ))}
        </div>

        {/* Dots for the mobile snap carousel. */}
        <div className="mt-2 flex justify-center gap-2 lg:hidden" aria-hidden>
          {RAIL.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              tabIndex={-1}
              onClick={() => scrollTo(i * stepSize())}
              className={cn(
                "h-1.5 rounded-full transition-[width,background-color] duration-300 ease-soft",
                i === state.index ? "w-6 bg-copper" : "w-1.5 bg-line-strong",
              )}
            />
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Project {state.index + 1} of {RAIL.length}
        </p>
      </Container>
    </Section>
  );
}
