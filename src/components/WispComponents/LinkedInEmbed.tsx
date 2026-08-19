const EMBED_PATH = "/embed/feed/update/";
const URN_PATTERN = /^urn:li:(ugcPost|share|activity):\d+$/;

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

const wispLinkedInEmbedHtml = (src: string, height?: string | number) => {
  const props = { src, height: parseHeight(height) };
  return `<div data-wisp-react-component="true" data-name="LinkedInEmbed" data-props="${encodeURIComponent(JSON.stringify(props))}"></div>`;
};

const extractEmbedUrl = (value: string) => {
  const match = value.match(
    /https:\/\/www\.linkedin\.com\/embed\/feed\/update\/urn:li:(?:ugcPost|share|activity):\d+(?:\?[^"'<\s]*)?/i
  );
  return getLinkedInEmbedSrc(match?.[0]);
};

const IFRAME_PATTERN =
  /<iframe\b[^>]*?\bsrc=["']([^"']+)["'][^>]*>(?:\s*<\/iframe>)?|<iframe\b[^>]*?\bsrc=["']([^"']+)["'][^>]*\/>/gi;

const ESCAPED_IFRAME_BLOCK =
  /<p\b[^>]*>\s*(?:&lt;iframe|<iframe)\b[\s\S]*?<\/p>/gi;

export const applyLinkedInEmbeds = (html: string) => {
  const replaceMatch = (full: string, srcA?: string, srcB?: string) => {
    const safe = getLinkedInEmbedSrc(srcA || srcB) || extractEmbedUrl(full);
    if (!safe) {
      return full;
    }
    const heightMatch = full.match(/height(?:\s*=\s*|&quot;|=&quot;)["']?(\d+)/i);
    return wispLinkedInEmbedHtml(safe, heightMatch?.[1]);
  };

  return html
    .replace(IFRAME_PATTERN, replaceMatch)
    .replace(ESCAPED_IFRAME_BLOCK, (full) => replaceMatch(full));
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
    <figure className="not-prose my-6 mx-auto w-full max-w-[504px] overflow-hidden border border-neutral-200 bg-white">
      <iframe
        src={embedSrc}
        height={iframeHeight}
        width={504}
        title="Embedded post"
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="block w-full max-w-full border-0"
      />
    </figure>
  );
};
