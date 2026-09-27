import { Headset, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { Card, Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import { WARRANTY_CARDS } from "@/content/materials";
import { HOW_WE_BUILD_PAGE } from "@/content/process";

const ICONS: Record<string, LucideIcon> = { ShieldCheck, Headset, Sparkles };

export function WarrantySection() {
  const copy = HOW_WE_BUILD_PAGE.warranty;
  return (
    <Section tone="white" id="warranty">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <Eyebrow className="mb-4">{copy.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg">
              {copy.title}
            </Heading>
          </Reveal>
          <ul className="grid gap-5 sm:grid-cols-3">
            {WARRANTY_CARDS.map((card, i) => {
              const Icon = ICONS[card.icon] ?? ShieldCheck;
              return (
                <Reveal key={card.title} as="li" delay={i * 70} className="flex">
                  <Card hover className="flex w-full items-start gap-3.5 p-5 lg:p-6">
                    <Icon
                      aria-hidden
                      className="mt-0.5 size-9 shrink-0 text-teal"
                      strokeWidth={1.5}
                    />
                    <div>
                      <h3 className="font-display text-[18px] leading-[1.2] font-medium tracking-[-0.01em] text-teal lg:text-[19px]">
                        {card.title}
                      </h3>
                      <p className="mt-2.5 text-[14px] leading-relaxed text-ink-soft">
                        {card.text}
                      </p>
                    </div>
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
