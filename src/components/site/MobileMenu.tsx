import { Link, useRouterState, type LinkProps } from "@tanstack/react-router";
import { Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { ADDRESS_LINES, NAV, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_DEFAULT } from "@/content/site";
import { Button } from "./Button";
import { LangToggle } from "./LangToggle";
import { Logo } from "./Logo";

export type MobileMenuProps = { open: boolean; onClose: () => void };

const EASE = [0.22, 1, 0.36, 1] as const;

/** Full-screen navigation overlay for < lg. Closes on route change and Escape; traps focus. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const firstPath = useRef(pathname);

  // Close when the route changes.
  useEffect(() => {
    if (pathname !== firstPath.current) {
      firstPath.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Escape, focus management, body scroll lock and a simple focus trap.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeBtn.current?.focus(), 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && panel.current) {
        const focusables = panel.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
      previous?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="grid-paper fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-cloud lg:hidden"
        >
          <div className="flex h-[72px] shrink-0 items-center justify-between px-5 sm:px-8">
            <Logo size={36} onClick={onClose} />
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-teal"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 px-5 pt-6 sm:px-8">
            <ol className="flex flex-col">
              {NAV.map((item, i) => {
                const linkProps = { to: item.to } as unknown as LinkProps;
                return (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE, delay: 0.05 + i * 0.05 }}
                    className="border-b border-line"
                  >
                    <Link
                      {...linkProps}
                      onClick={onClose}
                      activeProps={{ className: "text-copper-bright", "aria-current": "page" }}
                      inactiveProps={{ className: "text-teal" }}
                      className="flex items-baseline gap-4 py-4"
                    >
                      <span className="w-8 font-mono text-[12px] text-copper">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[34px] leading-none font-medium tracking-[-0.02em] sm:text-[40px]">
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ol>
          </nav>

          <div className="shrink-0 px-5 pt-8 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-8">
            <div className="mb-5">
              <LangToggle size="md" />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="teal" href={PHONE_TEL} icon={<Phone strokeWidth={1.5} />} block>
                Call {PHONE_DISPLAY}
              </Button>
              <Button variant="whatsapp" href={WHATSAPP_DEFAULT} arrow block>
                Chat on WhatsApp
              </Button>
            </div>
            <address className="mt-6 text-[14px] leading-relaxed text-ink-soft not-italic">
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
