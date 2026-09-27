import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Container, Eyebrow, Heading, Reveal, VerticalRuler } from "@/components/site";
import type { Project } from "@/content/projects";
import { CASE_STUDY_COPY } from "./copy";
import { FACT_ICONS } from "./icons";
import { heroSrc } from "./images";

const FACT_ORDER = ["space", "area", "grade", "timeline", "completed"] as const;

/**
 * Hero: breadcrumb + title column on the left, a wide photo flush with the header bleeding off
 * the right edge, and the white facts bar straddling the photo's bottom edge.
 */
export function ProjectHero({ project }: { project: Project }) {
  const copy = CASE_STUDY_COPY;
  return (
    <section className="wash relative overflow-hidden bg-cloud pt-6 pb-12 lg:pt-0 lg:pb-14">
      <VerticalRuler />

      <div className="relative">
        <Container className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <Reveal className="relative z-10 flex flex-col lg:pt-7 lg:pb-16">
            <nav aria-label="Breadcrumb" className="mb-6 lg:mb-4">
              <ol className="flex items-center gap-1.5 text-[12px] text-ink-soft">
                <li>
                  <Link
                    to="/projects"
                    className="rounded-sm transition-colors duration-200 hover:text-teal"
                  >
                    {copy.breadcrumbRoot}
                  </Link>
                </li>
                <li aria-hidden className="text-line-strong">
                  <ChevronRight className="size-3.5" strokeWidth={1.5} />
                </li>
                <li aria-current="page" className="text-ink">
                  {project.title}
                </li>
              </ol>
            </nav>

            <div className="lg:mt-auto">
              <Eyebrow className="mb-5">{copy.heroEyebrow}</Eyebrow>
              <Heading as="h1" size="xl" className="max-w-[10ch] lg:text-[62px]">
                {project.title}
              </Heading>
              <p className="mt-3 font-mono text-[13px] font-medium tracking-[0.3em] text-copper uppercase">
                {project.place}, Rajasthan
              </p>
              <p className="mt-5 max-w-[36ch] text-[16px] leading-relaxed text-ink-soft">
                {project.summary}
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={120}
            y={32}
            className="relative mt-8 lg:mt-0 lg:min-h-[380px] lg:-mr-[calc((100vw-100%)/2)]"
          >
            <figure className="overflow-hidden rounded-3xl shadow-lift lg:absolute lg:inset-0 lg:rounded-r-none lg:rounded-l-4xl">
              <img
                src={heroSrc(project)}
                alt={`${project.title} in ${project.place}, the finished space`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:aspect-auto lg:h-full"
              />
            </figure>
          </Reveal>
        </Container>
      </div>

      <Container className="relative z-10 -mt-8 lg:-mt-12">
        <Reveal
          as="dl"
          delay={200}
          className="grid grid-cols-2 gap-x-4 gap-y-6 rounded-2xl border border-line bg-white px-5 py-6 shadow-lift sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0 lg:gap-y-0 lg:px-4 lg:py-5 [&>*:first-child]:col-span-2 sm:[&>*:first-child]:col-span-1"
        >
          {FACT_ORDER.map((key, i) => {
            const Icon = FACT_ICONS[key];
            return (
              <div
                key={key}
                className="flex items-center gap-3.5 lg:border-l lg:border-line lg:px-4 lg:first:border-l-0"
                style={{ "--reveal-delay": `${200 + i * 70}ms` } as React.CSSProperties}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-teal">
                  <Icon className="size-[18px]" strokeWidth={1.5} aria-hidden />
                </span>
                <div className="min-w-0">
                  <dt className="font-mono text-[10px] tracking-[0.22em] text-ink-soft uppercase">
                    {copy.facts[key]}
                  </dt>
                  <dd className="mt-0.5 font-display text-[19px] leading-tight whitespace-nowrap text-teal lg:text-[20px]">
                    {project.facts[key]}
                  </dd>
                </div>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
