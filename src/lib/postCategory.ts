import { config } from "@/config";

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
