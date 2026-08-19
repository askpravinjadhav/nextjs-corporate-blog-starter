export const revalidate = 60; // 1 minute

import { ArticleCard } from "@/components/ArticleCard";
import { ArticleGrid, articleGridCellClass } from "@/components/ArticleGrid";
import { PostPagination } from "@/components/PostPagination";
import { wisp } from "@/lib/wisp";
import { config } from "../../../config";
import { Metadata } from "next";
import { getOgImageUrl } from "@/lib/ogImage";

export async function generateMetadata(
  props: {
    params: Promise<{ tag: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;

  const {
    tag
  } = params;

  return {
    title: `Blog posts tagged with #${tag}`,
    description: `List of all blog posts on ${config.organization} tagged with #${tag}`,
    alternates: {
      canonical: `/category/${tag}`,
    },
    openGraph: {
      title: `Blog posts tagged with #${tag}`,
      description: `List of all blog posts on ${config.organization} tagged with #${tag}`,
      url: `/category/${tag}`,
      images: [getOgImageUrl(`#${tag}`)],
    },
  };
}

export default async function Page(
  props: {
    searchParams?: Promise<{ query: string; page: string }>;
    params: Promise<{ tag: string }>;
  }
) {
  const params = await props.params;

  const {
    tag
  } = params;

  const searchParams = await props.searchParams;
  const category = config.categories.find((c) => c.tag === tag);
  const { label, description } = category || {
    label: `#${tag}`,
    description: `Blog posts tagged with #${tag}`,
  };
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const result = await wisp.getPosts({
    limit: 9,
    tags: [tag],
    query: searchParams?.query,
    page,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="border border-neutral-200">
        <div className="p-5 md:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-pw-secondary">
            {label}
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            {label}
          </h1>
          <p className="mt-2 max-w-2xl text-[13px] text-neutral-500">{description}</p>
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
            No posts in this section yet.
          </p>
        )}
      </div>
      <PostPagination
        pagination={result.pagination}
        className="my-12"
        query={searchParams?.query}
        basePath={`/category/${tag}`}
      />
    </div>
  );
}
