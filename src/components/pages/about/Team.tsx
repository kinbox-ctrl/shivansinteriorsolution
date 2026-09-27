import { Card, Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import { img } from "@/content/images";
import { TEAM, TEAM_SECTION } from "@/content/team";
import { SPLIT_GRID, SPLIT_HEADING } from "./layout";

/** Five white team cards with round portraits, names, roles and years. */
export function Team() {
  return (
    <Section tone="white" className="py-14 lg:py-20">
      <Container>
        <div className={SPLIT_GRID}>
          <Reveal>
            <Eyebrow className="mb-5">{TEAM_SECTION.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg" className={SPLIT_HEADING}>
              {TEAM_SECTION.title}
            </Heading>
            <p className="mt-5 max-w-[30ch] text-[15px] leading-relaxed text-ink-soft">
              {TEAM_SECTION.text}
            </p>
          </Reveal>

          <ul className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0 xl:grid-cols-5">
            {TEAM.map((m, i) => (
              <Reveal
                as="li"
                key={m.name}
                delay={i * 70}
                className="w-[180px] shrink-0 snap-start lg:w-auto"
              >
                <Card hover flush className="h-full p-3 pb-4">
                  <div className="aspect-square overflow-hidden rounded-full border border-line">
                    <img
                      src={img(m.image)}
                      alt={`${m.name}, ${m.role}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-4 text-[13px] leading-tight font-semibold whitespace-nowrap text-ink">
                    {m.name}
                  </p>
                  <p className="mt-1 text-[11.5px] leading-snug tracking-[-0.01em] whitespace-nowrap text-ink-soft">
                    {m.role}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-snug text-ink-soft">{m.years}</p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
