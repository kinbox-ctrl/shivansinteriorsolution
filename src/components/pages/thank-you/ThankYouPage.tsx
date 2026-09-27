import { getRouteApi } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Circle,
  Clock,
  FileText,
  Home,
  Image as ImageIcon,
  IndianRupee,
  LayoutGrid,
  LayoutTemplate,
  MapPin,
  MessageCircle,
  Ruler,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  HandNote,
  Heading,
  ProjectCard,
  Reveal,
  Section,
  Sketch,
} from "@/components/site";
import { THANK_YOU } from "@/content/contact";
import { img } from "@/content/images";
import { getProject } from "@/content/projects";
import { AddToCalendar } from "./AddToCalendar";
import { bookingWaLink, resolveBooking, type Booking } from "./booking";
import { ConfirmedMark } from "./ConfirmedMark";

const route = getRouteApi("/contact/thank-you");

const ICONS: Record<string, LucideIcon> = {
  Calendar,
  Clock,
  MapPin,
  Home,
  FileText,
  MessageCircle,
  Ruler,
  LayoutTemplate,
  Image: ImageIcon,
  IndianRupee,
};

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? Circle;
  return <Cmp className={className} strokeWidth={1.5} aria-hidden />;
}

/** Booking confirmed page: hero + summary, next steps, tips, and projects to explore. */
export function ThankYouPage() {
  const search = route.useSearch();
  const booking = resolveBooking(search);

  return (
    <>
      <HeroSection booking={booking} />
      <NextStepsSection />
      <TipsSection />
      <ExploreSection />
    </>
  );
}

/* ---------------------------------------------------------------- hero + summary card */

function HeroSection({ booking }: { booking: Booking }) {
  const [noteLeft, noteRight] = THANK_YOU.handNotes;
  return (
    // The band ends at the summary card's midline: pb-0 here, negative bottom margin on the card
    // and matching top padding on "What happens next" (which starts right under the band edge).
    <Section wash className="pt-10 pb-0 lg:pt-14 lg:pb-0">
      {/* line-art margins, clipped to the band so the card can hang below it */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={img("sketch-plant-left")}
          alt=""
          className="absolute -bottom-6 left-0 hidden h-[112%] w-auto max-w-[30vw] object-contain object-left-bottom lg:block"
        />
        <img
          src={img("sketch-arch-right")}
          alt=""
          className="absolute right-0 -bottom-2 hidden h-[106%] w-auto max-w-[32vw] object-contain object-right-bottom lg:block"
        />
        <Sketch
          kind="plant"
          opacity={0.35}
          className="absolute -bottom-4 -left-3 w-[84px] lg:hidden"
        />
      </div>

      {/* handwritten notes: arrow beneath the text, curving down toward the check mark */}
      <HandNote
        arrow="down-right"
        rotate={-8}
        className="absolute top-10 left-[12%] hidden max-w-[170px] flex-col items-end text-center lg:inline-flex xl:left-[14%]"
      >
        {noteLeft}
      </HandNote>
      <HandNote
        arrow="down-right"
        rotate={-6}
        className="absolute top-12 right-[11%] hidden max-w-[190px] flex-col items-end text-center lg:inline-flex xl:right-[13%]"
      >
        {noteRight}
      </HandNote>

      <Container className="relative">
        <div className="mx-auto max-w-[960px] text-center">
          <Reveal y={16}>
            <ConfirmedMark />
          </Reveal>
          <Reveal delay={120}>
            <Heading as="h1" size="xl" className="mt-6 lg:mt-7 lg:text-[58px] xl:text-[62px]">
              {THANK_YOU.headlineLead} <em>{booking.firstName}.</em>
            </Heading>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-relaxed text-ink-soft lg:text-[19px]">
              {THANK_YOU.sub}
            </p>
          </Reveal>
        </div>

        <Reveal
          delay={300}
          className="relative z-10 mx-auto -mb-14 max-w-[1040px] pt-8 lg:-mb-16 lg:pt-10"
        >
          <SummaryCard booking={booking} />
        </Reveal>
      </Container>
    </Section>
  );
}

function SummaryCard({ booking }: { booking: Booking }) {
  return (
    <Card className="rounded-2xl p-5 shadow-lift sm:p-7 lg:px-8 lg:py-8">
      <dl className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-6 lg:flex lg:items-start lg:justify-between lg:gap-x-0">
        {THANK_YOU.summaryFields.map((field, i) => (
          <Reveal
            key={field.key}
            as="div"
            delay={360 + i * 70}
            y={12}
            className="flex items-start gap-3 lg:border-l lg:border-line lg:px-6 lg:whitespace-nowrap lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
          >
            <span className="mt-0.5 shrink-0 text-teal">
              <Icon name={field.icon} className="size-6 lg:size-7" />
            </span>
            <div className="min-w-0">
              <dt className="text-[12px] leading-none tracking-wide text-ink-soft">
                {field.label}
              </dt>
              <dd className="mt-1.5 text-[15px] leading-snug font-medium text-ink lg:text-[16px]">
                {booking[field.key]}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:mt-8">
        <AddToCalendar booking={booking} label={THANK_YOU.calendar} />
        <Button
          variant="whatsapp"
          size="lg"
          arrow
          href={bookingWaLink(booking)}
          className="w-full sm:w-auto"
        >
          {THANK_YOU.whatsapp}
        </Button>
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------------- what happens next */

function SideIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal className="lg:max-w-[270px]">
      <Eyebrow className="mb-4 whitespace-nowrap">{eyebrow}</Eyebrow>
      <Heading as="h2" size="lg" className="lg:text-[42px]">
        {title}
      </Heading>
      {text && <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">{text}</p>}
    </Reveal>
  );
}

function NextStepsSection() {
  const { eyebrow, title, text, steps } = THANK_YOU.next;
  return (
    // pt-24/28 = the hero's card overhang (-mb-14/16) plus the normal section gap.
    <Section className="pt-24 pb-14 lg:pt-28 lg:pb-20">
      <Container className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-10">
        <SideIntro eyebrow={eyebrow} title={title} text={text} />

        <ol className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-start lg:gap-3 lg:overflow-visible lg:pb-0">
          {steps.map((step, i) => (
            <li key={step.n} className="contents">
              {i > 0 && (
                <span
                  aria-hidden
                  className="hidden shrink-0 items-center justify-center self-center text-copper lg:flex"
                >
                  <ArrowRight className="size-6" strokeWidth={1.5} />
                </span>
              )}
              <Reveal
                delay={i * 120}
                className="w-[84%] shrink-0 snap-start sm:w-auto sm:shrink"
                as="div"
              >
                <Card hover className="flex h-full gap-4 p-5 lg:h-auto">
                  <span className="shrink-0 text-teal">
                    <Icon name={step.icon} className="size-9 lg:size-10" />
                  </span>
                  <div className="min-w-0">
                    <span className="font-display text-[22px] leading-none text-copper-bright lg:text-[24px]">
                      {step.n}
                    </span>
                    <h3 className="mt-1.5 font-display text-[19px] leading-tight font-medium text-teal">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{step.text}</p>
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ---------------------------------------------------------------- before we meet */

function TipsSection() {
  const { eyebrow, title, items } = THANK_YOU.tips;
  return (
    <Section tone="linen" jali className="overflow-hidden py-14 lg:py-16">
      <Sketch
        kind="plant"
        opacity={0.3}
        className="absolute -right-3 -bottom-6 hidden w-[120px] lg:block"
      />
      <Container className="relative grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
        <SideIntro eyebrow={eyebrow} title={title} />

        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:self-center">
          {items.map((tip, i) => (
            <Reveal key={tip.title} as="li" delay={i * 100} className="flex gap-4">
              <span className="shrink-0 text-teal">
                <Icon name={tip.icon} className="size-9 lg:size-10" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-[19px] leading-tight font-medium text-teal lg:text-[20px]">
                  {tip.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{tip.text}</p>
                {"link" in tip && (
                  <Link
                    to={tip.link.to}
                    className="group/link mt-3 inline-flex items-center gap-2 text-[14px] font-semibold text-teal underline decoration-teal/40 underline-offset-4 transition-colors duration-200 hover:decoration-teal"
                  >
                    {tip.link.label}
                    <ArrowRight
                      className="size-4 transition-transform duration-300 ease-soft group-hover/link:translate-x-0.5"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ---------------------------------------------------------------- explore while you wait */

function ExploreSection() {
  const { eyebrow, title, text, slugs, viewAll } = THANK_YOU.explore;
  const projects = slugs
    .map((slug) => getProject(slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <Section className="overflow-hidden py-14 lg:py-20">
      {/* arch + plant line-art behind the right end of the project row */}
      <Sketch
        kind="arch"
        opacity={0.3}
        className="absolute -right-10 top-0 hidden w-[200px] lg:block"
      />
      <Sketch
        kind="plant"
        opacity={0.3}
        className="absolute right-[120px] -bottom-8 hidden w-[110px] lg:block"
      />
      <Container className="relative grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
        <SideIntro eyebrow={eyebrow} title={title} text={text} />

        <div className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-[1fr_1fr_1fr_168px] lg:gap-4 lg:overflow-visible lg:pb-0">
          {projects.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 100}
              className="w-[80%] shrink-0 snap-start sm:w-[62%] lg:w-auto lg:shrink"
            >
              <ProjectCard
                project={{
                  slug: p.slug,
                  title: p.title,
                  place: p.place,
                  category: p.kind,
                  image: img(p.image),
                  imageAlt: `${p.title}, ${p.place}`,
                }}
                className="h-full [&_h3]:text-[18px] [&_h3]:leading-snug"
              />
            </Reveal>
          ))}
          <Reveal
            delay={300}
            className="w-[52%] shrink-0 snap-start sm:w-[40%] lg:w-auto lg:shrink"
          >
            <Link
              to="/projects"
              className="group/all jali relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-linen p-5 transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
            >
              <Sketch
                kind="arch"
                opacity={0.25}
                className="absolute -top-2 -right-6 w-[110px] lg:w-[120px]"
              />
              <span className="relative text-copper">
                <LayoutGrid className="size-8" strokeWidth={1.5} aria-hidden />
              </span>
              <span className="relative mt-6 flex flex-col items-start gap-3">
                <span className="min-w-0 text-[15px] leading-snug font-semibold text-teal">
                  {viewAll}
                </span>
                <span
                  aria-hidden
                  className="flex size-11 shrink-0 items-center justify-center self-end rounded-full border border-copper text-copper transition-[transform,background-color,color] duration-300 ease-soft group-hover/all:translate-x-0.5 group-hover/all:bg-copper group-hover/all:text-white"
                >
                  <ArrowRight className="size-4" strokeWidth={1.75} />
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
