import { Link, type LinkProps } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV, PHONE_TEL } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Container } from "./Container";
import { LangToggle } from "./LangToggle";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export type SiteHeaderProps = { className?: string };

const HIDE_AFTER = 120;
const SCROLLED_AFTER = 80;

/**
 * Sticky white-glass header below the RulerBar. Gains a hairline + shadow after 80px, hides on
 * scroll down and returns on scroll up (never hidden near the top).
 */
export function SiteHeader({ className }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > SCROLLED_AFTER);
      if (y < HIDE_AFTER) {
        setHidden(false);
      } else if (Math.abs(y - last) > 6) {
        setHidden(y > last);
      }
      last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "site-header glass sticky top-[14px] z-[60] border-x-0 border-t-0 border-b",
          scrolled
            ? "border-b-line shadow-[0_12px_32px_-24px_rgba(15,46,48,0.35)]"
            : "border-b-transparent",
          hidden && !menuOpen && "-translate-y-[calc(100%+16px)]",
          className,
        )}
      >
        <Container className="flex h-[72px] items-center gap-6 lg:h-[76px]">
          <Logo size={40} />

          <nav aria-label="Primary" className="ml-2 hidden min-w-0 flex-1 lg:block 2xl:ml-10">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => {
                const linkProps = { to: item.to } as unknown as LinkProps;
                return (
                  <li key={item.to} className={cn(item.compact && "hidden 2xl:block")}>
                    <Link
                      {...linkProps}
                      activeProps={{
                        className: "text-teal after:scale-x-100",
                        "aria-current": "page",
                      }}
                      inactiveProps={{ className: "text-ink/85" }}
                      className={cn(
                        "relative inline-flex h-10 items-center rounded-md px-2 text-[14px] 2xl:px-3 2xl:text-[15px] font-medium whitespace-nowrap transition-colors duration-300 hover:text-teal",
                        "after:absolute after:inset-x-2 2xl:after:inset-x-3 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-copper after:transition-transform after:duration-300 after:ease-soft hover:after:scale-x-100",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2.5 sm:gap-3">
            <LangToggle className="hidden md:inline-flex lg:hidden xl:inline-flex" />
            <a
              href={PHONE_TEL}
              aria-label="Call Shivansh Interior Solutions"
              className="hidden size-11 items-center justify-center rounded-full border border-line bg-white/70 text-teal transition-colors duration-300 hover:bg-teal hover:text-white md:inline-flex lg:hidden xl:inline-flex"
            >
              <Phone className="size-[18px]" strokeWidth={1.5} />
            </a>
            <Button
              variant="teal"
              size="sm"
              arrow
              to="/contact"
              className="hidden h-11 px-4 lg:inline-flex xl:px-5"
            >
              Book a free site visit
            </Button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white/70 text-teal transition-colors duration-300 hover:bg-teal hover:text-white lg:hidden"
            >
              <Menu className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </Container>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
