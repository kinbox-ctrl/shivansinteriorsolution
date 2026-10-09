// Contact page, booking form options and the booking-confirmed page.
// Hours, areas and the sample confirmation are placeholders (see PLACEHOLDERS.md).

import type { ImageKey } from "./image-keys";
import { EMAIL, PHONE_DISPLAY } from "./site";

export const CONTACT_HERO = {
  eyebrow: "Get in touch",
  headlineLead: "Let's plan",
  headlineEm: "your interiors.",
  text: "Call us, send your floor plan on WhatsApp, or book a free site visit and we'll come to you.",
  handNotes: ["Homes Designed Locally", "Free site visit. No obligation. Clear advice."],
} as const;

export type ContactTile = {
  id: "call" | "whatsapp" | "email";
  icon: string;
  label: string;
  value: string;
  sub: string;
};

export const CONTACT_TILES: ContactTile[] = [
  {
    id: "call",
    icon: "Phone",
    label: "Call",
    value: PHONE_DISPLAY,
    sub: "Mon – Sat, 9:00 AM – 7:00 PM",
  },
  {
    id: "whatsapp",
    icon: "MessageCircle",
    label: "WhatsApp",
    value: "Message us your floor plan",
    sub: "Get a quick reply with estimate and next steps.",
  },
  {
    id: "email",
    icon: "Mail",
    label: "Email",
    value: EMAIL,
    sub: "We usually reply within a few hours.",
  },
];

export const TOWN_OPTIONS = ["Sambhar", "Nawa", "Jaipur", "Other"] as const;
export type TownOption = (typeof TOWN_OPTIONS)[number];

export const PLANNING_OPTIONS = [
  "Wardrobes",
  "Ceiling",
  "Full home",
  "Renovation",
  "Office / Shop",
] as const;
export type PlanningOption = (typeof PLANNING_OPTIONS)[number];

export type TimeSlot = { id: "morning" | "afternoon" | "evening"; label: string; time: string };

export const TIME_SLOTS: TimeSlot[] = [
  { id: "morning", label: "Morning", time: "9 AM – 12 PM" },
  { id: "afternoon", label: "Afternoon", time: "12 PM – 4 PM" },
  { id: "evening", label: "Evening", time: "4 PM – 7 PM" },
];

export const BOOKING_FORM = {
  title: "Book a free site visit",
  stepLabel: "Step 1 of 2",
  fields: {
    name: { label: "Full name", placeholder: "Enter your name" },
    phone: { label: "Phone number", prefix: "+91", placeholder: "10-digit mobile number" },
    town: { label: "Town / Location" },
    planning: { label: "What are you planning?", hint: "(Select all that apply)" },
    date: { label: "Preferred date" },
    time: { label: "Preferred time" },
    upload: {
      label: "Upload floor plan or photos (optional)",
      text: "Drag & drop files here or click to upload",
      hint: "PDF, JPG, PNG (Max 10 MB)",
    },
  },
  submit: "Book my free visit",
  note: "We'll confirm your slot on WhatsApp.",
  /** Number of date chips shown (today + 6). */
  dateChips: 7,
} as const;

export const WORKSHOP_SECTION = {
  eyebrow: "Visit our workshop",
  title: "See where it all comes to life.",
  text: "Our design, carpentry and hardware fitting are done in our own workshop in Sambhar.",
  directions: "Get directions",
  call: "Call before visiting",
  photo: "workshop-exterior" as ImageKey,
} as const;

/** Towns in and around Jaipur district shown as chips; the first three are the core service area. */
export const AREAS_SERVED: string[] = [
  "Sambhar",
  "Nawa",
  "Jaipur",
  "Phulera",
  "Jobner",
  "Chomu",
  "Kishangarh Renwal",
  "Dudu",
  "Bassi",
  "Tonk Road",
  "Bagru",
  "Mauzamabad",
];

export const AREAS_SECTION = {
  eyebrow: "Areas we serve",
  title: "In and around Jaipur district.",
  askTitle: "Don't see your town?",
  askCta: "Ask us on WhatsApp",
} as const;

/** Sample data for the booking-confirmed page until a real form backend exists. */
export const THANK_YOU_SAMPLE = {
  firstName: "Priya",
  date: "Sat, 3 Oct 2026",
  slot: "Morning (10 AM – 12 PM)",
  town: "Jaipur",
  planning: "Wardrobes, Ceiling",
  reference: "SIS-2410",
} as const;

export type ThankYouSummaryField = {
  icon: string;
  label: string;
  key: keyof typeof THANK_YOU_SAMPLE;
};

export const THANK_YOU = {
  headlineLead: "Your site visit is booked,",
  /** Rendered as the italic copper name with a full stop. */
  sub: "Dinesh's team will confirm the exact time on WhatsApp shortly.",
  handNotes: ["Thank you for choosing Shivansh!", "Beautiful homes start with a conversation."],
  summaryFields: [
    { icon: "Calendar", label: "Date", key: "date" },
    { icon: "Clock", label: "Time slot", key: "slot" },
    { icon: "MapPin", label: "Town", key: "town" },
    { icon: "Home", label: "Planning", key: "planning" },
    { icon: "FileText", label: "Reference", key: "reference" },
  ] as ThankYouSummaryField[],
  calendar: "Add to calendar",
  whatsapp: "Chat on WhatsApp now",
  next: {
    eyebrow: "What happens next",
    title: "From booking to your home.",
    text: "A simple and transparent process, with complete support from our team.",
    steps: [
      {
        n: "01",
        icon: "MessageCircle",
        title: "We confirm on WhatsApp",
        text: "Our team will reach out shortly to confirm your visit time and share any details you need.",
      },
      {
        n: "02",
        icon: "Ruler",
        title: "We visit, measure and listen",
        text: "Dinesh's team will come to your home, understand your needs and take measurements.",
      },
      {
        n: "03",
        icon: "FileText",
        title: "You get a design and an itemised quote",
        text: "We'll share layout options, material suggestions and a clear, itemised quotation.",
      },
    ],
  },
  tips: {
    eyebrow: "Before we meet",
    title: "A few things that will help.",
    items: [
      {
        icon: "LayoutTemplate",
        title: "Keep a floor plan or rough sketch handy",
        text: "If you have one, it helps us understand your space better. A rough sketch also works.",
      },
      {
        icon: "Image",
        title: "Save photos of interiors you like",
        text: "Share any style, colour or design ideas you like (even from Instagram or Pinterest).",
      },
      {
        icon: "IndianRupee",
        title: "Think about a budget range",
        text: "This helps us suggest the right materials and solutions for you.",
        link: { label: "Use the estimator", to: "/estimator" },
      },
    ],
  },
  explore: {
    eyebrow: "Explore while you wait",
    title: "Find ideas for your home.",
    text: "Take a look at some of our recent projects to get inspired.",
    slugs: ["fluted-tv-wall", "master-bedroom-suite", "walnut-teal-living-room"],
    viewAll: "View all projects",
  },
} as const;
