"use client";

import { config } from "@/config";
import { infographicSections } from "@/lib/infographics";
import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import urlJoin from "url-join";

const chartTags = infographicSections;

export const ChartStorySidebar = ({
  featured,
}: {
  featured?: {
    slug: string;
    title: string;
    authorName: string;
    image: string | null;
  } | null;
}) => {
  const url = urlJoin(config.baseUrl, "infographics/charts");
  const title = "The venture-funded open-source AI ecosystem";
  const encoded = encodeURIComponent(`${title} ${url}`);

  return (
    <aside className="flex flex-col">
      {featured && (
        <div className="border-b border-neutral-200 pb-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-pw-secondary">
            Featured in
          </p>
          <Link href={`/post/${featured.slug}`} className="mt-3 flex gap-3">
            {featured.image && (
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  className="object-cover"
                />
              </span>
            )}
            <span>
              <span className="block text-[15px] font-bold leading-snug">
                {featured.title}
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-wider text-neutral-400">
                By {featured.authorName}
              </span>
            </span>
          </Link>
        </div>
      )}

      <div className="border-b border-neutral-200 py-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-pw-secondary">
          Tags
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          {chartTags.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] font-semibold uppercase tracking-wide hover:text-pw-secondary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="pt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-pw-secondary">
          Share
        </p>
        <div className="mt-3 flex items-center gap-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encoded}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            className="text-sm font-bold hover:text-pw-secondary"
          >
            𝕏
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className="hover:text-pw-secondary"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`https://wa.me/?text=${encoded}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            className="text-[11px] font-semibold hover:text-pw-secondary"
          >
            WA
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(title)}&body=${encoded}`}
            aria-label="Share by email"
            className="hover:text-pw-secondary"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </aside>
  );
};
