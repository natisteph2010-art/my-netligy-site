import { useEffect, useState } from 'react'
import { GradeBridgeLogo } from './GradeBridgeLogo'

export function EntranceOverlay() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1900)
    return () => window.clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="entrance-overlay" aria-hidden="true">
      <div className="entrance-grid" />
      <div className="entrance-energy-line" />
      <div className="entrance-mark">
        <GradeBridgeLogo compact className="entrance-logo" />
        <span>Knowledge Network</span>
      </div>
    </div>
  )
}
