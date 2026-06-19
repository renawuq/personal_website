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
