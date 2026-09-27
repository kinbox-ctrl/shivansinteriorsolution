import type { CSSProperties } from "react";
import { Card, Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import { HANDOVER_CHECKLIST, HOW_WE_BUILD_PAGE } from "@/content/process";

/** Pale-teal clipboard line-art for the right margin. */
function ClipboardSketch() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 140 190"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-auto w-full"
    >
      <g transform="rotate(8 70 95)">
        <rect x="18" y="22" width="104" height="150" rx="6" />
        <rect x="26" y="34" width="88" height="130" rx="3" strokeOpacity="0.6" />
        <rect x="50" y="12" width="40" height="18" rx="5" />
        <path d="M62 12v-4h16v4" />
        <path d="M38 62h48M38 88h44M38 114h50M38 140h40" strokeOpacity="0.7" />
        <path d="M96 58l4 5 7-9M92 84l4 5 7-9M98 110l4 5 7-9M88 136l4 5 7-9" />
        <path d="M118 176c8 6 14 4 18-2" strokeOpacity="0.5" />
      </g>
    </svg>
  );
}

export function HandoverChecklist() {
  const copy = HOW_WE_BUILD_PAGE.checklist;
  return (
    <Section tone="linen" jali id="handover" className="overflow-hidden">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <Eyebrow className="mb-4">{copy.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg">
              {copy.title}
            </Heading>
          </Reveal>
          <div className="relative xl:pr-32">
            <Reveal>
              <Card className="p-6 sm:p-8 lg:px-10 lg:py-9">
                <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                  {HANDOVER_CHECKLIST.map((item, i) => (
                    <li key={item} className="flex items-center gap-3.5 text-[15px] text-ink">
                      <span
                        aria-hidden
                        className="hwb-tick-ring flex size-6 shrink-0 items-center justify-center rounded-full border-[1.5px] border-copper"
                        style={{ "--d": `${150 + i * 90}ms` } as CSSProperties}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.8}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-3.5 text-copper"
                        >
                          <path className="hwb-tick" d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-0 hidden w-[118px] -translate-y-1/2 text-teal opacity-55 xl:block"
            >
              <ClipboardSketch />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
