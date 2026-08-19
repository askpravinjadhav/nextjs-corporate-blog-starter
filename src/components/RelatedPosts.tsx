"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import type { GetRelatedPostsResult } from "@wisp-cms/client";
import Image from "next/image";
import Link from "next/link";
import type { FunctionComponent } from "react";

export const RelatedPosts: FunctionComponent<{
  posts: GetRelatedPostsResult["posts"];
}> = ({ posts }) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 border-t border-neutral-200 pt-6">
      <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em]">
        Related
      </div>
      <div className="grid border border-neutral-200 sm:grid-cols-2 lg:grid-cols-4 sm:divide-x sm:divide-neutral-200">
        {posts.slice(0, 4).map((post) => (
          <article
            className="border-t border-neutral-200 p-3 sm:border-t-0"
            key={post.id}
          >
            <Link href={`/post/${post.slug}`}>
              <AspectRatio ratio={16 / 9} className="w-full">
                <Image
                  src={post.image || "/placeholder.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover object-center"
                />
              </AspectRatio>
            </Link>
            <h3 className="mt-2 line-clamp-2 text-[13px] font-bold leading-snug">
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </h3>
          </article>
        ))}
      </div>
    </div>
  );
};
