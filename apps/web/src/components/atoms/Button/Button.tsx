import type { ButtonHTMLAttributes } from 'react'
import { Icon } from '../Icon'
import type { IconName } from '../Icon'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { iconRight?: IconName }

export function Button({ iconRight, children, className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary px-6 text-lg font-semibold text-on-primary transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
      {iconRight && <Icon name={iconRight} className="size-4" />}
    </button>
  )
}
