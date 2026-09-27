import { Button, Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import { img } from "@/content/images";
import { WORKSHOP_PHOTOS, WORKSHOP_SECTION, type WorkshopPhoto } from "@/content/team";
import { cn } from "@/lib/utils";
import { SPLIT_GRID, SPLIT_HEADING } from "./layout";

function WorkshopTile({ photo, index }: { photo: WorkshopPhoto; index: number }) {
  return (
    <Reveal
      as="figure"
      delay={index * 70}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft",
        photo.tall && "sm:col-span-2 lg:col-span-1 lg:row-span-2",
      )}
    >
      <div
        className={cn(
          "relative flex-1 overflow-hidden",
          photo.tall ? "aspect-[16/10] lg:aspect-auto lg:min-h-[260px]" : "aspect-[16/9]",
        )}
      >
        <img
          src={img(photo.image)}
          alt={`${photo.title}: ${photo.caption}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
        />
      </div>
      <figcaption className="flex items-start gap-3 px-4 py-3">
        <span className="font-display text-[15px] leading-[1.35] font-medium text-copper">
          {photo.n}
        </span>
        <span className="min-w-0">
          <span className="block text-[14px] leading-[1.35] font-semibold text-ink">
            {photo.title}
          </span>
          <span className="block text-[12px] leading-snug text-ink-soft">{photo.caption}</span>
        </span>
      </figcaption>
    </Reveal>
  );
}

/** "Made in our workshop": copy left, bento grid of five workshop photos right. */
export function Workshop() {
  return (
    <Section tone="white" className="py-14 lg:py-20">
      <Container>
        <div className={SPLIT_GRID}>
          <Reveal>
            <Eyebrow className="mb-5">{WORKSHOP_SECTION.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg" className={SPLIT_HEADING}>
              {WORKSHOP_SECTION.title}
            </Heading>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-ink-soft">
              {WORKSHOP_SECTION.text}
            </p>
            <Button variant="secondary" size="sm" arrow to="/contact" className="mt-7">
              {WORKSHOP_SECTION.cta}
            </Button>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
            {WORKSHOP_PHOTOS.map((p, i) => (
              <WorkshopTile key={p.n} photo={p} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
