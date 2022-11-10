import { useAnimatedGLTF } from '../hooks/useAnimatedGLTF'
import { useReducedMotion } from 'framer-motion'
import { GLTF } from 'three-stdlib'
import { GroupProps } from '@react-three/fiber'

type PigeonGLTF = GLTF & {
  nodes: {
    Cube228: THREE.SkinnedMesh
    Cube228_1: THREE.SkinnedMesh
    Cube228_2: THREE.SkinnedMesh
    Cube228_3: THREE.SkinnedMesh
    Body: THREE.Bone
    Head: THREE.Bone
  }
  materials: {
    Pigeon_Main: THREE.MeshStandardMaterial
    Pigeon_Secondary: THREE.MeshStandardMaterial
    Eye_White: THREE.MeshStandardMaterial
    Eye_Black: THREE.MeshStandardMaterial
  }
}

type ActionName =
  | 'Bite_Front'
  | 'Dance'
  | 'Death'
  | 'HitRecieve'
  | 'Idle'
  | 'Jump'
  | 'No'
  | 'Walk'
  | 'Yes'

export type PigeonActions = Record<ActionName, THREE.AnimationAction>

export function Pigeon({
  play = 'Dance',
  ...props
}: { play?: ActionName } & GroupProps) {
  const prefersReducedMotion = useReducedMotion()
  const { ref, nodes, materials } = useAnimatedGLTF<PigeonGLTF>(
    '/models/Pigeon.glb',
    prefersReducedMotion ? 'Idle' : play
  )

  return (
    // @ts-ignore
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Pigeon_Blob_Eyes">
            <skinnedMesh
              name="Cube228"
              geometry={nodes.Cube228.geometry}
              material={materials.Pigeon_Main}
              skeleton={nodes.Cube228.skeleton}
            />
            <skinnedMesh
              name="Cube228_1"
              geometry={nodes.Cube228_1.geometry}
              material={materials.Pigeon_Secondary}
              skeleton={nodes.Cube228_1.skeleton}
            />
            <skinnedMesh
              name="Cube228_2"
              geometry={nodes.Cube228_2.geometry}
              material={materials.Eye_White}
              skeleton={nodes.Cube228_2.skeleton}
            />
            <skinnedMesh
              name="Cube228_3"
              geometry={nodes.Cube228_3.geometry}
              material={materials.Eye_Black}
              skeleton={nodes.Cube228_3.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/models/Pigeon.glb')
