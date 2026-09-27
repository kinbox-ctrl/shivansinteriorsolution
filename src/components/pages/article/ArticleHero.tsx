import { HandNote, Reveal } from "@/components/site";
import { img } from "@/content/images";
import type { Article } from "@/content/journal";

export type ArticleHeroProps = { article: Article };

/**
 * Image keys whose harvested crop already carries the handwritten notes in its pixels. For
 * those the notes are kept as a visually-hidden caption instead of being drawn twice; swap the
 * photo for a clean one and remove the key here to get the live overlays back.
 */
const NOTES_BAKED_IN: ReadonlySet<string> = new Set(["plywood-hero"]);

/** Wide rounded hero photo with the article's handwritten notes overlaid. */
export function ArticleHero({ article }: ArticleHeroProps) {
  const notes = article.heroNotes ?? [];
  const [noteA, noteB] = notes;
  const overlay = !NOTES_BAKED_IN.has(article.hero);
  return (
    <Reveal className="mt-8 lg:mt-10">
      <figure className="relative aspect-[16/7] overflow-hidden rounded-[20px] shadow-lift sm:aspect-[2.6/1] lg:aspect-[1022/177] lg:rounded-[24px]">
        <img
          src={img(article.hero)}
          alt={`${article.title} — illustration`}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
        {overlay && noteA && (
          <HandNote
            arrow="down-right"
            rotate={-7}
            className="absolute top-[9%] left-[13%] hidden text-white drop-shadow-[0_1px_2px_rgba(15,46,48,0.6)] md:inline-flex"
          >
            <span className="block max-w-[150px] leading-[1.05]">{noteA}</span>
          </HandNote>
        )}
        {overlay && noteB && (
          <HandNote
            arrow="down-left"
            rotate={-7}
            className="absolute top-[14%] right-[12%] hidden text-white drop-shadow-[0_1px_2px_rgba(15,46,48,0.6)] md:inline-flex"
          >
            <span className="block max-w-[130px] leading-[1.05]">{noteB}</span>
          </HandNote>
        )}
        {!overlay && notes.length > 0 && (
          <figcaption className="sr-only">{notes.join(". ")}</figcaption>
        )}
      </figure>
    </Reveal>
  );
}
