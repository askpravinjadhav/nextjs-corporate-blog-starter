import { SavedArticles } from "@/components/SavedArticles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved articles",
  robots: { index: false, follow: false },
};

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="border border-neutral-200 p-5 md:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
          Library
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          Saved articles
        </h1>
        <p className="mt-2 max-w-2xl text-[13px] text-neutral-500">
          Stories you save stay on this device. They are not synced across
          phones or browsers.
        </p>
      </div>
      <SavedArticles />
    </div>
  );
}
