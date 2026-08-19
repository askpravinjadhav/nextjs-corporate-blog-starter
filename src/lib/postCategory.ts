import { config } from "@/config";
import { getBestInfographicMatch, getInfographicMatch } from "@/lib/infographics";

export const getCategoryHref = (tag: string) => {
  if (tag === "latest") {
    return "/";
  }
  const infographic = getInfographicMatch(tag);
  if (infographic) {
    return infographic.href;
  }
  return `/category/${tag}`;
};

export const getPostCategory = (tags: { name: string }[]) => {
  const infographic = getBestInfographicMatch(tags);
  if (infographic) {
    return { label: infographic.label, tag: infographic.tag };
  }
  const match = config.categories.find((category) =>
    tags.some((tag) => tag.name === category.tag)
  );
  if (match) {
    return match;
  }
  if (tags[0]) {
    return { label: tags[0].name, tag: tags[0].name };
  }
  return { label: "News", tag: "latest" };
};
