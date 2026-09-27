import { Button, Container, Eyebrow, Heading, Sketch } from "@/components/site";
import { SERVICES_PAGE } from "@/content/services";
import { WHATSAPP_PHOTO } from "@/content/site";

/**
 * Page-local full-bleed CTA band (the shared `<CtaBand>` is an inset rounded card). A short
 * linen → copper-tint gradient strip, eyebrow + two-line headline on the left, the two buttons on
 * the right and the jali arch on the far right, as in the services reference.
 */
export function ServicesCtaBand() {
  const { cta } = SERVICES_PAGE;
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(90deg,var(--color-linen)_0%,var(--color-linen)_35%,var(--color-copper-tint)_100%)]">
      <div aria-hidden className="jali absolute inset-0 opacity-60" />
      <Sketch
        kind="arch"
        className="absolute -right-3 -bottom-14 hidden w-[190px] lg:block"
        opacity={0.5}
      />
      <Sketch
        kind="plant"
        className="absolute right-[170px] -bottom-6 hidden w-[80px] lg:block"
        opacity={0.4}
      />
      <Container className="relative py-8 lg:py-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pr-[220px]">
          <div>
            <Eyebrow className="mb-3">{cta.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg" className="lg:text-[40px]">
              {cta.titleLead}
              <br />
              <em>{cta.titleEm}</em>
            </Heading>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <Button variant="whatsapp" size="lg" arrow href={WHATSAPP_PHOTO}>
              {cta.primary}
            </Button>
            <Button variant="secondary" size="lg" arrow to="/estimator">
              {cta.secondary}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
