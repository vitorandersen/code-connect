import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SocialLogin } from './SocialLogin'

describe('SocialLogin', () => {
  it('reports the selected provider', async () => {
    const onSelect = vi.fn()
    render(<SocialLogin onSelect={onSelect} />)
    await userEvent.click(screen.getByRole('button', { name: 'Github' }))
    await userEvent.click(screen.getByRole('button', { name: 'Gmail' }))
    expect(onSelect).toHaveBeenNthCalledWith(1, 'github')
    expect(onSelect).toHaveBeenNthCalledWith(2, 'google')
  })
})
