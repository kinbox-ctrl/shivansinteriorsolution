import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, Ruler, Star } from "lucide-react";
import {
  BeforeAfterSlider,
  Container,
  Eyebrow,
  PhotoPanel,
  Reveal,
  Section,
  Sketch,
} from "@/components/site";
import { img } from "@/content/images";
import { getProject } from "@/content/projects";
import type { Service } from "@/content/services";

export function HomeStory({ service }: { service: Service }) {
  const project = getProject(service.caseStudySlug);
  const quote = service.caseStudyQuote;

  const afterKey = project?.after ?? service.heroImage;
  const beforeKey =
    project?.before ??
    (project && project.image !== project.after ? project.image : service.heroImage);

  const facts = project
    ? [
        { icon: Ruler, value: project.facts.area, label: "Area" },
        { icon: Clock, value: project.facts.timeline, label: "Timeline" },
        { icon: CalendarDays, value: project.facts.completed, label: "Completed" },
      ]
    : [];

  return (
    <Section tone="linen" jali className="overflow-hidden py-14 lg:py-20">
      <Sketch kind="plant" className="absolute top-8 -right-2 hidden w-32 lg:block" opacity={0.3} />
      <Container>
        <Eyebrow className="mb-6">A real home story</Eyebrow>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-10">
          <Reveal>
            {beforeKey !== afterKey ? (
              <BeforeAfterSlider
                before={{ src: img(beforeKey), alt: "Before the renovation", label: "Before" }}
                after={{ src: img(afterKey), alt: "After: the finished space", label: "After" }}
                aspect="16/10"
                radius="lg"
                ariaLabel={`Compare ${project?.title ?? service.title} before and after`}
              />
            ) : (
              <PhotoPanel
                src={img(afterKey)}
                alt={project?.title ?? service.title}
                aspect="16/10"
                radius="lg"
              />
            )}
          </Reveal>

          <Reveal delay={120}>
            {project ? (
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="group inline-block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
              >
                <h3 className="font-display text-[26px] leading-tight font-medium tracking-[-0.01em] text-teal transition-colors group-hover:text-copper lg:text-[30px]">
                  {project.title}
                </h3>
              </Link>
            ) : (
              <h3 className="font-display text-[26px] leading-tight font-medium tracking-[-0.01em] text-teal lg:text-[30px]">
                {service.title}
              </h3>
            )}
            <p className="mt-1 text-[15px] text-ink-soft">
              {project ? `${project.place}, Rajasthan` : quote.town}
            </p>

            {facts.length > 0 && (
              <dl className="mt-5 grid grid-cols-3 gap-3">
                {facts.map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-3 shadow-soft"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-teal">
                      <Icon className="size-4" strokeWidth={1.5} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <dd className="text-[14px] leading-tight font-semibold text-ink">{value}</dd>
                      <dt className="text-[11px] text-ink-soft">{label}</dt>
                    </div>
                  </div>
                ))}
              </dl>
            )}

            <figure className="mt-5 rounded-2xl border border-line bg-white p-5 shadow-soft lg:p-6">
              <blockquote className="font-display text-[18px] leading-snug text-teal italic lg:text-[20px]">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <span className="block text-[14px] font-semibold text-ink">{quote.name}</span>
                  <span className="block text-[12px] text-ink-soft">{quote.town}</span>
                </div>
                <span
                  className="flex gap-0.5 text-copper-bright"
                  role="img"
                  aria-label="Rated 5 out of 5"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className="size-4 fill-current" strokeWidth={1.5} aria-hidden />
                  ))}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
