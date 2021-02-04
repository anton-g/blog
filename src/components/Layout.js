import React, { useRef, useContext, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import { PerspectiveCamera, useContextBridge, OrbitControls, softShadows } from '@react-three/drei'
import Header from './Header'
import { ThemeContext } from '../ThemeContext'
import { COLORS } from '../constants'
import { Suspense } from 'react'
const typeface = require('./helvetiker_bold.typeface.json')

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
          border: '2px solid red',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
          boxSizing: 'border-box'
        }}
      >
        <Canvas colorManagement shadowMap pixelRatio={window.devicePixelRatio}>
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
              {/* <Box /> */}
            </Physics>
          </ContextBridge>
          <OrbitControls
            target={[3, 0, 0]}
            enablePan={false}
            minDistance={13}
            maxDistance={22}
            enableDamping={true}
            minAzimuthAngle={-1.2}
            maxAzimuthAngle={-0.1}
            minPolarAngle={0.9}
            maxPolarAngle={1.5}
          />
          <PerspectiveCamera makeDefault position={[-10, 6, 12]} />
        </Canvas>
      </div>
    </>
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
    <mesh ref={textRef} onClick={() => api.applyImpulse([0, 0, -0.5], [0, 0, 0])} receiveShadow castShadow>
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
        color={colorMode === 'dark' ? 'hsl(0, 0%, 15%)' : 'hsl(0, 0%, 40%)'}
        roughness="0.67"
        flatShading={true}
      />
    </mesh>
  )
}

function Box(props) {
  // const [ref, api] = useBox(() => ({ mass: 1, position: [0, 0, 0] }))
  const { colorMode } = useContext(ThemeContext)

  return (
    <mesh {...props} position={[0, 0, 0]} scale={[1, 1, 1]} receiveShadow castShadow>
      <boxBufferGeometry args={[2.4779999465681612, 1.110055036842823, 0.5399999804794788]} />
      <meshStandardMaterial color={colorMode === 'dark' ? 'hsl(0, 0%, 15%)' : 'hsl(0, 0%, 40%)'} />
    </mesh>
  )
}

function Floor(props) {
  const [ref, api] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -1, 0] }))
  const { colorMode } = useContext(ThemeContext)

  return (
    <mesh ref={ref} receiveShadow>
      <meshStandardMaterial color={colorMode === 'dark' ? 'hsl(0, 0%, 3%)' : 'hsl(0, 0%, 50%)'} />
      <planeBufferGeometry args={[100, 100]} />
    </mesh>
  )
}

function Fog(props) {
  const { colorMode } = useContext(ThemeContext)
  return <fog attach="fog" args={[COLORS.background[colorMode], 10, 50]} />
}
