import { Check } from "lucide-react";
import { Card, Container, CountUp, Eyebrow, Reveal, Section } from "@/components/site";
import type { ServiceGradeRow } from "@/content/services";
import { cn } from "@/lib/utils";

/** "₹1,820/sq.ft" → counts the 1,820 up; anything else renders as-is. */
function Price({ from }: { from: string }) {
  const m = /^₹([\d,]+)(.*)$/.exec(from);
  const n = m && m[1] ? Number(m[1].replace(/,/g, "")) : NaN;
  if (!m || Number.isNaN(n)) return <>{from}</>;
  return <CountUp to={n} prefix="₹" suffix={m[2] ?? ""} duration={1200} />;
}

export function PriceByGrade({ rows }: { rows: ServiceGradeRow[] }) {
  return (
    <Section tone="linen" jali className="py-14 lg:py-20">
      <Container>
        <Eyebrow className="mb-7">Price by grade</Eyebrow>
        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {rows.map((row, i) => (
            <Reveal key={row.grade} delay={i * 90} className="h-full">
              <Card
                className={cn(
                  "h-full",
                  row.recommended &&
                    "border-copper shadow-lift ring-1 ring-copper lg:-translate-y-2",
                )}
              >
                {row.recommended && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-copper px-3.5 py-1.5 font-mono text-[10px] tracking-[0.2em] whitespace-nowrap text-white uppercase">
                    Recommended
                  </span>
                )}
                <h3 className="font-display text-[26px] font-medium tracking-[-0.01em] text-teal lg:text-[28px]">
                  {row.name}
                </h3>
                {row.from ? (
                  <>
                    <span className="mt-3 block text-[12px] text-ink-soft">From</span>
                    <p className="mt-1 font-display text-[36px] leading-none tracking-[-0.02em] text-copper-bright lg:text-[40px]">
                      <Price from={row.from} />
                    </p>
                  </>
                ) : (
                  <p className="mt-3 font-display text-[24px] leading-tight text-copper-bright">
                    Custom quote
                  </p>
                )}
                <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                  {row.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[14px] leading-snug text-ink">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-teal"
                        strokeWidth={2}
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
