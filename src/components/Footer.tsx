import { config } from "@/config";
import { Bookmark, Linkedin, Newspaper, Rss } from "lucide-react";
import Link from "next/link";

const linkClass =
  "text-[11px] tracking-wide text-neutral-600 hover:text-black";

export const Footer = () => {
  return (
    <footer className="mt-10 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="border border-neutral-200">
          <div className="grid md:grid-cols-3 md:divide-x md:divide-neutral-200">
            <div className="p-5">
              <div className="whitespace-nowrap text-base tracking-tight text-black">
                <span className="font-light">PRODUCT</span>{" "}
                <span className="font-bold">WIRE</span>
              </div>
              <p className="mt-3 max-w-xs text-[11px] leading-relaxed text-neutral-500">
                {config.description}
              </p>
            </div>
            <div className="border-t border-neutral-200 p-5 md:border-t-0">
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em]">
                Sections
              </div>
              <div className="flex flex-col gap-2">
                <Link href="/" className={linkClass}>
                  Latest
                </Link>
                <Link href="/about" className={linkClass}>
                  About
                </Link>
                {config.categories.map((category) => (
                  <Link
                    key={category.tag}
                    href={`/category/${category.tag}`}
                    className={linkClass}
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-t border-neutral-200 p-5 md:border-t-0">
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em]">
                Follow
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={config.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label="Product Wire on LinkedIn"
                  className="text-neutral-700 hover:text-black"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
                <Link
                  href={config.googleNewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Product Wire on Google News"
                  className="text-neutral-700 hover:text-black"
                >
                  <Newspaper className="h-4 w-4" />
                </Link>
                <Link
                  href="/rss"
                  aria-label="RSS feed"
                  className="text-neutral-700 hover:text-black"
                >
                  <Rss className="h-4 w-4" />
                </Link>
                <Link
                  href="/saved"
                  aria-label="Saved articles"
                  className="text-neutral-700 hover:text-black"
                >
                  <Bookmark className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-200 px-5 py-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-400">
              © {config.organization} {new Date().getFullYear()} · No ads
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
