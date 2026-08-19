import { LegalPage, LegalSection } from "@/components/LegalPage";
import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for using ${config.title}.`,
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: `Terms of Service | ${config.title}`,
    description: `Terms for using ${config.title}.`,
    url: "/terms",
    images: [getOgImageUrl("Terms of Service")],
  },
};

export default function TermsPage() {
  return (
    <LegalPage kicker="Legal" title="Terms of Service" updated="19 August 2026">
      <p>
        These terms govern your use of {config.title} at{" "}
        {new URL(config.baseUrl).hostname} (the “Site”). By using the Site, you
        agree to them. If you do not agree, do not use the Site.
      </p>

      <LegalSection title="The Site">
        <p>
          Product Wire publishes news, charts, and explainers. Content is for
          general information. It is not investment, legal, or professional
          advice. You are responsible for how you use it.
        </p>
      </LegalSection>

      <LegalSection title="Licence to read">
        <p>
          We grant you a limited, non-exclusive licence to access the Site for
          personal, non-commercial use. You may not scrape the Site in a way
          that harms our service, copy our pages for a competing publication,
          or remove credits and source notes from our charts.
        </p>
      </LegalSection>

      <LegalSection title="Your comments">
        <p>
          If you post a comment, you confirm that you have the right to post
          it, that it is not unlawful, and that it does not infringe someone
          else’s rights. You grant Product Wire a licence to display that
          comment on the Site. We may refuse or remove comments at our
          discretion, as described in our{" "}
          <Link
            href="/publication-policies"
            className="text-pw-secondary hover:underline"
          >
            publication policies
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Saved articles">
        <p>
          Saved articles are stored in your browser. We do not promise that
          saves will persist across devices or after you clear site data.
        </p>
      </LegalSection>

      <LegalSection title="Third-party links">
        <p>
          The Site may link to other websites, filings, or social networks.
          We are not responsible for those sites or their policies.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer">
        <p>
          The Site is provided “as is.” To the fullest extent permitted by
          law, Product Wire disclaims warranties of accuracy, completeness,
          merchantability, and fitness for a particular purpose. Charts may
          use rounded figures and stated conversion rates.
        </p>
      </LegalSection>

      <LegalSection title="Liability">
        <p>
          To the fullest extent permitted by law, Product Wire is not liable
          for indirect, incidental, or consequential loss arising from your
          use of the Site. Nothing in these terms limits liability that cannot
          be limited under applicable law.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update these terms. The “Last updated” date at the top of
          this page is the current version. Continued use of the Site after a
          change means you accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>
          These terms are governed by the laws of India. Courts in India have
          exclusive jurisdiction, subject to any rights you have under
          mandatory consumer law.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms:{" "}
          <Link
            href={config.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pw-secondary hover:underline"
          >
            Product Wire on LinkedIn
          </Link>
          . Also see our{" "}
          <Link href="/privacy" className="text-pw-secondary hover:underline">
            privacy policy
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
