import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Container, Eyebrow, Reveal, Section } from "@/components/site";
import { img } from "@/content/images";
import { TESTIMONIALS, TESTIMONIALS_SECTION } from "@/content/testimonials";
import { prefersReducedMotion } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const INTERVAL = 7000;

const pad = (n: number) => String(n).padStart(2, "0");

function NavButton({ dir, onClick, label }: { dir: -1 | 1; onClick: () => void; label: string }) {
  const Icon = dir === -1 ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-line-strong bg-white text-teal transition-[background-color,color] duration-300 ease-soft hover:bg-teal hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
    >
      <Icon className="size-4" strokeWidth={1.5} aria-hidden />
    </button>
  );
}

/** "Client stories": one large quote at a time, auto-advancing every 7s, paused on hover/focus. */
export function HomeTestimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    if (paused || count < 2 || prefersReducedMotion()) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const current = TESTIMONIALS[index] ?? TESTIMONIALS[0];
  if (!current) return null;

  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + count) % count);

  return (
    <Section tone="linen" jali className="overflow-x-clip">
      <Container>
        <Reveal
          role="region"
          aria-roledescription="carousel"
          aria-label="Client stories"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="grid gap-8 lg:grid-cols-[170px_minmax(0,300px)_minmax(0,1fr)] lg:gap-12"
        >
          <Eyebrow className="self-start">{TESTIMONIALS_SECTION.eyebrow}</Eyebrow>

          <div className="relative aspect-[16/10] w-full max-w-[420px] overflow-hidden rounded-2xl bg-mist shadow-soft">
            {TESTIMONIALS.map((item, i) => (
              <img
                key={item.name}
                src={img(item.image)}
                alt={i === index ? `${item.project} for ${item.name} in ${item.town}` : ""}
                loading="lazy"
                decoding="async"
                aria-hidden={i !== index}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-soft",
                  i === index ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>

          <div>
            <figure
              key={index}
              className="animate-in fade-in slide-in-from-bottom-2 duration-500 ease-soft"
            >
              <blockquote className="relative pl-10 lg:pl-12">
                <span
                  aria-hidden
                  className="absolute -top-3 left-0 font-display text-[60px] leading-none text-copper-bright/70"
                >
                  “
                </span>
                <p className="font-display text-[22px] leading-[1.3] text-ink sm:text-[26px] lg:text-[28px]">
                  {current.quote}
                </p>
              </blockquote>
              <figcaption className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-3 pl-10 lg:pl-12">
                <div>
                  <p className="text-[15px] font-semibold text-ink">{current.name}</p>
                  <p className="text-[13px] text-ink-soft">
                    {current.town} · {current.project}
                  </p>
                </div>
                <span
                  className="flex items-center gap-0.5 text-copper"
                  role="img"
                  aria-label={`${current.rating} out of 5 stars`}
                >
                  {Array.from({ length: current.rating }, (_, i) => (
                    <Star key={i} className="size-4 fill-current" strokeWidth={1.5} aria-hidden />
                  ))}
                </span>
              </figcaption>
            </figure>

            <div className="mt-8 flex items-center gap-4 pl-10 lg:pl-12">
              <span className="font-mono text-[12px] text-copper">{pad(index + 1)}</span>
              <div className="relative h-px w-full max-w-[220px] bg-line-strong">
                <span
                  className="absolute inset-y-0 left-0 bg-copper transition-[width] duration-500 ease-soft"
                  style={{ width: `${((index + 1) / count) * 100}%` }}
                />
              </div>
              <span className="font-mono text-[12px] text-ink-soft">{pad(count)}</span>
              <div className="ml-auto flex gap-2">
                <NavButton dir={-1} onClick={() => go(-1)} label="Previous story" />
                <NavButton dir={1} onClick={() => go(1)} label="Next story" />
              </div>
            </div>
            <p className="sr-only" aria-live="polite">
              Story {index + 1} of {count}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
