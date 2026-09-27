import { CirclePlay } from "lucide-react";
import {
  Button,
  Container,
  Eyebrow,
  HandNote,
  Heading,
  Reveal,
  Section,
  VerticalRuler,
} from "@/components/site";
import { img } from "@/content/images";
import { WHATSAPP_DEFAULT } from "@/content/site";
import { ABOUT_HERO } from "@/content/team";

/**
 * Tooltip for the inert "Watch our story" control. Lives here because `src/content/team.ts`
 * is owned by the content author; move it into ABOUT_HERO when that file is next edited.
 */
const VIDEO_NOTE = "Video coming soon";

/** How far the arch portrait runs past the hero's bottom edge on lg+ (cropped by the section). */
const CROP = "150px";

/** Split hero: story on the left, arch-topped founder portrait and margin notes on the right. */
export function AboutHero() {
  return (
    <Section wash flush className="overflow-hidden py-10 lg:pt-10 lg:pb-0">
      {/* Grid is a separate layer: `wash` + `grid-paper` on one element would tile the wash at 32px. */}
      <div aria-hidden className="grid-paper pointer-events-none absolute inset-0 opacity-60" />
      <VerticalRuler />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-8">
          {/* Copy */}
          <Reveal className="lg:pb-10">
            <Eyebrow className="mb-5">{ABOUT_HERO.eyebrow}</Eyebrow>
            <Heading
              as="h1"
              size="xl"
              className="max-w-[13ch] text-pretty lg:text-[50px] xl:text-[58px]"
            >
              {ABOUT_HERO.headlineLead} <br className="hidden lg:inline" />
              <em>{ABOUT_HERO.headlineEm}</em>
            </Heading>
            <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-ink-soft lg:text-[18px]">
              {ABOUT_HERO.text}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="whatsapp" arrow href={WHATSAPP_DEFAULT}>
                {ABOUT_HERO.primary}
              </Button>
              <Button
                variant="secondary"
                type="button"
                aria-disabled
                title={VIDEO_NOTE}
                className="cursor-default"
                icon={<CirclePlay strokeWidth={1.5} />}
              >
                {ABOUT_HERO.secondary}
              </Button>
            </div>
          </Reveal>

          {/* Portrait + margin decoration. On lg+ the column runs CROP px past the section's
              bottom edge so the arch is cropped by the hero, as in the reference. */}
          <div
            className="relative lg:self-end xl:pr-[150px]"
            style={{ ["--crop" as string]: CROP }}
          >
            {/* Handwritten note + plant sketch, left of the portrait */}
            <HandNote
              arrow="right"
              rotate={-8}
              className="absolute top-[22%] z-10 hidden max-w-[120px] lg:-left-6 lg:inline-flex xl:-left-10 xl:max-w-[140px]"
            >
              {ABOUT_HERO.handNote}
            </HandNote>
            <img
              src={img("sketch-plant-left")}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute -left-2 bottom-[calc(var(--crop)+8px)] hidden w-[110px] opacity-70 lg:block"
            />

            {/* Arch portrait */}
            <Reveal
              delay={140}
              y={32}
              className="relative mx-auto w-full max-w-[300px] lg:mr-0 lg:-mb-[var(--crop)] lg:ml-auto lg:max-w-[440px] xl:max-w-[470px]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-y-3 translate-x-3 rounded-t-full rounded-b-2xl border border-copper/70"
              />
              <figure className="relative overflow-hidden rounded-t-full rounded-b-2xl shadow-lift">
                <div className="aspect-[4/4.8] w-full">
                  <img
                    src={img(ABOUT_HERO.portrait)}
                    alt={`${ABOUT_HERO.namePlate.name}, ${ABOUT_HERO.namePlate.role.toLowerCase()}, in the Sambhar workshop`}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover object-[50%_35%]"
                  />
                </div>
                <figcaption className="glass absolute right-4 bottom-[7%] left-4 rounded-xl px-5 py-4 shadow-soft lg:bottom-[calc(var(--crop)+24px)]">
                  <span className="block text-[15px] font-semibold text-ink">
                    {ABOUT_HERO.namePlate.name}
                  </span>
                  <span className="block text-[13px] text-ink-soft">
                    {ABOUT_HERO.namePlate.role}
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            {/* Far-right word list + arch sketch */}
            <div className="absolute top-0 right-0 hidden h-full w-[140px] xl:block">
              <div className="pt-6">
                <span aria-hidden className="mb-4 block h-px w-6 bg-copper" />
                <ul className="space-y-2 font-mono text-[11px] tracking-[0.22em] text-ink-soft uppercase">
                  {ABOUT_HERO.sideWords.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
              <img
                src={img("sketch-arch-right")}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute right-0 bottom-[var(--crop)] w-[150px] opacity-70"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
