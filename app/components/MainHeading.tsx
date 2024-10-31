import { useSpring, animated, config } from '@react-spring/web'
import { CSSProperties, useEffect, useState } from 'react'
import useDimensions from '../hooks/useDimensions'
import useSound from 'use-sound'
import { useRef } from 'react'
import { trackGoal } from 'fathom-client'
import { useSoundMode } from '~/other/sound-context'
import { updateAchievements } from '~/other/eggs'
import { cn } from '~/other/misc'
import { TOnInitComponentFn } from 'react-canvas-confetti/dist/types'
import canvasConfetti, { CreateTypes, GlobalOptions } from 'canvas-confetti'

export const MainHeading = () => {
  const [playbackRate, setPlaybackRate] = useState(1)
  const [popped, setPopped] = useState(false)
  const [size, setSize] = useState(1)
  const [ref, dimensions] = useDimensions()
  const [playPop] = useSound('/sounds/balloon-pop.mp3', { volume: 0.35 })
  const [playBlow, { stop: stopBlow }] = useSound('/sounds/blow.mp3', {
    volume: 0.25,
    interrupt: true,
    playbackRate,
  })
  const [playDeflate] = useSound('/sounds/blow.mp3', {
    volume: 0.25,
    playbackRate: 2,
  })
  const timeoutRef = useRef<any>()
  const { soundMode } = useSoundMode()

  const [styles, api] = useSpring(() => ({
    fontSize: `${size}em`,
    onRest: () => {
      api.start({ fontSize: `1em` })
      setSize(1)
      setPlaybackRate(1)
    },
    config: config.wobbly,
  }))

  const left = (dimensions?.left || 0) + (dimensions?.width || 0) / 2
  const top = dimensions?.top || 0
  const client = typeof window !== 'undefined'
  const x = left / (client ? window.innerWidth : 1)
  const y = top / (client ? window.innerHeight : 1)

  const onBalloonClick = () => {
    if (size > 7.6) {
      setPopped(true)
      fire()
      stopBlow()
      soundMode && playPop()
      clearTimeout(timeoutRef.current)
      trackGoal('9LGXBJZP', 0)
      updateAchievements({
        b: true,
      })
      return
    }

    let change = 0.5
    if (size > 2.2) change = 0.4
    if (size > 3.8) change = 0.3
    if (size > 5) change = 0.15
    if (size > 6.6) change = 0.1
    setSize((s) => s + change)
    api.start({ fontSize: `${size + change}em` })
    soundMode && playBlow()
    setPlaybackRate(playbackRate + 0.05)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    timeoutRef.current = setTimeout(() => {
      soundMode && playDeflate()
    }, 800)
  }

  const instance = useRef<confetti.CreateTypes>()

  const onInit: TOnInitComponentFn = ({ confetti }) => {
    instance.current = confetti
  }

  const fire = async () => {
    if (!instance.current) return

    const shared: canvasConfetti.Options = {
      angle: 90,
      decay: 0.9,
      drift: 0,
      gravity: 1,
      origin: {
        x,
        y,
      },
      scalar: 1,
      shapes: ['circle', 'square'],
      spread: 360,
      ticks: 180,
    }

    instance.current({
      ...shared,
      particleCount: 500,
      startVelocity: 20,
    })
    instance.current({
      ...shared,
      particleCount: 100,
      startVelocity: 7,
    })
    instance.current({
      ...shared,
      particleCount: 100,
      startVelocity: 50,
    })
  }

  return (
    <h1
      className="font-title font-normal leading-[0.75] w-min max-w-full"
      style={{ fontSize: 'clamp(56px, 10vw + 1rem, 156px)' }}
    >
      anton{' '}
      <span className="whitespace-nowrap relative">
        gunnarss
        <span
          ref={ref}
          className={cn('relative text-gray-100 cursor-pointer', { 'select-none cursor-auto': popped })}
        >
          o
          <animated.span
            className={cn(
              'text-black select-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
              { hidden: popped }
            )}
            onClick={onBalloonClick}
            style={styles}
          >
            o
          </animated.span>
        </span>
        n
      </span>
      <ReactCanvasConfetti
        onInit={onInit}
        className="absolute pointer-events-none w-full h-[150vh] top-0 left-0 overflow-hidden z-50"
        globalOptions={{
          useWorker: true,
          resize: true,
          disableForReducedMotion: true,
        }}
      />
    </h1>
  )
}

const DEFAULT_GLOBAL_OPTIONS = {
  resize: true,
  useWorker: false,
}

const DEFAULT_STYLE: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
}

function getFinalStyle(style?: CSSProperties, className?: string) {
  if (!style && !className) {
    return DEFAULT_STYLE
  }

  return style
}

export type TReactCanvasConfettiProps = {
  className?: string
  style?: CSSProperties
  width?: string | number
  height?: string | number
  globalOptions?: GlobalOptions
  onInit?: TOnInitComponentFn
}

function ReactCanvasConfetti({
  style,
  className,
  width,
  height,
  globalOptions,
  onInit,
}: TReactCanvasConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const confetti = useRef<CreateTypes | null>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    confetti.current = canvasConfetti.create(canvasRef.current, {
      ...DEFAULT_GLOBAL_OPTIONS,
      ...globalOptions,
    })

    onInit?.({ confetti: confetti.current })

    return () => {
      confetti.current?.reset()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={getFinalStyle(style, className)}
      className={className}
      width={width}
      height={height}
    />
  )
}
