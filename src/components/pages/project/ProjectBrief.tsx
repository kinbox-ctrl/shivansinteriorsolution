import { Check } from "lucide-react";
import { Container, Eyebrow, Heading, Reveal, Section, Sketch } from "@/components/site";
import type { Project } from "@/content/projects";
import { CASE_STUDY_COPY } from "./copy";

/** "The brief": story on the left, a Mist "What they asked for" checklist on the right. */
export function ProjectBrief({ project }: { project: Project }) {
  const copy = CASE_STUDY_COPY.brief;
  const [first, second] = project.story.paragraphs;
  return (
    <Section id="brief" className="overflow-hidden">
      <Sketch
        kind="plant-large"
        className="absolute top-6 right-0 z-[1] hidden w-44 lg:block xl:right-8 xl:w-52"
        opacity={0.35}
      />
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-14 xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <Reveal>
          <Eyebrow className="mb-5">{copy.eyebrow}</Eyebrow>
          <Heading as="h2" size="lg" className="max-w-[16ch]">
            {project.story.title}
          </Heading>
          <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-ink-soft lg:text-[17px]">
            {first}
          </p>
          <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink-soft lg:text-[17px]">
            {second}
          </p>
        </Reveal>

        <Reveal delay={120} className="relative">
          <div className="rounded-2xl bg-mist p-7 lg:p-9">
            <Eyebrow className="mb-6">{copy.askedEyebrow}</Eyebrow>
            <ul className="space-y-3.5">
              {project.asked.map((item) => (
                <li key={item} className="flex items-start gap-3.5 text-[15px] text-ink">
                  <Check
                    aria-hidden
                    className="mt-[3px] size-4 shrink-0 text-copper"
                    strokeWidth={1.75}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
