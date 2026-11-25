import { render, screen } from '@testing-library/react'
import { AuthTemplate } from './AuthTemplate'

describe('AuthTemplate', () => {
  it('renders the banner and its children', () => {
    render(
      <AuthTemplate bannerSrc="/b.png" bannerAlt="Banner">
        <p>conteúdo</p>
      </AuthTemplate>,
    )
    expect(screen.getByRole('img', { name: 'Banner' })).toHaveAttribute('src', '/b.png')
    expect(screen.getByText('conteúdo')).toBeInTheDocument()
  })
})
