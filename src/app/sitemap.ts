export const dynamic = "force-dynamic";
export const revalidate = 360; // 1 hour

import type { MetadataRoute } from "next";
import urlJoin from "url-join";
import { wisp } from "../lib/wisp";
import { config } from "@/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsResult = await wisp.getPosts({
    limit: "all",
  });
  const tagsResult = await wisp.getTags();
  return [
    {
      url: config.baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: urlJoin(config.baseUrl, "about"),
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: urlJoin(config.baseUrl, "news"),
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: urlJoin(config.baseUrl, "infographics"),
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: urlJoin(config.baseUrl, "infographics/charts"),
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: urlJoin(config.baseUrl, "infographics/explainers"),
      lastModified: new Date(),
      priority: 0.6,
    },
    ...postsResult.posts.map((post) => {
      return {
        url: urlJoin(config.baseUrl, "post", post.slug),
        lastModified: new Date(post.updatedAt),
        priority: 0.8,
      };
    }),
    ...tagsResult.tags.map((tag) => {
      return {
        url: urlJoin(config.baseUrl, "category", tag.name),
        lastModified: new Date(),
        priority: 0.5,
      };
    }),
    {
      url: urlJoin(config.baseUrl, "rss"),
      lastModified: new Date(),
      priority: 0.3,
    },
  ];
}
