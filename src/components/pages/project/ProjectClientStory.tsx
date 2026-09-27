import { Quote, Star } from "lucide-react";
import { Button, Container, Eyebrow, Reveal, Section, Sketch } from "@/components/site";
import type { Project } from "@/content/projects";
import { CASE_STUDY_COPY } from "./copy";
import { projectImg } from "./images";

/** Client quote (photo, italic Fraunces quote, name, town, copper stars) beside the budget card. */
export function ProjectClientStory({ project }: { project: Project }) {
  const copy = CASE_STUDY_COPY.clientStory;
  const { quote, budget } = project;
  return (
    <Section id="client-story" tone="linen" jali className="overflow-hidden">
      <Sketch
        kind="plant"
        className="absolute top-10 right-2 hidden w-28 lg:block xl:right-10"
        opacity={0.3}
      />
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-center lg:gap-14">
        <Reveal className="grid gap-8 sm:grid-cols-[minmax(0,3fr)_minmax(0,8fr)] sm:items-center">
          <div>
            <Eyebrow className="mb-5">{copy.eyebrow}</Eyebrow>
            <img
              src={projectImg(quote.image)}
              alt={`${quote.name}'s home in ${quote.town}`}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full max-w-[240px] rounded-2xl object-cover shadow-lift"
            />
          </div>
          <figure className="sm:pt-10">
            <blockquote className="relative">
              <Quote
                aria-hidden
                className="absolute -top-1 -left-8 hidden size-5 text-copper/70 sm:block"
                strokeWidth={1.5}
              />
              <p className="font-display text-[22px] leading-[1.35] text-ink italic lg:text-[26px]">
                &ldquo;{quote.text}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div>
                <p className="text-[15px] font-semibold text-ink">{quote.name}</p>
                <p className="text-[13px] text-ink-soft">{quote.town}</p>
              </div>
              <span
                className="flex items-center gap-0.5 text-copper"
                role="img"
                aria-label={copy.stars}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 fill-current" strokeWidth={1.5} aria-hidden />
                ))}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={120} y={32}>
          <div className="rounded-2xl border border-line bg-white p-7 shadow-lift lg:p-8">
            <Eyebrow className="mb-5">{copy.budgetEyebrow}</Eyebrow>
            <p className="font-display text-[24px] leading-tight text-teal lg:text-[28px]">
              {budget.label}
            </p>
            <p className="mt-2 font-display text-[36px] leading-none font-medium tracking-[-0.02em] text-copper-bright lg:text-[44px]">
              {budget.range}
            </p>
            <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-ink-soft uppercase">
              {budget.note}
            </p>
            <Button to="/estimator" arrow className="mt-7">
              {budget.cta}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
