# Aswin Blix — Portfolio

Personal portfolio website of **Aswin Blix T.C**, an AI-Native Full Stack Engineer. Built with Next.js 14 and deployed on GitHub Pages.

**Live:** [aswin-blix.github.io](https://aswin-blix.github.io)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, Static Export) |
| Styling | Tailwind CSS + SASS/SCSS |
| Animations | GSAP + Lottie |
| Icons | React Icons |
| Contact Form | EmailJS |
| Analytics | Google Tag Manager |
| Deployment | GitHub Pages (via GitHub Actions) |

## Features

- Responsive design with mobile-first approach
- GSAP-powered animations (scramble text, stagger, entrance effects)
- Dev.to blog integration (auto-fetches latest articles)
- Contact form via EmailJS
- Project stacking card UI
- Static export for fast load times

## Sections

- **Hero** — Introduction with animated code snippet
- **About** — Personal summary with Lottie animations
- **Experience** — Work history timeline
- **Skills** — Tech skill grid
- **Projects** — Stacked project cards
- **Education** — Academic background
- **Blog** — Auto-fetched Dev.to articles
- **Contact** — EmailJS contact form

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
│   │   ├── homepage/       # Section components (hero, about, skills, etc.)
│   │   ├── helper/         # Shared helpers (GlowCard, AnimationLottie)
│   │   ├── navbar.jsx
│   │   └── footer.jsx
│   ├── css/                # Global + component SCSS
│   ├── layout.js
│   └── page.js
├── utils/
│   ├── data/
│   │   └── personal-data.js  # All portfolio content lives here
│   └── skill-image.js
├── public/                   # Static assets (images, SVGs, Lottie JSONs)
├── .github/workflows/        # GitHub Actions deploy pipeline
└── next.config.js
```

## Customization

All content (name, links, experience, projects, skills) is centralized in `utils/data/`. Update those files to personalize the portfolio.

## Deployment

Pushes to `main` automatically trigger the GitHub Actions workflow which builds and deploys to GitHub Pages.

```bash
# Manual build
npm run build
```

Output is generated in the `out/` directory.

## Contact

- **Email:** aswinasvin13@gmail.com
- **LinkedIn:** [aswin-blix](https://www.linkedin.com/in/aswin-blix/)
- **GitHub:** [aswin-blix](https://github.com/aswin-blix)
