import styled, { css } from 'styled-components'
import { useSpring, animated } from '@react-spring/web'
import { MouseEventHandler, useRef } from 'react'
import useDimensions from '../hooks/useDimensions'

export const Achievement = ({
  variant,
  locked,
}: {
  variant: 'birb' | 'eggo' | 'space' | 'balloon'
  locked: boolean
}) => {
  switch (variant) {
    case 'birb':
      return <BirbAchievement locked={locked} />
    case 'eggo':
      return <EggAchievement locked={locked} />
    case 'space':
      return <SpaceAchievement locked={locked} />
    case 'balloon':
      return <BalloonAchievement locked={locked} />
  }
}

const Base = styled(animated.li)<{ locked: boolean }>`
  border-radius: 8px;
  width: 100%;
  color: var(--color-gray1);
  font-family: var(--font-yeseva);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding-right: 24px;
  height: 80px;
  background: palevioletred;
  z-index: 1;
  transition: box-shadow 0.5s;
  will-change: transform;

  ${({ locked }) =>
    locked &&
    css`
      user-select: none !important;
      filter: blur(3px);

      > * {
        filter: blur(10px);
      }
    `}

  > h2 {
    font-size: 36px;
    margin: 0;
  }

  > p {
    margin: 0;
  }

  &:hover {
    box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
  }
`

const BirbAchievement = ({ locked }: { locked: boolean }) => {
  const { ref, attributes } = use3dEffect()

  return (
    <BirbWrapper locked={locked} ref={ref} {...attributes}>
      <svg
        width="160"
        height="100"
        viewBox="0 0 247 201"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 229.43 9.53262 239.35 3.65262C235.58 15.3426 227.69 25.2726 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z"
          fill="#1D9BF0"
        />
      </svg>
      <h2>The Birb</h2>
      <p>Look at you, friend of the animals!</p>
    </BirbWrapper>
  )
}

const BirbWrapper = styled(Base)`
  background-image: linear-gradient(
    80deg,
    hsl(206deg 100% 30%) 0%,
    hsl(206deg 95% 33%) 21%,
    hsl(206deg 91% 36%) 30%,
    hsl(206deg 87% 38%) 39%,
    hsl(206deg 84% 41%) 46%,
    hsl(206deg 82% 43%) 54%,
    hsl(205deg 81% 46%) 61%,
    hsl(205deg 80% 48%) 69%,
    hsl(205deg 80% 50%) 79%,
    hsl(204deg 88% 53%) 100%
  );
  z-index: 1;

  > svg {
    position: absolute;
    left: -24px;
    top: 16px;
    z-index: -1;
  }
`

const EggAchievement = ({ locked }: { locked: boolean }) => {
  const { ref, attributes } = use3dEffect()

  return (
    <EggWrapper locked={locked} ref={ref} {...attributes}>
      <h2>Egghead</h2>
      <p>Mr Holmes, I presume?</p>
    </EggWrapper>
  )
}

const EggWrapper = styled(Base)`
  background-color: gold;
`

const SpaceAchievement = ({ locked }: { locked: boolean }) => {
  const { ref, attributes } = use3dEffect()

  return (
    <SpaceWrapper locked={locked} ref={ref} {...attributes}>
      <h2>Moonwalker</h2>
      <p>Alright alright, there was no moon.</p>
    </SpaceWrapper>
  )
}

const SpaceWrapper = styled(Base)`
  background-color: palevioletred;
`

const BalloonAchievement = ({ locked }: { locked: boolean }) => {
  const { ref, attributes } = use3dEffect()

  return (
    <BalloonWrapper locked={locked} ref={ref} {...attributes}>
      <O>o</O>
      <h2>Balloon</h2>
      <p>You just had to push the limit, didn&apos;t you?</p>
    </BalloonWrapper>
  )
}

const BalloonWrapper = styled(Base)`
  background-image: linear-gradient(
    20deg,
    hsl(91deg 100% 82%) 0%,
    hsl(64deg 70% 70%) 11%,
    hsl(45deg 87% 66%) 22%,
    hsl(34deg 100% 66%) 33%,
    hsl(22deg 100% 66%) 44%,
    hsl(4deg 100% 69%) 56%,
    hsl(342deg 100% 64%) 67%,
    hsl(327deg 100% 57%) 78%,
    hsl(309deg 75% 49%) 89%,
    hsl(276deg 73% 55%) 100%
  );
`

const O = styled.div`
  position: absolute;
  bottom: 32px;
  left: -16px;
  color: var(--color-gray12);
  font-size: 200px;
  line-height: 0;
  user-select: none;
`

const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const use3dEffect = () => {
  const [ref, dimensions] = useDimensions()
  const [props, api] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  const calc = (x: number, y: number) =>
    dimensions
      ? [
          -(y - (dimensions.top + dimensions.height / 2)) / 3,
          (x - (dimensions.left + dimensions.width / 2)) / 30,
          1.05,
        ]
      : [0, 0, 1]

  const onMouseMove: MouseEventHandler<HTMLElement> = ({
    clientX: x,
    clientY: y,
  }) => api.start({ xys: calc(x, y) })
  const onMouseLeave: MouseEventHandler<HTMLElement> = () =>
    api.start({ xys: [0, 0, 1] })
  const style = { transform: props.xys.to(trans) }

  return { ref, attributes: { onMouseMove, onMouseLeave, style } }
}
