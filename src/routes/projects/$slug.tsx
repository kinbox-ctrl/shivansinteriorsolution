import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
import { getProject } from "@/content/projects";
import { SITE_NAME } from "@/content/site";

const FALLBACK_TITLE = `Project | ${SITE_NAME}`;
const FALLBACK_DESCRIPTION =
  "A Shivansh Interior Solutions case study: brief, materials, timeline and the finished home.";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} | ${SITE_NAME}` : FALLBACK_TITLE;
    const description = loaderData
      ? `${loaderData.title}, ${loaderData.place}. ${loaderData.summary}`
      : FALLBACK_DESCRIPTION;
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
    () => import("@/components/pages/project/ProjectPage"),
    "ProjectPage",
  ),
});
