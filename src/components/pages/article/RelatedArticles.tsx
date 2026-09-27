import { ArticleCard, Container, Heading, Reveal, Section, Sketch } from "@/components/site";
import { img } from "@/content/images";
import { ARTICLE_PAGE, getArticle, type Article } from "@/content/journal";

export type RelatedArticlesProps = { article: Article };

/** Linen band: "Related articles" heading on the left, three ArticleCards (snap rail on mobile). */
export function RelatedArticles({ article }: RelatedArticlesProps) {
  const related = article.related
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => Boolean(a));
  if (related.length === 0) return null;

  return (
    <Section tone="linen" jali className="overflow-x-clip py-14 lg:py-20">
      <Sketch
        kind="plant"
        className="absolute right-6 bottom-0 hidden w-[120px] xl:block"
        opacity={0.4}
      />
      <Container className="relative">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:items-start lg:gap-10">
          <Reveal>
            <span aria-hidden className="block h-[2px] w-8 bg-copper" />
            <Heading as="h2" size="md" className="mt-4 lg:text-[30px]">
              {ARTICLE_PAGE.relatedTitle}
            </Heading>
          </Reveal>
          <div className="hide-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:mt-0 lg:grid-cols-3 lg:gap-6">
            {related.map((a, i) => (
              <Reveal key={a.slug} delay={i * 70} className="w-[82%] shrink-0 snap-start sm:w-auto">
                <ArticleCard
                  article={{
                    slug: a.slug,
                    title: a.title,
                    category: a.category,
                    readTime: a.readTime,
                    image: img(a.image),
                  }}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
