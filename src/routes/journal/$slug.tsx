import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
import { getArticle } from "@/content/journal";
import { SITE_NAME } from "@/content/site";

const FALLBACK_TITLE = `Journal — ${SITE_NAME}`;
const FALLBACK_DESCRIPTION = "An article from the Shivansh Interior Solutions journal.";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.article.title} — ${SITE_NAME}` : FALLBACK_TITLE;
    const description = loaderData?.article.dek ?? FALLBACK_DESCRIPTION;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: lazyRouteComponent(
    () => import("@/components/pages/article/ArticlePage"),
    "ArticlePage",
  ),
});
