import { Vector3 } from '@react-three/fiber'
import { Center, MeshDistortMaterial, Text3D } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'

export const YouMadeItText = ({ position }: { position: Vector3 }) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Center position={position}>
      <Text3D
        rotation={[0.3, -0.2, 0.3]}
        curveSegments={32}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.1}
        height={0.5}
        lineHeight={0.7}
        letterSpacing={0.06}
        size={0.7}
        font="/Inter_Bold.json"
      >
        {`you\nfound\nme!`}
        <MeshDistortMaterial
          color={'dodgerblue'}
          attach="material"
          distort={0.2} // Strength, 0 disables the effect (default=1)
          speed={prefersReducedMotion ? 0 : 1} // Speed (default=1)
          roughness={0}
        />
      </Text3D>
    </Center>
  )
}
