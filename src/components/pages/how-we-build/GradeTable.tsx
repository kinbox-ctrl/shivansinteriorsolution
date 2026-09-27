import { useState } from "react";
import { Container, Eyebrow, Heading, Reveal, Section } from "@/components/site";
import { GRADE_TABLE_ROWS, GRADES } from "@/content/materials";
import { HOW_WE_BUILD_PAGE } from "@/content/process";
import { cn } from "@/lib/utils";

export function GradeTable() {
  const copy = HOW_WE_BUILD_PAGE.grades;
  const [hovered, setHovered] = useState<string | null>(null);
  const lastRow = GRADE_TABLE_ROWS.length - 1;

  return (
    <Section tone="cloud" id="grade-comparison">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <Eyebrow className="mb-4">{copy.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg">
              {copy.title}
            </Heading>
            <p className="mt-4 max-w-[300px] text-[16px] leading-relaxed text-ink-soft">
              {copy.text}
            </p>
          </Reveal>

          <Reveal className="min-w-0">
            <div className="hide-scrollbar -mx-5 overflow-x-auto px-5 pt-4 sm:mx-0 sm:px-0">
              <div className="min-w-[680px] rounded-2xl border border-line bg-white shadow-soft">
                <table
                  className="w-full border-separate border-spacing-0 text-[14px]"
                  onMouseLeave={() => setHovered(null)}
                >
                  <caption className="sr-only">{copy.title}</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="w-[22%]">
                        <span className="sr-only">Feature</span>
                      </th>
                      {GRADES.map((g) => {
                        const rec = g.recommended;
                        return (
                          <th
                            key={g.id}
                            scope="col"
                            onMouseEnter={() => setHovered(g.id)}
                            className={cn(
                              "relative w-[26%] px-4 pt-6 pb-4 text-center align-top font-normal transition-colors duration-300",
                              rec
                                ? "rounded-t-2xl border-x border-t border-copper bg-mist/35"
                                : hovered === g.id && "bg-linen/70",
                            )}
                          >
                            {rec && (
                              <>
                                <span aria-hidden className="hwb-sheen rounded-t-2xl" />
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper px-3 py-1.5 font-mono text-[10px] leading-none tracking-[0.18em] whitespace-nowrap text-white uppercase">
                                  Recommended
                                </span>
                              </>
                            )}
                            <span className="relative block font-display text-[22px] leading-none font-medium text-teal">
                              {g.name}
                            </span>
                            <span className="relative mt-1.5 block text-[12.5px] text-ink-soft">
                              {g.tagline}
                            </span>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {GRADE_TABLE_ROWS.map((row, ri) => (
                      <tr key={row.label}>
                        <th
                          scope="row"
                          className="border-t border-line px-5 py-3.5 text-left font-medium text-ink"
                        >
                          {row.label}
                        </th>
                        {GRADES.map((g) => {
                          const rec = g.recommended;
                          const price = ri === lastRow;
                          return (
                            <td
                              key={g.id}
                              onMouseEnter={() => setHovered(g.id)}
                              className={cn(
                                "border-t border-line px-4 py-3.5 text-center transition-colors duration-300",
                                rec
                                  ? "border-x border-copper bg-mist/35 text-ink"
                                  : cn("text-ink-soft", hovered === g.id && "bg-linen/70"),
                                rec && ri === lastRow && "rounded-b-2xl border-b",
                                price && "font-display text-[18px] font-medium text-teal",
                              )}
                            >
                              {row[g.id]}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
