import { ChevronDown, LayoutGrid, Map } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import {
  GRADES,
  LOCATIONS,
  PROJECT_CATEGORIES,
  type ProjectCategory,
  type ProjectGrade,
  type ProjectLocation,
} from "@/content/projects";
import { cn } from "@/lib/utils";
import { SOFT_EASE, type Filters, type ViewMode } from "./filters";

export type FilterBarProps = {
  filters: Filters;
  onFiltersChange: (next: Filters) => void;
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
};

function CategoryChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative h-9 shrink-0 rounded-full px-4 text-[13px] leading-none font-semibold whitespace-nowrap transition-colors duration-300 ease-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
        active ? "text-white" : "text-ink hover:bg-mist hover:text-teal",
      )}
    >
      {active && (
        <motion.span
          layoutId="projects-category-active"
          aria-hidden
          className="absolute inset-0 rounded-full bg-teal"
          transition={{ duration: 0.45, ease: SOFT_EASE }}
        />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}

function PillSelect<T extends string>({
  label,
  value,
  allLabel,
  options,
  onChange,
}: {
  label: string;
  value: T | "all";
  allLabel: string;
  options: readonly T[];
  onChange: (value: T | "all") => void;
}) {
  return (
    <label className="relative inline-flex min-w-0 flex-1 items-center lg:flex-none lg:shrink-0">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T | "all")}
        className="h-9 w-full min-w-0 cursor-pointer appearance-none truncate rounded-full border border-line bg-white pr-8 pl-3 text-[12px] lg:pr-9 lg:pl-4 lg:text-[13px] leading-none font-semibold text-ink transition-colors duration-300 ease-soft hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
      >
        <option value="all">{allLabel}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        strokeWidth={1.5}
        className="pointer-events-none absolute right-3.5 size-4 text-ink-soft"
      />
    </label>
  );
}

function ViewButton({
  active,
  label,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={cn(
        "flex size-9 items-center justify-center rounded-lg transition-colors duration-300 ease-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper [&_svg]:size-4",
        active ? "bg-teal text-white" : "text-teal hover:bg-mist",
      )}
    >
      {children}
    </button>
  );
}

/** White pill container: category chips, location / grade selects and the grid-map toggle. */
export function FilterBar({ filters, onFiltersChange, view, onViewChange }: FilterBarProps) {
  const setCategory = (category: ProjectCategory | null) =>
    onFiltersChange({ ...filters, category });

  return (
    <div className="rounded-3xl border border-line bg-white p-2 shadow-soft lg:flex lg:items-center lg:gap-3 lg:rounded-full lg:pr-2 lg:pl-2">
      <div
        role="group"
        aria-label="Filter by category"
        className="hide-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto"
      >
        <CategoryChip active={filters.category === null} onClick={() => setCategory(null)}>
          All
        </CategoryChip>
        {PROJECT_CATEGORIES.map((c) => (
          <CategoryChip key={c} active={filters.category === c} onClick={() => setCategory(c)}>
            {c}
          </CategoryChip>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2 border-t border-line pt-2 lg:mt-0 lg:border-t-0 lg:pt-0">
        <PillSelect<ProjectLocation>
          label="Location"
          value={filters.location}
          allLabel="All Locations"
          options={LOCATIONS}
          onChange={(location) => onFiltersChange({ ...filters, location })}
        />
        <PillSelect<ProjectGrade>
          label="Grade"
          value={filters.grade}
          allLabel="All Grades"
          options={GRADES}
          onChange={(grade) => onFiltersChange({ ...filters, grade })}
        />
        <div
          role="group"
          aria-label="View"
          className="ml-auto flex items-center gap-1 rounded-xl border border-line p-0.5 lg:ml-1"
        >
          <ViewButton
            active={view === "grid"}
            label="Grid view"
            onClick={() => onViewChange("grid")}
          >
            <LayoutGrid strokeWidth={1.5} aria-hidden />
          </ViewButton>
          <ViewButton active={view === "map"} label="Map view" onClick={() => onViewChange("map")}>
            <Map strokeWidth={1.5} aria-hidden />
          </ViewButton>
        </div>
      </div>
    </div>
  );
}
