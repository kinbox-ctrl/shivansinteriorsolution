import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { Chip } from "@/components/site";
import type { Article } from "@/content/journal";
import { img } from "@/content/images";
import { cn } from "@/lib/utils";

export type JournalCardProps = {
  article: Article;
  className?: string;
  loading?: "lazy" | "eager";
};

/**
 * Journal grid tile as drawn in the reference: wide photo, category tag overlapping the photo's
 * bottom-left edge, Fraunces title, read time and a round copper arrow.
 * Local to the Journal page because the shared ArticleCard uses a different layout.
 */
export function JournalCard({ article, className, loading = "lazy" }: JournalCardProps) {
  const linkProps = {
    to: "/journal/$slug",
    params: { slug: article.slug },
  } as unknown as LinkProps;
  return (
    <Link
      {...linkProps}
      className={cn(
        "group/card flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
        className,
      )}
    >
      <div className="relative">
        <div className="aspect-[3.4/1] overflow-hidden">
          {/* Decorative: the title text in this link already names the article. */}
          <img
            src={img(article.image)}
            alt=""
            loading={loading}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover/card:scale-[1.04]"
          />
        </div>
        <Chip
          tone="copper"
          size="sm"
          mono
          className="absolute -bottom-3.5 left-3 ring-4 ring-white"
        >
          {article.category}
        </Chip>
      </div>
      <div className="relative flex flex-1 flex-col px-4 pt-5 pb-3.5">
        <h3 className="pr-11 font-display text-[20px] leading-[1.15] font-medium tracking-[-0.01em] text-teal lg:text-[21px]">
          {article.title}
        </h3>
        <div className="mt-auto flex items-end justify-between gap-4 pt-1.5">
          <span className="inline-flex items-center gap-1.5 text-[13px] text-ink-soft">
            <Clock className="size-3.5" strokeWidth={1.5} aria-hidden />
            {article.readTime}
          </span>
          <span
            aria-hidden
            className="absolute right-4 bottom-3.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-copper text-copper transition-[background-color,color] duration-300 ease-soft group-hover/card:bg-copper group-hover/card:text-white"
          >
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-soft group-hover/card:translate-x-0.5"
              strokeWidth={1.5}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
