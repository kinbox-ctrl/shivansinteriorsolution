import { BeforeAfterSlider, Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import { BLUEPRINT_SECTION } from "@/content/home";
import { img } from "@/content/images";

/** "Blueprint to Reality": copy on the left, before/after slider in a rounded panel. */
export function HomeBlueprint() {
  const [lineOne, lineTwo] = BLUEPRINT_SECTION.titleLines;
  return (
    <Section tone="cloud" className="overflow-x-clip border-t border-line">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,2.1fr)] lg:gap-14">
          <Reveal>
            <Eyebrow className="mb-4">{BLUEPRINT_SECTION.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg">
              {lineOne}
              <br />
              {lineTwo}
            </Heading>
            <p className="mt-5 max-w-[280px] text-[16px] leading-relaxed text-ink-soft">
              {BLUEPRINT_SECTION.text}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <BeforeAfterSlider
              before={{
                src: img(BLUEPRINT_SECTION.before.image),
                alt: "Copper line drawing of the kitchen on a pale-teal blueprint grid with dimensions",
                label: BLUEPRINT_SECTION.before.label,
              }}
              after={{
                src: img(BLUEPRINT_SECTION.after.image),
                alt: "The finished teal kitchen with its island, delivered as drawn",
                label: BLUEPRINT_SECTION.after.label,
              }}
              aspect="12/5"
              radius="xl"
              ariaLabel="Compare the design drawing with the delivered kitchen"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
