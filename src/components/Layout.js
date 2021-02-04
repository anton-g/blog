import React, { useRef, useContext, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import { PerspectiveCamera, useContextBridge, OrbitControls, softShadows } from '@react-three/drei'
import Header from './Header'
import { ThemeContext } from '../ThemeContext'
import { COLORS } from '../constants'
import { Suspense } from 'react'

require('../fonts/inter/inter.css')
require('../fonts/ms-sans-serif/ms-sans-serif.css')
require('./index.css')
require('./prism-theme.css')

softShadows()

export default function Layout({ children, maxWidth }) {
  const ContextBridge = useContextBridge(ThemeContext)
  return (
    <>
      <div style={{ paddingTop: '3rem' }}>
        <Header />
        <main
          style={{
            maxWidth: maxWidth ? maxWidth : '800px',
            margin: '0 auto 0'
          }}
        >
          {children}
        </main>
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
          boxSizing: 'border-box'
        }}
      >
        <Canvas colorManagement shadowMap>
          <ambientLight />
          <pointLight position={[0, 3, 0]} />
          <directionalLight
            castShadow
            position={[2, 5, 5]}
            intensity={1}
            args={['#c2e8ff', 1, 20]}
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-far={20}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
          />
          <ContextBridge>
            <Fog></Fog>
            <Physics>
              <Suspense fallback={null}>
                <Text text="4" position={[0, 4.2, 0]} />
                <Text text="0" position={[1.6, 5.2, 0]} />
                <Text text="4" position={[3.2, 4.7, 0]} />
              </Suspense>
              <Floor></Floor>
            </Physics>
          </ContextBridge>
          <Controls />
          <PerspectiveCamera makeDefault position={[-10, 6, 12]} />
        </Canvas>
      </div>
    </>
  )
}

function Controls() {
  const controlsRef = useRef()
  useFrame(() => controlsRef.current.update())

  return (
    <OrbitControls
      ref={controlsRef}
      target={[3, 0, 0]}
      enablePan={false}
      minDistance={13}
      maxDistance={22}
      enableDamping={true}
      minAzimuthAngle={-1.2}
      maxAzimuthAngle={-0.1}
      minPolarAngle={0.9}
      maxPolarAngle={1.5}
      enableDamping={true}
      dampingFactor={0.005}
      zoomSpeed={0.1}
    />
  )
}

function useTextBox(config) {
  const textRef = useRef()
  const [_, api] = useBox(() => {
    const bbox = new THREE.Box3().setFromObject(textRef.current)
    const size = bbox.getSize(new THREE.Vector3())
    return {
      ...config,
      args: [size.x, size.y, size.z]
    }
  }, textRef)

  return [textRef, api]
}

function Text({ text, position }) {
  const [textRef, api] = useTextBox({
    mass: 1,
    position
  })
  const { colorMode } = useContext(ThemeContext)

  const font = useLoader(THREE.FontLoader, '/helvetiker_bold.typeface.json')

  useEffect(() => {
    textRef.current.geometry.center()
  }, [textRef.current])

  return (
    <mesh ref={textRef} onPointerDown={() => api.applyImpulse([0, 0, -0.5], [0, 0, 0])} receiveShadow castShadow>
      <textGeometry
        attach="geometry"
        args={[
          text,
          {
            font: font,
            size: 2,
            height: 0.5,
            curveSegments: 14,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.05,
            bevelOffset: 0,
            bevelSegments: 8
          }
        ]}
      />
      <meshStandardMaterial
        attach="material"
        color={colorMode === 'dark' ? 'hsl(0, 0%, 15%)' : 'hsl(0, 0%, 50%)'}
        roughness="0.67"
        flatShading={true}
      />
    </mesh>
  )
}

function Floor() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -1, 0] }))
  const { colorMode } = useContext(ThemeContext)

  return (
    <mesh ref={ref} receiveShadow>
      <meshStandardMaterial color={colorMode === 'dark' ? 'hsl(0, 0%, 3%)' : 'hsl(0, 0%, 50%)'} />
      <planeBufferGeometry args={[100, 100]} />
    </mesh>
  )
}

function Fog() {
  const { colorMode } = useContext(ThemeContext)
  return <fog attach="fog" args={[COLORS.background[colorMode], 10, 50]} />
}
