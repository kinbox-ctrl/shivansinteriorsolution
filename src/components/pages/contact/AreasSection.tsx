import { ArrowRight, Check, MapPin } from "lucide-react";
import { Chip, Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import { AREAS_SECTION, AREAS_SERVED } from "@/content/contact";
import { SITE_NAME, waLink } from "@/content/site";

const ASK_LINK = waLink(
  `Hello ${SITE_NAME}, I'm outside your listed areas. Could you tell me if you can take up a project in my town?`,
);

/** "Areas we serve": heading, town chips (Sambhar highlighted) and the "ask us" card. */
export function AreasSection() {
  return (
    <Section tone="cloud" className="border-t border-line/70 py-12 lg:py-14">
      <Container className="lg:max-w-[1400px]">
        <div className="grid gap-6 lg:grid-cols-[minmax(215px,2fr)_minmax(0,8.6fr)_minmax(224px,2.1fr)] lg:items-center lg:gap-7">
          <Reveal>
            <Eyebrow>{AREAS_SECTION.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg" className="mt-3 lg:text-[30px] lg:leading-[1.12]">
              {AREAS_SECTION.title}
            </Heading>
          </Reveal>

          <Reveal delay={70}>
            <ul className="flex flex-wrap gap-2" aria-label="Towns we serve">
              {AREAS_SERVED.map((town, i) => (
                <li key={town}>
                  <Chip
                    tone={i === 0 ? "teal" : "white"}
                    className="h-9 px-4 text-[13.5px] shadow-soft"
                    {...(i === 0
                      ? { icon: <Check strokeWidth={2} aria-hidden />, "aria-current": "true" }
                      : {})}
                  >
                    {town}
                  </Chip>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <a
              href={ASK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 rounded-2xl border border-line bg-white p-4 shadow-soft transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-mist text-teal">
                <MapPin className="size-[18px]" strokeWidth={1.5} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold whitespace-nowrap text-ink">
                  {AREAS_SECTION.askTitle}
                </span>
                <span className="mt-0.5 inline-flex items-center gap-1.5 text-[13px] font-semibold whitespace-nowrap text-teal">
                  {AREAS_SECTION.askCta}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
