import { Icon } from '../../atoms/Icon'
import { TextLink } from '../../atoms/TextLink'
import { LoginForm } from '../../organisms/LoginForm'
import type { LoginValues } from '../../organisms/LoginForm'
import { SocialLogin } from '../../organisms/SocialLogin'
import type { SocialProvider } from '../../organisms/SocialLogin'
import { AuthTemplate } from '../../templates/AuthTemplate'

export function LoginPage() {
  // The API has no auth endpoints yet; wire these handlers to it when available.
  function handleLogin(_values: LoginValues) {}
  function handleSocialLogin(_provider: SocialProvider) {}

  return (
    <AuthTemplate bannerSrc="/banner-login.png" bannerAlt="Pessoa programando em frente a telas com código">
      <h1 className="text-3xl font-semibold">Login</h1>
      <p className="mt-8 mb-10 text-xl">Boas-vindas! Faça seu login.</p>
      <LoginForm onSubmit={handleLogin} />
      <div className="mt-6">
        <SocialLogin onSelect={handleSocialLogin} />
      </div>
      <div className="mt-8 flex flex-col items-center gap-3 text-sm">
        <p>Ainda não tem conta?</p>
        <TextLink href="#" variant="primary">
          Crie seu cadastro! <Icon name="clipboard" />
        </TextLink>
      </div>
    </AuthTemplate>
  )
}
