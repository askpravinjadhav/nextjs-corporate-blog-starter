import { config } from "@/config";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: config.description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About | ${config.title}`,
    description: config.description,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="border border-neutral-200">
        <div className="border-b border-neutral-200 p-5 md:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-pw-secondary">
            About
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            News without the noise. No ads.
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-600">
            Product Wire covers tech, business, and India — conferences, events,
            and exhibitions.
          </p>
        </div>
        <div className="grid md:grid-cols-2 md:divide-x md:divide-neutral-200">
          <div className="p-5 md:p-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.16em]">
              What we publish
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-600">
              Product Wire covers tech, business, and India, with reporting on
              conferences, tech events, and exhibitions. We write for readers
              who want clear news without the noise of a typical ad-supported
              site.
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-600">
              There are no display ads, no sponsored inventory, and no paid
              placement in editorial pages.
            </p>
          </div>
          <div className="border-t border-neutral-200 p-5 md:p-6 md:border-t-0">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.16em]">
              Follow
            </h2>
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/rss"
                className="text-[11px] tracking-wide text-neutral-600 hover:text-black"
              >
                RSS
              </Link>
              <Link
                href={config.googleNewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-wide text-neutral-600 hover:text-black"
              >
                Google News
              </Link>
              <Link
                href={config.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-wide text-neutral-600 hover:text-black"
              >
                LinkedIn
              </Link>
              <Link
                href="/publication-policies"
                className="text-[11px] tracking-wide text-neutral-600 hover:text-black"
              >
                Publication policies
              </Link>
              <Link
                href="/terms"
                className="text-[11px] tracking-wide text-neutral-600 hover:text-black"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-[11px] tracking-wide text-neutral-600 hover:text-black"
              >
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
