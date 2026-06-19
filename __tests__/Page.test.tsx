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
