import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";

const TITLE = "Product catalogue — Shivansh Interior Solutions";
const DESCRIPTION =
  "Boards, shutter finishes, hardware, kitchen modules, wardrobes, wall panels, ceilings and countertops with indicative 2026 prices for Sambhar, Nawa and Jaipur.";

const searchSchema = z.object({
  /** Category id, omitted for all products. */
  c: z.string().optional(),
  /** Free-text search. */
  q: z.string().optional(),
});

export const Route = createFileRoute("/catalogue")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: lazyRouteComponent(
    () => import("@/components/pages/catalogue/CataloguePage"),
    "CataloguePage",
  ),
});
