import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Html, Line } from '@react-three/drei'
import * as THREE from 'three'

type NodeDef = {
  label: string
  symbol: string
  position: [number, number, number]
  color: string
  accent: boolean
}

// Subject / community nodes arranged around a central knowledge core.
const NODES: NodeDef[] = [
  { label: 'Mathematics', symbol: '∑', position: [2.5, 1.4, 0.6], color: '#7dd3fc', accent: true },
  { label: 'Physics', symbol: 'F=ma', position: [-2.7, 1.1, -0.5], color: '#38bdf8', accent: false },
  { label: 'Chemistry', symbol: '⌬', position: [2.2, -1.5, -0.8], color: '#67e8f9', accent: false },
  { label: 'Biology', symbol: '⬡', position: [-2.4, -1.3, 0.7], color: '#5eead4', accent: false },
  { label: 'Mentors', symbol: '◎', position: [0.2, 2.6, -0.9], color: '#bae6fd', accent: true },
  { label: 'Students', symbol: '◌', position: [-0.4, -2.6, 0.4], color: '#7dd3fc', accent: false },
  { label: 'English', symbol: 'Aa', position: [3.1, -0.2, 0.9], color: '#38bdf8', accent: false },
  { label: 'Computing', symbol: '{ }', position: [-3.2, 0.0, -0.6], color: '#67e8f9', accent: false },
]

// Connections between nodes (indices) forming the "network of learning".
const EDGES: Array<[number, number]> = [
  [4, 0], [4, 1], [4, 6], [4, 7],
  [5, 2], [5, 3], [5, 0], [5, 7],
  [0, 6], [1, 7], [2, 6], [3, 5],
]

function GraduationCap() {
  const cap = useRef<THREE.Group>(null)
  const tassel = useRef<THREE.Group>(null)
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)

  useFrame(({ clock }, delta) => {
    if (cap.current) {
      // gentle continuous spin + subtle bob
      cap.current.rotation.y += delta * 0.5
      cap.current.position.y = Math.sin(clock.elapsedTime * 1.2) * 0.08
    }
    // tassel sways with a slight lag for a lively feel
    if (tassel.current) {
      tassel.current.rotation.z = Math.sin(clock.elapsedTime * 1.6) * 0.18
    }
    if (ring1.current) ring1.current.rotation.z += delta * 0.25
    if (ring2.current) ring2.current.rotation.z -= delta * 0.18
  })

  const boardMaterial = (
    <meshStandardMaterial
      color="#0b1f3a"
      emissive="#0ea5e9"
      emissiveIntensity={0.6}
      roughness={0.35}
      metalness={0.5}
    />
  )

  return (
    <group>
      <group ref={cap} rotation={[0.15, 0, 0]}>
        {/* mortarboard (flat square top) */}
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[1.5, 0.05, 1.5]} />
          {boardMaterial}
        </mesh>
        {/* glowing edge trim on the board */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.56, 0.02, 1.56]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
        </mesh>

        {/* crown / head band of the cap */}
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.5, 0.56, 0.42, 40]} />
          {boardMaterial}
        </mesh>

        {/* center button */}
        <mesh position={[0, 0.47, 0]}>
          <sphereGeometry args={[0.08, 20, 20]} />
          <meshStandardMaterial
            color="#e0f2fe"
            emissive="#7dd3fc"
            emissiveIntensity={2.2}
            roughness={0.2}
          />
        </mesh>

        {/* tassel: string running to the corner, then hanging down with a bob */}
        <group ref={tassel} position={[0, 0.47, 0]}>
          {/* string along the board to the corner */}
          <mesh position={[0.34, -0.01, 0.34]} rotation={[0, -Math.PI / 4, Math.PI / 2]}>
            <cylinderGeometry args={[0.015, 0.015, 0.96, 8]} />
            <meshBasicMaterial color="#7dd3fc" />
          </mesh>
          {/* hanging string */}
          <mesh position={[0.66, -0.32, 0.66]}>
            <cylinderGeometry args={[0.015, 0.015, 0.62, 8]} />
            <meshBasicMaterial color="#7dd3fc" />
          </mesh>
          {/* tassel bob */}
          <mesh position={[0.66, -0.66, 0.66]}>
            <coneGeometry args={[0.09, 0.22, 12]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={1.6}
              roughness={0.3}
            />
          </mesh>
        </group>
      </group>

      {/* soft halo */}
      <mesh scale={2.1}>
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.07} />
      </mesh>
      {/* orbiting rings */}
      <mesh ref={ring1} rotation={[Math.PI / 2.2, 0.3, 0]}>
        <torusGeometry args={[1.5, 0.012, 16, 120]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.55} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 1.7, -0.4, 0.2]}>
        <torusGeometry args={[1.9, 0.008, 16, 120]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.35} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={3} distance={9} color="#38bdf8" />
    </group>
  )
}

function KnowledgeNode({ node }: { node: NodeDef }) {
  const mesh = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const pulse = 1 + Math.sin(clock.elapsedTime * 2 + node.position[0]) * 0.06
    const target = hovered ? 1.35 : pulse
    mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, target, 0.15))
  })

  const radius = node.accent ? 0.34 : 0.26

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group position={node.position}>
        <mesh
          ref={mesh}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            setHovered(false)
            document.body.style.cursor = 'auto'
          }}
        >
          <icosahedronGeometry args={[radius, 2]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={hovered ? 2.6 : 1.4}
            roughness={0.25}
            metalness={0.2}
          />
        </mesh>
        {/* halo */}
        <mesh scale={1.7}>
          <sphereGeometry args={[radius, 24, 24]} />
          <meshBasicMaterial color={node.color} transparent opacity={hovered ? 0.18 : 0.09} />
        </mesh>
        <Html center position={[0, radius + 0.55, 0]} distanceFactor={9} pointerEvents="none">
          <div className="constellation-label" data-hovered={hovered}>
            <span className="constellation-symbol">{node.symbol}</span>
            <span className="constellation-name">{node.label}</span>
          </div>
        </Html>
      </group>
    </Float>
  )
}

function Connections() {
  return (
    <group>
      {EDGES.map(([a, b], i) => (
        <Line
          key={i}
          points={[NODES[a].position, [0, 0, 0], NODES[b].position]}
          color="#38bdf8"
          lineWidth={0.7}
          transparent
          opacity={0.28}
        />
      ))}
    </group>
  )
}

function StarField({ count = 120 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#7dd3fc" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

// Rotates the whole scene gently toward the pointer for an interactive feel.
function InteractiveRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  useFrame((_, delta) => {
    if (!group.current) return
    const targetY = pointer.x * 0.5
    const targetX = -pointer.y * 0.35
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3, delta)
    // slow idle spin
    group.current.rotation.y += delta * 0.05
  })

  return <group ref={group}>{children}</group>
}

export function KnowledgeConstellation() {
  const [mounted, setMounted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  if (!mounted) {
    return <div className="constellation-canvas" aria-hidden="true" />
  }

  return (
    <div
      className="constellation-canvas"
      role="img"
      aria-label="Interactive 3D knowledge constellation connecting IGCSE subjects, mentors, and students"
    >
      <Canvas
        camera={{ position: [0, 0, 10.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reducedMotion ? 'demand' : 'always'}
        onCreated={({ gl }) => {
          // Recover gracefully if the GPU drops the WebGL context (common on
          // software renderers / low-power devices) so the scene repaints
          // instead of going permanently blank.
          const canvas = gl.domElement
          canvas.addEventListener(
            'webglcontextlost',
            (event) => {
              event.preventDefault()
            },
            false,
          )
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} color="#bae6fd" />
        <InteractiveRig>
          <GraduationCap />
          <Connections />
          {NODES.map((node) => (
            <KnowledgeNode key={node.label} node={node} />
          ))}
          <StarField />
        </InteractiveRig>
      </Canvas>
    </div>
  )
}
