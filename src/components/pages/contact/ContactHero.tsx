import { Container, Eyebrow, HandNote, Heading, Reveal, Section } from "@/components/site";
import { CONTACT_HERO } from "@/content/contact";
import { img } from "@/content/images";
import { ActionTiles } from "./ActionTiles";
import { BookingForm } from "./BookingForm";

const [NOTE_LEFT, NOTE_RIGHT] = CONTACT_HERO.handNotes;
const RIGHT_LINES = NOTE_RIGHT.split(/\.\s*/).filter(Boolean);

/** Two-column hero: headline + action tiles on the left, the booking form card on the right. */
export function ContactHero() {
  return (
    <Section tone="cloud" wash className="overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-20">
      {/* margin sketches (harvested line art) */}
      <img
        src={img("sketch-plant-left")}
        alt=""
        aria-hidden
        loading="eager"
        decoding="async"
        className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-[215px] object-cover object-[left_top] opacity-75 xl:block"
      />
      <img
        src={img("sketch-arch-right")}
        alt=""
        aria-hidden
        loading="eager"
        decoding="async"
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[230px] object-cover object-[right_bottom] opacity-75 xl:block"
      />

      <Container className="relative">
        <div className="relative mx-auto max-w-[1180px]">
          <HandNote
            arrow="down-right"
            rotate={-8}
            className="absolute top-[228px] -left-[108px] hidden w-[112px] flex-col items-start leading-[1.05] xl:flex"
          >
            {NOTE_LEFT}
          </HandNote>
          <HandNote
            arrow="down-left"
            rotate={6}
            className="absolute -top-2 -right-[150px] hidden w-[150px] flex-col-reverse items-start text-[19px] leading-[1.15] xl:flex"
          >
            {RIGHT_LINES.map((line, i) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </HandNote>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8 xl:gap-10">
            <Reveal className="lg:pt-4">
              <Eyebrow>{CONTACT_HERO.eyebrow}</Eyebrow>
              <Heading
                as="h1"
                size="xl"
                className="mt-5 lg:text-[50px] lg:leading-[1.05] xl:text-[52px]"
              >
                {CONTACT_HERO.headlineLead} <em>{CONTACT_HERO.headlineEm}</em>
              </Heading>
              <p className="mt-4 max-w-[520px] text-[17px] leading-relaxed text-ink-soft lg:text-[18px]">
                {CONTACT_HERO.text}
              </p>
              <ActionTiles className="mt-7" />
            </Reveal>
            <Reveal delay={100}>
              <BookingForm />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
