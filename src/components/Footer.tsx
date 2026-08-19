import { config } from "@/config";
import { Linkedin, Rss } from "lucide-react";
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
              <div className="text-[10px] font-semibold tracking-[0.22em] text-neutral-500">
                PRODUCT
              </div>
              <div className="text-sm font-extrabold tracking-tight">WIRE</div>
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
                  href="/rss"
                  aria-label="RSS feed"
                  className="text-neutral-700 hover:text-black"
                >
                  <Rss className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-200 px-5 py-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-400">
              © {config.organization} {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
