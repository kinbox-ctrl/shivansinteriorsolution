import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import { img } from "@/content/images";
import { HOME_SERVICES_SECTION, SERVICES, type Service } from "@/content/services";
import { prefersReducedMotion } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const CARD_W = 236;
const CARD_H = 200;
const LERP = 0.12;

function serviceLink(service: Service): LinkProps {
  // Content slugs are plain strings; TanStack's typed `to` wants a literal, so we widen it.
  return { to: "/services/$slug", params: { slug: service.slug } } as unknown as LinkProps;
}

type Motion = { x: number; y: number; tx: number; ty: number; raf: number; shown: boolean };

/** "What we build": numbered 01–06 list with a tilted photo card that follows the cursor. */
export function HomeServices() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);
  const activeRef = useRef<number | null>(null);
  const motion = useRef<Motion>({ x: 0, y: 0, tx: 0, ty: 0, raf: 0, shown: false });
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    enabled.current =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches && !prefersReducedMotion();
    const m = motion.current;
    return () => cancelAnimationFrame(m.raf);
  }, []);

  const tick = () => {
    const m = motion.current;
    const card = cardRef.current;
    if (!card) {
      m.raf = 0;
      return;
    }
    const dx = m.tx - m.x;
    const dy = m.ty - m.y;
    m.x += dx * LERP;
    m.y += dy * LERP;
    const tilt = -6 + Math.max(-7, Math.min(7, dx * 0.05));
    card.style.transform = `translate3d(${m.x - CARD_W / 2 + 56}px, ${m.y - CARD_H / 2}px, 0) rotate(${tilt}deg)`;
    if (activeRef.current !== null || Math.abs(dx) + Math.abs(dy) > 0.4) {
      m.raf = requestAnimationFrame(tick);
    } else {
      m.raf = 0;
    }
  };

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!enabled.current || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const m = motion.current;
    m.tx = e.clientX - rect.left;
    m.ty = e.clientY - rect.top;
    if (!m.shown) {
      m.x = m.tx;
      m.y = m.ty;
      m.shown = true;
    }
    if (!m.raf) m.raf = requestAnimationFrame(tick);
  };

  const enter = (i: number) => {
    if (!enabled.current) return;
    activeRef.current = i;
    setActive(i);
  };

  const leave = () => {
    activeRef.current = null;
    setActive(null);
  };

  const leaveAll = () => {
    leave();
    motion.current.shown = false;
  };

  return (
    <Section tone="white" className="overflow-x-clip border-y border-line">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.9fr)] lg:gap-16">
          <Reveal>
            <Eyebrow className="mb-5">{HOME_SERVICES_SECTION.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg" className="max-w-[11ch]">
              {HOME_SERVICES_SECTION.title}
            </Heading>
          </Reveal>

          {/* Desktop: two-column numbered list with the cursor card. */}
          <div
            ref={wrapRef}
            onPointerMove={onMove}
            onPointerLeave={leaveAll}
            className="relative hidden lg:block"
          >
            <Reveal
              as="ol"
              delay={100}
              className="grid lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-3 lg:gap-x-12"
            >
              {SERVICES.map((service, i) => (
                <li key={service.slug}>
                  <Link
                    {...serviceLink(service)}
                    onPointerEnter={() => enter(i)}
                    onPointerLeave={leave}
                    onFocus={() => enter(i)}
                    onBlur={leave}
                    className={cn(
                      "group flex items-start gap-5 border-b border-line py-5 text-ink",
                      "transition-[color,transform] duration-300 ease-soft hover:translate-x-1.5 hover:text-copper focus-visible:text-copper",
                      "rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper",
                    )}
                  >
                    <span className="w-9 shrink-0 pt-0.5 font-mono text-[18px] leading-none text-ink-soft transition-colors duration-300 group-hover:text-copper">
                      {service.n}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[17px] leading-tight font-semibold">
                        {service.title}
                      </span>
                      <span className="mt-1.5 block text-[13px] leading-snug text-ink-soft">
                        {service.short}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      strokeWidth={1.5}
                      className="mt-1 size-[18px] shrink-0 text-teal transition-[transform,color] duration-300 ease-soft group-hover:translate-x-1 group-hover:text-copper"
                    />
                  </Link>
                </li>
              ))}
            </Reveal>

            <div
              ref={cardRef}
              aria-hidden
              className={cn(
                "pointer-events-none absolute top-0 left-0 z-10 w-[236px] rounded-2xl border border-line bg-white p-2 shadow-lift",
                "transition-opacity duration-300 ease-soft",
                active === null ? "opacity-0" : "opacity-100",
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-linen">
                {SERVICES.map((service, i) => (
                  <img
                    key={service.slug}
                    src={img(service.image)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                      active === i ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile / tablet: horizontal swipe row of white image cards. */}
          <ol
            aria-label="Services"
            className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:hidden"
          >
            {SERVICES.map((service, i) => (
              <Reveal
                as="li"
                key={service.slug}
                delay={i * 60}
                className="w-[248px] shrink-0 snap-start"
              >
                <Link
                  {...serviceLink(service)}
                  className="block h-full overflow-hidden rounded-2xl border border-line bg-white shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
                >
                  <span className="block aspect-[4/3] overflow-hidden">
                    <img
                      src={img(service.image)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="block p-4">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-copper">
                      {service.n}
                    </span>
                    <span className="mt-1 flex items-center justify-between gap-3 text-[16px] leading-tight font-semibold text-ink">
                      {service.title}
                      <ArrowRight
                        aria-hidden
                        strokeWidth={1.5}
                        className="size-4 shrink-0 text-teal"
                      />
                    </span>
                    <span className="mt-1.5 block text-[13px] leading-snug text-ink-soft">
                      {service.short}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
