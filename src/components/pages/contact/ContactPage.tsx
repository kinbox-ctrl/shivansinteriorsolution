import {
  Container,
  Eyebrow,
  FaqAccordion,
  Heading,
  Reveal,
  Section,
  Sketch,
} from "@/components/site";
import { CONTACT_FAQ, CONTACT_FAQ_SECTION } from "@/content/faqs";
import { AreasSection } from "./AreasSection";
import { ContactHero } from "./ContactHero";
import { WorkshopSection } from "./WorkshopSection";

function QuickAnswers() {
  return (
    <Section tone="cloud" className="overflow-hidden border-t border-line/70 py-12 lg:py-16">
      <Sketch
        kind="arch"
        opacity={0.28}
        className="absolute -bottom-10 -left-8 hidden w-[200px] lg:block"
      />
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)] lg:gap-12 lg:pl-16">
          <Reveal>
            <Eyebrow>{CONTACT_FAQ_SECTION.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg" className="mt-4 lg:text-[36px] lg:leading-[1.08]">
              {CONTACT_FAQ_SECTION.title}
            </Heading>
          </Reveal>
          <Reveal delay={70}>
            <FaqAccordion items={CONTACT_FAQ} defaultOpen={null} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/** /contact — hero with action tiles + booking form, workshop map, areas served, quick answers. */
export function ContactPage() {
  return (
    <>
      <ContactHero />
      <WorkshopSection />
      <AreasSection />
      <QuickAnswers />
    </>
  );
}
