# Placeholders to confirm before launch

Everything below is either copied from the Stitch reference renders or invented to fill a
template. The client (Shivansh Interior Solutions, Dinesh Choudhary) should confirm or replace
each item. File paths point at where the value lives.

## Photos

- [ ] Every image under `src/assets/ref/` is a crop of a Google Stitch render, not a real
      photograph. Replace with real project, workshop and team photos before launch. This includes
      the hero living room, all nine project grid cards, the Teal & Copper Kitchen case study
      (hero, before/after, gallery, materials, drawings), service heroes and galleries, material
      boards, grade cards, timeline photos (`tl-*`), workshop photos (`ws-*`), team portraits
      (`team-1`…`team-5`), the founder portrait, journal covers and the workshop exterior.
- [ ] The "before" kitchen photo (`kitchen-before`) is a render. Only the Teal & Copper Kitchen has
      a before/after pair; every other project has `before: null` (`src/content/projects.ts`).
- [ ] Maps are Google Maps embeds (`MAP_EMBED`, `mapEmbedFor` in `site.ts`). The workshop pin uses the
      address query in `site.ts`; confirm it lands on the actual workshop. Project maps only pan to the
      town (`place`), not the street.
- [ ] The original site photos (`orig-hero-living`, `orig-work-*`, `orig-craft`) are reused in a
      few galleries; confirm they may be shown.

## Business facts and numbers

- [ ] Stats on Home (`src/content/home.ts`): "12+ years of craft", "350+ spaces delivered",
      "100% in-house execution", "On time".
- [ ] "48 projects" / "Showing 12 of 48" (`projects.ts`: `PROJECT_COUNT`,
      `PROJECT_COUNT_LABEL`, `PROJECTS_PAGE.showing`).
- [ ] Milestones 2014 / 2017 / 2020 / 2023 / Today (`team.ts`: `MILESTONES`).
- [ ] Opening hours "Mon – Sat, 9:00 AM – 7:00 PM / Sunday by appointment" (`site.ts`: `HOURS`,
      repeated in `contact.ts`: `CONTACT_TILES`).
- [ ] Areas served list beyond Sambhar / Nawa / Jaipur (`contact.ts`: `AREAS_SERVED`).
- [ ] Social profile links are `#` (`site.ts`: `SOCIAL`).
- [ ] The Hindi language toggle (EN | हिंदी) is visual only; no Hindi content exists yet.

## Prices

- The estimator now prices from `RATE_CARD` in `src/content/pricing.ts` (2026 indicative Jaipur-region rates per part: boards, finishes, hardware, labour, counters, accessories, ceilings, lighting, panels) and adds 18% GST. The catalogue prices in `src/content/catalogue.ts` use the same figures. Confirm every rate against current supplier quotes before launch.
  and rates (`src/content/pricing.ts`, `materials.ts`, `services.ts`)

- [ ] Base rates: kitchen ₹1,350, wardrobe ₹1,550, ceiling ₹120, TV unit ₹1,450, panelling ₹450
      per sq.ft; full home from ₹3.9 lakh.
- [ ] Grade multipliers ×1.00 / ×1.35 / ×1.75 and the ±range (×0.95 / ×1.08).
- [ ] Derived "From" prices on service and grade cards (₹1,820, ₹2,360, ₹2,090, ₹2,710, ₹162,
      ₹210 per sq.ft).
- [ ] Home-type presets (areas per space for 1BHK … Shop / Office) in `HOME_TYPES`.
- [ ] Warranty periods: 1 / 5 / 10 years (service grade rows and `GRADES`) versus 2 / 5 / 10 years
      in the How We Build grade table (`GRADE_TABLE_ROWS`), both as drawn in the references.
      Pick one.
- [ ] Hardware brands named: Hettich, Hafele, Blum. Board brands in the journal: Century,
      Greenply, Anchor.
- [ ] Project budgets on case studies (`projects.ts`: `budget.range`), e.g. "₹2.1 – 2.4 lakh".
- [ ] Journal price figures (plywood ₹50–70 / ₹90–130 per sq.ft, laminate/acrylic/PU shutter
      rates, WPC rates, counter rates) are 2026 market indications, not quotes.
- [ ] "GST and lighting profiles included" note on the estimator receipt.

## People, names and quotes

- [ ] Team (`team.ts`: `TEAM`): Mahesh Saini, Ramesh Kumar, Pooja Sharma, Imran Khan and their
      years of service are invented; Dinesh Choudhary "15+ years" also needs confirmation.
- [ ] Founder's note quote and paragraphs (`team.ts`: `FOUNDER_NOTE`); the signature is text.
- [ ] Client testimonials (`testimonials.ts`, `projects.ts` quotes, `services.ts`
      `caseStudyQuote`): Priya Sharma, Rohit Sharma, Vikram Rathore, Anjali Meena, Mahendra
      Choudhary, Suresh Jangid, Kavita Yadav, Neha Agarwal, Sunita Kumawat, Rekha Sharma,
      Meenakshi Joshi are placeholders. Get written consent for real quotes.
- [ ] Journal author bio "over 10 years in interior manufacturing" (`journal.ts`: `AUTHOR_BIO`)
      versus "15+ years" on the team card.
- [ ] Booking-confirmed sample data "Priya", "Sat, 3 Oct 2026", "SIS-2410"
      (`contact.ts`: `THANK_YOU_SAMPLE`) until the form has a backend.

## Projects (`src/content/projects.ts`)

- [ ] Only Teal & Copper Kitchen follows the reference case study. The other nine (Walnut & Teal
      Living Room, Master Bedroom Suite, Office with Timber Slats, Cove Ceiling & Lighting,
      Fluted TV Wall, Ivory Acrylic Kitchen, Kids Room with Study, Boutique Shop Interior, Pooja
      Unit with Jali) have invented stories, briefs, materials, timelines and budgets.
- [ ] Teal & Copper Kitchen: card says 148 sq.ft / 2024 (reference 1 and 3) while the case study
      facts say 120 sq.ft / completed 2025 (reference 4). Both kept as drawn; reconcile.
- [ ] The reference grid card is titled "Teal Shaker Kitchen"; the site uses "Teal & Copper
      Kitchen" everywhere so the card links to the case study. Reference 1 names the third home
      card "Office Panelling"; the site uses "Office with Timber Slats".
- [ ] Project years, grades and places are as drawn in reference 3.

## Services (`src/content/services.ts`)

- [ ] Layout dimensions on plan drawings (e.g. "3040 mm × 2440 mm") are illustrative.
- [ ] Hotspot and callout positions (`callouts`, `hotspots` x/y) are eyeballed for the current
      crops.
- [ ] Wardrobe, ceiling, panelling, complete-home and renovation FAQs beyond the three given in
      the prompts were extended by us.
- [ ] Finish swatch hex values approximate the render colours.

## Journal (`src/content/journal.ts`)

- [ ] Only the BWP vs MR article has a date from the reference (12 Sep 2026); the other six dates
      are invented.
- [ ] All article bodies were written for this build; have Dinesh review the technical claims
      (board grades, LED specs, prices).
- [ ] Journal subscription form ("Get one home idea a month on WhatsApp") has no backend.

## Forms and integrations

- [ ] Booking form (`contact.ts`: `BOOKING_FORM`) has no backend; submissions should go to
      WhatsApp or a form service. Upload dropzone is visual.
- [ ] "Download PDF" on the estimator and "Add to calendar" on the thank-you page need
      implementations.
- [ ] Journal "Share on WhatsApp" and "Copy link" need the final site URL (`site.ts`: `SITE_URL`).
