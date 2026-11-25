import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('accepts typing', async () => {
    render(<Input aria-label="Nome" />)
    await userEvent.type(screen.getByRole('textbox', { name: 'Nome' }), 'ana')
    expect(screen.getByRole('textbox')).toHaveValue('ana')
  })

  it('flags invalid state', () => {
    render(<Input aria-label="Nome" invalid />)
    expect(screen.getByRole('textbox')).toBeInvalid()
  })
})
