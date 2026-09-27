import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  BeforeAfterSlider,
  Container,
  Eyebrow,
  Heading,
  PhotoPanel,
  Reveal,
  Section,
} from "@/components/site";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { CASE_STUDY_COPY } from "./copy";
import { projectImg } from "./images";

const ROUND_BUTTON =
  "flex size-10 items-center justify-center rounded-full border border-line-strong bg-white text-teal shadow-soft transition-[background-color,color,transform] duration-300 ease-soft hover:-translate-y-px hover:bg-teal hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper disabled:pointer-events-none disabled:opacity-40";

/**
 * Before / after: heading + prev/next on the left, the slider on the right. The round buttons
 * snap the handle to the "before" (100%) or "after" (0%) side by remounting the slider with a
 * new starting position; dragging / arrow keys on the slider itself still work in between.
 */
export function ProjectBeforeAfter({ project }: { project: Project }) {
  const copy = CASE_STUDY_COPY.beforeAfter;
  const [snap, setSnap] = useState<{ pos: number; n: number }>({ pos: 50, n: 0 });
  const hasBefore = project.before !== null;
  const after = {
    src: projectImg(project.after),
    alt: `${project.title}, after the makeover`,
    label: copy.afterLabel,
  };

  return (
    <Section id="before-after" tone="white">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center lg:gap-14">
        <Reveal>
          <Eyebrow className="mb-5">{copy.eyebrow}</Eyebrow>
          <Heading as="h2" size="lg" className="max-w-[12ch]">
            {copy.heading}
          </Heading>
          {hasBefore && (
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                className={cn(ROUND_BUTTON)}
                aria-label={copy.showBefore}
                onClick={() => setSnap((s) => ({ pos: 100, n: s.n + 1 }))}
              >
                <ChevronLeft className="size-4" strokeWidth={1.5} aria-hidden />
              </button>
              <button
                type="button"
                className={cn(ROUND_BUTTON)}
                aria-label={copy.showAfter}
                onClick={() => setSnap((s) => ({ pos: 0, n: s.n + 1 }))}
              >
                <ChevronRight className="size-4" strokeWidth={1.5} aria-hidden />
              </button>
            </div>
          )}
        </Reveal>

        <Reveal delay={120} y={32}>
          {project.before ? (
            <BeforeAfterSlider
              key={snap.n}
              initial={snap.pos}
              before={{
                src: projectImg(project.before),
                alt: `${project.title}, before the makeover`,
                label: copy.beforeLabel,
              }}
              after={after}
              aspect="16/9"
              radius="lg"
              ariaLabel={`Compare ${project.title} before and after`}
            />
          ) : (
            <PhotoPanel src={after.src} alt={after.alt} radius="lg" aspect="16/9">
              <span className="glass absolute bottom-4 left-4 rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] text-teal uppercase">
                {copy.noBefore}
              </span>
              <span className="glass absolute right-4 bottom-4 rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] text-teal uppercase">
                {copy.afterLabel}
              </span>
            </PhotoPanel>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
