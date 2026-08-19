import { CategoryLabel } from "@/components/CategoryLabel";
import { formatMagazineDate } from "@/lib/date";
import { getPostCategory } from "@/lib/postCategory";
import type { GetPostsResult } from "@wisp-cms/client";
import Image from "next/image";
import Link from "next/link";

export const HeroFeature = ({
  post,
}: {
  post: GetPostsResult["posts"][number];
}) => {
  const category = getPostCategory(post.tags);
  return (
    <article>
      <Link href={`/post/${post.slug}`} className="relative block aspect-[16/8]">
        <Image
          src={post.image || "/placeholder.jpg"}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </Link>
      <div className="mt-4">
        <CategoryLabel label={category.label} tag={category.tag} />
        <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-black md:text-4xl">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h2>
        {post.description && (
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-neutral-500">
            {post.description}
          </p>
        )}
        <p className="mt-3 text-[10px] uppercase tracking-wider text-neutral-400">
          {post.author.name} ·{" "}
          {formatMagazineDate(post.publishedAt || post.createdAt)}
        </p>
      </div>
    </article>
  );
};
