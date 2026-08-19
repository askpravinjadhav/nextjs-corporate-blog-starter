export const revalidate = 60;

import { ArticleCard } from "@/components/ArticleCard";
import { ArticleGrid, articleGridCellClass } from "@/components/ArticleGrid";
import { InfographicsNav } from "@/components/InfographicsNav";
import { config } from "@/config";
import {
  infographicSections,
  infographicsParent,
} from "@/lib/infographics";
import { getOgImageUrl } from "@/lib/ogImage";
import { wisp } from "@/lib/wisp";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Infographics",
  description: infographicsParent.description,
  alternates: {
    canonical: "/infographics",
  },
  openGraph: {
    title: `Infographics | ${config.title}`,
    description: infographicsParent.description,
    url: "/infographics",
    images: [getOgImageUrl("Infographics")],
  },
};

export default async function InfographicsPage() {
  const visualPosts = await wisp.getPosts({
    limit: 9,
    tags: [infographicsParent.tag],
  });
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="border-y border-neutral-200 py-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Infographics
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] text-neutral-500">
          Charts and explainers, in one place.
        </p>
        <InfographicsNav activeHref="/infographics" />
      </div>

      <div className="mt-8 grid border border-neutral-200 lg:grid-cols-2 lg:divide-x lg:divide-neutral-200">
        {infographicSections.map((section) => (
          <Link
            key={section.slug}
            href={section.href}
            className="border-t border-neutral-200 p-6 first:border-t-0 hover:bg-neutral-50 lg:border-t-0"
          >
            <h2 className="text-xl font-bold tracking-tight">{section.label}</h2>
            <p className="mt-2 text-[13px] text-neutral-500">
              {section.description}
            </p>
          </Link>
        ))}
      </div>

      {visualPosts.posts.length > 0 && (
        <ArticleGrid className="mt-8 border border-neutral-200">
          {visualPosts.posts.map((post) => (
            <div key={post.id} className={articleGridCellClass}>
              <ArticleCard post={post} />
            </div>
          ))}
        </ArticleGrid>
      )}
    </div>
  );
}
