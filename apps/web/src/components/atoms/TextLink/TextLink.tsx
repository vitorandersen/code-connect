import type { AnchorHTMLAttributes } from 'react'

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: 'muted' | 'primary' }

const variants = {
  muted: 'text-sm text-white underline',
  primary: 'text-lg text-primary hover:underline',
}

export function TextLink({ variant = 'muted', className = '', ...props }: TextLinkProps) {
  return <a className={`inline-flex items-center gap-2 ${variants[variant]} ${className}`} {...props} />
}
