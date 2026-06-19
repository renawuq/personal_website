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
