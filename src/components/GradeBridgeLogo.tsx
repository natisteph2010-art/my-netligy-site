type GradeBridgeLogoProps = {
  compact?: boolean
  className?: string
}

export function GradeBridgeLogo({ compact = false, className = '' }: GradeBridgeLogoProps) {
  return (
    <img
      src="/gradebridge-logo.svg"
      alt="GradeBridge"
      data-sb-object-id="content/site.json"
      data-sb-field-path="logo.src"
      data-sb-alt-field-path="logo.alt"
      className={`${compact ? 'h-10 w-10' : 'h-16 w-52'} object-contain ${className}`}
    />
  )
}
