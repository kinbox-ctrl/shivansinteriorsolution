import { CircleCheck } from "lucide-react";
import { Container, Eyebrow, Heading, Reveal, Section, Sketch } from "@/components/site";
import { PROMISE_SECTION, PROMISES } from "@/content/team";

/** "Our promise" on Linen: heading left, four copper check items in a row, plant sketch right. */
export function Promise() {
  return (
    <Section tone="linen" jali className="overflow-hidden py-12 lg:py-14">
      <Sketch
        kind="plant-large"
        className="absolute -right-2 -bottom-8 hidden w-[120px] lg:block"
        opacity={0.4}
      />
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-8">
          <Reveal className="lg:col-span-4">
            <Eyebrow className="mb-5">{PROMISE_SECTION.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg" className="max-w-[16ch] lg:text-[34px]">
              {PROMISE_SECTION.title}
            </Heading>
          </Reveal>

          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 lg:gap-5">
            {PROMISES.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 70} className="flex items-center gap-3.5">
                <CircleCheck
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-8 shrink-0 text-copper"
                />
                <span className="text-[15px] leading-snug text-ink">{p}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
