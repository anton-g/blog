import React, { useRef, useContext, useEffect, Suspense } from 'react'
import { graphql } from 'gatsby'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import { PerspectiveCamera, useContextBridge, OrbitControls, softShadows } from '@react-three/drei'
import { ThemeContext } from '../ThemeContext'
import { COLORS } from '../constants'

import Layout from '../components/Layout'
import SEO from '../components/Seo'

softShadows()

const darkColor = new THREE.Color(COLORS.background.dark)
const lightColor = new THREE.Color(COLORS.background.light)

function NotFoundPage({ data, location }) {
  const ContextBridge = useContextBridge(ThemeContext)
  const siteTitle = data.site.siteMetadata.title
  const { colorMode } = useContext(ThemeContext)

  return (
    <>
      <Layout location={location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <div style={{ padding: '16px' }}>
          <h1>Not Found</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </div>
      </Layout>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          boxSizing: 'border-box'
        }}
      >
        <Canvas
          colorManagement
          shadowMap
          onCreated={({ scene }) => {
            scene.background = colorMode === 'dark' ? darkColor.clone() : lightColor.clone()
          }}
        >
          <ambientLight />
          <pointLight position={[0, 3, 0]} />
          <directionalLight castShadow position={[2, 5, 5]} intensity={1} args={['#c2e8ff', 1, 20]} />
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

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

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
      dampingFactor={0.005}
      zoomSpeed={0.1}
    />
  )
}

function useTextBox(config) {
  const textRef = useRef()
  const [, api] = useBox(() => {
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
  }, [textRef])

  return (
    <mesh ref={textRef} onPointerDown={() => api.applyImpulse([0, 0, -0.5], [0, 0, 0])} receiveShadow castShadow>
      <textBufferGeometry
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
  const ref = useRef()
  const alpha = useRef(0)
  const initialColor = useRef(colorMode === 'dark' ? darkColor.clone() : lightColor.clone())

  useFrame(({ scene }) => {
    if (colorMode === 'dark' && alpha.current > 0) {
      alpha.current -= 0.08
      ref.current.color.lerpColors(darkColor, initialColor.current, alpha.current)
      scene.background.lerpColors(darkColor, initialColor.current, alpha.current)
    }

    if (colorMode === 'light' && alpha.current < 1) {
      alpha.current += 0.08
      ref.current.color.lerpColors(initialColor.current, lightColor, alpha.current)
      scene.background.lerpColors(initialColor.current, lightColor, alpha.current)
    }
  })

  return <fog attach="fog" ref={ref} args={[COLORS.background[colorMode], 10, 50]} />
}
