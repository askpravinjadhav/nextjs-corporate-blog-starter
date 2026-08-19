export const revalidate = 60; // 1 minute'

import type { Metadata } from "next";
import { getPostSeoDescription, wisp } from "@/lib/wisp";
import { BlogContent } from "@/components/BlogContent";
import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";
import urlJoin from "url-join";

interface Params {
  slug: string;
}
export async function generateMetadata(
  props: {
    params: Promise<Params>;
  }
): Promise<Metadata> {
  const params = await props.params;

  const {
    slug
  } = params;

  const result = await wisp.getPost(slug);
  if (!result.post) {
    return {
      title: "Page not found!",
      robots: { index: false, follow: false },
    };
  }

  const postUrl = urlJoin(config.baseUrl, "post", slug);
  const description = getPostSeoDescription(result.post);

  return {
    title: result.post.title,
    description,
    authors: result.post.author.name
      ? [{ name: result.post.author.name }]
      : undefined,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: "article",
      title: result.post.title,
      description,
      url: postUrl,
      images: [result.post.image || getOgImageUrl(result.post.title)],
      publishedTime: result.post.publishedAt?.toString(),
      modifiedTime: result.post.updatedAt.toString(),
      authors: result.post.author.name ? [result.post.author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: result.post.title,
      description,
      images: [result.post.image || getOgImageUrl(result.post.title)],
    },
  };
}

export default async function BlogPost(
  props: {
    params: Promise<Params>;
  }
) {
  const params = await props.params;

  const {
    slug
  } = params;

  const [result, related, latest] = await Promise.all([
    wisp.getPost(slug),
    wisp.getRelatedPosts({ slug, limit: 4 }),
    wisp.getPosts({ limit: 8 }),
  ]);

  if (!result.post) return null;

  const post = result.post;
  const description = getPostSeoDescription(post);
  const postUrl = urlJoin(config.baseUrl, "post", slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description,
    image: post.image ? post.image : undefined,
    datePublished: post.publishedAt ? post.publishedAt.toString() : undefined,
    dateModified: post.updatedAt.toString(),
    url: postUrl,
    inLanguage: "en-IN",
    isAccessibleForFree: true,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": `${config.baseUrl}/#website`,
      name: config.title,
      url: config.baseUrl,
    },
    author: {
      "@type": "Person",
      name: post.author.name ?? undefined,
      image: post.author.image ?? undefined,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: config.organization,
      url: config.baseUrl,
      logo: {
        "@type": "ImageObject",
        url: config.logoUrl,
      },
    },
    ...(config.swgEnabled
      ? { productID: config.swgProductId }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogContent
        post={result.post}
        relatedPosts={related.posts}
        latestPosts={latest.posts}
      />
    </>
  );
}
