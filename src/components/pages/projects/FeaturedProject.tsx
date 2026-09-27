import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { Button, PhotoPanel, Reveal } from "@/components/site";
import { img } from "@/content/images";
import { PROJECTS, PROJECTS_PAGE, type Project } from "@/content/projects";
import { SOFT_EASE, projectMeta } from "./filters";

/** The featured card cycles through the first six projects, featured one first. */
const SLIDES: Project[] = PROJECTS.slice(0, 6);

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function RoundButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="glass flex size-11 items-center justify-center rounded-full text-teal transition-[background-color,transform] duration-300 ease-soft hover:bg-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper [&_svg]:size-4"
    >
      {children}
    </button>
  );
}

/** 21:9 cinematic card with a glass caption panel and a prev / next counter. */
export function FeaturedProject() {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;
  const slide = SLIDES[index] ?? SLIDES[0];
  if (!slide) return null;

  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);
  const meta = slide.featuredMeta ?? `${slide.place} · ${projectMeta(slide)}`;

  return (
    <Reveal>
      <PhotoPanel
        src={img(slide.hero)}
        alt={slide.title}
        radius="xl"
        aspect="21/9"
        loading="eager"
        fetchPriority="high"
        className="[&>div]:max-lg:aspect-[16/10]!"
        aria-roledescription="carousel"
        aria-label="Featured projects"
      >
        {/* The outgoing slide fades out over the PhotoPanel image (already the new slide). */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.img
              key={slide.slug}
              src={img(slide.hero)}
              alt=""
              decoding="async"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: SOFT_EASE }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/25 to-transparent"
        />

        <div
          aria-live="polite"
          className="glass absolute bottom-4 left-4 flex max-w-[calc(100%-2rem)] flex-col gap-3 rounded-2xl px-5 py-4 sm:flex-row sm:items-center sm:gap-6 lg:bottom-6 lg:left-6 lg:px-6 lg:py-5"
        >
          <div className="min-w-0">
            <h2 className="font-display text-[20px] leading-tight font-medium text-teal lg:text-[24px]">
              {slide.title}
            </h2>
            <p className="mt-1.5 font-mono text-[10px] tracking-[0.2em] text-ink-soft uppercase lg:text-[11px]">
              {meta}
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            arrow
            to="/projects/$slug"
            params={{ slug: slide.slug }}
          >
            {PROJECTS_PAGE.featuredCta}
          </Button>
        </div>

        <div className="absolute right-4 bottom-4 hidden items-center gap-3 sm:flex lg:right-6 lg:bottom-6">
          <RoundButton label="Previous project" onClick={() => go(-1)}>
            <ArrowLeft strokeWidth={1.5} aria-hidden />
          </RoundButton>
          <span className="glass rounded-full px-3.5 py-2 font-mono text-[11px] leading-none tracking-[0.2em] text-teal tabular-nums">
            {pad(index + 1)} / {pad(total)}
          </span>
          <RoundButton label="Next project" onClick={() => go(1)}>
            <ArrowRight strokeWidth={1.5} aria-hidden />
          </RoundButton>
        </div>
      </PhotoPanel>
    </Reveal>
  );
}
