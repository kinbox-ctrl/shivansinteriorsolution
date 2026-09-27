import { Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { CASE_STUDY_COPY } from "./copy";
import { galleryKeys, projectImg } from "./images";
import type { LightboxImage } from "./ProjectPage";

export type ProjectGalleryProps = {
  project: Project;
  onOpen: (image: LightboxImage) => void;
};

/** Editorial grid: one large image (rows 1–2), two small on the top right, one wide detail. */
export function ProjectGallery({ project, onOpen }: ProjectGalleryProps) {
  const copy = CASE_STUDY_COPY.gallery;
  const [wide, a, b, detail] = galleryKeys(project);
  const tiles = [
    {
      key: wide,
      alt: `${project.title}, the finished space`,
      cls: "row-span-2 aspect-[4/5] lg:aspect-auto",
    },
    { key: a, alt: `${project.title}, detail one`, cls: "aspect-[4/3]" },
    { key: b, alt: `${project.title}, detail two`, cls: "aspect-[4/3]" },
    { key: detail, alt: `${project.title}, close-up detail`, cls: "col-span-2 aspect-[16/7]" },
  ];

  return (
    <Section id="gallery" tone="white">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:items-start lg:gap-14">
        <Reveal className="lg:pt-6">
          <Eyebrow className="mb-5">{copy.eyebrow}</Eyebrow>
          <Heading as="h2" size="lg" className="max-w-[11ch]">
            {copy.heading}
          </Heading>
        </Reveal>

        <Reveal
          as="ul"
          delay={120}
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-[1.25fr_1fr_1fr] lg:grid-rows-[auto_auto]"
          aria-label={copy.eyebrow}
        >
          {tiles.map((tile, i) => (
            <li
              key={`${tile.key}-${i}`}
              className={cn("min-w-0", tile.cls)}
              style={{ "--reveal-delay": `${120 + i * 70}ms` } as React.CSSProperties}
            >
              <button
                type="button"
                onClick={() => onOpen({ src: projectImg(tile.key), alt: tile.alt })}
                aria-label={`${copy.open}: ${tile.alt}`}
                className="group/tile block h-full w-full overflow-hidden rounded-2xl bg-linen shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
              >
                <img
                  src={projectImg(tile.key)}
                  alt={tile.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover/tile:scale-[1.03]"
                />
              </button>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
