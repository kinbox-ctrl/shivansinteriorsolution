import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
import { getService } from "@/content/services";
import { SITE_NAME } from "@/content/site";

const FALLBACK_TITLE = `Service — ${SITE_NAME}`;
const FALLBACK_DESCRIPTION =
  "What is included, how it is built and what it costs, explained end to end.";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug, title: service.title, description: service.long };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} — ${SITE_NAME}` : FALLBACK_TITLE;
    const description = loaderData ? loaderData.description : FALLBACK_DESCRIPTION;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: lazyRouteComponent(
    () => import("@/components/pages/service/ServicePage"),
    "ServicePage",
  ),
});
