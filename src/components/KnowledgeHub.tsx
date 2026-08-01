import { useEffect, useRef, useState } from 'react'

const NODES = [
  { label: 'Mathematics', symbol: '∑', className: 'hub-node-math' },
  { label: 'Physics', symbol: 'F = ma', className: 'hub-node-physics' },
  { label: 'Chemistry', symbol: '⚗', className: 'hub-node-chemistry' },
  { label: 'Mentors', symbol: '◎', className: 'hub-node-mentor' },
  { label: 'Students', symbol: '◌', className: 'hub-node-student' },
  { label: 'Books', symbol: '▤', className: 'hub-node-books' },
]

function GraduationCapIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="capGlow" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E0F2FE" />
          <stop offset="0.48" stopColor="#7DD3FC" />
          <stop offset="1" stopColor="#BAE6FD" />
        </linearGradient>
      </defs>
      <path d="M11 23.5L32 14L53 23.5L32 33L11 23.5Z" stroke="url(#capGlow)" strokeWidth="3.2" strokeLinejoin="round" />
      <path d="M18.5 28.5V40.5C18.5 40.5 24.1 45.5 32 45.5C39.9 45.5 45.5 40.5 45.5 40.5V28.5" stroke="url(#capGlow)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48.5 27.5V39.5" stroke="url(#capGlow)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M50.5 39.5C50.5 43.3 41.5 46.5 32 46.5C22.5 46.5 13.5 43.3 13.5 39.5" stroke="url(#capGlow)" strokeWidth="2.6" strokeLinecap="round" opacity="0.88" />
    </svg>
  )
}

export function KnowledgeHub() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (event: PointerEvent) => {
      const bounds = scene.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      setTilt({ x: y * -8, y: x * 10 })
    }
    const reset = () => setTilt({ x: 0, y: 0 })
    scene.addEventListener('pointermove', onMove)
    scene.addEventListener('pointerleave', reset)
    return () => {
      scene.removeEventListener('pointermove', onMove)
      scene.removeEventListener('pointerleave', reset)
    }
  }, [])

  return (
    <div ref={sceneRef} className="knowledge-hub" aria-label="Interactive knowledge network visualization" data-sb-object-id="content/site.json">
      <div className="hub-aura" />
      <div className="hub-plane hub-plane-one" />
      <div className="hub-plane hub-plane-two" />
      <div className="hub-connections" />
      <div className="hub-core" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
        <div className="hub-core-ring" />
        <div className="hub-core-light" />
        <GraduationCapIcon />
      </div>
      {NODES.map((node, index) => (
        <div
          key={node.label}
          className={`hub-node ${node.className}`}
          style={{ transform: `translateZ(${index * 8}px) rotateX(${tilt.x * 0.35}deg) rotateY(${tilt.y * 0.35}deg)` }}
        >
          <span className="hub-node-symbol" data-sb-field-path={`hubNodes.${index}.symbol`}>{node.symbol}</span>
          <span className="hub-node-label" data-sb-field-path={`hubNodes.${index}.label`}>{node.label}</span>
        </div>
      ))}
      <div className="hub-orbit hub-orbit-one" />
      <div className="hub-orbit hub-orbit-two" />
    </div>
  )
}
