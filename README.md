<p align="center">
  <a href="https://aria.watch">
    <img src="src/assets/logo.png" alt="Aria Watch" width="320">
  </a>
</p>

<p align="center">
  <strong>Open-source air-quality monitors and a community data network.</strong><br>
  <em>Know what you breathe. Act for the planet.</em>
</p>

<p align="center">
  <a href="https://aria.watch">Website</a> ·
  <a href="https://app.aria.watch">App</a> ·
  <a href="https://github.com/Aria-Watch/Aria-Watch-Borino-PCB">Borino PCB</a> ·
  <a href="https://www.instagram.com/aria.watch_official/">Instagram</a>
</p>

---

This repository contains the source of **[aria.watch](https://aria.watch)**, the website of the Aria Watch project.

It is a static site built with [Astro](https://astro.build): plain HTML and CSS, no JavaScript framework, self-hosted fonts and images. Pages, docs and blog posts are Markdown files in [`content/`](content/).

## Run it locally

Requires **Node.js 22.12+**.

```sh
npm install
npm run dev     # http://localhost:4321
npm test        # production build + checks (links, alt text, headings, no third-party requests)
```

## Deploy

The [`Dockerfile`](Dockerfile) builds the site, runs the checks and serves it with nginx:

```sh
docker build -t ariawatch-site .
docker run -p 8080:80 ariawatch-site
```

## Privacy

Google Analytics is loaded **only after the visitor accepts** the cookie banner, and nginx stores IP addresses truncated. Details are in the [privacy & cookie policy](content/pages/privacy.md).

## Contact

[info@aria.watch](mailto:info@aria.watch)
