import { Check } from "lucide-react";
import { useEffect, useRef } from "react";
import { img } from "@/content/images";
import { GRADES, GRADE_ESTIMATOR_BULLETS } from "@/content/materials";
import type { GradeId } from "@/content/pricing";
import { cn } from "@/lib/utils";

export type GradePickerProps = {
  value: GradeId;
  onChange: (id: GradeId) => void;
  name?: string;
};

/** Standard / Premium / Luxury radio cards; a snap rail below lg with Premium centred. */
export function GradePicker({ value, onChange, name = "grade" }: GradePickerProps) {
  const rail = useRef<HTMLDivElement>(null);

  // On small screens start the rail on the selected (Premium) card, once on mount only.
  useEffect(() => {
    const el = rail.current;
    if (!el || window.innerWidth >= 1024) return;
    const selected = el.querySelector<HTMLElement>("[data-selected='true']");
    if (!selected) return;
    el.scrollTo({
      left: selected.offsetLeft - (el.clientWidth - selected.offsetWidth) / 2,
      behavior: "auto",
    });
  }, []);

  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="sr-only">Material grade</legend>
      <div
        ref={rail}
        className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pt-4 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0"
      >
        {GRADES.map((grade) => {
          const selected = grade.id === value;
          const bullets = GRADE_ESTIMATOR_BULLETS[grade.id];
          return (
            <label
              key={grade.id}
              data-selected={selected}
              className={cn(
                "relative flex w-[78%] min-w-0 shrink-0 cursor-pointer snap-center flex-col rounded-2xl border bg-white p-3.5 transition-[border-color,box-shadow,transform] duration-300 ease-soft sm:w-[60%] lg:w-auto lg:shrink",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-copper",
                selected
                  ? "border-copper shadow-[0_0_0_1px_var(--copper),var(--shadow-soft)]"
                  : "border-line hover:-translate-y-px hover:border-line-strong hover:shadow-soft",
              )}
            >
              <input
                type="radio"
                name={name}
                value={grade.id}
                checked={selected}
                onChange={() => onChange(grade.id)}
                className="sr-only"
              />
              {grade.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-copper px-3 py-1 font-mono text-[10px] leading-none tracking-[0.16em] text-white uppercase">
                  Recommended
                </span>
              )}
              <span className="flex items-start gap-2">
                <span
                  aria-hidden
                  className={cn(
                    "mt-1 flex size-[18px] shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                    selected ? "border-copper bg-copper text-white" : "border-line-strong bg-white",
                  )}
                >
                  {selected && <Check className="size-3" strokeWidth={2.5} />}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[21px] leading-tight font-medium tracking-[-0.01em] text-ink">
                    {grade.name}
                  </span>
                  <span className="block text-[13px] text-ink-soft">{grade.tagline}</span>
                </span>
              </span>
              <img
                src={img(grade.estimatorImage)}
                alt={`${grade.name} grade material samples`}
                loading="lazy"
                className="mt-3 h-[68px] w-full rounded-lg object-cover"
              />
              <ul className="m-0 mt-3 flex list-none flex-col gap-1.5 p-0">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-1.5 text-[12.5px] leading-snug text-ink"
                  >
                    <Check
                      className="mt-0.5 size-3.5 shrink-0 text-copper"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
