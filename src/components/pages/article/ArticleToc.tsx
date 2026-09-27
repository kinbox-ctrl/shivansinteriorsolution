import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ARTICLE_PAGE, type ArticleSection } from "@/content/journal";
import { getLenis, prefersReducedMotion } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/** Where a section lands below the sticky chrome + tape when navigated to. */
export const SECTION_SCROLL_OFFSET = 124;

export type ArticleTocProps = {
  sections: ArticleSection[];
  activeId: string | null;
};

function scrollToSection(e: MouseEvent<HTMLAnchorElement>, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const top = el.getBoundingClientRect().top + window.scrollY - SECTION_SCROLL_OFFSET;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(top);
  else window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  window.history.replaceState(null, "", `#${id}`);
}

type TocListProps = ArticleTocProps & { onNavigate?: () => void; marker?: boolean };

function TocList({ sections, activeId, onNavigate, marker = false }: TocListProps) {
  const list = useRef<HTMLOListElement>(null);
  const [pos, setPos] = useState<{ top: number; height: number } | null>(null);

  useEffect(() => {
    if (!marker) return;
    const root = list.current;
    if (!root) return;
    const el = root.querySelector<HTMLElement>('[aria-current="location"]');
    if (!el) {
      setPos(null);
      return;
    }
    setPos({ top: el.offsetTop, height: el.offsetHeight });
  }, [activeId, marker]);

  return (
    <ol ref={list} className="relative border-l border-line">
      {marker && pos && (
        <span
          aria-hidden
          className="absolute -left-px w-[2px] rounded-full bg-copper transition-[top,height] duration-500 ease-soft"
          style={{ top: pos.top, height: pos.height }}
        />
      )}
      {sections.map((s, i) => {
        const active = s.id === activeId;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active ? "location" : undefined}
              onClick={(e) => {
                scrollToSection(e, s.id);
                onNavigate?.();
              }}
              className={cn(
                "flex gap-3 py-2 pr-2 pl-4 text-[13.5px] leading-snug transition-colors duration-300 ease-soft",
                active ? "font-medium text-copper" : "text-ink hover:text-teal",
              )}
            >
              <span
                className={cn(
                  "shrink-0 font-mono text-[12px] leading-[1.6]",
                  active ? "text-copper" : "text-ink-soft",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{s.heading}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * "In this article": a collapsible <details> on small screens, a sticky nav with a sliding
 * copper marker from lg up. Clicking an item scrolls (Lenis when active) to the section.
 */
export function ArticleToc({ sections, activeId }: ArticleTocProps) {
  const details = useRef<HTMLDetailsElement>(null);
  return (
    <div className="lg:sticky lg:top-[128px]">
      <details
        ref={details}
        className="group/toc rounded-2xl border border-line bg-white shadow-soft lg:hidden"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-[14px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
          {ARTICLE_PAGE.tocTitle}
          <ChevronDown
            className="size-4 text-teal transition-transform duration-300 ease-soft group-open/toc:rotate-180"
            strokeWidth={1.5}
            aria-hidden
          />
        </summary>
        <div className="px-5 pb-4">
          <TocList
            sections={sections}
            activeId={activeId}
            onNavigate={() => {
              if (details.current) details.current.open = false;
            }}
          />
        </div>
      </details>

      <nav aria-label={ARTICLE_PAGE.tocTitle} className="hidden lg:block">
        <p className="mb-3 text-[14px] font-semibold text-ink">{ARTICLE_PAGE.tocTitle}</p>
        <TocList sections={sections} activeId={activeId} marker />
      </nav>
    </div>
  );
}
