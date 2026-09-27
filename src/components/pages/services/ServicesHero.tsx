import type { CSSProperties } from "react";
import {
  Button,
  Container,
  Eyebrow,
  HandNote,
  Heading,
  Reveal,
  Section,
  Sketch,
  VerticalRuler,
} from "@/components/site";
import { img } from "@/content/images";
import { SERVICES_PAGE } from "@/content/services";
import { WHATSAPP_DEFAULT } from "@/content/site";
import { cn } from "@/lib/utils";
import { scrollToService } from "./scroll-to-service";

type Placement = {
  /** Copper dot centre, in % of the 3:2 frame. */
  dot: { x: number; y: number };
  /** White label chip: left/top in % of the frame, width in % of the frame width (cqw). */
  chip: { left: number; top: number; w: number };
};

/**
 * Where each hotspot sits on the isometric render. The harvested `iso-home` image already carries
 * the chips from the reference, so the live chips are laid exactly over them: the image is shown
 * cropped to a 3:2 frame anchored left (its right 9% holds a clipped handwritten note) and every
 * value below is measured on that frame. Labels and target slugs come from
 * `SERVICES_PAGE.hotspots`; a label without a measurement falls back to the content x/y.
 */
const PLACEMENT: Record<string, Placement> = {
  "Ceiling & Lights": { dot: { x: 50.1, y: 15.1 }, chip: { left: 54.7, top: 6.6, w: 19.2 } },
  Wardrobes: { dot: { x: 28.5, y: 29.2 }, chip: { left: 11, top: 25.9, w: 13.6 } },
  "Wall Panels": { dot: { x: 87.8, y: 52.2 }, chip: { left: 90.4, top: 49.1, w: 15.5 } },
  Kitchen: { dot: { x: 31.2, y: 57.9 }, chip: { left: 31.4, top: 62.1, w: 11.4 } },
  "Living Room": { dot: { x: 67.5, y: 74.5 }, chip: { left: 70.4, top: 71.1, w: 16.6 } },
  Flooring: { dot: { x: 46.9, y: 87.8 }, chip: { left: 49.3, top: 84.6, w: 13.1 } },
};

/** Frame height as a share of its width (3:2), used to express vertical offsets in cqw. */
const FRAME_RATIO = 2 / 3;

function placementFor(label: string, index: number): Placement {
  const measured = PLACEMENT[label];
  if (measured) return measured;
  const h = SERVICES_PAGE.hotspots[index];
  const x = h?.x ?? 50;
  const y = h?.y ?? 50;
  return { dot: { x, y }, chip: { left: x + 2.4, top: y - 3.6, w: 0 } };
}

function Hotspot({ label, slug, index }: { label: string; slug: string; index: number }) {
  const { dot, chip } = placementFor(label, index);
  const chipStyle: CSSProperties = {
    left: `${chip.left}%`,
    top: `${chip.top}%`,
    height: "4.9cqw",
    ...(chip.w > 0 ? { width: `${chip.w}cqw` } : {}),
  };
  const dotStyle: CSSProperties = {
    left: `${dot.x - chip.left}cqw`,
    top: `${(dot.y - chip.top) * FRAME_RATIO}cqw`,
    width: "clamp(16px, 3.6cqw, 28px)",
    height: "clamp(16px, 3.6cqw, 28px)",
    animationDelay: `${index * 350}ms`,
  };
  return (
    <button
      type="button"
      onClick={() => scrollToService(slug)}
      aria-label={`${label}: jump to this service`}
      className="group/hot absolute z-10 flex min-h-7 min-w-max items-center justify-center rounded-lg bg-white px-[1.1cqw] text-[clamp(10px,1.95cqw,14px)] font-semibold whitespace-nowrap text-ink shadow-[0_6px_18px_-8px_rgba(15,46,48,0.4)] outline-none transition-[box-shadow,color] duration-300 ease-soft hover:text-teal hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
      style={chipStyle}
    >
      {label}
      {/* copper dot with a pulse ring, anchored on the render */}
      <span aria-hidden className="absolute -translate-x-1/2 -translate-y-1/2" style={dotStyle}>
        <span className="absolute inset-0 animate-ping rounded-full bg-copper-bright/50 [animation-duration:2.4s] [animation-delay:inherit]" />
        <span className="absolute inset-0 rounded-full border-[3px] border-white bg-copper shadow-[0_2px_6px_rgba(15,46,48,0.3)] transition-transform duration-300 ease-soft group-hover/hot:scale-110" />
      </span>
    </button>
  );
}

/** Services overview hero: headline, WhatsApp / projects buttons and the isometric 3BHK render. */
export function ServicesHero() {
  return (
    <Section tone="cloud" wash className="overflow-hidden pt-10 pb-12 lg:pt-12 lg:pb-14">
      <VerticalRuler />
      <Sketch
        kind="plant-large"
        className="absolute -bottom-10 left-2 hidden w-[180px] lg:block"
        opacity={0.35}
      />
      <Sketch
        kind="arch"
        className="absolute -right-6 top-24 hidden w-[200px] lg:block"
        opacity={0.35}
      />
      <Sketch
        kind="jali"
        className="absolute top-2 right-2 hidden w-[90px] lg:block"
        opacity={0.12}
      />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
          <Reveal className="relative">
            <Eyebrow className="mb-5">{SERVICES_PAGE.eyebrow}</Eyebrow>
            <Heading as="h1" size="xl" tone="teal">
              {SERVICES_PAGE.headlineLead}
              <br />
              <em>{SERVICES_PAGE.headlineEm}</em>
            </Heading>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink lg:text-[19px]">
              {SERVICES_PAGE.sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="whatsapp" size="lg" arrow href={WHATSAPP_DEFAULT}>
                {SERVICES_PAGE.primary}
              </Button>
              <Button variant="secondary" size="lg" to="/projects">
                {SERVICES_PAGE.secondary}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={140} className="relative lg:-mr-10">
            <HandNote
              arrow="down-left"
              rotate={-5}
              className="absolute -top-6 right-0 z-10 hidden max-w-[210px] lg:flex"
            >
              {SERVICES_PAGE.handNote}
            </HandNote>
            <div className="relative mr-7 aspect-[3/2] @container sm:mr-0">
              <img
                src={img("iso-home")}
                alt="Isometric cut-away of a 3BHK home showing the kitchen, wardrobes, ceiling lights, wall panels, living room and flooring"
                width={954}
                height={636}
                loading="eager"
                fetchPriority="high"
                className="size-full object-cover object-left [mask-image:radial-gradient(ellipse_76%_74%_at_50%_50%,#000_58%,transparent_100%)]"
              />
              {SERVICES_PAGE.hotspots.map((h, i) => (
                <Hotspot key={h.label} label={h.label} slug={h.slug} index={i} />
              ))}
            </div>
            <HandNote arrow="up-left" rotate={-3} className="mt-2 lg:hidden">
              {SERVICES_PAGE.handNote}
            </HandNote>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
