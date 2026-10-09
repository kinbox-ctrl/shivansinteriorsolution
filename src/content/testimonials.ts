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
      "They understood what we wanted before we knew how to explain it. The finished wardrobes feel like they were always meant to be there.",
    name: "Priya Sharma",
    town: "Sambhar",
    project: "Wardrobes & TV unit",
    image: "testimonial-room",
    rating: 5,
  },
  {
    quote:
      "They understood our needs so well and gave us a living room wall that is beautiful, functional and easy to keep clean. We couldn't be happier with the result.",
    name: "Rohit Sharma",
    town: "Sambhar",
    project: "Fluted TV Wall",
    image: "grid-fluted-tv",
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
