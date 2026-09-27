import { getLenis, prefersReducedMotion } from "@/lib/scroll";

/** DOM id of a service row on the overview page. */
export function serviceRowId(slug: string): string {
  return `service-${slug}`;
}

/** Smooth-scroll to a service row (Lenis when active, native otherwise; instant under reduced motion). */
export function scrollToService(slug: string): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(serviceRowId(slug));
  if (!el) return;
  const lenis = getLenis();
  if (lenis && !prefersReducedMotion()) {
    lenis.scrollTo(el, { offset: -104, duration: 1.2 });
    return;
  }
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}
