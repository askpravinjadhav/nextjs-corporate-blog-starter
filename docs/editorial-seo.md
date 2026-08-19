# Product Wire editorial SEO playbook

Use this on every publish. The Next.js site already emits canonicals, Open Graph, `NewsArticle` JSON-LD, `/sitemap.xml`, and `/rss`. Rankings still depend on Wisp metadata, cadence, and Google Search Console.

Live site: https://www.productwire.space  
RSS (Google News): https://www.productwire.space/rss  
Sitemap: https://www.productwire.space/sitemap.xml

## Wisp checklist (every post)

Do this in Wisp before you hit publish. Empty descriptions are the most common ranking leak.

1. **Title** — unique. Search posts: keyword near the front (`What is FOSS…`). News posts: `[Who] [does what] — [why it matters]`.
2. **Description** — 150–160 characters, never blank. Put the target phrase in the first sentence. This field is what RSS, meta, and JSON-LD use first.
3. **Slug** — short, hyphenated, keyword. Never change a slug after Google has indexed the URL.
4. **Hero image** — ~1200×630, with alt text. RSS and social cards reuse it.
5. **Tags** — 1–3 site categories only: `tech`, `business`, `india`, `conference`, `tech-events`, `exhibitions`, `visual-stories` (Infographics). Extra one-off tags create thin `/category/` URLs.
6. **Author** — named byline and photo (E-E-A-T).
7. **Internal links** — 2–4 links to older Product Wire posts in the same cluster, plus one category link.

After publish, wait ~60 seconds (post ISR), then open the live `/post/[slug]` URL and confirm title, description, and image.

## Embed a LinkedIn post

Paste LinkedIn’s **Embed this post** iframe into the Wisp article. The site turns it into a real embed (including when Wisp escapes it as text).

Or insert a Custom React Component (`/` → React) named `LinkedInEmbed` with JSON props:

```json
{
  "src": "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:YOUR_POST_ID?collapsed=1",
  "height": 533
}
```

Allowed URNs: `ugcPost`, `share`, `activity` on `www.linkedin.com` only. Do not hardcode embeds in the Next.js app.

## Google Search Console

1. Property: `https://www.productwire.space`.
2. Sitemaps → submit `https://www.productwire.space/sitemap.xml` if it is not already listed as Success.
3. After each new post: URL Inspection → paste the full URL → **Request indexing**.
4. Weekly: Coverage / Pages, Experience, Enhancements (Article / News), Search results queries.
5. Double down on queries that already work (for example FOSS) with supporting articles that link back to the pillar.

Rich results check after publish: https://search.google.com/test/rich-results

Incognito sanity check: `site:productwire.space`.

## Google News (Publisher Center)

1. Open https://publishercenter.google.com/ and claim `productwire.space`.
2. Add publication RSS: `https://www.productwire.space/rss`.
3. Confirm About, contact, masthead, original reporting, and stable `/post/[slug]` URLs.
4. Locale: English (India) — `hl=en-IN`, `gl=IN`.
5. Discover follows News quality and engagement; News inclusion is the first gate.

Do not change published URLs. Use `datePublished` only for first publish; corrections should update `updatedAt`.

## Cadence (Search + News)

Five pieces per week. Prefer this over many thin posts.

| Day | Type | Channel | Length |
| --- | --- | --- | --- |
| Mon | News brief (India tech/business) | Google News | 400–700 words |
| Tue | Search explainer or glossary | Google Search | 900–1,500 words |
| Wed | News or conference/event | News | 500–900 words |
| Thu | Infographic (chart or explainer) | Search + social | Visual + ~300-word caption |
| Fri | Weekly wrap or deeper reported piece | Both | 800–1,200 words |

News posts: publish **07:00–10:00 IST**, then request indexing and share on LinkedIn (https://www.linkedin.com/company/product-wire/).

### Topic clusters

Each cluster needs one evergreen pillar plus spokes (news, recaps, charts).

| Cluster | Pillar | Spokes |
| --- | --- | --- |
| Open source / FOSS | What is FOSS (exists) | Indian FOSS products, licenses, funding, policy |
| India product / startups | How Indian product companies raise / ship | Funding, launches, DPI / UPI / DPDP |
| Tech business | Glossary and “how X works” | Earnings, M&A, original data charts |
| Conferences / events | Conference calendar / how to read an event | Recaps, interviews, exhibition notes |

Infographics live under `/infographics/charts` and `/infographics/explainers`. Cite public sources on every chart.

### Monthly

- Week 1: publish or refresh a pillar.
- Week 4: update two older posts (intro, internal links) so `dateModified` recrawls.
- One original dataset chart (filings, GitHub, RBI, MeitY, company blogs).

### 90-day volume

About 60 content URLs, four interlinked pillars, 8–12 infographics.

## Subscribe with Google (next week)

Keep `swgEnabled` **false** until the newsletter / SWG UI is actually on the page. Google Search Console flags a mismatch if JSON-LD has `productID` but the snippet is missing.

When you go live, change **one flag** in `src/config.ts`:

```ts
swgEnabled: true,
```

That turns on both:

- `<GoogleSwg />` in `src/app/layout.tsx`
- `productID: config.swgProductId` on article JSON-LD in `src/app/post/[slug]/page.tsx`

Product ID: `CAow-MjHDA:openaccess`. Then deploy, re-test a post in Rich Results, and watch GSC Subscribed content.

## Tools

Must use: Search Console, Rich Results Test, Publisher Center, Wisp, `site:productwire.space`.

Optional: Keyword Planner or AlsoAsked, Google Trends (India), PageSpeed Insights, a sheet of slug / cluster / query / date / clicks.

Skip: paid links, spun AI duplicates, rank-tracker apps as a substitute for GSC.
