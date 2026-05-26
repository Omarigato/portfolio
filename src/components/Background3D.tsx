import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const count = isMobile ? 300 : 600

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return pos
  }, [count])

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime()
      ref.current.rotation.y = t * 0.025
      ref.current.rotation.x = t * 0.012
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#3B8BD4" size={0.055} transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function WireframeShape({
  position, type, speed,
}: {
  position: [number, number, number]
  type: 'icosahedron' | 'octahedron'
  speed: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed
      ref.current.rotation.x = t * 0.1
      ref.current.rotation.y = t * 0.15
    }
  })

  return (
    <mesh ref={ref} position={position}>
      {type === 'icosahedron' ? <icosahedronGeometry args={[1.1, 0]} /> : <octahedronGeometry args={[0.9]} />}
      <meshBasicMaterial color="#3B8BD4" wireframe transparent opacity={0.09} depthWrite={false} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ParticleField />
      {!isMobile && (
        <>
          <WireframeShape position={[-8, 4, -5]} type="icosahedron" speed={0.7} />
          <WireframeShape position={[9, -3, -4]} type="octahedron" speed={1.1} />
          <WireframeShape position={[6, 5, -6]} type="icosahedron" speed={0.5} />
        </>
      )}
    </>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        performance={{ min: 0.5 }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
