import {
  Container,
  CountUp,
  Eyebrow,
  Heading,
  Reveal,
  Section,
  VerticalRuler,
} from "@/components/site";
import { img } from "@/content/images";
import { PROJECTS_PAGE, PROJECT_COUNT } from "@/content/projects";

/** Intro band: eyebrow, display headline, hairline and the copper "48 projects" counter. */
export function ProjectsIntro() {
  return (
    <Section tone="cloud" wash grid flush className="overflow-hidden pt-10 pb-14 lg:pt-16 lg:pb-16">
      <VerticalRuler />
      <img
        src={img("sketch-arch-right")}
        alt=""
        aria-hidden
        loading="eager"
        decoding="async"
        className="pointer-events-none absolute top-[-8%] right-[2%] hidden h-[125%] w-auto max-w-[40%] object-contain object-right-top opacity-55 mix-blend-multiply lg:block"
      />
      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-12">
          <Reveal className="min-w-0">
            <Eyebrow className="mb-5">{PROJECTS_PAGE.eyebrow}</Eyebrow>
            <Heading as="h1" size="display" tone="ink" className="lg:text-[72px]">
              {PROJECTS_PAGE.headlineLead}
              <br />
              <em>{PROJECTS_PAGE.headlineEm}</em>
            </Heading>
          </Reveal>

          <Reveal
            delay={140}
            className="flex items-stretch gap-6 border-line lg:mb-2 lg:border-l lg:pl-8"
          >
            <span aria-hidden className="w-px shrink-0 bg-line lg:hidden" />
            <div>
              <p className="font-display text-[34px] leading-[1.02] font-medium tracking-[-0.02em] text-copper-bright lg:text-[40px]">
                <CountUp to={PROJECT_COUNT} group={false} duration={1200} />
                <br />
                projects
              </p>
              <p className="mt-4 space-y-1.5 font-mono text-[10px] leading-relaxed tracking-[0.2em] text-ink-soft uppercase">
                {PROJECTS_PAGE.countSub.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
