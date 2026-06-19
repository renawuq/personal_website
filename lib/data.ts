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
