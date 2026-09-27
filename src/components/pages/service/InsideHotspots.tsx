import { useState } from "react";
import { Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import { img } from "@/content/images";
import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";

type Props = { inside: Service["inside"]; hotspots: Service["hotspots"] };

export function InsideHotspots({ inside, hotspots }: Props) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section tone="white" className="py-14 lg:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10">
          <Reveal>
            <Eyebrow className="mb-4">{inside.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg">
              {inside.title}
            </Heading>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-soft">{inside.text}</p>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lift">
              <img
                src={img(inside.image)}
                alt={inside.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              {hotspots.map((h, i) => (
                <button
                  key={h.n}
                  type="button"
                  aria-label={`${h.n}. ${h.title}: ${h.text}`}
                  aria-pressed={active === i}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(active === i ? null : i)}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  className={cn(
                    "absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono text-[13px] text-white shadow-lift ring-4 ring-white/70 transition-[transform,background-color] duration-300 ease-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                    active === i ? "scale-110 bg-copper-bright" : "bg-copper",
                  )}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 animate-ping rounded-full bg-copper/40 [animation-duration:2.6s]"
                  />
                  <span className="relative">{h.n}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <ol className="divide-y divide-line">
              {hotspots.map((h, i) => (
                <li
                  key={h.n}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className={cn(
                    "flex gap-4 rounded-xl px-3 py-3.5 transition-colors duration-300 ease-soft",
                    active === i && "bg-mist",
                  )}
                >
                  <span className="w-9 shrink-0 pt-0.5 font-display text-[22px] leading-none text-copper-bright">
                    {String(h.n).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[18px] leading-tight font-medium tracking-[-0.01em] text-teal">
                      {h.title}
                    </h3>
                    <p className="mt-0.5 text-[13px] leading-snug text-ink-soft">{h.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
