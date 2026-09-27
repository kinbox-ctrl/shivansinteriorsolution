import { CalendarDays, Gem, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { Card, Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import { VALUES, VALUES_SECTION } from "@/content/team";
import { SPLIT_GRID, SPLIT_HEADING } from "./layout";

const ICONS: Record<string, LucideIcon> = { Gem, CalendarDays, Users, ShieldCheck };

/** Four white value cards with thin teal line icons. */
export function Values() {
  return (
    <Section className="py-14 lg:py-20">
      <Container>
        <div className={SPLIT_GRID}>
          <Reveal>
            <Eyebrow className="mb-5">{VALUES_SECTION.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg" className={SPLIT_HEADING}>
              {VALUES_SECTION.title}
            </Heading>
          </Reveal>

          <ul className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0 xl:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = ICONS[v.icon] ?? Gem;
              return (
                <Reveal
                  as="li"
                  key={v.title}
                  delay={i * 70}
                  className="w-[240px] shrink-0 snap-start lg:w-auto"
                >
                  <Card hover flush className="h-full p-5">
                    <Icon aria-hidden strokeWidth={1.5} className="size-8 text-teal" />
                    <h3 className="mt-5 font-display text-[18px] leading-[1.2] font-medium text-teal">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{v.text}</p>
                  </Card>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
