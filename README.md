# Aria Watch Website

The website of **[Aria Watch](https://aria.watch)** — open-source air-quality monitors and a community data network. _Breathe the truth._

The site is built with [Astro](https://astro.build) and ships **plain static HTML and CSS with no JavaScript framework**. All content is ordinary Markdown in [`content/`](content/), so every page reads just as well right here on GitHub.

## Where things live

```
content/                 ← all the words and photos (edit these!)
├── blog/                  blog posts — one .md per post, photos in blog/images/
├── docs/                  documentation — folders become sidebar sections
│   ├── index.md             /docs/
│   └── borino/              /docs/borino/…
└── pages/                 standalone pages: about.md → /about/, privacy.md → /privacy/
src/
├── pages/               page templates (home, blog, docs, API, 404)
├── components/          header, footer, cards, icons
├── styles/global.css    design tokens, light/dark themes, typography
├── assets/              logo, illustrations, homepage images
└── site.js              site name, nav and social links
public/                  files served as-is (favicon, social image, robots.txt)
scripts/check-site.mjs   post-build checks (links, alt text, headings)
```

## Writing content

Everything is standard GitHub-flavoured Markdown with a small frontmatter block.

**A blog post**: create `content/blog/YYYY-MM-DD-my-title.md`:

```markdown
---
title: My event
description: One sentence shown on cards and in search results.
date: 2026-05-10
slug: my_event            # URL: /blog/my_event/
tags: [faire]
cover: ./images/my-event.jpg
coverAlt: What the cover photo shows
---

# My event

Text…

![What the photo shows](./images/my-event.jpg)
```

**A docs page**: create `content/docs/<section>/<page>.md` with `title`, `description`, `section` (the sidebar group) and `order`.

Tips:

- **Images** go next to the Markdown in an `images/` folder and are linked with relative paths (`./images/photo.jpg`). They show up on GitHub, and at build time they are resized and converted to WebP automatically. Always write meaningful alt text.
- **Two or more images on consecutive lines** become a side-by-side gallery on the site.
- **Callouts** use GitHub's alert syntax, which renders on both GitHub and the site:
  ```markdown
  > [!NOTE]
  > Something worth knowing.
  ```
  `NOTE`, `TIP`, `IMPORTANT`, `WARNING` and `CAUTION` are supported.
- **Links between pages** can point to the `.md` file (`[guide](./borino/pcb-assembly.md)`): they work on GitHub and are rewritten to the right site URL.
- The first `# Heading` is the title on GitHub; on the site the title comes from the frontmatter, so it isn't shown twice.

## Development

Requires **Node.js 22.12 or newer**.

```sh
npm install
npm run dev       # http://localhost:4321 with live reload
npm test          # production build + checks (broken links, missing alt text, headings)
npm run preview   # serve the production build locally
```

## Deploy

The multi-stage [`Dockerfile`](Dockerfile) builds the site, runs the checks, and serves `dist/` with nginx ([`nginx.conf`](nginx.conf)):

```sh
docker build -t ariawatch-site .
docker run -p 8080:80 ariawatch-site
```

All images are part of the repository and the build, so the site has no dependency on external image storage.

## Analytics & privacy (GDPR)

Google Analytics 4 is optional and **consent-based**:

```sh
docker build --build-arg PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX -t ariawatch-site .
```

(or set `gaMeasurementId` in `src/site.js`). Without an ID there is no analytics and no cookie banner.

How the site stays GDPR/ePrivacy compliant:

- **Prior consent** — `gtag.js` is not loaded at all until the visitor clicks _Accept_; until then no request reaches Google. _Reject_ is as prominent as _Accept_, closing the banner (×/Esc) means reject, and the choice is asked again only after 6 months or when the setup changes (`CONSENT.version` in `src/site.js`).
- **Withdrawal** — _Cookie settings_ in the footer reopens the banner; rejecting deletes the `_ga` cookies and disables GA.
- **Minimal GA config** — Google Signals and ad personalisation off, cookies expire after 13 months.
- **No third-party requests on page load** — fonts are self-hosted (no Google Fonts), images are local; `npm test` fails if any page loads a resource from another host.
- **Anonymised server logs** — nginx drops the last part of every IP address before logging.
- **Privacy & cookie policy** — [`content/pages/privacy.md`](content/pages/privacy.md), describing exactly the above.

To do in the Google Analytics admin (Admin → Data collection and modification / Account settings):

- set **data retention to 2 months**, as stated in the policy;
- keep **Google Signals off** and turn off data sharing settings;
- accept the **Data Processing Terms** (Admin → Account settings).

## License & contributing

Found a typo or want to improve a guide? Every page has an **“Edit this page on GitHub”** link. Pull requests are welcome!
