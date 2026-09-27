import { getRouteApi } from "@tanstack/react-router";
import { useRef } from "react";
import { Container, Section, Sketch } from "@/components/site";
import { ArticleAside } from "./ArticleAside";
import { ArticleSectionView } from "./ArticleBlocks";
import { ArticleHeader } from "./ArticleHeader";
import { ArticleHero } from "./ArticleHero";
import { ArticleToc } from "./ArticleToc";
import { AuthorCard } from "./AuthorCard";
import { ReadingTape } from "./ReadingTape";
import { RelatedArticles } from "./RelatedArticles";
import { useActiveSection } from "./use-active-section";

const route = getRouteApi("/journal/$slug");

/**
 * Journal article (reference 14): breadcrumb + header, wide hero, three-column body (sticky
 * TOC · reading column · sticky estimate/tips cards), author card, related articles.
 */
export function ArticlePage() {
  const { article } = route.useLoaderData();
  const bodyRef = useRef<HTMLDivElement>(null);
  const activeId = useActiveSection(article.sections.map((s) => s.id));

  return (
    <>
      <Section tone="cloud" wash flush className="overflow-x-clip pb-16 lg:pb-24">
        <Sketch
          kind="arch"
          className="absolute top-8 right-0 hidden w-[150px] xl:block"
          opacity={0.45}
        />
        <Sketch
          kind="plant"
          className="absolute top-[150px] right-[130px] hidden w-[90px] xl:block"
          opacity={0.45}
        />
        <Sketch
          kind="plant-large"
          className="absolute top-[300px] left-0 hidden w-[160px] xl:block"
          opacity={0.45}
        />

        <Container className="relative">
          <div className="mx-auto max-w-[1120px]">
            <ReadingTape trackRef={bodyRef} />
            <ArticleHeader article={article} />
            <ArticleHero article={article} />

            <div ref={bodyRef}>
              <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-[168px_minmax(0,1fr)_272px] lg:items-start lg:gap-x-10 xl:gap-x-14">
                <ArticleToc sections={article.sections} activeId={activeId} />
                <div className="mt-8 min-w-0 max-w-[680px] space-y-12 lg:mt-0 lg:space-y-14">
                  {article.sections.map((section, i) => (
                    <ArticleSectionView key={section.id} section={section} index={i} />
                  ))}
                </div>
                <ArticleAside article={article} />
              </div>
              <AuthorCard article={article} />
            </div>
          </div>
        </Container>
      </Section>

      <RelatedArticles article={article} />
    </>
  );
}
