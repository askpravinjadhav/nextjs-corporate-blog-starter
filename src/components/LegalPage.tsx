import { config } from "@/config";
import type { ReactNode } from "react";

export const LegalPage = ({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: ReactNode;
}) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <article className="border border-neutral-200">
        <header className="border-b border-neutral-200 p-5 md:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-pw-secondary">
            {kicker}
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-[12px] text-neutral-400">
            Last updated {updated} · {config.organization}
          </p>
        </header>
        <div className="legal-copy max-w-3xl space-y-6 p-5 text-[14px] leading-relaxed text-neutral-600 md:p-6">
          {children}
        </div>
      </article>
    </div>
  );
};

export const LegalSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <section>
      <h2 className="text-[10px] font-bold uppercase tracking-[0.16em] text-black">
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
};
