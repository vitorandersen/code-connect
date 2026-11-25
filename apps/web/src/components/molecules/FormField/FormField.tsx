import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Input } from '../../atoms/Input'
import { Label } from '../../atoms/Label'

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }

export function FormField({ label, error, id, className = '', ...props }: FormFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input id={inputId} invalid={!!error} aria-describedby={error ? errorId : undefined} {...props} />
      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
