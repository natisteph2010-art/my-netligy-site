import { useEffect, useRef } from 'react'

type ParticleNetworkProps = {
  className?: string
  density?: number
}

type Particle = { x: number; y: number; vx: number; vy: number; radius: number }

export function ParticleNetwork({ className = '', density = 42 }: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const parent = canvas.parentElement
    let animationFrame = 0
    let particles: Particle[] = []
    let width = 0
    let height = 0

    const resize = () => {
      const bounds = parent?.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds?.width || window.innerWidth
      height = bounds?.height || window.innerHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      particles = Array.from({ length: Math.min(density, width < 640 ? 24 : density) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius: Math.random() * 1.4 + 0.6,
      }))
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      for (const particle of particles) {
        if (!reduceMotion) {
          particle.x += particle.vx
          particle.y += particle.vy
          if (particle.x < -10 || particle.x > width + 10) particle.vx *= -1
          if (particle.y < -10 || particle.y > height + 10) particle.vy *= -1
        }
        context.beginPath()
        context.fillStyle = 'rgba(125, 211, 252, 0.72)'
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      }
      for (let first = 0; first < particles.length; first += 1) {
        for (let second = first + 1; second < particles.length; second += 1) {
          const dx = particles[first].x - particles[second].x
          const dy = particles[first].y - particles[second].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 150) {
            context.beginPath()
            context.strokeStyle = `rgba(56, 189, 248, ${0.16 * (1 - distance / 150)})`
            context.lineWidth = 0.7
            context.moveTo(particles[first].x, particles[first].y)
            context.lineTo(particles[second].x, particles[second].y)
            context.stroke()
          }
        }
      }
      if (!reduceMotion) animationFrame = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [density])

  return <canvas ref={canvasRef} className={`particle-network ${className}`} aria-hidden="true" />
}
