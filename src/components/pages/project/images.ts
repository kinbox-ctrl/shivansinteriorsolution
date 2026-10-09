// Page-local image resolution for the case study template.
//
// `src/content/projects.ts` and the image registry are owned by other agents, so the swaps the
// review asked for (clean hero photos, no baked-in callouts / pins / badges, higher-resolution
// originals where they exist) live here instead of in the content file.

import type { ImageKey } from "@/content/image-keys";
import { img } from "@/content/images";
import type { Project } from "@/content/projects";

/** Keys whose harvested crop carries UI baked in, mapped to a clean alternative. */
const CLEAN_KEY: Partial<Record<ImageKey, ImageKey>> = {
  "hero-living": "orig-hero-living", // "Lights ON" toggle → the original photo
  "grid-bedroom": "orig-work-bedroom", // heart + "JAIPUR" pin → the original photo
  "grid-cove-ceiling": "journal-cove", // heart + "JAIPUR" pin → clean cove crop
};

/** Hero photos per project that use the original, uncropped photo. */
const HERO_SRC: Record<string, string> = {
  "master-bedroom-suite": img("orig-work-bedroom"),
  "walnut-teal-living-room": img("orig-hero-living"),
};

/** Gallery sets for the two projects whose content tiles carry badges or are tiny strips. */
const GALLERY: Record<string, Project["gallery"]> = {
  "master-bedroom-suite": ["orig-work-bedroom", "bedroom-modern", "svc-wardrobes", "next-bedroom"],
  "walnut-teal-living-room": [
    "orig-hero-living",
    "svc-panelling",
    "living-slat-panel",
    "journal-cove",
  ],
};

/** The slim "next project" strip keeps the pillow crop from the reference for the bedroom. */
const NEXT_BANNER_SRC: Record<string, string> = {
  "master-bedroom-suite": img("next-bedroom"),
};

/** `img()` with the baked-in-UI crops swapped for clean ones. */
export function projectImg(key: ImageKey): string {
  return img(CLEAN_KEY[key] ?? key);
}

export function heroSrc(project: Project): string {
  return HERO_SRC[project.slug] ?? projectImg(project.hero);
}

export function galleryKeys(project: Project): Project["gallery"] {
  return GALLERY[project.slug] ?? project.gallery;
}

export function nextBannerSrc(project: Project): string {
  return NEXT_BANNER_SRC[project.slug] ?? heroSrc(project);
}
