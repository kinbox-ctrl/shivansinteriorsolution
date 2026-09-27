import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container, Reveal, Section } from "@/components/site";
import type { Project } from "@/content/projects";
import { CASE_STUDY_COPY } from "./copy";
import { nextBannerSrc } from "./images";

/**
 * Slim rounded strip for the next project: glass label top-left, the "Next: …" pill and round
 * arrow vertically centred on the right; the image zooms on hover.
 */
export function ProjectNext({ next }: { next: Project }) {
  const copy = CASE_STUDY_COPY.next;
  return (
    <Section id="next-project" flush className="pt-4 pb-16 lg:pt-6 lg:pb-24">
      <Container>
        <Reveal>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group/next relative block overflow-hidden rounded-3xl bg-linen shadow-lift focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
          >
            <img
              src={nextBannerSrc(next)}
              alt={`${next.title}, ${next.place}`}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover object-[50%_40%] transition-transform duration-700 ease-soft group-hover/next:scale-[1.03] sm:aspect-[16/7] lg:aspect-[12/1]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent"
            />
            <span className="glass absolute top-5 left-5 rounded-full px-3.5 py-1.5 font-mono text-[10px] tracking-[0.22em] text-teal uppercase lg:top-4 lg:left-7">
              {copy.eyebrow}
            </span>
            <span className="absolute right-4 bottom-4 left-4 flex items-center gap-3 sm:left-auto lg:top-1/2 lg:right-7 lg:bottom-auto lg:-translate-y-1/2">
              <span className="glass flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-5 py-3.5 font-display text-[17px] text-teal sm:flex-none lg:px-6 lg:py-3.5 lg:text-[21px]">
                <span className="sm:truncate">
                  {copy.prefix} {next.title}, {next.place}
                </span>
                <ArrowRight
                  aria-hidden
                  className="size-4 shrink-0 transition-transform duration-300 ease-soft group-hover/next:translate-x-1"
                  strokeWidth={1.5}
                />
              </span>
              <span className="glass hidden size-12 shrink-0 items-center justify-center rounded-full text-teal sm:flex">
                <ArrowRight aria-hidden className="size-5" strokeWidth={1.5} />
              </span>
            </span>
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
