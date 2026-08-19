import { CategoryLabel } from "@/components/CategoryLabel";
import type { GetPostsResult } from "@wisp-cms/client";
import Image from "next/image";
import Link from "next/link";

export const VisualStoriesSection = ({
  posts,
}: {
  posts: GetPostsResult["posts"];
}) => {
  const stories = posts.slice(0, 3);

  return (
    <section className="mt-6 border border-neutral-200">
      <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 md:px-6">
        <h2 className="text-[12px] font-bold uppercase tracking-[0.14em]">
          Infographics
        </h2>
        <Link
          href="/infographics"
          className="text-[10px] font-semibold uppercase tracking-[0.14em] text-pw-secondary"
        >
          View all →
        </Link>
      </div>
      {stories.length > 0 ? (
        <div className="grid sm:grid-cols-3 sm:divide-x sm:divide-neutral-200">
          {stories.map((post) => (
            <article
              key={post.id}
              className="border-t border-neutral-200 p-4 sm:border-t-0"
            >
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
              <CategoryLabel label="Infographics" tag="visual-stories" />
              <h3 className="mt-1.5 text-[15px] font-bold leading-snug tracking-tight">
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </h3>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 sm:divide-x sm:divide-neutral-200">
          {["Infographics", "Charts", "Visuals"].map((label) => (
            <div
              key={label}
              className="border-t border-neutral-200 p-5 sm:border-t-0"
            >
              <div className="flex aspect-[16/10] items-center justify-center border border-dashed border-neutral-200 bg-neutral-50">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  Coming soon
                </p>
              </div>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-pw-secondary">
                {label}
              </p>
              <p className="mt-1.5 text-[13px] leading-snug text-neutral-500">
                {label} and visual explainers will appear here soon.
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
