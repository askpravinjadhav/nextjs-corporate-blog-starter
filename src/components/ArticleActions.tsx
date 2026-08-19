"use client";

import { config } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  isPostSaved,
  SAVED_POSTS_EVENT,
  toggleSavedPost,
} from "@/lib/savedPosts";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  BookmarkCheck,
  Check,
  Copy,
  Linkedin,
  Newspaper,
  Share2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import urlJoin from "url-join";

const actionClass =
  "inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600 hover:text-black";

export const ArticleActions = ({
  slug,
  title,
  description,
  image,
}: {
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
}) => {
  const { toast } = useToast();
  const [shareOpen, setShareOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const url = urlJoin(config.baseUrl, "post", slug);
  const shareText = description || title;

  useEffect(() => {
    const sync = () => setSaved(isPostSaved(slug));
    sync();
    window.addEventListener(SAVED_POSTS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SAVED_POSTS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [slug]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setShareOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const openShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
    setShareOpen(false);
  };

  const onShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url });
        return;
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          return;
        }
      }
    }
    setShareOpen((open) => !open);
  };

  const onCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast({ title: "Link copied" });
    setTimeout(() => setCopied(false), 1600);
    setShareOpen(false);
  };

  const onSave = () => {
    const nowSaved = toggleSavedPost({ slug, title, image, description });
    setSaved(nowSaved);
    toast({
      title: nowSaved ? "Article saved" : "Removed from saved",
      description: nowSaved
        ? "Find it later under Saved in the header."
        : undefined,
    });
  };

  return (
    <div className="relative flex flex-wrap items-center gap-x-5 gap-y-2">
      <div ref={menuRef} className="relative">
        <button type="button" onClick={onShare} className={actionClass}>
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>
        {shareOpen && (
          <div className="absolute left-0 top-full z-20 mt-2 w-44 border border-neutral-200 bg-white p-2 shadow-sm">
            <button
              type="button"
              className={cn(actionClass, "w-full justify-start px-2 py-2")}
              onClick={() =>
                openShare(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
                )
              }
            >
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </button>
            <button
              type="button"
              className={cn(actionClass, "w-full justify-start px-2 py-2")}
              onClick={() =>
                openShare(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`)
              }
            >
              WhatsApp
            </button>
            <button
              type="button"
              className={cn(actionClass, "w-full justify-start px-2 py-2")}
              onClick={() =>
                openShare(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
                )
              }
            >
              X
            </button>
            <button
              type="button"
              className={cn(actionClass, "w-full justify-start px-2 py-2")}
              onClick={onCopy}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        )}
      </div>

      <button type="button" onClick={onSave} className={actionClass}>
        {saved ? (
          <BookmarkCheck className="h-3.5 w-3.5" />
        ) : (
          <Bookmark className="h-3.5 w-3.5" />
        )}
        {saved ? "Saved" : "Save"}
      </button>

      <a
        href={config.googleNewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={actionClass}
      >
        <Newspaper className="h-3.5 w-3.5" />
        Google News
      </a>
    </div>
  );
};
