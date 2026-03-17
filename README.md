# Sakthivel Madhu — Personal Portfolio v2.0

> Live at **[sakthivelmadhu.github.io](https://sakthivelmadhu.github.io)**

Personal portfolio built from scratch to showcase 3+ years of backend engineering experience. Designed with a dark luxury aesthetic, immersive animations, and a single source-of-truth data file — making content updates painless.

---

## Overview

This is a fully custom React SPA (no template, no UI library). Every component, animation, and interaction was hand-crafted. The goal was to build something that stands out visually while keeping the codebase clean and maintainable.

**Key stats from the build:**
- ~15 custom components
- ~600KB JS bundle (gzipped: ~127KB)
- ~24KB CSS (gzipped: ~5.7KB)
- Build time: ~3–4 seconds
- Deployed automatically on every push to `main`

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| UI Framework | React | 18.3.1 |
| Build Tool | Vite | 5.3.1 |
| Animation (scroll & entrance) | Framer Motion | 11.3.0 |
| Animation (parallax & scrub) | GSAP + ScrollTrigger | 3.12.5 |
| Styling | Tailwind CSS | 3.4.4 |
| CSS Processing | PostCSS + Autoprefixer | 8.x / 10.x |
| Static Assets | vite-plugin-static-copy | 1.0.6 |
| Contact Form Backend | FormSubmit.co | — |
| Deployment | GitHub Pages via GitHub Actions | — |

---

## Design System

### Color Palette

| Name | Hex | Usage |
|---|---|---|
| Background | `#0a0a0f` | Page background |
| Cyan | `#00D4FF` | Primary accent, CTAs, links |
| Purple | `#8B5CF6` | Secondary accent, section labels |
| Pink | `#EC4899` | Highlights, badges |
| Gold | `#F59E0B` | Achievements, warnings |
| Green | `#10B981` | Success states, availability |
| Surface | `rgba(255,255,255,0.02–0.04)` | Card backgrounds |

### Typography

| Role | Font | Source |
|---|---|---|
| Headings | Space Grotesk | Google Fonts |
| Body | Inter | Google Fonts |
| Code / Mono labels | JetBrains Mono | Google Fonts |

### Animation Philosophy

Two libraries handle different concerns:

**Framer Motion** — component-level animations:
- Entrance animations (`initial` → `animate` driven by `useInView`)
- Hover interactions (`whileHover`, `whileTap`)
- Page transitions (`AnimatePresence`)
- Scroll-linked parallax (`useScroll` + `useTransform`)
- Keyframe sequences (name color wave, floating badges, pulsing dots)

**GSAP + ScrollTrigger** — section-level scrub animations:
- Heading scrub (y + opacity tied to scroll position)
- Used sparingly on `WorkHistory` and `About` section headings

---

## Sections

### Hero
- Animated entrance: each letter drops in with `rotateX` 3D flip + stagger
- After entrance: per-letter color wave continuously cycles through 6 brand colors with staggered phase offsets
- Rotating job titles (typewriter-style via `AnimatePresence`)
- GSAP parallax blobs in background

### Impact Numbers
- Full-width strip between Hero and About
- 4 stats: `3+ Years · 12+ Projects · 92% Manual Work Reduced · 80% Faster Onboarding`
- Animated count-up using `setInterval` triggered on scroll-in
- Top accent lines animate in with `pathLength` draw effect

### About
- Holographic ID Card: hexagonal photo clip-path, circuit SVG corner overlays, holographic sweep animation, 3D mouse-tilt via RAF loop
- 3-column layout: ID card + stats | Bio + strengths | Education timeline + location
- `CountUp` component for animated number stats
- `EducationTimeline` renders education array as a vertical timeline

### Work History
- Zigzag alternating layout across 3 chapters:
  - Chapter 03 (Twinleaves): job card LEFT, 3D panel RIGHT
  - Chapter 02 (Masai): 3D panel LEFT, job card RIGHT
  - Chapter 01 (EFI): job card LEFT, 3D panel RIGHT
- 3D panels: mouse-tracking tilt via RAF loop, floating metric badges with `translateZ` depth, always-active animations (no hover trigger needed)
- Job card side: achievements auto-rotate every 3.2s with `AnimatePresence` slide transition + dot indicators
- Chapter dividers with animated connecting pips

### Projects
- Clean editorial design: unified dark background, single thin left accent bar per category
- Subtle 3D tilt (5°/7° — less aggressive than before)
- **Case Study Modal**: click any card to open a slide-up overlay with image, overview, impact checklist, full tech stack
- Filter tabs: All / Enterprise / Backend / Frontend / Python
- Private repos show lock icon instead of broken links

### Open Source / GitHub
- 6 repo cards showing language, description, topic tags, star and fork counts
- Language-colored left accent bar per card
- Links open in new tab

### Skills
- 4 categories: Backend & Cloud, Databases & Messaging, AI/Security & Languages, Domain & Practices
- Animated progress bars with shimmer sweep
- `useInView` triggers bar fill animations on scroll-in

### Recognition
- Achievement + certification cards with external links to certificates/awards

### Testimonials
- 2 hardcoded LinkedIn recommendation cards (Lalith Kumar, Abu Salem)
- Pending LinkedIn publish — content is accurate and will be updated

### GitHub Stats
- External image cards via `github-readme-stats.vercel.app` and `github-readme-streak-stats.herokuapp.com`
- Custom LeetCode stat card

### Beyond the Code
- **Scroll parallax storytelling**: each content row moves at a different parallax speed using `useScroll` + `useTransform`, background blobs drift in opposite directions, floating depth dots at different Z rates
- **Live hobby animations on hover**: Swimming (animated sine waves + swimmer), Driving (moving road dashes + car), Reading (3D book page flip), Cooking (steam wisps), Exploring (GPS ping rings), Learning (bulb glow)
- Currently Learning with animated progress bars + shimmer
- On The Way goals
- Fun facts with staggered entrance from 6 directions
- Philosophy / drive quote card

### Contact
- Animated form via FormSubmit.co (no backend needed)
- Floating particles background
- Field focus glow states
- Availability status card with scan sweep

### Footer
- Giant translucent `SM` monogram as watermark
- Animated constellation SVG (nodes + edges pulsing)
- PCB circuit trace lines with animated `pathLength` draw
- Horizontal scan line sweeping top-to-bottom
- Terminal quote strip with macOS traffic lights + blinking cursor
- 5 animated color pips in bottom bar

### Global Elements
- **Custom cursor**: dot follows mouse exactly, ring lags behind with lerp (desktop only)
- **Floating Resume button**: slides in from right edge after 2.5s, vertical text, links to Google Drive resume
- **Space background**: 4 planets with radial gradients, surface bands, atmosphere glow, Saturn-style rings — each floating with slow sine motion. 5 satellites crossing the screen with trailing light tails. 2 nebula cloud blobs.
- **Particle canvas**: 120 particles with connection lines drawn when distance < 100px
- **Scroll progress bar**: thin gradient line at top of viewport

---

## Project Structure

```
SakthivelMadhu.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions: build → deploy to Pages on push to main
├── img/                        # Static images (copied to dist/ at build time)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ImpactNumbers.jsx
│   │   ├── About.jsx
│   │   ├── WorkHistory.jsx
│   │   ├── Projects.jsx
│   │   ├── OpenSource.jsx
│   │   ├── Skills.jsx
│   │   ├── Achievements.jsx
│   │   ├── Testimonials.jsx
│   │   ├── GitHubStats.jsx
│   │   ├── BeyondCode.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── FloatingResume.jsx
│   ├── data/
│   │   └── portfolio.js        # Single source of truth for ALL content
│   ├── hooks/
│   │   └── useScrollProgress.js
│   ├── App.jsx                 # Root: CustomCursor, SpaceBackground, ParticleBackground, section order
│   ├── main.jsx
│   └── index.css               # Tailwind directives, global styles, custom cursor CSS
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Updating Content

All text content lives in **`src/data/portfolio.js`**. To update the portfolio without touching any component:

| What to change | Where in portfolio.js |
|---|---|
| Name, title, bio, photo, resume link | `personalInfo` |
| Work experience | `workHistory` array |
| Projects | `projects` array |
| Skills | `skillCategories` array |
| Achievements / certifications | `achievements` array |
| Testimonials | `testimonials` array |
| GitHub repos displayed | `githubRepos` array |
| Currently learning items | `currentlyLearning` array |
| On-the-way goals | `onTheWay` array |
| Fun facts | `funFacts` array |
| Hobbies | `hobbies` array |
| Philosophy / drive quote | `philosophy` object |
| Education entries | `education` array |

---

## Deployment

Deployment is fully automated via GitHub Actions (`.github/workflows/deploy.yml`).

**Workflow:**
1. Push to `main` branch
2. GitHub Actions triggers automatically
3. Runs `npm ci` → `npm run build`
4. Uploads `dist/` folder as a GitHub Pages artifact
5. Deploys to GitHub Pages

**Environment requirements:**
- Node.js 20 (set in the workflow)
- GitHub Pages must be enabled in repo settings with source set to "GitHub Actions"

No manual deployment steps needed. Every push to `main` goes live automatically.

---

## Run Locally

**Prerequisites:** Node.js 18+ and npm

```bash
# Clone
git clone https://github.com/SakthivelMadhu/SakthivelMadhu.github.io
cd SakthivelMadhu.github.io

# Install
npm install

# Start dev server (localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

The `img/` directory is served by a custom Vite middleware in dev mode and copied to `dist/` at build time via `vite-plugin-static-copy`.

---

## Contact

| | |
|---|---|
| Email | sakthi130597@gmail.com |
| Phone | +91 7538837154 |
| GitHub | [github.com/SakthivelMadhu](https://github.com/SakthivelMadhu) |
| LinkedIn | [linkedin.com/in/sakthivel-madhu-864647238](https://www.linkedin.com/in/sakthivel-madhu-864647238/) |
| LeetCode | [leetcode.com/u/sakthi130597](https://leetcode.com/u/sakthi130597/) |

---

**Sakthivel Madhu** — Backend Engineer · Java 17 · Spring Boot · GCP · Microservices · Bangalore, India
