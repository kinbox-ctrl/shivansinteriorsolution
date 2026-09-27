// FAQ lists for the Services, Estimator and Contact pages.

export type Faq = { q: string; a: string };

export const SERVICES_FAQ: Faq[] = [
  {
    q: "Is the site visit really free?",
    a: "Yes, the site visit is completely free. We measure the space, understand your requirements and share a rough estimate along with design suggestions.",
  },
  {
    q: "How long does a modular kitchen take?",
    a: "A typical 100–150 sq.ft kitchen takes 4–6 weeks from design sign-off: about three weeks of manufacturing in our workshop and one to two weeks of installation on site. Complete homes take 8–12 weeks depending on size.",
  },
  {
    q: "Do you give a written warranty?",
    a: "Yes. Every quotation lists the warranty for each item: 1 year at Standard, 5 years at Premium and 10 years at Luxury on branded hardware, plus our own workmanship guarantee on everything we install.",
  },
  {
    q: "Can I see material samples first?",
    a: "Yes. We bring plywood, laminate, acrylic and hardware samples to the site visit, and you are welcome to visit our workshop in Sambhar to see the boards and finishes in person.",
  },
  {
    q: "Do you work outside Sambhar?",
    a: "Yes. We regularly work in Nawa, Jaipur city and towns across Jaipur district such as Phulera, Jobner, Chomu, Kishangarh Renwal and Dudu. Send us your location on WhatsApp and we will confirm.",
  },
];

export const ESTIMATOR_FAQ: Faq[] = [
  {
    q: "How accurate is this estimate?",
    a: "It is an indicative range based on our current per sq.ft rates and typical layouts. Actual prices depend on the exact measurements, the number of drawers and tall units, and the finishes you choose. After a free site visit we send an itemised quotation that usually lands within this range.",
  },
  {
    q: "Why is Premium recommended?",
    a: "Premium uses BWP waterproof plywood, soft-close branded hardware and acrylic or high-gloss finishes, which is the combination most of our clients choose. It costs more than Standard but lasts much longer in kitchens and other wet areas, and comes with a 5-year hardware warranty.",
  },
  {
    q: "Can I pay in stages?",
    a: "Yes. Payments are split across the project: a booking amount at design sign-off, an instalment when manufacturing starts, another when installation begins and the balance at handover. Every stage is written into the quotation.",
  },
];

export const CONTACT_FAQ: Faq[] = [
  {
    q: "Is the site visit really free?",
    a: "Yes. There is no charge and no obligation. We measure the space, discuss what you need and share design suggestions and a rough estimate.",
  },
  {
    q: "What should I keep ready?",
    a: "A floor plan or rough sketch if you have one, a few photos of interiors you like, and a budget range in mind. If the house is under construction, the electrical and plumbing drawings help too.",
  },
  {
    q: "How soon can you start?",
    a: "We can usually visit within 2–3 days of your booking. Manufacturing starts once the design and quotation are signed off, and most kitchens are installed within 4–6 weeks of that.",
  },
];

export const FAQ_SECTION = {
  eyebrow: "Frequently asked questions",
  title: "Got questions? We've got answers.",
} as const;

export const CONTACT_FAQ_SECTION = {
  eyebrow: "Quick answers",
  title: "Common questions.",
} as const;
