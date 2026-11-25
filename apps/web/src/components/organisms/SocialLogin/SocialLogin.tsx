import { DividerWithText } from '../../molecules/DividerWithText'
import { SocialButton } from '../../molecules/SocialButton'

export type SocialProvider = 'github' | 'google'

type SocialLoginProps = { onSelect?: (provider: SocialProvider) => void }

export function SocialLogin({ onSelect }: SocialLoginProps) {
  return (
    <div className="flex flex-col gap-4">
      <DividerWithText>ou entre com outras contas</DividerWithText>
      <div className="flex justify-center gap-6">
        <SocialButton label="Github" icon="/github.png" onClick={() => onSelect?.('github')} />
        <SocialButton label="Gmail" icon="/gmail.png" onClick={() => onSelect?.('google')} />
      </div>
    </div>
  )
}
