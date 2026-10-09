import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const TITLE = "Estimator — Shivansh Interior Solutions";
const DESCRIPTION =
  "Get an indicative price range for your wardrobes, ceiling, panelling or full home in a minute.";

export const Route = createFileRoute("/estimator")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: lazyRouteComponent(
    () => import("@/components/pages/estimator/EstimatorPage"),
    "EstimatorPage",
  ),
});
