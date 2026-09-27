import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const TITLE = "About — Shivansh Interior Solutions";
const DESCRIPTION =
  "The founder, the workshop and the values behind Shivansh Interior Solutions in Sambhar, Rajasthan.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: lazyRouteComponent(() => import("@/components/pages/about/AboutPage"), "AboutPage"),
});
