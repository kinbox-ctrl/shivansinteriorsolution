import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";
import { PROJECT_CATEGORY_IDS } from "@/content/projects";

const TITLE = "Projects — Shivansh Interior Solutions";
const DESCRIPTION =
  "Recent homes, bedrooms, living rooms and workspaces built by Shivansh Interior Solutions across Sambhar, Nawa and Jaipur.";

const CATEGORY_IDS = Object.values(PROJECT_CATEGORY_IDS) as [string, ...string[]];

/** `?view=map` opens the map view; `?category=bedrooms-wardrobes` pre-selects a category chip. */
const projectsSearchSchema = z.object({
  view: z.enum(["grid", "map"]).optional().catch(undefined),
  category: z.enum(CATEGORY_IDS).optional().catch(undefined),
});

export type ProjectsSearch = z.infer<typeof projectsSearchSchema>;

export const Route = createFileRoute("/projects/")({
  validateSearch: (search: Record<string, unknown>): ProjectsSearch =>
    projectsSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: lazyRouteComponent(
    () => import("@/components/pages/projects/ProjectsPage"),
    "ProjectsPage",
  ),
});
