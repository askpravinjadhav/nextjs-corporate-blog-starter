import { config } from "@/config";

export const getCategoryHref = (tag: string) => {
  if (tag === "latest") {
    return "/";
  }
  if (tag === "visual-stories") {
    return "/visual-stories";
  }
  return `/category/${tag}`;
};

export const getPostCategory = (tags: { name: string }[]) => {
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
