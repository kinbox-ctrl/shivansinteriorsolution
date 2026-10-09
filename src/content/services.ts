// The six services: overview rows, detail-page content and cross-links.

import type { ImageKey } from "./image-keys";
import type { GradeId, SpaceId } from "./pricing";
import type { ServiceSlug } from "./site";

export type ServiceOptionKind =
  "layout" | "door-type" | "ceiling-style" | "materials" | "package" | "room";

export type ServiceOptionItem = {
  id: string;
  label: string;
  /** lucide-react export name for the tab icon. */
  icon?: string;
  /** Sub-heading when items are split in rows (e.g. "Walls" / "Floors"). */
  group?: string;
  /** "Best for" bullets shown for the active item. */
  bestFor?: string[];
  image?: ImageKey;
  /** Plan drawing shown beside the photo (layouts, packages). */
  drawing?: ImageKey;
  /** DM Mono dimensions on the drawing, e.g. ["3040 mm", "2440 mm"]. */
  dimensions?: string[];
  /** One-line note (packages: rooms included; materials: what it is). */
  note?: string;
  /** Water resistance 0–5 for material cards. */
  water?: number;
  /** Checklist for the active package (Complete Home). */
  checklist?: string[];
  /** Timeline strip for the active package. */
  timeline?: string;
};

export type ServiceOptions = {
  kind: ServiceOptionKind;
  label: string;
  items: ServiceOptionItem[];
  /** Link under the active item, e.g. "View more layouts". */
  moreLabel?: string;
};

export type FinishSwatch = {
  id: string;
  label: string;
  hex: string;
  sub?: string;
  /** Pre-rendered preview for this finish, when available. */
  image?: ImageKey;
};

export type FinishGroup = { id: string; label: string; swatches: FinishSwatch[] };

export type ServiceFinishes = {
  caption: string;
  groups: FinishGroup[];
  previewImage: ImageKey;
  previewLabel: string;
};

export type ServiceCallout = { label: string; x: number; y: number };

export type ServiceHotspot = { n: number; title: string; text: string; x: number; y: number };

export type ServiceGradeRow = {
  grade: GradeId;
  name: string;
  /** "₹1,350/sq.ft" or null for custom quotes. */
  from: string | null;
  bullets: string[];
  recommended: boolean;
};

export type ServiceMaterial = { name: string; note: string; image: ImageKey };

export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: ServiceSlug;
  /** Two-digit number used on the overview and home lists. */
  n: string;
  title: string;
  short: string;
  long: string;
  includes: [string, string, string, string];
  priceChip: string;
  /** Per-grade starting prices, null when the service is quoted per project. */
  gradePrices: Record<GradeId, string | null>;
  /** Card image on the overview and home lists. */
  image: ImageKey;
  heroImage: ImageKey;
  headlineLead: string;
  headlineEm: string;
  heroSub: string;
  heroPrimary: string;
  heroSecondary: string;
  factChips: { label: string; sub: string; icon: string }[];
  callouts: [ServiceCallout, ServiceCallout, ServiceCallout];
  /** Only the False Ceiling page has a Lights ON / OFF toggle on the hero. */
  lightsToggle: boolean;
  options: ServiceOptions;
  finishes: ServiceFinishes | null;
  /** Renovation only: "What needs fixing?" chips and a photo upload prompt. */
  fixChips: { label: string; items: string[]; uploadLabel: string } | null;
  inside: { eyebrow: string; title: string; text: string; image: ImageKey };
  hotspots: [ServiceHotspot, ServiceHotspot, ServiceHotspot, ServiceHotspot, ServiceHotspot];
  materials: ServiceMaterial[];
  gradeRows: ServiceGradeRow[];
  gallery: ImageKey[];
  galleryLabel: string;
  galleryLink: { label: string; to: string };
  caseStudySlug: string;
  caseStudyQuote: { text: string; name: string; town: string };
  faqs: ServiceFaq[];
  stickyBar: { label: string; note: string; sub: string; primary: string; secondary: string };
  /** Single-space quick estimate behind the sticky bar; null for custom-quote services. */
  quickEstimate: { space: SpaceId; area: number; grade: GradeId } | null;
  related: [ServiceSlug, ServiceSlug, ServiceSlug];
};

const SHARED_FAQ_SITE_VISIT: ServiceFaq = {
  q: "Is the site visit really free?",
  a: "Yes, the site visit is completely free. We measure the space, understand your requirements and share a rough estimate along with design suggestions.",
};

const SERVICE_WARDROBES: Service = {
  slug: "wardrobes-storage",
  n: "02",
  title: "Wardrobes & Storage",
  short: "Smart storage for calmer, clutter-free living.",
  long: "Floor-to-ceiling wardrobes, lofts, TV units and smart storage for clutter-free living. Every unit is planned around what you own and built to use the full height of the wall.",
  includes: [
    "Hinged, sliding & open wardrobes",
    "Lofts and overhead storage",
    "TV units & study units",
    "Custom internal accessories",
  ],
  priceChip: "From ₹1,550/sq.ft",
  gradePrices: { standard: "₹1,550/sq.ft", premium: "₹2,200/sq.ft", luxury: "₹3,140/sq.ft" },
  image: "svc-wardrobes",
  heroImage: "grid-bedroom",
  headlineLead: "Wardrobes that fit wall to wall,",
  headlineEm: "and everything in them.",
  heroSub:
    "Floor-to-ceiling wardrobes with lofts, soft-close hardware and interiors planned around what you actually own.",
  heroPrimary: "Get my wardrobe estimate",
  heroSecondary: "WhatsApp a photo of your room",
  factChips: [
    { label: "From ₹1,550/sq.ft", sub: "Standard grade", icon: "IndianRupee" },
    { label: "Free site visit", sub: "in Sambhar, Nawa, Jaipur", icon: "MapPin" },
    { label: "Hardware warranty", sub: "Up to 10 years", icon: "ShieldCheck" },
  ],
  callouts: [
    { label: "Floor-to-ceiling with loft", x: 24, y: 18 },
    { label: "Soft-close hinges and channels", x: 30, y: 62 },
    { label: "Profile light inside", x: 72, y: 40 },
  ],
  lightsToggle: false,
  options: {
    kind: "door-type",
    label: "Choose your door type",
    moreLabel: "View more wardrobes",
    items: [
      {
        id: "sliding",
        label: "Sliding",
        icon: "PanelLeft",
        drawing: "wardrobe-elevation",
        dimensions: ["2400 mm", "2100 mm"],
        image: "grid-bedroom",
        bestFor: [
          "Rooms where a swinging door would block the bed",
          "Wide walls of 1.8 m and above",
          "Mirror or glass shutters",
          "Clean, modern look",
        ],
      },
      {
        id: "hinged",
        label: "Hinged",
        icon: "DoorOpen",
        drawing: "wardrobe-elevation",
        dimensions: ["1800 mm", "2100 mm"],
        image: "bedroom-modern",
        bestFor: [
          "Full access to every shelf at once",
          "Lower cost than sliding systems",
          "Easy to add drawers and lockers",
          "Any width from 600 mm up",
        ],
      },
      {
        id: "walk-in",
        label: "Walk-in",
        icon: "DoorClosed",
        drawing: "wardrobe-elevation",
        dimensions: ["2400 mm", "1800 mm"],
        image: "grid-boutique",
        bestFor: [
          "Master bedrooms with a spare alcove",
          "Open shelving and dressing space",
          "Shared wardrobes for couples",
          "Villas and larger 3BHK homes",
        ],
      },
      {
        id: "loft-tv",
        label: "Loft & TV unit",
        icon: "Tv",
        drawing: "wardrobe-elevation",
        dimensions: ["3000 mm", "2400 mm"],
        image: "grid-fluted-tv",
        bestFor: [
          "Seasonal storage above the wardrobe",
          "TV panel built into the same wall",
          "Small bedrooms that need every inch",
          "Guest rooms and kids' rooms",
        ],
      },
    ],
  },
  finishes: {
    caption: "Tap a finish to preview it on the wardrobe.",
    previewImage: "grid-bedroom",
    previewLabel: "Walnut veneer with black profile handles",
    groups: [
      {
        id: "shutter",
        label: "Shutter Finish",
        swatches: [
          { id: "walnut", label: "Walnut Veneer", hex: "#6B4428", sub: "Wood finish" },
          { id: "ivory", label: "Ivory Acrylic", hex: "#EFE9DC", sub: "High-gloss" },
          { id: "fluted-glass", label: "Fluted Glass", hex: "#CFD9D8", sub: "Glass shutter" },
          { id: "petrol-teal", label: "Petrol Teal", hex: "#1F5F63", sub: "Matte laminate" },
          { id: "mirror", label: "Mirror", hex: "#B9C4C6", sub: "Mirror shutter" },
        ],
      },
      {
        id: "handle",
        label: "Handle Finish",
        swatches: [
          { id: "black-profile", label: "Black Profile", hex: "#1E1E1E", sub: "Profile" },
          { id: "copper", label: "Copper", hex: "#B87333", sub: "Bar handle" },
          { id: "handleless", label: "Handle-less", hex: "#D9D4C8", sub: "Push-to-open" },
        ],
      },
    ],
  },
  fixChips: null,
  inside: {
    eyebrow: "Inside every Shivansh wardrobe",
    title: "Storage planned around your things.",
    text: "Rails, drawers and pull-outs positioned for how you dress, not a standard template.",
    image: "cabinet-inside",
  },
  hotspots: [
    { n: 1, title: "Hanging rail", text: "Full-length and short hanging zones.", x: 30, y: 16 },
    { n: 2, title: "Drawers", text: "Soft-close drawers for folded clothes.", x: 40, y: 66 },
    {
      n: 3,
      title: "Trouser pull-out",
      text: "Creases stay out, everything visible.",
      x: 72,
      y: 50,
    },
    { n: 4, title: "Shoe rack", text: "Ventilated rack at the base.", x: 22, y: 88 },
    { n: 5, title: "Locker", text: "Concealed locker for documents and valuables.", x: 80, y: 20 },
  ],
  materials: [
    { name: "BWP Marine Plywood", note: "Stable carcass that does not warp.", image: "board-bwp" },
    {
      name: "Laminate / Veneer",
      note: "Matte, wood-grain and acrylic shutters.",
      image: "board-hdhmr",
    },
    { name: "Soft-close Hinges", note: "Quiet, long-lasting branded hinges.", image: "mat-hinge" },
    {
      name: "Sliding Channels",
      note: "Smooth-running tracks for heavy doors.",
      image: "mat-copper-handle",
    },
    {
      name: "Internal Accessories",
      note: "Pull-outs, racks and organisers.",
      image: "cabinet-inside",
    },
  ],
  gradeRows: [
    {
      grade: "standard",
      name: "Standard",
      from: "₹1,550/sq.ft",
      bullets: ["MR grade plywood", "Matte laminates", "Standard hinges", "1 year warranty"],
      recommended: false,
    },
    {
      grade: "premium",
      name: "Premium",
      from: "₹2,200/sq.ft",
      bullets: [
        "BWP waterproof plywood",
        "Acrylic / veneer finishes",
        "Soft-close hardware",
        "5 years warranty",
      ],
      recommended: true,
    },
    {
      grade: "luxury",
      name: "Luxury",
      from: "₹3,140/sq.ft",
      bullets: [
        "HDHMR / Boilo",
        "PU paint / natural veneer",
        "Blum / Hettich hardware",
        "10 years warranty",
      ],
      recommended: false,
    },
  ],
  gallery: [
    "grid-bedroom",
    "bedroom-modern",
    "next-bedroom",
    "grid-kids-room",
    "grid-fluted-tv",
    "orig-work-bedroom",
  ],
  galleryLabel: "Wardrobe gallery",
  galleryLink: { label: "View all wardrobes", to: "/projects?category=bedrooms-wardrobes" },
  caseStudySlug: "master-bedroom-suite",
  caseStudyQuote: {
    text: "The loft and the drawers were planned around exactly what we own. Nothing is wasted.",
    name: "Anjali Meena",
    town: "Jaipur, Rajasthan",
  },
  faqs: [
    SHARED_FAQ_SITE_VISIT,
    {
      q: "Sliding or hinged?",
      a: "Sliding doors suit rooms where a swinging shutter would hit the bed and walls wider than 1.8 m. Hinged doors cost less, give access to every shelf at once and work for any width.",
    },
    {
      q: "Can you add mirror shutters?",
      a: "Yes. A full-height mirror can go on one sliding or hinged shutter, or inside the door if you prefer a plain front.",
    },
    {
      q: "How do lofts open?",
      a: "Lofts get hinged or lift-up shutters with gas springs, so they open with one hand and stay open. We keep them in the same finish as the wardrobe below.",
    },
  ],
  stickyBar: {
    label: "Wardrobe · 80 sq.ft · Premium",
    note: "≈ ₹1.59 – 1.81 lakh",
    sub: "(indicative range)",
    primary: "Send on WhatsApp",
    secondary: "Adjust",
  },
  quickEstimate: { space: "wardrobe", area: 80, grade: "premium" },
  related: ["false-ceiling-lighting", "wall-panelling-flooring", "complete-home-interiors"],
};

const SERVICE_CEILING: Service = {
  slug: "false-ceiling-lighting",
  n: "03",
  title: "False Ceiling & Lighting",
  short: "Beautiful ceilings with the right light for every space.",
  long: "POP and gypsum ceilings with layered profiles and lighting that sets the mood. We plan the wiring, cove and spotlights together so the room feels bigger and calmer.",
  includes: [
    "POP / gypsum / grid ceilings",
    "Cove, profile and spot lighting",
    "Fans, chandeliers and pendants",
    "Electrical and automation ready",
  ],
  priceChip: "From ₹105/sq.ft",
  gradePrices: { standard: "₹105/sq.ft", premium: "₹180/sq.ft", luxury: "₹295/sq.ft" },
  image: "svc-ceiling",
  heroImage: "grid-cove-ceiling",
  headlineLead: "Ceilings that make every room",
  headlineEm: "feel bigger.",
  heroSub:
    "Gypsum and POP ceilings with warm cove profiles and recessed spots, wired and planned before the board goes up.",
  heroPrimary: "Get my ceiling estimate",
  heroSecondary: "WhatsApp a photo of your room",
  factChips: [
    { label: "From ₹105/sq.ft", sub: "Standard grade", icon: "IndianRupee" },
    { label: "Free site visit", sub: "in Sambhar, Nawa, Jaipur", icon: "MapPin" },
    { label: "Crack-free finish", sub: "Taped and jointed", icon: "ShieldCheck" },
  ],
  callouts: [
    { label: "Gypsum or POP, your choice", x: 20, y: 22 },
    { label: "Warm cove profile light", x: 70, y: 30 },
    { label: "Recessed spotlights", x: 50, y: 62 },
  ],
  lightsToggle: true,
  options: {
    kind: "ceiling-style",
    label: "Choose your ceiling style",
    moreLabel: "View more ceilings",
    items: [
      {
        id: "peripheral-cove",
        label: "Peripheral cove",
        icon: "Square",
        image: "grid-cove-ceiling",
        drawing: "elevation",
        dimensions: ["4200 mm", "150 mm drop"],
        bestFor: [
          "Living rooms and master bedrooms",
          "Indirect light with no glare",
          "Hides AC piping along the walls",
          "Works with a ceiling fan in the centre",
        ],
      },
      {
        id: "floating-island",
        label: "Floating island",
        icon: "LayoutTemplate",
        image: "journal-ceiling",
        drawing: "elevation",
        dimensions: ["2400 mm", "1800 mm"],
        bestFor: [
          "Dining tables and beds that need a focus",
          "A light halo around the panel",
          "Rooms with a good 10 ft height",
          "Pendants and chandeliers",
        ],
      },
      {
        id: "coffered",
        label: "Coffered",
        icon: "Grid2x2",
        image: "journal-cove",
        drawing: "elevation",
        dimensions: ["3600 mm", "3600 mm"],
        bestFor: [
          "Large living and puja rooms",
          "Classic and Rajasthani interiors",
          "Spotlights in each panel",
          "Ceilings above 10 ft",
        ],
      },
      {
        id: "wooden-rafters",
        label: "Wooden rafters",
        icon: "Rows3",
        image: "living-slat-panel",
        drawing: "elevation",
        dimensions: ["3000 mm", "75 mm slats"],
        bestFor: [
          "Warm, textured living rooms",
          "Pairs with slat wall panelling",
          "Cafes, shops and studies",
          "Linear lights between the slats",
        ],
      },
      {
        id: "minimal-flat",
        label: "Minimal flat",
        icon: "Rows2",
        image: "bedroom-modern",
        drawing: "elevation",
        dimensions: ["Full room", "100 mm drop"],
        bestFor: [
          "Low ceilings of 9 ft or less",
          "Clean surface for spotlights only",
          "Kids' rooms and studies",
          "Lowest cost per sq.ft",
        ],
      },
    ],
  },
  finishes: {
    caption: "Tap a light setting to preview it on the room.",
    previewImage: "grid-cove-ceiling",
    previewLabel: "Warm 2700K cove with recessed spots",
    groups: [
      {
        id: "temperature",
        label: "Light temperature",
        swatches: [
          { id: "warm", label: "Warm", hex: "#FFD39A", sub: "2700K" },
          { id: "neutral", label: "Neutral", hex: "#FFF1D6", sub: "4000K" },
          { id: "cool", label: "Cool", hex: "#EAF4FF", sub: "6000K" },
        ],
      },
      {
        id: "profile",
        label: "Profile light",
        swatches: [
          { id: "cove", label: "Cove", hex: "#E8D3B8", sub: "Indirect strip" },
          { id: "linear", label: "Linear", hex: "#D9D4C8", sub: "Recessed line" },
          { id: "spot", label: "Spot", hex: "#F4EEE2", sub: "Recessed spots" },
        ],
      },
    ],
  },
  fixChips: null,
  inside: {
    eyebrow: "Inside every Shivansh ceiling",
    title: "What holds it up, and keeps it crack-free.",
    text: "Framing, boarding and wiring done in the right order, so nothing is patched later.",
    image: "grid-cove-ceiling",
  },
  hotspots: [
    {
      n: 1,
      title: "Metal framing",
      text: "GI channels fixed to the slab at 600 mm centres.",
      x: 30,
      y: 16,
    },
    {
      n: 2,
      title: "Board with taped joints",
      text: "Gypsum boards screwed, taped and jointed.",
      x: 60,
      y: 30,
    },
    {
      n: 3,
      title: "Cove for profile light",
      text: "A continuous cove hides the LED strip.",
      x: 18,
      y: 58,
    },
    {
      n: 4,
      title: "Spotlight cut-outs",
      text: "Marked on the drawing, cut cleanly on site.",
      x: 74,
      y: 62,
    },
    {
      n: 5,
      title: "Wiring planned in advance",
      text: "Fan, spots and cove on separate circuits.",
      x: 46,
      y: 84,
    },
  ],
  materials: [
    { name: "Gypsum Board", note: "Smooth, light and quick to install.", image: "board-hdhmr" },
    { name: "POP", note: "For cornices, curves and mouldings.", image: "board-boilo" },
    { name: "GI Framing", note: "Rust-free channels for a rigid frame.", image: "mat-hinge" },
    { name: "LED Profile Strip", note: "Warm or neutral cove lighting.", image: "journal-cove" },
    {
      name: "Recessed Spots",
      note: "Dimmable spotlights and downlights.",
      image: "journal-ceiling",
    },
  ],
  gradeRows: [
    {
      grade: "standard",
      name: "Standard",
      from: "₹105/sq.ft",
      bullets: [
        "Gypsum board",
        "Peripheral or flat design",
        "Standard LED strip",
        "1 year warranty",
      ],
      recommended: false,
    },
    {
      grade: "premium",
      name: "Premium",
      from: "₹180/sq.ft",
      bullets: [
        "Gypsum with POP detailing",
        "Cove and island designs",
        "Branded profile lights",
        "3 years warranty",
      ],
      recommended: true,
    },
    {
      grade: "luxury",
      name: "Luxury",
      from: "₹295/sq.ft",
      bullets: [
        "Coffered and wooden rafters",
        "Layered lighting scenes",
        "Dimmable, automation-ready",
        "5 years warranty",
      ],
      recommended: false,
    },
  ],
  gallery: [
    "grid-cove-ceiling",
    "journal-ceiling",
    "journal-cove",
    "hero-living",
    "living-slat-panel",
    "bedroom-modern",
  ],
  galleryLabel: "Ceiling gallery",
  galleryLink: { label: "View all ceilings", to: "/projects?category=ceilings-lighting" },
  caseStudySlug: "cove-ceiling-lighting",
  caseStudyQuote: {
    text: "The cove light changed the whole room. Evenings feel calm now, and there are no cracks after a year.",
    name: "Suresh Jangid",
    town: "Jaipur, Rajasthan",
  },
  faqs: [
    SHARED_FAQ_SITE_VISIT,
    {
      q: "POP or gypsum?",
      a: "Gypsum boards give a smooth, quick, crack-resistant ceiling for flat and cove designs. POP is better for curves, cornices and mouldings. Most homes use gypsum with POP detailing.",
    },
    {
      q: "Will the ceiling crack?",
      a: "Hairline cracks come from poor framing or untaped joints. We fix GI channels at 600 mm centres, tape and joint every board and let the compound cure before painting.",
    },
    {
      q: "How long will the room be out of use?",
      a: "A 300 sq.ft living room takes about 5–7 working days including painting. We cover furniture and floors, and clean the room before handing it back.",
    },
  ],
  stickyBar: {
    label: "Ceiling · 300 sq.ft · Premium",
    note: "≈ ₹46,200 – ₹52,500",
    sub: "(indicative range)",
    primary: "Send on WhatsApp",
    secondary: "Adjust",
  },
  quickEstimate: { space: "ceiling", area: 300, grade: "premium" },
  related: ["wardrobes-storage", "wall-panelling-flooring", "complete-home-interiors"],
};

const SERVICE_PANELLING: Service = {
  slug: "wall-panelling-flooring",
  n: "04",
  title: "Wall Panelling & Flooring",
  short: "Feature walls and durable flooring that feel like home.",
  long: "WPC and louvre panels, wallpaper, laminate, vinyl and wooden floors for warm, modern spaces. Concealed fixing, straight lines and finishes that stand up to Rajasthan heat.",
  includes: [
    "WPC & wooden louvers",
    "Wallpaper & laminate panels",
    "Vinyl, laminate & wooden flooring",
    "TV and feature walls",
  ],
  priceChip: "Custom quote",
  gradePrices: { standard: null, premium: null, luxury: null },
  image: "svc-panelling",
  heroImage: "grid-office",
  headlineLead: "Walls and floors with",
  headlineEm: "texture and warmth.",
  heroSub:
    "Fluted WPC panels, oak and walnut louvres and wood-look flooring, fitted with concealed fixings by our own team.",
  heroPrimary: "Get a custom quote",
  heroSecondary: "WhatsApp a photo of your wall",
  factChips: [
    { label: "Custom quote", sub: "per sq.ft after a free visit", icon: "IndianRupee" },
    { label: "Free site visit", sub: "in Sambhar, Nawa, Jaipur", icon: "MapPin" },
    { label: "Concealed fixing", sub: "No visible screws", icon: "ShieldCheck" },
  ],
  callouts: [
    { label: "WPC fluted panels", x: 22, y: 30 },
    { label: "Louvres with concealed fixing", x: 68, y: 26 },
    { label: "Wood-look flooring", x: 54, y: 84 },
  ],
  lightsToggle: false,
  options: {
    kind: "materials",
    label: "Choose your materials",
    moreLabel: "Compare all materials",
    items: [
      {
        id: "wpc",
        label: "WPC panels",
        group: "Walls",
        image: "journal-wpc",
        note: "Fluted wood-polymer panels",
        bestFor: ["TV walls and bedheads", "Humid areas"],
        water: 5,
      },
      {
        id: "louvres",
        label: "Louvres",
        group: "Walls",
        image: "living-slat-panel",
        note: "Solid or veneered slats",
        bestFor: ["Living rooms and offices", "Partitions"],
        water: 3,
      },
      {
        id: "wallpaper",
        label: "Wallpaper",
        group: "Walls",
        image: "grid-kids-room",
        note: "Textured and printed rolls",
        bestFor: ["Bedrooms and kids' rooms", "Quick makeovers"],
        water: 2,
      },
      {
        id: "laminates",
        label: "Laminates",
        group: "Walls",
        image: "mat-teal-laminate",
        note: "Laminate on plywood panels",
        bestFor: ["Feature walls", "Shops and counters"],
        water: 3,
      },
      {
        id: "vinyl",
        label: "Vinyl",
        group: "Floors",
        image: "grid-boutique",
        note: "Click-lock or glue-down planks",
        bestFor: ["Rented homes and shops", "Quick installs"],
        water: 5,
      },
      {
        id: "laminate-wood",
        label: "Laminate wood",
        group: "Floors",
        image: "grid-office",
        note: "HDF core with wood-look top",
        bestFor: ["Bedrooms and studies", "Budget wood look"],
        water: 2,
      },
      {
        id: "wooden",
        label: "Wooden flooring",
        group: "Floors",
        image: "hero-living",
        note: "Engineered oak and teak",
        bestFor: ["Living rooms and villas", "Long-term homes"],
        water: 2,
      },
    ],
  },
  finishes: {
    caption: "Tap a tone or spacing to preview it on the wall.",
    previewImage: "living-slat-panel",
    previewLabel: "Oak louvres at 40 mm spacing",
    groups: [
      {
        id: "tone",
        label: "Slat tone",
        swatches: [
          { id: "oak", label: "Oak", hex: "#B67945", sub: "Light wood" },
          { id: "walnut", label: "Walnut", hex: "#6B4428", sub: "Dark wood" },
          { id: "charcoal", label: "Charcoal", hex: "#3B3F41", sub: "Matte" },
          { id: "ivory", label: "Ivory", hex: "#EFE9DC", sub: "Painted" },
        ],
      },
      {
        id: "spacing",
        label: "Slat spacing",
        swatches: [
          { id: "20", label: "20 mm", hex: "#DCE9E7", sub: "Dense" },
          { id: "40", label: "40 mm", hex: "#E8F0EE", sub: "Balanced" },
          { id: "60", label: "60 mm", hex: "#F4F1EA", sub: "Open" },
        ],
      },
    ],
  },
  fixChips: null,
  inside: {
    eyebrow: "Inside every Shivansh wall",
    title: "Straight lines, hidden fixings.",
    text: "A levelled frame, sealed edges and concealed clips so the wall looks the same in ten years.",
    image: "living-slat-panel",
  },
  hotspots: [
    {
      n: 1,
      title: "Levelled frame",
      text: "Plywood battens packed level on uneven walls.",
      x: 20,
      y: 20,
    },
    {
      n: 2,
      title: "Concealed clips",
      text: "Panels lock on without visible screws.",
      x: 56,
      y: 36,
    },
    {
      n: 3,
      title: "Sealed edges",
      text: "Ends and corners closed with matching trims.",
      x: 78,
      y: 58,
    },
    {
      n: 4,
      title: "Light channel",
      text: "Space for a linear profile light between slats.",
      x: 34,
      y: 66,
    },
    {
      n: 5,
      title: "Skirting and transitions",
      text: "Floor and wall meet with a clean trim.",
      x: 60,
      y: 88,
    },
  ],
  materials: [
    { name: "WPC Fluted Panels", note: "Waterproof and termite-resistant.", image: "journal-wpc" },
    { name: "Wooden Louvres", note: "Oak, walnut and charcoal tones.", image: "living-slat-panel" },
    { name: "Laminate Panels", note: "Any colour, easy to wipe.", image: "mat-teal-laminate" },
    { name: "Vinyl Planks", note: "Waterproof click-lock flooring.", image: "grid-boutique" },
    { name: "Engineered Wood", note: "Real wood top on a stable core.", image: "board-hdhmr" },
  ],
  gradeRows: [
    {
      grade: "standard",
      name: "Standard",
      from: null,
      bullets: ["Laminate panels", "Vinyl flooring", "Standard trims", "1 year warranty"],
      recommended: false,
    },
    {
      grade: "premium",
      name: "Premium",
      from: null,
      bullets: [
        "WPC fluted panels",
        "Laminate wood flooring",
        "Concealed fixing",
        "3 years warranty",
      ],
      recommended: true,
    },
    {
      grade: "luxury",
      name: "Luxury",
      from: null,
      bullets: [
        "Veneered wooden louvres",
        "Engineered wood flooring",
        "Integrated profile lights",
        "5 years warranty",
      ],
      recommended: false,
    },
  ],
  gallery: [
    "grid-fluted-tv",
    "living-slat-panel",
    "grid-office",
    "hero-living",
    "grid-boutique",
    "orig-work-office",
  ],
  galleryLabel: "Panelling gallery",
  galleryLink: { label: "View all feature walls", to: "/projects?category=living-rooms" },
  caseStudySlug: "fluted-tv-wall",
  caseStudyQuote: {
    text: "The fluted wall made our living room look like a magazine picture. Fitted in two days, no mess.",
    name: "Kavita Yadav",
    town: "Sambhar, Rajasthan",
  },
  faqs: [
    SHARED_FAQ_SITE_VISIT,
    {
      q: "Is WPC waterproof?",
      a: "Yes. WPC (wood-polymer composite) does not absorb water, swell or attract termites, which makes it suitable for bathrooms, balconies and utility areas as well as living rooms.",
    },
    {
      q: "Can panels go over existing walls?",
      a: "Yes. We fix a levelled frame over the existing plaster or tiles and clip the panels on, so there is no demolition and very little dust.",
    },
    {
      q: "How long does flooring take?",
      a: "Vinyl and laminate flooring for a 2BHK takes 2–3 days. Engineered wood takes a little longer because of the underlay and skirting work.",
    },
  ],
  stickyBar: {
    label: "Panelling · 120 sq.ft",
    note: "Get a custom quote",
    sub: "after a free site visit",
    primary: "Send on WhatsApp",
    secondary: "Adjust",
  },
  quickEstimate: null,
  related: ["false-ceiling-lighting", "wardrobes-storage", "renovation-repair"],
};

const SERVICE_COMPLETE_HOME: Service = {
  slug: "complete-home-interiors",
  n: "01",
  title: "Complete Home Interiors",
  short: "End-to-end design and build for modern Indian homes.",
  long: "Turnkey interiors for 1BHK to villas with a consistent design, material palette and finish. One team plans, manufactures and installs everything, on one timeline.",
  includes: [
    "Space planning & 3D design",
    "Modular furniture & carpentry",
    "False ceiling & lighting",
    "End-to-end execution",
  ],
  priceChip: "From ₹2.1 lakh",
  gradePrices: { standard: null, premium: null, luxury: null },
  image: "svc-complete-home",
  heroImage: "hero-living",
  headlineLead: "Your whole home, designed and delivered",
  headlineEm: "by one team.",
  heroSub:
    "Wardrobes, ceilings, panelling and flooring planned together, built in our workshop and installed on one timeline.",
  heroPrimary: "Book a free site visit",
  heroSecondary: "WhatsApp your floor plan",
  factChips: [
    { label: "From ₹2.1 lakh", sub: "2–3 BHK", icon: "IndianRupee" },
    { label: "Free site visit", sub: "in Sambhar, Nawa, Jaipur", icon: "MapPin" },
    { label: "One timeline", sub: "Design to handover", icon: "CalendarDays" },
  ],
  callouts: [
    { label: "Space planning and 3D views", x: 24, y: 22 },
    { label: "Wardrobes, ceilings, panelling, flooring", x: 66, y: 44 },
    { label: "One timeline, one team", x: 40, y: 82 },
  ],
  lightsToggle: false,
  options: {
    kind: "package",
    label: "Choose your package",
    moreLabel: "Plan my home",
    items: [
      {
        id: "1bhk",
        label: "1BHK",
        icon: "Home",
        drawing: "floor-plan",
        image: "bedroom-modern",
        note: "One wardrobe, living ceiling, TV unit",
        checklist: ["One bedroom wardrobe", "Living room ceiling", "TV unit", "Shoe rack"],
        timeline: "5–6 weeks",
        bestFor: ["Compact apartments", "First homes and rentals"],
      },
      {
        id: "2bhk",
        label: "2BHK",
        icon: "Home",
        drawing: "floor-plan",
        image: "grid-bedroom",
        note: "Two wardrobes, ceilings, TV unit",
        checklist: [
          "Two bedroom wardrobes",
          "Crockery and study units",
          "Living and bedroom ceilings",
          "TV unit and shoe rack",
        ],
        timeline: "6–8 weeks",
        bestFor: ["Young families", "Jaipur apartments"],
      },
      {
        id: "3bhk",
        label: "3BHK",
        icon: "Building2",
        drawing: "floor-plan",
        image: "featured-living",
        note: "Three wardrobes, ceilings, panelling",
        checklist: [
          "Three bedroom wardrobes",
          "Crockery, study and shoe units",
          "Ceilings in all rooms",
          "TV wall panelling and pooja unit",
        ],
        timeline: "8–10 weeks",
        bestFor: ["Growing families", "Most of our complete homes"],
      },
      {
        id: "villa",
        label: "Villa",
        icon: "Warehouse",
        drawing: "floor-plan",
        image: "hero-living",
        note: "Everything above, plus feature walls and lighting scenes",
        checklist: [
          "Bar and crockery units",
          "Walk-in and hinged wardrobes",
          "Layered ceilings and lighting",
          "Panelling, flooring and pooja room",
        ],
        timeline: "12–16 weeks",
        bestFor: ["Independent houses", "Farmhouses around Jaipur"],
      },
    ],
  },
  finishes: {
    caption: "Tap a style mood to preview the palette.",
    previewImage: "hero-living",
    previewLabel: "Warm Modern: walnut and teal",
    groups: [
      {
        id: "mood",
        label: "Style mood",
        swatches: [
          {
            id: "warm-modern",
            label: "Warm Modern",
            hex: "#6B4428",
            sub: "Walnut + teal",
            image: "hero-living",
          },
          {
            id: "rajasthani",
            label: "Rajasthani Contemporary",
            hex: "#C9A24B",
            sub: "Jali, arches, brass",
            image: "grid-pooja",
          },
          {
            id: "minimal-light",
            label: "Minimal Light",
            hex: "#EFE9DC",
            sub: "Oak + ivory",
            image: "cat-laminate-floor",
          },
        ],
      },
    ],
  },
  fixChips: null,
  inside: {
    eyebrow: "Inside every Shivansh home",
    title: "One process from the first sketch to the keys.",
    text: "Five checkpoints, each signed off before the next begins.",
    image: "iso-home",
  },
  hotspots: [
    {
      n: 1,
      title: "Design sign-off",
      text: "Layouts, 3D views and material samples approved.",
      x: 22,
      y: 20,
    },
    {
      n: 2,
      title: "Workshop build",
      text: "Everything cut, edge-banded and checked in Sambhar.",
      x: 62,
      y: 28,
    },
    {
      n: 3,
      title: "Installation",
      text: "Our own team on site with daily WhatsApp updates.",
      x: 40,
      y: 54,
    },
    {
      n: 4,
      title: "Deep clean",
      text: "Dust removed, surfaces polished, protective film off.",
      x: 76,
      y: 66,
    },
    {
      n: 5,
      title: "Walkthrough",
      text: "Every shutter, drawer and light checked with you.",
      x: 50,
      y: 86,
    },
  ],
  materials: [
    { name: "BWP Marine Plywood", note: "Wardrobes, vanities and wet areas.", image: "board-bwp" },
    {
      name: "Laminate / Acrylic / PU",
      note: "One palette across every room.",
      image: "mat-teal-laminate",
    },
    {
      name: "Gypsum Ceilings",
      note: "Cove and spot lighting in every room.",
      image: "grid-cove-ceiling",
    },
    {
      name: "Branded Hardware",
      note: "Soft-close, tandem and lift-up fittings.",
      image: "mat-hinge",
    },
    {
      name: "Panelling & Flooring",
      note: "Feature walls and wood-look floors.",
      image: "living-slat-panel",
    },
  ],
  gradeRows: [
    {
      grade: "standard",
      name: "Standard",
      from: null,
      bullets: ["MR plywood carcass", "Matte laminates", "Standard fittings", "1 year warranty"],
      recommended: false,
    },
    {
      grade: "premium",
      name: "Premium",
      from: null,
      bullets: [
        "BWP waterproof plywood",
        "Acrylic / high-gloss finishes",
        "Soft-close hardware",
        "5 years warranty",
      ],
      recommended: true,
    },
    {
      grade: "luxury",
      name: "Luxury",
      from: null,
      bullets: [
        "HDHMR / Boilo",
        "PU paint / veneer",
        "Blum / Hettich hardware",
        "10 years warranty",
      ],
      recommended: false,
    },
  ],
  gallery: [
    "featured-living",
    "hero-living",
    "grid-fluted-tv",
    "grid-bedroom",
    "grid-pooja",
    "grid-cove-ceiling",
  ],
  galleryLabel: "Complete home gallery",
  galleryLink: { label: "View all complete homes", to: "/projects?category=complete-homes" },
  caseStudySlug: "walnut-teal-living-room",
  caseStudyQuote: {
    text: "One team, one WhatsApp group, one handover date. That is exactly what we got.",
    name: "Vikram Rathore",
    town: "Jaipur, Rajasthan",
  },
  faqs: [
    SHARED_FAQ_SITE_VISIT,
    {
      q: "What's included in a complete home?",
      a: "Space planning and 3D views, wardrobes, TV and study units, false ceilings with lighting, wall panelling and a deep clean at handover. Civil work, painting and loose furniture are quoted separately if you need them.",
    },
    {
      q: "How are payments staged?",
      a: "A booking amount at design sign-off, a second instalment when manufacturing starts, a third when installation begins and the balance at handover. Every stage is listed in the quotation.",
    },
    {
      q: "Can we live in the house during the work?",
      a: "Yes, most families do. We work room by room, seal off the active area and clean up every evening. Each room is out of use for a few days at most.",
    },
  ],
  stickyBar: {
    label: "3BHK · Premium",
    note: "Book a free site visit for your quote",
    sub: "itemised quotation after the visit",
    primary: "Book a free site visit",
    secondary: "Try the estimator",
  },
  quickEstimate: null,
  related: ["wall-panelling-flooring", "wardrobes-storage", "false-ceiling-lighting"],
};

const SERVICE_RENOVATION: Service = {
  slug: "renovation-repair",
  n: "05",
  title: "Renovation & Repair",
  short: "Updates and repairs handled by our own team.",
  long: "Room-by-room renovation, painting and furniture repair, with minimal disruption. We fix what can be fixed and replace only what needs replacing.",
  includes: [
    "Civil, electrical and plumbing",
    "Painting & polishing",
    "Furniture repair and upgrades",
    "Wardrobe and TV unit refitting",
  ],
  priceChip: "Custom quote",
  gradePrices: { standard: null, premium: null, luxury: null },
  image: "svc-renovation",
  heroImage: "svc-renovation",
  headlineLead: "Refresh one room or the whole house,",
  headlineEm: "cleanly and on time.",
  heroSub:
    "Painting, polishing, refitting and repairs by the same team that builds our wardrobes and ceilings, with a clear scope before we start.",
  heroPrimary: "Get a renovation quote",
  heroSecondary: "WhatsApp photos of the room",
  factChips: [
    { label: "Custom quote", sub: "after a free visit", icon: "IndianRupee" },
    { label: "Free site visit", sub: "in Sambhar, Nawa, Jaipur", icon: "MapPin" },
    { label: "Clean site work", sub: "Covered and cleaned daily", icon: "Sparkles" },
  ],
  callouts: [
    { label: "Clean, on-time site work", x: 26, y: 24 },
    { label: "Painting and polishing", x: 68, y: 36 },
    { label: "Furniture repair", x: 48, y: 80 },
  ],
  lightsToggle: false,
  options: {
    kind: "room",
    label: "Which room needs work?",
    moreLabel: "Send us photos",
    items: [
      {
        id: "bedroom",
        label: "Bedroom",
        icon: "BedDouble",
        image: "grid-bedroom",
        note: "Wardrobe refit, polish, paint, ceiling",
        bestFor: ["Dated wardrobes", "Damp patches", "Old lighting"],
      },
      {
        id: "living",
        label: "Living room",
        icon: "Sofa",
        image: "hero-living",
        note: "TV wall, ceiling, paint, polishing",
        bestFor: ["Plain walls", "Cracked ceilings", "Tired paint"],
      },
      {
        id: "office",
        label: "Office or shop",
        icon: "Store",
        image: "grid-boutique",
        note: "Counters, panelling, lighting, partitions",
        bestFor: ["Quick makeovers", "Weekend work", "Brand refresh"],
      },
      {
        id: "whole",
        label: "Whole house",
        icon: "House",
        image: "svc-renovation",
        note: "Room-by-room plan with one timeline",
        bestFor: ["Resale homes", "Inherited houses", "Rental turnover"],
      },
    ],
  },
  finishes: null,
  fixChips: {
    label: "What needs fixing?",
    items: [
      "Shutters",
      "Hinges and channels",
      "Peeling laminate",
      "Paint",
      "Ceiling cracks",
      "Lighting",
    ],
    uploadLabel: "Send us photos",
  },
  inside: {
    eyebrow: "Inside every Shivansh renovation",
    title: "Fix first, replace only what must be replaced.",
    text: "A clear scope before we start, protection while we work and a clean room at the end.",
    image: "svc-renovation",
  },
  hotspots: [
    {
      n: 1,
      title: "Site protection",
      text: "Floors, furniture and doors covered before work starts.",
      x: 26,
      y: 20,
    },
    {
      n: 2,
      title: "Hinges and channels",
      text: "Replaced with soft-close branded hardware.",
      x: 60,
      y: 30,
    },
    {
      n: 3,
      title: "Laminate and polish",
      text: "Re-laminated shutters, re-polished wood.",
      x: 20,
      y: 58,
    },
    {
      n: 4,
      title: "Paint and ceiling",
      text: "Cracks filled, primed and repainted.",
      x: 74,
      y: 62,
    },
    {
      n: 5,
      title: "Daily clean-up",
      text: "Dust removed every evening, not at the end.",
      x: 46,
      y: 86,
    },
  ],
  materials: [
    {
      name: "Branded Hinges",
      note: "Soft-close replacements for old fittings.",
      image: "mat-hinge",
    },
    { name: "Laminates", note: "Re-lamination in any colour.", image: "mat-teal-laminate" },
    { name: "BWP Plywood", note: "For replaced carcasses in wet areas.", image: "board-bwp" },
    {
      name: "Paint and Polish",
      note: "Low-odour emulsions and PU polish.",
      image: "svc-renovation",
    },
    { name: "Lighting", note: "LED profiles and spots retrofitted.", image: "journal-cove" },
  ],
  gradeRows: [
    {
      grade: "standard",
      name: "Standard",
      from: null,
      bullets: [
        "Repairs and hardware replacement",
        "Touch-up painting",
        "Re-lamination",
        "Workmanship guarantee",
      ],
      recommended: false,
    },
    {
      grade: "premium",
      name: "Premium",
      from: null,
      bullets: [
        "New shutters on existing carcasses",
        "Full room painting and polish",
        "New ceiling and lighting",
        "3 years on hardware",
      ],
      recommended: true,
    },
    {
      grade: "luxury",
      name: "Luxury",
      from: null,
      bullets: [
        "Full refit with new carcasses",
        "Panelling and flooring",
        "Layered lighting",
        "5 years on hardware",
      ],
      recommended: false,
    },
  ],
  gallery: [
    "svc-renovation",
    "grid-bedroom",
    "ws-install",
    "orig-craft",
    "grid-cove-ceiling",
    "hero-living",
  ],
  galleryLabel: "Renovation gallery",
  galleryLink: { label: "View all projects", to: "/projects" },
  caseStudySlug: "fluted-tv-wall",
  caseStudyQuote: {
    text: "They kept the old wall, built the new slat panel over it and the living room was back in use in two weeks.",
    name: "Rohit Sharma",
    town: "Sambhar, Rajasthan",
  },
  faqs: [
    SHARED_FAQ_SITE_VISIT,
    {
      q: "Can you work while we live there?",
      a: "Yes. We work one room at a time, seal the area with sheets, and clean up every evening so the rest of the house stays usable.",
    },
    {
      q: "Do you repair furniture you didn't make?",
      a: "Yes. Hinges, channels, peeling laminate, loose joints and polish can all be repaired on furniture from any maker, as long as the carcass is sound.",
    },
    {
      q: "How fast can you start?",
      a: "Small repairs can usually start within a week of the site visit. Room renovations are scheduled once the scope and quotation are approved, typically within two to three weeks.",
    },
  ],
  stickyBar: {
    label: "Renovation",
    note: "Send photos on WhatsApp for a quick estimate",
    sub: "free site visit to confirm",
    primary: "Send photos on WhatsApp",
    secondary: "Book a visit",
  },
  quickEstimate: null,
  related: ["complete-home-interiors", "wardrobes-storage", "wall-panelling-flooring"],
};

/** In the order of SERVICE_SLUGS (site.ts) and of the numbered lists on Home and Services. */
export const SERVICES: Service[] = [
  SERVICE_COMPLETE_HOME,
  SERVICE_WARDROBES,
  SERVICE_CEILING,
  SERVICE_PANELLING,
  SERVICE_RENOVATION,
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Copy for the Services overview hero and its isometric-home hotspots. */
export const SERVICES_PAGE = {
  eyebrow: "Our services",
  headlineLead: "Everything your space needs,",
  headlineEm: "under one roof.",
  sub: "Design, manufacturing and installation by one accountable team.",
  primary: "Chat on WhatsApp",
  secondary: "Explore our work",
  handNote: "A 3BHK home with thoughtful interiors",
  hotspots: [
    { label: "Ceiling & Lights", slug: "false-ceiling-lighting", x: 44, y: 8 },
    { label: "Wardrobes", slug: "wardrobes-storage", x: 12, y: 30 },
    { label: "Wall Panels", slug: "wall-panelling-flooring", x: 86, y: 52 },
    { label: "Living Room", slug: "complete-home-interiors", x: 66, y: 76 },
    { label: "Flooring", slug: "wall-panelling-flooring", x: 46, y: 92 },
  ] as { label: string; slug: ServiceSlug; x: number; y: number }[],
  rowsLink: "Explore",
  whyOneTeam: {
    eyebrow: "Why choose Shivansh",
    title: "Why one team matters.",
    text: "Design, manufacture and install with one accountable team. Fewer delays, better quality and a smoother experience.",
    columns: ["Shivansh (one team)", "Multiple contractors"],
  },
  grades: { eyebrow: "Material grades" },
  faq: { eyebrow: "Frequently asked questions", title: "Got questions? We've got answers." },
  cta: {
    eyebrow: "Ready to begin",
    titleLead: "Not sure where to start?",
    titleEm: "Send us a photo of your space.",
    primary: "WhatsApp a photo",
    secondary: "Try the estimator",
  },
} as const;

/** Home page "What we build" section copy. */
export const HOME_SERVICES_SECTION = {
  eyebrow: "What we build",
  title: "Everything your home needs, under one roof.",
} as const;
