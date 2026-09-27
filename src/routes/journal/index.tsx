import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const TITLE = "Journal — Shivansh Interior Solutions";
const DESCRIPTION = "Notes on materials, planning and living well from the Shivansh workshop.";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: lazyRouteComponent(
    () => import("@/components/pages/journal/JournalPage"),
    "JournalPage",
  ),
});
