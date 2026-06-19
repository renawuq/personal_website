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
