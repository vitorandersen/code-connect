import { render, screen } from '@testing-library/react'
import { FormField } from './FormField'

describe('FormField', () => {
  it('associates the label with the input', () => {
    render(<FormField label="Senha" type="password" />)
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  })

  it('shows the error message and marks the input invalid', () => {
    render(<FormField label="Senha" error="Campo obrigatório" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Campo obrigatório')
    expect(screen.getByLabelText('Senha')).toBeInvalid()
  })
})
