# Backup: the modular-kitchen offering

Removed from the live site on 9 October 2026. Nothing in this folder is imported by the app
(`tsconfig.json` only includes `src/`), so it ships nowhere and costs nothing in the build.

## What was removed

| Area                | What                                                                                  | Where it was                                            |
| ------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Service             | "Modular Kitchens" service page (`/services/modular-kitchens`) and its nav/footer links | `src/content/services.ts`, `src/content/site.ts`        |
| Projects            | "Teal & Copper Kitchen" and "Ivory Acrylic Kitchen" case studies, "Kitchens" category | `src/content/projects.ts`                               |
| Journal             | "Modular kitchen cost in Jaipur (2026)" and "Inside our workshop: how a kitchen gets built" | `src/content/journal.ts`                            |
| Estimator           | The `kitchen` space, its options, grade defaults, home-type presets and `kitchenParts()` | `src/content/pricing.ts`                              |
| Rate card           | `layout`, `islandFlat`, `counter`, `accessories` and `labour.kitchen`                  | `src/content/pricing.ts`                                |
| Catalogue           | "Kitchen modules" category and its 7 products                                          | `src/content/catalogue.ts`                              |
| Renovation          | The "Kitchen" room chip                                                                | `src/content/services.ts`                               |
| FAQ / testimonials  | The kitchen timing FAQ and the two kitchen testimonials (rewritten, originals here)     | `src/content/faqs.ts`, `src/content/testimonials.ts`    |
| Decoration          | The `kitchen` line-art `Sketch` kind                                                   | `src/components/site/Sketch.tsx`                        |
| Images              | 24 kitchen-only images (see `images/`)                                                 | `src/assets/ref/`, `src/assets/`, project page assets   |

Copy that merely mentioned kitchens (route descriptions, the complete-home packages, the BWP
plywood article, materials, contact chips, the home "Blueprint to reality" slider) was reworded
rather than removed; those edits are only in the patch.

## Folder layout

- `snippets/` — the removed TypeScript blocks, one file each, exactly as they were in the source
  (they are not compiled; the `.ts` extension is only for syntax highlighting).
- `images/` — the removed image files. `images/assets/work-kitchen.jpg` came from
  `src/assets/`; `kitchen-teal-hero-clean.jpg` from `src/components/pages/project/assets/`;
  the rest from `src/assets/ref/`.
- `remove-kitchen.patch` — the complete diff of `src/` for the removal commit.

## How to restore

The quickest way is to reverse the patch from the repository root:

```bash
git apply -R backup/kitchen/remove-kitchen.patch
```

then move the files in `images/` back to the paths listed above and run `npx tsc --noEmit`.
If the source has drifted too far for the patch to apply, use the snippets instead: each file
names the content array or component it belongs in, and the image keys they reference are
listed in `images/`. After restoring, add the keys back to `src/content/image-keys.ts` and
`src/content/images.ts`.
