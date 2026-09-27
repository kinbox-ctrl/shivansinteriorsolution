/**
 * Shared "copy left, content right" split used by Journey, Workshop, Values and Team.
 *
 * The copy column is a fluid 4/12 at lg (the 3/12 span was only 212px at 1024, so headings
 * wrapped to 4–5 lines and collided with the content) and a fixed 320px at xl, which matches
 * the reference's ~320px copy column at 1440.
 */
export const SPLIT_GRID =
  "grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-8 xl:grid-cols-[320px_minmax(0,1fr)]";

/** Section h2 in the split: visibly smaller than `size="lg"` (48px) to match the reference. */
export const SPLIT_HEADING = "lg:text-[36px] xl:text-[42px]";
