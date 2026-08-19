export const revalidate = 60;

import { ArticleCard } from "@/components/ArticleCard";
import { PostPagination } from "@/components/PostPagination";
import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";
import { wisp } from "@/lib/wisp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visual Stories",
  description:
    "Infographics, charts, and visual explainers from Product Wire. Coming soon.",
  alternates: {
    canonical: "/visual-stories",
  },
  openGraph: {
    title: `Visual Stories | ${config.title}`,
    description:
      "Infographics, charts, and visual explainers from Product Wire. Coming soon.",
    url: "/visual-stories",
    images: [getOgImageUrl("Visual Stories")],
  },
};

export default async function VisualStoriesPage(
  props: {
    searchParams?: Promise<{ page: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const result = await wisp.getPosts({
    limit: 9,
    tags: ["visual-stories"],
    page,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="border border-neutral-200 p-5 md:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
          Visual Stories
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          Infographics, charts, and visuals
        </h1>
        <p className="mt-2 max-w-2xl text-[13px] text-neutral-500">
          Infographics, charts, and visual explainers — coming soon.
        </p>
      </div>
      {result.posts.length > 0 ? (
        <div className="mt-0 grid border-x border-b border-neutral-200 sm:grid-cols-2 lg:grid-cols-3 sm:divide-x sm:divide-neutral-200">
          {result.posts.map((post) => (
            <div key={post.id} className="border-t border-neutral-200 p-4">
              <ArticleCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid border-x border-b border-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-neutral-200">
          {["Infographics", "Charts", "Visuals"].map((label) => (
            <div
              key={label}
              className="border-t border-neutral-200 p-5"
            >
              <div className="flex aspect-[16/10] items-center justify-center border border-dashed border-neutral-200 bg-neutral-50">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  Coming soon
                </p>
              </div>
              <p className="mt-3 text-[13px] font-bold">{label}</p>
              <p className="mt-1.5 text-[13px] text-neutral-500">
                We will add {label.toLowerCase()} here soon.
              </p>
            </div>
          ))}
        </div>
      )}
      {result.posts.length > 0 && (
        <PostPagination
          pagination={result.pagination}
          className="my-12"
          basePath="/visual-stories"
        />
      )}
    </div>
  );
}
