import urlJoin from "url-join";
interface Category {
  label: string;
  tag: string;
  description: string;
}

const categories: Category[] = [
  {
    label: "Tech",
    tag: "tech",
    description: "Stay informed on the latest technology news and innovations.",
  },
  {
    label: "Business",
    tag: "business",
    description: "Business stories, markets, and companies shaping the industry.",
  },
  {
    label: "India",
    tag: "india",
    description: "Coverage of India’s tech, business, and innovation landscape.",
  },
  {
    label: "Conferences",
    tag: "conference",
    description: "News and highlights from tech conferences around the world.",
  },
  {
    label: "Events",
    tag: "tech-events",
    description: "Tech events worth knowing about, from meetups to summits.",
  },
  {
    label: "Exhibitions",
    tag: "exhibitions",
    description: "Trade shows and exhibitions showcasing new products and ideas.",
  },
];

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const config = {
  blogId: process.env.NEXT_PUBLIC_BLOG_ID || "clvlugru90000o4g8ahxp069s",
  baseUrl,
  logoUrl: urlJoin(baseUrl, "logo.png"),
  organization: process.env.NEXT_PUBLIC_BLOG_ORGANIZATION || "Product Wire",
  title: process.env.NEXT_PUBLIC_BLOG_TITLE || "Product Wire",
  description:
    process.env.NEXT_PUBLIC_BLOG_DESCRIPTION ||
    "Stay informed on the latest in tech, business, and India — covering conferences, tech events, and exhibitions.",
  linkedinUrl: "https://www.linkedin.com/company/product-wire/",
  googleNewsUrl: `https://news.google.com/search?q=site:${new URL(baseUrl).hostname}&hl=en-IN&gl=IN&ceid=IN:en`,
  categories,
};
