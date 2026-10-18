# Website design

How the Niko website looks and reads. The apps follow the Niko design system in the Hub repo (`docs/04-design-system` and `docs/03-brand/04-voice-and-tone.md`). This file covers how the website applies it, and where the web differs from app screens.

## Who reads the site

Mostly helpers: family members, carers and volunteers who install an app for someone else. Some visitors are the people the apps are for, often with large text, a screen reader or a translation tool. Write and build for both.

## Pages

| Page | Job |
| --- | --- |
| `/` | Show the apps you can try now, what's coming, and what every Niko app promises |
| `/<app>/` | Everything about one app: what it does, languages, install, privacy, accessibility, questions |
| `/install/` | Installing from GitHub, updates with Obtainium, keeping apps running on battery-saving phones |
| `/privacy/` | Niko's privacy promise for all apps, with links to each app's privacy section |
| `/accessibility/` | How Niko apps are built and tested, with links to each app's accessibility section |
| `/about/` | Why Niko exists, who makes it, how to help, contact |
| `/404` | Way back to the home page |

Company pages speak for Niko as a whole. Anything true for only one app goes on that app's page, and the company page links to it with `/<app>/#privacy` or `/<app>/#accessibility`. Every app page needs those two section ids.

## Content

- **Short first, details folded.** Each section opens with a line or two. Detail goes in `<Question>` blocks, which stay closed until opened. Most people read the first line and leave.
- **Questions people actually ask.** Write the FAQ question in the reader's words ("It stopped saying the time by itself. What do I do?"), not as a topic heading.
- **Voice.** Follow the Niko voice and tone rules: short, concrete, everyday words, one idea per sentence, no jokes, no exclamation marks, no emoji. "We" means Niko.
- **No claims we can't back.** Don't say an app is tested, conforms to a standard or works on a phone unless that has been checked. Say what hasn't been done yet.
- **Same words everywhere.** "Install help", "Privacy", "Accessibility" mean the same pages in the top bar, footer and body links.
- **Dates.** Privacy and accessibility pages end with "Last updated". Change it when the content changes.

## Styling

Tailwind CSS v4 through `@tailwindcss/vite`. Style with utility classes in components and pages. `src/styles/global.css` only holds the theme tokens, the dark theme values and base styles for plain elements that Markdown produces. Don't add custom classes or other CSS there.

### Colour

Tokens in `@theme`, matching the Niko design system themes. Every text pairing meets WCAG AAA (7:1). The site follows the system light or dark theme until the reader picks one with the switcher in the top bar, which sets `data-theme` on `<html>` and remembers it in the browser.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `bg` | `#FBF8FF` | `#1A1E2B` | Page background |
| `surface` | `#FFFFFF` | `#232838` | Cards, questions, quick facts |
| `ink` | `#232838` | `#FBF8FF` | Text |
| `muted` | `#4B4F63` | `#D9D4EA` | Secondary text |
| `accent` | `#F7B9DE` | `#F7B9DE` | Main button |
| `on-accent` | `#232838` | `#232838` | Text on the main button |
| `link` | `#5E3596` | `#F7B9DE` | Links, secondary button text |
| `outline` | `#4B4F63` | `#D9D4EA` | Secondary button border |

The brand gradient is for the logo and app icons only, never behind text.

### Type

- System font, with Noto Sans as fallback for other scripts.
- The root size is 125%, so 1rem is 20px at default browser settings. Everything is in rem, so it grows with the reader's settings.
- `text-sm` is set to 0.9rem (18px), the smallest text on the site, matching the 18sp floor in the apps.
- Body text and sections are start-aligned. Only the page header (`Hero`) is centred.

### Layout and touch

- One column, `max-w-176` (44rem), 16px side padding.
- Buttons are at least 64px tall. Links in the top bar and footer have padding so the tap area is at least 48px.
- No hover-only or JavaScript-only behaviour. Folded questions use `<details>`.
- The only JavaScript is the theme switcher, inline in `BaseLayout`. The button stays hidden without JavaScript and the site follows the system theme.

## Components

| Component | Use |
| --- | --- |
| `BaseLayout` | Head, skip link, top bar, `main` and footer. Pages pass a `Hero` in the `header` slot |
| `Hero` | Page title, lead line, optional image and anything else in the slot |
| `Section` | A titled section with an id for linking |
| `Button` | The main action. `secondary` for a second action beside it |
| `Points` | A short list where each item starts with a bold label |
| `Question` | One folded FAQ question and answer |
| `FeatureList` | Feature cards. MDX bulleted lists use it; inside a `Question` they show as a plain list |
| `StepList` | Numbered steps. MDX numbered lists use it |

## Search and sharing

- Each page has a unique title and description, a canonical URL, Open Graph and Twitter card tags, and a 1200 by 630 preview image from `public/assets/og/`.
- JSON-LD from `src/lib/seo.ts`: the organization on every page, the website on the home page, and a `MobileApplication` on each app page.
- `/sitemap-index.xml`, `/robots.txt` (everything allowed, AI crawlers included), `/rss.xml` for releases, and `/llms.txt` with a plain summary for AI assistants. All are built from the apps collection, so adding an app updates them.
- Words in other languages carry a `lang` attribute, such as `<span lang="ne">नेपाली</span>`, so screen readers and search engines read them correctly.

## Accessibility checks before merging

- Every page has one `h1`, sections use `h2`, and headings don't skip levels.
- Images that only decorate have `alt=""`.
- Keyboard focus is visible on every link, button and question.
- The page reads correctly at 200% browser zoom on a 360px wide screen, with no sideways scrolling.
- New colours are checked for 7:1 contrast in both themes.
