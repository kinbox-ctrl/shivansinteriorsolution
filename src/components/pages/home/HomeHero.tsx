import { useState } from "react";
import { Button, Eyebrow, Heading, PhotoPanel, Sketch, VerticalRuler } from "@/components/site";
import { HOME_HERO } from "@/content/home";
import { img } from "@/content/images";
import { WHATSAPP_DEFAULT } from "@/content/site";
import { cn } from "@/lib/utils";

const GLOW =
  "radial-gradient(60% 46% at 50% 0%, rgba(255, 196, 120, 0.34) 0%, rgba(255, 196, 120, 0) 100%)";

type LightsChipProps = { on: boolean; onToggle: () => void };

/** White glass chip with a copper switch: dims the cove lights in the hero photo. */
function LightsChip({ on, onToggle }: LightsChipProps) {
  const { label, caption } = HOME_HERO.lightsChip;
  const offLabel = label.replace(/ON$/, "OFF");
  return (
    <div className="glass absolute bottom-4 left-4 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl px-4 py-3 shadow-soft">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={`${label}. ${caption}`}
        onClick={onToggle}
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ease-soft",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
          on ? "bg-copper" : "bg-ink-soft/45",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute top-1 left-1 size-5 rounded-full bg-white shadow-[0_1px_3px_rgba(15,46,48,0.3)] transition-transform duration-300 ease-soft",
            on && "translate-x-5",
          )}
        />
      </button>
      <span className="min-w-0">
        <span className="block text-[15px] leading-tight font-semibold text-ink">
          {on ? label : offLabel}
        </span>
        <span className="mt-0.5 block truncate text-[12px] leading-snug text-ink-soft">
          {on ? caption : "Switch the cove lights back on"}
        </span>
      </span>
    </div>
  );
}

/** Split hero: headline on the cloud wash, photo panel bleeding off the right edge. */
export function HomeHero() {
  const [lightsOn, setLightsOn] = useState(true);

  return (
    <section className="wash relative overflow-x-clip bg-cloud">
      <VerticalRuler />
      <Sketch
        kind="jali"
        className="absolute bottom-2 left-[3%] hidden w-[220px] lg:block"
        opacity={0.14}
      />
      <Sketch
        kind="plant"
        className="absolute bottom-6 left-10 hidden w-[72px] xl:block"
        opacity={0.28}
      />

      <div
        className={cn(
          "relative mx-auto grid w-full max-w-[1320px] items-center gap-10 px-5 pt-10 pb-12 sm:px-8",
          "lg:max-w-none lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-12 lg:py-14 lg:pr-0",
          "lg:pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]",
        )}
      >
        <div className="max-w-[640px]">
          <Eyebrow className="mb-6">{HOME_HERO.eyebrow}</Eyebrow>
          <Heading
            as="h1"
            size="display"
            tone="teal"
            className="text-[40px] sm:text-[58px] lg:text-[74px] xl:text-[84px]"
          >
            <span className="block">{HOME_HERO.headlineLead}</span>
            <em className="block">{HOME_HERO.headlineEm}</em>
          </Heading>
          <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-ink lg:text-[20px]">
            {HOME_HERO.sub}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-10">
            <Button
              variant="whatsapp"
              size="lg"
              arrow
              href={WHATSAPP_DEFAULT}
              className="w-full sm:w-auto"
            >
              {HOME_HERO.primary}
            </Button>
            <Button variant="secondary" size="lg" to="/projects" className="w-full sm:w-auto">
              {HOME_HERO.secondary}
            </Button>
          </div>
        </div>

        <div className="relative lg:pr-5">
          <PhotoPanel
            src={img(HOME_HERO.image)}
            alt="Bright living room with a walnut slat TV wall, teal sofa, copper coffee table and a glowing cove ceiling"
            radius="xl"
            offset="mist"
            aspect="16/10"
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 52vw, 100vw"
            imgClassName={cn(
              "transition-[filter] duration-[600ms] ease-soft",
              !lightsOn && "brightness-[0.68] saturate-[0.8]",
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 transition-opacity duration-[600ms] ease-soft"
              style={{ background: GLOW, opacity: lightsOn ? 1 : 0 }}
            />
            <LightsChip on={lightsOn} onToggle={() => setLightsOn((v) => !v)} />
          </PhotoPanel>
        </div>
      </div>
    </section>
  );
}
