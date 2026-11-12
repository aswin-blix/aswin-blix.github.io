# CLAUDE.md

Guidance for working in this repo. Read before making changes.

## What this is

Personal freelance portfolio for **Aswin Blix T.C** — Next.js 14 (App Router), **static export** to GitHub Pages, live at **https://aswinblix.dev**. Single-page site (`app/page.js`) plus a standalone `/resume` page. The buyer-facing positioning prioritizes Shopify theme/app development, headless commerce, full-stack business systems, and cloud delivery, with Android/Flutter app development as a fifth service. Design language is **Futuristic Neumorphism, strictly black & white** (no hues, ever — light & dark modes only adjust greys).

## Commands

```bash
npm run dev      # local dev at http://localhost:3000
npm run build    # production build + static export to out/  (use this to verify)
```

There are no tests. Verify changes with `npm run build` (must compile + prerender all pages) and, when relevant, by viewing the dev server.

## Hard constraints — do NOT change without being asked

- **Content lives in `utils/data/*`** (`personal-data.js`, `projects-data.js`, `experience.js`, `educations.js`, `skills.js`). Components render directly from these. Treat the data as the source of truth; don't hardcode or alter copy.
- **`next.config.js` `output: "export"`** — static export only. No server components that need a runtime, no route handlers, no server actions, no dynamic server APIs.
- **EmailJS** config/keys (`contact-form.jsx`, `NEXT_PUBLIC_EMAILJS_*`) — leave as-is.
- **Google Tag Manager** in `layout.js` — leave as-is.
- **`.github/workflows/`** deploy pipeline — leave as-is.
- **Black & white only.** Never introduce coloured values (no hex hues, no coloured icons/gradients). Use the design tokens.
- **Readable text is 16px minimum on screen.** Tailwind `text-xs` and `text-sm` intentionally resolve to `1rem`; do not add arbitrary font sizes below 16px. One approved exception: the hero availability tag is 14px. Print-only resume styles may use smaller point sizes.
- **Shared page shell.** Keep the main content and footer aligned to the same responsive `1440px` maximum width and horizontal gutters.
- **Canonical domain is `https://aswinblix.dev`.** Every absolute URL (`metadataBase`, canonicals, OG, JSON-LD `@id`/`url`, sitemap, robots) uses it — never `aswin-blix.github.io`, which only 301-redirects. Absolute URLs live in `app/layout.js`, `app/page.js`, `app/resume/layout.jsx`, `app/sitemap.js`, `app/robots.js`.

## Design system (single source of truth)

All visual tokens are CSS variables in **`app/css/globals.scss`** under `:root` (light) and `.dark` (dark):

- Colours: `--nm-bg`, `--nm-text`, `--nm-text-muted`, `--nm-text-faint`, `--nm-shadow-dark`, `--nm-shadow-light`, `--nm-edge` (hairline border that makes `.nm-btn` / `.nm-icon-btn` read as pressable, mainly in dark mode)
- Shadow presets composed from the two shadow colours: `--nm-raised`, `--nm-raised-sm`, `--nm-raised-lg`, `--nm-inset`, `--nm-inset-sm`
- Presets are defined only on `:root`; `.dark` re-tints the base colours and presets re-resolve automatically.

**`tailwind.config.js` only maps names → these variables** (no literal values). Exposes `bg-nm-bg`, `text-nm-{text,muted,faint}`, `shadow-nm-{raised,raised-sm,raised-lg,inset,inset-sm}`. To restyle globally, edit `globals.scss` — not the config.

### Reuse these instead of re-typing class strings

Component classes live in `@layer components` in `globals.scss` (so per-instance Tailwind utilities still override them):

- `.nm-section` — section vertical rhythm
- `.nm-section-title` — uppercase section title (used via `SectionHeading`)
- `.nm-display` — Sora display heading, semibold (`--font-display`, loaded in `layout.js`); set the size per instance
- `.nm-btn` / `.nm-btn-primary` — raised pill button / filled inverted button
- `.nm-icon-btn` — round icon button (compose with `h-9 w-9` etc.)
- `.nm-tag` — inset mini pill (dates, tags, role badges)
- `.nm-chip` — raised pill (skills)
- `.nm-surface` (bg), `.nm-rule` (inset divider line)

Section headers use the `app/components/helper/section-heading.jsx` component, not ad-hoc markup.

## Conventions

- **Theming:** `next-themes`, class strategy, default light (a visitor's own toggle choice is remembered and wins). Wrapper at `app/components/theme-provider.jsx`; toggle in `navbar.jsx` reads `resolvedTheme` (with a DOM fallback). `<html>` and `<body>` carry `suppressHydrationWarning`.
- **GSAP:** use the `useGSAP` hook scoped to a container ref. Common patterns: entrance `fromTo({opacity:0,y},…)` with `ScrollTrigger`, 3D "extrude-in" (`rotateX` + `transformPerspective`), and hover/press via `boxShadow` between `var(--nm-raised)`/`var(--nm-inset)`. Plugins (`ScrollTrigger`, `ScrambleText`) are bundled free in gsap 3.13; only `ScrollTrigger` is in use.
- **Lottie:** import JSON from `/public/lottie/*` and load `AnimationLottie` via `dynamic(..., { ssr: false })`. Keep it greyscale to honour B&W.
- **Section components** live in `app/components/homepage/<section>/index.jsx`, assembled in `app/page.js` in order: hero → services → projects → about → experience → skills → contact. Education has no component of its own: `experience/index.jsx` renders both data files as one time rail (the `#education` anchor is inside it).
- **Scroll story.** Each section has one scroll mechanic:
  - hero: pinned dial + `.nm-slot` word rotation, driven by `personalData.heroRotation`
  - services: pinned sideways track
  - projects: sticky deck of `featured` projects (`.nm-deck-card`), archive grid behind "Show all"
  - about: word-by-word reveal of the first paragraph of `personalData.description`
  - experience: time rail with a sticky `.nm-emboss` year
  - skills: drifting rows
  - `homepage/scroll-guide.jsx`: chapter dots + "Next" pill; its `CHAPTERS` list must match the section ids
- **Motion gating.** Pinning and sticky effects run only inside `gsap.matchMedia()` queries (`min-width: 1024px`, a `min-height`, and `prefers-reduced-motion: no-preference`). Outside them the content must still be complete: the hero slot rotates on a timer, services become a native swipe row, cards are static. Keep that fallback when adding effects. The deck's sticky rule in `globals.scss` and its matchMedia query in `projects/index.jsx` must use the same condition.
- **Horizontal overflow.** Anything wider than the page (skill rows) sits in a wrapper with `overflow-x-clip`. Don't rely on `<body>` to clip it; phones can still pan sideways.
- **`/resume`** is self-contained; its print styles are in `app/css/resume-print.scss` (black & white A4). Do not inline a `<style>` block there (causes hydration mismatch).
- **Adding projects** (entries usually come from the agent prompt in `docs/portfolio-entry-prompt.md`):
  - Fields: `id, name, description, highlights[3], tools, role, status, featured, code, demo`. Assign the next unused `id` (ids are unique keys, not display order).
  - **Array order is display order.** On the homepage every `featured: true` entry is a card in the scroll deck and the rest sit in the archive grid behind "Show all"; `/resume` lists every `featured: true` entry. Keep Shopify/commerce work at the top to match the positioning.
  - **Check for duplicates first.** If a project overlaps an existing entry (same repo, platform, or product under a new name), merge into or replace that entry instead of adding a second one.
  - Match existing tool spellings (`Liquid`, `Next JS`, `Typescript`, …). Rewrite `aswin-blix.github.io/...` demo links to `https://aswinblix.dev/...`.
  - Card icons come from `ICON_RULES` in `projects/index.jsx` (monochrome `react-icons/si`, regex on name/tools/role). Add a rule if a new stack falls back to the generic icon.
  - New core technologies go in `utils/data/skills.js` and, when significant, in JSON-LD `knowsAbout` (`app/page.js`) and `keywords` (`app/layout.js`).
- **New public pages** must be added to `app/sitemap.js` and given a canonical URL in their layout/page metadata. The sitemap is submitted in Google Search Console (Domain property `aswinblix.dev`).

## Hosting & domain

- Deploys on every push to `main` via the GitHub Actions workflow. The custom domain is set in repo **Settings → Pages** (Enforce HTTPS on), so no `public/CNAME` file is needed.
- DNS is on **Cloudflare**: 4 A + 4 AAAA GitHub Pages IPs on `@`, `www` CNAME → `aswin-blix.github.io`, and a `google-site-verification` TXT on `@` (keep it, or Search Console verification is lost).
- Keep those records **DNS only (grey cloud)**. `.dev` is HSTS-preloaded (HTTPS mandatory) and GitHub can only issue and renew its certificate when Cloudflare isn't proxying.

## Gotchas

- Importing colored skill SVGs / coloured Lottie violates the B&W rule — avoid.
- This is a Windows/WAMP checkout (`C:\wamp64\www\...`). When viewing the exported `out/` build, serve it from the **domain root**, not an Apache subpath, or `/_next/*` assets 404 and all client JS (incl. the theme toggle) silently dies.
- Git may warn `LF will be replaced by CRLF` on Windows — harmless.
