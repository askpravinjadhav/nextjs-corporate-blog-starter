import { CategoryLabel } from "@/components/CategoryLabel";
import { getPostCategory } from "@/lib/postCategory";
import type { GetPostsResult } from "@wisp-cms/client";
import Image from "next/image";
import Link from "next/link";

export const ArticleCard = ({
  post,
}: {
  post: GetPostsResult["posts"][number];
}) => {
  const category = getPostCategory(post.tags);
  return (
    <article>
      <Link href={`/post/${post.slug}`} className="relative mb-3 block aspect-[16/10]">
        <Image
          src={post.image || "/placeholder.jpg"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </Link>
      <CategoryLabel label={category.label} tag={category.tag} />
      <h3 className="mt-1.5 text-[15px] font-bold leading-snug tracking-tight">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h3>
    </article>
  );
};
