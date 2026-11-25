import type { ReactNode } from 'react'

type AuthTemplateProps = {
  bannerSrc: string
  bannerAlt: string
  children: ReactNode
}

function ChainDecoration({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 230 360" fill="none" aria-hidden="true" className={`absolute text-decoration ${className}`}>
      <rect x="22" y="132" width="186" height="226" rx="93" stroke="currentColor" strokeWidth="44" />
      <rect x="22" y="2" width="186" height="226" rx="93" stroke="currentColor" strokeWidth="44" />
    </svg>
  )
}

export function AuthTemplate({ bannerSrc, bannerAlt, children }: AuthTemplateProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-page p-4">
      <ChainDecoration className="-top-6 left-[7%] hidden h-120 lg:block" />
      <ChainDecoration className="-bottom-12 right-[7%] hidden h-120 lg:block" />
      <div className="relative z-10 flex w-full max-w-250 flex-col gap-10 rounded-4xl bg-surface p-8 md:flex-row md:p-14">
        <img src={bannerSrc} alt={bannerAlt} className="hidden w-102 shrink-0 object-cover md:block" />
        <div className="flex w-full max-w-80 flex-1 flex-col justify-center self-center">{children}</div>
      </div>
    </main>
  )
}
