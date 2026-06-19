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
