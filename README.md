# Aswin Blix — Portfolio

Freelance portfolio of **Aswin Blix T.C**, a Shopify and full-stack developer building custom themes, private apps, headless storefronts, business systems, and AWS delivery. Built with Next.js 14 and deployed on GitHub Pages.

**Live:** [aswin-blix.github.io](https://aswin-blix.github.io)

Design language: **Futuristic Neumorphism** — soft extruded/inset surfaces on a single unified grey, strictly black & white, with light and dark modes.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, Static Export) |
| Styling | Tailwind CSS + SASS/SCSS (CSS-variable design tokens) |
| Theming | next-themes (class-based light/dark) |
| Animations | GSAP (ScrollTrigger, ScrambleText) + Lottie |
| Icons | React Icons |
| Contact Form | EmailJS |
| Analytics | Google Tag Manager |
| Deployment | GitHub Pages (via GitHub Actions) |

## Features

- Neumorphic black-and-white design system with a **light/dark toggle** (next-themes)
- Fully responsive, mobile-first layout
- GSAP motion: scramble hero text, scroll-progress rail, hero depth parallax, and 3D "extrude-in" card entrances
- **Project detail modal** (full description, tech stack, links; Esc / backdrop close, scroll lock)
- Projects "show more" toggle to keep the grid compact
- Contact form via EmailJS
- Printable `/resume` page that exports a clean black-and-white A4 PDF
- Static export for fast load times

## Sections

- **Hero** — Buyer-focused positioning, project CTA, animated proof counters, and a monospace capability snippet
- **Services** — Shopify themes, custom apps, headless commerce, and full-stack/cloud delivery
- **Selected Work** — Featured Shopify and commerce case studies followed by the wider project archive
- **About** — Profile card with social links and a decorative Lottie
- **Experience** — Work history as a card grid
- **Skills** — Floating neumorphic pill cloud
- **Education** — Responsive card grid (2×2 → single row)
- **Contact** — Freelance project brief prompt, EmailJS form, and contact info cards

## Design System & Theming

All visual tokens live in **`app/css/globals.scss`** as CSS variables (the single source of truth):

- `--nm-bg`, `--nm-shadow-dark` / `--nm-shadow-light`, `--nm-text` / `--nm-text-muted` / `--nm-text-faint`
- Shadow presets (`--nm-raised`, `--nm-raised-sm`, `--nm-raised-lg`, `--nm-inset`, `--nm-inset-sm`) composed from the two shadow colours
- `.dark` re-tints the base colours; the presets re-resolve automatically

`tailwind.config.js` only **maps names → variables** (no hard-coded values), exposing `bg-nm-bg`, `text-nm-{text,muted,faint}`, and `shadow-nm-{raised,raised-sm,raised-lg,inset,inset-sm}`.

Reusable component classes (in `@layer components`) avoid duplicated class strings: `.nm-section`, `.nm-section-title`, `.nm-btn`, `.nm-btn-primary`, `.nm-icon-btn`, `.nm-tag`, `.nm-chip`. To re-skin the whole UI, change a value once in `globals.scss`.

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
│   │   ├── homepage/           # Section components (hero, about, skills, projects, …)
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
├── public/                     # Static assets (profile image, OG card, Lottie)
├── .github/workflows/          # GitHub Actions deploy pipeline
└── next.config.js
```

## Customization

All content (name, links, experience, projects, skills, education) is centralized in `utils/data/`. Update those files to personalize the portfolio — components render directly from them.

## Deployment

Pushes to `main` automatically trigger the GitHub Actions workflow which builds and deploys to GitHub Pages.

```bash
# Manual build (static export)
npm run build
```

Output is generated in the `out/` directory.

## Contact

- **Email:** aswinasvin13@gmail.com
- **LinkedIn:** [aswin-blix](https://www.linkedin.com/in/aswin-blix/)
- **GitHub:** [aswin-blix](https://github.com/aswin-blix)
