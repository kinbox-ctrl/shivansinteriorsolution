// Removed from the site on 9 Oct 2026. Original source: see backup/kitchen/README.md

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
