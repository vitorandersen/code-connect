import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }

export function Input({ invalid = false, className = '', ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={`h-10 w-full rounded-sm bg-field px-4 text-sm text-white placeholder:text-white/80 focus:outline-2 focus:outline-primary ${invalid ? 'outline-2 outline-red-400' : ''} ${className}`}
      {...props}
    />
  )
}
