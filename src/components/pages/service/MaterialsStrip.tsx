import { Card, Container, Eyebrow, Reveal, Section } from "@/components/site";
import { img } from "@/content/images";
import type { ServiceMaterial } from "@/content/services";

export function MaterialsStrip({ materials }: { materials: ServiceMaterial[] }) {
  return (
    <Section className="py-12 lg:py-16">
      <Container>
        <Eyebrow className="mb-5">Materials &amp; hardware</Eyebrow>
        <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-1 hide-scrollbar sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {materials.map((m, i) => (
            <Reveal key={m.name} delay={i * 70} className="w-[220px] shrink-0 snap-start sm:w-auto">
              <Card flush hover className="h-full overflow-hidden">
                <img
                  src={img(m.image)}
                  alt={m.name}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-sans text-[14px] font-semibold tracking-normal text-ink">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-[12px] leading-snug text-ink-soft">{m.note}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
