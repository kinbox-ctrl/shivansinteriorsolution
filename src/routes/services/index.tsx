import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const TITLE = "Services — Shivansh Interior Solutions";
const DESCRIPTION =
  "Complete home interiors, modular kitchens, wardrobes, false ceilings, wall panelling and renovation by one accountable team.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: lazyRouteComponent(
    () => import("@/components/pages/services/ServicesPage"),
    "ServicesPage",
  ),
});
