import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const TITLE = "Contact & Booking — Shivansh Interior Solutions";
const DESCRIPTION =
  "Book a free site visit, call us or send your floor plan on WhatsApp for an estimate.";

export const Route = createFileRoute("/contact/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: lazyRouteComponent(
    () => import("@/components/pages/contact/ContactPage"),
    "ContactPage",
  ),
});
