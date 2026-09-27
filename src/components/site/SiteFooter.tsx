import { Link, type LinkProps } from "@tanstack/react-router";
import {
  ADDRESS_LINES,
  EMAIL,
  FOOTER_EXPLORE,
  FOOTER_SERVICES,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_NAME,
  TAGLINE,
  WHATSAPP_FLOOR_PLAN,
} from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { SocialIcons } from "./SocialIcons";

export type SiteFooterProps = { className?: string };

function FooterHeading({ children }: { children: string }) {
  return <h3 className="font-sans text-[13px] font-bold tracking-normal text-ink">{children}</h3>;
}

function FooterLink({ to, children }: { to: string; children: string }) {
  const linkProps = { to } as unknown as LinkProps;
  return (
    <Link
      {...linkProps}
      className="text-[13px] leading-relaxed text-ink-soft transition-colors hover:text-teal"
    >
      {children}
    </Link>
  );
}

/** Linen footer matching the references: brand, Studio / Explore / Services / Visit & Contact,
 *  WhatsApp column, giant faint wordmark and the legal row. */
export function SiteFooter({ className }: SiteFooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer
      className={cn(
        "jali relative overflow-hidden border-t border-teal/25 bg-linen pt-12 pb-[calc(88px+env(safe-area-inset-bottom))] lg:pt-16 lg:pb-8",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-[8%] bottom-[-0.32em] font-display text-[22vw] leading-none font-medium tracking-[-0.03em] text-teal/[0.06] select-none lg:text-[15vw]"
      >
        Shivansh
      </span>

      <Container className="relative">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.4fr_0.9fr_0.9fr_1.1fr_1.3fr_1.4fr] lg:gap-x-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Logo size={40} />
            <p className="mt-4 max-w-[220px] text-[13px] leading-relaxed text-ink-soft">
              {TAGLINE}
            </p>
          </div>

          <div>
            <FooterHeading>Studio</FooterHeading>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">{SITE_NAME}</p>
          </div>

          <div>
            <FooterHeading>Explore</FooterHeading>
            <ul className="mt-3 flex flex-col gap-1">
              {FOOTER_EXPLORE.map((item) => (
                <li key={item.to}>
                  <FooterLink to={item.to}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Services</FooterHeading>
            <ul className="mt-3 flex flex-col gap-1">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.to}>
                  <FooterLink to={item.to}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Visit &amp; Contact</FooterHeading>
            <address className="mt-3 text-[13px] leading-relaxed text-ink-soft not-italic">
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-3 flex flex-col text-[13px] leading-relaxed">
              <a href={PHONE_TEL} className="text-ink-soft transition-colors hover:text-teal">
                {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="break-all text-ink-soft transition-colors hover:text-teal"
              >
                {EMAIL}
              </a>
            </p>
            <SocialIcons className="mt-4" size={30} />
          </div>

          <div className="col-span-2 sm:col-span-3 lg:col-span-1 lg:text-right">
            <p className="text-[13px] leading-relaxed text-ink lg:ml-auto lg:max-w-[240px]">
              Send us your floor plan on WhatsApp and we&rsquo;ll send an estimate.
            </p>
            <Button variant="primary" size="sm" arrow href={WHATSAPP_FLOOR_PLAN} className="mt-4">
              Chat on WhatsApp
            </Button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line-strong/60 pt-5 text-[12px] text-ink-soft sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <p>
            &copy; {year} {SITE_NAME}. All rights reserved.
          </p>
          <ul className="flex items-center gap-5">
            <li>
              <a href="#" className="transition-colors hover:text-teal">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-teal">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-teal">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
