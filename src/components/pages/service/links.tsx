import { Link, type LinkProps } from "@tanstack/react-router";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { quickEstimateWaLink } from "@/content/pricing";
import type { Service } from "@/content/services";
import { WHATSAPP_FLOOR_PLAN, WHATSAPP_PHOTO, waLink } from "@/content/site";

/** Where a content label like "Get my wardrobe estimate" / "Book a free site visit" should go. */
export function ctaTarget(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("estimat") || l.includes("adjust") || l.includes("plan my")) return "/estimator";
  return "/contact";
}

/** WhatsApp deep link for the hero's secondary action, pre-filled for this service. */
export function heroWhatsAppHref(service: Service): string {
  if (/floor plan/i.test(service.heroSecondary)) return WHATSAPP_FLOOR_PLAN;
  return waLink(
    `Hello Shivansh Interior Solutions, I am interested in ${service.title.toLowerCase()}. Here is a photo of my space. What would you suggest?`,
  );
}

/** The sticky bar's primary action: a WhatsApp link (with the quick estimate) or a route. */
export function stickyPrimary(service: Service): { href: string } | { to: string } {
  const q = service.quickEstimate;
  if (q) return { href: quickEstimateWaLink(q.space, q.area, q.grade) };
  if (/whatsapp/i.test(service.stickyBar.primary)) return { href: WHATSAPP_PHOTO };
  return { to: ctaTarget(service.stickyBar.primary) };
}

/**
 * Split a content href such as "/projects?category=bedrooms-wardrobes" into TanStack `to` + `search`
 * props. Content links are plain strings, so the typed `to` is widened like the shared Button.
 */
export function linkParts(href: string): { to: string; search?: Record<string, string> } {
  const [path = href, query] = href.split("?");
  if (!query) return { to: path };
  const search: Record<string, string> = {};
  new URLSearchParams(query).forEach((value, key) => {
    search[key] = value;
  });
  return { to: path, search };
}

/** Loosely typed props so a content href with a query string can be spread into `<Button to>`. */
export function linkSpread(href: string): { to: string } & Record<string, never> {
  return linkParts(href) as unknown as { to: string } & Record<string, never>;
}

export type RawLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/** Internal `<Link>` built from a content href string (path + optional query). */
export function RawLink({ href, className, children, ...rest }: RawLinkProps) {
  const linkProps = linkParts(href) as unknown as LinkProps;
  return (
    <Link {...(rest as Omit<LinkProps, "to" | "search">)} {...linkProps} className={className}>
      {children}
    </Link>
  );
}
