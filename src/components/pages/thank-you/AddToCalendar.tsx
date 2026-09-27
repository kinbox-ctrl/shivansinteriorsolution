import { CalendarDays, CalendarPlus, Download } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Button } from "@/components/site";
import { cn } from "@/lib/utils";
import { googleCalendarUrl, icsDataUrl, type Booking } from "./booking";
import { CALENDAR_MENU } from "./copy";

export type AddToCalendarProps = {
  booking: Booking;
  label: string;
  className?: string;
};

/**
 * "Add to calendar" secondary button that opens a small menu with a Google Calendar link and a
 * client-side .ics download (data: URL). Keyboard: Enter/Space/ArrowDown open, arrows move,
 * Escape closes, focus returns to the button.
 */
export function AddToCalendar({ booking, label, className }: AddToCalendarProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const reduced = useReducedMotion();

  const close = useCallback((refocus = false) => {
    setOpen(false);
    if (refocus) rootRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    // Move focus to the first item once the menu is in the DOM.
    const id = window.setTimeout(() => {
      menuRef.current?.querySelector<HTMLElement>("[role=menuitem]")?.focus();
    }, 0);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
    };
  }, [open, close]);

  const onMenuKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>("[role=menuitem]") ?? [],
    );
    if (!items.length) return;
    const index = items.findIndex((el) => el === document.activeElement);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const dir = e.key === "ArrowDown" ? 1 : -1;
      const next = items[(index + dir + items.length) % items.length];
      next?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === "Tab") {
      close();
    }
  };

  const options = [
    {
      key: "google",
      icon: CalendarDays,
      title: CALENDAR_MENU.google.title,
      sub: CALENDAR_MENU.google.sub,
      href: googleCalendarUrl(booking),
      external: true,
    },
    {
      key: "ics",
      icon: Download,
      title: CALENDAR_MENU.ics.title,
      sub: CALENDAR_MENU.ics.sub,
      href: icsDataUrl(booking),
      external: false,
    },
  ] as const;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <Button
        variant="secondary"
        size="lg"
        icon={<CalendarPlus strokeWidth={1.5} aria-hidden />}
        aria-haspopup="menu"
        aria-expanded={open}
        {...(open ? { "aria-controls": menuId } : {})}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="w-full sm:w-auto"
      >
        {label}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label={CALENDAR_MENU.ariaLabel}
            onKeyDown={onMenuKeyDown}
            initial={reduced ? false : { opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+10px)] left-1/2 z-30 w-[min(320px,calc(100vw-2.5rem))] -translate-x-1/2 rounded-2xl border border-line bg-white p-2 shadow-lift sm:left-0 sm:translate-x-0"
          >
            <p className="px-3 pt-2 pb-1 font-mono text-[10px] tracking-[0.2em] text-ink-soft uppercase">
              {booking.date} · {booking.slot}
            </p>
            {options.map((o) => {
              const Icon = o.icon;
              return (
                <a
                  key={o.key}
                  role="menuitem"
                  href={o.href}
                  {...(o.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : { download: `${CALENDAR_MENU.filePrefix}-${booking.reference}.ics` })}
                  onClick={() => close()}
                  className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 hover:bg-linen focus-visible:bg-linen focus-visible:outline-none"
                >
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-mist text-teal">
                    <Icon className="size-4" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] leading-snug font-semibold text-teal">
                      {o.title}
                    </span>
                    <span className="block text-[12px] leading-snug text-ink-soft">{o.sub}</span>
                  </span>
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
