export function DividerWithText({ children }: { children: string }) {
  return (
    <div role="separator" className="flex items-center gap-4 text-sm text-white">
      <span className="h-px flex-1 bg-divider" />
      {children}
      <span className="h-px flex-1 bg-divider" />
    </div>
  )
}
