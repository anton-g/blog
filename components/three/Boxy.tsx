import { useRef, useState } from 'react'
import { useFrame, Vector3 } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import { Mesh } from 'three'
import { a } from '@react-spring/three'
import { useSpring } from '@react-spring/core'

export const Boxy = ({
  position,
  size,
  initialColor,
  activeColor,
}: {
  size: number
  position: Vector3
  initialColor: string
  activeColor: string
}) => {
  const [active, setActive] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const mesh = useRef<Mesh>(null!)
  useFrame(() => {
    if (!mesh.current || prefersReducedMotion) return

    mesh.current.rotation.x =
      mesh.current.rotation.y =
      mesh.current.rotation.z +=
        0.002
  })

  const { spring } = useSpring({
    spring: active,
    config: { mass: 3, tension: 500, friction: 40, precision: 0.0001 },
  })

  const scale = spring.to([0, 1], [1, 5])
  const color = spring.to([0, 1], [initialColor, activeColor])

  return (
    <AnimatedRoundedBox
      ref={mesh}
      args={[size, size, size]}
      position={position}
      radius={0.1}
      smoothness={4}
      scale-x={scale}
      onClick={() => setActive(Number(!active))}
    >
      {/* @ts-ignore */}
      <a.meshLambertMaterial color={color} />
    </AnimatedRoundedBox>
  )
}

const AnimatedRoundedBox = a(RoundedBox)
