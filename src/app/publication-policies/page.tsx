import { LegalPage, LegalSection } from "@/components/LegalPage";
import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Publication policies",
  description:
    "How Product Wire reports, corrects, and presents news, charts, and explainers.",
  alternates: {
    canonical: "/publication-policies",
  },
  openGraph: {
    title: `Publication policies | ${config.title}`,
    description:
      "How Product Wire reports, corrects, and presents news, charts, and explainers.",
    url: "/publication-policies",
    images: [getOgImageUrl("Publication policies")],
  },
};

export default function PublicationPoliciesPage() {
  return (
    <LegalPage
      kicker="Policies"
      title="Publication policies"
      updated="19 August 2026"
    >
      <p>
        Product Wire publishes news without the noise and without ads. These
        policies explain how we report, how we handle mistakes, and how we
        present charts and explainers.
      </p>

      <LegalSection title="Independence">
        <p>
          Editorial decisions are made by Product Wire. We do not sell display
          ads, sponsored inventory, or paid placement in news, charts, or
          explainers. Mentions of companies, products, or events are not
          endorsements.
        </p>
      </LegalSection>

      <LegalSection title="What we cover">
        <p>
          We cover tech, business, and India, including conferences, events,
          exhibitions, and infographics. Stories should be useful, sourced, and
          written so a general reader can follow them.
        </p>
      </LegalSection>

      <LegalSection title="Sourcing">
        <p>
          Facts should be attributed to named people, public filings, official
          statements, or other primary material whenever possible. Charts and
          data graphics must name their source on the page. When we convert
          figures (for example, US dollars to Indian rupees), we state the rate
          and the date of the conversion.
        </p>
      </LegalSection>

      <LegalSection title="Infographics">
        <p>
          Charts and explainers sit under Infographics. Visuals should not
          distort scale, hide context, or present estimates as audited fact.
          Rounded figures should be labelled as rounded.
        </p>
      </LegalSection>

      <LegalSection title="Corrections">
        <p>
          If we get something wrong, we correct it. Material errors are noted
          on the story. If you spot an error, write to us through{" "}
          <Link
            href={config.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pw-secondary hover:underline"
          >
            LinkedIn
          </Link>{" "}
          with the URL and what should be fixed.
        </p>
      </LegalSection>

      <LegalSection title="Comments">
        <p>
          Comments are welcome when they add information or a fair argument.
          We may remove spam, abuse, personal data dumps, and comments that
          impersonate others. Commenting is subject to our{" "}
          <Link href="/terms" className="text-pw-secondary hover:underline">
            Terms of Service
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="AI and tools">
        <p>
          We may use software, including AI tools, to draft, edit, chart, or
          check copy. Editors remain responsible for what we publish. We do
          not invent sources, quotes, or figures.
        </p>
      </LegalSection>

      <LegalSection title="Related">
        <p>
          <Link href="/terms" className="text-pw-secondary hover:underline">
            Terms of Service
          </Link>
          {" · "}
          <Link href="/privacy" className="text-pw-secondary hover:underline">
            Privacy policy
          </Link>
          {" · "}
          <Link href="/about" className="text-pw-secondary hover:underline">
            About
          </Link>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
