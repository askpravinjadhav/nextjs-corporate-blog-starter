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
