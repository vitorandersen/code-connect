import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../../atoms/Button'
import { Checkbox } from '../../atoms/Checkbox'
import { TextLink } from '../../atoms/TextLink'
import { FormField } from '../../molecules/FormField'

export type LoginValues = { identifier: string; password: string; remember: boolean }

type LoginFormProps = { onSubmit: (values: LoginValues) => void }

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values: LoginValues = {
      identifier: String(data.get('identifier') ?? '').trim(),
      password: String(data.get('password') ?? ''),
      remember: data.get('remember') === 'on',
    }
    const next = {
      identifier: values.identifier ? undefined : 'Informe seu email ou usuário',
      password: values.password ? undefined : 'Informe sua senha',
    }
    setErrors(next)
    if (!next.identifier && !next.password) onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        label="Email ou usuário"
        name="identifier"
        placeholder="usuario123"
        autoComplete="username"
        error={errors.identifier}
      />
      <div className="flex flex-col gap-2">
        <FormField
          label="Senha"
          name="password"
          type="password"
          placeholder="******"
          autoComplete="current-password"
          error={errors.password}
        />
        <div className="flex items-center justify-between">
          <Checkbox label="Lembrar-me" name="remember" defaultChecked />
          <TextLink href="#">Esqueci a senha</TextLink>
        </div>
      </div>
      <Button type="submit" iconRight="arrow-right" className="mt-2">
        Login
      </Button>
    </form>
  )
}
