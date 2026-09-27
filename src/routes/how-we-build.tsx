import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const TITLE = "How We Build — Shivansh Interior Solutions";
const DESCRIPTION =
  "Our six-step process from free site visit to handover, with our own workshop and installation team.";

export const Route = createFileRoute("/how-we-build")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: lazyRouteComponent(
    () => import("@/components/pages/how-we-build/HowWeBuildPage"),
    "HowWeBuildPage",
  ),
});
