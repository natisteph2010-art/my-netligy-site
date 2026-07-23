import { useEffect, useRef, useState } from 'react'

const NODES = [
  { label: 'Mathematics', symbol: '∑', className: 'hub-node-math' },
  { label: 'Physics', symbol: 'F = ma', className: 'hub-node-physics' },
  { label: 'Chemistry', symbol: '⚗', className: 'hub-node-chemistry' },
  { label: 'Mentors', symbol: '◎', className: 'hub-node-mentor' },
  { label: 'Students', symbol: '◌', className: 'hub-node-student' },
  { label: 'Books', symbol: '▤', className: 'hub-node-books' },
]

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
    <div ref={sceneRef} className="knowledge-hub" aria-label="Interactive knowledge network visualization">
      <div className="hub-aura" />
      <div className="hub-plane hub-plane-one" />
      <div className="hub-plane hub-plane-two" />
      <div className="hub-connections" />
      <div className="hub-core" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
        <div className="hub-core-ring" />
        <div className="hub-core-light" />
        <span>KN</span>
      </div>
      {NODES.map((node, index) => (
        <div
          key={node.label}
          className={`hub-node ${node.className}`}
          style={{ transform: `translateZ(${index * 8}px) rotateX(${tilt.x * 0.35}deg) rotateY(${tilt.y * 0.35}deg)` }}
        >
          <span className="hub-node-symbol">{node.symbol}</span>
          <span className="hub-node-label">{node.label}</span>
        </div>
      ))}
      <div className="hub-orbit hub-orbit-one" />
      <div className="hub-orbit hub-orbit-two" />
    </div>
  )
}
