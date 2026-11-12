# Aswin Blix — Portfolio

Freelance portfolio of **Aswin Blix T.C**, a Shopify and full-stack developer building custom themes, private apps, headless storefronts, business systems, and AWS delivery. Built with Next.js 14 and deployed on GitHub Pages.

**Live:** [aswinblix.dev](https://aswinblix.dev)

Design language: **Futuristic Neumorphism** — soft extruded/inset surfaces on a single unified grey, strictly black & white, with light and dark modes.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, Static Export) |
| Styling | Tailwind CSS + SASS/SCSS (CSS-variable design tokens) |
| Theming | next-themes (class-based light/dark) |
| Animations | GSAP (ScrollTrigger) + Lottie |
| Icons | React Icons |
| Contact Form | EmailJS |
| Analytics | Google Tag Manager |
| Deployment | GitHub Pages (via GitHub Actions) |

## Features

- Neumorphic black-and-white design system with a **light/dark toggle** (next-themes)
- Fully responsive, mobile-first layout
- 16px minimum on-screen text size for readable navigation, labels, cards, forms, and supporting copy
- Expanded large-screen canvas with consistent main-content and footer alignment
- Scroll-driven story (GSAP ScrollTrigger): a pinned hero dial, a sideways services track, a stacking project deck, a word-by-word bio reveal, a time rail with a rolling year, and drifting skill rows
- Chapter dots and a "Next" pill that always name the next section
- Phones and reduced-motion users get plain scrolling: no pinning, swipeable services, static cards
- **Project detail modal** (full description, tech stack, links; Esc / backdrop close, scroll lock)
- Projects "show more" toggle to keep the grid compact
- Contact form via EmailJS
- Printable `/resume` page that exports a clean black-and-white A4 PDF
- Static export for fast load times

## Sections

- **Hero** — Headline with a pressed-in slot that rotates through what I build, a dial that turns with scroll, project CTA, and proof counters
- **Services** — Shopify themes, custom apps, headless commerce, full-stack/cloud delivery, and Android/Flutter apps
- **Selected Work** — Featured projects as a stacking card deck with highlights visible; the rest sit in an archive grid behind "Show all"
- **About** — Scroll-revealed statement, then the profile card with social links and a decorative Lottie
- **Experience & Education** — One time rail: work history then education, with a sticky embossed year
- **Skills** — Three rows of pills that drift in opposite directions on scroll
- **Contact** — Freelance project brief prompt, EmailJS form, and contact info cards

## Design System & Theming

All visual tokens live in **`app/css/globals.scss`** as CSS variables (the single source of truth):

- `--nm-bg`, `--nm-shadow-dark` / `--nm-shadow-light`, `--nm-text` / `--nm-text-muted` / `--nm-text-faint`
- Shadow presets (`--nm-raised`, `--nm-raised-sm`, `--nm-raised-lg`, `--nm-inset`, `--nm-inset-sm`) composed from the two shadow colours
- `.dark` re-tints the base colours; the presets re-resolve automatically

`tailwind.config.js` only **maps names → variables** (no hard-coded values), exposing `bg-nm-bg`, `text-nm-{text,muted,faint}`, and `shadow-nm-{raised,raised-sm,raised-lg,inset,inset-sm}`.

Reusable component classes (in `@layer components`) avoid duplicated class strings: `.nm-section`, `.nm-section-title`, `.nm-display`, `.nm-btn`, `.nm-btn-primary`, `.nm-icon-btn`, `.nm-tag`, `.nm-chip`. Headings use the Sora display face through `.nm-display`. To re-skin the whole UI, change a value once in `globals.scss`.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── homepage/           # Section components (hero, about, skills, projects, …) + scroll-guide.jsx
│   │   ├── helper/             # Shared helpers (SectionHeading, AnimationLottie)
│   │   ├── navbar.jsx
│   │   ├── footer.jsx
│   │   ├── theme-provider.jsx  # next-themes wrapper
│   │   └── scroll-progress.jsx
│   ├── css/
│   │   ├── globals.scss        # Design tokens + reusable component classes
│   │   └── resume-print.scss   # Black & white print styles for /resume
│   ├── resume/                 # Standalone resume page (PDF export)
│   ├── layout.js
│   └── page.js
├── utils/
│   └── data/                   # All portfolio content
│       ├── personal-data.js    # Positioning, name, links, contact
│       ├── services-data.js    # Freelance service offers and deliverables
│       ├── projects-data.js    # Featured work and wider project archive
│       ├── experience.js
│       ├── educations.js
│       └── skills.js
├── docs/
│   └── portfolio-entry-prompt.md  # Agent prompt that drafts new project entries
├── public/                     # Static assets (profile image, OG card, Lottie)
├── .github/workflows/          # GitHub Actions deploy pipeline
└── next.config.js
```

## Customization

All content (name, links, experience, projects, skills, education) is centralized in `utils/data/`. Update those files to personalize the portfolio — components render directly from them.

### Adding a project

Run the prompt in [`docs/portfolio-entry-prompt.md`](docs/portfolio-entry-prompt.md) with a coding agent inside the project you want to showcase. It returns an evidence-based entry in the `projects-data.js` format (name, description, three highlights, tools, role, status, links). Paste it into `utils/data/projects-data.js` with the next free `id`; array order is display order, and `featured: true` entries also appear on `/resume`. See "Adding projects" in `CLAUDE.md` for the full checklist.

## Deployment

Pushes to `main` automatically trigger the GitHub Actions workflow which builds and deploys to GitHub Pages.

The site is served at the custom domain **[aswinblix.dev](https://aswinblix.dev)** (set in repo Settings → Pages, HTTPS enforced). DNS is managed on Cloudflare with DNS-only (unproxied) records pointing at GitHub Pages; `aswin-blix.github.io` redirects to it. The sitemap at `https://aswinblix.dev/sitemap.xml` is registered in Google Search Console.

```bash
# Manual build (static export)
npm run build
```

Output is generated in the `out/` directory.

## Contact

- **Email:** aswinasvin13@gmail.com
- **LinkedIn:** [aswin-blix](https://www.linkedin.com/in/aswin-blix/)
- **GitHub:** [aswin-blix](https://github.com/aswin-blix)
