import { Hammer, HeartHandshake, PencilRuler, Ruler, type LucideIcon } from "lucide-react";
import { Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import { HOME_PROCESS_SECTION, HOME_STEPS } from "@/content/process";

const ICONS: Record<string, LucideIcon> = { Ruler, PencilRuler, Hammer, HeartHandshake };

function StepIcon({ name }: { name: string }) {
  const Icon = ICONS[name] ?? Ruler;
  return <Icon className="size-6" strokeWidth={1.5} aria-hidden />;
}

/** "Four steps from idea to handover": nodes joined by a copper line; vertical timeline on mobile. */
export function HomeProcess() {
  return (
    <Section tone="mist" grid className="overflow-x-clip">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2.4fr)] lg:gap-14">
          <Reveal>
            <Eyebrow className="mb-4">{HOME_PROCESS_SECTION.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg" className="max-w-[12ch]">
              {HOME_PROCESS_SECTION.title}
            </Heading>
          </Reveal>

          <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
            <span
              aria-hidden
              className="absolute top-2 bottom-2 left-7 w-px bg-copper-bright/50 lg:hidden"
            />
            <span
              aria-hidden
              className="absolute top-7 left-7 hidden h-px bg-copper-bright/55 lg:block lg:right-[calc(25%-46px)]"
            />
            {HOME_STEPS.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 90} className="relative flex gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-line bg-white text-teal shadow-soft">
                  <StepIcon name={step.icon} />
                </span>
                <div className="pt-1">
                  <span className="font-mono text-[12px] tracking-[0.14em] text-copper">
                    {step.n}
                  </span>
                  <h3 className="mt-1 font-sans text-[16px] leading-tight font-semibold tracking-normal text-ink lg:text-[17px]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[260px] text-[13.5px] leading-relaxed text-ink-soft">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
