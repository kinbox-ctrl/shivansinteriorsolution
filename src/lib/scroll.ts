import Lenis from "lenis";

let instance: Lenis | null = null;

/** True when the visitor has asked for reduced motion (SSR-safe). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Initialise Lenis smooth scrolling once per document. Returns a cleanup that destroys it.
 * Lenis drives native window scrolling, so TanStack scroll restoration and window scroll events
 * keep working. Under `prefers-reduced-motion` no instance is created at all.
 */
export function initSmoothScroll(): () => void {
  if (typeof window === "undefined" || prefersReducedMotion()) return () => {};
  if (instance) return () => {};

  const lenis = new Lenis({
    lerp: 0.1,
    duration: 1.1,
    smoothWheel: true,
    autoRaf: true,
    anchors: true,
  });
  instance = lenis;

  return () => {
    lenis.destroy();
    if (instance === lenis) instance = null;
  };
}

/** The live Lenis instance, if smooth scrolling is active. */
export function getLenis(): Lenis | null {
  return instance;
}
