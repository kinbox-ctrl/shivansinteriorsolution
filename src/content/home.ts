// Home page copy: hero, marquee, manifesto, stats, section headers and the final CTA.

import type { ImageKey } from "./image-keys";

export const HOME_HERO = {
  eyebrow: "Sambhar · Nawa · Jaipur",
  headlineLead: "Interiors built with",
  headlineEm: "craft, not shortcuts.",
  sub: "Designed, manufactured and installed by our own team across Sambhar, Nawa and Jaipur.",
  primary: "Chat on WhatsApp",
  secondary: "See our work",
  image: "hero-living" as ImageKey,
  lightsChip: { label: "Lights ON", caption: "See this room with the cove lights off" },
} as const;

export const MARQUEE_ITEMS: string[] = [
  "Modular Kitchens",
  "Wardrobes",
  "False Ceilings",
  "Wall Panelling",
  "Turnkey Homes",
  "Renovation",
];

export const MANIFESTO = {
  text: "We measure twice, build in our own workshop and install with our own hands. The home you approve on paper is the home you live in.",
  /** Inline pill photos that sit between the words. */
  pills: ["pill-wood", "pill-handle"] as [ImageKey, ImageKey],
  signature: "Dinesh Choudhary, Founder & Chief Craftsman",
} as const;

export type Stat = { value: string; number?: number; suffix?: string; label: string };

export const STATS: Stat[] = [
  { value: "12+", number: 12, suffix: "+", label: "Years of craft" },
  { value: "350+", number: 350, suffix: "+", label: "Spaces delivered" },
  { value: "100%", number: 100, suffix: "%", label: "In-house execution" },
  { value: "On time", label: "Committed handover" },
];

export const FEATURED_SECTION = {
  eyebrow: "Featured projects",
  title: "Recent homes",
  link: "View all projects",
  counterTotal: "06",
} as const;

export const BLUEPRINT_SECTION = {
  eyebrow: "Our process",
  titleLines: ["Blueprint", "to Reality"],
  text: "From measured drawing to finished installation.",
  before: { image: "blueprint-kitchen" as ImageKey, label: "Our design" },
  after: { image: "kitchen-island-finished" as ImageKey, label: "Delivered" },
  dimensions: ["2440 mm", "900 mm"],
} as const;

export const HOME_CTA = {
  eyebrow: "Ready when you are",
  titleLead: "Let's build your home.",
  titleEm: "Properly.",
  primary: "Chat on WhatsApp",
  secondary: "Call +91 97835 86683",
} as const;

export const NOT_FOUND = {
  dimension: "404 mm",
  title: "This room isn't built yet.",
  text: "The page you're looking for doesn't exist, but your dream kitchen could.",
  primary: "Back to home",
  secondary: "See our projects",
  link: "or chat with us on WhatsApp",
} as const;
