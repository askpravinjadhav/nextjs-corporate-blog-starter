export const revalidate = 60; // 1 minute

import { BlogPostList } from "@/components/BlogPostList";
import { PostPagination } from "@/components/PostPagination";
import { getOgImageUrl } from "@/lib/ogImage";
import { getOrganizationJsonLd, getWebsiteJsonLd } from "@/lib/jsonLd";
import { wisp } from "@/lib/wisp";
import { Metadata } from "next";
import { FilterBar } from "../components/FilterBar";
import { FullWidthHeader } from "../components/FullWidthHeader";
import { config } from "../config";

const { title, description } = config;

export const metadata: Metadata = {
  title: {
    absolute: `Tech, business, and India news | ${title}`,
  },
  description,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss",
    },
  },
  openGraph: {
    title: `Tech, business, and India news | ${title}`,
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
  const result = await wisp.getPosts({
    limit: 6,
    query: searchParams?.query,
    page,
  });

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
      <FullWidthHeader title={title} description={description} serifTitle />
      <div className="container mx-auto max-w-6xl">
        <FilterBar active="latest" className="my-8" />
        <BlogPostList posts={result.posts} />
        <PostPagination
          pagination={result.pagination}
          className="my-16"
          query={searchParams?.query}
        />
      </div>
    </>
  );
}
