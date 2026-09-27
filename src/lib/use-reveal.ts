import { useEffect, useRef, useState, type RefObject } from "react";

export type InViewOptions = {
  /** Fraction of the element that must be visible. Default 0.15. */
  threshold?: number;
  /** Root margin passed to IntersectionObserver. Default "0px 0px -40px 0px". */
  rootMargin?: string;
  /** Stop observing after the first intersection. Default true. */
  once?: boolean;
};

const DEFAULT_THRESHOLD = 0.15;
const DEFAULT_ROOT_MARGIN = "0px 0px -40px 0px";

/**
 * SSR-safe "is this element in the viewport" hook. Returns false on the server and on the first
 * client render, then flips to true once the element intersects (and stays true when `once`).
 */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  options: InViewOptions = {},
): boolean {
  const { threshold = DEFAULT_THRESHOLD, rootMargin = DEFAULT_ROOT_MARGIN, once = true } = options;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, rootMargin, once]);

  return inView;
}

/**
 * Shared reveal hook: returns a ref to attach to a `[data-reveal]` element. The element receives
 * the `is-in` class once it enters the viewport (threshold 0.15, rootMargin -40px). The CSS in
 * styles.css handles the transition; the hidden state only applies when `html.js` is present.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: InViewOptions = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { threshold = DEFAULT_THRESHOLD, rootMargin = DEFAULT_ROOT_MARGIN } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.classList.contains("is-in")) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

/**
 * Global fallback used by the chrome: observes every `[data-reveal]` element in the document
 * (including ones added later) so plain markup with the attribute also animates in.
 */
export function observeReveals(root: ParentNode = document): () => void {
  if (typeof IntersectionObserver === "undefined") {
    root.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: DEFAULT_THRESHOLD, rootMargin: DEFAULT_ROOT_MARGIN },
  );
  // <Reveal> elements (data-reveal-react) run their own hook after hydration; touching their
  // classes here, before React hydrates them, causes attribute hydration mismatches.
  const SELECTOR = "[data-reveal]:not(.is-in):not([data-reveal-react])";
  const observe = (scope: ParentNode) => {
    scope.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
      io.observe(el);
    });
  };
  observe(root);
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          if (node.matches(SELECTOR)) {
            io.observe(node);
          }
          observe(node);
        }
      });
    }
  });
  mo.observe(root === document ? document.body : (root as Node), {
    childList: true,
    subtree: true,
  });
  return () => {
    io.disconnect();
    mo.disconnect();
  };
}
