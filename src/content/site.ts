// Business facts and site-wide constants. Everything contact-related comes from here.

export const SITE_NAME = "Shivansh Interior Solutions";
export const SITE_SHORT = "Shivansh";
export const TAGLINE = "Interiors built with craft, not shortcuts.";
export const SITE_URL = "https://shivansinteriorsolution.co.in";

export const PHONE = "9783586683";
export const PHONE_INTL = "919783586683";
export const PHONE_DISPLAY = "+91 97835 86683";
export const PHONE_TEL = `tel:+${PHONE_INTL}`;
export const EMAIL = "enquiry@shivansinteriorsolution.co.in";

export const ADDRESS_LINES = [
  "Sambhar Lake, Nawa Road",
  "Sambhar, District Jaipur",
  "Rajasthan 303604",
] as const;
export const ADDRESS = "Sambhar Lake, Nawa Road, Sambhar, District Jaipur, Rajasthan 303604";
export const SERVICE_AREAS = ["Sambhar", "Nawa", "Jaipur"] as const;

// Placeholder until the client confirms opening hours (see PLACEHOLDERS.md).
export const HOURS = [
  { days: "Mon – Sat", time: "9:00 AM – 7:00 PM" },
  { days: "Sunday", time: "By appointment" },
] as const;

const MAP_QUERY = encodeURIComponent("Sambhar Lake, Nawa Road, Sambhar, Jaipur, Rajasthan 303604");
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;
export const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&z=13&output=embed`;

/** Google Maps embed centred on a town in the Jaipur region (no API key needed). */
export function mapEmbedFor(place: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(`${place}, Rajasthan, India`)}&z=12&output=embed`;
}

export const FOUNDER = {
  name: "Dinesh Choudhary",
  role: "Founder & Chief Craftsman",
} as const;

/** WhatsApp deep link with a pre-filled message. */
export function waLink(message: string): string {
  return `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DEFAULT = waLink(
  "Hello Shivansh Interior Solutions, I would like to discuss an interior project.",
);
export const WHATSAPP_FLOOR_PLAN = waLink(
  "Hello Shivansh Interior Solutions, here is my floor plan. Could you send me an estimate?",
);
export const WHATSAPP_PHOTO = waLink(
  "Hello Shivansh Interior Solutions, here is a photo of my space. What would you suggest?",
);

export type NavItem = {
  label: string;
  to: string;
  /** Hide in the desktop header below xl. */ compact?: boolean;
};

export const NAV: NavItem[] = [
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Catalogue", to: "/catalogue" },
  { label: "How We Build", to: "/how-we-build" },
  { label: "About", to: "/about" },
  { label: "Estimator", to: "/estimator" },
  { label: "Journal", to: "/journal", compact: true },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_EXPLORE: NavItem[] = [
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Catalogue", to: "/catalogue" },
  { label: "How We Build", to: "/how-we-build" },
  { label: "About", to: "/about" },
  { label: "Estimator", to: "/estimator" },
  { label: "Journal", to: "/journal" },
];

export const FOOTER_SERVICES: NavItem[] = [
  { label: "Complete Home Interiors", to: "/services/complete-home-interiors" },
  { label: "Modular Kitchens", to: "/services/modular-kitchens" },
  { label: "Wardrobes & Storage", to: "/services/wardrobes-storage" },
  { label: "False Ceilings", to: "/services/false-ceiling-lighting" },
  { label: "Wall Panelling", to: "/services/wall-panelling-flooring" },
  { label: "Renovation", to: "/services/renovation-repair" },
];

// Placeholder handles: the client has not shared social profiles yet (see PLACEHOLDERS.md).
export const SOCIAL: {
  label: string;
  href: string;
  kind: "instagram" | "facebook" | "youtube" | "linkedin" | "pinterest";
}[] = [
  { label: "Instagram", href: "#", kind: "instagram" },
  { label: "Facebook", href: "#", kind: "facebook" },
  { label: "YouTube", href: "#", kind: "youtube" },
  { label: "LinkedIn", href: "#", kind: "linkedin" },
  { label: "Pinterest", href: "#", kind: "pinterest" },
];

export const SERVICE_SLUGS = [
  "complete-home-interiors",
  "modular-kitchens",
  "wardrobes-storage",
  "false-ceiling-lighting",
  "wall-panelling-flooring",
  "renovation-repair",
] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
