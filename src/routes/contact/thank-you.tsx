import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";

const TITLE = "Booking confirmed — Shivansh Interior Solutions";
const DESCRIPTION =
  "Thank you. Your free site visit request has been received and we will confirm a time shortly.";

/** TanStack's search parser turns numeric-looking values into numbers, so accept both. */
const str = z.union([z.string(), z.number().transform((n) => String(n))]);

const searchSchema = z
  .object({
    name: str,
    phone: str,
    town: str,
    planning: str,
    /** YYYY-MM-DD */
    date: str,
    slot: str,
    ref: str,
  })
  .partial();

export type ThankYouSearch = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/contact/thank-you")({
  validateSearch: (search: Record<string, unknown>): ThankYouSearch => {
    const parsed = searchSchema.safeParse(search);
    return parsed.success ? parsed.data : {};
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: lazyRouteComponent(
    () => import("@/components/pages/thank-you/ThankYouPage"),
    "ThankYouPage",
  ),
});
