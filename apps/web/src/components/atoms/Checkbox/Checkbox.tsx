import type { InputHTMLAttributes } from 'react'
import { Icon } from '../Icon'

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: string }

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`inline-flex cursor-pointer items-center gap-2 text-sm text-muted ${className}`}>
      <span className="relative inline-flex size-6 shrink-0">
        <input
          type="checkbox"
          className="peer size-6 cursor-pointer appearance-none rounded-sm border border-primary bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          {...props}
        />
        <Icon
          name="check"
          className="pointer-events-none absolute inset-0.5 hidden size-5 text-primary peer-checked:block"
        />
      </span>
      {label}
    </label>
  )
}
