"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Author, GetPostsResult, GetRelatedPostsResult, TagInPost } from "@wisp-cms/client";
import Image from "next/image";
import Link from "next/link";
import { RelatedPosts } from "./RelatedPosts";
import { processTableOfContents, TableOfContents } from "./TOC";
import { ContentWithCustomComponents } from "@wisp-cms/react-custom-component";
import { FAQ } from "./WispComponents/FAQ";
import {
  applyLinkedInEmbeds,
  ARTICLE_LINKEDIN_EMBEDS,
  hasLinkedInEmbedComponent,
  LinkedInEmbed,
} from "./WispComponents/LinkedInEmbed";
import { OpenSourceAiFundingChart } from "./charts/OpenSourceAiFundingChart";
import { formatMagazineDate } from "@/lib/date";
import { stripCmsAttribution, stripLeadingFeaturedImage } from "@/lib/stripCmsAttribution";
import { CommentSection } from "./CommentSection";
import { ArticleActions } from "./ArticleActions";
import { CategoryLabel } from "./CategoryLabel";
import { LatestNewsSidebar } from "./LatestNewsSidebar";
import { getPostCategory } from "@/lib/postCategory";

export const BlogContent = ({
  post: { title, content, author, publishedAt, tags, slug, image, description },
  relatedPosts,
  latestPosts = [],
}: {
  post: {
    id: string;
    createdAt: Date;
    teamId: string;
    description: string | null;
    title: string;
    content: string;
    slug: string;
    image: string | null;
    authorId: string;
    updatedAt: Date;
    publishedAt: Date | null;
    tags: TagInPost[];
    author: Author;
  };
  relatedPosts: GetRelatedPostsResult["posts"];
  latestPosts?: GetPostsResult["posts"];
}) => {
  const cleanedContent = applyLinkedInEmbeds(
    stripLeadingFeaturedImage(stripCmsAttribution(content), image)
  );
  const { modifiedHtml, tableOfContents } = processTableOfContents(
    cleanedContent,
    {
      h1: true,
      h2: true,
      h3: true,
      h4: true,
      h5: true,
      h6: true,
    }
  );
  const category = getPostCategory(tags);
  const sidebarPosts = latestPosts
    .filter((post) => post.slug !== slug)
    .slice(0, 4);
  const showSidebar = sidebarPosts.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="border border-neutral-200">
        <div className={showSidebar ? "grid lg:grid-cols-3" : ""}>
          <article
            className={
              showSidebar
                ? "lg:col-span-2 lg:border-r lg:border-neutral-200"
                : ""
            }
          >
            <div className="p-5 md:p-6">
              <CategoryLabel label={category.label} tag={category.tag} />
              <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-black md:text-4xl">
                {title}
              </h1>
              <p className="mt-3 text-[10px] uppercase tracking-wider text-neutral-400">
                {author.name} ·{" "}
                {publishedAt ? formatMagazineDate(publishedAt) : "N/A"}
              </p>
              <div className="mt-4">
                <ArticleActions
                  slug={slug}
                  title={title}
                  description={description}
                  image={image}
                />
              </div>
              {image && (
                <div className="relative mt-5 aspect-[16/8]">
                  <Image src={image} alt={title} fill className="object-cover" />
                </div>
              )}
            </div>
            <div className="border-t border-neutral-200 p-5 md:p-6">
              <div className="prose prose-lg blog-content max-w-none break-words prose-headings:font-bold prose-headings:tracking-tight prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-neutral-700">
                {tableOfContents.length > 0 && (
                  <Accordion
                    type="single"
                    collapsible
                    className="not-prose mb-6 w-full border border-neutral-200 px-3"
                  >
                    <AccordionItem value="toc" className="border-none">
                      <AccordionTrigger className="py-2 text-[10px] font-bold uppercase tracking-[0.14em] hover:no-underline">
                        Table of contents
                      </AccordionTrigger>
                      <AccordionContent>
                        <TableOfContents items={tableOfContents} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
                <ContentWithCustomComponents
                  content={modifiedHtml}
                  customComponents={{
                    FAQ,
                    LinkedInEmbed,
                    OpenSourceAiFundingChart,
                  }}
                />
                {ARTICLE_LINKEDIN_EMBEDS[slug] &&
                  !hasLinkedInEmbedComponent(modifiedHtml) && (
                    <LinkedInEmbed
                      src={ARTICLE_LINKEDIN_EMBEDS[slug].src}
                      height={ARTICLE_LINKEDIN_EMBEDS[slug].height}
                    />
                  )}
              </div>
              <div className="mt-8 border-t border-neutral-200 pt-5">
                <ArticleActions
                  slug={slug}
                  title={title}
                  description={description}
                  image={image}
                />
              </div>
              {tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-x-3 gap-y-1 border-t border-neutral-200 pt-4">
                  {tags.map((tag) => (
                    <Link
                      href={`/category/${tag.name}`}
                      key={tag.id}
                      className="text-[10px] font-semibold uppercase tracking-[0.14em] text-pw-secondary"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              )}
              <div className="mt-8 border-t border-neutral-200 pt-6">
                <CommentSection slug={slug} />
              </div>
              <RelatedPosts posts={relatedPosts} />
            </div>
          </article>
          {showSidebar && (
            <div className="border-t border-neutral-200 p-5 md:p-6 lg:border-t-0">
              <div className="lg:sticky lg:top-24">
                <LatestNewsSidebar posts={sidebarPosts} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
