import { Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import { img } from "@/content/images";
import { JOURNEY_SECTION, MILESTONES } from "@/content/team";
import { cn } from "@/lib/utils";
import { SPLIT_GRID, SPLIT_HEADING } from "./layout";

/** Horizontal milestone timeline: photos above a copper line with dots, years and captions. */
export function Journey() {
  return (
    <Section className="py-14 lg:py-20">
      <Container>
        <div className={SPLIT_GRID}>
          <Reveal>
            <Eyebrow className="mb-5">{JOURNEY_SECTION.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg" className={SPLIT_HEADING}>
              {JOURNEY_SECTION.title}
            </Heading>
          </Reveal>

          <ol
            aria-label="Milestones"
            className="hide-scrollbar -mx-5 flex snap-x snap-mandatory overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0"
          >
            {MILESTONES.map((m, i) => {
              const last = i === MILESTONES.length - 1;
              return (
                <Reveal
                  as="li"
                  key={m.year}
                  delay={i * 70}
                  className="w-[200px] shrink-0 snap-start lg:w-auto"
                >
                  <div className="px-2 lg:px-3">
                    <div className="overflow-hidden rounded-xl border border-line shadow-soft">
                      <div className="aspect-[16/10]">
                        <img
                          src={img(m.image)}
                          alt={m.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* line segment + dot */}
                  <div aria-hidden className="relative mt-5 h-4">
                    <span
                      className={cn(
                        "absolute top-1/2 left-0 h-px bg-copper",
                        last ? "w-[calc(100%-8px)]" : "w-full",
                      )}
                    />
                    <span className="absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper ring-4 ring-cloud" />
                    {last && (
                      <svg
                        viewBox="0 0 12 12"
                        className="absolute top-1/2 right-0 size-3 -translate-y-1/2 text-copper"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 1l5 5-5 5" />
                      </svg>
                    )}
                  </div>

                  <div className="mt-3 px-2 text-center lg:px-3">
                    <p className="font-display text-[22px] leading-none font-medium text-copper">
                      {m.year}
                    </p>
                    <p className="mt-2 text-[13.5px] leading-snug text-ink-soft">{m.title}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
