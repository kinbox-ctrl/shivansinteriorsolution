import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Chip, HandNote, Heading, Reveal } from "@/components/site";
import { img } from "@/content/images";
import { ARTICLE_PAGE, type Article } from "@/content/journal";
import { ShareButtons } from "./ShareButtons";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "12 Sep 2026" → "2026-09-12" for <time dateTime>; undefined when the date is not parseable. */
function isoDate(date: string): string | undefined {
  const [d, m, y] = date.split(" ");
  const mi = m ? MONTHS.indexOf(m) : -1;
  if (!d || !y || mi < 0) return undefined;
  return `${y}-${String(mi + 1).padStart(2, "0")}-${d.padStart(2, "0")}`;
}

export type ArticleHeaderProps = { article: Article };

/** Breadcrumb, category tag, title, dek, author row + share buttons, hand note. */
export function ArticleHeader({ article }: ArticleHeaderProps) {
  const iso = isoDate(article.date);
  return (
    <header className="relative pt-5 lg:pt-7">
      <Reveal className="mx-auto max-w-[880px]">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12px] leading-none text-ink-soft">
            <li>
              <Link to="/" className="transition-colors hover:text-teal">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3" strokeWidth={1.5} />
            </li>
            <li>
              <Link to="/journal" className="transition-colors hover:text-teal">
                Journal
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3" strokeWidth={1.5} />
            </li>
            <li aria-current="page" className="max-w-[70vw] truncate sm:max-w-none">
              {article.title}
            </li>
          </ol>
        </nav>

        <Chip tone="copper" size="sm" mono className="mt-5">
          {article.category}
        </Chip>

        <Heading
          as="h1"
          size="lg"
          className="mt-4 max-w-[760px] lg:text-[46px]"
          style={{ textWrap: "pretty" }}
        >
          {article.title}
        </Heading>

        <p className="mt-4 max-w-[640px] text-[17px] leading-relaxed text-teal/75 lg:text-[18px]">
          {article.dek}
        </p>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-3">
              <img
                src={img(article.author.avatar)}
                alt=""
                width={44}
                height={44}
                loading="eager"
                decoding="async"
                className="size-11 rounded-full object-cover shadow-soft ring-2 ring-white"
              />
              <div>
                <p className="text-[14px] leading-tight font-semibold text-ink">
                  {article.author.name}
                </p>
                <p className="mt-0.5 text-[12px] leading-tight text-ink-soft">
                  {article.author.role}
                </p>
              </div>
            </div>
            <p className="flex items-center gap-3 text-[13px] text-ink-soft">
              {iso ? <time dateTime={iso}>{article.date}</time> : <span>{article.date}</span>}
              <span aria-hidden className="h-4 w-px bg-line-strong" />
              <span>{article.readTime}</span>
            </p>
          </div>
          <ShareButtons
            title={article.title}
            slug={article.slug}
            className="flex flex-wrap gap-3"
          />
        </div>
      </Reveal>

      <HandNote
        arrow="down-right"
        rotate={-8}
        className="absolute top-[88px] right-0 hidden xl:inline-flex"
      >
        <span className="block max-w-[112px] leading-[1.05]">{ARTICLE_PAGE.handNote}</span>
      </HandNote>
    </header>
  );
}
