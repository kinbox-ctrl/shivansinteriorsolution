// About page content: founder, journey, workshop, values, team and promises.
// Team names, years and milestone dates are placeholders until the client confirms them.

import type { ImageKey } from "./image-keys";

export const ABOUT_HERO = {
  eyebrow: "Our story",
  headlineLead: "A local team that treats your home",
  headlineEm: "like its own.",
  text: "Founded by Dinesh Choudhary, Shivansh Interior Solutions keeps design, carpentry and installation under one roof, so quality never gets lost between contractors.",
  primary: "Chat on WhatsApp",
  secondary: "Watch our story",
  handNote: "From Sambhar to homes across Jaipur",
  sideWords: ["People", "Materials", "Craftsmanship", "Homes"],
  portrait: "founder-portrait" as ImageKey,
  namePlate: { name: "Dinesh Choudhary", role: "Founder & Chief Craftsman" },
} as const;

export const FOUNDER_NOTE = {
  eyebrow: "Founder's note",
  quote: "Every home we build carries our name. So we build it like it's ours.",
  paragraphs: [
    "Shivansh started with a simple belief: good interiors should be honest, well-made and built to last.",
    "We work with the same care in every home, big or small, using quality materials, our own workshop and a team that takes pride in their craft.",
  ] as [string, string],
  signature: "Dinesh Choudhary",
  name: "Dinesh Choudhary",
  role: "Founder & Chief Craftsman",
} as const;

export type Milestone = { year: string; title: string; image: ImageKey };

export const MILESTONES: Milestone[] = [
  { year: "2014", title: "Workshop opens in Sambhar", image: "tl-2014" },
  { year: "2017", title: "First complete turnkey home", image: "tl-2017" },
  { year: "2020", title: "In-house wardrobe and furniture production", image: "tl-2020" },
  { year: "2023", title: "300th space delivered", image: "tl-2023" },
  { year: "Today", title: "350+ spaces across Sambhar, Nawa and Jaipur", image: "tl-today" },
];

export const JOURNEY_SECTION = {
  eyebrow: "Our journey",
  title: "From one workshop to 350+ spaces.",
} as const;

export type WorkshopPhoto = {
  n: string;
  title: string;
  caption: string;
  image: ImageKey;
  /** The panel-saw photo spans two rows in the bento grid. */
  tall?: boolean;
};

export const WORKSHOP_PHOTOS: WorkshopPhoto[] = [
  {
    n: "01",
    title: "Panel cutting",
    caption: "Precision sizing on industrial panel saw",
    image: "ws-panel-saw",
    tall: true,
  },
  {
    n: "02",
    title: "Edge-banding",
    caption: "Sealed edges for longer life",
    image: "ws-edge-banding",
  },
  {
    n: "03",
    title: "Fitting hardware",
    caption: "Soft-close hinges and tandem drawers",
    image: "ws-hardware",
  },
  {
    n: "04",
    title: "Laminate pressing",
    caption: "Premium finish and consistent quality",
    image: "ws-laminate",
  },
  { n: "05", title: "Installation", caption: "Our own team on site", image: "ws-install" },
];

export const WORKSHOP_SECTION = {
  eyebrow: "The workshop",
  title: "Made in our workshop. Not outsourced.",
  text: "From cutting boards to edge-banding to final installation, everything is handled by our own team.",
  cta: "Visit our workshop",
} as const;

export type Value = { icon: string; title: string; text: string };

export const VALUES: Value[] = [
  {
    icon: "Gem",
    title: "Honest material lists",
    text: "We show you exactly what we use, with no hidden substitutions.",
  },
  {
    icon: "CalendarDays",
    title: "Fixed timelines",
    text: "We plan properly and commit to realistic handover dates.",
  },
  {
    icon: "Users",
    title: "One team, start to finish",
    text: "Design, manufacturing and installation by one accountable team.",
  },
  {
    icon: "ShieldCheck",
    title: "Finishes that last for years",
    text: "Quality materials, expert workmanship and proper site practices.",
  },
];

export const VALUES_SECTION = {
  eyebrow: "Our values",
  title: "What you can always expect.",
} as const;

export type TeamMember = { name: string; role: string; years: string; image: ImageKey };

export const TEAM: TeamMember[] = [
  {
    name: "Dinesh Choudhary",
    role: "Founder & Chief Craftsman",
    years: "15+ years",
    image: "team-1",
  },
  { name: "Mahesh Saini", role: "Workshop Incharge", years: "9 years", image: "team-2" },
  { name: "Ramesh Kumar", role: "Senior Carpenter", years: "8 years", image: "team-3" },
  { name: "Pooja Sharma", role: "Interior Designer", years: "6 years", image: "team-4" },
  { name: "Imran Khan", role: "Site Supervisor", years: "7 years", image: "team-5" },
];

export const TEAM_SECTION = {
  eyebrow: "The team",
  title: "The hands behind your home.",
  text: "A skilled team of designers, carpenters and site experts who take pride in their work.",
} as const;

export const PROMISES: string[] = [
  "Free site visit & consultation",
  "Branded, warranty-backed hardware",
  "Transparent itemised quotation",
  "Daily site updates on WhatsApp",
];

export const PROMISE_SECTION = {
  eyebrow: "Our promise",
  title: "A better experience, from start to finish.",
} as const;

export const ABOUT_CTA = {
  eyebrow: "Ready to meet us?",
  titleLead: "Come and see the",
  titleEm: "workshop in Sambhar.",
  primary: "Chat on WhatsApp",
  secondary: "Get directions",
} as const;
