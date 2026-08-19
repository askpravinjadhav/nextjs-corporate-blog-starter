export type InfographicSection = {
  slug: "charts" | "explainers";
  label: string;
  tag: string;
  href: string;
  description: string;
};

export const infographicSections: InfographicSection[] = [
  {
    slug: "charts",
    label: "Charts",
    tag: "charts",
    href: "/infographics/charts",
    description:
      "Data graphics from Product Wire, with figures in Indian rupees.",
  },
  {
    slug: "explainers",
    label: "Explainers",
    tag: "explainers",
    href: "/infographics/explainers",
    description: "Visual explainers of how products, tech, and markets work.",
  },
];

export const infographicsParent = {
  label: "Infographics",
  tag: "visual-stories",
  href: "/infographics",
  description: "Charts and explainers from Product Wire.",
};

export const getInfographicSection = (slug: string) =>
  infographicSections.find((section) => section.slug === slug);

export const getInfographicMatch = (tag: string) => {
  if (tag === infographicsParent.tag || tag === "infographics") {
    return infographicsParent;
  }
  return infographicSections.find((section) => section.tag === tag) || null;
};

export const getBestInfographicMatch = (tags: { name: string }[]) => {
  const section = infographicSections.find((item) =>
    tags.some((tag) => tag.name === item.tag)
  );
  if (section) {
    return section;
  }
  if (
    tags.some(
      (tag) => tag.name === infographicsParent.tag || tag.name === "infographics"
    )
  ) {
    return infographicsParent;
  }
  return null;
};
