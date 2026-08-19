export const revalidate = 60; // 1 minute'

import type { Metadata } from "next";
import { wisp } from "@/lib/wisp";
import { BlogContent } from "@/components/BlogContent";
import type { BlogPosting, WithContext } from "schema-dts";
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
  const description = result.post.description ?? "";

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

  const { title, publishedAt, updatedAt, author, image, description } =
    result.post;
  const postUrl = urlJoin(config.baseUrl, "post", slug);

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description ?? undefined,
    image: image ? image : undefined,
    datePublished: publishedAt ? publishedAt.toString() : undefined,
    dateModified: updatedAt.toString(),
    url: postUrl,
    inLanguage: "en-IN",
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
      name: author.name ?? undefined,
      image: author.image ?? undefined,
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
