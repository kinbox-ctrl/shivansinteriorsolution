import { useEffect, useState } from "react";

/**
 * Scroll spy: returns the id of the last section whose top has passed `offset` px from the top
 * of the viewport. SSR-safe (first id until mounted).
 */
export function useActiveSection(ids: string[], offset = 140): string | null {
  const key = ids.join("|");
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const list = key ? key.split("|") : [];
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY + offset;
      let current = list[0] ?? null;
      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= y) current = id;
        else break;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [key, offset]);

  return active;
}
