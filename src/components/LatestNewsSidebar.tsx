import { CategoryLabel } from "@/components/CategoryLabel";
import { formatMagazineDate } from "@/lib/date";
import { getPostCategory } from "@/lib/postCategory";
import type { GetPostsResult } from "@wisp-cms/client";
import Image from "next/image";
import Link from "next/link";

export const LatestNewsSidebar = ({
  posts,
}: {
  posts: GetPostsResult["posts"];
}) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <aside>
      <h2 className="text-[12px] font-bold uppercase tracking-[0.14em]">
        Latest News
      </h2>
      <div className="mt-4 divide-y divide-neutral-200 border-t border-neutral-200">
        {posts.map((post) => {
          const category = getPostCategory(post.tags);
          return (
            <article key={post.id} className="flex gap-3 py-4">
              <div className="min-w-0 flex-1">
                <CategoryLabel label={category.label} tag={category.tag} />
                <h3 className="mt-1 text-[13px] font-bold leading-snug">
                  <Link href={`/post/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-1.5 text-[10px] uppercase tracking-wider text-neutral-400">
                  {formatMagazineDate(post.publishedAt || post.createdAt)}
                </p>
              </div>
              <Link
                href={`/post/${post.slug}`}
                className="relative h-[72px] w-[72px] shrink-0"
              >
                <Image
                  src={post.image || "/placeholder.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </Link>
            </article>
          );
        })}
      </div>
      <Link
        href="/"
        className="mt-3 inline-block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2563eb]"
      >
        View all news →
      </Link>
    </aside>
  );
};
