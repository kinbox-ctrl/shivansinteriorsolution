import { Container, Eyebrow, Reveal, Section, Sketch } from "@/components/site";
import { FOUNDER_NOTE } from "@/content/team";

/** Founder's note on Linen: pull quote, two paragraphs and a handwritten signature. */
export function FounderNote() {
  return (
    <Section tone="linen" jali className="overflow-hidden py-12 lg:py-16">
      <Sketch
        kind="arch"
        className="absolute top-2 -right-6 hidden w-[190px] lg:block"
        opacity={0.35}
      />
      <Container className="relative">
        <Eyebrow className="mb-6">{FOUNDER_NOTE.eyebrow}</Eyebrow>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <blockquote className="relative pl-8 font-display text-[28px] leading-[1.2] font-normal tracking-[-0.01em] text-copper-bright italic sm:text-[34px] lg:pl-10 lg:text-[38px]">
              <span
                aria-hidden
                className="absolute top-0 -left-1 font-display text-[44px] leading-none text-copper-bright not-italic lg:text-[56px]"
              >
                &ldquo;
              </span>
              {FOUNDER_NOTE.quote}&rdquo;
            </blockquote>
          </Reveal>

          <Reveal delay={70} className="space-y-4 lg:col-span-4 lg:pt-1">
            {FOUNDER_NOTE.paragraphs.map((p) => (
              <p key={p} className="text-[15px] leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={140} className="lg:col-span-3 lg:pt-1">
            <p
              className="font-hand text-[32px] leading-none text-teal lg:text-[34px]"
              style={{ transform: "rotate(-3deg)" }}
            >
              {FOUNDER_NOTE.signature}
            </p>
            <p className="mt-4 text-[15px] font-semibold text-ink">{FOUNDER_NOTE.name}</p>
            <p className="text-[13px] text-ink-soft">{FOUNDER_NOTE.role}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
