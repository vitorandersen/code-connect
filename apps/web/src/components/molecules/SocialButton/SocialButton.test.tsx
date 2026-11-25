import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SocialButton } from './SocialButton'

describe('SocialButton', () => {
  it('renders the label and calls onClick', async () => {
    const onClick = vi.fn()
    render(<SocialButton label="Github" icon="/github.png" onClick={onClick} />)
    await userEvent.click(screen.getByRole('button', { name: 'Github' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
