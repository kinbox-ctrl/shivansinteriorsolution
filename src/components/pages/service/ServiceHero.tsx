import { Link } from "@tanstack/react-router";
import { Check, Lightbulb } from "lucide-react";
import { useState } from "react";
import {
  Button,
  Container,
  Eyebrow,
  Heading,
  PhotoPanel,
  Reveal,
  Section,
  Sketch,
  VerticalRuler,
} from "@/components/site";
import { img } from "@/content/images";
import type { Service, ServiceCallout } from "@/content/services";
import { cn } from "@/lib/utils";
import { iconFor } from "./icons";
import { ctaTarget, heroWhatsAppHref } from "./links";

/** Hidden-until-revealed states only apply once `html.js` is set, like the shared reveal system. */
const PENDING = "[html.js_.callouts:not(.is-in)_&]";

function Callout({ callout, index }: { callout: ServiceCallout; index: number }) {
  const flip = callout.x > 55;
  const delay = 200 + index * 200;
  return (
    <div
      className="absolute [--lead:40px] sm:[--lead:64px]"
      style={{ left: `${callout.x}%`, top: `${callout.y}%` }}
    >
      <span
        aria-hidden
        className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper-bright ring-4 ring-white/70"
      />
      <svg
        aria-hidden
        viewBox="0 0 64 40"
        preserveAspectRatio="none"
        fill="none"
        className={cn(
          "absolute top-[-40px] hidden h-10 overflow-visible sm:block",
          flip ? "right-0" : "left-0",
        )}
        style={{ width: "var(--lead)" }}
      >
        <path
          d={flip ? "M64 40C40 40 24 0 0 0" : "M0 40C24 40 40 0 64 0"}
          stroke="var(--copper-bright)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          pathLength={100}
          strokeDasharray={100}
          className={cn(
            "[stroke-dashoffset:0] [transition:stroke-dashoffset_0.6s_var(--ease-soft)]",
            `${PENDING}:[stroke-dashoffset:100]`,
          )}
          style={{ transitionDelay: `${delay}ms` }}
        />
      </svg>
      <span
        className={cn(
          "glass absolute top-[-40px] hidden -translate-y-1/2 items-center sm:flex gap-2 rounded-full py-2 pr-3.5 pl-2 text-[12px] font-semibold whitespace-nowrap text-ink shadow-soft sm:text-[13px]",
          "transition-[opacity,translate] duration-500 ease-soft",
          flip ? "right-[var(--lead)]" : "left-[var(--lead)]",
          `${PENDING}:opacity-0`,
          flip ? `${PENDING}:translate-x-2` : `${PENDING}:-translate-x-2`,
        )}
        style={{ transitionDelay: `${delay + 300}ms` }}
      >
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-copper text-white">
          <Check className="size-3" strokeWidth={2.2} aria-hidden />
        </span>
        {callout.label}
      </span>
    </div>
  );
}

function FactChips({ chips }: { chips: Service["factChips"] }) {
  return (
    <div className="mt-9 grid grid-cols-1 divide-y divide-line rounded-2xl border border-line bg-white shadow-soft sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {chips.map((chip) => {
        const Icon = iconFor(chip.icon);
        const from = chip.label.startsWith("From ");
        const value = from ? chip.label.slice(5) : chip.label;
        return (
          <div key={chip.label} className="flex items-center gap-3 px-4 py-3.5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-teal">
              <Icon className="size-[18px]" strokeWidth={1.5} aria-hidden />
            </span>
            <div className="min-w-0">
              {from ? (
                <>
                  <span className="block text-[11px] leading-none text-ink-soft">From</span>
                  <span className="mt-1 block font-display text-[19px] leading-none text-teal">
                    {value}
                  </span>
                </>
              ) : (
                <span className="block text-[14px] leading-tight font-semibold text-ink">
                  {value}
                </span>
              )}
              <span className="mt-0.5 block text-[12px] leading-tight text-ink-soft">
                {chip.sub}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ServiceHero({ service }: { service: Service }) {
  const [lightsOn, setLightsOn] = useState(true);
  const dimmed = service.lightsToggle && !lightsOn;

  return (
    <Section wash flush className="overflow-hidden pt-6 pb-14 lg:pt-8 lg:pb-20">
      <VerticalRuler />
      <Sketch
        kind="plant"
        className="absolute bottom-0 left-2 hidden w-28 lg:block"
        opacity={0.35}
      />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 text-[13px] text-ink-soft lg:mb-10">
          <Link to="/services" className="transition-colors hover:text-teal">
            Services
          </Link>
          <span aria-hidden className="mx-2 text-line-strong">
            /
          </span>
          <span className="text-ink">{service.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-12">
          <Reveal>
            <Eyebrow className="mb-5">{service.title}</Eyebrow>
            <Heading as="h1" size="xl">
              {service.headlineLead} <em>{service.headlineEm}</em>
            </Heading>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink-soft lg:text-[18px]">
              {service.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={ctaTarget(service.heroPrimary)} size="lg" arrow>
                {service.heroPrimary}
              </Button>
              <Button variant="secondary" size="lg" href={heroWhatsAppHref(service)}>
                {service.heroSecondary}
              </Button>
            </div>
            <FactChips chips={service.factChips} />
          </Reveal>

          <Reveal delay={140} className="callouts relative">
            <PhotoPanel
              src={img(service.heroImage)}
              alt={`${service.title} by Shivansh Interior Solutions`}
              radius="xl"
              aspect="3/2"
              loading="eager"
              fetchPriority="high"
              imgClassName={cn(
                "transition-[filter] duration-700 ease-soft",
                dimmed && "brightness-[0.45] saturate-[0.8]",
              )}
            >
              {service.lightsToggle && (
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(255,196,120,0.45),transparent_70%)] transition-opacity duration-700 ease-soft",
                    lightsOn ? "opacity-100" : "opacity-0",
                  )}
                />
              )}
              {service.callouts.map((callout, i) => (
                <Callout key={callout.label} callout={callout} index={i} />
              ))}
              {service.lightsToggle && (
                <button
                  type="button"
                  role="switch"
                  aria-checked={lightsOn}
                  onClick={() => setLightsOn((v) => !v)}
                  className="glass absolute top-4 right-4 flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-2 text-[12px] font-semibold text-teal shadow-soft transition-colors hover:bg-white"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-5 w-9 items-center rounded-full p-0.5 transition-colors duration-300",
                      lightsOn ? "bg-copper" : "bg-line-strong",
                    )}
                  >
                    <span
                      className={cn(
                        "size-4 rounded-full bg-white shadow-sm transition-transform duration-300 ease-soft",
                        lightsOn && "translate-x-4",
                      )}
                    />
                  </span>
                  <Lightbulb className="size-4" strokeWidth={1.5} aria-hidden />
                  Lights {lightsOn ? "ON" : "OFF"}
                </button>
              )}
            </PhotoPanel>
            <ul className="mt-4 flex flex-wrap gap-2 sm:hidden">
              {service.callouts.map((callout) => (
                <li
                  key={callout.label}
                  className="flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pr-3 pl-1.5 text-[12px] font-semibold text-ink shadow-soft"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-copper text-white">
                    <Check className="size-3" strokeWidth={2.2} aria-hidden />
                  </span>
                  {callout.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
