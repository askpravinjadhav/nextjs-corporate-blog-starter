import { cn } from "@/lib/utils";

const USD_TO_INR = 83;

const companies = [
  { name: "DeepSeek", flag: "🇨🇳", country: "China", usdMillion: 7400 },
  { name: "Moonshot AI", flag: "🇨🇳", country: "China", usdMillion: 3900 },
  { name: "Mistral AI", flag: "🇫🇷", country: "France", usdMillion: 3050 },
  { name: "Reflection AI", flag: "🇺🇸", country: "United States", usdMillion: 2130 },
  { name: "Cerebras", flag: "🇺🇸", country: "United States", usdMillion: 2100 },
  { name: "Cohere", flag: "🇨🇦", country: "Canada", usdMillion: 1700 },
  { name: "Together AI", flag: "🇺🇸", country: "United States", usdMillion: 1334 },
  { name: "Baseten", flag: "🇺🇸", country: "United States", usdMillion: 585 },
  { name: "Black Forest Labs", flag: "🇩🇪", country: "Germany", usdMillion: 450 },
  { name: "Hugging Face", flag: "🇺🇸", country: "United States", usdMillion: 400 },
  { name: "Modular", flag: "🇺🇸", country: "United States", usdMillion: 380 },
  { name: "Fireworks AI", flag: "🇺🇸", country: "United States", usdMillion: 327 },
] as const;

const maxUsd = companies[0].usdMillion;

const toCrore = (usdMillion: number) =>
  Math.round((usdMillion * USD_TO_INR) / 10);

const formatCrore = (crore: number) =>
  `₹${crore.toLocaleString("en-IN")} crore`;

export const OpenSourceAiFundingChart = ({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) => {
  return (
    <figure
      className={cn("not-prose", className)}
      aria-label="Bar chart of disclosed venture funding for open-source AI companies, in Indian rupees"
    >
      <figcaption className={cn(compact ? "mt-3" : "mb-5")}>
        <h2
          className={cn(
            "font-bold tracking-tight",
            compact ? "text-[15px] leading-snug" : "text-2xl md:text-[28px]"
          )}
        >
          The venture-funded open-source AI ecosystem
        </h2>
        {!compact && (
          <p className="mt-1 text-[13px]">Total disclosed funding</p>
        )}
      </figcaption>

      <div className={cn("flex flex-col", compact ? "gap-1" : "gap-2")}>
        {companies.map((company, index) => {
          const crore = toCrore(company.usdMillion);
          const width = (company.usdMillion / maxUsd) * 100;
          const labelInside = width >= 32;
          const barHeight = compact ? "h-4" : "h-7";
          return (
            <div key={company.name} className="flex items-center">
              <div
                className={cn(
                  "shrink-0 pr-3 text-right font-medium leading-tight",
                  compact ? "w-[7.25rem] text-[10px]" : "w-[11rem] text-[13px]"
                )}
              >
                {company.name}{" "}
                <span aria-hidden="true" title={company.country}>
                  {company.flag}
                </span>
              </div>
              <div className={cn("relative min-w-0 flex-1", barHeight)}>
                <div
                  className="pointer-events-none absolute inset-0 flex"
                  aria-hidden="true"
                >
                  {Array.from({ length: 4 }).map((_, tick) => (
                    <div
                      key={tick}
                      className="flex-1 border-r border-dashed border-neutral-200"
                    />
                  ))}
                </div>
                <div
                  className={cn("relative bg-pw-secondary", barHeight)}
                  style={{ width: `${width}%` }}
                  role="img"
                  aria-label={`Bar ${index + 1} of ${companies.length}, ${company.name}, ${formatCrore(crore)}`}
                >
                  {labelInside && !compact && (
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-white">
                      {formatCrore(crore)}
                    </span>
                  )}
                </div>
                {!labelInside && !compact && (
                  <span
                    className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pl-2 text-[11px] font-semibold"
                    style={{ left: `${width}%` }}
                  >
                    {formatCrore(crore)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!compact && (
        <p className="mt-5 text-[10px] uppercase tracking-[0.12em] text-neutral-400">
          Source:{" "}
          <a
            href="https://blog.mozilla.org/en/mozilla/mozilla-state-of-open-source-ai-report/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-neutral-300 underline-offset-2 hover:text-pw-secondary hover:decoration-pw-secondary"
          >
            Mozilla State of Open Source AI report
          </a>
          . Public filings and reporting, June 2026. Converted at ₹
          {USD_TO_INR} per US dollar. Figures rounded to the nearest crore.
        </p>
      )}
    </figure>
  );
};
