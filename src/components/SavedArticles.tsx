"use client";

import { getSavedPosts, SAVED_POSTS_EVENT, SavedPost } from "@/lib/savedPosts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const SavedArticles = () => {
  const [posts, setPosts] = useState<SavedPost[]>([]);

  useEffect(() => {
    const sync = () => setPosts(getSavedPosts());
    sync();
    window.addEventListener(SAVED_POSTS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SAVED_POSTS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (posts.length === 0) {
    return (
      <div className="border-x border-b border-neutral-200 p-5 md:p-6">
        <p className="text-[13px] text-neutral-500">
          No saved articles yet. Open a story and tap Save.
        </p>
      </div>
    );
  }

  return (
    <div className="grid border-x border-b border-neutral-200 sm:grid-cols-2 lg:grid-cols-3 sm:divide-x sm:divide-neutral-200">
      {posts.map((post) => (
        <article key={post.slug} className="border-t border-neutral-200 p-4">
          <Link
            href={`/post/${post.slug}`}
            className="relative mb-3 block aspect-[16/10]"
          >
            <Image
              src={post.image || "/placeholder.jpg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </Link>
          <h2 className="text-[15px] font-bold leading-snug tracking-tight">
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </h2>
        </article>
      ))}
    </div>
  );
};
