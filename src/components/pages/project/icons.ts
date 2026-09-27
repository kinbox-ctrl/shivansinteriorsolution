import {
  CalendarCheck,
  CircleDot,
  Clock,
  Factory,
  Gem,
  Hammer,
  House,
  LayoutGrid,
  PencilRuler,
  Ruler,
  type LucideIcon,
} from "lucide-react";

/** Timeline step icons named in `src/content/projects.ts` (lucide export names). */
const TIMELINE_ICONS: Record<string, LucideIcon> = {
  Ruler,
  PencilRuler,
  Factory,
  Hammer,
  House,
};

export function timelineIcon(name: string): LucideIcon {
  return TIMELINE_ICONS[name] ?? CircleDot;
}

/** Icons for the facts bar, in the order the bar renders them. */
export const FACT_ICONS = {
  space: LayoutGrid,
  area: Ruler,
  grade: Gem,
  timeline: Clock,
  completed: CalendarCheck,
} as const;
