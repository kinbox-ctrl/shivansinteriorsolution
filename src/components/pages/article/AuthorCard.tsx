import { Button, Card, Reveal, WhatsAppIcon } from "@/components/site";
import { img } from "@/content/images";
import { ARTICLE_PAGE, type Article } from "@/content/journal";
import { FOUNDER, waLink } from "@/content/site";

export type AuthorCardProps = { article: Article };

/** Full-width white author row: avatar, name, role, bio and an outlined WhatsApp button. */
export function AuthorCard({ article }: AuthorCardProps) {
  const message = `Hello ${FOUNDER.name}, I read "${article.title}" on the Shivansh journal and have a question.`;
  return (
    <Reveal className="mt-12 lg:mt-16">
      <Card className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:gap-8 lg:p-8">
        <img
          src={img(article.author.avatar)}
          alt={article.author.name}
          width={80}
          height={80}
          loading="lazy"
          decoding="async"
          className="size-20 shrink-0 rounded-full object-cover ring-4 ring-copper-tint"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[17px] leading-tight font-semibold text-ink">{article.author.name}</p>
          <p className="mt-1 text-[13px] text-ink-soft">{article.author.role}</p>
          <p className="mt-3 max-w-[560px] text-[14.5px] leading-relaxed text-ink-soft">
            {article.authorBio}
          </p>
        </div>
        <span aria-hidden className="hidden h-16 w-px shrink-0 bg-line lg:block" />
        <Button
          variant="secondary"
          href={waLink(message)}
          icon={<WhatsAppIcon className="size-[18px]" />}
          className="shrink-0 self-start lg:self-center"
        >
          {ARTICLE_PAGE.authorCta}
        </Button>
      </Card>
    </Reveal>
  );
}
