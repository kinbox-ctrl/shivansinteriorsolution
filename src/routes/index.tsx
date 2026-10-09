import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const TITLE = "Shivansh Interior Solutions | Interiors in Sambhar, Jaipur";
const DESCRIPTION =
  "Wardrobes, false ceilings, wall panelling and complete home interiors designed, manufactured and installed by our own team across Sambhar, Nawa and Jaipur. Interiors built with craft, not shortcuts.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: lazyRouteComponent(() => import("@/components/pages/home/HomePage"), "HomePage"),
});
