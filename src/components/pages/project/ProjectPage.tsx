import { getRouteApi } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Lightbox } from "@/components/site";
import { getProject, PROJECTS } from "@/content/projects";
import { ProjectBeforeAfter } from "./ProjectBeforeAfter";
import { ProjectBrief } from "./ProjectBrief";
import { ProjectClientStory } from "./ProjectClientStory";
import { ProjectDrawings } from "./ProjectDrawings";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectHero } from "./ProjectHero";
import { ProjectMaterials } from "./ProjectMaterials";
import { ProjectNext } from "./ProjectNext";
import { ProjectTimeline } from "./ProjectTimeline";

export type LightboxImage = { src: string; alt: string; caption?: string };

const route = getRouteApi("/projects/$slug");

/** Project case study (reference 4): one template rendered for every entry in PROJECTS. */
export function ProjectPage() {
  const project = route.useLoaderData();
  const next = getProject(project.next) ?? PROJECTS.find((p) => p.slug !== project.slug);

  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);
  const [open, setOpen] = useState(false);
  const openImage = useCallback((image: LightboxImage) => {
    setLightbox(image);
    setOpen(true);
  }, []);

  return (
    <>
      <ProjectHero project={project} />
      <ProjectBrief project={project} />
      <ProjectBeforeAfter project={project} />
      <ProjectDrawings project={project} onOpen={openImage} />
      <ProjectMaterials project={project} />
      <ProjectTimeline project={project} />
      <ProjectGallery project={project} onOpen={openImage} />
      <ProjectClientStory project={project} />
      {next && <ProjectNext next={next} />}

      {lightbox && (
        <Lightbox
          open={open}
          onOpenChange={setOpen}
          src={lightbox.src}
          alt={lightbox.alt}
          {...(lightbox.caption ? { caption: lightbox.caption } : {})}
        />
      )}
    </>
  );
}
