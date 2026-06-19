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
