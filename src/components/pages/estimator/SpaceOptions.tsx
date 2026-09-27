import { RotateCcw } from "lucide-react";
import {
  ESTIMATOR_COPY,
  GRADE_LABEL,
  SPACE_BY_ID,
  computeLine,
  formatINR,
  matchesGrade,
  type GradeId,
  type SpaceId,
  type SpaceOptions as Options,
} from "@/content/pricing";
import { cn } from "@/lib/utils";

export type SpaceOptionsProps = {
  spaceId: SpaceId;
  area: number;
  grade: GradeId;
  options: Options;
  onOption: (group: string, value: string) => void;
  onReset: () => void;
};

/**
 * Per-space option groups (layout, board, finish, hardware, …) as chip radio groups, with the
 * live amount for this space and a reset to the grade defaults once anything is customised.
 */
export function SpaceOptions({
  spaceId,
  area,
  grade,
  options,
  onOption,
  onReset,
}: SpaceOptionsProps) {
  const space = SPACE_BY_ID[spaceId];
  const custom = !matchesGrade(spaceId, options, grade);
  const line = computeLine(spaceId, area, grade, options);
  const copy = ESTIMATOR_COPY.customise;

  return (
    <div className="mt-3 rounded-xl border border-line bg-cloud p-3.5 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-[12.5px] leading-snug text-ink-soft">{space.areaHint}</p>
        <p className="flex items-center gap-2 text-[13px]">
          {custom && (
            <span className="rounded-full bg-copper-tint px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] text-copper uppercase">
              {copy.customTag}
            </span>
          )}
          <span className="text-ink-soft">This space:</span>
          <span className="font-display text-[18px] leading-none font-medium text-teal tabular-nums">
            {formatINR(line.amount)}
          </span>
          <span className="text-[11px] text-ink-soft">ex. GST</span>
        </p>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {space.options.map((group) => {
          const value = options[group.id];
          return (
            <fieldset key={group.id} className="m-0 min-w-0 border-0 p-0">
              <legend className="mb-1.5 text-[12px] font-semibold text-ink">
                {group.label}
                {group.hint && (
                  <span className="ml-1.5 font-normal text-ink-soft">· {group.hint}</span>
                )}
              </legend>
              <div role="radiogroup" aria-label={group.label} className="flex flex-wrap gap-1.5">
                {group.choices.map((choice) => {
                  const selected = choice.id === value;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      title={choice.note}
                      onClick={() => onOption(group.id, choice.id)}
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[12px] leading-snug font-medium transition-[background-color,color,border-color] duration-300 ease-soft",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
                        selected
                          ? "border-teal bg-teal text-white"
                          : "border-line bg-white text-ink hover:border-line-strong hover:text-teal",
                      )}
                    >
                      {choice.label}
                      {choice.note && (
                        <span
                          className={cn(
                            "ml-1 text-[10.5px]",
                            selected ? "text-white/75" : "text-ink-soft",
                          )}
                        >
                          {choice.note}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>

      {custom && (
        <button
          type="button"
          onClick={onReset}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full text-[12.5px] font-semibold text-copper underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
        >
          <RotateCcw className="size-3.5" strokeWidth={1.75} aria-hidden />
          {copy.resetTo} {GRADE_LABEL[grade]}
        </button>
      )}
    </div>
  );
}
