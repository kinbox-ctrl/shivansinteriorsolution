import { Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import type { Project } from "@/content/projects";
import { CASE_STUDY_COPY } from "./copy";
import { timelineIcon } from "./icons";

/**
 * "How we built it": a horizontal timeline (copper line through round icon nodes, day / title /
 * text left-aligned beneath each) from lg; a vertical rail with the line down the left on small
 * screens. The line is a `before:` pseudo-element so the `<ol>` only contains `<li>`s.
 */
export function ProjectTimeline({ project }: { project: Project }) {
  const copy = CASE_STUDY_COPY.timeline;
  const steps = project.timeline;
  return (
    <Section id="timeline">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:items-start lg:gap-14">
        <Reveal className="lg:pt-6">
          <Eyebrow className="mb-5">{copy.eyebrow}</Eyebrow>
          <Heading as="h2" size="lg" className="max-w-[10ch]">
            {copy.heading}
          </Heading>
        </Reveal>

        <Reveal
          as="ol"
          delay={120}
          aria-label={copy.eyebrow}
          className="relative grid gap-8 before:absolute before:top-3 before:bottom-3 before:left-6 before:w-px before:bg-copper before:content-[''] lg:grid-cols-5 lg:gap-0 lg:before:top-6 lg:before:right-[calc(20%-1.5rem)] lg:before:bottom-auto lg:before:left-6 lg:before:h-px lg:before:w-auto"
        >
          {steps.map((step, i) => {
            const Icon = timelineIcon(step.icon);
            return (
              <li
                key={`${step.day}-${step.title}`}
                className="relative flex gap-5 lg:flex-col lg:items-start lg:gap-4 lg:pr-5"
                style={{ "--reveal-delay": `${120 + i * 90}ms` } as React.CSSProperties}
              >
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-copper/50 bg-white text-teal shadow-soft">
                  <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                </span>
                <div className="min-w-0 pt-1 lg:pt-0">
                  <p className="font-mono text-[12px] tracking-[0.08em] text-copper">{step.day}</p>
                  <h3 className="mt-1 font-sans text-[15px] leading-snug font-semibold tracking-normal text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-[24ch] text-[13px] leading-relaxed text-ink-soft lg:max-w-[22ch]">
                    {step.text}
                  </p>
                </div>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}
