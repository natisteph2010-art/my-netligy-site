type GradeBridgeLogoProps = {
  compact?: boolean
  className?: string
}

export function GradeBridgeLogo({ compact = false, className = '' }: GradeBridgeLogoProps) {
  return (
    <img
      src="/gradebridge-logo.svg"
      alt="GradeBridge"
      className={`${compact ? 'h-10 w-10' : 'h-16 w-52'} object-contain ${className}`}
    />
  )
}
