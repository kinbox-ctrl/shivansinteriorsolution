// Estimator rates, presets and calculation helpers. All figures are the studio's current
// indicative rates (see PLACEHOLDERS.md: the client should confirm them before launch).

import { waLink } from "./site";

export type SpaceId = "kitchen" | "wardrobe" | "ceiling" | "tvUnit" | "panelling";
export type GradeId = "standard" | "premium" | "luxury";
export type HomeTypeId = "1bhk" | "2bhk" | "3bhk" | "4bhk" | "shop";

/** Base rate per sq.ft at Standard grade. */
export const RATES: Record<SpaceId, number> = {
  kitchen: 1350,
  wardrobe: 1550,
  ceiling: 120,
  tvUnit: 1450,
  panelling: 450,
};

/** Starting price for a complete 2–3 BHK home. */
export const FULL_HOME_FROM = 480000;

export const GRADE_MULTIPLIER: Record<GradeId, number> = {
  standard: 1,
  premium: 1.35,
  luxury: 1.75,
};

/** Indicative range around the computed total. */
export const RANGE = { low: 0.95, high: 1.08 } as const;

export const GRADE_IDS: GradeId[] = ["standard", "premium", "luxury"];

export const GRADE_LABEL: Record<GradeId, string> = {
  standard: "Standard",
  premium: "Premium",
  luxury: "Luxury",
};

export type Space = {
  id: SpaceId;
  label: string;
  /** Short label for chips and receipts. */
  short: string;
  /** lucide-react export name. */
  icon: string;
  defaultArea: number;
  min: number;
  max: number;
  step: number;
};

export const SPACES: Space[] = [
  {
    id: "kitchen",
    label: "Modular kitchen",
    short: "Kitchen",
    icon: "CookingPot",
    defaultArea: 120,
    min: 50,
    max: 500,
    step: 10,
  },
  {
    id: "wardrobe",
    label: "Wardrobes & storage",
    short: "Wardrobes",
    icon: "DoorClosed",
    defaultArea: 80,
    min: 30,
    max: 400,
    step: 10,
  },
  {
    id: "ceiling",
    label: "False ceiling & lights",
    short: "False ceiling",
    icon: "Lightbulb",
    defaultArea: 300,
    min: 100,
    max: 2000,
    step: 10,
  },
  {
    id: "tvUnit",
    label: "TV unit & entertainment",
    short: "TV unit",
    icon: "Tv",
    defaultArea: 40,
    min: 20,
    max: 200,
    step: 10,
  },
  {
    id: "panelling",
    label: "Wall panelling & flooring",
    short: "Wall panelling",
    icon: "PanelsTopLeft",
    defaultArea: 120,
    min: 40,
    max: 800,
    step: 10,
  },
];

export const SPACE_BY_ID: Record<SpaceId, Space> = {
  kitchen: SPACES[0] as Space,
  wardrobe: SPACES[1] as Space,
  ceiling: SPACES[2] as Space,
  tvUnit: SPACES[3] as Space,
  panelling: SPACES[4] as Space,
};

export type SpaceConfig = { on: boolean; area: number };

export type HomeType = {
  id: HomeTypeId;
  label: string;
  /** Size hint shown under the label, e.g. "600 – 1,000 sq.ft". */
  range: string;
  /** lucide-react export name. */
  icon: string;
  spaces: Record<SpaceId, SpaceConfig>;
};

export const HOME_TYPES: HomeType[] = [
  {
    id: "1bhk",
    label: "1BHK",
    range: "Up to 600 sq.ft",
    icon: "Home",
    spaces: {
      kitchen: { on: true, area: 80 },
      wardrobe: { on: true, area: 40 },
      ceiling: { on: true, area: 150 },
      tvUnit: { on: false, area: 30 },
      panelling: { on: false, area: 60 },
    },
  },
  {
    id: "2bhk",
    label: "2BHK",
    range: "600 – 1,000 sq.ft",
    icon: "Home",
    spaces: {
      kitchen: { on: true, area: 100 },
      wardrobe: { on: true, area: 60 },
      ceiling: { on: true, area: 220 },
      tvUnit: { on: false, area: 40 },
      panelling: { on: false, area: 80 },
    },
  },
  {
    id: "3bhk",
    label: "3BHK",
    range: "1,000 – 1,500 sq.ft",
    icon: "Building2",
    spaces: {
      kitchen: { on: true, area: 120 },
      wardrobe: { on: true, area: 80 },
      ceiling: { on: true, area: 300 },
      tvUnit: { on: false, area: 40 },
      panelling: { on: false, area: 120 },
    },
  },
  {
    id: "4bhk",
    label: "4BHK / Villa",
    range: "1,500+ sq.ft",
    icon: "Warehouse",
    spaces: {
      kitchen: { on: true, area: 150 },
      wardrobe: { on: true, area: 120 },
      ceiling: { on: true, area: 500 },
      tvUnit: { on: true, area: 50 },
      panelling: { on: false, area: 160 },
    },
  },
  {
    id: "shop",
    label: "Shop / Office",
    range: "Commercial space",
    icon: "Store",
    spaces: {
      kitchen: { on: false, area: 60 },
      wardrobe: { on: true, area: 60 },
      ceiling: { on: true, area: 400 },
      tvUnit: { on: false, area: 40 },
      panelling: { on: true, area: 150 },
    },
  },
];

export const DEFAULT_HOME_TYPE: HomeTypeId = "3bhk";
export const DEFAULT_GRADE: GradeId = "premium";

export function getHomeType(id: HomeTypeId): HomeType {
  return HOME_TYPES.find((h) => h.id === id) ?? (HOME_TYPES[2] as HomeType);
}

/** Fresh estimator config for a home type (defaults to 3BHK / Premium). */
export function defaultConfig(
  homeType: HomeTypeId = DEFAULT_HOME_TYPE,
  grade: GradeId = DEFAULT_GRADE,
): EstimateConfig {
  const preset = getHomeType(homeType).spaces;
  return {
    homeType,
    grade,
    spaces: {
      kitchen: { ...preset.kitchen },
      wardrobe: { ...preset.wardrobe },
      ceiling: { ...preset.ceiling },
      tvUnit: { ...preset.tvUnit },
      panelling: { ...preset.panelling },
    },
  };
}

export type EstimateConfig = {
  homeType: HomeTypeId;
  spaces: Record<SpaceId, SpaceConfig>;
  grade: GradeId;
};

export type EstimateLine = {
  id: SpaceId;
  label: string;
  area: number;
  grade: GradeId;
  /** Rounded to the nearest ₹100. */
  amount: number;
};

export type EstimateShare = { id: SpaceId; label: string; pct: number };

export type EstimateResult = {
  lines: EstimateLine[];
  /** Sum of the line amounts. */
  total: number;
  /** total × RANGE.low, not rounded (format with formatLakh / formatRange). */
  low: number;
  /** total × RANGE.high, not rounded. */
  high: number;
  shares: EstimateShare[];
};

export function roundTo100(n: number): number {
  return Math.round(n / 100) * 100;
}

/** Amount for one space at one grade, rounded to ₹100. */
export function lineAmount(space: SpaceId, area: number, grade: GradeId): number {
  return roundTo100(area * RATES[space] * GRADE_MULTIPLIER[grade]);
}

/**
 * Itemised estimate. With the 3BHK preset at Premium this yields Modular kitchen ₹2,18,700,
 * Wardrobes & storage ₹1,67,400, False ceiling & lights ₹48,600 and a range of ₹4.13 – 4.69 lakh.
 */
export function estimate(config: EstimateConfig): EstimateResult {
  const lines: EstimateLine[] = [];
  for (const space of SPACES) {
    const cfg = config.spaces[space.id];
    if (!cfg.on || cfg.area <= 0) continue;
    lines.push({
      id: space.id,
      label: space.label,
      area: cfg.area,
      grade: config.grade,
      amount: lineAmount(space.id, cfg.area, config.grade),
    });
  }
  const total = lines.reduce((sum, l) => sum + l.amount, 0);
  const shares: EstimateShare[] =
    total > 0
      ? lines.map((l) => ({
          id: l.id,
          label: l.label,
          pct: Math.round((l.amount / total) * 100),
        }))
      : [];
  return {
    lines,
    total,
    low: Math.round(total * RANGE.low),
    high: Math.round(total * RANGE.high),
    shares,
  };
}

/** Low/high range for a single space, both rounded to ₹100 (home teaser, sticky bars). */
export function quickEstimate(
  space: SpaceId,
  area: number,
  grade: GradeId,
): { amount: number; low: number; high: number } {
  const amount = lineAmount(space, area, grade);
  return {
    amount,
    low: roundTo100(amount * RANGE.low),
    high: roundTo100(amount * RANGE.high),
  };
}

/**
 * Per sq.ft rate for a space at a grade. Rates above ₹1,000 are rounded to ₹10 (₹1,820, ₹2,360),
 * smaller ones to the rupee (₹162, ₹210), matching the "From …/sq.ft" chips in the references.
 */
export function gradeRate(space: SpaceId, grade: GradeId): number {
  const raw = RATES[space] * GRADE_MULTIPLIER[grade];
  return raw >= 1000 ? Math.round(raw / 10) * 10 : Math.round(raw);
}

/** Indian digit grouping without decimals: 218700 → "₹2,18,700". */
export function formatINR(n: number): string {
  const sign = n < 0 ? "-" : "";
  const digits = String(Math.round(Math.abs(n)));
  if (digits.length <= 3) return `${sign}₹${digits}`;
  const last3 = digits.slice(-3);
  const rest = digits.slice(0, -3);
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${sign}₹${grouped},${last3}`;
}

/** Plain number with Indian grouping, no currency sign: 218700 → "2,18,700". */
export function formatNumber(n: number): string {
  return formatINR(n).replace("₹", "");
}

function lakhValue(n: number): string {
  return (Math.round(n / 1000) / 100).toFixed(2);
}

/** 412965 → "₹4.13 lakh". */
export function formatLakh(n: number): string {
  return `₹${lakhValue(n)} lakh`;
}

/** 412965, 469476 → "₹4.13 – 4.69 lakh". */
export function formatLakhRange(low: number, high: number): string {
  return `₹${lakhValue(low)} – ${lakhValue(high)} lakh`;
}

/**
 * Best display for a range: lakh notation once the high end reaches ₹1 lakh, otherwise full
 * rupees rounded to ₹100 ("₹46,200 – ₹52,500").
 */
export function formatRange(low: number, high: number): string {
  if (high >= 100000) return formatLakhRange(low, high);
  return `${formatINR(roundTo100(low))} – ${formatINR(roundTo100(high))}`;
}

/** Full-rupee range with Indian grouping: "₹2,07,800 – ₹2,36,200". */
export function formatINRRange(low: number, high: number): string {
  return `${formatINR(roundTo100(low))} – ${formatINR(roundTo100(high))}`;
}

/** Pre-filled WhatsApp text for an estimate. */
export function buildEstimateMessage(result: EstimateResult, config: EstimateConfig): string {
  const home = getHomeType(config.homeType);
  const rows = result.lines.map(
    (l) => `- ${l.label}: ${l.area} sq.ft, ${GRADE_LABEL[l.grade]} = ${formatINR(l.amount)}`,
  );
  return [
    "Hello Shivansh Interior Solutions, here is my estimate from your website:",
    "",
    `Home type: ${home.label} (${home.range})`,
    `Material grade: ${GRADE_LABEL[config.grade]}`,
    "",
    ...rows,
    "",
    `Estimated total range: ${formatRange(result.low, result.high)}`,
    "",
    "Could you book a free site visit and share an itemised quote?",
  ].join("\n");
}

/** wa.me link carrying the estimate message. */
export function estimateWaLink(result: EstimateResult, config: EstimateConfig): string {
  return waLink(buildEstimateMessage(result, config));
}

/** WhatsApp text for the single-space quick estimate on the home page and service bars. */
export function buildQuickEstimateMessage(space: SpaceId, area: number, grade: GradeId): string {
  const q = quickEstimate(space, area, grade);
  return [
    "Hello Shivansh Interior Solutions, I used your quick estimator:",
    `${SPACE_BY_ID[space].label}: ${area} sq.ft, ${GRADE_LABEL[grade]}`,
    `Indicative range: ${formatINRRange(q.low, q.high)}`,
    "Could you share a detailed quote after a free site visit?",
  ].join("\n");
}

export function quickEstimateWaLink(space: SpaceId, area: number, grade: GradeId): string {
  return waLink(buildQuickEstimateMessage(space, area, grade));
}

/** Copy shown around the estimator UI. */
export const ESTIMATOR_COPY = {
  eyebrow: "Budget planner",
  headlineLead: "Plan your interior budget",
  headlineEm: "in 60 seconds.",
  sub: "Based on our current rates. Your final itemised quote comes after a free site visit.",
  steps: ["Home", "Spaces", "Materials", "Estimate"],
  sections: {
    homeType: { n: 1, title: "Select your home type", text: "" },
    spaces: {
      n: 2,
      title: "Choose spaces & area",
      text: "Select the spaces you want to include and enter the approximate area.",
    },
    grade: {
      n: 3,
      title: "Choose material grade",
      text: "Different material grades to suit your budget and needs.",
    },
  },
  receipt: {
    title: "Your estimate",
    sub: "Based on current rates for Sambhar, Nawa and Jaipur",
    approx: "(approx)",
    columns: ["Item", "Area", "Grade", "Estimated cost"],
    totalLabel: "Estimated total range",
    note: "GST and lighting profiles included · final quote after free site visit",
    primary: "Send this estimate on WhatsApp",
    secondary: "Download PDF",
    link: "Book a free site visit",
  },
  included: {
    eyebrow: "What's included at Premium",
    title: "Quality that comes standard.",
    items: [
      { title: "BWP marine-grade plywood", text: "Moisture-resistant and durable" },
      { title: "5–10 year warranty", text: "On branded hardware" },
      { title: "2D drawings and site supervision", text: "Clear design and execution" },
      { title: "Deep clean and handover", text: "Ready-to-use, dust-free home" },
    ],
  },
  reassurance: {
    eyebrow: "Why choose Shivansh",
    title: "A clearer, simpler way to plan.",
    items: [
      { icon: "Wallet", title: "No hidden costs", text: "What we show is what you get" },
      { icon: "Receipt", title: "Itemised quotation", text: "Clear breakup for every item" },
      { icon: "MapPin", title: "Free site visit", text: "Measure, discuss and finalise" },
      { icon: "Mail", title: "Daily WhatsApp updates", text: "Photos and progress from site" },
    ],
  },
  teaser: {
    eyebrow: "Quick estimate",
    title: "What will my kitchen cost?",
    rangeLabel: "Indicative range",
    primary: "Send this estimate on WhatsApp",
    link: "Open full estimator",
    spaces: ["kitchen", "wardrobe", "ceiling"] as SpaceId[],
    fullHomeLabel: "Full home",
  },
} as const;
