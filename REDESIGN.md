# Shivansh Interior Solutions — redesign brief ("Shivansh Light")

This document is the contract for the site rebuild. Every page is rebuilt to match a set of
reference screens (Google Stitch renders) as closely as possible, on this codebase:
TanStack Start (file routes, SSR) + React 19 + Tailwind CSS v4 + shadcn/ui + `motion` + `lenis`.

The references live outside the repo during the build at
`C:\Users\Aditya\AppData\Local\Temp\claude\D--KINBOX-CTRL-shivansinteriorsolution-main\6ff0629a-e2c4-4753-a913-3ec286da7103\images\<n>.webp`:

| #    | Screen                                                             | Route                           |
| ---- | ------------------------------------------------------------------ | ------------------------------- |
| 1    | Home, full page                                                    | `/`                             |
| 2    | Home, hero detail (header, ruler, hero, marquee, manifesto, stats) | `/`                             |
| 3    | Projects: grid view (left) and map view (right)                    | `/projects`                     |
| 4    | Project case study (template; kitchen study removed, see backup)   | `/projects/fluted-tv-wall`      |
| 5, 6 | Services overview (two renders, same layout)                       | `/services`                     |
| 7    | Service detail (template; kitchens removed, see backup/kitchen)    | `/services/wardrobes-storage`   |
| 8    | How We Build                                                       | `/how-we-build`                 |
| 9    | About                                                              | `/about`                        |
| 10   | Estimator                                                          | `/estimator`                    |
| 11   | Contact & booking                                                  | `/contact`                      |
| 12   | Booking confirmed                                                  | `/contact/thank-you`            |
| 13   | Journal listing                                                    | `/journal`                      |
| 14   | Journal article: BWP vs MR plywood                                 | `/journal/bwp-vs-mr-plywood`    |
| 15   | 404                                                                | any unknown URL                 |
| —    | Product catalogue (no reference; built in the same system)         | `/catalogue`                    |

The section-by-section spec that produced each reference is in the prompt file
`scratchpad/tools/prompts.md` (same folder as the tools). Read the reference image first, the
prompt second: the image wins whenever they differ.

## 1. Design system

### Colours (Tailwind names, defined in `src/styles.css`)

| Name             | Hex               | Use                                                                           |
| ---------------- | ----------------- | ----------------------------------------------------------------------------- |
| `cloud`          | #FBFAF7           | page background                                                               |
| `linen`          | #F4F1EA           | alternate bands, footer, inputs                                               |
| `mist`           | #E8F0EE           | pale teal bands, chips, gradient washes                                       |
| `white`          | #FFFFFF           | cards, header glass, receipts                                                 |
| `ink`            | #0F2E30           | body text, dark headings                                                      |
| `ink-soft`       | #5C6F70           | muted text                                                                    |
| `teal`           | #003C48           | headings (most h1/h2 in the references are teal), links, icons, header button |
| `teal-hover`     | #0A5E6B           | teal hover                                                                    |
| `teal-soft`      | #DCE9E7           | selected-chip fill, table header tint                                         |
| `copper`         | #A9531F           | primary buttons, eyebrow labels, small copper text, numbers "01"              |
| `copper-hover`   | #8E4418           | button hover                                                                  |
| `copper-bright`  | #C66935           | large italic headline phrase, big stat numbers, lines (24px+ only)            |
| `copper-tint`    | #F7E9DE           | tags, chips, soft highlights                                                  |
| `line`           | #E6E3DB           | hairline borders                                                              |
| `line-strong`    | #D3CEC3           | stronger borders                                                              |
| `whatsapp`       | #25D366           | floating WhatsApp button only                                                 |
| `walnut` / `oak` | #6B4428 / #B67945 | decorative only                                                               |

The shadcn tokens are mapped onto these (`primary`=teal, `accent`=copper, `background`=cloud,
`secondary`/`muted`=linen, `card`=white, `border`=line, `ring`=copper), so existing `ui/*`
components look right without changes.

No dark sections anywhere. Photographs supply all the depth.

### Type

- `font-display` Fraunces (headings, big numbers, pull quotes). Headline key phrase in
  _italic_ `text-copper-bright`. Weight 500, tight leading (1.02–1.08), tracking -0.02em.
- `font-sans` Manrope (body, UI). Body 16px/1.65, lead 18px.
- `font-mono` DM Mono (dimensions, specs, prices in tables, step numbers, meta lines like
  "BEDROOM · PREMIUM · 2024", ruler labels).
- `font-hand` Caveat (the handwritten annotations with little arrows seen in the references:
  "Thoughtful interiors, built to last", "Homes designed locally"…). Teal, 18–22px, rotated a few
  degrees.
- Hindi (only the toggle label) Tiro Devanagari Hindi.

Scale at 1440px: display 72–84px (home hero ~84px), h1 64–72px, h2 44–52px, h3 26–28px.
Mobile: hero 40–44px, h2 32–36px.

### Shapes, depth, decoration

- Radii: inputs 8px, cards 16px, photo panels 20–24px, pills for buttons/chips.
- Cards: white, `border border-line`, `shadow-soft`. Hover: `shadow-lift` + `-translate-y-1`.
- Glass: `bg-white/72 backdrop-blur-xl border border-white/60` (header, chips over photos,
  sticky bars).
- Gradient wash behind hero and CTA sections: radial Mist at top-left and Copper Tint at
  bottom-right at ~40% (utility `.wash`).
- Faint blueprint grid on Mist/Cloud sections (utility `.grid-paper`), faint jali pattern on
  Linen bands (`.jali`), both at ≤6% opacity.
- Decorative line-art sketches (plants, arches, jali outlines) in pale teal in the
  margins of most sections, plus handwritten notes with arrows. Implement with the `<Sketch>`
  components and harvested `sketch-*` PNGs; keep them behind content (`pointer-events-none`,
  `-z-10`), `opacity 0.5–0.8`, hidden on mobile where they would crowd the layout.
- Eyebrow labels: 24px copper rule + `tracking-[0.28em] uppercase text-[11px] font-semibold
text-copper` (`<Eyebrow>`).
- Numbered items use DM Mono copper "01 02 03".
- Section rhythm: `py-16 lg:py-24`. Container: `max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10`.
- Rulers: a thin ruler along the very top with tick marks and small DM Mono numbers that doubles
  as a copper scroll-progress line (`<RulerBar>`), and a decorative vertical ruler on the left of
  hero sections with labels 300 / 600 / 900 (`<VerticalRuler>`), as seen in references 2, 4, 5, 8, 9.

### Motion ("soft-close")

Easing `cubic-bezier(0.22, 1, 0.36, 1)`; 200ms micro, 450ms UI, 700–900ms reveals; 70ms stagger;
no bounce. Everything must render complete in SSR HTML and under `prefers-reduced-motion:
reduce` (screenshots are taken with reduced motion emulated, so a hidden element is a bug).

- `<Reveal>` / `data-reveal`: IntersectionObserver adds `.is-in`; CSS transitions opacity/translate.
  Hidden state applies only when `html.js` is set (inline script in the head), so no-JS and
  crawlers see everything.
- `<CountUp>` for stats; `<Marquee>` CSS loop; `<SlatReveal>` 7 Linen slats collapsing over an
  image; hover lifts; header hides on scroll down / shows on scroll up; Lenis smooth scroll (off
  under reduced motion); `motion/react` only for layout/height animations (filters, accordion).

## 2. Architecture

```
src/
  routes/                      one file per route; thin: head() meta + lazyRouteComponent
    __root.tsx                 fonts, meta, <SiteChrome> around <Outlet/>, notFoundComponent
    index.tsx  projects/index.tsx  projects/$slug.tsx  services/index.tsx  services/$slug.tsx
    how-we-build.tsx  about.tsx  estimator.tsx  catalogue.tsx  contact/index.tsx  contact/thank-you.tsx
    journal/index.tsx  journal/$slug.tsx
  components/
    site/                      shared chrome + primitives (owned by the foundation)
    pages/<page>/              one folder per page: <Page>.tsx + its sections (owned by that page)
    ui/                        shadcn (unchanged)
  content/                     typed placeholder content (owned by the content author)
    site.ts services.ts projects.ts journal.ts process.ts materials.ts team.ts faqs.ts
    testimonials.ts pricing.ts image-keys.ts (generated) images.ts (generated)
  lib/                         format.ts (INR, lakh), whatsapp.ts, scroll.ts, cn
  assets/  ref/ (harvested crops)  brand/ (monogram.png, logo-transparent.png)  originals
  styles.css                   tokens + utilities
```

Rules that keep parallel work safe:

1. Route files use `lazyRouteComponent(() => import("@/components/pages/<page>/<Page>"), "<Page>")`
   so a broken page module breaks only its own route in dev.
2. A page agent edits only `src/routes/<its route>` and `src/components/pages/<its page>/**`.
   Shared components and content are read-only for page agents; if something is missing,
   build it locally inside the page folder (and say so in the report).
3. Images: never import from `@/assets` directly in pages; use `img("key")` from
   `@/content/images` with keys from `@/content/image-keys`.
4. Contact details, WhatsApp links, nav: from `@/content/site` (`PHONE_DISPLAY`,
   `PHONE_INTL`, `EMAIL`, `ADDRESS`, `waLink(message)`, `NAV`, `SOCIAL`, `HOURS`).
5. TypeScript is strict (`exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`,
   `noPropertyAccessFromIndexSignature`): index results may be `undefined`, optional props can't
   be passed `undefined` explicitly, and index-signature objects need bracket access.
6. Prettier: printWidth 100, double quotes, trailing commas. Run
   `npx prettier --write <files>` and `npx eslint <files>` before finishing; `npx tsc --noEmit`
   must report no errors in your files.
7. No dark sections, no emoji, thin 1.5px lucide line icons, real copy (no lorem ipsum), prices
   with Indian digit grouping (`formatINR`), `₹4.13 – 4.69 lakh` style for big sums.
8. Every page: responsive down to 390px; `<MobileActionBar>` (Call · WhatsApp · Estimate) is
   rendered by the chrome on every page; keep bottom padding on mobile so it never covers content.
9. Accessibility: visible focus rings (`focus-visible:ring-2 ring-copper`), labelled controls,
   keyboard-operable sliders/tabs/accordions, alt text on every image, `aria-current` on nav.
10. Placeholder content is placeholder: keep names/years/quotes from the content files; do not
    invent new facts about the business beyond what the references and content files show.

## 3. Shared components (contract; implemented in `src/components/site/`)

| Component                                                                                                           | Props / behaviour                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SiteChrome`                                                                                                        | wraps pages: `<RulerBar/>`, `<SiteHeader/>`, `<main>`, `<SiteFooter/>`, `<WhatsAppFab/>`, `<MobileActionBar/>`, Lenis provider                                                                                                                                                                                                                     |
| `SiteHeader`                                                                                                        | logo (monogram + wordmark "Shivansh / INTERIOR SOLUTIONS"), nav from `NAV` with copper underline on active, right: `LangToggle` (EN \| हिंदी), round phone button (`tel:`), teal pill "Book a free site visit →" → `/contact`; white glass, hairline after 80px, hide/show on scroll; mobile menu button → `MobileMenu`                            |
| `SiteFooter`                                                                                                        | brand column (logo + "Interiors built with craft, not shortcuts."), Studio, Explore, Services, Visit & Contact (address, phone, email, social icons), right column "Send us your floor plan on WhatsApp and we'll send an estimate." + copper "Chat on WhatsApp →"; giant faint "Shivansh" wordmark; bottom row © year · Privacy · Terms · Sitemap |
| `Container`                                                                                                         | `className?`; max-w 1320                                                                                                                                                                                                                                                                                                                           |
| `Section`                                                                                                           | `id? tone?: "cloud" \| "linen" \| "mist" \| "white"`, `wash?`, `grid?`, `jali?`, `className?`, padding `py-16 lg:py-24`                                                                                                                                                                                                                            |
| `Eyebrow`                                                                                                           | `children`, `className?`                                                                                                                                                                                                                                                                                                                           |
| `Heading`                                                                                                           | `as?: "h1"\|"h2"\|"h3"`, `size?: "display"\|"xl"\|"lg"\|"md"`, `tone?: "teal"\|"ink"`, children may include `<em>` (renders italic copper-bright)                                                                                                                                                                                                  |
| `Button`                                                                                                            | `variant: "primary" (copper) \| "secondary" (teal outline) \| "teal" (solid) \| "ghost" \| "whatsapp"`, `size?: "sm"\|"md"\|"lg"`, `arrow?`, `icon?`, renders `<Link>` when `to`, `<a>` when `href`, else `<button>`                                                                                                                               |
| `Chip`                                                                                                              | `tone?: "mist"\|"copper"\|"white"\|"teal"`, `selected?`, `icon?`                                                                                                                                                                                                                                                                                   |
| `Card`                                                                                                              | white card with border+shadow; `hover?` lifts                                                                                                                                                                                                                                                                                                      |
| `PhotoPanel`                                                                                                        | `src alt`, `radius?`, `offset?: "mist"` (12px-offset Mist rectangle behind), `aspect?`, `className?`                                                                                                                                                                                                                                               |
| `Reveal`                                                                                                            | `as?`, `delay?`, `y?`, wraps children with `data-reveal`                                                                                                                                                                                                                                                                                           |
| `CountUp`                                                                                                           | `to: number`, `suffix?`, `prefix?`, `duration?`                                                                                                                                                                                                                                                                                                    |
| `Marquee`                                                                                                           | `items: string[]`, `speed?`                                                                                                                                                                                                                                                                                                                        |
| `SlatReveal`                                                                                                        | wraps an `<img>`; 7 Linen slats collapse on enter                                                                                                                                                                                                                                                                                                  |
| `BeforeAfterSlider`                                                                                                 | `before: {src, alt, label}`, `after: {...}`, `initial?`, keyboard + touch, round white compass handle                                                                                                                                                                                                                                              |
| `FaqAccordion`                                                                                                      | `items: {q, a}[]`, numbered 01…, first open by default, plus/minus                                                                                                                                                                                                                                                                                 |
| `ProjectCard`                                                                                                       | `project: Project`, `variant?: "grid"\|"wide"`; glass location chip, Fraunces title, DM Mono meta                                                                                                                                                                                                                                                  |
| `ArticleCard`                                                                                                       | `article: Article`, `variant?: "featured"\|"grid"`                                                                                                                                                                                                                                                                                                 |
| `CtaBand`                                                                                                           | `title` (may include `<em>`), `text?`, `primary: {label, to                                                                                                                                                                                                                                                                                        | href}`, `secondary?`, gradient wash + sketches |
| `Sketch`                                                                                                            | `kind: "plant"\|"plant-large"\|"arch"\|"jali"\|"ladder"`, positioned decor, `className?`                                                                                                                                                                                                                                                |
| `HandNote`                                                                                                          | `children`, `arrow?: "down-left"\|"down-right"\|"left"\|"right"`, `className?`                                                                                                                                                                                                                                                                     |
| `RulerBar`, `VerticalRuler`, `MobileActionBar`, `WhatsAppFab`, `WhatsAppIcon`, `SocialIcons`, `Lightbox` (optional) |

## 4. Content model (in `src/content/`)

- `site.ts`: `SITE_NAME`, `TAGLINE`, `PHONE_DISPLAY` "+91 97835 86683", `PHONE_INTL` "919783586683",
  `EMAIL`, `ADDRESS` (lines + one-line), `MAP_LINK`, `MAP_EMBED`, `mapEmbedFor(place)` (Google Maps embeds), `HOURS`, `waLink(message)`, `NAV`, `SOCIAL`,
  `FOUNDER`.
- `services.ts`: `Service` (slug, title, short, long, includes[], priceChip, gradePrices,
  heroImage, callouts[], options: {kind, label, items[]}, finishes, hotspots[], faqs[], stickyBar,
  caseStudySlug, related[]), `SERVICES`, `getService(slug)`.
- `projects.ts`: `Project` (slug, title, place, category, grade, year, area, image, featured?,
  story?, asked[], facts, materials[], timeline[], gallery[], before/after, quote, budget,
  next), `PROJECTS`, `getProject(slug)`.
- `journal.ts`: `Article` (slug, title, dek, category, readTime, date, image, author, body:
  sections with heading/paragraphs/table/quote/callout/list, related[]), `ARTICLES`, `getArticle`.
- `process.ts`: `HOME_STEPS` (4), `BUILD_STEPS` (6 with includes + image), `HANDOVER_CHECKLIST`.
- `materials.ts`: `MATERIAL_TABS` (boards/finishes/hardware/walls-floors with water-resistance
  0–5), `GRADES` (standard/premium/luxury: bullets, wardrobe/ceiling from-prices),
  `GRADE_TABLE_ROWS`, `WARRANTY_CARDS`.
- `team.ts`: `FOUNDER_NOTE`, `MILESTONES` (2014…Today), `WORKSHOP_PHOTOS`, `VALUES`, `TEAM`, `PROMISES`.
- `faqs.ts`: `SERVICES_FAQ`, `ESTIMATOR_FAQ`, `CONTACT_FAQ`.
- `testimonials.ts`: 3 quotes (name, town, project, image).
- `pricing.ts`: `RATE_CARD` (per-part 2026 rates: carcass, finish, hardware, labour, counters,
  accessories, ceilings, lighting, panels), `SPACES` with per-space `options` (layout, board,
  finish, hardware, counter, loft, lighting …), `GRADE_DEFAULTS`, `estimate(config)` → itemised
  lines with `parts`, subtotal, logistics, 18% GST, total and a ×0.95 / ×1.08 range; `quickEstimate`,
  `gradeRate`, `formatINR`, `formatLakh`, `HOME_TYPES` presets.
- `catalogue.ts`: `CATALOGUE_CATEGORIES`, `PRODUCTS` (indicative ex-GST prices per sq.ft / rft /
  sheet / pair / set), `CATALOGUE_PAGE` copy.
- `PLACEHOLDERS.md` (repo root): every placeholder (photos, names, years, quotes, hours, prices to
  confirm) so the client can replace them.

## 5. Verification

Dev server: `npm run dev -- --port 8080 --strictPort --host localhost` (already running during
the build at http://localhost:8080). Screenshot a route at 1440px with reduced motion:

```
node "<scratchpad>/tools/shot.mjs" http://localhost:8080/about "<scratchpad>/shots/about.png"
node "<scratchpad>/tools/shot.mjs" http://localhost:8080/about "<scratchpad>/shots/about-m.png" 390
```

Compare against the reference image side by side: section order, proportions, type sizes,
colours, spacing, imagery placement, copy. Fix and repeat. Then `npx tsc --noEmit`,
`npx eslint <files>`, `npx prettier --write <files>`.

## Removed: modular kitchens (9 Oct 2026)

The modular-kitchen offering was taken off the site: the service page, the two kitchen case
studies, the kitchen estimator space and rate-card entries, the "Kitchen modules" catalogue
category, two journal articles, and every kitchen-only image. Everything removed is filed under
`backup/kitchen/` (snippets, images and a reverse patch) so it can be restored later; see
`backup/kitchen/README.md`.
