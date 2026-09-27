import { Container, Eyebrow, Heading, Section, Sketch } from "@/components/site";
import { SERVICES_FAQ } from "@/content/faqs";
import { SERVICES_PAGE } from "@/content/services";
import { OneTeamSection } from "./OneTeamSection";
import { Reveal } from "./Reveal";
import { ServiceRows } from "./ServiceRows";
import { ServicesCtaBand } from "./ServicesCtaBand";
import { ServicesFaqAccordion } from "./ServicesFaqAccordion";
import { ServicesHero } from "./ServicesHero";

function FaqTitle({ title }: { title: string }) {
  const cut = title.indexOf("? ");
  if (cut === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, cut + 1)}
      <br />
      {title.slice(cut + 2)}
    </>
  );
}

function ServicesFaq() {
  const { faq } = SERVICES_PAGE;
  return (
    <Section tone="white" className="overflow-hidden py-10 lg:py-14" aria-labelledby="services-faq">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
          <Reveal className="relative">
            <Sketch
              kind="plant"
              className="absolute -bottom-6 -left-4 hidden w-[120px] lg:block"
              opacity={0.3}
            />
            <Eyebrow className="mb-3">{faq.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg" id="services-faq" className="lg:text-[44px]">
              <FaqTitle title={faq.title} />
            </Heading>
          </Reveal>
          <Reveal delay={90}>
            <ServicesFaqAccordion items={SERVICES_FAQ} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/** /services — hero with the isometric home, six service rows, one-team argument, FAQ and CTA. */
export function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceRows />
      <OneTeamSection />
      <ServicesFaq />
      <Section tone="cloud" flush className="pt-0 pb-10 lg:pb-12">
        <Reveal>
          <ServicesCtaBand />
        </Reveal>
      </Section>
    </>
  );
}
