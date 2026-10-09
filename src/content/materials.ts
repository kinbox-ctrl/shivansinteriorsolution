// Material library, the three grades, the grade comparison table, warranty and the
// one-team-vs-contractors comparison.

import type { ImageKey } from "./image-keys";
import type { GradeId } from "./pricing";

export type MaterialItem = {
  id: string;
  name: string;
  bestFor: string;
  /** 0–5 dots. */
  water: number;
  image: ImageKey;
  recommended?: boolean;
};

export type MaterialTab = { id: string; label: string; items: MaterialItem[] };

export const MATERIAL_TABS: MaterialTab[] = [
  {
    id: "boards",
    label: "Boards",
    items: [
      {
        id: "mr-plywood",
        name: "MR Plywood",
        bestFor: "Reliable and practical for dry areas.",
        water: 2,
        image: "board-mr",
      },
      {
        id: "bwp-plywood",
        name: "BWP Marine Plywood",
        bestFor: "Best for bathrooms and moisture-prone areas.",
        water: 4,
        image: "board-bwp",
        recommended: true,
      },
      {
        id: "hdhmr",
        name: "HDHMR Board",
        bestFor: "Smooth, strong and ideal for premium finishes.",
        water: 4,
        image: "board-hdhmr",
      },
      {
        id: "boilo",
        name: "Boilo Board",
        bestFor: "High strength for a refined, long-lasting finish.",
        water: 3,
        image: "board-boilo",
      },
    ],
  },
  {
    id: "finishes",
    label: "Finishes",
    items: [
      {
        id: "laminate",
        name: "Laminate",
        bestFor: "Hard-wearing, budget-friendly, hundreds of colours.",
        water: 4,
        image: "mat-teal-laminate",
      },
      {
        id: "acrylic",
        name: "Acrylic",
        bestFor: "High-gloss, mirror-like shutters that wipe clean.",
        water: 4,
        image: "finish-preview",
        recommended: true,
      },
      {
        id: "pu-paint",
        name: "PU Paint",
        bestFor: "Seamless matte or gloss colour with no edges.",
        water: 3,
        image: "cat-pu",
      },
      {
        id: "veneer",
        name: "Veneer",
        bestFor: "Real wood grain for a warm, premium look.",
        water: 2,
        image: "living-slat-panel",
      },
    ],
  },
  {
    id: "hardware",
    label: "Hardware",
    items: [
      {
        id: "soft-close-hinges",
        name: "Soft-close Hinges",
        bestFor: "Quiet, self-closing shutters on every cabinet.",
        water: 4,
        image: "mat-hinge",
        recommended: true,
      },
      {
        id: "tandem-drawers",
        name: "Tandem Drawers",
        bestFor: "Full-extension drawers that carry heavy loads.",
        water: 4,
        image: "cabinet-inside",
      },
      {
        id: "lift-up",
        name: "Lift-up Fittings",
        bestFor: "Wall units and lofts that open upwards and stay open.",
        water: 4,
        image: "ws-hardware",
      },
      {
        id: "handles",
        name: "Handles & Profiles",
        bestFor: "Copper, brass, black and handle-less profiles.",
        water: 5,
        image: "mat-copper-handle",
      },
    ],
  },
  {
    id: "walls-floors",
    label: "Walls & Floors",
    items: [
      {
        id: "wpc",
        name: "WPC Panels",
        bestFor: "Waterproof fluted panels for TV walls and wet areas.",
        water: 5,
        image: "journal-wpc",
        recommended: true,
      },
      {
        id: "louvres",
        name: "Wooden Louvres",
        bestFor: "Warm slat walls for living rooms and offices.",
        water: 3,
        image: "living-slat-panel",
      },
      {
        id: "vinyl",
        name: "Vinyl Flooring",
        bestFor: "Quick, waterproof planks for homes and shops.",
        water: 5,
        image: "grid-boutique",
      },
      {
        id: "wooden-flooring",
        name: "Wooden Flooring",
        bestFor: "Engineered wood for living rooms and villas.",
        water: 2,
        image: "hero-living",
      },
    ],
  },
];

export type Grade = {
  id: GradeId;
  name: string;
  tagline: string;
  bullets: [string, string, string, string];
  image: ImageKey;
  /** Image used on the estimator grade cards. */
  estimatorImage: ImageKey;
  wardrobeFrom: string;
  ceilingFrom: string;
  warranty: string;
  recommended: boolean;
};

export const GRADES: Grade[] = [
  {
    id: "standard",
    name: "Standard",
    tagline: "Reliable & Practical",
    bullets: ["MR plywood", "Matte laminates", "Classic fittings", "Good value"],
    image: "grade-standard",
    estimatorImage: "est-standard",
    wardrobeFrom: "₹1,550/sq.ft",
    ceilingFrom: "₹105/sq.ft",
    warranty: "1 year",
    recommended: false,
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Most Popular",
    bullets: [
      "BWP waterproof plywood",
      "Acrylic / high-gloss finishes",
      "Soft-close hardware",
      "Premium look & durability",
    ],
    image: "grade-premium",
    estimatorImage: "est-premium",
    wardrobeFrom: "₹2,200/sq.ft",
    ceilingFrom: "₹180/sq.ft",
    warranty: "5 years",
    recommended: true,
  },
  {
    id: "luxury",
    name: "Luxury",
    tagline: "For a refined finish",
    bullets: [
      "HDHMR / Boilo",
      "PU paint finish",
      "Blum / Hettich hardware",
      "Best-in-class finish",
    ],
    image: "grade-luxury",
    estimatorImage: "est-luxury",
    wardrobeFrom: "₹3,140/sq.ft",
    ceilingFrom: "₹295/sq.ft",
    warranty: "10 years",
    recommended: false,
  },
];

export function getGrade(id: GradeId): Grade {
  return GRADES.find((g) => g.id === id) ?? (GRADES[1] as Grade);
}

/** Short three-bullet lists used on the estimator grade cards. */
export const GRADE_ESTIMATOR_BULLETS: Record<GradeId, [string, string, string]> = {
  standard: ["MR plywood", "Matte laminates", "Classic fittings"],
  premium: ["BWP waterproof plywood", "Acrylic / high-gloss finish", "Soft-close hardware"],
  luxury: ["HDHMR / Boilo", "PU paint finish", "Blum / Hettich hardware"],
};

export type GradeTableRow = { label: string; standard: string; premium: string; luxury: string };

export const GRADE_TABLE_ROWS: GradeTableRow[] = [
  {
    label: "Carcass",
    standard: "MR plywood",
    premium: "BWP marine plywood",
    luxury: "HDHMR / Boilo",
  },
  {
    label: "Shutter finish",
    standard: "Matte laminate",
    premium: "Acrylic / High-gloss / PU",
    luxury: "PU paint / Veneer",
  },
  {
    label: "Hardware",
    standard: "Standard fittings",
    premium: "Soft-close (Hettich/Hafele)",
    luxury: "Blum / Hettich premium",
  },
  { label: "Hardware warranty", standard: "2 years", premium: "5 years", luxury: "10 years" },
  {
    label: "Wardrobe price from",
    standard: "₹1,550/sq.ft",
    premium: "₹2,200/sq.ft",
    luxury: "₹3,140/sq.ft",
  },
];

export type WarrantyCard = { icon: string; title: string; text: string };

export const WARRANTY_CARDS: WarrantyCard[] = [
  {
    icon: "ShieldCheck",
    title: "5–10 year warranty on branded hardware",
    text: "We use trusted brands like Hettich, Hafele and Blum.",
  },
  {
    icon: "Headset",
    title: "After-service support on everything we install",
    text: "Our team is just a call or WhatsApp away.",
  },
  {
    icon: "Sparkles",
    title: "Deep clean and walkthrough at handover",
    text: "We hand over a clean, ready-to-use home and guide you on care.",
  },
];

export type ComparisonRow = { label: string; shivansh: boolean; contractors: boolean };

export const COMPARISON_ROWS: ComparisonRow[] = [
  { label: "Design", shivansh: true, contractors: false },
  { label: "Carpentry / Manufacturing", shivansh: true, contractors: false },
  { label: "Installation", shivansh: true, contractors: false },
  { label: "Timeline accountability", shivansh: true, contractors: false },
  { label: "Warranty", shivansh: true, contractors: false },
  { label: "Single point of contact", shivansh: true, contractors: false },
];

export const COMPARISON_COLUMNS = ["Shivansh (one team)", "Multiple contractors"] as const;
