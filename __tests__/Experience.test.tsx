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
