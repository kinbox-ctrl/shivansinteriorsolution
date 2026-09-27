import { Check, CheckCheck } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button, Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import { img } from "@/content/images";
import { BUILD_STEPS, HOW_WE_BUILD_PAGE, type BuildStep } from "@/content/process";
import { getLenis, prefersReducedMotion } from "@/lib/scroll";
import { useInView } from "@/lib/use-reveal";
import { cn } from "@/lib/utils";

/** Header (14px ruler + 76px glass bar) plus breathing room. */
const STICKY_TOP = 112;
/** Each stacked card sits this much lower than the previous one so their top edges show. */
const STACK_GAP = 14;

const noop = () => () => {};

/** SSR-safe reduced-motion flag: the server (and hydration) snapshot treats motion as reduced. */
function useReducedMotion(): boolean {
  return useSyncExternalStore(noop, prefersReducedMotion, () => true);
}

function Callout({ text }: { text: string }) {
  return (
    <div className="absolute right-4 bottom-5 flex items-center sm:right-5 sm:bottom-6">
      <span aria-hidden className="size-2 rounded-full bg-copper" />
      <span aria-hidden className="h-px w-8 bg-copper sm:w-12" />
      <span className="max-w-[160px] rounded-xl bg-white px-3.5 py-2.5 text-[12.5px] leading-snug font-medium text-ink shadow-soft">
        {text}
      </span>
    </div>
  );
}

/** WhatsApp-style progress bubble: typing dots for 800ms once in view, then the message. */
function ChatBubble({ src, alt, text }: { src: string; alt: string; text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.4 });
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(false);

  useEffect(() => {
    if (!inView) return undefined;
    const t = window.setTimeout(() => setElapsed(true), 800);
    return () => window.clearTimeout(t);
  }, [inView]);

  const typing = !reduced && !elapsed;

  return (
    <div ref={ref} className="absolute inset-x-4 bottom-4 sm:right-auto sm:left-5 sm:w-[250px]">
      <div
        className={cn(
          "rounded-2xl rounded-bl-md bg-white shadow-lift transition-[width,padding] duration-500 ease-soft",
          typing ? "inline-block px-4 py-3" : "p-2.5",
        )}
        aria-live="polite"
      >
        {typing ? (
          <span className="hwb-typing flex items-center gap-1" aria-label="Typing">
            <span className="size-1.5 rounded-full bg-ink-soft" />
            <span className="size-1.5 rounded-full bg-ink-soft" />
            <span className="size-1.5 rounded-full bg-ink-soft" />
          </span>
        ) : (
          <>
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="h-24 w-full rounded-lg object-cover"
            />
            <div className="mt-2 flex items-end justify-between gap-3 px-0.5">
              <p className="text-[13px] leading-snug font-medium text-ink">{text}</p>
              <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] text-ink-soft">
                10:42
                <CheckCheck aria-hidden className="size-3.5 text-teal" strokeWidth={1.5} />
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StepCard({
  step,
  index,
  behind,
  cardRef,
}: {
  step: BuildStep;
  index: number;
  behind: boolean;
  cardRef: (el: HTMLElement | null) => void;
}) {
  const photo = img(step.image);
  return (
    <article
      ref={cardRef}
      id={`step-${step.n}`}
      data-step={index}
      aria-labelledby={`step-${step.n}-title`}
      className={cn(
        "hwb-card grid overflow-hidden rounded-3xl border border-line bg-white shadow-lift lg:origin-top lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]",
        behind && "lg:scale-[0.965] lg:opacity-70",
      )}
    >
      <div className="p-7 sm:p-9 lg:p-11 lg:pr-8">
        <span className="font-display text-[22px] leading-none text-copper">{step.n}</span>
        <h3
          id={`step-${step.n}-title`}
          className="mt-3 font-display text-[28px] leading-[1.08] font-medium tracking-[-0.02em] text-teal lg:text-[34px]"
        >
          {step.title}
        </h3>
        <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ink-soft">{step.text}</p>
        <ul className="mt-6 space-y-2.5">
          {step.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-ink">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" strokeWidth={2} />
              {item}
            </li>
          ))}
        </ul>
        <Button to={step.ctaTo} arrow className="mt-8">
          {step.ctaLabel}
        </Button>
      </div>
      <div className="relative m-3 mt-0 aspect-[16/11] overflow-hidden rounded-2xl sm:m-4 sm:mt-0 lg:m-4 lg:ml-0 lg:aspect-auto lg:min-h-[420px]">
        <img
          src={photo}
          alt={`${step.title}: ${step.text}`}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {step.photoNote && <Callout text={step.photoNote} />}
        {step.chatBubble && (
          <ChatBubble src={photo} alt="Site photo shared on WhatsApp" text={step.chatBubble} />
        )}
      </div>
    </article>
  );
}

export function ProcessSteps() {
  const copy = HOW_WE_BUILD_PAGE.process;
  const [active, setActive] = useState(0);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const markers = useRef<(HTMLDivElement | null)[]>([]);
  const total = BUILD_STEPS.length;

  useEffect(() => {
    const els = cards.current.filter((el): el is HTMLElement => el !== null);
    if (!els.length || typeof IntersectionObserver === "undefined") return undefined;
    const visible = new Set<number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const i = Number((entry.target as HTMLElement).dataset["step"]);
          if (entry.isIntersecting) visible.add(i);
          else visible.delete(i);
        }
        if (visible.size) setActive(Math.max(...visible));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    const marker = markers.current[i];
    if (!marker) return;
    const y = marker.getBoundingClientRect().top + window.scrollY - (STICKY_TOP + i * STACK_GAP);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  const fill = `${((active + 0.5) / total) * 100}%`;

  return (
    <Section tone="cloud" id="process">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
          <Reveal className="lg:sticky lg:top-[120px] lg:self-start">
            <Eyebrow className="mb-4">{copy.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg">
              {copy.title}
            </Heading>
            <p className="mt-4 max-w-[280px] text-[16px] leading-relaxed text-ink-soft">
              {copy.text}
            </p>
            <nav aria-label="Process steps" className="relative mt-8 hidden lg:block">
              <span
                aria-hidden
                className="absolute top-2 bottom-2 left-[5px] w-px bg-line-strong"
              />
              <span
                aria-hidden
                className="hwb-fill absolute top-2 left-[5px] w-px bg-copper"
                style={{ height: fill, maxHeight: "calc(100% - 1rem)" }}
              />
              <ol className="relative">
                {BUILD_STEPS.map((step, i) => {
                  const on = i === active;
                  return (
                    <li key={step.n}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={on ? "step" : undefined}
                        className={cn(
                          "group flex w-full items-center gap-4 rounded-md py-1.5 text-left text-[15px] transition-colors duration-300 ease-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
                          on ? "font-semibold text-teal" : "text-ink-soft hover:text-teal",
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "relative size-[11px] shrink-0 rounded-full border transition-[background-color,border-color,transform] duration-300 ease-soft",
                            on
                              ? "scale-110 border-copper bg-copper"
                              : "border-line-strong bg-cloud group-hover:border-copper",
                          )}
                        />
                        <span className="w-6 shrink-0 font-mono text-[13px] text-copper">
                          {step.n}
                        </span>
                        <span>{step.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </Reveal>

          <div className="relative">
            {BUILD_STEPS.map((step, i) => (
              <div key={step.n} className={cn(i > 0 && "mt-6 lg:mt-8")}>
                <div
                  aria-hidden
                  ref={(el) => {
                    markers.current[i] = el;
                  }}
                />
                <Reveal
                  y={32}
                  className="lg:sticky"
                  style={{ top: `${STICKY_TOP + i * STACK_GAP}px` }}
                >
                  <StepCard
                    step={step}
                    index={i}
                    behind={i < active}
                    cardRef={(el) => {
                      cards.current[i] = el;
                    }}
                  />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
