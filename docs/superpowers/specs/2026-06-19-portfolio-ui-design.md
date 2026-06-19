# Portfolio UI Design Spec
**Date:** 2026-06-19  
**Status:** Approved

---
2 
## Overview

A personal portfolio/resume website for a software/tech professional targeting a mix of recruiters/hiring managers and potential freelance clients. Built with Next.js 14, bold and colorful aesthetic (Electric Indigo palette), single-page scrolling layout.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router, `output: 'export'` for static deployment)
- **Styling:** Tailwind CSS
- **Content:** TypeScript data files (`lib/data.ts`) — no database, no CMS
- **Deployment:** Vercel or GitHub Pages

---

## Color Palette

| Token | Value | Usage |
|---|---|---|
| Background dark | `#1a0533` | Hero, Skills, Experience sections |
| Background light | `#f5f3ff` (light lavender) | About, Projects sections |
| Accent violet | `#7c3aed` | Gradient blooms, card borders, timeline nodes |
| Accent pink | `#ec4899` | CTA buttons, date ranges, hover glows |
| Text primary | `#ffffff` | On dark sections |
| Text secondary | `#e2e8f0` | Subtitles, bullets on dark sections |
| Text dark | `#1e1b4b` | On light sections |

---

## Layout & Navigation

- **Structure:** Single-page scroll — no routing between pages
- **Nav:** Sticky top bar; links: About · Skills · Projects · Experience
  - Transparent over hero, switches to `backdrop-blur` frosted dark tint on scroll
  - Active section highlighted as user scrolls
  - Mobile: hamburger menu collapse
- **Section rhythm:** Alternating dark/light backgrounds (Hero dark → About light → Skills dark → Projects light → Experience dark)

---

## Sections

### 1. Hero
- Full-viewport height
- Deep indigo background with radial violet gradient bloom behind name
- Centered vertical layout:
  - **Name** — large bold display font
  - **Tagline** — *"Building software that drives efficiency, optimization, and innovation."*
  - **CTA buttons:** "View My Work" (filled pink, scrolls to Projects) + "Resume" (outline, downloads PDF)
- Subtle slow-drifting animated gradient orbs in background

### 2. About
- Light lavender background
- Two-column desktop layout (photo/avatar left, text right); single column mobile
- Content:
  - Headshot or avatar
  - 2–3 short paragraphs (who you are, what you care about, what you bring)
  - Row of quick stats (e.g. years of experience, projects shipped, key technologies)

### 3. Skills / Tech Stack
- Dark indigo background
- Grid of skill cards: icon + tech name + category label
- Layout: 4–5 columns desktop, 2–3 columns mobile
- Cards: violet border, pink glow on hover
- Grouped by category with divider headings (Languages · Frameworks · Tools · Cloud)

### 4. Projects
- Light lavender background
- **Featured (top):** 2 large side-by-side cards (stacked on mobile)
  - Screenshot/mockup, title, 2–3 sentence description, tech stack tags, GitHub + Live Demo links
- **More Projects (below):** 3-column compact card grid
  - Title, one-line description, tech tags, links — no screenshots

### 5. Experience / Timeline
- Dark indigo background
- Vertical centered timeline
  - Company name + role (bold white)
  - Date range (pink accent)
  - 2–3 impact bullet points
  - Company logo or violet dot as timeline node
- Mobile: collapses to clean stacked list

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| Mobile (`< 768px`) | Single column, hamburger nav, stacked project cards |
| Tablet (`768px–1024px`) | 2-column about, 3-col skills grid |
| Desktop (`> 1024px`) | Full layout as described above |

---

## Content Input

All editable content lives in `lib/data.ts`:
- Personal info (name, tagline, about text, stats)
- Skills list (name, icon, category)
- Projects list (title, description, tech tags, links, screenshot path, featured flag)
- Experience list (company, role, dates, bullets, logo path)

Resume PDF placed at `public/resume.pdf`.

---

## Out of Scope

- Contact form (not requested)
- Blog / writing section (not requested)
- CMS or backend
- Authentication
