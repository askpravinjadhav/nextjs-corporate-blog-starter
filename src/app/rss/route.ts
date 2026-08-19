export const dynamic = "force-dynamic";
export const revalidate = 300;

import { NextResponse } from "next/server";
import RSS from "rss";
import urlJoin from "url-join";
import { getPostSeoDescription, wisp } from "../../lib/wisp";
import { config } from "@/config";

const baseUrl = config.baseUrl;

const imageMimeType = (url: string) => {
  const path = url.split("?")[0].toLowerCase();
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".webp")) return "image/webp";
  if (path.endsWith(".gif")) return "image/gif";
  if (path.endsWith(".svg")) return "image/svg+xml";
  return "image/jpeg";
};

export async function GET() {
  const result = await wisp.getPosts({ limit: 20 });

  const feed = new RSS({
    title: config.title,
    description: config.description,
    site_url: baseUrl,
    feed_url: urlJoin(baseUrl, "/rss"),
    image_url: config.logoUrl,
    language: "en-IN",
    copyright: config.organization,
    managingEditor: config.organization,
    ttl: 15,
    categories: config.categories.map((category) => category.label),
    pubDate: new Date(),
    custom_namespaces: {
      media: "http://search.yahoo.com/mrss/",
      dc: "http://purl.org/dc/elements/1.1/",
    },
  });

  result.posts.forEach((post) => {
    const url = urlJoin(baseUrl, `/post/${post.slug}`);
    const description = getPostSeoDescription(post) ?? "";
    const author = post.author.name ?? config.organization;
    const custom_elements: Record<string, unknown>[] = [
      { "dc:creator": author },
    ];

    if (post.image) {
      custom_elements.push({
        "media:content": {
          _attr: {
            url: post.image,
            medium: "image",
            type: imageMimeType(post.image),
          },
        },
      });
    }

    feed.item({
      title: post.title,
      description,
      url,
      guid: url,
      date: post.publishedAt || new Date(),
      author,
      categories: post.tags.map((tag) => tag.name),
      enclosure: post.image
        ? { url: post.image, type: imageMimeType(post.image) }
        : undefined,
      custom_elements,
    });
  });

  const xml: string = feed.xml({ indent: true });

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET",
    },
  });
}
