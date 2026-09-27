import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chip } from "./Chip";

/** Loose shape so the card does not depend on `@/content/journal`. `image` is a resolved URL. */
export type ArticleCardData = {
  slug: string;
  title: string;
  dek?: string;
  category?: string;
  readTime?: string;
  date?: string;
  image: string;
  imageAlt?: string;
};

export type ArticleCardProps = {
  article: ArticleCardData;
  variant?: "featured" | "grid";
  className?: string;
  loading?: "lazy" | "eager";
};

/** Journal tile: photo, category chip + read time, Fraunces title, optional dek. */
export function ArticleCard({
  article,
  variant = "grid",
  className,
  loading = "lazy",
}: ArticleCardProps) {
  const linkProps = {
    to: "/journal/$slug",
    params: { slug: article.slug },
  } as unknown as LinkProps;
  const featured = variant === "featured";
  return (
    <Link
      {...linkProps}
      className={cn(
        "group/card block overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
        featured && "lg:grid lg:grid-cols-[1.2fr_1fr]",
        className,
      )}
    >
      <div
        className={cn(
          "overflow-hidden",
          featured ? "aspect-[16/10] lg:aspect-auto lg:h-full" : "aspect-[16/10]",
        )}
      >
        <img
          src={article.image}
          alt={article.imageAlt ?? article.title}
          loading={loading}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover/card:scale-[1.04]"
        />
      </div>
      <div
        className={cn("p-5 lg:p-6", featured && "lg:flex lg:flex-col lg:justify-center lg:p-10")}
      >
        <div className="flex flex-wrap items-center gap-3">
          {article.category && (
            <Chip tone="copper" size="sm" mono>
              {article.category}
            </Chip>
          )}
          {(article.readTime || article.date) && (
            <span className="font-mono text-[11px] tracking-[0.16em] text-ink-soft uppercase">
              {[article.date, article.readTime].filter(Boolean).join("  ·  ")}
            </span>
          )}
        </div>
        <h3
          className={cn(
            "mt-3 font-display leading-tight font-medium text-teal",
            featured ? "text-[26px] lg:text-[36px]" : "text-[22px]",
          )}
        >
          {article.title}
        </h3>
        {article.dek && (
          <p
            className={cn(
              "mt-2 text-[15px] leading-relaxed text-ink-soft",
              !featured && "line-clamp-2",
            )}
          >
            {article.dek}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-copper">
          Read article
          <ArrowRight
            className="size-4 transition-transform duration-300 ease-soft group-hover/card:translate-x-0.5"
            strokeWidth={1.75}
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
