import { render, screen } from '@testing-library/react'
import { DividerWithText } from './DividerWithText'

describe('DividerWithText', () => {
  it('renders the text inside a separator', () => {
    render(<DividerWithText>ou entre com outras contas</DividerWithText>)
    expect(screen.getByRole('separator')).toHaveTextContent('ou entre com outras contas')
  })
})
