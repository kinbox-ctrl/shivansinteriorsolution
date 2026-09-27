import { Check, X } from "lucide-react";
import { Container, Eyebrow, Heading, Reveal, Section, Sketch } from "@/components/site";
import { img } from "@/content/images";
import { COMPARISON_COLUMNS, COMPARISON_ROWS, GRADES } from "@/content/materials";
import { SERVICES_PAGE } from "@/content/services";
import { cn } from "@/lib/utils";

function Mark({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-full",
        ok ? "bg-copper text-white" : "bg-line-strong/70 text-white",
      )}
    >
      {ok ? (
        <Check aria-hidden strokeWidth={2} className="size-3.5" />
      ) : (
        <X aria-hidden strokeWidth={2} className="size-3.5" />
      )}
    </span>
  );
}

function ComparisonTable() {
  const [shivansh, contractors] = COMPARISON_COLUMNS;
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-soft">
      <table className="w-full min-w-[340px] border-collapse text-left">
        <caption className="sr-only">{SERVICES_PAGE.whyOneTeam.title}</caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="w-[38%] px-4 py-4">
              <span className="sr-only">Stage</span>
            </th>
            <th
              scope="col"
              className="bg-mist/70 px-2 py-4 text-center text-[11px] font-semibold whitespace-nowrap text-teal"
            >
              {shivansh}
            </th>
            <th
              scope="col"
              className="px-2 py-4 text-center text-[11px] font-semibold whitespace-nowrap text-ink"
            >
              {contractors}
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map((row) => (
            <tr key={row.label} className="border-b border-line last:border-b-0">
              <th
                scope="row"
                className="px-4 py-3.5 text-[12.5px] font-medium whitespace-nowrap text-ink"
              >
                {row.label}
              </th>
              <td className="bg-mist/70 px-3 py-3.5 text-center">
                <Mark ok={row.shivansh} label={row.shivansh ? "Included" : "Not included"} />
              </td>
              <td className="px-3 py-3.5 text-center">
                <Mark ok={row.contractors} label={row.contractors ? "Included" : "Not included"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GradeCards() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-3 sm:gap-3 sm:pt-3">
      {GRADES.map((grade, i) => (
        <Reveal
          key={grade.id}
          delay={i * 70}
          className={cn(
            "relative flex flex-col rounded-2xl border bg-white p-3.5 shadow-soft",
            grade.recommended
              ? "border-copper ring-1 ring-copper/60 shadow-lift sm:-translate-y-2"
              : "border-line",
          )}
        >
          {grade.recommended && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-copper px-3 py-1 font-sans text-[9.5px] font-semibold tracking-[0.18em] whitespace-nowrap text-white uppercase shadow-soft">
              Recommended
            </span>
          )}
          <Heading as="h3" size="sm" className="text-[20px]">
            {grade.name}
          </Heading>
          <p className="mt-0.5 text-[12px] text-ink-soft">{grade.tagline}</p>
          <img
            src={img(grade.image)}
            alt={`${grade.name} grade materials`}
            width={315}
            height={189}
            loading="lazy"
            className="mt-3 aspect-[5/3] w-full rounded-lg object-cover"
          />
          <ul className="mt-4 flex flex-col gap-1.5">
            {grade.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[11.5px] leading-snug text-ink">
                <Check
                  aria-hidden
                  strokeWidth={1.75}
                  className="mt-[2px] size-3.5 shrink-0 text-teal"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}

/** "Why one team matters": copy, the one-team comparison table and the three material grades. */
export function OneTeamSection() {
  const { whyOneTeam, grades } = SERVICES_PAGE;
  return (
    <Section tone="cloud" className="overflow-hidden py-14 lg:py-20">
      <Sketch
        kind="arch"
        className="absolute top-8 -left-8 hidden w-[190px] lg:block"
        opacity={0.28}
      />
      <Sketch
        kind="plant"
        className="absolute bottom-0 left-6 hidden w-[110px] lg:block"
        opacity={0.35}
      />
      <Container className="relative max-w-[1400px]">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,20fr)_minmax(0,36fr)_minmax(0,44fr)] lg:gap-6">
          <Reveal>
            <Eyebrow className="mb-4">{whyOneTeam.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg" className="lg:text-[40px]">
              {whyOneTeam.title}
            </Heading>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-ink">{whyOneTeam.text}</p>
          </Reveal>

          <Reveal delay={90}>
            <ComparisonTable />
          </Reveal>

          <Reveal delay={160}>
            <Eyebrow className="mb-4">{grades.eyebrow}</Eyebrow>
            <GradeCards />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
