# nikoapps.github.io

The Niko website, served by GitHub Pages at https://nikoapps.github.io.

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com) as a static site. Client JavaScript is limited to small scripts that add to working HTML: the theme switcher, links that follow the section being read, and the Listen button. Colours and assets come from the Niko design system. Every text pairing meets WCAG AAA contrast. Page structure, content rules and components are in [DESIGN.md](DESIGN.md).

This site also backs the `io.github.nikoapps.*` package IDs used by Niko apps, so keep it published.

## Run it

Needs Node 24 and pnpm.

```sh
pnpm install   # install dependencies
pnpm dev       # local server at http://localhost:4321
pnpm build     # build the site into dist/
pnpm preview   # serve the built site
pnpm check     # type-check pages and content
```

Every push to `main` builds the site and deploys it to GitHub Pages through `.github/workflows/deploy.yml`.

## Layout

- `src/styles/global.css`: Tailwind theme tokens and base styles for Markdown. Everything else is styled with utility classes.
- `src/layouts/BaseLayout.astro`: head, skip link, top bar and footer shared by every page.
- `src/pages/index.astro`: the home page. Apps you can try and planned apps come from the apps collection.
- `src/pages/[app]/index.astro`: the template for app detail pages.
- `src/pages/install.astro`, `privacy.astro`, `accessibility.astro`, `about.astro`: pages about Niko as a whole. App-specific details live on each app's page, and these pages link to them.
- `src/lib/seo.ts`: structured data (JSON-LD) for the organization, site and apps.
- `src/pages/rss.xml.ts`, `llms.txt.ts`, `robots.txt.ts`: the release feed, the summary for AI assistants and the crawler rules, built from the apps collection. The sitemap comes from `@astrojs/sitemap`.
- `src/components/`: shared pieces such as `Hero`, `Section`, `Button` and `Question`. See [DESIGN.md](DESIGN.md).
- `src/content/apps/`: one file per app. The schema is in `src/content.config.ts`.
- `public/`: files copied as is, such as the favicon and app icons.

## Add an app

Add the icon to `public/assets/icons/<name>.svg`, then create `src/content/apps/<name>.md` (or `.mdx`). The file name becomes the URL, so `torch.mdx` is served at `/torch/`.

A planned app only shows on the home page and needs this:

```md
---
name: Niko Torch
order: 8
status: planned
icon: torch
summary: One line about what it does.
---
```

When the app has a release, set `status` to `test` or `released` and fill in the detail page fields. Use `.mdx` so the body can use sections. Copy `clock.mdx` as a starting point:

```mdx
---
name: Niko Torch
order: 8
status: test
icon: torch
summary: One line for the home page.
tagline: Short line under the name.
intro: A paragraph on who it is for and what it does.
description: Text for search results.
ogDescription: Shorter text for link previews. Optional, defaults to description.
version: 0.1.0
minAndroid: "8.0"
download: https://github.com/NikoApps/Torch/releases/latest
source: https://github.com/NikoApps/Torch
---

<Section id="features" title="What it does">

- **Feature.** What it does.

</Section>

<Section id="install" title="Install">

1. First step.
2. Second step.

</Section>

<Section id="questions" title="Questions">

<Question q="Does it need the internet?">

No.

</Question>

</Section>
```

Each app page should have `privacy` and `accessibility` sections, since the privacy and accessibility pages link to `/<app>/#privacy` and `/<app>/#accessibility`. Keep each section to a line or two and put the detail in `<Question>` blocks.

The page header, download button, quick facts and the "More" links (source, issues, releases) come from the frontmatter. In the body, bulleted lists show as feature cards and numbered lists as install steps. The build fails if a released app is missing a required field. `released` and `changes` describe the current version: they fill the "What's new" section and the RSS feed, so update them with every release. Screenshots go in `public/assets/screenshots/<name>/` as 540 wide WebP, made from the app's `fastlane/metadata/android/en-US/images/phoneScreenshots/`; the section only shows when `screenshots` is set. For link previews, add a 1200 by 630 image at `public/assets/og/<icon>.png`; without one the page uses the Niko image.
