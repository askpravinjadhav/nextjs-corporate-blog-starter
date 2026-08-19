export const revalidate = 60; // 1 minute

import { ArticleCard } from "@/components/ArticleCard";
import { BlogPostList } from "@/components/BlogPostList";
import { HeroFeature } from "@/components/HeroFeature";
import { LatestNewsSidebar } from "@/components/LatestNewsSidebar";
import { PostPagination } from "@/components/PostPagination";
import { getOgImageUrl } from "@/lib/ogImage";
import { getOrganizationJsonLd, getWebsiteJsonLd } from "@/lib/jsonLd";
import { wisp } from "@/lib/wisp";
import { Metadata } from "next";
import { config } from "../config";

const { title, description } = config;

export const metadata: Metadata = {
  title: {
    absolute: `News without the noise | ${title}`,
  },
  description,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss",
    },
  },
  openGraph: {
    title: `News without the noise | ${title}`,
    description,
    url: "/",
    type: "website",
    images: [getOgImageUrl(title)],
  },
};

export default async function Page(
  props: {
    searchParams?: Promise<{ query: string; page: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const query = searchParams?.query;
  const isFiltered = Boolean(query) || page > 1;
  const result = await wisp.getPosts({
    limit: isFiltered ? 6 : 12,
    query,
    page,
  });

  const [hero, ...rest] = result.posts;
  const cards = rest.slice(0, 3);
  const sidebar = result.posts.slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [getOrganizationJsonLd(), getWebsiteJsonLd()],
          }),
        }}
      />
      <div className="mx-auto max-w-7xl px-4 py-6">
        {isFiltered ? (
          <>
            {query && (
              <h1 className="mb-8 text-2xl font-semibold">
                Search: {query}
              </h1>
            )}
            <BlogPostList posts={result.posts} />
            <PostPagination
              pagination={result.pagination}
              className="my-16"
              query={query}
            />
          </>
        ) : hero ? (
          <div className="border border-neutral-200">
            <div className="grid lg:grid-cols-3">
              <div className="lg:col-span-2 lg:border-r lg:border-neutral-200">
                <div className="p-5 md:p-6">
                  <HeroFeature post={hero} />
                </div>
                {cards.length > 0 && (
                  <div className="grid border-t border-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-neutral-200">
                    {cards.map((post) => (
                      <div key={post.id} className="border-t border-neutral-200 p-4 sm:border-t-0">
                        <ArticleCard post={post} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t border-neutral-200 p-5 md:p-6 lg:border-t-0">
                <LatestNewsSidebar posts={sidebar} />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </div>
    </>
  );
}
