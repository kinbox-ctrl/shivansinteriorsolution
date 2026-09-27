import { useEffect, useId, useState } from "react";
import { SPACES, type SpaceConfig, type SpaceId } from "@/content/pricing";
import { cn } from "@/lib/utils";
import { contentIcon } from "./icons";
import { clampArea } from "./use-estimator";

export type SpaceRowsProps = {
  spaces: Record<SpaceId, SpaceConfig>;
  onToggle: (id: SpaceId, on: boolean) => void;
  onArea: (id: SpaceId, area: number) => void;
};

const RANGE = cn(
  "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line disabled:cursor-default",
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper",
  "[&::-webkit-slider-thumb]:size-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-copper [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(169,83,31,0.16),0_2px_6px_rgba(15,46,48,0.2)]",
  "[&::-moz-range-thumb]:size-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-copper [&::-moz-range-thumb]:shadow-[0_0_0_4px_rgba(169,83,31,0.16)]",
  "disabled:[&::-webkit-slider-thumb]:bg-oak/60 disabled:[&::-webkit-slider-thumb]:shadow-none disabled:[&::-moz-range-thumb]:bg-oak/60 disabled:[&::-moz-range-thumb]:shadow-none",
);

type AreaInputProps = {
  id: string;
  spaceId: SpaceId;
  value: number;
  disabled: boolean;
  onCommit: (area: number) => void;
};

/** Numeric sq.ft field that only clamps once the user leaves it, so typing "1" can become "150". */
function AreaInput({ id, spaceId, value, disabled, onCommit }: AreaInputProps) {
  const [draft, setDraft] = useState(String(value));
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (!focused) setDraft(String(value));
  }, [value, focused]);

  return (
    <span className="relative inline-flex shrink-0 items-center">
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[11px] text-ink-soft"
      >
        sq.ft
      </span>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={0}
        step={10}
        disabled={disabled}
        value={disabled ? 0 : draft}
        onFocus={() => setFocused(true)}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          setFocused(false);
          const next = clampArea(spaceId, Number(draft));
          setDraft(String(next));
          onCommit(next);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        aria-label="Area in square feet"
        className={cn(
          "h-10 w-[104px] rounded-lg border border-line bg-white pr-10 pl-2 text-right font-mono text-[14px] text-ink transition-colors duration-300",
          "focus:border-copper focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-copper",
          "disabled:bg-linen disabled:text-ink-soft",
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
        )}
      />
    </span>
  );
}

/**
 * One row per space: icon + label, teal switch, copper range slider, sq.ft field. On small
 * screens the slider row collapses while a space is off and expands when it is switched on.
 */
export function SpaceRows({ spaces, onToggle, onArea }: SpaceRowsProps) {
  const base = useId();
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0">
      {SPACES.map((space) => {
        const cfg = spaces[space.id];
        const Icon = contentIcon(space.icon);
        const on = cfg.on;
        const pct = ((cfg.area - space.min) / (space.max - space.min)) * 100;
        const inputId = `${base}-${space.id}`;
        return (
          <li
            key={space.id}
            className={cn(
              "rounded-xl border px-3 py-2.5 transition-colors duration-300 ease-soft lg:flex lg:items-center lg:gap-4 lg:px-4",
              on ? "border-line bg-white" : "border-line/70 bg-cloud",
            )}
          >
            <div className="flex items-center gap-3 lg:w-[200px] lg:shrink-0">
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300",
                  on ? "bg-mist text-teal" : "bg-linen text-ink-soft",
                )}
              >
                <Icon className="size-5" strokeWidth={1.5} aria-hidden />
              </span>
              <label
                htmlFor={inputId}
                className={cn(
                  "flex-1 text-[14px] leading-tight font-semibold",
                  on ? "text-ink" : "text-ink-soft",
                )}
              >
                {space.label}
              </label>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                aria-label={`Include ${space.label}`}
                onClick={() => onToggle(space.id, !on)}
                className={cn(
                  "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ease-soft",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
                  on ? "bg-teal" : "bg-line-strong",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-1 left-1 size-5 rounded-full bg-white shadow-[0_1px_3px_rgba(15,46,48,0.3)] transition-transform duration-300 ease-soft",
                    on && "translate-x-5",
                  )}
                />
              </button>
            </div>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-soft lg:flex lg:flex-1 lg:items-center lg:gap-4",
                on ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]",
              )}
            >
              <div className="min-h-0 overflow-hidden lg:contents">
                <div className="flex items-center gap-3 pt-3 pb-1 lg:flex-1 lg:py-0">
                  <input
                    type="range"
                    min={space.min}
                    max={space.max}
                    step={space.step}
                    value={on ? cfg.area : space.min}
                    disabled={!on}
                    onChange={(e) => onArea(space.id, Number(e.target.value))}
                    aria-label={`${space.label} area`}
                    aria-valuetext={`${cfg.area} sq.ft`}
                    className={cn(RANGE, !on && "opacity-60")}
                    style={
                      on
                        ? {
                            background: `linear-gradient(to right, var(--copper) ${pct}%, var(--line) ${pct}%)`,
                          }
                        : undefined
                    }
                  />
                  <div className="flex shrink-0 items-center lg:hidden">
                    <AreaInput
                      id={`${inputId}-m`}
                      spaceId={space.id}
                      value={cfg.area}
                      disabled={!on}
                      onCommit={(area) => onArea(space.id, area)}
                    />
                  </div>
                </div>
              </div>
              <div className="hidden shrink-0 items-center lg:flex">
                <AreaInput
                  id={inputId}
                  spaceId={space.id}
                  value={cfg.area}
                  disabled={!on}
                  onCommit={(area) => onArea(space.id, area)}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
