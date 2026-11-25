import type { ButtonHTMLAttributes } from 'react'

type SocialButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  icon: string
}

export function SocialButton({ label, icon, className = '', type = 'button', ...props }: SocialButtonProps) {
  return (
    <button
      type={type}
      className={`flex cursor-pointer flex-col items-center gap-1 text-xs text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${className}`}
      {...props}
    >
      <img src={icon} alt="" className="size-8" />
      {label}
    </button>
  )
}
