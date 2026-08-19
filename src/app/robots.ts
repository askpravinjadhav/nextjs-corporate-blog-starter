import type { MetadataRoute } from "next";
import { config } from "@/config";

const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "PerplexityBot",
  "Googlebot",
  "Bingbot",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/theme", "/saved"],
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/theme", "/saved"],
      })),
    ],
    sitemap: `${config.baseUrl}/sitemap.xml`,
    host: config.baseUrl,
  };
}
