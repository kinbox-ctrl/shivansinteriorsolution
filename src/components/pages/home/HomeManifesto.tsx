import { Container, CountUp, Reveal, Section, Sketch } from "@/components/site";
import { MANIFESTO, STATS } from "@/content/home";
import { img } from "@/content/images";
import { cn } from "@/lib/utils";

type PillProps = { src: string; alt: string; className?: string };

/** Small pill-shaped photo that sits beside the manifesto text. */
function Pill({ src, alt, className }: PillProps) {
  return (
    <span
      className={cn(
        "block h-[68px] w-[160px] overflow-hidden rounded-full shadow-soft lg:h-[84px] lg:w-[196px]",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </span>
  );
}

/** Centred manifesto with the two inline pill photos, signature and the stats row. */
export function HomeManifesto() {
  const [wood, handle] = MANIFESTO.pills;

  return (
    <Section tone="cloud" className="overflow-x-clip py-14 lg:py-20">
      <Sketch
        kind="kitchen"
        className="absolute -bottom-2 -left-8 hidden w-[360px] lg:block"
        opacity={0.13}
      />
      <Sketch
        kind="arch"
        className="absolute -right-4 -bottom-8 hidden w-[180px] lg:block"
        opacity={0.16}
      />
      <Sketch
        kind="plant"
        className="absolute right-[13%] bottom-2 hidden w-[64px] xl:block"
        opacity={0.26}
      />

      <Container>
        <Reveal className="grid grid-cols-2 items-center gap-6 lg:grid-cols-[200px_minmax(0,1fr)_200px] lg:gap-10">
          <Pill
            src={img(wood)}
            alt="Walnut wood grain from our workshop"
            className="order-1 justify-self-end lg:order-none lg:justify-self-start"
          />
          <div className="order-3 col-span-2 text-center lg:order-none lg:col-span-1">
            <p className="mx-auto max-w-[760px] font-display text-[26px] leading-[1.2] font-normal tracking-[-0.015em] text-ink text-balance sm:text-[34px] lg:text-[44px] lg:leading-[1.16] xl:text-[46px]">
              {MANIFESTO.text}
            </p>
            <span aria-hidden className="mx-auto mt-6 block h-[2px] w-10 bg-copper-bright" />
            <p className="mt-3 text-[12px] font-medium text-ink-soft">{MANIFESTO.signature}</p>
          </div>
          <Pill
            src={img(handle)}
            alt="Copper handle on a marble surface"
            className="order-2 justify-self-start lg:order-none lg:justify-self-end"
          />
        </Reveal>

        <dl className="mt-14 grid grid-cols-2 gap-y-10 lg:mt-16 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 70} className="px-3 text-center lg:px-8">
              <dd className="font-display text-[44px] leading-none font-medium tracking-[-0.02em] text-copper-bright lg:text-[64px]">
                {stat.number !== undefined ? (
                  <CountUp to={stat.number} suffix={stat.suffix ?? ""} duration={1600} />
                ) : (
                  stat.value
                )}
              </dd>
              <dt className="mt-3 text-[11px] font-semibold tracking-[0.24em] text-ink-soft uppercase">
                {stat.label}
              </dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
