// Process content: the four home-page steps, the six How We Build steps and the handover list.

import type { ImageKey } from "./image-keys";

export type HomeStep = {
  n: string;
  title: string;
  text: string;
  /** lucide-react export name. */
  icon: string;
};

export const HOME_STEPS: HomeStep[] = [
  {
    n: "01",
    title: "Free Site Visit",
    text: "We measure the space, understand your needs and document the site.",
    icon: "Ruler",
  },
  {
    n: "02",
    title: "Design & Quote",
    text: "You receive a considered design, material direction and transparent estimate.",
    icon: "PencilRuler",
  },
  {
    n: "03",
    title: "Craft & Install",
    text: "Our own workshop and installation team turn the approved design into reality.",
    icon: "Hammer",
  },
  {
    n: "04",
    title: "Handover & Care",
    text: "We inspect the finished work, hand over your home and stay available afterwards.",
    icon: "HeartHandshake",
  },
];

export const HOME_PROCESS_SECTION = {
  eyebrow: "How we work",
  title: "Four steps from idea to handover",
} as const;

export type BuildStep = {
  n: string;
  /** Short name for the sticky list. */
  name: string;
  title: string;
  text: string;
  includes: [string, string, string, string];
  image: ImageKey;
  ctaLabel: string;
  ctaTo: string;
  /** Small caption chip on the photo. */
  photoNote?: string;
  /** Step 05 shows a WhatsApp-style update bubble. */
  chatBubble?: string;
};

export const BUILD_STEPS: BuildStep[] = [
  {
    n: "01",
    name: "Free site visit & measurement",
    title: "Free site visit & measurement",
    text: "We measure, photograph and listen to understand your space, needs and style.",
    includes: [
      "On-site measurement by our team",
      "Discussion of requirements and budget",
      "Photos and site notes",
      "Guidance on design options",
    ],
    image: "process-measure",
    ctaLabel: "Book a free site visit",
    ctaTo: "/contact",
    photoNote: "Accurate measurements for a perfect fit",
  },
  {
    n: "02",
    name: "Concept & 3D design",
    title: "Concept & 3D design",
    text: "Layouts, material samples and 3D views, so you see the home before we build it.",
    includes: [
      "Two layout options to choose from",
      "3D views of every room",
      "Physical material and finish samples",
      "Revisions until you are happy",
    ],
    image: "render-3d",
    ctaLabel: "See a sample design",
    ctaTo: "/projects/teal-copper-kitchen",
    photoNote: "3D view approved before manufacturing",
  },
  {
    n: "03",
    name: "Transparent quotation",
    title: "Transparent quotation",
    text: "An itemised quotation with no hidden costs, then a written sign-off before work starts.",
    includes: [
      "Every unit priced line by line",
      "Material brands and grades named",
      "Payment stages written down",
      "Timeline with a handover date",
    ],
    image: "blueprint-kitchen",
    ctaLabel: "Try the estimator",
    ctaTo: "/estimator",
    photoNote: "Itemised, no hidden costs",
  },
  {
    n: "04",
    name: "Workshop manufacturing",
    title: "Workshop manufacturing",
    text: "Every board is cut, edge-banded and checked in our own workshop in Sambhar.",
    includes: [
      "Panel-saw cutting to the millimetre",
      "Sealed PVC edge-banding",
      "Hardware fitted and tested",
      "Quality check before dispatch",
    ],
    image: "ws-panel-saw",
    ctaLabel: "Visit our workshop",
    ctaTo: "/about",
    photoNote: "Made in Sambhar, not outsourced",
  },
  {
    n: "05",
    name: "Installation",
    title: "Installation",
    text: "Our own team on site, with daily progress updates on WhatsApp.",
    includes: [
      "Installation by the people who built it",
      "Floors and furniture protected",
      "Daily photo updates on WhatsApp",
      "Electrical and lighting connected",
    ],
    image: "ws-install",
    ctaLabel: "See finished homes",
    ctaTo: "/projects",
    chatBubble: "Day 12: wall units installed",
  },
  {
    n: "06",
    name: "Handover & care",
    title: "Handover & care",
    text: "Deep clean, a walkthrough of every unit and after-service support whenever you need it.",
    includes: [
      "Deep clean of the whole site",
      "Walkthrough with our checklist",
      "Care guide and warranty cards",
      "After-service on a call or WhatsApp",
    ],
    image: "kitchen-island-finished",
    ctaLabel: "Read our promise",
    ctaTo: "/about",
    photoNote: "Ready to live in",
  },
];

export const HANDOVER_CHECKLIST: string[] = [
  "Shutter alignment and gaps checked",
  "Soft-close test on all hinges and drawers",
  "Edge sealing and finishing",
  "Lights and switches working",
  "Drawer runs and pull-outs checked",
  "Silicone finishing at joints",
  "Complete site clean-up",
  "Care guide handed over",
];

/** Copy for the How We Build page sections. */
export const HOW_WE_BUILD_PAGE = {
  hero: {
    eyebrow: "Our process",
    words: ["Measured.", "Manufactured.", "Installed."],
    handNote: "Thoughtful interiors. Built to last.",
    dimensions: ["2400 mm", "1800 mm"],
    sideNotes: [
      "Measure",
      "Design",
      "Select materials",
      "Manufacture",
      "Install",
      "Handover",
      "Care",
    ],
  },
  process: {
    eyebrow: "The process",
    title: "From idea to a home you'll love.",
    text: "A clear, transparent process with one accountable team from start to finish.",
  },
  materials: {
    eyebrow: "Material library",
    title: "Quality materials for a lasting home.",
    text: "We use trusted, moisture-resistant materials and premium hardware for interiors that look good and last longer.",
    compareLink: "Compare all materials",
    waterLabel: "Water resistance",
  },
  grades: {
    eyebrow: "Grade comparison",
    title: "Three grades. Same commitment to quality.",
    text: "Choose the right combination of materials and finishes for your home and budget.",
  },
  warranty: {
    eyebrow: "Warranty & after-care",
    title: "Built today. Supported tomorrow.",
  },
  checklist: {
    eyebrow: "Our handover checklist",
    title: "Because the little things make a big difference.",
  },
  cta: {
    eyebrow: "Ready to see it live?",
    titleLead: "See it for yourself:",
    titleEm: "visit a site or our workshop.",
    primary: "Book a free site visit",
    secondary: "Chat on WhatsApp",
  },
} as const;
