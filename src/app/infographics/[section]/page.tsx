export const revalidate = 60;

import { ArticleCard } from "@/components/ArticleCard";
import { ArticleGrid, articleGridCellClass } from "@/components/ArticleGrid";
import { ChartStorySidebar } from "@/components/charts/ChartStorySidebar";
import { OpenSourceAiFundingChart } from "@/components/charts/OpenSourceAiFundingChart";
import { InfographicsNav } from "@/components/InfographicsNav";
import { config } from "@/config";
import { getInfographicSection } from "@/lib/infographics";
import { getOgImageUrl } from "@/lib/ogImage";
import { wisp } from "@/lib/wisp";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(
  props: {
    params: Promise<{ section: string }>;
  }
): Promise<Metadata> {
  const { section: slug } = await props.params;
  const section = getInfographicSection(slug);
  if (!section) {
    return { title: "Infographics" };
  }
  return {
    title: `${section.label} | Infographics`,
    description: section.description,
    alternates: {
      canonical: section.href,
    },
    openGraph: {
      title: `${section.label} | ${config.title}`,
      description: section.description,
      url: section.href,
      images: [getOgImageUrl(section.label)],
    },
  };
}

export default async function InfographicSectionPage(
  props: {
    params: Promise<{ section: string }>;
  }
) {
  const { section: slug } = await props.params;
  const section = getInfographicSection(slug);
  if (!section) {
    notFound();
  }

  const [tagged, latest] = await Promise.all([
    wisp.getPosts({ limit: 9, tags: [section.tag] }),
    wisp.getPosts({ limit: 1, tags: ["tech"] }),
  ]);
  const featured = latest.posts[0];
  const showChart = section.slug === "charts";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="border-y border-neutral-200 py-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-pw-secondary">
          Infographics
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          {section.label}
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] text-neutral-500">
          {section.description}
        </p>
        <InfographicsNav activeHref={section.href} />
      </div>

      {showChart && (
        <div className="mt-8 grid border-b border-neutral-200 py-8 lg:grid-cols-[minmax(0,1fr)_16.5rem] lg:gap-12">
          <OpenSourceAiFundingChart />
          <div className="mt-8 border-t border-neutral-200 pt-6 lg:mt-0 lg:border-t-0 lg:pt-0">
            <ChartStorySidebar
              featured={
                featured
                  ? {
                      slug: featured.slug,
                      title: featured.title,
                      authorName: featured.author.name || "Product Wire",
                      image: featured.image,
                    }
                  : null
              }
            />
          </div>
        </div>
      )}

      {tagged.posts.length > 0 && (
        <ArticleGrid className="mt-8 border border-neutral-200">
          {tagged.posts.map((post) => (
            <div key={post.id} className={articleGridCellClass}>
              <ArticleCard post={post} />
            </div>
          ))}
        </ArticleGrid>
      )}
    </div>
  );
}
