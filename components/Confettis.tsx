// Very much built upon https://joshwcomeau.com/react/animated-sparkles-in-react/

import React, { useCallback } from 'react'
import { CSSProperties } from 'react'
import { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'
import useSound from 'use-sound'
import { useSoundMode } from '../contexts/SoundContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useRandomInterval } from '../hooks/useRandomInterval'
import { random } from '../utils/random'
import Accordion from './Accordion'

const DEFAULT_COLORS = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']

const confettis = [
  {
    // star
    min: 11,
    max: 13,
    path: 'M27.098 1.854c.599-1.843 3.205-1.843 3.804 0l5.282 16.258a2 2 0 001.903 1.381H55.18c1.937 0 2.743 2.48 1.175 3.619l-13.83 10.047a2 2 0 00-.726 2.236l5.283 16.258c.598 1.842-1.51 3.374-3.078 2.236L30.175 43.84a2 2 0 00-2.35 0l-13.83 10.047c-1.567 1.14-3.676-.393-3.078-2.235L16.2 35.395a2 2 0 00-.727-2.236L1.643 23.112c-1.567-1.14-.761-3.619 1.176-3.619h17.094a2 2 0 001.903-1.381l5.282-16.258z',
  },
  {
    // worm
    min: 15,
    max: 20,
    path: 'M1.095 8.042C.928 7.003.67 6.62.525 6.475.525 6.475-.63 3.63 1 2c2-2 4.475-.475 4.475-.475 1.63 1.63 2.256 3.687 2.532 5.413.265 1.66.264 3.44.263 4.883v.131c0 1.607.008 2.823.174 3.824.164.985.403 1.234.449 1.276.142.128.452.324 1.354.39.877.062 1.854-.018 3.198-.129l.493-.04.11-.01c2.683-.218 7.324-.595 10.67 2.88 3.23 3.354 2.905 7.868 2.713 10.542l-.018.252-.004.06c-.11 1.552-.186 2.639-.085 3.576.092.855.3 1.2.503 1.407 1.04 1.06 2.206 1.086 5.382.66l.157-.02c1.32-.178 3.164-.426 4.952-.163 2.102.31 4.15 1.311 5.708 3.474 1.33 1.849 1.897 3.661 1.961 5.471.05 1.38-.22 2.732-.4 3.64l-.075.39c-.191 1.014-.268 1.713-.16 2.453.104.707.418 1.699 1.405 3.097C46.757 54.982 48 57 46 59s-4.423.537-4.962.018c-.538-.518-2.324-4.157-2.611-6.117-.283-1.927-.02-3.563.206-4.765l.106-.557c.181-.948.27-1.416.253-1.928-.014-.387-.1-.87-.647-1.63-.32-.445-.585-.57-1.048-.638-.705-.104-1.602-.013-3.16.196l-.333.045c-2.666.365-7.307 1-10.977-2.745-1.671-1.706-2.269-3.757-2.463-5.556-.17-1.582-.05-3.252.045-4.572l.022-.306c.229-3.254.085-4.574-.755-5.446-.78-.81-1.998-1.007-5.173-.75l-.483.041c-1.252.106-2.815.238-4.275.133-1.734-.124-3.8-.602-5.543-2.176-1.733-1.564-2.383-3.63-2.664-5.327-.27-1.63-.269-3.402-.268-4.84v-.13c0-1.602-.007-2.853-.175-3.908z',
  },
  {
    // worm reversed
    min: 15,
    max: 20,
    path: 'M41.136 6.468c.149-.95.38-1.3.509-1.433 0 0 1.032-2.601-.424-4.092-1.787-1.829-3.998-.434-3.998-.434-1.456 1.49-2.016 3.371-2.262 4.95-.237 1.517-.236 3.144-.235 4.464v.12c0 1.47-.008 2.582-.156 3.497-.146.901-.36 1.129-.4 1.167-.127.117-.405.297-1.21.356-.784.058-1.657-.016-2.858-.117l-.44-.037a56.239 56.239 0 00-.098-.008c-2.397-.2-6.543-.545-9.533 2.633-2.886 3.067-2.596 7.194-2.424 9.64l.016.23.004.055c.098 1.419.166 2.413.076 3.27-.082.781-.269 1.098-.45 1.286-.928.97-1.97.993-4.808.605a84.455 84.455 0 01-.14-.02c-1.18-.162-2.827-.389-4.424-.148-1.878.283-3.708 1.199-5.1 3.177-1.189 1.69-1.695 3.348-1.752 5.003-.044 1.262.196 2.498.357 3.328l.068.356c.17.928.239 1.567.142 2.244-.093.646-.373 1.553-1.255 2.831 0 0-1.11 1.846.676 3.675 1.787 1.829 3.952.49 4.433.017.481-.474 2.077-3.802 2.334-5.594.252-1.762.018-3.258-.184-4.357l-.095-.51c-.162-.867-.242-1.295-.226-1.763.012-.354.089-.796.578-1.49.286-.407.522-.522.936-.584.63-.095 1.431-.011 2.823.179l.298.041c2.381.334 6.527.916 9.807-2.51 1.493-1.56 2.026-3.435 2.2-5.08.152-1.447.045-2.974-.04-4.181l-.02-.28c-.204-2.976-.076-4.183.675-4.98.697-.741 1.785-.92 4.62-.685l.433.037c1.118.097 2.515.218 3.82.122 1.549-.114 3.394-.551 4.951-1.99 1.548-1.43 2.129-3.32 2.38-4.871.241-1.492.24-3.112.24-4.427v-.12c-.001-1.464.006-2.607.156-3.572z',
  },
]

type Confetti = {
  id: string
  createdAt: number
  color: string
  size: number
  speed: number
  rotation: number
  wind: number
  path: string
  style: {
    top: string
    left: string
  }
}

const generateConfetti = (colors: string[]): Confetti => {
  const confetti = confettis[random(0, confettis.length)]

  return {
    id: String(random(10000, 999999)),
    createdAt: Date.now(),
    color: colors[random(0, colors.length)],
    size: random(confetti.min, confetti.max),
    speed: random(1000, 1500),
    rotation: random(-90, 90),
    wind: random(-2, 2),
    path: confetti.path,
    style: {
      top: random(-2, 2) + '%',
      left: random(0, 100) + '%',
    },
  }
}

const Confettis = ({ children, ...delegated }: { children: ReactNode }) => {
  const { soundMode } = useSoundMode()
  const [playOn] = useSound('sounds/on.mp3', { volume: 0.15 })
  const [playOff] = useSound('sounds/off.mp3', { volume: 0.25 })
  const [disabled, setDisabled] = React.useState(false)
  const [confettis, setConfettis] = React.useState<Confetti[]>([])
  const prefersReducedMotion = usePrefersReducedMotion()

  useRandomInterval(
    () => {
      const confetti = generateConfetti(DEFAULT_COLORS)
      const now = Date.now()
      const nextConfettis = confettis.filter((sp) => {
        const delta = now - sp.createdAt
        return delta < 1600
      })
      nextConfettis.push(confetti)
      setConfettis(nextConfettis)
    },
    prefersReducedMotion || disabled ? null : 50,
    prefersReducedMotion || disabled ? null : 250
  )

  const onClick = useCallback(() => {
    if (soundMode) {
      playOff()
    } else {
      playOn()
    }
    setDisabled((d) => !d)
  }, [soundMode, playOff, playOn])

  return (
    <Wrapper {...delegated} onClick={onClick}>
      {confettis.map((confetti) => (
        <Confetti
          key={confetti.id}
          color={confetti.color}
          size={confetti.size}
          style={confetti.style}
          speed={confetti.speed}
          wind={confetti.wind}
          path={confetti.path}
          rotation={confetti.rotation}
        />
      ))}
      <ChildWrapper>{children}</ChildWrapper>
    </Wrapper>
  )
}
const Confetti = ({
  size,
  color,
  speed,
  rotation,
  wind,
  path,
  style,
}: {
  size: number
  color: string
  speed: number
  rotation: number
  wind: number
  path: string
  style: {
    top: CSSProperties['top']
    left: CSSProperties['left']
  }
}) => {
  return (
    <ConfettiWrapper style={style} speed={speed}>
      <FallWrapper speed={speed} wind={wind}>
        <ConfettiSvg
          speed={speed}
          rotation={rotation}
          width={size}
          height={size}
          viewBox="0 0 68 68"
          fill="none"
        >
          <path d={path} fill={color} />
        </ConfettiSvg>
      </FallWrapper>
    </ConfettiWrapper>
  )
}
const comeInOut = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`
const spin = (props: { rotation: number }) => keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(${props.rotation}deg);
  }
`
const fall = (p: { wind: number }) => keyframes`
  0% {
    transform: translateY(0px) translateX(0px);
  }
  100% {
    transform: translateY(15px) translateX(${p.wind}px);
  }
`
const Wrapper = styled.span`
  display: inline-block;
  position: relative;
  cursor: pointer;
`

const ConfettiWrapper = styled.span.attrs<{ speed: number }>((props) => ({
  style: {
    animationDuration: `${props.speed}ms`,
  },
}))<{ speed: number }>`
  position: absolute;
  display: block;
  z-index: 2;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${comeInOut} forwards;
  }
`

const FallWrapper = styled.span.attrs<{ speed: number }>((props) => ({
  style: {
    animationDuration: `${props.speed}ms`,
  },
}))<{ wind: number; speed: number }>`
  display: block;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${fall} linear forwards;
  }
`

const ChildWrapper = styled.strong`
  position: relative;
  z-index: 1;
  font-weight: bold;
`

const ConfettiSvg = styled.svg.attrs((props) => ({
  style: {
    animationDuration: `${props.speed}ms`,
  },
}))`
  display: block;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} linear;
  }
`

export default Confettis
