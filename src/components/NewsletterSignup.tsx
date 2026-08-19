import { GoogleSubscribeButton } from "@/components/GoogleSubscribeButton";
import { config } from "@/config";
import Link from "next/link";

export const NewsletterSignup = ({
  compact = false,
}: {
  compact?: boolean;
}) => {
  return (
    <div className={compact ? "" : "border-b border-neutral-200 p-5 md:p-6"}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-pw-secondary">
        Newsletter
      </p>
      <h2 className="mt-2 text-xl font-bold tracking-tight">
        Follow Product Wire
      </h2>
      <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-neutral-500">
        Open access via Google. No ads. Subscribe to get Product Wire in Google
        News and Google’s newsletter prompts.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <GoogleSubscribeButton label="Subscribe" />
        <Link
          href={config.googleNewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-600 hover:text-black"
        >
          Google News →
        </Link>
      </div>
    </div>
  );
};
