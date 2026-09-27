import {
  Container,
  Eyebrow,
  FaqAccordion,
  Heading,
  Reveal,
  Section,
  Sketch,
} from "@/components/site";
import { SERVICES_PAGE, type ServiceFaq as Faq } from "@/content/services";

export function ServiceFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <Section className="overflow-hidden py-14 lg:py-20">
      <Sketch
        kind="plant-large"
        className="absolute bottom-0 -left-4 hidden w-40 lg:block"
        opacity={0.28}
      />
      <Sketch
        kind="jali"
        className="absolute bottom-6 left-[26%] hidden w-24 lg:block"
        opacity={0.2}
      />
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
          <Reveal>
            <Eyebrow className="mb-4">{SERVICES_PAGE.faq.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg">
              {SERVICES_PAGE.faq.title}
            </Heading>
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
