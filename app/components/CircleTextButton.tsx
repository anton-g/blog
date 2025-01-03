import { trackGoal } from 'fathom-client'
import { useRef, useState } from 'react'
import { useSound } from 'use-sound'
import { updateEggSeed } from '~/other/eggs'
import { cn } from '~/other/misc'
import { useSoundMode } from '~/other/sound-context'
import { motion, useSpring as new_useSpring } from 'motion/react'

const target = 4
const clickTimeout = 850
export const CircleTextButton = ({
  className,
  onSuccess,
  onClick,
}: {
  className?: string
  onSuccess: () => void
  onClick: () => void
}) => {
  const [playClickDown] = useSound('/sounds/clickDown.mp3')
  const [playClickUp] = useSound('/sounds/clickUp.mp3')
  const { soundMode } = useSoundMode()
  const [clicks, setClicks] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout>(null!)
  const timeRef = useRef<number>(0)
  const seedTimeRef = useRef<number>(0)

  const turbulenceScale = new_useSpring(0, {
    stiffness: 180,
    damping: 12,
  })

  const handleMouseDown = () => {
    soundMode && playClickDown()
    timeRef.current = Date.now()

    if (!seedTimeRef.current) {
      seedTimeRef.current = Date.now()
    }
  }

  const handleMouseUp = () => {
    onClick()

    soundMode && playClickUp()
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    const clickDiff = Date.now() - timeRef.current
    const newClicks = clicks + 1
    if (clickDiff > clickTimeout) {
      setClicks(newClicks)
      const current = turbulenceScale.get()
      turbulenceScale.set(current === 0 ? 150 : current * 1.8)

      if (newClicks >= target) {
        turbulenceScale.set(0)
        setClicks(0)
        handleSuccess()
        return
      }
    }

    timeRef.current = 0

    timeoutRef.current = setTimeout(() => {
      turbulenceScale.set(0)
      setClicks(0)
    }, 10000)
  }

  const handleSuccess = () => {
    onSuccess()
    updateEggSeed({
      a: seedTimeRef.current,
    })
    // TODO fix
    trackGoal('XQDOSANS', 0)
  }

  return (
    <div className={cn('m-[-6px] overflow-visible relative', className)}>
      <div className="relative w-[300px] h-[300px] overflow-visible flex items-center justify-center">
        <button
          className="circle-button"
          onMouseDown={() => handleMouseDown()}
          onMouseUp={() => handleMouseUp()}
          onTouchStart={() => handleMouseDown()}
          onTouchEnd={() => handleMouseUp()}
        >
          The Button
        </button>
        <svg
          className="absolute h-full w-full pointer-events-none left-0 top-0 animate-circleText"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="300px"
          height="300px"
          viewBox="0 0 300 300"
          xmlSpace="preserve"
          overflow="visible"
        >
          <defs>
            <path
              id="circlePath"
              d="M 150, 150 m -120, 0 a 120,120 0 0,1 240,0 a 120,120 0 0,1 -240,0 "
              fill="none"
            />
            <filter id="filter">
              <feTurbulence
                id="turbulence"
                type="fractalNoise"
                baseFrequency="0.002"
                numOctaves="5"
                result="NOISE"
                seed={'4432'}
              ></feTurbulence>
              <feGaussianBlur in="SourceGraphic" result="BLURRED" stdDeviation="0"></feGaussianBlur>
              <motion.feDisplacementMap
                id="displacer"
                in2="NOISE"
                in="BLURRED"
                scale={turbulenceScale}
                xChannelSelector="R"
                yChannelSelector="R"
                result="DISPLACED"
              ></motion.feDisplacementMap>
            </filter>
          </defs>
          <circle cx="150" cy="150" r="150" fill="none" />
          <g>
            <use xlinkHref="#circlePath" fill="none" />
            <text fill="currentColor" filter="url(#filter)" className="font-bold text-gray-950 text-2xl">
              <textPath xlinkHref="#circlePath">I PROMISE YOU THIS BUTTON DOES SOMETHING, REALLY 🤞</textPath>
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
