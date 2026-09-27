import { useEffect, useState, type RefObject } from "react";
import { Button, Container } from "@/components/site";
import { img } from "@/content/images";
import { formatRange, quickEstimate } from "@/content/pricing";
import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";
import { ctaTarget, stickyPrimary } from "./links";

type Props = { service: Service; heroRef: RefObject<HTMLElement | null> };

/**
 * White-glass estimate bar (lg+ only; the chrome's MobileActionBar covers smaller screens).
 * Slides up once the hero has scrolled past and hides again while the footer is on screen.
 */
export function StickyEstimateBar({ service, heroRef }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || typeof IntersectionObserver === "undefined") return;
    let heroAbove = false;
    let footerIn = false;
    const footer = document.querySelector("footer");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) heroAbove = !e.isIntersecting && e.boundingClientRect.bottom < 0;
          else footerIn = e.isIntersecting;
        }
        setShow(heroAbove && !footerIn);
      },
      { threshold: 0 },
    );
    io.observe(hero);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, [heroRef]);

  const q = service.quickEstimate;
  const range = q ? quickEstimate(q.space, q.area, q.grade) : null;
  const note = range ? `≈ ${formatRange(range.low, range.high)}` : service.stickyBar.note;
  const parts = service.stickyBar.label.split(" · ");
  const primary = stickyPrimary(service);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-[54] hidden transition-[translate,opacity] duration-500 ease-soft lg:block",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <div className="glass border-x-0 border-b-0 border-t border-t-line shadow-[0_-16px_40px_-24px_rgba(15,46,48,0.3)]">
        <Container className="flex items-center gap-5 py-3 pr-24 xl:pr-28">
          <img
            src={img(service.heroImage)}
            alt=""
            className="h-12 w-16 shrink-0 rounded-lg object-cover"
          />
          <div className="flex items-center gap-5 text-[14px] font-semibold text-ink">
            {parts.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
          <span aria-hidden className="h-9 w-px shrink-0 bg-line-strong" />
          <div className="min-w-0">
            <span
              className={cn(
                "block font-display leading-none tracking-[-0.01em] text-copper-bright",
                range ? "text-[26px]" : "text-[20px]",
              )}
            >
              {note}
            </span>
            <span className="mt-1 block text-[12px] text-ink-soft">{service.stickyBar.sub}</span>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-3">
            <Button variant="secondary" to={ctaTarget(service.stickyBar.secondary)}>
              {service.stickyBar.secondary}
            </Button>
            {"href" in primary ? (
              <Button href={primary.href} arrow>
                {service.stickyBar.primary}
              </Button>
            ) : (
              <Button to={primary.to} arrow>
                {service.stickyBar.primary}
              </Button>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
