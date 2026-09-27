import { Maximize2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { CASE_STUDY_COPY } from "./copy";
import { projectImg } from "./images";
import type { LightboxImage } from "./ProjectPage";

export type ProjectDrawingsProps = {
  project: Project;
  onOpen: (image: LightboxImage) => void;
};

/**
 * "From drawing to reality": the drawings as white cards on a snap rail (a 3-up grid from lg).
 * Dots track the visible card on small screens and scroll the rail; each card opens the lightbox.
 */
export function ProjectDrawings({ project, onOpen }: ProjectDrawingsProps) {
  const copy = CASE_STUDY_COPY.drawings;
  const railRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const count = project.drawings.length;

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => {
      const first = rail.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + 16;
      setActive(Math.min(count - 1, Math.max(0, Math.round(rail.scrollLeft / step))));
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, [count]);

  const goTo = useCallback((index: number) => {
    const rail = railRef.current;
    const card = rail?.children[index] as HTMLElement | undefined;
    setActive(index);
    if (!rail || !card) return;
    rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: "smooth" });
  }, []);

  return (
    <Section id="drawings" grid>
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:items-center lg:gap-14">
        <Reveal>
          <Eyebrow className="mb-5">{copy.eyebrow}</Eyebrow>
          <Heading as="h2" size="lg" className="max-w-[10ch]">
            {copy.heading}
          </Heading>
          <p className="mt-5 max-w-[26ch] text-[16px] leading-relaxed text-ink-soft">{copy.text}</p>
        </Reveal>

        <Reveal delay={120} className="min-w-0">
          <ul
            ref={railRef}
            className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0"
            aria-label={copy.eyebrow}
          >
            {project.drawings.map((drawing, i) => {
              const alt = `${project.title}: ${drawing.label.toLowerCase()}`;
              // Line drawings are shown whole on the grid paper; only the photo-like render fills the box.
              const isRender = /render/i.test(drawing.label);
              return (
                <li
                  key={drawing.n}
                  className="w-[82%] shrink-0 snap-start sm:w-[62%] lg:w-auto"
                  style={{ "--reveal-delay": `${120 + i * 70}ms` } as React.CSSProperties}
                >
                  <button
                    type="button"
                    onClick={() =>
                      onOpen({
                        src: projectImg(drawing.image),
                        alt,
                        caption: `${drawing.n}  ${drawing.label}`,
                      })
                    }
                    aria-label={`${copy.expand}: ${drawing.label}`}
                    className="group/drawing block w-full overflow-hidden rounded-2xl border border-line bg-white text-left shadow-soft transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
                  >
                    <div className="grid-paper relative aspect-[4/3] overflow-hidden bg-mist/40 p-3">
                      <img
                        src={projectImg(drawing.image)}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        className={cn(
                          "h-full w-full rounded-lg transition-transform duration-700 ease-soft group-hover/drawing:scale-[1.03]",
                          isRender ? "object-cover" : "object-contain",
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
                      <span className="font-mono text-[12px] tracking-[0.14em] text-ink uppercase">
                        <span className="mr-3 text-copper">{drawing.n}</span>
                        {drawing.label}
                      </span>
                      <Maximize2
                        aria-hidden
                        className="size-4 shrink-0 text-teal transition-transform duration-300 ease-soft group-hover/drawing:scale-110"
                        strokeWidth={1.5}
                      />
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            className="mt-6 flex items-center justify-center gap-2"
            role="group"
            aria-label="Drawings"
          >
            {project.drawings.map((drawing, i) => (
              <button
                key={drawing.n}
                type="button"
                aria-current={active === i ? "true" : undefined}
                aria-label={`${drawing.n} ${drawing.label}`}
                onClick={() => goTo(i)}
                className={cn(
                  "flex size-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
                )}
              >
                <span
                  className={cn(
                    "block size-2 rounded-full transition-[background-color,transform] duration-300 ease-soft",
                    active === i ? "scale-110 bg-copper" : "bg-line-strong",
                  )}
                />
              </button>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
