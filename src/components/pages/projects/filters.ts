import {
  PROJECT_CATEGORY_IDS,
  type Project,
  type ProjectCategory,
  type ProjectGrade,
  type ProjectLocation,
} from "@/content/projects";

export type ViewMode = "grid" | "map";

export type Filters = {
  /** `null` = "All". */
  category: ProjectCategory | null;
  location: ProjectLocation | "all";
  grade: ProjectGrade | "all";
};

export const EMPTY_FILTERS: Filters = { category: null, location: "all", grade: "all" };

export const SOFT_EASE = [0.22, 1, 0.36, 1] as const;

/** Reverse lookup of `PROJECT_CATEGORY_IDS` (`bedrooms-wardrobes` → "Bedrooms & Wardrobes"). */
export function categoryFromId(id: string | undefined): ProjectCategory | null {
  if (!id) return null;
  const hit = (Object.entries(PROJECT_CATEGORY_IDS) as [ProjectCategory, string][]).find(
    ([, value]) => value === id,
  );
  return hit ? hit[0] : null;
}

export function applyFilters(projects: readonly Project[], filters: Filters): Project[] {
  return projects.filter(
    (p) =>
      (filters.category === null || p.category === filters.category) &&
      (filters.location === "all" || p.place === filters.location) &&
      (filters.grade === "all" || p.grade === filters.grade),
  );
}

/** "BEDROOM · PREMIUM · 2024" style meta used across the page. */
export function projectMeta(p: Project): string {
  return `${p.kind} · ${p.grade} · ${p.year}`;
}
