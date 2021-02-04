import React, { useRef, useContext, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from 'react-three-fiber'
import { PerspectiveCamera, useContextBridge, OrbitControls, softShadows } from '@react-three/drei'
import Header from './Header'
import { ThemeContext } from '../ThemeContext'
import { COLORS } from '../constants'
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
            position={[5, 10, 5]}
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
            <Text></Text>
            <Floor></Floor>
          </ContextBridge>
          <OrbitControls />
          <PerspectiveCamera makeDefault position={[0, 3, 10]} />
        </Canvas>
      </div>
    </>
  )
}

function Text() {
  const [font, setFont] = useState(null)
  const { colorMode } = useContext(ThemeContext)

  useEffect(() => {
    const loader = new THREE.FontLoader()
    const r = loader.parse(typeface)
    setFont(r)
  }, [])

  if (!font) return null

  return (
    <mesh position={[0, -0.9, 0]} receiveShadow castShadow>
      <textGeometry
        attach="geometry"
        args={[
          '404',
          {
            font: font,
            size: 1,
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
  const { colorMode } = useContext(ThemeContext)
  const mesh = useRef()

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  return (
    <mesh {...props} ref={mesh} scale={[1, 1, 1]} position={[0, 0, 0]} receiveShadow castShadow>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={colorMode === 'dark' ? 'hsl(0, 0%, 15%)' : 'hsl(0, 0%, 40%)'} />
    </mesh>
  )
}

function Floor(props) {
  const { colorMode } = useContext(ThemeContext)

  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <meshStandardMaterial color={colorMode === 'dark' ? 'hsl(0, 0%, 3%)' : 'hsl(0, 0%, 50%)'} />
      <planeBufferGeometry args={[100, 100]} />
    </mesh>
  )
}

function Fog(props) {
  const { colorMode } = useContext(ThemeContext)
  return <fog attach="fog" args={[COLORS.background[colorMode], 10, 50]} />
}
