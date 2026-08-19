import { LegalPage, LegalSection } from "@/components/LegalPage";
import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${config.title} collects and uses information.`,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: `Privacy policy | ${config.title}`,
    description: `How ${config.title} collects and uses information.`,
    url: "/privacy",
    images: [getOgImageUrl("Privacy policy")],
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage kicker="Legal" title="Privacy policy" updated="19 August 2026">
      <p>
        This policy explains what information Product Wire collects when you
        use {new URL(config.baseUrl).hostname}, and how we use it. We do not
        run display ads or sell advertising audiences.
      </p>

      <LegalSection title="Who we are">
        <p>
          Product Wire (“we”) operates this Site. For privacy questions,
          contact us through{" "}
          <Link
            href={config.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pw-secondary hover:underline"
          >
            LinkedIn
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Information we collect">
        <p>
          <strong className="font-semibold text-black">Usage.</strong> Our
          host (Vercel) and analytics may record technical data such as pages
          viewed, approximate location derived from IP address, browser type,
          and referral source. This helps us understand what people read.
        </p>
        <p>
          <strong className="font-semibold text-black">Comments.</strong> If
          you comment, our publishing system (Wisp) stores the name, email,
          and comment text you submit, and may email you to verify the
          comment.
        </p>
        <p>
          <strong className="font-semibold text-black">Saved articles.</strong>{" "}
          Saves are kept in your browser (local storage). They are not sent to
          our servers as an account.
        </p>
        <p>
          <strong className="font-semibold text-black">Messages.</strong> If
          you write to us on LinkedIn or another channel, we receive whatever
          you send.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and similar tech">
        <p>
          We and our providers may use cookies or local storage for theme
          (light/dark), saved articles, and basic analytics. You can block
          cookies in your browser; some features, such as saves or theme
          preference, may not work.
        </p>
      </LegalSection>

      <LegalSection title="How we use information">
        <p>
          We use it to publish and improve the Site, moderate comments, measure
          readership, and respond to you. We do not sell your personal
          information. We do not use it to serve third-party ads on Product
          Wire.
        </p>
      </LegalSection>

      <LegalSection title="Sharing">
        <p>
          We share information with processors who run the Site for us,
          including hosting, analytics, and the CMS that stores posts and
          comments. They may process data in and outside India. We may
          disclose information if required by law or to protect the Site and
          our readers.
        </p>
        <p>
          Share buttons (for example X, LinkedIn, WhatsApp, or email) send
          you to those services. Their privacy policies apply once you leave
          Product Wire.
        </p>
      </LegalSection>

      <LegalSection title="Retention">
        <p>
          Comments remain while the related story is published, unless removed
          earlier. Server logs and analytics are kept only as long as needed
          for security and measurement. You can delete saved articles in your
          own browser.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>
          Depending on applicable law, including India’s Digital Personal
          Data Protection Act, 2023, you may have rights to access, correct,
          or request erasure of personal data we hold, and to withdraw
          consent where processing is based on consent. To make a request,
          contact us via LinkedIn and include enough detail for us to find
          your information.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          The Site is not directed at children under 18. We do not knowingly
          collect personal data from children.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update this policy. The “Last updated” date at the top is the
          current version.
        </p>
      </LegalSection>

      <LegalSection title="Related">
        <p>
          <Link
            href="/publication-policies"
            className="text-pw-secondary hover:underline"
          >
            Publication policies
          </Link>
          {" · "}
          <Link href="/terms" className="text-pw-secondary hover:underline">
            Terms of Service
          </Link>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
