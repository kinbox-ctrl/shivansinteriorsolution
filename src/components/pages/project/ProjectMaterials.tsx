import { Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import type { Project } from "@/content/projects";
import { CASE_STUDY_COPY } from "./copy";
import { projectImg } from "./images";

/** "Materials used": swatch cards with a macro image, name and note (snap rail below lg). */
export function ProjectMaterials({ project }: { project: Project }) {
  const copy = CASE_STUDY_COPY.materials;
  const cols = Math.min(5, Math.max(3, project.materials.length));
  return (
    <Section id="materials" tone="linen" jali>
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:items-center lg:gap-14">
        <Reveal>
          <Eyebrow className="mb-5">{copy.eyebrow}</Eyebrow>
          <Heading as="h2" size="lg" className="max-w-[14ch]">
            {copy.heading}
          </Heading>
        </Reveal>

        <Reveal
          as="ul"
          delay={120}
          className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          aria-label={copy.eyebrow}
        >
          {project.materials.map((material, i) => (
            <li
              key={material.name}
              className="w-[68%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift sm:w-[44%] lg:w-auto"
              style={{ "--reveal-delay": `${120 + i * 70}ms` } as React.CSSProperties}
            >
              <img
                src={projectImg(material.image)}
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="px-4 pt-3.5 pb-4">
                <h3 className="font-sans text-[15px] leading-snug font-semibold tracking-normal text-teal">
                  {material.name}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{material.note}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
