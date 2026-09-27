// Client quotes. Names and towns are placeholders from the reference renders (see PLACEHOLDERS.md).

import type { ImageKey } from "./image-keys";

export type Testimonial = {
  quote: string;
  name: string;
  town: string;
  project: string;
  image: ImageKey;
  rating: 5;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They understood what we wanted before we knew how to explain it. The finished kitchen feels like it was always meant to be there.",
    name: "Priya Sharma",
    town: "Sambhar",
    project: "Modular Kitchen",
    image: "testimonial-room",
    rating: 5,
  },
  {
    quote:
      "They understood our needs so well and gave us a kitchen that is beautiful, functional and easy to maintain. We couldn't be happier with the result.",
    name: "Rohit Sharma",
    town: "Sambhar",
    project: "Teal & Copper Kitchen",
    image: "kitchen-after",
    rating: 5,
  },
  {
    quote:
      "One team, one WhatsApp group, one handover date. The whole 3BHK was finished in nine weeks and nothing needed a second visit.",
    name: "Vikram Rathore",
    town: "Jaipur",
    project: "Complete Home",
    image: "featured-living",
    rating: 5,
  },
];

export const TESTIMONIALS_SECTION = {
  eyebrow: "Client stories",
} as const;
