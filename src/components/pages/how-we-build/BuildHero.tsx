import type { CSSProperties } from "react";
import {
  Container,
  Eyebrow,
  HandNote,
  Heading,
  Reveal,
  Section,
  VerticalRuler,
} from "@/components/site";
import { img } from "@/content/images";
import { HOW_WE_BUILD_PAGE } from "@/content/process";

/** Copper dimension line with end ticks that draws in when its Reveal enters the viewport. */
function DimensionLine({ delay }: { delay: number }) {
  const style = { "--d": `${delay}ms` } as CSSProperties;
  return (
    <span aria-hidden className="relative mt-1 block h-[14px] w-full lg:mt-2" style={style}>
      <span className="hwb-dim-line absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-copper" />
      <span className="hwb-dim-tick absolute top-0 left-0 h-full w-[1.5px] bg-copper" />
      <span className="hwb-dim-tick absolute top-0 right-0 h-full w-[1.5px] bg-copper" />
    </span>
  );
}

/** Hand-drawn curved arrow used under the side notes. */
function CurvedArrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-1 size-10 text-teal"
    >
      <path d="M46 6c2 20-10 38-32 44" />
      <path d="M22 44l-8 6 10 4" />
    </svg>
  );
}

export function BuildHero() {
  const { hero } = HOW_WE_BUILD_PAGE;
  return (
    <Section tone="mist" grid className="overflow-hidden py-10 lg:py-14">
      <VerticalRuler labels={["300", "600", "900", "1200"]} />
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:gap-6">
          <Reveal>
            <Eyebrow className="mb-4">{hero.eyebrow}</Eyebrow>
            <Heading as="h1" size="display" className="flex flex-col items-start">
              {hero.words.map((word, i) => (
                <span key={word} className="inline-flex flex-col items-stretch">
                  <span>{word}</span>
                  <DimensionLine delay={350 + i * 220} />
                </span>
              ))}
            </Heading>
          </Reveal>

          <Reveal delay={200} className="relative">
            <HandNote
              arrow="down-right"
              rotate={-9}
              className="absolute -top-4 -left-3 hidden max-w-[150px] text-center lg:inline-flex"
            >
              {hero.handNote}
            </HandNote>
            <div className="flex items-start justify-center gap-4 lg:justify-end lg:gap-8 lg:pl-32">
              <img
                src={img("wardrobe-elevation")}
                alt="Line drawing of a wardrobe elevation, 2400 mm wide and 1800 mm high, with dimension lines"
                width={800}
                height={511}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full max-w-[560px] mix-blend-multiply"
              />
              <div className="hidden shrink-0 pt-6 lg:block" aria-hidden>
                <ul className="space-y-0.5 font-hand text-[19px] leading-[1.45] text-teal">
                  {hero.sideNotes.map((note, i) => (
                    <li key={note} style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}>
                      <span className="mr-2 inline-block w-3 border-t border-teal align-middle" />
                      {note}
                    </li>
                  ))}
                </ul>
                <CurvedArrow />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
