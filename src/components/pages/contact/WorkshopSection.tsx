import { Clock, MapPin, Phone } from "lucide-react";
import { Button, Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import { WORKSHOP_SECTION } from "@/content/contact";
import { img } from "@/content/images";
import { ADDRESS_LINES, HOURS, MAP_LINK, PHONE_TEL, SITE_NAME } from "@/content/site";

/** "Visit our workshop": heading, the Sambhar map panel with the overlaid info card, workshop photo. */
export function WorkshopSection() {
  return (
    <Section tone="cloud" className="border-t border-line/70 py-12 lg:py-14">
      <Container className="lg:max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(200px,1.9fr)_minmax(0,8fr)_minmax(0,3fr)] lg:items-center lg:gap-5">
          <Reveal>
            <Eyebrow>{WORKSHOP_SECTION.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg" className="mt-4 lg:text-[34px] lg:leading-[1.08]">
              {WORKSHOP_SECTION.title}
            </Heading>
            <p className="mt-4 max-w-[300px] text-[15px] leading-relaxed text-ink-soft">
              {WORKSHOP_SECTION.text}
            </p>
          </Reveal>

          <Reveal delay={70} className="relative">
            <div className="relative overflow-hidden rounded-4xl bg-linen shadow-soft lg:h-[256px]">
              <img
                src={img(WORKSHOP_SECTION.map)}
                alt={`Map of Sambhar showing the ${SITE_NAME} workshop near Sambhar Lake, with the road to Jaipur and Nawa`}
                loading="lazy"
                decoding="async"
                className="aspect-[16/7] h-full w-full object-cover object-left lg:aspect-auto"
              />
            </div>
            <div className="relative mx-4 -mt-8 flex flex-col rounded-2xl border border-line bg-white p-5 shadow-lift lg:absolute lg:inset-y-2.5 lg:right-2.5 lg:mx-0 lg:mt-0 lg:w-[222px] lg:justify-between lg:p-3.5">
              <div>
                <p className="text-[14px] font-semibold leading-tight whitespace-nowrap text-teal">
                  {SITE_NAME}
                </p>
                <p className="mt-1.5 text-[12px] leading-[1.4] text-ink-soft">
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <ul className="mt-2 space-y-0.5">
                  {HOURS.map((h) => (
                    <li
                      key={h.days}
                      className="flex items-center gap-2 text-[11.5px] whitespace-nowrap text-ink"
                    >
                      <Clock
                        className="size-3.5 shrink-0 text-teal"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <span>
                        {h.days}: {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3 flex flex-col gap-1.5">
                <Button
                  href={MAP_LINK}
                  variant="teal"
                  size="sm"
                  block
                  arrow
                  className="h-9 px-4"
                  icon={<MapPin strokeWidth={1.5} aria-hidden />}
                >
                  {WORKSHOP_SECTION.directions}
                </Button>
                <Button
                  href={PHONE_TEL}
                  variant="secondary"
                  size="sm"
                  block
                  className="h-9 px-4"
                  icon={<Phone strokeWidth={1.5} aria-hidden />}
                >
                  {WORKSHOP_SECTION.call}
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="overflow-hidden rounded-3xl shadow-soft lg:h-[256px]">
              <img
                src={img(WORKSHOP_SECTION.photo)}
                alt={`The ${SITE_NAME} workshop in Sambhar, with the signboard and the open carpentry bay`}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
