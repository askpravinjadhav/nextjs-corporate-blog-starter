export const dynamic = "force-dynamic";
export const revalidate = 60;

import { wisp } from "@/lib/wisp";
import Link from "next/link";
import { Metadata } from "next";
import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";

export const metadata: Metadata = {
  title: `Blog post categories`,
  description: `List of all categories on ${config.organization}`,
  alternates: {
    canonical: "/category",
  },
  openGraph: {
    title: `Blog post categories`,
    description: `List of all blog post categories on ${config.organization}`,
    url: "/category",
    images: [getOgImageUrl(`Blog Post Categories`)],
  },
};

export default async function Page() {
  const result = await wisp.getTags();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-serif text-3xl font-medium tracking-tight">
        Categories
      </h1>
      <p className="mt-2 text-muted-foreground">Browse posts by section</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {config.categories.map((category) => (
          <Link
            key={category.tag}
            href={`/category/${category.tag}`}
            className="border px-4 py-2 text-sm font-semibold uppercase tracking-wider text-pw-secondary"
          >
            {category.label}
          </Link>
        ))}
        {result.tags
          .filter(
            (tag) => !config.categories.some((c) => c.tag === tag.name)
          )
          .map((tag) => (
            <Link
              key={tag.id}
              href={`/category/${tag.name}`}
              className="border px-4 py-2 text-sm text-pw-secondary"
            >
              #{tag.name}
            </Link>
          ))}
      </div>
    </div>
  );
}
