import { Vector3, useFrame } from '@react-three/fiber'
import { Center, Text3D, Float, Instances, Instance, GradientTexture } from '@react-three/drei'
import { useReducedMotion } from 'motion/react'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const StarShape = () => {
  const points = useMemo(() => {
    const vertices = []
    const innerRadius = 0.02
    const outerRadius = 0.06
    const numPoints = 4

    for (let i = 0; i < numPoints * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (i * Math.PI) / numPoints
      vertices.push(new THREE.Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius))
    }
    return vertices
  }, [])

  return <shapeGeometry args={[new THREE.Shape(points)]} />
}

const GoldenSparkle = ({ position, baseScale = 1 }: { position: Vector3; baseScale: number }) => {
  const ref = useRef<THREE.Mesh>(null)
  const randomOffset = useMemo(() => Math.random() * Math.PI * 2, [])
  const randomSpeed = useMemo(() => Math.random() * 0.5 + 0.5, [])

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime
      const scale = baseScale * (0.8 + Math.sin(t * randomSpeed + randomOffset) * 0.2)
      ref.current.scale.setScalar(scale)
      if (Array.isArray(ref.current.material)) return
      ref.current.material.opacity = 0.6 + Math.sin(t * randomSpeed + randomOffset) * 0.3
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <StarShape />
      <meshBasicMaterial
        color="#ffd700"
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      >
        <GradientTexture
          attach="alphaMap"
          stops={[0, 0.3, 0.5, 0.7, 1]}
          colors={['#fff', '#fff', '#fff', '#fff']}
        />
      </meshBasicMaterial>
    </mesh>
  )
}

const Sparkles = ({ count = 40, spread = 3 }) => {
  const positions = useMemo(() => {
    return Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * spread
      const y = (Math.random() - 0.5) * spread
      return [Math.cos(angle) * radius, y, Math.sin(angle) * radius]
    })
  }, [count, spread])

  return (
    <group position={[0.8, 0, 0]}>
      {positions.map((pos, i) => (
        <Float key={i} rotationIntensity={0}>
          <GoldenSparkle position={new THREE.Vector3(...pos)} baseScale={Math.random() * 0.5 + 0.5} />
        </Float>
      ))}
    </group>
  )
}

export const YouMadeItText = ({ position }: { position: Vector3 }) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <Center position={position}>
        <Sparkles count={50} spread={4} />
        <Float
          speed={prefersReducedMotion ? 0 : 1.5}
          rotationIntensity={prefersReducedMotion ? 0 : 1.5}
          floatIntensity={prefersReducedMotion ? 0 : 1}
          position={[-0.65, 0, 0]}
        >
          <group>
            <Text3D
              rotation={[-0.2, -0.2, 0.4]}
              curveSegments={32}
              bevelEnabled
              bevelSize={0.06}
              bevelThickness={0.12}
              height={0.5}
              lineHeight={0.6}
              letterSpacing={0.06}
              size={0.7}
              font="/Inter_Bold.json"
            >
              {`YOU\nFOUND\nME!`}
              <meshPhysicalMaterial
                color="#ffd700"
                emissive="#aa8f00"
                emissiveIntensity={0.3}
                roughness={0.1}
                metalness={1}
                reflectivity={1}
                clearcoat={1}
                clearcoatRoughness={0.1}
                envMapIntensity={3}
                sheen={0}
                sheenRoughness={0.1}
                sheenColor="#ffd700"
              />
            </Text3D>
          </group>
        </Float>
      </Center>
    </>
  )
}
