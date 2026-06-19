# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Next.js 14 personal portfolio site with an Electric Indigo color palette, single-page scroll layout, and five sections: Hero, About, Skills, Projects, and Experience.

**Architecture:** Single-page Next.js 14 app using the App Router with `output: 'export'` for static generation. All content lives in `lib/data.ts`. Navigation uses Intersection Observer for scroll-based active-link highlighting. Alternating dark/light section backgrounds create visual rhythm.

**Tech Stack:** Next.js 14, TypeScript (strict), Tailwind CSS v3, Jest, React Testing Library

## Global Constraints

- Next.js version: 14, App Router, `output: 'export'`, `images: { unoptimized: true }`
- TypeScript strict mode enabled; import alias `@/*` maps to project root
- Tailwind CSS v3 with custom tokens: `indigo-deep` (`#1a0533`), `lavender-light` (`#f5f3ff`)
- Standard Tailwind violet-600 (`#7c3aed`) and pink-500 (`#ec4899`) for accents
- No contact form, no blog, no CMS, no backend
- Section IDs (exact): `about`, `skills`, `projects`, `experience`
- Resume PDF at: `public/resume.pdf`
- Personal name in data: `Rena Wu`

## File Map

```
website/
├── app/
│   ├── layout.tsx          # Root layout: metadata, Inter font, Nav wrapper
│   ├── page.tsx            # Assembles Hero → About → Skills → Projects → Experience
│   └── globals.css         # Tailwind directives + orb keyframes + scroll-behavior
├── components/
│   ├── Nav.tsx             # 'use client' — sticky nav, scroll spy, hamburger
│   ├── Hero.tsx            # Server component — full-viewport, orbs, CTAs
│   ├── About.tsx           # Server component — two-column, bio, stats
│   ├── Skills.tsx          # Server component — category-grouped card grid
│   ├── Projects.tsx        # Server component — featured + compact grid
│   ├── Experience.tsx      # Server component — vertical timeline
│   └── ui/
│       ├── SkillCard.tsx   # Skill name card with violet/pink hover glow
│       ├── ProjectCard.tsx # Featured and compact variants
│       └── TimelineItem.tsx# Single experience entry with node + line
├── lib/
│   └── data.ts             # All types + exported content constants
├── __tests__/
│   ├── data.test.ts
│   ├── Nav.test.tsx
│   ├── Hero.test.tsx
│   ├── About.test.tsx
│   ├── Skills.test.tsx
│   ├── Projects.test.tsx
│   ├── Experience.test.tsx
│   └── Page.test.tsx
├── public/
│   └── resume.pdf          # Placeholder; replace with real PDF before deploy
├── jest.config.ts
├── jest.setup.ts
├── next.config.ts
└── tailwind.config.ts
```

---

### Task 1: Project Scaffold & Configuration

**Files:**
- Create: `next.config.ts` (replace scaffolded version)
- Create: `tailwind.config.ts` (replace scaffolded version)
- Create: `app/globals.css` (replace scaffolded version)
- Create: `jest.config.ts`
- Create: `jest.setup.ts`

**Interfaces:**
- Produces: Tailwind tokens `bg-indigo-deep`, `bg-lavender-light`, `text-indigo-deep` available in all components; `.orb` CSS class with `--drift-duration` and `--drift-delay` custom properties

- [ ] **Step 1: Scaffold Next.js project**

Run from `C:\work\website`:
```bash
npx create-next-app@14 . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --no-eslint --yes
```
Expected: `app/`, `components/` (empty), `public/`, `tailwind.config.ts`, `next.config.ts`, `package.json` created.

- [ ] **Step 2: Install testing dependencies**

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest
```
Expected: devDependencies updated in `package.json`.

- [ ] **Step 3: Configure static export — replace next.config.ts**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}

export default nextConfig
```

- [ ] **Step 4: Add custom color tokens — replace tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'indigo-deep': '#1a0533',
        'lavender-light': '#f5f3ff',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 5: Add orb animation — replace app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@keyframes drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(30px, -20px) scale(1.05); }
  66%       { transform: translate(-20px, 15px) scale(0.95); }
}

.orb {
  animation: drift var(--drift-duration, 8s) ease-in-out infinite;
  animation-delay: var(--drift-delay, 0s);
}

@layer base {
  html { scroll-behavior: smooth; }
}
```

- [ ] **Step 6: Configure Jest — create jest.config.ts**

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

Create `jest.setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

Add to `package.json` `"scripts"` section:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 7: Verify build works**

```bash
npm run build
```
Expected: `out/` directory created with no TypeScript errors.

- [ ] **Step 8: Commit**

```bash
git init && git add . && git commit -m "feat: scaffold Next.js 14 project with Tailwind, Jest, and static export config"
```

---

### Task 2: Content Data Layer

**Files:**
- Create: `lib/data.ts`
- Create: `__tests__/data.test.ts`

**Interfaces:**
- Produces:
  - `type SkillCategory = 'Languages' | 'Frameworks' | 'Tools' | 'Cloud'`
  - `type Skill = { name: string; icon: string; category: SkillCategory }`
  - `type Project = { id: string; title: string; description: string; tech: string[]; github: string; demo: string; image: string; featured: boolean }`
  - `type Experience = { company: string; role: string; start: string; end: string; bullets: string[]; logo?: string }`
  - `type Stat = { label: string; value: string }`
  - `type PersonalInfo = { name: string; tagline: string; about: string[]; stats: Stat[] }`
  - `export const personalInfo: PersonalInfo`
  - `export const skills: Skill[]`
  - `export const projects: Project[]`
  - `export const experience: Experience[]`

- [ ] **Step 1: Write failing tests**

Create `__tests__/data.test.ts`:
```typescript
import { personalInfo, skills, projects, experience } from '@/lib/data'

describe('personalInfo', () => {
  it('has required fields', () => {
    expect(personalInfo.name).toBeTruthy()
    expect(personalInfo.tagline).toBeTruthy()
    expect(personalInfo.about.length).toBeGreaterThan(0)
    expect(personalInfo.stats.length).toBeGreaterThan(0)
  })
})

describe('skills', () => {
  it('has at least one skill per category', () => {
    const categories = skills.map(s => s.category)
    expect(categories).toContain('Languages')
    expect(categories).toContain('Frameworks')
    expect(categories).toContain('Tools')
    expect(categories).toContain('Cloud')
  })

  it('every skill has name, icon, and category', () => {
    skills.forEach(skill => {
      expect(skill.name).toBeTruthy()
      expect(skill.icon).toBeTruthy()
      expect(skill.category).toBeTruthy()
    })
  })
})

describe('projects', () => {
  it('has exactly 2 featured projects', () => {
    expect(projects.filter(p => p.featured).length).toBe(2)
  })

  it('has at least 3 non-featured projects', () => {
    expect(projects.filter(p => !p.featured).length).toBeGreaterThanOrEqual(3)
  })

  it('every project has required fields', () => {
    projects.forEach(p => {
      expect(p.id).toBeTruthy()
      expect(p.title).toBeTruthy()
      expect(p.description).toBeTruthy()
      expect(p.tech.length).toBeGreaterThan(0)
    })
  })
})

describe('experience', () => {
  it('has at least one entry', () => {
    expect(experience.length).toBeGreaterThan(0)
  })

  it('every entry has required fields', () => {
    experience.forEach(e => {
      expect(e.company).toBeTruthy()
      expect(e.role).toBeTruthy()
      expect(e.start).toBeTruthy()
      expect(e.bullets.length).toBeGreaterThan(0)
    })
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npm test -- __tests__/data.test.ts
```
Expected: FAIL — `Cannot find module '@/lib/data'`

- [ ] **Step 3: Create lib/data.ts**

```typescript
export type SkillCategory = 'Languages' | 'Frameworks' | 'Tools' | 'Cloud'

export type Skill = {
  name: string
  icon: string
  category: SkillCategory
}

export type Project = {
  id: string
  title: string
  description: string
  tech: string[]
  github: string
  demo: string
  image: string
  featured: boolean
}

export type Experience = {
  company: string
  role: string
  start: string
  end: string
  bullets: string[]
  logo?: string
}

export type Stat = { label: string; value: string }

export type PersonalInfo = {
  name: string
  tagline: string
  about: string[]
  stats: Stat[]
}

export const personalInfo: PersonalInfo = {
  name: 'Rena Wu',
  tagline: 'Building software that drives efficiency, optimization, and innovation.',
  about: [
    "I'm a software engineer passionate about building tools that make complex problems simple. I thrive at the intersection of performance engineering and user experience.",
    "I've shipped production systems in distributed computing, data pipelines, and full-stack web applications. I care deeply about code quality, clear abstractions, and systems that scale.",
    "When I'm not coding, you'll find me exploring new frameworks, contributing to open source, or thinking about how software can improve everyday life.",
  ],
  stats: [
    { label: 'Years Experience', value: '3+' },
    { label: 'Projects Shipped', value: '20+' },
    { label: 'Technologies', value: '15+' },
  ],
}

export const skills: Skill[] = [
  { name: 'Python',     icon: 'SiPython',     category: 'Languages' },
  { name: 'TypeScript', icon: 'SiTypescript', category: 'Languages' },
  { name: 'Go',         icon: 'SiGo',         category: 'Languages' },
  { name: 'Java',       icon: 'SiOpenjdk',    category: 'Languages' },
  { name: 'React',      icon: 'SiReact',      category: 'Frameworks' },
  { name: 'Next.js',    icon: 'SiNextdotjs',  category: 'Frameworks' },
  { name: 'FastAPI',    icon: 'SiFastapi',    category: 'Frameworks' },
  { name: 'Node.js',    icon: 'SiNodedotjs',  category: 'Frameworks' },
  { name: 'PostgreSQL', icon: 'SiPostgresql', category: 'Tools' },
  { name: 'Docker',     icon: 'SiDocker',     category: 'Tools' },
  { name: 'Git',        icon: 'SiGit',        category: 'Tools' },
  { name: 'AWS',        icon: 'SiAmazonaws',  category: 'Cloud' },
  { name: 'Vercel',     icon: 'SiVercel',     category: 'Cloud' },
  { name: 'GCP',        icon: 'SiGooglecloud',category: 'Cloud' },
]

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Distributed Task Scheduler',
    description:
      'A fault-tolerant distributed task scheduler built with Go and Redis, supporting 10k+ concurrent jobs with sub-second latency. Features dynamic worker scaling, retry logic, and a real-time dashboard.',
    tech: ['Go', 'Redis', 'React', 'PostgreSQL', 'Docker'],
    github: 'https://github.com',
    demo: 'https://example.com',
    image: '/images/project-1.png',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'AI-Powered Code Review Tool',
    description:
      'A GitHub app that automatically reviews PRs using Claude AI, detecting bugs, security vulnerabilities, and style issues. Reduced review turnaround time by 60% across a team of 12 engineers.',
    tech: ['Python', 'FastAPI', 'TypeScript', 'PostgreSQL', 'AWS'],
    github: 'https://github.com',
    demo: 'https://example.com',
    image: '/images/project-2.png',
    featured: true,
  },
  {
    id: 'project-3',
    title: 'Real-Time Analytics Pipeline',
    description: 'Event streaming pipeline processing 500k events/day using Kafka and Spark.',
    tech: ['Python', 'Kafka', 'Spark', 'GCP'],
    github: 'https://github.com',
    demo: '',
    image: '',
    featured: false,
  },
  {
    id: 'project-4',
    title: 'Personal Finance Dashboard',
    description: 'Full-stack budgeting app with bank sync, smart categorization, and trend visualization.',
    tech: ['Next.js', 'PostgreSQL', 'TypeScript'],
    github: 'https://github.com',
    demo: 'https://example.com',
    image: '',
    featured: false,
  },
  {
    id: 'project-5',
    title: 'CLI Dev Environment Manager',
    description: 'Cross-platform CLI tool for managing dev environment configs, secrets, and dotfiles.',
    tech: ['Go', 'Cobra', 'Docker'],
    github: 'https://github.com',
    demo: '',
    image: '',
    featured: false,
  },
]

export const experience: Experience[] = [
  {
    company: 'Company Name',
    role: 'Software Engineer',
    start: 'Jun 2024',
    end: 'Present',
    bullets: [
      'Built and maintained distributed microservices handling 1M+ daily requests with 99.9% uptime.',
      'Led migration of legacy Python monolith to Go microservices, reducing p99 latency by 40%.',
      'Mentored 2 junior engineers and drove team adoption of automated code review tooling.',
    ],
  },
  {
    company: 'Previous Company',
    role: 'Software Engineer Intern',
    start: 'May 2023',
    end: 'Aug 2023',
    bullets: [
      'Shipped a real-time notification system serving 50k users, integrated with Slack and email.',
      'Wrote 80+ unit and integration tests, increasing test coverage from 45% to 78%.',
    ],
  },
]
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- __tests__/data.test.ts
```
Expected: PASS — all 7 test cases green.

- [ ] **Step 5: Commit**

```bash
git add lib/data.ts __tests__/data.test.ts
git commit -m "feat: add content data layer with TypeScript types and sample data"
```

---

### Task 3: Navigation Component

**Files:**
- Create: `components/Nav.tsx`
- Create: `__tests__/Nav.test.tsx`

**Interfaces:**
- Consumes: section IDs `about`, `skills`, `projects`, `experience` (hardcoded)
- Produces: `export default function Nav()` — `'use client'` component

- [ ] **Step 1: Write failing test**

Create `__tests__/Nav.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import Nav from '@/components/Nav'

describe('Nav', () => {
  it('renders all nav links', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /skills/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /experience/i })).toBeInTheDocument()
  })

  it('renders site name', () => {
    render(<Nav />)
    expect(screen.getByText(/rena wu/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npm test -- __tests__/Nav.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/Nav'`

- [ ] **Step 3: Create components/Nav.tsx**

```typescript
'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
]

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [active, setActive]       = useState('')
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['about', 'skills', 'projects', 'experience']
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-indigo-deep/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-white font-bold text-lg tracking-tight">Rena Wu</span>

        <ul className="hidden md:flex gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  active === href.slice(1)
                    ? 'text-pink-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </div>

      {menuOpen && (
        <ul className="md:hidden bg-indigo-deep/95 px-6 pb-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-slate-300 hover:text-white font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- __tests__/Nav.test.tsx
```
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Nav.tsx __tests__/Nav.test.tsx
git commit -m "feat: add sticky nav with scroll spy and mobile hamburger"
```

---

### Task 4: Hero Section

**Files:**
- Create: `components/Hero.tsx`
- Create: `__tests__/Hero.test.tsx`

**Interfaces:**
- Consumes: `personalInfo.name: string`, `personalInfo.tagline: string` from `@/lib/data`
- Produces: `export default function Hero()` — server component

- [ ] **Step 1: Write failing test**

Create `__tests__/Hero.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

describe('Hero', () => {
  it('renders the name', () => {
    render(<Hero />)
    expect(screen.getByText('Rena Wu')).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<Hero />)
    expect(screen.getByText(/efficiency, optimization, and innovation/i)).toBeInTheDocument()
  })

  it('renders View My Work link pointing to projects section', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /view my work/i })
    expect(link).toHaveAttribute('href', '#projects')
  })

  it('renders Resume download link', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /resume/i })
    expect(link).toHaveAttribute('href', '/resume.pdf')
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npm test -- __tests__/Hero.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/Hero'`

- [ ] **Step 3: Create components/Hero.tsx**

```typescript
import { personalInfo } from '@/lib/data'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-indigo-deep overflow-hidden">
      {/* Animated gradient orbs */}
      <div
        className="orb absolute w-96 h-96 rounded-full opacity-30 blur-3xl bg-violet-600 -top-20 -left-20"
        style={{ '--drift-duration': '10s', '--drift-delay': '0s' } as React.CSSProperties}
      />
      <div
        className="orb absolute w-72 h-72 rounded-full opacity-20 blur-3xl bg-pink-500 bottom-20 right-10"
        style={{ '--drift-duration': '13s', '--drift-delay': '-4s' } as React.CSSProperties}
      />
      <div
        className="orb absolute w-64 h-64 rounded-full opacity-15 blur-3xl bg-violet-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ '--drift-duration': '9s', '--drift-delay': '-7s' } as React.CSSProperties}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tight mb-6 leading-none">
          {personalInfo.name}
        </h1>
        <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          {personalInfo.tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-pink-500 hover:bg-pink-400 text-white font-semibold text-sm tracking-wide transition-colors duration-200"
          >
            View My Work
          </a>
          <a
            href="/resume.pdf"
            download
            className="px-8 py-3 rounded-full border border-violet-400 text-violet-300 hover:bg-violet-900/40 font-semibold text-sm tracking-wide transition-colors duration-200"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- __tests__/Hero.test.tsx
```
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx __tests__/Hero.test.tsx
git commit -m "feat: add hero section with animated orbs and CTA buttons"
```

---

### Task 5: About Section

**Files:**
- Create: `components/About.tsx`
- Create: `__tests__/About.test.tsx`

**Interfaces:**
- Consumes: `personalInfo.about: string[]`, `personalInfo.stats: Stat[]`, `personalInfo.name: string` from `@/lib/data`
- Produces: `export default function About()` — server component, `<section id="about">`

- [ ] **Step 1: Write failing test**

Create `__tests__/About.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import About from '@/components/About'
import { personalInfo } from '@/lib/data'

describe('About', () => {
  it('renders section with id="about"', () => {
    const { container } = render(<About />)
    expect(container.querySelector('#about')).toBeInTheDocument()
  })

  it('renders all about paragraphs', () => {
    render(<About />)
    personalInfo.about.forEach(para => {
      expect(screen.getByText(para)).toBeInTheDocument()
    })
  })

  it('renders all stats with value and label', () => {
    render(<About />)
    personalInfo.stats.forEach(stat => {
      expect(screen.getByText(stat.value)).toBeInTheDocument()
      expect(screen.getByText(stat.label)).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npm test -- __tests__/About.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/About'`

- [ ] **Step 3: Create components/About.tsx**

```typescript
import { personalInfo } from '@/lib/data'

export default function About() {
  const initials = personalInfo.name.split(' ').map(n => n[0]).join('')

  return (
    <section id="about" className="py-24 bg-lavender-light">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-indigo-900 mb-16 text-center">About Me</h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Avatar — replace gradient with <img src="/headshot.jpg"> when ready */}
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-2xl ring-4 ring-violet-300 shadow-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
              <span className="text-white text-6xl font-bold select-none">{initials}</span>
            </div>
          </div>

          <div>
            <div className="space-y-4 mb-10">
              {personalInfo.about.map((para, i) => (
                <p key={i} className="text-slate-700 leading-relaxed">{para}</p>
              ))}
            </div>

            <div className="flex gap-8">
              {personalInfo.stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-extrabold text-violet-700">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- __tests__/About.test.tsx
```
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/About.tsx __tests__/About.test.tsx
git commit -m "feat: add about section with bio, initials avatar, and stats"
```

---

### Task 6: Skills Section

**Files:**
- Create: `components/ui/SkillCard.tsx`
- Create: `components/Skills.tsx`
- Create: `__tests__/Skills.test.tsx`

**Interfaces:**
- Consumes: `skills: Skill[]`, `type SkillCategory` from `@/lib/data`
- Produces: `export default function Skills()` — server component, `<section id="skills">`

- [ ] **Step 1: Write failing test**

Create `__tests__/Skills.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import Skills from '@/components/Skills'
import { skills } from '@/lib/data'

describe('Skills', () => {
  it('renders section with id="skills"', () => {
    const { container } = render(<Skills />)
    expect(container.querySelector('#skills')).toBeInTheDocument()
  })

  it('renders all skill names', () => {
    render(<Skills />)
    skills.forEach(skill => {
      expect(screen.getByText(skill.name)).toBeInTheDocument()
    })
  })

  it('renders all four category headings', () => {
    render(<Skills />)
    expect(screen.getByText('Languages')).toBeInTheDocument()
    expect(screen.getByText('Frameworks')).toBeInTheDocument()
    expect(screen.getByText('Tools')).toBeInTheDocument()
    expect(screen.getByText('Cloud')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npm test -- __tests__/Skills.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/Skills'`

- [ ] **Step 3: Create components/ui/SkillCard.tsx**

```typescript
import type { Skill } from '@/lib/data'

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center justify-center p-4 rounded-xl border border-violet-700 hover:border-pink-500 hover:shadow-[0_0_12px_rgba(236,72,153,0.35)] transition-all duration-200 cursor-default">
      <span className="text-slate-300 text-sm font-medium">{skill.name}</span>
    </div>
  )
}
```

- [ ] **Step 4: Create components/Skills.tsx**

```typescript
import { skills, type SkillCategory } from '@/lib/data'
import SkillCard from '@/components/ui/SkillCard'

const CATEGORIES: SkillCategory[] = ['Languages', 'Frameworks', 'Tools', 'Cloud']

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-indigo-deep">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-16 text-center">Tech Stack</h2>

        <div className="space-y-12">
          {CATEGORIES.map(category => {
            const categorySkills = skills.filter(s => s.category === category)
            if (categorySkills.length === 0) return null
            return (
              <div key={category}>
                <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4">
                  {category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {categorySkills.map(skill => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- __tests__/Skills.test.tsx
```
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/ui/SkillCard.tsx components/Skills.tsx __tests__/Skills.test.tsx
git commit -m "feat: add skills section with category-grouped cards and hover glow"
```

---

### Task 7: Projects Section

**Files:**
- Create: `components/ui/ProjectCard.tsx`
- Create: `components/Projects.tsx`
- Create: `__tests__/Projects.test.tsx`

**Interfaces:**
- Consumes: `projects: Project[]` from `@/lib/data`
- Produces: `export default function Projects()` — server component, `<section id="projects">`

- [ ] **Step 1: Write failing test**

Create `__tests__/Projects.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import Projects from '@/components/Projects'
import { projects } from '@/lib/data'

describe('Projects', () => {
  it('renders section with id="projects"', () => {
    const { container } = render(<Projects />)
    expect(container.querySelector('#projects')).toBeInTheDocument()
  })

  it('renders all project titles', () => {
    render(<Projects />)
    projects.forEach(p => {
      expect(screen.getByText(p.title)).toBeInTheDocument()
    })
  })

  it('renders full description for featured projects', () => {
    render(<Projects />)
    projects.filter(p => p.featured).forEach(p => {
      expect(screen.getByText(p.description)).toBeInTheDocument()
    })
  })

  it('renders GitHub links for all projects with github set', () => {
    render(<Projects />)
    const githubLinks = screen.getAllByRole('link', { name: /github/i })
    expect(githubLinks.length).toBe(projects.filter(p => p.github).length)
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npm test -- __tests__/Projects.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/Projects'`

- [ ] **Step 3: Create components/ui/ProjectCard.tsx**

```typescript
import type { Project } from '@/lib/data'

type Props = { project: Project; variant: 'featured' | 'compact' }

export default function ProjectCard({ project, variant }: Props) {
  if (variant === 'featured') {
    return (
      <div className="bg-indigo-deep/60 border border-violet-700 rounded-2xl overflow-hidden hover:border-pink-500 transition-colors duration-200">
        <div className="h-44 bg-gradient-to-br from-violet-900 to-pink-900 flex items-center justify-center">
          <span className="text-slate-400 text-xs uppercase tracking-widest">Preview</span>
        </div>
        <div className="p-6">
          <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map(t => (
              <span key={t} className="px-2 py-1 rounded-full bg-violet-900/60 text-violet-300 text-xs font-medium">
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="text-sm text-slate-300 hover:text-white underline underline-offset-2">
                GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="text-sm text-pink-400 hover:text-pink-300 underline underline-offset-2">
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-violet-200 rounded-xl p-5 hover:border-violet-400 hover:shadow-md transition-all duration-200">
      <h3 className="text-indigo-900 font-bold mb-1">{project.title}</h3>
      <p className="text-slate-500 text-sm mb-3 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tech.map(t => (
          <span key={t} className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-xs font-medium">
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-indigo-700 underline underline-offset-2">
            GitHub
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
            className="text-xs text-pink-500 hover:text-pink-700 underline underline-offset-2">
            Live Demo
          </a>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create components/Projects.tsx**

```typescript
import { projects } from '@/lib/data'
import ProjectCard from '@/components/ui/ProjectCard'

export default function Projects() {
  const featured = projects.filter(p => p.featured)
  const rest     = projects.filter(p => !p.featured)

  return (
    <section id="projects" className="py-24 bg-lavender-light">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-indigo-900 mb-16 text-center">Projects</h2>

        {/* Featured spotlight */}
        <div className="bg-indigo-deep rounded-2xl p-6 mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map(p => (
              <ProjectCard key={p.id} project={p} variant="featured" />
            ))}
          </div>
        </div>

        {/* More projects */}
        <h3 className="text-lg font-semibold text-indigo-800 mb-6">More Projects</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map(p => (
            <ProjectCard key={p.id} project={p} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- __tests__/Projects.test.tsx
```
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/ui/ProjectCard.tsx components/Projects.tsx __tests__/Projects.test.tsx
git commit -m "feat: add projects section with featured spotlight and compact card grid"
```

---

### Task 8: Experience Section

**Files:**
- Create: `components/ui/TimelineItem.tsx`
- Create: `components/Experience.tsx`
- Create: `__tests__/Experience.test.tsx`

**Interfaces:**
- Consumes: `experience: Experience[]` from `@/lib/data`; `type Experience` from `@/lib/data`
- Produces: `export default function Experience()` — server component, `<section id="experience">`

- [ ] **Step 1: Write failing test**

Create `__tests__/Experience.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import Experience from '@/components/Experience'
import { experience } from '@/lib/data'

describe('Experience', () => {
  it('renders section with id="experience"', () => {
    const { container } = render(<Experience />)
    expect(container.querySelector('#experience')).toBeInTheDocument()
  })

  it('renders all company names', () => {
    render(<Experience />)
    experience.forEach(e => {
      expect(screen.getByText(e.company)).toBeInTheDocument()
    })
  })

  it('renders all role titles', () => {
    render(<Experience />)
    experience.forEach(e => {
      expect(screen.getByText(e.role)).toBeInTheDocument()
    })
  })

  it('renders all bullet points', () => {
    render(<Experience />)
    experience.forEach(e => {
      e.bullets.forEach(b => {
        expect(screen.getByText(b)).toBeInTheDocument()
      })
    })
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npm test -- __tests__/Experience.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/Experience'`

- [ ] **Step 3: Create components/ui/TimelineItem.tsx**

```typescript
import type { Experience } from '@/lib/data'

type Props = { entry: Experience; isLast: boolean }

export default function TimelineItem({ entry, isLast }: Props) {
  return (
    <div className="relative pl-8">
      {!isLast && (
        <div className="absolute left-[7px] top-4 bottom-0 w-0.5 bg-violet-800" />
      )}
      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-violet-600 ring-2 ring-pink-500 ring-offset-2 ring-offset-indigo-deep" />

      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
          <div>
            <h3 className="text-white font-bold text-lg">{entry.company}</h3>
            <p className="text-violet-300 font-medium">{entry.role}</p>
          </div>
          <span className="text-pink-400 text-sm font-medium whitespace-nowrap">
            {entry.start} — {entry.end}
          </span>
        </div>
        <ul className="space-y-2">
          {entry.bullets.map((bullet, i) => (
            <li key={i} className="text-slate-400 text-sm leading-relaxed flex gap-2">
              <span className="text-violet-500 mt-1 flex-shrink-0">›</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create components/Experience.tsx**

```typescript
import { experience } from '@/lib/data'
import TimelineItem from '@/components/ui/TimelineItem'

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-indigo-deep">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-16 text-center">Experience</h2>

        <div>
          {experience.map((entry, i) => (
            <TimelineItem
              key={`${entry.company}-${entry.start}`}
              entry={entry}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- __tests__/Experience.test.tsx
```
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/ui/TimelineItem.tsx components/Experience.tsx __tests__/Experience.test.tsx
git commit -m "feat: add experience section with vertical timeline"
```

---

### Task 9: Page Assembly & Root Layout

**Files:**
- Modify: `app/page.tsx` (replace scaffolded content)
- Modify: `app/layout.tsx` (replace scaffolded content)
- Create: `__tests__/Page.test.tsx`

**Interfaces:**
- Consumes: `Nav`, `Hero`, `About`, `Skills`, `Projects`, `Experience` components (all from prior tasks)
- Produces: Fully assembled single-page portfolio at `/`

- [ ] **Step 1: Write failing test**

Create `__tests__/Page.test.tsx`:
```typescript
import { render } from '@testing-library/react'
import Page from '@/app/page'

describe('Page', () => {
  it('renders all five section ids', () => {
    const { container } = render(<Page />)
    expect(container.querySelector('#about')).toBeInTheDocument()
    expect(container.querySelector('#skills')).toBeInTheDocument()
    expect(container.querySelector('#projects')).toBeInTheDocument()
    expect(container.querySelector('#experience')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npm test -- __tests__/Page.test.tsx
```
Expected: FAIL — page.tsx has Next.js boilerplate, not our sections

- [ ] **Step 3: Replace app/page.tsx**

```typescript
import Hero       from '@/components/Hero'
import About      from '@/components/About'
import Skills     from '@/components/Skills'
import Projects   from '@/components/Projects'
import Experience from '@/components/Experience'

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
    </main>
  )
}
```

- [ ] **Step 4: Replace app/layout.tsx**

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rena Wu — Software Engineer',
  description: 'Building software that drives efficiency, optimization, and innovation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-indigo-deep`}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 5: Run full test suite**

```bash
npm test
```
Expected: All tests across all test files PASS

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/layout.tsx __tests__/Page.test.tsx
git commit -m "feat: assemble full single-page portfolio layout with root layout"
```

---

### Task 10: Build Verification

**Files:**
- Create: `public/resume.pdf` (empty placeholder)

- [ ] **Step 1: Add placeholder resume PDF**

```bash
echo. > public/resume.pdf
```
(Replace with your actual PDF before deploying.)

- [ ] **Step 2: Run production build**

```bash
npm run build
```
Expected: `out/` directory created with no TypeScript errors and no build warnings.

- [ ] **Step 3: Serve and manually verify**

```bash
npx serve out
```
Open `http://localhost:3000` in a browser and check:
- Hero visible with name, tagline, and two CTA buttons
- Scrolling past hero turns nav background frosted dark
- Each section highlights its nav link as you scroll into it
- All five sections render: Hero, About, Skills, Projects, Experience
- Two featured project cards display in dark indigo panel
- Three compact project cards below in lighter grid
- Timeline shows two experience entries with violet nodes and pink date ranges
- Hamburger menu appears and works at < 768px viewport width

- [ ] **Step 4: Final commit**

```bash
git add public/resume.pdf
git commit -m "chore: add placeholder resume PDF, verify static build and layout"
```
