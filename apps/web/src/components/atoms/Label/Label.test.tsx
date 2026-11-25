import { render, screen } from '@testing-library/react'
import { Label } from './Label'

describe('Label', () => {
  it('renders its text and links to the control', () => {
    render(
      <>
        <Label htmlFor="x">Senha</Label>
        <input id="x" />
      </>,
    )
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  })
})
