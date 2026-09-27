import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Container, Heading, Reveal, Section, SlatReveal } from "@/components/site";
import { img } from "@/content/images";
import { SERVICES, SERVICES_PAGE, type Service } from "@/content/services";
import { cn } from "@/lib/utils";
import { serviceRowId } from "./scroll-to-service";

/** The overview shows only the opening sentence of each service's long description. */
function firstSentence(text: string): string {
  const m = /^(.*?[.!?])\s/.exec(text);
  return m?.[1] ?? text;
}

function PriceChip({ chip }: { chip: string }) {
  const m = /^From\s+(.+)$/.exec(chip);
  return (
    <span className="inline-flex flex-col items-start rounded-lg bg-mist px-3.5 py-2 text-teal">
      {m ? (
        <>
          <span className="text-[11px] leading-none font-medium text-ink-soft">From</span>
          <span className="mt-1 text-[16px] leading-none font-bold">{m[1]}</span>
        </>
      ) : (
        <span className="text-[14px] leading-tight font-bold">{chip}</span>
      )}
    </span>
  );
}

function ServiceRow({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal
      as="article"
      delay={(index % 2) * 90}
      id={serviceRowId(service.slug)}
      className={cn(
        "flex scroll-mt-28 flex-col gap-5 sm:flex-row sm:gap-6",
        index >= 2 && "border-t border-line pt-8 lg:pt-10",
      )}
    >
      <SlatReveal className="w-full shrink-0 rounded-2xl sm:w-[40%]">
        <img
          src={img(service.image)}
          alt={service.title}
          width={450}
          height={308}
          loading={index < 2 ? "eager" : "lazy"}
          className="aspect-[16/10] w-full rounded-2xl object-cover sm:aspect-[3/2]"
        />
      </SlatReveal>

      <div className="min-w-0 flex-1">
        <span className="font-mono text-[17px] leading-none text-copper">{service.n}</span>
        <Heading as="h2" size="md" className="mt-2">
          <Link
            to="/services/$slug"
            params={{ slug: service.slug }}
            className="rounded-sm outline-none transition-colors duration-300 hover:text-teal-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
          >
            {service.title}
          </Link>
        </Heading>
        <p className="mt-2 max-w-[40ch] text-[14.5px] leading-snug text-ink">
          {firstSentence(service.long)}
        </p>

        <div className="mt-4 flex items-start justify-between gap-4">
          <ul className="flex flex-col gap-1.5">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-ink">
                <Check
                  aria-hidden
                  strokeWidth={1.75}
                  className="mt-[3px] size-3.5 shrink-0 text-teal"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex shrink-0 flex-col items-start gap-3">
            <PriceChip chip={service.priceChip} />
            <Link
              to="/services/$slug"
              params={{ slug: service.slug }}
              aria-label={`${SERVICES_PAGE.rowsLink} ${service.title}`}
              className="group/link inline-flex items-center gap-1.5 rounded-sm text-[13px] font-semibold text-teal outline-none transition-colors duration-300 hover:text-copper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
            >
              {SERVICES_PAGE.rowsLink}
              <ArrowRight
                aria-hidden
                strokeWidth={1.5}
                className="size-4 transition-transform duration-300 ease-soft group-hover/link:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** Six service rows in a two-column grid (single column on phones). */
export function ServiceRows() {
  return (
    <Section tone="white" className="py-12 lg:py-16" aria-label="Our services">
      <Container className="max-w-[1420px]">
        <div className="grid gap-y-8 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-10">
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.slug} service={service} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
