const EMBED_PATH = "/embed/feed/update/";
const URN_PATTERN = /^urn:li:(ugcPost|share|activity):\d+$/;

const ARTICLE_EMBEDS: Record<string, { src: string; height: number }> = {
  "you-dont-need-erp": {
    src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7495971428949995521?collapsed=1",
    height: 533,
  },
};

const linkedInEmbedTag = (src: string, height?: string | number) => {
  const heightAttr = height == null || height === "" ? "" : ` height="${height}"`;
  return `<LinkedInEmbed src="${src}"${heightAttr} />`;
};

const parseHeight = (height: string | number | undefined) => {
  const value = typeof height === "number" ? height : Number(height);
  if (!Number.isFinite(value) || value < 200 || value > 2000) {
    return 533;
  }
  return Math.round(value);
};

export const getLinkedInEmbedSrc = (raw: string | undefined) => {
  if (!raw?.trim()) {
    return null;
  }

  try {
    const url = new URL(raw.trim());
    if (url.protocol !== "https:") {
      return null;
    }
    if (url.hostname !== "www.linkedin.com") {
      return null;
    }
    if (!url.pathname.startsWith(EMBED_PATH)) {
      return null;
    }

    const urn = decodeURIComponent(url.pathname.slice(EMBED_PATH.length));
    if (!URN_PATTERN.test(urn)) {
      return null;
    }

    const collapsed = url.searchParams.get("collapsed");
    const embed = new URL(`https://www.linkedin.com${EMBED_PATH}${urn}`);
    if (collapsed === "1") {
      embed.searchParams.set("collapsed", "1");
    }
    return embed.toString();
  } catch {
    return null;
  }
};

const IFRAME_PATTERN =
  /<iframe\b[^>]*?\bsrc=["']([^"']+)["'][^>]*>(?:\s*<\/iframe>)?|<iframe\b[^>]*?\bsrc=["']([^"']+)["'][^>]*\/>/gi;

export const applyLinkedInEmbeds = (html: string, slug: string) => {
  let next = html.replace(IFRAME_PATTERN, (full, srcA?: string, srcB?: string) => {
    const safe = getLinkedInEmbedSrc(srcA || srcB);
    if (!safe) {
      return full;
    }
    const heightMatch = full.match(/\bheight=["']?(\d+)/i);
    return linkedInEmbedTag(safe, heightMatch?.[1]);
  });

  const articleEmbed = ARTICLE_EMBEDS[slug];
  if (
    articleEmbed &&
    !next.includes(articleEmbed.src) &&
    !next.includes("<LinkedInEmbed")
  ) {
    next = `${next}${linkedInEmbedTag(articleEmbed.src, articleEmbed.height)}`;
  }

  return next;
};

export const LinkedInEmbed = ({
  src,
  height,
}: {
  src?: string;
  height?: string | number;
}) => {
  const embedSrc = getLinkedInEmbedSrc(src);
  const iframeHeight = parseHeight(height);

  if (!embedSrc) {
    return (
      <p className="not-prose my-6 text-[13px] text-neutral-600">
        {src?.startsWith("https://www.linkedin.com/") ? (
          <a
            href={src}
            className="font-semibold text-pw-secondary underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            View this post on LinkedIn
          </a>
        ) : (
          <span>LinkedIn embed is unavailable. Use an official embed URL.</span>
        )}
      </p>
    );
  }

  return (
    <figure className="not-prose my-6 mx-auto w-full max-w-full overflow-hidden border border-neutral-200 bg-white">
      <iframe
        src={embedSrc}
        height={iframeHeight}
        width="100%"
        title="Embedded LinkedIn post"
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="block w-full max-w-full"
      />
    </figure>
  );
};
