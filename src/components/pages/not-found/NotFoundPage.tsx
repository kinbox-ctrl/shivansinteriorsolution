import { ArrowRight, Home, LayoutGrid } from "lucide-react";
import { Button, Container, HandNote, Heading, Reveal, Section } from "@/components/site";
import { NOT_FOUND } from "@/content/home";
import { img } from "@/content/images";
import { WHATSAPP_DEFAULT } from "@/content/site";
import { Compass } from "./Compass";

const HOME_BUTTON_ID = "nf-back-home";

/** Handwritten margin notes (page-local: src/content is read-only for this page). */
const NOTES = {
  left: "Some beautiful spaces are still in progress.",
  right: "Good design always finds a way.",
  compass: "Let’s head home?",
} as const;

/** Typographic apostrophe for the Fraunces heading ("isn’t", as in the render). */
const smartQuotes = (text: string) => text.replace(/'/g, "’");

/*
 * Page-local motion: the room drawing "draws itself" (a left-to-right clip wipe) and the compass
 * needle wobbles before settling on `--nf-angle`, which <Compass> points at the Back-to-home
 * button. The global `prefers-reduced-motion` rules in styles.css collapse both animations to
 * their final frame, so SSR / reduced-motion visitors see the finished drawing and a still needle.
 */
const MOTION_CSS = `
@keyframes nf-draw {
  from { clip-path: inset(0 100% 0 0); opacity: 0.6; }
  to { clip-path: inset(0 -2% 0 0); opacity: 1; }
}
@keyframes nf-needle {
  0% { transform: rotate(calc(var(--nf-angle) + 150deg)); }
  38% { transform: rotate(calc(var(--nf-angle) - 25deg)); }
  62% { transform: rotate(calc(var(--nf-angle) + 13deg)); }
  82% { transform: rotate(calc(var(--nf-angle) - 5deg)); }
  100% { transform: rotate(var(--nf-angle)); }
}
.nf-room {
  animation: nf-draw 1.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.nf-needle {
  transform-box: view-box;
  transform-origin: 60px 60px;
  transform: rotate(var(--nf-angle));
  animation: nf-needle 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.9s both;
}
`;

function splitText(text: string): [string, string] {
  const i = text.indexOf(", ");
  if (i === -1) return [text, ""];
  return [text.slice(0, i + 1), text.slice(i + 2)];
}

/** 404 — "This room isn't built yet." One full-height cloud section on faint grid paper. */
export function NotFoundPage() {
  const [line1, line2] = splitText(NOT_FOUND.text);

  return (
    <Section
      grid
      flush
      aria-labelledby="nf-title"
      className="flex min-h-[calc(100svh-84px)] flex-col justify-center overflow-hidden pt-8 pb-24 sm:pt-10 md:pb-16 lg:pt-6 lg:pb-14"
    >
      <title>Page not found — Shivansh Interior Solutions</title>
      <meta name="robots" content="noindex" />
      <style href="nf-motion" precedence="default">
        {MOTION_CSS}
      </style>

      <Container className="relative z-10">
        {/* Drawing ------------------------------------------------------------------ */}
        <div className="relative">
          {/* side sketches: plant at the left edge, ladder at the right edge (md+) */}
          <img
            src={img("sketch-plant-404")}
            alt=""
            aria-hidden
            width={564}
            height={720}
            className="pointer-events-none absolute bottom-[-6%] left-0 z-0 hidden w-[19%] max-w-[300px] -translate-x-[35%] opacity-90 mix-blend-multiply select-none md:block lg:-translate-x-[30%]"
          />
          <img
            src={img("sketch-ladder-404")}
            alt=""
            aria-hidden
            width={573}
            height={840}
            className="pointer-events-none absolute right-0 bottom-[-4%] z-0 hidden w-[15%] max-w-[240px] translate-x-[30%] opacity-90 mix-blend-multiply select-none md:block lg:translate-x-[25%]"
          />

          <Reveal className="relative w-[135%] max-w-none -ml-[17.5%] sm:mx-auto sm:w-full sm:max-w-[1080px] md:w-[80%] lg:w-[74%]">
            <img
              src={img("sketch-room-404")}
              alt={`Line drawing of an empty room, the numerals 404 hatched on the far wall with a ${NOT_FOUND.dimension} dimension line above them`}
              width={1018}
              height={509}
              fetchPriority="high"
              className="nf-room h-auto w-full mix-blend-multiply"
            />

            {/* handwritten notes either side of the drawing (xl+, where they clear the sketches) */}
            <HandNote
              arrow="down-right"
              rotate={-6}
              className="absolute top-[6%] left-0 hidden w-[130px] -translate-x-[112%] flex-col items-end gap-0 text-right xl:inline-flex [&>svg]:size-12"
            >
              {NOTES.left}
            </HandNote>
            <HandNote
              arrow="down-left"
              rotate={6}
              className="absolute top-[10%] right-0 hidden w-[130px] translate-x-[112%] flex-col-reverse items-start gap-0 xl:inline-flex [&>svg]:size-12"
            >
              {NOTES.right}
            </HandNote>
          </Reveal>
        </div>

        {/* Copy --------------------------------------------------------------------- */}
        <div className="relative mt-6 sm:mt-8 lg:-mt-8">
          <Reveal delay={140} className="mx-auto max-w-[760px] text-center">
            <Heading as="h1" size="xl" id="nf-title" className="text-balance">
              {smartQuotes(NOT_FOUND.title)}
            </Heading>
            <p className="mx-auto mt-4 max-w-[560px] text-[18px] leading-[1.45] text-ink sm:text-[20px] lg:mt-5 lg:text-[23px]">
              {line1}
              {line2 && (
                <>
                  <br className="hidden sm:block" /> {line2}
                </>
              )}
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5 lg:mt-8">
              <Button
                id={HOME_BUTTON_ID}
                to="/"
                variant="primary"
                size="lg"
                arrow
                icon={<Home strokeWidth={1.5} aria-hidden />}
                className="w-full max-w-[300px] sm:w-auto sm:min-w-[240px]"
              >
                {NOT_FOUND.primary}
              </Button>
              <Button
                to="/projects"
                variant="secondary"
                size="lg"
                icon={<LayoutGrid strokeWidth={1.5} aria-hidden />}
                className="w-full max-w-[300px] sm:w-auto sm:min-w-[240px]"
              >
                {NOT_FOUND.secondary}
              </Button>
            </div>

            <a
              href={WHATSAPP_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 rounded-sm text-[16px] font-semibold text-teal underline decoration-teal/60 underline-offset-[6px] transition-colors duration-300 ease-soft hover:text-copper hover:decoration-copper/70 lg:text-[17px]"
            >
              {NOT_FOUND.link}
              <ArrowRight
                strokeWidth={1.5}
                aria-hidden
                className="size-[18px] transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
              />
            </a>
          </Reveal>

          {/* Compass + "Let's head home?" ------------------------------------------- */}
          <Reveal
            delay={280}
            className="mt-10 flex items-start justify-center gap-2 xl:absolute xl:right-[5%] xl:bottom-0 xl:mt-0"
          >
            <Compass targetId={HOME_BUTTON_ID} className="mt-3" />
            <HandNote arrow="down-left" rotate={-4} className="w-[140px] -translate-y-1">
              {NOTES.compass}
            </HandNote>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
