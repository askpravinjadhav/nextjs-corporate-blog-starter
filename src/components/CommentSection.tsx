"use client";

import { useQuery } from "@tanstack/react-query";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { wisp } from "../lib/wisp";

interface CommentSectionProps {
  slug: string;
}

export function CommentSection({ slug }: CommentSectionProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["comments", slug],
    queryFn: () => wisp.getComments({ slug, page: 1, limit: "all" }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.config.enabled) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em]">
        Add comments
      </h2>
      <CommentForm slug={slug} config={data.config} />
      <h2 className="mb-4 mt-10 text-[10px] font-bold uppercase tracking-[0.16em]">
        Comments
      </h2>
      <CommentList
        comments={data.comments}
        pagination={data.pagination}
        config={data.config}
        isLoading={isLoading}
      />
    </div>
  );
}
