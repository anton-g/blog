import styled, { css } from 'styled-components'
import { useSpring, animated } from '@react-spring/web'
import { MouseEventHandler } from 'react'
import useDimensions from '../hooks/useDimensions'

export const Achievement = ({
  variant,
  locked,
}: {
  variant: 'birb' | 'eggo' | 'space' | 'balloon' | 'barrel'
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
    case 'barrel':
      return <BarrelAchievement locked={locked} />
  }
}

const Base = styled(animated.li)<{ $locked: boolean }>`
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

  --red: #f80e7b;
  --yel: #eedf10;
  --gre: #21e985;
  --blu: #0dbde9;
  --vio: #c929f1;
  --pos: 50% 50%;
  --space: 5%;
  --angle: 133deg;
  --imgsize: 10%;
  --posx: 50%;
  --posy: 50%;
  --hyp: 0;
  --o: 0;

  ${({ $locked }) =>
    $locked &&
    css`
      user-select: none !important;
      filter: blur(3px) grayscale(80%);

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

  ${({ $locked }) =>
    !$locked &&
    css`
      &:hover {
        box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
        --o: 1;
      }
    `}
`

const BirbAchievement = ({ locked }: { locked: boolean }) => {
  const { ref, attributes } = use3dEffect(locked)

  return (
    <BirbWrapper $locked={locked} ref={ref} {...attributes}>
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
      <Shine />
    </BirbWrapper>
  )
}

const BirbWrapper = styled(Base)`
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%231e9cf1' fill-opacity='0.18' fill-rule='evenodd'/%3E%3C/svg%3E"),
    linear-gradient(
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
  const { ref, attributes } = use3dEffect(locked)

  return (
    <EggWrapper $locked={locked} ref={ref} {...attributes}>
      <h2>Egghead</h2>
      <p>Mr Holmes, I presume?</p>
      <Shine />
    </EggWrapper>
  )
}

const EggWrapper = styled(Base)`
  background-color: gold;
`

const SpaceAchievement = ({ locked }: { locked: boolean }) => {
  const { ref, attributes } = use3dEffect(locked)

  return (
    <SpaceWrapper $locked={locked} ref={ref} {...attributes}>
      <h2>Stargazer</h2>
      <p>?????????????</p>
      <Shine />
    </SpaceWrapper>
  )
}

const SpaceWrapper = styled(Base)`
  background-color: darkslategray;
`

const BarrelAchievement = ({ locked }: { locked: boolean }) => {
  const { ref, attributes } = use3dEffect(locked)

  return (
    <BarrelWrapper $locked={locked} ref={ref} {...attributes}>
      <svg
        width="38"
        height="164"
        viewBox="0 0 190 823"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6923 110.979L16.4885 102.978C16.4874 98.411 21.1239 95.3592 21.1239 95.3592L34.0934 85.513L34.215 74.079C34.2679 68.0441 41.5932 69.8709 41.9745 72.6438L42.4576 79.06L57.0196 69.0511L56.326 60.0171C55.4538 50.2305 63.5713 51.7157 64.388 56.5547L65.1041 62.6602L85.9718 46.6095C86.5625 15.4563 86.7034 2.6377 94.6454 2.22745C102.639 1.81457 102.758 16.8038 103.2 46.1631L124.852 62.5658L125.496 55.4742C125.875 51.2879 132.982 50.2879 132.767 58.4431L132.466 68.7817L147.165 78.9918L147.933 73.1119C148.529 67.8383 155.186 67.3663 155.46 75.5761L155.501 86.1788C155.447 86.5594 168.149 95.3787 168.149 95.3787C174.62 99.4579 173.573 104.359 173.573 104.359L173.109 111.148L120.4 85.9918C115.832 83.7072 109.218 82.8797 104.826 88.1553C102.543 90.9819 100.448 101.794 100.612 103.697L100.044 133.012C99.9355 133.664 121.028 149.399 121.028 149.399C121.572 149.943 123.051 160.896 123.051 160.896L96.7244 153.502L94.2249 160.353L92.7007 153.361L66.0285 160.781L67.7426 149.712C71.4935 147.375 89.2471 133.211 89.4101 132.722C89.4101 132.722 89.5114 106.832 89.4735 105.31C89.2539 96.5024 89.0123 93.3711 87.4349 90.4892C85.8562 87.6049 81.474 85.4468 70.594 88.0461C55.5891 91.6308 16.6923 110.979 16.6923 110.979Z"
          fill="black"
        />
        <path
          d="M17 124C17 290.405 172 376.542 172 467.119C172 557.696 17 650.213 17 823M172 124C172 290.405 17 376.542 17 467.119C17 557.696 172 650.213 172 823"
          stroke="black"
          stroke-width="4"
        />
      </svg>

      <h2>What a maneuver</h2>
      <p>You spun me right round baby, right round</p>
      <Shine />
    </BarrelWrapper>
  )
}

const BarrelWrapper = styled(Base)`
  background-color: #ff4800;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23d80800' fill-opacity='0.15'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E"),
    linear-gradient(
      280deg,
      hsl(17deg 100% 50%) 0%,
      hsl(16deg 100% 53%) 2%,
      hsl(16deg 100% 55%) 8%,
      hsl(16deg 100% 56%) 18%,
      hsl(16deg 100% 58%) 35%,
      hsl(16deg 100% 59%) 60%,
      hsl(16deg 100% 60%) 81%,
      hsl(17deg 100% 62%) 93%,
      hsl(17deg 100% 63%) 99%,
      hsl(17deg 100% 64%) 100%
    );

  > svg {
    position: absolute;
    top: -24px;
    left: 24px;
    z-index: -1;
    transform: rotateZ(60deg);
  }
`

const BalloonAchievement = ({ locked }: { locked: boolean }) => {
  const { ref, attributes } = use3dEffect(locked)

  return (
    <BalloonWrapper $locked={locked} ref={ref} {...attributes}>
      <O>o</O>
      <h2>Pop pop!</h2>
      <p>You just had to push the limit, didn&apos;t you?</p>
      <Shine />
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

const hypTrans = (mx: number, my: number) => {
  const x = Math.min(Math.max(mx / 100, 0), 1)
  const y = Math.min(Math.max(my / 100, 0), 1)

  const hypX = -(4 * (x - 1)) * x
  const hypY = -(4 * (y - 1)) * y

  return Math.abs(hypX + hypY - 2)
}

type EffectOptions = {
  hypModifier: number
}
const defaultOptions = {
  hypModifier: 0.4,
}
const use3dEffect = (
  disabled: boolean,
  options: EffectOptions = defaultOptions
) => {
  const [ref, dimensions] = useDimensions()
  const [props, api] = useSpring(() => ({
    xys: [0, 0, 1],
    mxy: [0, 0],
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  const calc = (x: number, y: number) => {
    const movement = dimensions
      ? [
          -((y - (dimensions.top + dimensions.height / 2)) / 3), // todo include parent scroll?
          (x - (dimensions.left + dimensions.width / 2)) / 30,
          1.05,
        ]
      : [0, 0, 1]

    const mx = Math.abs((dimensions!.left - x) / dimensions!.width) * 100
    const my = Math.abs((dimensions!.top - y) / dimensions!.height) * 100

    return { movement, mx, my }
  }

  const onMouseMove: MouseEventHandler<HTMLElement> = ({
    clientX: x,
    clientY: y,
  }) => {
    if (disabled) return

    const r = calc(x, y)

    api.start({ xys: r.movement, mxy: [r.mx, r.my] })
  }

  const onMouseLeave: MouseEventHandler<HTMLElement> = () =>
    api.start({ xys: [0, 0, 1] })

  const style = {
    transform: props.xys.to(trans),
    '--posy': props.mxy.to((mx, my) => `${my}%`),
    '--posx': props.mxy.to((mx) => `${mx / 4}%`),
    '--hyp': props.mxy.to((mx, my) => hypTrans(mx, my) * options.hypModifier),
  }

  return { ref, attributes: { onMouseMove, onMouseLeave, style } }
}

const Shine = styled.div`
  position: absolute;
  inset: -50%;
  mix-blend-mode: color-dodge;
  background-image: url(https://res.cloudinary.com/simey/image/upload/Dev/PokemonCards/illusion.webp),
    repeating-linear-gradient(
      0deg,
      rgb(255, 119, 115) calc(var(--space) * 1),
      rgba(255, 237, 95, 1) calc(var(--space) * 2),
      rgba(168, 255, 95, 1) calc(var(--space) * 3),
      rgba(131, 255, 247, 1) calc(var(--space) * 4),
      rgba(120, 148, 255, 1) calc(var(--space) * 5),
      rgb(216, 117, 255) calc(var(--space) * 6),
      rgb(255, 119, 115) calc(var(--space) * 7)
    ),
    repeating-linear-gradient(
      var(--angle),
      #0e152e 0%,
      hsl(180, 10%, 60%) 3.8%,
      hsl(180, 29%, 66%) 4.5%,
      hsl(180, 10%, 60%) 5.2%,
      #0e152e 10%,
      #0e152e 12%
    );
  background-blend-mode: exclusion, hue, hard-light;
  background-size: var(--imgsize), 200% 700%, 300%;
  background-position: center, 0% var(--posy), var(--posx) var(--posy);
  filter: brightness(calc((var(--hyp) * 0.3) + 0.5)) contrast(2) saturate(1.5);
  -webkit-filter: brightness(calc((var(--hyp) * 0.3) + 0.5)) contrast(2)
    saturate(1.5);
  display: grid;
  grid-area: 1/1;
  opacity: var(--o);

  transition: opacity 350ms;

  &:after {
    content: ' ';
    visibility: visible;
    --space: 5%;
    --angle: 133deg;
    --imgsize: 10%;
    width: 100%;
    mix-blend-mode: exclusion;
    background-image: url(https://res.cloudinary.com/simey/image/upload/Dev/PokemonCards/illusion.webp),
      repeating-linear-gradient(
        0deg,
        rgb(255, 119, 115) calc(var(--space) * 1),
        rgba(255, 237, 95, 1) calc(var(--space) * 2),
        rgba(168, 255, 95, 1) calc(var(--space) * 3),
        rgba(131, 255, 247, 1) calc(var(--space) * 4),
        rgba(120, 148, 255, 1) calc(var(--space) * 5),
        rgb(216, 117, 255) calc(var(--space) * 6),
        rgb(255, 119, 115) calc(var(--space) * 7)
      ),
      repeating-linear-gradient(
        var(--angle),
        #0e152e 0%,
        hsl(180, 10%, 60%) 3.8%,
        hsl(180, 29%, 66%) 4.5%,
        hsl(180, 10%, 60%) 5.2%,
        #0e152e 10%,
        #0e152e 12%
      );
    background-blend-mode: exclusion, hue, hard-light, exclusion;
    background-size: var(--imgsize), 200% 400%, 195%, 200%;
    background-position: center, 0% var(--posy),
      calc(var(--posx) * -1) calc(var(--posy) * -1), var(--posx) var(--posy);
    filter: brightness(calc((var(--hyp) * 0.5) + 0.8)) contrast(1.6)
      saturate(1.4);
    -webkit-filter: brightness(calc((var(--hyp) * 0.5) + 0.8)) contrast(1.6)
      saturate(1.4);
    display: grid;
    grid-area: 1/1;
  }
`
