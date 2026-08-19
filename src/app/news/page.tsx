export const revalidate = 60;

import { ArticleCard } from "@/components/ArticleCard";
import { ArticleGrid, articleGridCellClass } from "@/components/ArticleGrid";
import { PostPagination } from "@/components/PostPagination";
import { getOgImageUrl } from "@/lib/ogImage";
import { wisp } from "@/lib/wisp";
import { config } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All news",
  description: config.description,
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: `All news | ${config.title}`,
    description: config.description,
    url: "/news",
    images: [getOgImageUrl("All news")],
  },
};

export default async function NewsPage(
  props: {
    searchParams?: Promise<{ page: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const result = await wisp.getPosts({
    limit: 9,
    page,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="border border-neutral-200">
        <div className="p-5 md:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-pw-secondary">
            Latest
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            All news
          </h1>
          <p className="mt-2 max-w-2xl text-[13px] text-neutral-500">
            Every Product Wire story in one place.
          </p>
        </div>
        {result.posts.length > 0 ? (
          <ArticleGrid>
            {result.posts.map((post) => (
              <div key={post.id} className={articleGridCellClass}>
                <ArticleCard post={post} />
              </div>
            ))}
          </ArticleGrid>
        ) : (
          <p className="border-t border-neutral-200 p-5 text-[13px] text-neutral-500">
            No posts yet.
          </p>
        )}
      </div>
      <PostPagination
        pagination={result.pagination}
        className="my-12"
        basePath="/news"
      />
    </div>
  );
}
