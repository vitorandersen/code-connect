import type { SVGProps } from 'react'

const paths = {
  'arrow-right': (
    <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />,
  clipboard: (
    <path
      fill="currentColor"
      stroke="none"
      d="M9 2a2 2 0 0 0-2 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2-2H9Zm0 2h6v2H9V4ZM7 10h10v2H7v-2Zm0 4h10v2H7v-2Z"
    />
  ),
} as const

export type IconName = keyof typeof paths

type IconProps = { name: IconName } & Omit<SVGProps<SVGSVGElement>, 'name'>

export function Icon({ name, className = 'size-5', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      className={className}
      {...props}
    >
      {paths[name]}
    </svg>
  )
}
