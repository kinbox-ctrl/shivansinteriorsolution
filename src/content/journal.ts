// Journal articles. Dates other than the BWP article are placeholders (see PLACEHOLDERS.md).

import type { ImageKey } from "./image-keys";

export type ArticleCategory =
  "Cost guide" | "Materials" | "Design ideas" | "Behind the build" | "Planning";

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  "Cost guide",
  "Materials",
  "Design ideas",
  "Behind the build",
  "Planning",
];

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; text: string }
  | { type: "list"; items: string[] };

export type ArticleSection = { id: string; heading: string; blocks: ArticleBlock[] };

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: ArticleCategory;
  readTime: string;
  /** "12 Sep 2026" style. */
  date: string;
  image: ImageKey;
  /** Wide hero on the article page; falls back to image. */
  hero: ImageKey;
  /** Handwritten annotations over the hero image. */
  heroNotes?: string[];
  author: { name: string; role: string; avatar: ImageKey };
  featured?: boolean;
  sections: ArticleSection[];
  quickTips: [string, string, string, string];
  authorBio: string;
  related: [string, string, string];
};

const AUTHOR = {
  name: "Dinesh Choudhary",
  role: "Founder & Chief Craftsman",
  avatar: "avatar-dinesh" as ImageKey,
};

const AUTHOR_BIO =
  "With over 10 years in interior manufacturing, Dinesh personally oversees material selection and quality at our workshop in Sambhar. He believes in honest material lists and long-lasting workmanship.";

export const ARTICLES: Article[] = [
  {
    slug: "modular-kitchen-cost-jaipur-2026",
    title: "Modular kitchen cost in Jaipur (2026): a complete breakdown",
    dek: "Everything you need to know about modular kitchen pricing in Jaipur, including material options, hardware brands, area-wise estimates and tips to get the best value for your budget.",
    category: "Cost guide",
    readTime: "8 min read",
    date: "20 Sep 2026",
    image: "journal-kitchen-featured",
    hero: "journal-kitchen-featured",
    author: AUTHOR,
    featured: true,
    sections: [
      {
        id: "how-priced",
        heading: "How a modular kitchen is priced",
        blocks: [
          {
            type: "p",
            text: "Most studios in Jaipur, including ours, quote a modular kitchen per square foot of cabinet face area: the front surface of all base units, wall units and tall units added together. A typical L-shaped kitchen in a 2BHK or 3BHK apartment works out to 100–150 sq.ft. The rate you are quoted depends on three things: the board inside the cabinets, the finish on the shutters and the hardware that makes drawers and doors move.",
          },
          {
            type: "p",
            text: "At Shivansh our 2026 rates start at ₹1,350 per sq.ft for Standard, ₹1,820 for Premium and ₹2,360 for Luxury. The counter, chimney, hob and sink are quoted separately, because brands and sizes vary so much from family to family.",
          },
        ],
      },
      {
        id: "by-grade",
        heading: "What each grade includes",
        blocks: [
          {
            type: "table",
            head: ["", "Standard", "Premium", "Luxury"],
            rows: [
              ["Carcass", "MR plywood", "BWP marine plywood", "HDHMR / Boilo"],
              [
                "Shutter finish",
                "Matte laminate",
                "Acrylic / high-gloss / PU",
                "PU paint / veneer",
              ],
              [
                "Hardware",
                "Standard fittings",
                "Soft-close (Hettich / Hafele)",
                "Blum / Hettich premium",
              ],
              ["Hardware warranty", "1 year", "5 years", "10 years"],
              ["Price from", "₹1,350/sq.ft", "₹2,000/sq.ft", "₹2,590/sq.ft"],
            ],
          },
          {
            type: "p",
            text: "Standard is a sound kitchen for dry areas and tight budgets. Premium is what most of our clients in Sambhar and Jaipur choose, because BWP plywood and soft-close hardware are the two things you will notice every day for the next fifteen years. Luxury adds handle-less profiles, PU paint and top-end drawer systems.",
          },
        ],
      },
      {
        id: "area-estimates",
        heading: "Area-wise estimates",
        blocks: [
          {
            type: "p",
            text: "A small straight kitchen of 80 sq.ft at Standard grade starts around ₹1.1 lakh. A 120 sq.ft L-shaped kitchen at Premium, the most common brief we get, lands between ₹2.08 and ₹2.36 lakh. A 150 sq.ft U-shaped kitchen at Luxury crosses ₹3.5 lakh before the counter and appliances. Our estimator on this site uses the same rates, so you can try your own numbers in a minute.",
          },
          {
            type: "callout",
            text: "Rule of thumb for Jaipur in 2026: budget ₹1.8–2.4 lakh for a Premium kitchen in a 2–3 BHK apartment, plus ₹40,000–80,000 for the counter, sink and chimney.",
          },
        ],
      },
      {
        id: "hidden-costs",
        heading: "Costs people forget",
        blocks: [
          {
            type: "list",
            items: [
              "Countertop: granite from about ₹180 per sq.ft, quartz from ₹350, both fitted.",
              "Electrical points for the chimney, hob, microwave and under-cabinet lights.",
              "Plumbing shifts if the sink moves from where the builder placed it.",
              "Tall units and corner pull-outs, which cost more per sq.ft than plain base units.",
              "Dismantling and disposing of an old kitchen during a renovation.",
            ],
          },
        ],
      },
      {
        id: "best-value",
        heading: "How to get the best value",
        blocks: [
          {
            type: "p",
            text: "Spend on the parts that touch water and move every day: BWP plywood for the carcass and branded soft-close hinges and channels. Save on the parts that do not: a plain laminate on the inside of shutters, standard shelves in tall units and a simple loft instead of glass-fronted wall units. Ask for an itemised quotation so you can see exactly where each rupee goes, and compare quotes on the same grade, not just the total.",
          },
        ],
      },
    ],
    quickTips: [
      "Ask for the rate per sq.ft and the total face area, not just a lump sum.",
      "Insist on BWP plywood for base units under the sink.",
      "Check that hinge and channel brands are written in the quotation.",
      "Keep 15–20% of the budget for the counter, sink and chimney.",
    ],
    authorBio: AUTHOR_BIO,
    related: [
      "bwp-vs-mr-plywood",
      "laminate-acrylic-pu-wardrobe-finishes",
      "inside-our-workshop-how-a-kitchen-gets-built",
    ],
  },
  {
    slug: "bwp-vs-mr-plywood",
    title: "BWP vs MR plywood: which one for your kitchen?",
    dek: "Why the board inside your cabinets matters more than the finish outside.",
    category: "Materials",
    readTime: "6 min read",
    date: "12 Sep 2026",
    image: "journal-plywood",
    hero: "plywood-hero",
    heroNotes: ["BWP plywood (Marine grade) for wet areas", "MR plywood for dry areas"],
    author: AUTHOR,
    sections: [
      {
        id: "what-are-mr-and-bwp",
        heading: "What are MR and BWP plywood?",
        blocks: [
          {
            type: "p",
            text: "Plywood is the structural base inside your modular kitchen cabinets. While the outside finish (laminate, acrylic, PU) gives the look, it is the plywood that gives strength, stability and long life. Every shutter, shelf and drawer box in a kitchen is cut from a board, and the board decides whether the cabinet is still square and dry after ten monsoons.",
          },
          {
            type: "p",
            text: "MR (Moisture Resistant) plywood is bonded with moisture-resistant resin and works well in dry areas. It is sometimes called commercial ply or IS 303 grade. BWP (Boiling Water Proof) plywood is made with waterproof phenolic resin and is designed to handle high moisture and occasional water exposure. It is the same grade sold as marine plywood, and it carries the IS 710 mark.",
          },
          {
            type: "p",
            text: "The two boards can look almost identical on the shelf. The difference is in the glue between the layers and in how the veneers are treated. Under a hot, humid kitchen sink that difference is everything: MR glue softens and the layers slowly separate, while BWP glue stays bonded even after hours in boiling water, which is exactly the test the standard requires.",
          },
          {
            type: "quote",
            text: "The finish is what you see, but the plywood is what keeps your kitchen strong for years.",
          },
        ],
      },
      {
        id: "key-differences",
        heading: "Key differences at a glance",
        blocks: [
          {
            type: "table",
            head: ["Feature", "MR plywood", "BWP plywood"],
            rows: [
              ["Water resistance", "Resistant to moisture", "Waterproof (boiling water proof)"],
              ["Strength", "Good for dry areas", "Higher strength and durability"],
              ["Best for", "Wardrobes, TV units, dry rooms", "Kitchens, bathrooms, utility areas"],
              ["Typical price (18 mm)", "₹50 – 70 per sq.ft", "₹90 – 130 per sq.ft"],
              ["Lifespan", "8–10 years (indoor, dry use)", "15+ years (even in wet conditions)"],
            ],
          },
          {
            type: "p",
            text: "Two more things worth knowing. BWP boards are usually made from hardwood veneers, so they hold screws and hinges more firmly, which matters for heavy drawers. And because the phenolic resin is darker, a sawn BWP edge shows dark red-brown glue lines, while MR edges look pale. That is the quickest way to check a board on site.",
          },
        ],
      },
      {
        id: "which-one-where",
        heading: "Which one to use where?",
        blocks: [
          {
            type: "p",
            text: "Use BWP plywood for kitchen base and wall cabinets, especially near the sink, dishwasher or any water source. MR plywood is a good choice for wardrobes, TV units and other dry areas like bedrooms and living rooms. In a bathroom vanity or a utility area with a washing machine, BWP is not optional.",
          },
          {
            type: "list",
            items: [
              "Kitchen base units and the sink unit: BWP, always.",
              "Kitchen wall units: BWP, because steam from the hob rises straight into them.",
              "Bedroom wardrobes and lofts: MR is fine in a dry room; BWP if the wall has ever shown damp.",
              "TV units, study tables, bookshelves: MR.",
              "Bathroom vanities, utility and balcony storage: BWP.",
            ],
          },
          {
            type: "callout",
            text: "Our rule of thumb: BWP for kitchens and other wet areas; MR is fine for wardrobes in dry bedrooms.",
          },
        ],
      },
      {
        id: "cost-comparison",
        heading: "Cost comparison",
        blocks: [
          {
            type: "p",
            text: "On paper BWP costs almost double per board. In a real kitchen the gap is much smaller than it looks. A 120 sq.ft L-shaped kitchen uses roughly 12–14 sheets of 18 mm plywood for the carcasses. At Jaipur 2026 prices that is about ₹22,000 in MR or ₹38,000 in BWP: a difference of around ₹15,000–18,000 on a kitchen that costs ₹2 lakh or more with finishes and hardware.",
          },
          {
            type: "p",
            text: "Compare that with the cost of replacing a swollen sink unit after five years, which means new boards, new laminate, new hinges and two days of a carpenter on site. The premium for BWP pays for itself the first time a pipe joint weeps or a monsoon leaves the wall damp. This is why BWP is standard in our Premium and Luxury grades and why we recommend it even for Standard kitchens.",
          },
          {
            type: "p",
            text: "If the budget is tight, there is a sensible middle path. Use BWP for the sink unit, the base units on either side of it and the wall units above the hob, and MR for the tall unit and the pantry shelves on the dry wall. That mix saves about a third of the BWP premium while protecting the cabinets that actually get wet. Ask for the split to be written into the quotation so you know which unit is which.",
          },
        ],
      },
      {
        id: "our-recommendation",
        heading: "Our recommendation",
        blocks: [
          {
            type: "p",
            text: "For every kitchen we build in Sambhar, Nawa and Jaipur we use 18 mm BWP marine plywood for the carcasses and drawer boxes, with all cut edges sealed with PVC edge-banding so water cannot enter through the end grain. For wardrobes in dry bedrooms we are happy to use MR plywood to keep the budget in check, and we say so in the quotation.",
          },
          {
            type: "p",
            text: "Whatever you choose, ask your carpenter or studio to write the grade and the brand in the quote, and check the ISI stamp on the boards when they arrive on site. IS 710 means BWP; IS 303 means MR. Brands we trust include Century, Greenply and Anchor.",
          },
        ],
      },
      {
        id: "faqs",
        heading: "FAQs",
        blocks: [
          {
            type: "list",
            items: [
              "Is marine plywood the same as BWP? Yes. Marine ply and BWP ply are both IS 710 grade boards bonded with phenolic resin.",
              "Is BWR the same as BWP? No. BWR (boiling water resistant) sits between MR and BWP. It resists steam and humidity but is not fully waterproof.",
              "Can I use MR plywood with a waterproof laminate on top? The laminate protects the face, not the edges or the back. Water finds the edges first.",
              "Does BWP need edge-banding? Yes. Sealed edges stop moisture entering the layers, whatever the grade.",
              "What about HDHMR? HDHMR is a dense fibre board that resists moisture well and takes PU paint beautifully, but it is heavier and holds screws differently, so we use it for Luxury shutters rather than for carcasses under a sink.",
            ],
          },
        ],
      },
    ],
    quickTips: [
      "Use BWP plywood for all kitchen cabinets, especially below the sink.",
      "Check for ISI mark and brand (eg. Century, Greenply, Anchor).",
      "Make sure edges are properly sealed with PVC edge-banding.",
      "Use good quality hardware for longer life.",
    ],
    authorBio: AUTHOR_BIO,
    related: [
      "modular-kitchen-cost-jaipur-2026",
      "false-ceiling-designs-small-rooms",
      "laminate-acrylic-pu-wardrobe-finishes",
    ],
  },
  {
    slug: "false-ceiling-designs-small-rooms",
    title: "5 false ceiling designs that make small rooms feel bigger",
    dek: "Ceiling tricks that add height and light to compact Jaipur apartments.",
    category: "Design ideas",
    readTime: "5 min read",
    date: "4 Sep 2026",
    image: "journal-ceiling",
    hero: "journal-ceiling",
    author: AUTHOR,
    sections: [
      {
        id: "why-ceilings",
        heading: "Why the ceiling matters in a small room",
        blocks: [
          {
            type: "p",
            text: "Most apartments in Jaipur have a slab height of 9.5 to 10 ft. A false ceiling drops that by 4 to 6 inches, so it seems like the last thing a small room needs. Done well, though, a ceiling does the opposite: it moves the light source off the walls, hides the AC pipe that runs along one side and draws the eye along a clean line. The room reads taller because it reads calmer.",
          },
        ],
      },
      {
        id: "designs",
        heading: "Five designs that work",
        blocks: [
          {
            type: "list",
            items: [
              "Peripheral cove: a border around the room with a hidden LED strip washing light up the walls. The centre stays at full height for the fan. This is the design we install most in 10 x 12 ft bedrooms.",
              "Minimal flat with spots: a plain gypsum ceiling 3 inches below the slab with four to six recessed spotlights. No cove, no pattern, just even light. Best for rooms under 9.5 ft.",
              "Floating island over the bed or dining table: a single panel with a light halo around it. It gives a focus without boxing in the whole room.",
              "Linear light slot: one recessed strip running the length of the room. It stretches the space visually and works well in narrow living rooms and corridors.",
              "Cove with a wooden slat strip: a thin band of oak or walnut louvres along one edge, lit from behind. It matches a slat TV wall and adds warmth without heavy mouldings.",
            ],
          },
        ],
      },
      {
        id: "mistakes",
        heading: "Mistakes that make rooms feel smaller",
        blocks: [
          {
            type: "p",
            text: "Heavy multi-level POP designs, dark paint on the ceiling, a chandelier that hangs below door height and coves so deep that the fan sits in a hole. In a compact room keep the ceiling white or a shade lighter than the walls, keep the drop under 6 inches and choose warm 2700K or neutral 4000K light, not cool white, which flattens everything.",
          },
          {
            type: "callout",
            text: "A 12 x 12 ft bedroom with a peripheral cove, six spots and a warm LED strip costs about ₹23,000–30,000 at our Premium grade, including painting.",
          },
        ],
      },
    ],
    quickTips: [
      "Keep the drop to 4–6 inches in rooms under 10 ft.",
      "Put the fan point in the full-height centre, never inside a cove.",
      "Choose warm or neutral white; cool white makes rooms look flat.",
      "Plan the wiring before the board goes up.",
    ],
    authorBio: AUTHOR_BIO,
    related: [
      "cove-lighting-101-warm-or-neutral-white",
      "wpc-wall-panels-pros-cons-costs",
      "modular-kitchen-cost-jaipur-2026",
    ],
  },
  {
    slug: "laminate-acrylic-pu-wardrobe-finishes",
    title: "Laminate, acrylic or PU: choosing wardrobe finishes",
    dek: "Three shutter finishes, what they cost and where each one makes sense.",
    category: "Materials",
    readTime: "7 min read",
    date: "28 Aug 2026",
    image: "journal-wardrobe-finish",
    hero: "journal-wardrobe-finish",
    author: AUTHOR,
    sections: [
      {
        id: "three-finishes",
        heading: "The three finishes explained",
        blocks: [
          {
            type: "p",
            text: "The shutter finish is the surface you see and touch every day, so it is where most people spend their decision time. Laminate is a printed, resin-coated sheet pressed onto the board: hundreds of colours and wood grains, matte or textured, and the most affordable. Acrylic is a thick, glossy sheet that gives a mirror-like depth of colour and wipes clean easily. PU paint is sprayed directly onto an HDHMR or plywood shutter, so there are no edges or joins, and it can be any colour, matte or gloss.",
          },
        ],
      },
      {
        id: "compare",
        heading: "How they compare",
        blocks: [
          {
            type: "table",
            head: ["", "Laminate", "Acrylic", "PU paint"],
            rows: [
              [
                "Look",
                "Matte, textured, wood grains",
                "High-gloss, deep colour",
                "Seamless, any sheen",
              ],
              ["Scratch resistance", "High", "Medium (can be polished)", "Medium"],
              ["Edges", "PVC edge-banding", "Matching acrylic edge", "No visible edge"],
              [
                "Rajasthan heat and dust",
                "Very good",
                "Good, shows fingerprints",
                "Good, repairable",
              ],
              ["Cost per sq.ft (shutter only)", "₹110 – 180", "₹260 – 420", "₹350 – 550"],
            ],
          },
        ],
      },
      {
        id: "where",
        heading: "Which one for your wardrobe?",
        blocks: [
          {
            type: "p",
            text: "For a family bedroom or a kids' room, matte laminate is the sensible choice: it hides fingerprints, survives school bags and costs the least. For a master bedroom where you want a bright, modern look, acrylic on the tall shutters with laminate on the loft keeps the cost balanced. Choose PU when you want a specific colour that laminate catalogues do not offer, or a handle-less wardrobe where edges would otherwise show.",
          },
          {
            type: "callout",
            text: "Our most-ordered combination in Jaipur: walnut laminate on the wardrobe, ivory acrylic on the dressing unit and a fluted glass shutter in the middle.",
          },
        ],
      },
      {
        id: "care",
        heading: "Care and lifespan",
        blocks: [
          {
            type: "p",
            text: "All three last 10–15 years with normal use. Laminate needs nothing more than a damp cloth. Acrylic should be wiped with a microfibre cloth and no abrasive powders; fine scratches can be buffed out. PU can be touched up on site if it chips, which laminate cannot. Whatever you choose, the carcass behind it should still be BWP or MR plywood with sealed edges, because the finish is only as good as the board it sits on.",
          },
        ],
      },
    ],
    quickTips: [
      "Matte laminate for kids' rooms and high-traffic bedrooms.",
      "Mix acrylic on the tall shutters with laminate on lofts to save cost.",
      "Ask for a sample chip in daylight before you decide on gloss.",
      "Check that PVC edge-banding matches the laminate colour.",
    ],
    authorBio: AUTHOR_BIO,
    related: [
      "bwp-vs-mr-plywood",
      "modular-kitchen-cost-jaipur-2026",
      "inside-our-workshop-how-a-kitchen-gets-built",
    ],
  },
  {
    slug: "inside-our-workshop-how-a-kitchen-gets-built",
    title: "Inside our workshop: how a kitchen gets built",
    dek: "From a measured drawing to a finished carcass, step by step in our Sambhar workshop.",
    category: "Behind the build",
    readTime: "6 min read",
    date: "15 Aug 2026",
    image: "journal-workshop",
    hero: "journal-workshop",
    author: AUTHOR,
    sections: [
      {
        id: "drawing",
        heading: "It starts with a drawing, not a saw",
        blocks: [
          {
            type: "p",
            text: "Every kitchen we build begins as a set of measured drawings: a plan, elevations of each wall and a cutting list that names every panel with its size, board grade and finish. The site measurements are taken twice, once at the first visit and again after the counter is fixed, because a platform that is 12 mm out of level changes every base unit. Nothing is cut until the client has signed the 3D view and the itemised quotation.",
          },
        ],
      },
      {
        id: "cutting",
        heading: "Cutting and edge-banding",
        blocks: [
          {
            type: "p",
            text: "Boards are sized on an industrial panel saw that cuts to the millimetre and keeps every edge square, which is what makes cabinets close without gaps. Each panel then goes through the edge-bander, where a PVC strip is glued to every exposed edge and trimmed flush. This is the step most site carpenters skip, and it is the step that stops moisture getting into the plywood.",
          },
          {
            type: "list",
            items: [
              "Panel saw: 18 mm BWP plywood cut from the cutting list, labelled by unit.",
              "Edge-bander: 2 mm PVC on shutter edges, 0.8 mm on internal panels.",
              "Drilling: hinge cups and shelf pins drilled on a jig so every door lines up.",
            ],
          },
        ],
      },
      {
        id: "assembly",
        heading: "Assembly and hardware",
        blocks: [
          {
            type: "p",
            text: "Carcasses are assembled with minifix fittings and dowels, checked for square with a diagonal measure and fitted with hinges, tandem drawer channels and pull-outs in the workshop. Every drawer is opened and closed before it leaves. Shutters are laminated on a hydraulic press so the finish sits flat with no bubbles, then hung on the carcass and adjusted.",
          },
        ],
      },
      {
        id: "site",
        heading: "On site",
        blocks: [
          {
            type: "p",
            text: "Units arrive wrapped and numbered. Our own installation team levels the base units, fixes the wall units to the brickwork with anchor bolts, fits the counter and connects the chimney and lights. Because everything was assembled in the workshop, the site work for a 120 sq.ft kitchen takes about a week, and the family gets photo updates on WhatsApp each evening.",
          },
          {
            type: "callout",
            text: "You are welcome to visit the workshop in Sambhar while your kitchen is being built. Message us on WhatsApp and we will fix a time.",
          },
        ],
      },
    ],
    quickTips: [
      "Ask where your cabinets will be built: workshop or on site.",
      "Edge-banding on every edge is a sign of a proper workshop.",
      "Drawers should be tested before delivery, not after.",
      "Numbered units mean a faster, cleaner installation.",
    ],
    authorBio: AUTHOR_BIO,
    related: [
      "bwp-vs-mr-plywood",
      "modular-kitchen-cost-jaipur-2026",
      "laminate-acrylic-pu-wardrobe-finishes",
    ],
  },
  {
    slug: "wpc-wall-panels-pros-cons-costs",
    title: "WPC wall panels: pros, cons and costs",
    dek: "The fluted panel everyone asks about, honestly assessed.",
    category: "Materials",
    readTime: "5 min read",
    date: "2 Aug 2026",
    image: "journal-wpc",
    hero: "journal-wpc",
    author: AUTHOR,
    sections: [
      {
        id: "what-is-wpc",
        heading: "What WPC is",
        blocks: [
          {
            type: "p",
            text: "WPC stands for wood-polymer composite: wood fibre mixed with PVC and pressed into long fluted or flat panels with a printed wood-grain film on the face. The panels are usually 2.9 m long and 160–200 mm wide, and they clip or stick onto a levelled wall. They became popular for TV walls and bedheads because they give the slat look of wooden louvres at a fraction of the cost.",
          },
        ],
      },
      {
        id: "pros",
        heading: "Pros",
        blocks: [
          {
            type: "list",
            items: [
              "Fully waterproof and termite-proof, so it works in bathrooms, balconies and kitchens.",
              "Light and quick to fit: a 96 sq.ft TV wall takes a day or two.",
              "No painting or polishing; wipe clean with a damp cloth.",
              "Hides uneven plaster and cable runs behind the panel.",
              "Available in oak, walnut, teak, grey and white tones.",
            ],
          },
        ],
      },
      {
        id: "cons",
        heading: "Cons",
        blocks: [
          {
            type: "list",
            items: [
              "The grain is printed, so up close it does not have the depth of real veneer.",
              "Cheaper panels can fade or bow in direct afternoon sun on a west-facing wall.",
              "Joints between panels are visible if the wall is not framed level.",
              "Hard to repair a deep scratch; the panel is replaced instead.",
            ],
          },
          {
            type: "p",
            text: "Most of these are installation problems rather than material problems. A panel fixed on a levelled plywood frame, with the ends closed by matching trims and the first panel set with a spirit level, looks straight from any angle. Ask to see a finished wall by the same team before you order.",
          },
        ],
      },
      {
        id: "costs",
        heading: "Costs in 2026",
        blocks: [
          {
            type: "p",
            text: "Good-quality WPC panels cost ₹90–160 per sq.ft for material, and ₹250–400 per sq.ft installed with a levelled frame, trims and a linear light channel. Real wooden louvres in oak veneer start around ₹650 per sq.ft installed. For a standard 8 x 12 ft TV wall, budget ₹25,000–40,000 in WPC or ₹60,000 and up in veneered louvres.",
          },
          {
            type: "callout",
            text: "Our take: WPC is the right choice for TV walls, bedheads and any wall that sees humidity. Use real louvres where you will touch the wall every day, such as a partition or a staircase.",
          },
        ],
      },
    ],
    quickTips: [
      "Ask for a panel sample and check the film thickness.",
      "Insist on a levelled plywood frame, not glue straight onto plaster.",
      "Leave a channel for a linear light if you might add one later.",
      "Avoid dark WPC on walls that get direct afternoon sun.",
    ],
    authorBio: AUTHOR_BIO,
    related: [
      "false-ceiling-designs-small-rooms",
      "cove-lighting-101-warm-or-neutral-white",
      "laminate-acrylic-pu-wardrobe-finishes",
    ],
  },
  {
    slug: "cove-lighting-101-warm-or-neutral-white",
    title: "Cove lighting 101: warm or neutral white?",
    dek: "How to pick the colour temperature, the strip and the switch for a cove that flatters the room.",
    category: "Design ideas",
    readTime: "4 min read",
    date: "18 Jul 2026",
    image: "journal-cove",
    hero: "journal-cove",
    author: AUTHOR,
    sections: [
      {
        id: "temperature",
        heading: "Warm, neutral or cool",
        blocks: [
          {
            type: "p",
            text: "LED strips are sold by colour temperature in kelvin. Warm white (2700–3000K) looks like an evening lamp and flatters wood, brass and skin tones. Neutral white (4000K) is closer to daylight and keeps whites and greys true. Cool white (6000–6500K) is the blue-ish light of a tube light, and we do not recommend it in a home at all.",
          },
          {
            type: "list",
            items: [
              "Bedrooms and living rooms: warm 2700K in the cove, warm spots to match.",
              "Kitchens: neutral 4000K under the wall units so vegetables and spices look right, warm in the cove above.",
              "Study and work corners: neutral 4000K, dimmable if possible.",
              "Pooja units: warm 2700K, low output, so the niche glows rather than glares.",
            ],
          },
        ],
      },
      {
        id: "strip",
        heading: "Choosing the strip",
        blocks: [
          {
            type: "p",
            text: "Look for a 12 V or 24 V strip with at least 120 LEDs per metre so the light is continuous, not dotted, and a driver sized with 20% headroom. Put the strip in an aluminium profile with a diffuser: it spreads the light, keeps the strip cool and lasts years longer than bare tape stuck to the board. A 12 x 12 ft room needs about 15 m of strip and one 100 W driver.",
          },
        ],
      },
      {
        id: "switching",
        heading: "Switches and dimming",
        blocks: [
          {
            type: "p",
            text: "Wire the cove, the spots and the fan on separate switches, so you can have only the cove on at night. A simple dimmer for the cove costs a few hundred rupees and changes how the room feels more than any other single upgrade. If you might add a smart controller later, leave a neutral wire in the switchboard now.",
          },
          {
            type: "p",
            text: "One last check before the board goes up: switch on every strip and spot with the ceiling open and walk the room in the evening. Fixing a dead section or a mismatched colour temperature takes ten minutes at that stage and half a day once the ceiling is closed and painted.",
          },
          {
            type: "callout",
            text: "Rule of thumb: warm light where you rest, neutral light where you work, and never cool white in a home.",
          },
        ],
      },
    ],
    quickTips: [
      "2700K for bedrooms and living rooms, 4000K for kitchens and studies.",
      "Always use an aluminium profile with a diffuser.",
      "Separate switches for cove, spots and fan.",
      "Size the driver with 20% spare capacity.",
    ],
    authorBio: AUTHOR_BIO,
    related: [
      "false-ceiling-designs-small-rooms",
      "wpc-wall-panels-pros-cons-costs",
      "modular-kitchen-cost-jaipur-2026",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export const FEATURED_ARTICLE: Article = ARTICLES[0] as Article;

/** Grid cards below the featured article, in reference order. */
export const GRID_ARTICLES: Article[] = ARTICLES.filter((a) => !a.featured);

/** URL-friendly ids for the category chips. */
export const ARTICLE_CATEGORY_IDS: Record<ArticleCategory, string> = {
  "Cost guide": "cost-guides",
  Materials: "materials",
  "Design ideas": "design-ideas",
  "Behind the build": "behind-the-build",
  Planning: "planning",
};

/** Chip labels on the listing page (plural forms as in the reference). */
export const ARTICLE_CATEGORY_CHIPS: {
  id: string;
  label: string;
  category: ArticleCategory | null;
}[] = [
  { id: "all", label: "All", category: null },
  { id: "cost-guides", label: "Cost guides", category: "Cost guide" },
  { id: "materials", label: "Materials", category: "Materials" },
  { id: "design-ideas", label: "Design ideas", category: "Design ideas" },
  { id: "behind-the-build", label: "Behind the build", category: "Behind the build" },
  { id: "planning", label: "Planning", category: "Planning" },
];

export const JOURNAL_PAGE = {
  eyebrow: "Insights for a better home",
  title: "The Shivansh Journal",
  sub: "Straight answers on costs, materials and design, from people who build interiors every day.",
  handNote: "Real spaces. Real stories. Real guidance.",
  searchPlaceholder: "Search articles, topics...",
  subscribe: {
    eyebrow: "Stay inspired",
    titleLead: "Get one",
    titleEm: "home idea a month on WhatsApp.",
    text: "Tips, new projects, material guides and honest advice, straight to your WhatsApp.",
    placeholder: "Enter your WhatsApp number",
    button: "Subscribe on WhatsApp",
    note: "No spam. Unsubscribe anytime.",
  },
  pagination: { pages: 3, next: "Next" },
} as const;

export const ARTICLE_PAGE = {
  tocTitle: "In this article",
  share: { whatsapp: "Share on WhatsApp", copy: "Copy link" },
  estimateCard: {
    title: "Estimate your kitchen",
    text: "Get an approximate cost for your modular kitchen in 60 seconds.",
    areaLabel: "Area (sq.ft)",
    gradeLabel: "Material grade",
    button: "Get my estimate",
    note: "Final itemised quote after a free site visit.",
  },
  quickTipsTitle: "Quick tips",
  authorCta: "Chat with Dinesh on WhatsApp",
  relatedTitle: "Related articles",
  handNote: "Good materials. Last longer.",
} as const;
