import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

/** Loose shape so the card does not depend on `@/content/projects`. `image` is a resolved URL. */
export type ProjectCardData = {
  slug: string;
  title: string;
  place?: string;
  category?: string;
  grade?: string;
  year?: number | string;
  area?: string | number;
  image: string;
  imageAlt?: string;
};

export type ProjectCardProps = {
  project: ProjectCardData;
  variant?: "grid" | "wide";
  /** 1-based position for the "01 / 06" meta. */
  index?: number;
  total?: number;
  className?: string;
  loading?: "lazy" | "eager";
};

function metaLine(p: ProjectCardData, index?: number, total?: number) {
  const parts: string[] = [];
  if (index !== undefined) {
    parts.push(
      total !== undefined
        ? `${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
        : String(index).padStart(2, "0"),
    );
  }
  if (p.category) parts.push(p.category);
  if (p.area !== undefined) parts.push(typeof p.area === "number" ? `${p.area} sq.ft.` : p.area);
  if (!p.area && p.year !== undefined) parts.push(String(p.year));
  return parts.join("  ·  ");
}

/** Project tile: photo with a glass location chip, Fraunces title, DM Mono meta, round arrow. */
export function ProjectCard({
  project,
  variant = "grid",
  index,
  total,
  className,
  loading = "lazy",
}: ProjectCardProps) {
  const linkProps = {
    to: "/projects/$slug",
    params: { slug: project.slug },
  } as unknown as LinkProps;
  const wide = variant === "wide";
  return (
    <Link
      {...linkProps}
      className={cn(
        "group/card block overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
        wide && "lg:grid lg:grid-cols-[1.35fr_1fr]",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          wide ? "aspect-[16/10] lg:aspect-auto lg:h-full" : "aspect-[4/3]",
        )}
      >
        <img
          src={project.image}
          alt={project.imageAlt ?? project.title}
          loading={loading}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover/card:scale-[1.04]"
        />
        {project.place && (
          <span className="glass absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] text-teal uppercase">
            <MapPin className="size-3.5" strokeWidth={1.5} aria-hidden />
            {project.place}
          </span>
        )}
      </div>
      <div
        className={cn(
          "flex items-center justify-between gap-4 px-5 py-4",
          wide && "lg:flex-col lg:items-start lg:justify-center lg:p-8",
        )}
      >
        <div className="min-w-0">
          <h3
            className={cn(
              "font-display text-[22px] leading-tight font-medium text-teal",
              wide && "lg:text-[32px]",
            )}
          >
            {project.title}
          </h3>
          <p className="mt-1.5 font-mono text-[11px] tracking-[0.16em] text-ink-soft uppercase">
            {metaLine(project, index, total)}
          </p>
          {wide && project.grade && (
            <p className="mt-3 hidden font-mono text-[11px] tracking-[0.16em] text-copper uppercase lg:block">
              {project.grade}
              {project.year ? ` · ${project.year}` : ""}
            </p>
          )}
        </div>
        <span
          aria-hidden
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal text-white transition-transform duration-300 ease-soft group-hover/card:translate-x-0.5"
        >
          <ArrowRight className="size-4" strokeWidth={1.75} />
        </span>
      </div>
    </Link>
  );
}
