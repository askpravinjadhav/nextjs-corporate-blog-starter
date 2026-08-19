import { config } from "@/config";

export const getOrganizationJsonLd = () => ({
  "@type": "NewsMediaOrganization" as const,
  "@id": `${config.baseUrl}/#organization`,
  name: config.organization,
  url: config.baseUrl,
  description: config.description,
  logo: {
    "@type": "ImageObject" as const,
    url: config.logoUrl,
  },
  sameAs: [config.linkedinUrl],
});

export const getWebsiteJsonLd = () => ({
  "@type": "WebSite" as const,
  "@id": `${config.baseUrl}/#website`,
  name: config.title,
  url: config.baseUrl,
  description: config.description,
  inLanguage: "en-IN",
  publisher: { "@id": `${config.baseUrl}/#organization` },
  potentialAction: {
    "@type": "SearchAction" as const,
    target: {
      "@type": "EntryPoint" as const,
      urlTemplate: `${config.baseUrl}/?query={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});
