import { config } from "@/config";
import {
  buildWispClient,
  GetPostsResult,
  GetPostResult,
} from "@wisp-cms/client";

export const wisp = buildWispClient({
  blogId: config.blogId,
});

export const getPostSeoDescription = (post: {
  description: string | null;
  metadata?: unknown;
}) => {
  const listed = post.description?.trim();
  if (listed) {
    return listed;
  }
  if (post.metadata && typeof post.metadata === "object") {
    const nested = (post.metadata as { description?: unknown }).description;
    if (typeof nested === "string" && nested.trim()) {
      return nested.trim();
    }
  }
  return undefined;
};

export type { GetPostsResult, GetPostResult };
