import { Calculator, Check, ChevronDown, Lightbulb } from "lucide-react";
import { useId, useState } from "react";
import { Button, Card } from "@/components/site";
import { ARTICLE_PAGE, type Article } from "@/content/journal";
import {
  GRADE_IDS,
  GRADE_LABEL,
  formatRange,
  quickEstimate,
  type GradeId,
} from "@/content/pricing";

const AREAS = [80, 100, 120, 150, 200] as const;

/** Carcass board per grade, as in the journal's grade table. */
const GRADE_BOARD: Record<GradeId, string> = {
  standard: "MR plywood",
  premium: "BWP plywood",
  luxury: "HDHMR",
};

const SELECT =
  "h-11 w-full appearance-none rounded-lg border border-line-strong bg-white pr-10 pl-4 text-[14px] text-ink transition-[border-color,box-shadow] duration-300 ease-soft hover:border-teal/50 focus-visible:border-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper";

function Select({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="block text-[12.5px] font-semibold text-ink">
        {label}
      </label>
      <div className="relative mt-1.5">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={SELECT}>
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-teal"
          strokeWidth={1.5}
          aria-hidden
        />
      </div>
    </div>
  );
}

function isGrade(value: string): value is GradeId {
  return (GRADE_IDS as string[]).includes(value);
}

/** "Estimate your kitchen": area + grade selects, live quickEstimate range, link to /estimator. */
export function EstimateCard() {
  const id = useId();
  const [area, setArea] = useState<number>(120);
  const [grade, setGrade] = useState<GradeId>("premium");
  const { low, high } = quickEstimate("kitchen", area, grade);
  const copy = ARTICLE_PAGE.estimateCard;

  return (
    <Card className="p-6">
      <div className="flex gap-3">
        <Calculator className="mt-px size-7 shrink-0 text-teal" strokeWidth={1.5} aria-hidden />
        <div className="min-w-0">
          <h3 className="font-display text-[20px] leading-tight font-medium whitespace-nowrap text-teal">
            {copy.title}
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{copy.text}</p>
        </div>
      </div>

      <Select
        id={`${id}-area`}
        label={copy.areaLabel}
        value={String(area)}
        onChange={(v) => setArea(Number(v))}
      >
        {AREAS.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </Select>

      <Select
        id={`${id}-grade`}
        label={copy.gradeLabel}
        value={grade}
        onChange={(v) => {
          if (isGrade(v)) setGrade(v);
        }}
      >
        {GRADE_IDS.map((g) => (
          <option key={g} value={g}>
            {GRADE_LABEL[g]} ({GRADE_BOARD[g]})
          </option>
        ))}
      </Select>

      <Button to="/estimator" block arrow className="mt-5">
        {copy.button}
      </Button>

      <p className="mt-3 text-center text-[13px] text-ink-soft" aria-live="polite">
        Approx. <span className="font-mono font-medium text-teal">{formatRange(low, high)}</span>
      </p>
      <p className="mt-1.5 text-center text-[12px] leading-snug text-ink-soft">{copy.note}</p>
    </Card>
  );
}

export function QuickTips({ tips }: { tips: readonly string[] }) {
  return (
    <div className="rounded-2xl bg-linen p-6">
      <div className="flex items-center gap-3">
        <Lightbulb className="size-7 shrink-0 text-teal" strokeWidth={1.5} aria-hidden />
        <h3 className="font-display text-[22px] leading-tight font-medium text-teal">
          {ARTICLE_PAGE.quickTipsTitle}
        </h3>
      </div>
      <ul className="mt-4 space-y-3.5">
        {tips.map((tip) => (
          <li key={tip} className="flex gap-3 text-[14px] leading-snug text-ink">
            <span className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full border border-teal/25 bg-white text-teal">
              <Check className="size-3.5" strokeWidth={2.25} aria-hidden />
            </span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export type ArticleAsideProps = { article: Article };

/** Right column: estimate card + quick tips; stacks below the body on small screens. */
export function ArticleAside({ article }: ArticleAsideProps) {
  return (
    <aside className="mt-12 grid gap-6 md:grid-cols-2 lg:sticky lg:top-[128px] lg:mt-0 lg:block lg:space-y-6">
      <EstimateCard />
      <QuickTips tips={article.quickTips} />
    </aside>
  );
}
