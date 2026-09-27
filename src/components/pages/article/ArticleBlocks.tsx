import { Check, Droplets } from "lucide-react";
import { Reveal } from "@/components/site";
import type { ArticleBlock, ArticleSection } from "@/content/journal";
import { cn } from "@/lib/utils";

/** "Question? Answer." → bold question + answer; null when the item is not shaped like that. */
function splitQuestion(item: string): { q: string; a: string } | null {
  const m = /^(.{8,110}?\?)\s+(\S.*)$/.exec(item);
  return m && m[1] && m[2] ? { q: m[1], a: m[2] } : null;
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-[16.5px] leading-[1.7] text-ink/90 lg:text-[17px]">{block.text}</p>;
    case "quote":
      return (
        <blockquote className="my-7 border-l-[3px] border-copper py-0.5 pl-5 font-display text-[22px] leading-[1.35] text-copper-bright italic lg:text-[25px]">
          <p>&ldquo;{block.text}&rdquo;</p>
        </blockquote>
      );
    case "table":
      return (
        <div className="my-6 overflow-x-auto rounded-xl border border-line bg-white shadow-soft">
          <table className="w-full min-w-[520px] border-collapse text-[14px]">
            <thead className="bg-mist">
              <tr>
                {block.head.map((h, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="px-4 py-3 text-left text-[13.5px] font-semibold text-teal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-line">
                  {row.map((cell, ci) =>
                    ci === 0 ? (
                      <th
                        key={ci}
                        scope="row"
                        className="px-4 py-3 text-left font-semibold text-ink"
                      >
                        {cell}
                      </th>
                    ) : (
                      <td
                        key={ci}
                        className={cn(
                          "px-4 py-3 text-ink-soft",
                          cell.includes("₹") && "font-mono text-[13px] text-ink",
                        )}
                      >
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <aside className="my-7 flex gap-4 rounded-xl border-l-[3px] border-copper bg-linen px-5 py-5">
          <Droplets className="mt-1 size-7 shrink-0 text-teal" strokeWidth={1.5} aria-hidden />
          <p className="font-display text-[20px] leading-[1.35] text-copper-bright italic lg:text-[22px]">
            {block.text}
          </p>
        </aside>
      );
    case "list":
      return (
        <ul className="my-5 space-y-3">
          {block.items.map((item, i) => {
            const qa = splitQuestion(item);
            return (
              <li key={i} className="flex gap-3 text-[16px] leading-[1.6] text-ink/90">
                <span className="mt-[5px] flex size-5 shrink-0 items-center justify-center rounded-full bg-copper-tint text-copper">
                  <Check className="size-3" strokeWidth={2.25} aria-hidden />
                </span>
                <span>
                  {qa ? (
                    <>
                      <strong className="font-semibold text-ink">{qa.q}</strong> {qa.a}
                    </>
                  ) : (
                    item
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      );
    default:
      return null;
  }
}

export type ArticleSectionViewProps = { section: ArticleSection; index: number };

/** One numbered section: copper DM Mono number hanging in the gutter, Fraunces h2, blocks. */
export function ArticleSectionView({ section, index }: ArticleSectionViewProps) {
  return (
    <Reveal
      as="section"
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="relative scroll-mt-[124px] pl-9 lg:pl-11"
    >
      <span
        aria-hidden
        className="absolute top-[5px] left-0 font-mono text-[17px] leading-none text-copper lg:text-[18px]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h2
        id={`${section.id}-heading`}
        className="font-display text-[24px] leading-[1.15] font-medium tracking-[-0.02em] text-teal lg:text-[27px]"
      >
        {section.heading}
      </h2>
      <div className="mt-4 space-y-4">
        {section.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </Reveal>
  );
}
