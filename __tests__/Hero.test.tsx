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
