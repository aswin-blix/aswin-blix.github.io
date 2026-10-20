# CLAUDE.md

Guidance for working in this repo. Read before making changes.

## What this is

Personal freelance portfolio for **Aswin Blix T.C** — Next.js 14 (App Router), **static export** to GitHub Pages. Single-page site (`app/page.js`) plus a standalone `/resume` page. The buyer-facing positioning prioritizes Shopify theme/app development, headless commerce, full-stack business systems, and cloud delivery. Design language is **Futuristic Neumorphism, strictly black & white** (no hues, ever — light & dark modes only adjust greys).

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

## Design system (single source of truth)

All visual tokens are CSS variables in **`app/css/globals.scss`** under `:root` (light) and `.dark` (dark):

- Colours: `--nm-bg`, `--nm-text`, `--nm-text-muted`, `--nm-text-faint`, `--nm-shadow-dark`, `--nm-shadow-light`
- Shadow presets composed from the two shadow colours: `--nm-raised`, `--nm-raised-sm`, `--nm-raised-lg`, `--nm-inset`, `--nm-inset-sm`
- Presets are defined only on `:root`; `.dark` re-tints the base colours and presets re-resolve automatically.

**`tailwind.config.js` only maps names → these variables** (no literal values). Exposes `bg-nm-bg`, `text-nm-{text,muted,faint}`, `shadow-nm-{raised,raised-sm,raised-lg,inset,inset-sm}`. To restyle globally, edit `globals.scss` — not the config.

### Reuse these instead of re-typing class strings

Component classes live in `@layer components` in `globals.scss` (so per-instance Tailwind utilities still override them):

- `.nm-section` — section vertical rhythm
- `.nm-section-title` — uppercase section title (used via `SectionHeading`)
- `.nm-btn` / `.nm-btn-primary` — raised pill button / filled inverted button
- `.nm-icon-btn` — round icon button (compose with `h-9 w-9` etc.)
- `.nm-tag` — inset mini pill (dates, tags, role badges)
- `.nm-chip` — raised pill (skills)
- `.nm-surface` (bg), `.nm-rule` (inset divider line)

Section headers use the `app/components/helper/section-heading.jsx` component, not ad-hoc markup.

## Conventions

- **Theming:** `next-themes`, class strategy, default dark. Wrapper at `app/components/theme-provider.jsx`; toggle in `navbar.jsx` reads `resolvedTheme` (with a DOM fallback). `<html>` and `<body>` carry `suppressHydrationWarning`.
- **GSAP:** use the `useGSAP` hook scoped to a container ref. Common patterns: entrance `fromTo({opacity:0,y},…)` with `ScrollTrigger`, 3D "extrude-in" (`rotateX` + `transformPerspective`), and hover/press via `boxShadow` between `var(--nm-raised)`/`var(--nm-inset)`. Plugins (`ScrollTrigger`, `ScrambleText`) are bundled free in gsap 3.13.
- **Lottie:** import JSON from `/public/lottie/*` and load `AnimationLottie` via `dynamic(..., { ssr: false })`. Keep it greyscale to honour B&W.
- **Section components** live in `app/components/homepage/<section>/index.jsx`, assembled in `app/page.js` in order: hero → services → projects → about → experience → skills → education → contact.
- **`/resume`** is self-contained; its print styles are in `app/css/resume-print.scss` (black & white A4). Do not inline a `<style>` block there (causes hydration mismatch).

## Gotchas

- Importing colored skill SVGs / coloured Lottie violates the B&W rule — avoid.
- This is a Windows/WAMP checkout (`C:\wamp64\www\...`). When viewing the exported `out/` build, serve it from the **domain root**, not an Apache subpath, or `/_next/*` assets 404 and all client JS (incl. the theme toggle) silently dies.
- Git may warn `LF will be replaced by CRLF` on Windows — harmless.
