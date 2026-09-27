// Estimator: rate card, options, presets and the quantity-based calculation.
//
// Every space is priced from its parts (board, shutter finish, hardware, labour, counters,
// lighting …) at indicative 2026 rates for the Jaipur region. Cabinet work (kitchens, wardrobes,
// TV units) is priced per sq.ft of cabinet (shutter) area, the industry basis; ceilings and
// panelling per sq.ft of surface. GST at 18% is added on top, as on a real quotation.
// The client should confirm the RATE_CARD figures before launch (see PLACEHOLDERS.md).

import { waLink } from "./site";

export type SpaceId = "kitchen" | "wardrobe" | "ceiling" | "tvUnit" | "panelling";
export type GradeId = "standard" | "premium" | "luxury";
export type HomeTypeId = "1bhk" | "2bhk" | "3bhk" | "4bhk" | "shop";

export const GST_RATE = 0.18;

/** Indicative range around the computed total. */
export const RANGE = { low: 0.95, high: 1.08 } as const;

export const GRADE_IDS: GradeId[] = ["standard", "premium", "luxury"];

export const GRADE_LABEL: Record<GradeId, string> = {
  standard: "Standard",
  premium: "Premium",
  luxury: "Luxury",
};

/* ------------------------------------------------------------------------------------------ */
/* Rate card                                                                                   */
/* ------------------------------------------------------------------------------------------ */

/** All rates in rupees, excluding GST. Per sq.ft unless the key says otherwise. */
export const RATE_CARD = {
  /** Carcass (box) per sq.ft of cabinet area: board, edge-banding, back panel. */
  carcass: { mr: 520, bwp: 640, hdhmr: 700 },
  /** Shutter finish per sq.ft of cabinet area. */
  finish: { laminate: 430, membrane: 600, acrylic: 820, veneer: 1000, pu: 1150 },
  /** Hinges, channels and fittings per sq.ft of cabinet area. */
  hardware: { standard: 180, hettich: 320, blum: 520 },
  /** Sliding track, rollers and dampers, added per sq.ft for sliding wardrobes. */
  slidingExtra: 350,
  /** Cutting, assembly, transport and installation per sq.ft of cabinet area. */
  labour: { kitchen: 220, wardrobe: 220, tvUnit: 200 },
  /** Extra shelving allowance inside wardrobes and TV units. */
  shelving: { wardrobe: 120, tvUnit: 40 },
  /** Wardrobe carcass is taller and carries more shelving than a kitchen box. */
  wardrobeCarcassExtra: 80,
  /** Loft above a wardrobe: share of the wardrobe area, priced at laminate. */
  loftShare: 0.22,
  /** Kitchen layout factors (corner units and returns cost more). */
  layout: { straight: 0.95, l: 1, parallel: 1.02, u: 1.06, island: 1 },
  /** Island unit: 6 rft of base cabinets plus counter, priced flat. */
  islandFlat: 48000,
  /** Countertop per sq.ft of counter (600 mm deep). */
  counter: { none: 0, granite: 350, marble: 750, quartz: 900 },
  /** Kitchen accessory sets, flat. */
  accessories: { none: 0, basic: 9000, standard: 32000, full: 68000 },
  /** Wardrobe interior upgrades per sq.ft. */
  interior: { basic: 0, organised: 180, premium: 380 },
  /** False ceiling per sq.ft of ceiling, painted, including framing. */
  ceiling: { pop: 85, gypsum: 105, designer: 160 },
  /** Cove / profile lighting per running foot. */
  cove: { strip: 140, profile: 260 },
  /** Spotlights, fitted and wired, each. */
  spot: { standard: 450, premium: 750 },
  /** Back panel behind a TV unit, per sq.ft of panel (1.6 × unit area). */
  tvPanel: { none: 0, laminate: 260, wpc: 320, louvres: 480 },
  /** Wall panels and floors per sq.ft, material only. */
  panelling: {
    laminate: 220,
    wpc: 260,
    louvres: 420,
    wallpaper: 95,
    vinyl: 115,
    "laminate-floor": 190,
    engineered: 420,
  },
  /** Panelling / flooring installation per sq.ft. */
  panellingInstall: 40,
  /** Site handling, transport and protection, flat per project. */
  logistics: 4500,
} as const;

/* ------------------------------------------------------------------------------------------ */
/* Spaces and options                                                                          */
/* ------------------------------------------------------------------------------------------ */

export type OptionChoice = { id: string; label: string; note?: string };

export type OptionGroup = {
  id: string;
  label: string;
  /** One-line explanation shown under the group label. */
  hint?: string;
  choices: OptionChoice[];
};

export type Space = {
  id: SpaceId;
  label: string;
  /** Short label for chips and receipts. */
  short: string;
  /** lucide-react export name. */
  icon: string;
  /** What "area" means for this space. */
  areaHint: string;
  defaultArea: number;
  min: number;
  max: number;
  step: number;
  options: OptionGroup[];
};

const CARCASS: OptionGroup = {
  id: "carcass",
  label: "Carcass board",
  hint: "The box behind the shutters.",
  choices: [
    { id: "mr", label: "MR plywood", note: "Dry areas" },
    { id: "bwp", label: "BWP marine ply", note: "Waterproof" },
    { id: "hdhmr", label: "HDHMR", note: "Smooth, dense" },
  ],
};

const FINISH: OptionGroup = {
  id: "finish",
  label: "Shutter finish",
  choices: [
    { id: "laminate", label: "Laminate", note: "Matte / textured" },
    { id: "membrane", label: "Membrane", note: "Seamless PVC" },
    { id: "acrylic", label: "Acrylic", note: "High gloss" },
    { id: "veneer", label: "Veneer", note: "Real wood" },
    { id: "pu", label: "PU paint", note: "Any colour" },
  ],
};

const HARDWARE: OptionGroup = {
  id: "hardware",
  label: "Hardware",
  hint: "Hinges, channels and soft-close.",
  choices: [
    { id: "standard", label: "Ebco / Ozone", note: "Standard" },
    { id: "hettich", label: "Hettich / Hafele", note: "Soft-close" },
    { id: "blum", label: "Blum", note: "Premium soft-close" },
  ],
};

export const SPACES: Space[] = [
  {
    id: "kitchen",
    label: "Modular kitchen",
    short: "Kitchen",
    icon: "CookingPot",
    areaHint: "Cabinet area (base + wall units). An 8 × 10 ft kitchen is about 120 sq.ft.",
    defaultArea: 120,
    min: 50,
    max: 500,
    step: 10,
    options: [
      {
        id: "layout",
        label: "Layout",
        choices: [
          { id: "straight", label: "Straight" },
          { id: "l", label: "L-shaped" },
          { id: "parallel", label: "Parallel" },
          { id: "u", label: "U-shaped" },
          { id: "island", label: "Island", note: "L + island unit" },
        ],
      },
      CARCASS,
      FINISH,
      HARDWARE,
      {
        id: "counter",
        label: "Countertop",
        hint: "600 mm deep, priced per sq.ft of counter.",
        choices: [
          { id: "none", label: "Keep existing" },
          { id: "granite", label: "Granite" },
          { id: "marble", label: "Marble" },
          { id: "quartz", label: "Quartz" },
        ],
      },
      {
        id: "accessories",
        label: "Accessories",
        choices: [
          { id: "none", label: "None" },
          { id: "basic", label: "Basic", note: "Cutlery tray, bottle pull-out" },
          { id: "standard", label: "Standard", note: "+ corner carousel, tall pantry" },
          { id: "full", label: "Full", note: "+ magic corner, tandem baskets" },
        ],
      },
    ],
  },
  {
    id: "wardrobe",
    label: "Wardrobes & storage",
    short: "Wardrobes",
    icon: "DoorClosed",
    areaHint: "Shutter area. A 7 ft × 8 ft wardrobe is about 56 sq.ft.",
    defaultArea: 80,
    min: 30,
    max: 400,
    step: 10,
    options: [
      {
        id: "type",
        label: "Door type",
        choices: [
          { id: "hinged", label: "Hinged" },
          { id: "sliding", label: "Sliding", note: "Track + dampers" },
        ],
      },
      CARCASS,
      FINISH,
      HARDWARE,
      {
        id: "loft",
        label: "Loft above",
        choices: [
          { id: "no", label: "No loft" },
          { id: "yes", label: "Add loft", note: "Laminate, +22% area" },
        ],
      },
      {
        id: "interior",
        label: "Interior",
        choices: [
          { id: "basic", label: "Basic", note: "Shelves + hanging" },
          { id: "organised", label: "Organised", note: "Drawers, trouser pull-out" },
          { id: "premium", label: "Premium", note: "Lockers, lights, jewellery tray" },
        ],
      },
    ],
  },
  {
    id: "ceiling",
    label: "False ceiling & lights",
    short: "False ceiling",
    icon: "Lightbulb",
    areaHint: "Ceiling area of the rooms you want done.",
    defaultArea: 300,
    min: 100,
    max: 2000,
    step: 10,
    options: [
      {
        id: "type",
        label: "Ceiling type",
        choices: [
          { id: "pop", label: "POP", note: "Plaster of Paris" },
          { id: "gypsum", label: "Gypsum", note: "Board, taped joints" },
          { id: "designer", label: "Designer", note: "Multi-level / wooden rafters" },
        ],
      },
      {
        id: "lighting",
        label: "Lighting",
        choices: [
          { id: "spots", label: "Spotlights only" },
          { id: "cove", label: "Cove strip + spots" },
          { id: "profile", label: "Profile lights + spots", note: "Aluminium profile, COB" },
        ],
      },
    ],
  },
  {
    id: "tvUnit",
    label: "TV unit & entertainment",
    short: "TV unit",
    icon: "Tv",
    areaHint: "Cabinet area of the unit; add a back panel below.",
    defaultArea: 40,
    min: 20,
    max: 200,
    step: 10,
    options: [
      CARCASS,
      FINISH,
      HARDWARE,
      {
        id: "panel",
        label: "Back panel",
        hint: "Wall finish behind the TV, 1.6 × unit area.",
        choices: [
          { id: "none", label: "None" },
          { id: "laminate", label: "Laminate panel" },
          { id: "wpc", label: "WPC fluted" },
          { id: "louvres", label: "Wooden louvres" },
        ],
      },
    ],
  },
  {
    id: "panelling",
    label: "Wall panelling & flooring",
    short: "Wall panelling",
    icon: "PanelsTopLeft",
    areaHint: "Wall or floor area to cover.",
    defaultArea: 120,
    min: 40,
    max: 800,
    step: 10,
    options: [
      {
        id: "material",
        label: "Material",
        choices: [
          { id: "wpc", label: "WPC fluted panels", note: "Waterproof" },
          { id: "louvres", label: "Wooden louvres" },
          { id: "laminate", label: "Laminate panels" },
          { id: "wallpaper", label: "Wallpaper" },
          { id: "vinyl", label: "Vinyl flooring" },
          { id: "laminate-floor", label: "Laminate wood flooring" },
          { id: "engineered", label: "Engineered wood flooring" },
        ],
      },
    ],
  },
];

export const SPACE_BY_ID: Record<SpaceId, Space> = {
  kitchen: SPACES[0] as Space,
  wardrobe: SPACES[1] as Space,
  ceiling: SPACES[2] as Space,
  tvUnit: SPACES[3] as Space,
  panelling: SPACES[4] as Space,
};

/** Chosen option id per option group. */
export type SpaceOptions = Record<string, string>;

export type SpacePreset = { on: boolean; area: number };
export type SpaceConfig = SpacePreset & { options: SpaceOptions };

/** What each grade means, space by space. Changing the grade resets to these. */
export const GRADE_DEFAULTS: Record<GradeId, Record<SpaceId, SpaceOptions>> = {
  standard: {
    kitchen: {
      layout: "l",
      carcass: "mr",
      finish: "laminate",
      hardware: "standard",
      counter: "granite",
      accessories: "basic",
    },
    wardrobe: {
      type: "hinged",
      carcass: "mr",
      finish: "laminate",
      hardware: "standard",
      loft: "no",
      interior: "basic",
    },
    ceiling: { type: "pop", lighting: "spots" },
    tvUnit: { carcass: "mr", finish: "laminate", hardware: "standard", panel: "none" },
    panelling: { material: "laminate" },
  },
  premium: {
    kitchen: {
      layout: "l",
      carcass: "bwp",
      finish: "acrylic",
      hardware: "hettich",
      counter: "quartz",
      accessories: "standard",
    },
    wardrobe: {
      type: "hinged",
      carcass: "bwp",
      finish: "acrylic",
      hardware: "hettich",
      loft: "yes",
      interior: "organised",
    },
    ceiling: { type: "gypsum", lighting: "cove" },
    tvUnit: { carcass: "bwp", finish: "acrylic", hardware: "hettich", panel: "wpc" },
    panelling: { material: "wpc" },
  },
  luxury: {
    kitchen: {
      layout: "l",
      carcass: "hdhmr",
      finish: "pu",
      hardware: "blum",
      counter: "quartz",
      accessories: "full",
    },
    wardrobe: {
      type: "sliding",
      carcass: "hdhmr",
      finish: "pu",
      hardware: "blum",
      loft: "yes",
      interior: "premium",
    },
    ceiling: { type: "designer", lighting: "profile" },
    tvUnit: { carcass: "hdhmr", finish: "pu", hardware: "blum", panel: "louvres" },
    panelling: { material: "louvres" },
  },
};

export function optionsForGrade(space: SpaceId, grade: GradeId): SpaceOptions {
  return { ...GRADE_DEFAULTS[grade][space] };
}

/** True when the chosen options are exactly the grade's defaults. */
export function matchesGrade(space: SpaceId, options: SpaceOptions, grade: GradeId): boolean {
  const defaults = GRADE_DEFAULTS[grade][space];
  return Object.keys(defaults).every((k) => defaults[k] === options[k]);
}

export function optionLabel(space: SpaceId, groupId: string, choiceId: string): string {
  const group = SPACE_BY_ID[space].options.find((g) => g.id === groupId);
  return group?.choices.find((c) => c.id === choiceId)?.label ?? choiceId;
}

/* ------------------------------------------------------------------------------------------ */
/* Home type presets                                                                           */
/* ------------------------------------------------------------------------------------------ */

export type HomeType = {
  id: HomeTypeId;
  label: string;
  /** Size hint shown under the label, e.g. "600 – 1,000 sq.ft". */
  range: string;
  /** lucide-react export name. */
  icon: string;
  spaces: Record<SpaceId, SpacePreset>;
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

export type EstimateConfig = {
  homeType: HomeTypeId;
  spaces: Record<SpaceId, SpaceConfig>;
  grade: GradeId;
};

function withOptions(preset: SpacePreset, space: SpaceId, grade: GradeId): SpaceConfig {
  return { on: preset.on, area: preset.area, options: optionsForGrade(space, grade) };
}

/** Spaces for a home type with every option reset to the grade's defaults. */
export function spacesForHome(homeType: HomeTypeId, grade: GradeId): Record<SpaceId, SpaceConfig> {
  const p = getHomeType(homeType).spaces;
  return {
    kitchen: withOptions(p.kitchen, "kitchen", grade),
    wardrobe: withOptions(p.wardrobe, "wardrobe", grade),
    ceiling: withOptions(p.ceiling, "ceiling", grade),
    tvUnit: withOptions(p.tvUnit, "tvUnit", grade),
    panelling: withOptions(p.panelling, "panelling", grade),
  };
}

/** Fresh estimator config for a home type (defaults to 3BHK / Premium). */
export function defaultConfig(
  homeType: HomeTypeId = DEFAULT_HOME_TYPE,
  grade: GradeId = DEFAULT_GRADE,
): EstimateConfig {
  return { homeType, grade, spaces: spacesForHome(homeType, grade) };
}

/* ------------------------------------------------------------------------------------------ */
/* Calculation                                                                                 */
/* ------------------------------------------------------------------------------------------ */

export type EstimatePart = {
  id: string;
  label: string;
  qty: number;
  unit: "sq.ft" | "rft" | "nos" | "set" | "lot";
  /** Rate per unit, or the flat amount when unit is "set" / "lot". */
  rate: number;
  amount: number;
};

export type EstimateLine = {
  id: SpaceId;
  label: string;
  area: number;
  grade: GradeId;
  /** Chosen options in one line: "L-shaped · BWP marine ply · Acrylic · Hettich". */
  summary: string;
  /** True when the options differ from the grade defaults. */
  custom: boolean;
  parts: EstimatePart[];
  /** Sum of the parts, excluding GST, rounded to ₹100. */
  amount: number;
};

export type EstimateShare = { id: SpaceId; label: string; pct: number };

export type EstimateResult = {
  lines: EstimateLine[];
  /** Sum of the line amounts, excluding GST. */
  subtotal: number;
  /** Site handling and transport (0 when nothing is selected). */
  logistics: number;
  /** 18% GST on subtotal + logistics. */
  gst: number;
  /** Grand total including GST. */
  total: number;
  /** total × RANGE.low (format with formatLakh / formatRange). */
  low: number;
  /** total × RANGE.high. */
  high: number;
  shares: EstimateShare[];
};

export function roundTo100(n: number): number {
  return Math.round(n / 100) * 100;
}

function pick<T extends Record<string, number>>(table: T, key: string, fallback: keyof T): number {
  return table[key] ?? table[fallback] ?? 0;
}

function part(
  id: string,
  label: string,
  qty: number,
  unit: EstimatePart["unit"],
  rate: number,
): EstimatePart {
  const amount = unit === "set" || unit === "lot" ? rate : qty * rate;
  return { id, label, qty, unit, rate, amount: Math.round(amount) };
}

function kitchenParts(area: number, o: SpaceOptions): EstimatePart[] {
  const R = RATE_CARD;
  const layout = pick(R.layout, o["layout"] ?? "l", "l");
  const cabinetRate = Math.round(
    (pick(R.carcass, o["carcass"] ?? "mr", "mr") +
      pick(R.finish, o["finish"] ?? "laminate", "laminate")) *
      layout,
  );
  const parts = [
    part("cabinets", "Base, wall & tall units (carcass + shutters)", area, "sq.ft", cabinetRate),
    part(
      "hardware",
      "Hinges, channels & fittings",
      area,
      "sq.ft",
      pick(R.hardware, o["hardware"] ?? "standard", "standard"),
    ),
  ];
  if (o["layout"] === "island")
    parts.push(part("island", "Island unit with counter", 1, "set", R.islandFlat));
  const counterRate = pick(R.counter, o["counter"] ?? "none", "none");
  if (counterRate > 0) {
    const rft = Math.max(6, Math.round(area / 6.5));
    parts.push(part("counter", `Countertop, ${rft} rft × 2 ft`, rft * 2, "sq.ft", counterRate));
  }
  const acc = pick(R.accessories, o["accessories"] ?? "none", "none");
  if (acc > 0) parts.push(part("accessories", "Accessory set", 1, "set", acc));
  parts.push(
    part("labour", "Manufacturing, transport & installation", area, "sq.ft", R.labour.kitchen),
  );
  return parts;
}

function wardrobeParts(area: number, o: SpaceOptions): EstimatePart[] {
  const R = RATE_CARD;
  const carcass = pick(R.carcass, o["carcass"] ?? "mr", "mr") + R.wardrobeCarcassExtra;
  const finish = pick(R.finish, o["finish"] ?? "laminate", "laminate");
  const hardware =
    pick(R.hardware, o["hardware"] ?? "standard", "standard") +
    (o["type"] === "sliding" ? R.slidingExtra : 0);
  const parts = [
    part(
      "cabinets",
      "Carcass, shelves & shutters",
      area,
      "sq.ft",
      carcass + finish + R.shelving.wardrobe,
    ),
    part(
      "hardware",
      o["type"] === "sliding" ? "Sliding system & fittings" : "Hinges & fittings",
      area,
      "sq.ft",
      hardware,
    ),
  ];
  const interior = pick(R.interior, o["interior"] ?? "basic", "basic");
  if (interior > 0) parts.push(part("interior", "Interior organisers", area, "sq.ft", interior));
  if (o["loft"] === "yes") {
    const loftArea = Math.round(area * R.loftShare);
    parts.push(
      part(
        "loft",
        "Loft (laminate)",
        loftArea,
        "sq.ft",
        R.carcass.mr + R.finish.laminate + R.shelving.wardrobe,
      ),
    );
  }
  parts.push(
    part("labour", "Manufacturing, transport & installation", area, "sq.ft", R.labour.wardrobe),
  );
  return parts;
}

function ceilingParts(area: number, o: SpaceOptions): EstimatePart[] {
  const R = RATE_CARD;
  const type = o["type"] ?? "gypsum";
  const lighting = o["lighting"] ?? "spots";
  const perimeter = Math.round(4 * Math.sqrt(area));
  const spots = Math.max(2, Math.ceil(area / 25));
  const parts = [
    part(
      "board",
      `${type === "pop" ? "POP" : type === "gypsum" ? "Gypsum" : "Designer"} ceiling, framed & painted`,
      area,
      "sq.ft",
      pick(R.ceiling, type, "gypsum"),
    ),
  ];
  if (lighting === "cove")
    parts.push(part("cove", "LED cove strip", perimeter, "rft", R.cove.strip));
  if (lighting === "profile")
    parts.push(part("cove", "Aluminium profile lights (COB)", perimeter, "rft", R.cove.profile));
  parts.push(
    part(
      "spots",
      "Spotlights, fitted & wired",
      spots,
      "nos",
      lighting === "profile" ? R.spot.premium : R.spot.standard,
    ),
  );
  return parts;
}

function tvUnitParts(area: number, o: SpaceOptions): EstimatePart[] {
  const R = RATE_CARD;
  const rate =
    pick(R.carcass, o["carcass"] ?? "mr", "mr") +
    pick(R.finish, o["finish"] ?? "laminate", "laminate") +
    R.shelving.tvUnit;
  const parts = [
    part("unit", "TV unit (carcass + shutters)", area, "sq.ft", rate),
    part(
      "hardware",
      "Hinges, channels & fittings",
      area,
      "sq.ft",
      pick(R.hardware, o["hardware"] ?? "standard", "standard"),
    ),
  ];
  const panel = pick(R.tvPanel, o["panel"] ?? "none", "none");
  if (panel > 0) {
    const panelArea = Math.round(area * 1.6);
    parts.push(part("panel", "Back panel behind the TV", panelArea, "sq.ft", panel));
  }
  parts.push(
    part("labour", "Manufacturing, transport & installation", area, "sq.ft", R.labour.tvUnit),
  );
  return parts;
}

function panellingParts(area: number, o: SpaceOptions): EstimatePart[] {
  const R = RATE_CARD;
  const material = o["material"] ?? "wpc";
  return [
    part(
      "material",
      `${optionLabel("panelling", "material", material)}, material`,
      area,
      "sq.ft",
      pick(R.panelling, material, "wpc"),
    ),
    part("install", "Installation & finishing", area, "sq.ft", R.panellingInstall),
  ];
}

function partsFor(space: SpaceId, area: number, o: SpaceOptions): EstimatePart[] {
  switch (space) {
    case "kitchen":
      return kitchenParts(area, o);
    case "wardrobe":
      return wardrobeParts(area, o);
    case "ceiling":
      return ceilingParts(area, o);
    case "tvUnit":
      return tvUnitParts(area, o);
    case "panelling":
      return panellingParts(area, o);
  }
}

function summaryFor(space: SpaceId, o: SpaceOptions): string {
  return SPACE_BY_ID[space].options
    .map((g) => {
      const id = o[g.id];
      if (!id) return null;
      if (g.id === "loft" && id === "no") return null;
      if ((g.id === "counter" || g.id === "accessories" || g.id === "panel") && id === "none")
        return null;
      return optionLabel(space, g.id, id);
    })
    .filter((s): s is string => Boolean(s))
    .join(" · ");
}

/** One space at the given options, excluding GST, rounded to ₹100. */
export function computeLine(
  space: SpaceId,
  area: number,
  grade: GradeId,
  options: SpaceOptions = optionsForGrade(space, grade),
): EstimateLine {
  const parts = partsFor(space, area, options);
  return {
    id: space,
    label: SPACE_BY_ID[space].label,
    area,
    grade,
    summary: summaryFor(space, options),
    custom: !matchesGrade(space, options, grade),
    parts,
    amount: roundTo100(parts.reduce((s, p) => s + p.amount, 0)),
  };
}

/** Amount for one space at a grade's default options, excluding GST, rounded to ₹100. */
export function lineAmount(space: SpaceId, area: number, grade: GradeId): number {
  return computeLine(space, area, grade).amount;
}

/**
 * Itemised estimate: every switched-on space priced from its parts, then logistics, 18% GST and
 * the indicative range. With the 3BHK preset at Premium the grand total lands near ₹6 lakh.
 */
export function estimate(config: EstimateConfig): EstimateResult {
  const lines: EstimateLine[] = [];
  for (const space of SPACES) {
    const cfg = config.spaces[space.id];
    if (!cfg.on || cfg.area <= 0) continue;
    lines.push(computeLine(space.id, cfg.area, config.grade, cfg.options));
  }
  const subtotal = lines.reduce((sum, l) => sum + l.amount, 0);
  const logistics = subtotal > 0 ? RATE_CARD.logistics : 0;
  const gst = Math.round((subtotal + logistics) * GST_RATE);
  const total = subtotal + logistics + gst;
  const shares: EstimateShare[] =
    subtotal > 0
      ? lines.map((l) => ({
          id: l.id,
          label: l.label,
          pct: Math.round((l.amount / subtotal) * 100),
        }))
      : [];
  return {
    lines,
    subtotal,
    logistics,
    gst,
    total,
    low: Math.round(total * RANGE.low),
    high: Math.round(total * RANGE.high),
    shares,
  };
}

/**
 * Range for a single space at a grade's defaults (home teaser, sticky bars, article aside).
 * `amount` excludes GST; `low`/`high` include 18% GST, rounded to ₹100.
 */
export function quickEstimate(
  space: SpaceId,
  area: number,
  grade: GradeId,
): { amount: number; low: number; high: number } {
  const amount = lineAmount(space, area, grade);
  const withGst = amount * (1 + GST_RATE);
  return {
    amount,
    low: roundTo100(withGst * RANGE.low),
    high: roundTo100(withGst * RANGE.high),
  };
}

/**
 * Effective "from" rate per sq.ft at a grade, excluding GST and one-off items such as counters,
 * accessories or the island: cabinet work at 100 sq.ft. Rounded to ₹10 above ₹1,000.
 */
export function gradeRate(space: SpaceId, grade: GradeId): number {
  const options = optionsForGrade(space, grade);
  if (space === "kitchen") {
    options["counter"] = "none";
    options["accessories"] = "none";
  }
  if (space === "wardrobe") {
    options["loft"] = "no";
    options["interior"] = "basic";
  }
  if (space === "tvUnit") options["panel"] = "none";
  const line = computeLine(space, 100, grade, options);
  const raw = line.parts.reduce((s, p) => s + p.amount, 0) / 100;
  return raw >= 1000 ? Math.round(raw / 10) * 10 : Math.round(raw / 5) * 5;
}

/** Standard-grade "from" rates per sq.ft, kept for the home teaser and service chips. */
export const RATES: Record<SpaceId, number> = {
  kitchen: gradeRate("kitchen", "standard"),
  wardrobe: gradeRate("wardrobe", "standard"),
  ceiling: gradeRate("ceiling", "standard"),
  tvUnit: gradeRate("tvUnit", "standard"),
  panelling: gradeRate("panelling", "standard"),
};

/**
 * Starting price for a complete home: the 2BHK preset with the TV unit switched on, Standard
 * grade, including logistics and GST.
 */
export const FULL_HOME_FROM = roundTo100(
  (lineAmount("kitchen", 100, "standard") +
    lineAmount("wardrobe", 60, "standard") +
    lineAmount("ceiling", 220, "standard") +
    lineAmount("tvUnit", 40, "standard") +
    RATE_CARD.logistics) *
    (1 + GST_RATE),
);

/* ------------------------------------------------------------------------------------------ */
/* Formatting                                                                                  */
/* ------------------------------------------------------------------------------------------ */

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

/** "120 sq.ft", "18 rft", "12 nos" or nothing for flat sets. */
export function formatQty(p: EstimatePart): string {
  if (p.unit === "set" || p.unit === "lot") return "";
  return `${p.qty} ${p.unit}`;
}

/* ------------------------------------------------------------------------------------------ */
/* WhatsApp messages                                                                           */
/* ------------------------------------------------------------------------------------------ */

/** Pre-filled WhatsApp text for an estimate. */
export function buildEstimateMessage(result: EstimateResult, config: EstimateConfig): string {
  const home = getHomeType(config.homeType);
  const rows = result.lines.map(
    (l) =>
      `- ${l.label} (${l.area} sq.ft, ${l.summary || GRADE_LABEL[l.grade]}): ${formatINR(l.amount)}`,
  );
  return [
    "Hello Shivansh Interior Solutions, here is my estimate from your website:",
    "",
    `Home type: ${home.label} (${home.range})`,
    `Material grade: ${GRADE_LABEL[config.grade]}`,
    "",
    ...rows,
    "",
    `Subtotal: ${formatINR(result.subtotal)}`,
    `Site handling & transport: ${formatINR(result.logistics)}`,
    `GST (18%): ${formatINR(result.gst)}`,
    `Estimated total: ${formatRange(result.low, result.high)} (incl. GST)`,
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
    `Indicative range: ${formatINRRange(q.low, q.high)} (incl. GST)`,
    "Could you share a detailed quote after a free site visit?",
  ].join("\n");
}

export function quickEstimateWaLink(space: SpaceId, area: number, grade: GradeId): string {
  return waLink(buildQuickEstimateMessage(space, area, grade));
}

/* ------------------------------------------------------------------------------------------ */
/* Copy                                                                                        */
/* ------------------------------------------------------------------------------------------ */

/** Copy shown around the estimator UI. */
export const ESTIMATOR_COPY = {
  eyebrow: "Budget planner",
  headlineLead: "Plan your interior budget",
  headlineEm: "in 60 seconds.",
  sub: "Priced item by item from our current rate card, GST included. Your final itemised quote comes after a free site visit.",
  steps: ["Home", "Spaces", "Materials", "Estimate"],
  sections: {
    homeType: { n: 1, title: "Select your home type", text: "" },
    spaces: {
      n: 2,
      title: "Choose spaces & area",
      text: "Switch on the spaces you want, set the area, then fine-tune boards, finishes and hardware under Customise.",
    },
    grade: {
      n: 3,
      title: "Choose material grade",
      text: "A grade sets the board, finish and hardware for every space. You can still change any of them per space.",
    },
  },
  customise: {
    open: "Customise",
    close: "Done",
    resetTo: "Reset to",
    customTag: "Customised",
  },
  receipt: {
    title: "Your estimate",
    sub: "Current rate card for Sambhar, Nawa and Jaipur",
    approx: "(approx)",
    columns: ["Item", "Area", "Spec", "Estimated cost"],
    subtotalLabel: "Subtotal",
    logisticsLabel: "Site handling & transport",
    gstLabel: "GST (18%)",
    totalLabel: "Estimated total range",
    note: "Includes 18% GST, delivery and installation. Excludes civil work, plumbing, appliances and painting of walls. Final quote after a free site visit.",
    breakdown: "Show breakdown",
    breakdownClose: "Hide breakdown",
    primary: "Send this estimate on WhatsApp",
    secondary: "Download PDF",
    link: "Book a free site visit",
  },
  included: {
    eyebrow: "What's included at Premium",
    title: "Quality that comes standard.",
    items: [
      { title: "BWP marine-grade plywood", text: "Moisture-resistant and durable" },
      { title: "Hettich / Hafele soft-close", text: "5-year hardware warranty" },
      { title: "2D drawings and site supervision", text: "Clear design and execution" },
      { title: "Deep clean and handover", text: "Ready-to-use, dust-free home" },
    ],
  },
  reassurance: {
    eyebrow: "Why choose Shivansh",
    title: "A clearer, simpler way to plan.",
    items: [
      { icon: "Wallet", title: "No hidden costs", text: "GST and installation are in the number" },
      {
        icon: "Receipt",
        title: "Itemised quotation",
        text: "Every board, shutter and hinge listed",
      },
      { icon: "MapPin", title: "Free site visit", text: "Measure, discuss and finalise" },
      { icon: "Mail", title: "Daily WhatsApp updates", text: "Photos and progress from site" },
    ],
  },
  teaser: {
    eyebrow: "Quick estimate",
    title: "What will my kitchen cost?",
    rangeLabel: "Indicative range (incl. GST)",
    primary: "Send this estimate on WhatsApp",
    link: "Open full estimator",
    spaces: ["kitchen", "wardrobe", "ceiling"] as SpaceId[],
    fullHomeLabel: "Full home",
  },
} as const;
