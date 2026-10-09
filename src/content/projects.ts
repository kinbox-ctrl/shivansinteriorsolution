// Portfolio: the grid, the map pins and the case-study data for every project.
// The modular-kitchen case studies were removed (see backup/kitchen); the projects carry shorter
// placeholder stories (see PLACEHOLDERS.md).

import type { ImageKey } from "./image-keys";

export type ProjectCategory =
  | "Bedrooms & Wardrobes"
  | "Living Rooms"
  | "Ceilings & Lighting"
  | "Offices & Shops"
  | "Complete Homes";

export type ProjectLocation = "Sambhar" | "Nawa" | "Jaipur";
export type ProjectGrade = "Standard" | "Premium" | "Luxury";

export type ProjectMaterial = { name: string; note: string; image: ImageKey };
export type ProjectTimelineStep = { day: string; title: string; text: string; icon: string };
export type ProjectDrawing = { n: string; label: string; image: ImageKey };

export type Project = {
  slug: string;
  title: string;
  place: ProjectLocation;
  /** Filter category. */
  category: ProjectCategory;
  /** Short DM Mono meta label on cards, e.g. "Bedroom", "Wall panelling". */
  kind: string;
  grade: ProjectGrade;
  year: string;
  /** "148 sq.ft" style. */
  area: string;
  /** Card image. */
  image: ImageKey;
  /** Case-study hero image. */
  hero: ImageKey;
  /** Tall card in the masonry grid. */
  tall?: boolean;
  featured?: boolean;
  /** "Jaipur · 3BHK · Complete home" style meta for the featured card. */
  featuredMeta?: string;
  /** One-line summary under the case-study title. */
  summary: string;
  story: { title: string; paragraphs: [string, string] };
  asked: [string, string, string, string, string, string];
  facts: { space: string; area: string; grade: ProjectGrade; timeline: string; completed: string };
  materials: ProjectMaterial[];
  timeline: ProjectTimelineStep[];
  drawings: ProjectDrawing[];
  gallery: [ImageKey, ImageKey, ImageKey, ImageKey];
  /** Null when no "before" photograph exists for the project. */
  before: ImageKey | null;
  after: ImageKey;
  quote: { text: string; name: string; town: string; image: ImageKey };
  budget: { label: string; range: string; note: string; cta: string };
  next: string;
};

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Bedrooms & Wardrobes",
  "Living Rooms",
  "Ceilings & Lighting",
  "Offices & Shops",
  "Complete Homes",
];

/** URL-friendly ids for the category chips (?category=). */
export const PROJECT_CATEGORY_IDS: Record<ProjectCategory, string> = {
  "Bedrooms & Wardrobes": "bedrooms-wardrobes",
  "Living Rooms": "living-rooms",
  "Ceilings & Lighting": "ceilings-lighting",
  "Offices & Shops": "offices-shops",
  "Complete Homes": "complete-homes",
};

export const LOCATIONS: ProjectLocation[] = ["Sambhar", "Nawa", "Jaipur"];
export const GRADES: ProjectGrade[] = ["Standard", "Premium", "Luxury"];

/** Placeholder counts shown in the reference ("48 projects", "Showing 12 of 48 projects"). */
export const PROJECT_COUNT = 48;
export const PROJECT_COUNT_LABEL = "48 projects";
export const SPACES_COUNT_LABEL = "350+ spaces.";

const PROJECT_TIMELINE: ProjectTimelineStep[] = [
  {
    day: "Day 1",
    title: "Measure",
    text: "Site visit, measurements and requirement finalisation.",
    icon: "Ruler",
  },
  {
    day: "Day 4",
    title: "Design sign-off",
    text: "Layout, materials and 3D render approvals.",
    icon: "PencilRuler",
  },
  {
    day: "Day 6 – 24",
    title: "Workshop manufacturing",
    text: "In-house fabrication at our workshop.",
    icon: "Factory",
  },
  {
    day: "Day 25 – 33",
    title: "Installation",
    text: "On-site installation by our team.",
    icon: "Hammer",
  },
  {
    day: "Day 35",
    title: "Handover",
    text: "Final inspection and handover to the family.",
    icon: "House",
  },
];

function shortTimeline(build: string, install: string, handover: string): ProjectTimelineStep[] {
  return [
    {
      day: "Day 1",
      title: "Measure",
      text: "Site visit, measurements and requirement finalisation.",
      icon: "Ruler",
    },
    {
      day: "Day 4",
      title: "Design sign-off",
      text: "Layout, materials and 3D render approvals.",
      icon: "PencilRuler",
    },
    {
      day: build,
      title: "Workshop manufacturing",
      text: "In-house fabrication at our workshop.",
      icon: "Factory",
    },
    {
      day: install,
      title: "Installation",
      text: "On-site installation by our team.",
      icon: "Hammer",
    },
    {
      day: handover,
      title: "Handover",
      text: "Final inspection and handover to the family.",
      icon: "House",
    },
  ];
}

const PROJECT_DRAWINGS: ProjectDrawing[] = [
  { n: "01", label: "Floor plan", image: "floor-plan" },
  { n: "02", label: "3D render", image: "render-3d" },
  { n: "03", label: "Elevation", image: "elevation" },
];

export const PROJECTS: Project[] = [
  {
    slug: "walnut-teal-living-room",
    title: "Walnut & Teal Living Room",
    place: "Jaipur",
    category: "Complete Homes",
    kind: "Complete home",
    grade: "Premium",
    year: "2024",
    area: "1,240 sq.ft",
    image: "featured-living",
    hero: "hero-living",
    featured: true,
    featuredMeta: "Jaipur · 3BHK · Complete home",
    summary:
      "A 3BHK apartment brought together with walnut slats, a teal sofa and warm cove lighting.",
    story: {
      title: "One palette across every room.",
      paragraphs: [
        "A family moving into a new 3BHK in Jaipur wanted the whole apartment to feel like one considered home rather than a set of separate rooms. Walnut, petrol teal and warm white became the palette for every space.",
        "We planned the three wardrobes, ceilings, flooring and the slat TV wall together, built everything in our Sambhar workshop and installed on one timeline with one point of contact.",
      ],
    },
    asked: [
      "A single palette for the whole home",
      "A slat TV wall as the living room focus",
      "Cove lighting in every room",
      "Wardrobes with lofts in all three bedrooms",
      "Calm, uncluttered storage everywhere",
      "One timeline and one team",
    ],
    facts: {
      space: "Complete home",
      area: "1,240 sq.ft",
      grade: "Premium",
      timeline: "9 weeks",
      completed: "2024",
    },
    materials: [
      { name: "Walnut veneer slats", note: "Warm, matched grain.", image: "living-slat-panel" },
      { name: "BWP marine plywood", note: "For every carcass.", image: "mat-bwp-plywood" },
      { name: "Teal matte laminate", note: "TV unit and console.", image: "mat-teal-laminate" },
      {
        name: "Gypsum cove ceiling",
        note: "Warm 2700K profile light.",
        image: "grid-cove-ceiling",
      },
      { name: "Soft-close hardware", note: "Every hinge and drawer.", image: "mat-hinge" },
    ],
    timeline: shortTimeline("Day 6 – 40", "Day 41 – 60", "Day 63"),
    drawings: PROJECT_DRAWINGS,
    gallery: ["hero-living", "featured-living", "living-slat-panel", "grid-cove-ceiling"],
    before: null,
    after: "hero-living",
    quote: {
      text: "One team, one WhatsApp group, one handover date. That is exactly what we got.",
      name: "Vikram Rathore",
      town: "Jaipur, Rajasthan",
      image: "testimonial-room",
    },
    budget: {
      label: "This home:",
      range: "₹9.2 – 10.4 lakh",
      note: "Premium, 3BHK",
      cta: "Estimate your home",
    },
    next: "master-bedroom-suite",
  },
  {
    slug: "master-bedroom-suite",
    title: "Master Bedroom Suite",
    place: "Jaipur",
    category: "Bedrooms & Wardrobes",
    kind: "Bedroom",
    grade: "Premium",
    year: "2024",
    area: "420 sq.ft",
    image: "grid-bedroom",
    hero: "next-bedroom",
    summary:
      "A walnut floor-to-ceiling wardrobe, a teal upholstered headboard and a calm cove ceiling.",
    story: {
      title: "Storage that disappears into the wall.",
      paragraphs: [
        "A couple in Jaipur wanted their master bedroom to feel like a hotel suite: a wardrobe that used the full wall height, a proper dressing space and lighting that could be soft in the evening.",
        "We built a walnut veneer wardrobe with a loft and a mirrored dressing unit, added a teal upholstered headboard and finished the room with a peripheral cove ceiling.",
      ],
    },
    asked: [
      "Floor-to-ceiling wardrobe with loft",
      "A dressing unit with a full mirror",
      "Soft, indirect lighting",
      "A headboard with side storage",
      "Walnut and teal palette",
      "Minimal visible hardware",
    ],
    facts: {
      space: "Master bedroom",
      area: "420 sq.ft",
      grade: "Premium",
      timeline: "4 weeks",
      completed: "2024",
    },
    materials: [
      { name: "Walnut veneer", note: "Book-matched shutters.", image: "living-slat-panel" },
      { name: "BWP marine plywood", note: "Stable, warp-free carcass.", image: "mat-bwp-plywood" },
      { name: "Teal upholstery", note: "Headboard and bench.", image: "mat-teal-laminate" },
      { name: "Gypsum cove ceiling", note: "Warm profile light.", image: "grid-cove-ceiling" },
      { name: "Soft-close hinges", note: "Branded, 5-year warranty.", image: "mat-hinge" },
    ],
    timeline: shortTimeline("Day 6 – 18", "Day 19 – 26", "Day 28"),
    drawings: [
      { n: "01", label: "Floor plan", image: "floor-plan" },
      { n: "02", label: "Wardrobe elevation", image: "wardrobe-elevation" },
      { n: "03", label: "3D render", image: "render-3d" },
    ],
    gallery: ["grid-bedroom", "next-bedroom", "bedroom-modern", "cabinet-inside"],
    before: null,
    after: "grid-bedroom",
    quote: {
      text: "The loft and the drawers were planned around exactly what we own. Nothing is wasted.",
      name: "Anjali Meena",
      town: "Jaipur, Rajasthan",
      image: "next-bedroom",
    },
    budget: {
      label: "This bedroom:",
      range: "₹1.6 – 1.8 lakh",
      note: "Premium, 80 sq.ft wardrobe",
      cta: "Estimate your wardrobe",
    },
    next: "office-timber-slats",
  },
  {
    slug: "office-timber-slats",
    title: "Office with Timber Slats",
    place: "Nawa",
    category: "Offices & Shops",
    kind: "Workspace",
    grade: "Standard",
    year: "2024",
    area: "680 sq.ft",
    image: "grid-office",
    hero: "grid-office",
    summary:
      "A bright office corridor with oak slat panelling, teal chairs and a clean laminate workstation run.",
    story: {
      title: "A workspace that feels warm, not corporate.",
      paragraphs: [
        "A trading firm in Nawa wanted its new office to look established without feeling heavy. The brief was warmth, good light and desks that could be reconfigured later.",
        "Oak louvres run along the main wall, workstations are laminate on MR plywood with cable management, and a flat gypsum ceiling carries linear lights over every desk.",
      ],
    },
    asked: [
      "A welcoming reception wall",
      "Eight workstations with storage",
      "Cable management built in",
      "Even, glare-free lighting",
      "A meeting corner with a teal accent",
      "Work completed over two weekends",
    ],
    facts: {
      space: "Office",
      area: "680 sq.ft",
      grade: "Standard",
      timeline: "3 weeks",
      completed: "2024",
    },
    materials: [
      { name: "Oak louvres", note: "Concealed fixing.", image: "living-slat-panel" },
      { name: "MR plywood", note: "Dry-area carcasses.", image: "board-mr" },
      { name: "Matte laminate", note: "Workstations and storage.", image: "mat-teal-laminate" },
      { name: "Gypsum flat ceiling", note: "Linear lights.", image: "journal-ceiling" },
      { name: "Standard hardware", note: "Branded hinges and channels.", image: "mat-hinge" },
    ],
    timeline: shortTimeline("Day 6 – 14", "Day 15 – 20", "Day 21"),
    drawings: [
      { n: "01", label: "Floor plan", image: "floor-plan" },
      { n: "02", label: "3D render", image: "render-3d" },
      { n: "03", label: "Slat wall elevation", image: "elevation" },
    ],
    gallery: ["grid-office", "living-slat-panel", "orig-work-office", "grid-boutique"],
    before: null,
    after: "grid-office",
    quote: {
      text: "Clients notice the slat wall the moment they walk in. The desks were done over two weekends, as promised.",
      name: "Mahendra Choudhary",
      town: "Nawa, Rajasthan",
      image: "grid-office",
    },
    budget: {
      label: "This office:",
      range: "₹3.4 – 3.9 lakh",
      note: "Standard, 680 sq.ft",
      cta: "Get a quote for your office",
    },
    next: "cove-ceiling-lighting",
  },
  {
    slug: "cove-ceiling-lighting",
    title: "Cove Ceiling & Lighting",
    place: "Jaipur",
    category: "Ceilings & Lighting",
    kind: "Ceiling",
    grade: "Premium",
    year: "2023",
    area: "310 sq.ft",
    image: "grid-cove-ceiling",
    hero: "grid-cove-ceiling",
    tall: true,
    summary:
      "A living room ceiling with a peripheral cove, recessed spots and a fan in the centre.",
    story: {
      title: "Light that makes the room feel taller.",
      paragraphs: [
        "A family in Jaipur had a plain 10 ft ceiling and a single tube light. They wanted warm evening light without glare, and a ceiling that hid the AC piping along one wall.",
        "We framed a peripheral gypsum cove with a warm 2700K profile strip, six recessed spots and a central fan point, all wired on separate switches.",
      ],
    },
    asked: [
      "Warm, indirect evening light",
      "Hide the AC piping",
      "Keep the ceiling fan",
      "Spots over the seating",
      "No cracks after the first summer",
      "Done in under a week",
    ],
    facts: {
      space: "Living room ceiling",
      area: "310 sq.ft",
      grade: "Premium",
      timeline: "6 days",
      completed: "2023",
    },
    materials: [
      { name: "Gypsum board", note: "Taped and jointed.", image: "board-hdhmr" },
      { name: "GI framing", note: "600 mm centres.", image: "mat-hinge" },
      { name: "LED profile strip", note: "Warm 2700K.", image: "journal-cove" },
      { name: "Recessed spots", note: "Dimmable downlights.", image: "journal-ceiling" },
      { name: "Emulsion paint", note: "Two coats over primer.", image: "svc-renovation" },
    ],
    timeline: shortTimeline("Day 2 – 4", "Day 2 – 5", "Day 6"),
    drawings: [
      { n: "01", label: "Ceiling plan", image: "floor-plan" },
      { n: "02", label: "3D render", image: "render-3d" },
      { n: "03", label: "Section", image: "elevation" },
    ],
    gallery: ["grid-cove-ceiling", "journal-cove", "journal-ceiling", "hero-living"],
    before: null,
    after: "grid-cove-ceiling",
    quote: {
      text: "The cove light changed the whole room. Evenings feel calm now, and there are no cracks after a year.",
      name: "Suresh Jangid",
      town: "Jaipur, Rajasthan",
      image: "grid-cove-ceiling",
    },
    budget: {
      label: "This ceiling:",
      range: "₹48,000 – 54,000",
      note: "Premium, 310 sq.ft",
      cta: "Estimate your ceiling",
    },
    next: "fluted-tv-wall",
  },
  {
    slug: "fluted-tv-wall",
    title: "Fluted TV Wall",
    place: "Sambhar",
    category: "Living Rooms",
    kind: "Wall panelling",
    grade: "Premium",
    year: "2024",
    area: "96 sq.ft",
    image: "grid-fluted-tv",
    hero: "grid-fluted-tv",
    summary: "A fluted WPC feature wall with a floating TV console and hidden cable routing.",
    story: {
      title: "One wall that does the work of a whole room.",
      paragraphs: [
        "A young family in Sambhar wanted their living room to feel finished without a full renovation. The TV sat on a plain wall with cables trailing to the floor.",
        "We fitted a fluted WPC panel wall in oak tone with a floating laminate console, routed every cable behind the panels and added a linear light above the console.",
      ],
    },
    asked: [
      "A feature wall behind the TV",
      "No visible cables",
      "A console with closed storage",
      "A warm wood tone",
      "Work finished in two days",
      "Something easy to keep clean",
    ],
    facts: {
      space: "TV wall",
      area: "96 sq.ft",
      grade: "Premium",
      timeline: "2 days",
      completed: "2024",
    },
    materials: [
      { name: "WPC fluted panels", note: "Oak tone, waterproof.", image: "journal-wpc" },
      { name: "BWP plywood", note: "Console carcass.", image: "mat-bwp-plywood" },
      { name: "Matte laminate", note: "Console shutters.", image: "mat-teal-laminate" },
      { name: "Linear LED profile", note: "Above the console.", image: "journal-cove" },
      { name: "Soft-close hinges", note: "Console doors.", image: "mat-hinge" },
    ],
    timeline: shortTimeline("Day 4 – 8", "Day 9 – 10", "Day 10"),
    drawings: [
      { n: "01", label: "Wall elevation", image: "elevation" },
      { n: "02", label: "3D render", image: "render-3d" },
      { n: "03", label: "Console detail", image: "floor-plan" },
    ],
    gallery: ["grid-fluted-tv", "living-slat-panel", "hero-living", "featured-living"],
    before: null,
    after: "grid-fluted-tv",
    quote: {
      text: "The fluted wall made our living room look like a magazine picture. Fitted in two days, no mess.",
      name: "Kavita Yadav",
      town: "Sambhar, Rajasthan",
      image: "grid-fluted-tv",
    },
    budget: {
      label: "This wall:",
      range: "₹58,000 – 66,000",
      note: "Premium, 96 sq.ft",
      cta: "Get a quote for your wall",
    },
    next: "kids-room-study",
  },
  {
    slug: "kids-room-study",
    title: "Kids Room with Study",
    place: "Nawa",
    category: "Bedrooms & Wardrobes",
    kind: "Wardrobes",
    grade: "Standard",
    year: "2023",
    area: "180 sq.ft",
    image: "grid-kids-room",
    hero: "grid-kids-room",
    summary:
      "A shared kids' room with a teal-and-ivory wardrobe, open shelves and a study desk under the window.",
    story: {
      title: "Room for two to grow into.",
      paragraphs: [
        "Parents in Nawa needed a room for two children that would work for a six-year-old today and a teenager later: a wardrobe each, a shared study and open shelves for books.",
        "We built a two-door hinged wardrobe with a loft, a window-side study desk with drawers, and open display shelves, all in washable matte laminate on MR plywood.",
      ],
    },
    asked: [
      "Separate wardrobe sections for each child",
      "A study desk with drawers",
      "Open shelves for books and toys",
      "Colours that will not date",
      "Rounded edges and safe hardware",
      "Within a fixed budget",
    ],
    facts: {
      space: "Kids' bedroom",
      area: "180 sq.ft",
      grade: "Standard",
      timeline: "3 weeks",
      completed: "2023",
    },
    materials: [
      { name: "MR plywood", note: "Dry-room carcasses.", image: "board-mr" },
      { name: "Matte laminate", note: "Teal and ivory, wipe-clean.", image: "mat-teal-laminate" },
      { name: "Rounded PVC edges", note: "Child-safe edge-banding.", image: "cabinet-inside" },
      { name: "Standard hinges", note: "Branded, 1-year warranty.", image: "mat-hinge" },
      { name: "Study desk laminate", note: "Scratch-resistant top.", image: "grid-kids-room" },
    ],
    timeline: shortTimeline("Day 6 – 14", "Day 15 – 19", "Day 21"),
    drawings: [
      { n: "01", label: "Floor plan", image: "floor-plan" },
      { n: "02", label: "Wardrobe elevation", image: "wardrobe-elevation" },
      { n: "03", label: "3D render", image: "render-3d" },
    ],
    gallery: ["grid-kids-room", "bedroom-modern", "cabinet-inside", "grid-bedroom"],
    before: null,
    after: "grid-kids-room",
    quote: {
      text: "Both kids have their own side of the wardrobe, and the desk finally gets used for homework.",
      name: "Sunita Kumawat",
      town: "Nawa, Rajasthan",
      image: "grid-kids-room",
    },
    budget: {
      label: "This room:",
      range: "₹1.1 – 1.3 lakh",
      note: "Standard, 180 sq.ft",
      cta: "Estimate your wardrobe",
    },
    next: "boutique-shop-interior",
  },
  {
    slug: "boutique-shop-interior",
    title: "Boutique Shop Interior",
    place: "Sambhar",
    category: "Offices & Shops",
    kind: "Shop",
    grade: "Premium",
    year: "2024",
    area: "540 sq.ft",
    image: "grid-boutique",
    hero: "grid-boutique",
    tall: true,
    summary:
      "A clothing boutique with full-height display shelving, a lit counter and a mirrored trial room.",
    story: {
      title: "Shelves that sell.",
      paragraphs: [
        "A boutique owner on the main road in Sambhar wanted a shop that showed every saree and kurta at eye level, with a counter that looked premium and a trial room customers would actually use.",
        "We built full-height laminate shelving with LED profile lighting on every shelf, a walnut-and-marble counter and a mirrored trial room with a soft-close door.",
      ],
    },
    asked: [
      "Full-height display shelving",
      "Lighting on every shelf",
      "A premium-looking counter",
      "A proper trial room with mirrors",
      "Storage for stock below the displays",
      "Opened before the festive season",
    ],
    facts: {
      space: "Retail shop",
      area: "540 sq.ft",
      grade: "Premium",
      timeline: "4 weeks",
      completed: "2024",
    },
    materials: [
      { name: "BWP plywood shelving", note: "Rigid, load-bearing.", image: "mat-bwp-plywood" },
      { name: "Matte laminate", note: "Ivory and walnut.", image: "mat-teal-laminate" },
      { name: "Marble-look counter", note: "Easy to keep clean.", image: "mat-marble" },
      { name: "LED profile strips", note: "Neutral 4000K on every shelf.", image: "journal-cove" },
      { name: "Soft-close hinges", note: "Storage below displays.", image: "mat-hinge" },
    ],
    timeline: shortTimeline("Day 6 – 18", "Day 19 – 27", "Day 28"),
    drawings: [
      { n: "01", label: "Floor plan", image: "floor-plan" },
      { n: "02", label: "3D render", image: "render-3d" },
      { n: "03", label: "Shelving elevation", image: "elevation" },
    ],
    gallery: ["grid-boutique", "grid-office", "cabinet-inside", "living-slat-panel"],
    before: null,
    after: "grid-boutique",
    quote: {
      text: "Customers stay longer because everything is lit and easy to see. Sales went up in the first month.",
      name: "Rekha Sharma",
      town: "Sambhar, Rajasthan",
      image: "grid-boutique",
    },
    budget: {
      label: "This shop:",
      range: "₹4.2 – 4.8 lakh",
      note: "Premium, 540 sq.ft",
      cta: "Get a quote for your shop",
    },
    next: "pooja-unit-jali",
  },
  {
    slug: "pooja-unit-jali",
    title: "Pooja Unit with Jali",
    place: "Jaipur",
    category: "Complete Homes",
    kind: "Complete home",
    grade: "Premium",
    year: "2024",
    area: "1,180 sq.ft",
    image: "grid-pooja",
    hero: "grid-pooja",
    summary:
      "A 3BHK complete home whose centrepiece is a walnut pooja unit with CNC-cut jali doors and warm backlighting.",
    story: {
      title: "A quiet corner at the heart of the home.",
      paragraphs: [
        "A joint family in Jaipur asked for a complete home in a Rajasthani contemporary style: arches, jali patterns and brass, without the heaviness of traditional furniture.",
        "The pooja unit sets the tone, with CNC-cut jali doors in walnut veneer, a marble base and a warm backlit niche. The same motifs repeat in the wardrobe handles and the living room ceiling.",
      ],
    },
    asked: [
      "A pooja unit that closes with jali doors",
      "Marble base for the idols",
      "Warm, hidden lighting",
      "Rajasthani motifs across the home",
      "Wardrobes and ceilings in the same palette",
      "Storage for pooja items below",
    ],
    facts: {
      space: "Complete home",
      area: "1,180 sq.ft",
      grade: "Premium",
      timeline: "10 weeks",
      completed: "2024",
    },
    materials: [
      { name: "Walnut veneer jali", note: "CNC-cut doors.", image: "grid-pooja" },
      { name: "BWP marine plywood", note: "Every carcass.", image: "mat-bwp-plywood" },
      { name: "Marble base", note: "Polished Makrana.", image: "mat-marble" },
      { name: "Brass handles", note: "Matched to the jali.", image: "mat-copper-handle" },
      { name: "Warm LED backlight", note: "2700K niche light.", image: "journal-cove" },
    ],
    timeline: shortTimeline("Day 6 – 45", "Day 46 – 66", "Day 70"),
    drawings: PROJECT_DRAWINGS,
    gallery: ["grid-pooja", "grid-fluted-tv", "grid-bedroom", "grid-cove-ceiling"],
    before: null,
    after: "grid-pooja",
    quote: {
      text: "The jali doors are the first thing every guest asks about. It feels like a home built for us, not from a catalogue.",
      name: "Meenakshi Joshi",
      town: "Jaipur, Rajasthan",
      image: "grid-pooja",
    },
    budget: {
      label: "This home:",
      range: "₹8.6 – 9.8 lakh",
      note: "Premium, 3BHK",
      cta: "Estimate your home",
    },
    next: "walnut-teal-living-room",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export const FEATURED_PROJECT: Project = PROJECTS[0] as Project;

/** The nine grid cards (everything except the featured project), in reference order. */
export const GRID_PROJECTS: Project[] = PROJECTS.filter((p) => !p.featured);

/** The three cards on the home page "Recent homes" rail. */
export const HOME_PROJECT_SLUGS = ["fluted-tv-wall", "master-bedroom-suite", "office-timber-slats"];

/** Copy for the Projects page. */
export const PROJECTS_PAGE = {
  eyebrow: "Our projects",
  headlineLead: "350+ spaces.",
  headlineEm: "A few we're proudest of.",
  countLabel: PROJECT_COUNT_LABEL,
  countSub: ["Homes · Workspaces · Shops", "Across Sambhar, Nawa and Jaipur"],
  showing: "Showing 12 of 48 projects",
  loadMore: "Load more projects",
  featuredCta: "View case study",
  mapSearch: "Search projects...",
  /** Google Maps query shown when no project is selected. */
  mapRegion: "Sambhar Lake",
  mapCta: "View project",
  cta: {
    title: "Want your home on this page next?",
    text: "Get a free site visit and a personalised design & estimate.",
    primary: "Book a free site visit",
    secondary: "Chat on WhatsApp",
  },
} as const;
