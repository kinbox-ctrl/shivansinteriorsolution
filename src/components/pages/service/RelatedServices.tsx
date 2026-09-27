import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow, Reveal, Section } from "@/components/site";
import { img } from "@/content/images";
import { getService, type Service } from "@/content/services";
import type { ServiceSlug } from "@/content/site";

export function RelatedServices({ slugs }: { slugs: readonly ServiceSlug[] }) {
  const related = slugs.map((slug) => getService(slug)).filter((s): s is Service => Boolean(s));
  if (related.length === 0) return null;

  return (
    <Section className="pt-6 pb-16 lg:pt-8 lg:pb-28">
      <Container>
        <Eyebrow className="mb-6">Related services</Eyebrow>
        <div className="grid gap-4 md:grid-cols-3">
          {related.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80} className="h-full">
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group flex h-full gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
              >
                <img
                  src={img(s.image)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="size-24 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <h3 className="font-display text-[20px] leading-tight font-medium tracking-[-0.01em] text-teal">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-snug text-ink-soft">{s.short}</p>
                  <span className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-teal transition-colors group-hover:text-copper">
                    Explore
                    <ArrowRight
                      className="size-3.5 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
