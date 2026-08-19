import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Follow Product Wire on Google News. Open access, no ads.",
  alternates: {
    canonical: "/newsletter",
  },
  openGraph: {
    title: `Newsletter | ${config.title}`,
    description:
      "Follow Product Wire on Google News. Open access, no ads.",
    url: "/newsletter",
    images: [getOgImageUrl("Newsletter")],
  },
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="border border-neutral-200 p-5 md:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-pw-secondary">
          Newsletter
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          Coming next week
        </h1>
        <p className="mt-2 max-w-xl text-[13px] text-neutral-500">
          Google News subscribe and the Product Wire newsletter go live next
          week.
        </p>
        {/* Enable next week: <NewsletterSignup /> */}
      </div>
    </div>
  );
}
