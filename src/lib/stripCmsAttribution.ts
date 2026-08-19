import { parse } from "node-html-parser";

const ATTRIBUTION_TEXT = /powered by\s+(wisp|synscribe)/i;
const ATTRIBUTION_HREF = /(wisp\.blog|synscribe)/i;

export const stripCmsAttribution = (html: string): string => {
  const root = parse(html);

  root.querySelectorAll("a").forEach((anchor) => {
    const text = (anchor.text || "").replace(/\s+/g, " ").trim();
    const href = anchor.getAttribute("href") || "";
    const isAttribution =
      ATTRIBUTION_TEXT.test(text) ||
      (ATTRIBUTION_HREF.test(href) && ATTRIBUTION_TEXT.test(text));

    if (!isAttribution) {
      return;
    }

    const parent = anchor.parentNode;
    anchor.remove();

    if (
      parent &&
      parent.tagName === "P" &&
      !(parent.text || "").replace(/\s+/g, " ").trim()
    ) {
      parent.remove();
    }
  });

  return root.toString();
};

const normalizeUrl = (value: string) =>
  value.split("?")[0].replace(/&amp;/g, "&").trim();

export const stripLeadingFeaturedImage = (
  html: string,
  imageUrl: string | null
): string => {
  if (!imageUrl) {
    return html;
  }

  const featured = normalizeUrl(imageUrl);
  const featuredId = featured.split("/").filter(Boolean).at(-2) || "";
  const root = parse(html);

  root.querySelectorAll("img").forEach((img) => {
    const src = normalizeUrl(img.getAttribute("src") || "");
    const isFeatured =
      src === featured ||
      (featuredId.length > 8 && src.includes(featuredId));

    if (!isFeatured) {
      return;
    }

    const parent = img.parentNode;
    img.remove();

    if (!parent) {
      return;
    }

    const tag = (parent.tagName || "").toUpperCase();
    const leftover = (parent.text || "").replace(/\s+/g, " ").trim();
    if (
      ["P", "FIGURE", "DIV", "SPAN"].includes(tag) &&
      !parent.querySelector("img") &&
      !leftover
    ) {
      parent.remove();
    }
  });

  root.querySelectorAll("p").forEach((paragraph) => {
    if (!(paragraph.text || "").replace(/\s+/g, " ").trim() && !paragraph.querySelector("img")) {
      paragraph.remove();
    }
  });

  return root.toString();
};
