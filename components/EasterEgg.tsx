// React implementation of https://frontend.horse/articles/generative-grids/
import { useId, useState } from 'react'
import { motion } from 'framer-motion'
// @ts-ignore
import { random, seedPRNG } from '@georgedoescode/generative-utils'
import styled from 'styled-components'

const squareSize = 100

const animationTime = 2

type EasterEggProps = {
  seed: number
}
export const EasterEgg = ({ seed }: EasterEggProps) => {
  seedPRNG(seed)

  return (
    <Container>
      <Grid key={seed} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 450px;

  svg {
    width: 100%;
    aspect-ratio: 1;

    rect {
      transform-box: fill-box;
      transform-origin: center;
    }

    text {
      transform-box: fill-box;
      transform-origin: center;
    }

    shape-rendering: crispedges;
  }
`

const EggMask = () => {
  return (
    <defs>
      <mask id="eggMask">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 246 371"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M122.996 370.995C98.1761 371.09 72.9021 364.785 52.7021 350.317C29.9411 334.015 15.0161 308.364 7.43409 281.355C-2.75792 245.05 -0.608716 206.248 6.76624 169.265C14.545 130.256 28.1022 92.2911 48.0552 57.9051C56.3182 43.6691 65.8122 29.8951 78.2952 19.1931C90.7792 8.49105 106.575 1.02604 122.995 0.993037C139.358 0.960036 155.136 8.31213 167.631 18.911C180.127 29.509 189.658 43.189 197.935 57.351C217.994 91.672 231.462 129.686 239.224 168.711C246.583 205.7 248.79 244.508 238.556 280.801C230.862 308.089 215.625 333.936 192.552 350.316C172.499 364.552 147.559 370.9 122.994 370.994L122.996 370.995Z"
            fill="white"
          />
        </svg>
      </mask>
      <filter id="glow">
        <feGaussianBlur stdDeviation="5" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="2" />
        </feComponentTransfer>
        <feBlend in2="SourceGraphic" />
      </filter>
    </defs>
  )
}

const Grid = () => {
  const [numRows] = useState(15)
  const [numCols] = useState(20)
  const colors = random(colorPalettes) as string[]

  const showFilter = random(0, 1) < 0.3
  const filter = showFilter ? random(filters) : null

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox={`0 0 ${numRows * squareSize} ${numCols * squareSize}`}
      id="easter-egg-svg"
    >
      <EggMask />
      {filter}
      <g mask="url(#eggMask)" filter={filter ? 'url(#filter)' : undefined}>
        <SmallBlocks numRows={numRows} numCols={numCols} colors={colors} />
        <BigBlock numRows={numRows} numCols={numCols} colors={colors} />
      </g>
    </svg>
  )
}

type SmallBlocksProps = {
  numRows: number
  numCols: number
  colors: string[]
}
const SmallBlocks = ({ numRows, numCols, colors }: SmallBlocksProps) => {
  const coordinates = []
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      coordinates.push({ x: i * squareSize, y: j * squareSize })
    }
  }

  return (
    <>
      {coordinates.map((coord) => (
        <SmallBlock
          key={`${coord.x}${coord.y}}`}
          x={coord.x}
          y={coord.y}
          colors={colors}
        />
      ))}
    </>
  )
}

type SmallBlockProps = {
  x: number
  y: number
  colors: string[]
}
const SmallBlock = ({ x, y, colors }: SmallBlockProps) => {
  const { foreground, background } = getTwoColors(colors)

  const decorationCollection = random([
    [Cross, Dots],
    [HalfSquare, DiagonalSquare, Cross, Dots],
    [QuarterCircle, OppositeCircles, Circle],
  ])

  const Decoration = random(decorationCollection)

  return (
    <motion.g
      style={{
        willChange: 'opacity',
      }}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        type: 'spring',
        delay: random(0, animationTime),
      }}
    >
      <rect
        height={squareSize}
        width={squareSize}
        fill={background}
        x={x}
        y={y}
      />
      <Decoration
        x={x}
        y={y}
        foreground={foreground}
        background={background}
        squareSize={squareSize}
      />
    </motion.g>
  )
}

type BigBlockProps = {
  numRows: number
  numCols: number
  colors: string[]
}
const BigBlock = ({ colors, numRows, numCols }: BigBlockProps) => {
  const { foreground, background } = getTwoColors(colors)

  const Decoration = random([
    HalfSquare,
    DiagonalSquare,
    QuarterCircle,
    OppositeCircles,
    Circle,
    Cross,
    Dots,
  ])

  const multiplier = random([1, 2, 3, 4])
  const bigSquareSize = multiplier * squareSize
  const x = random(0, numRows - multiplier, true) * squareSize
  const y = random(0, numCols - multiplier, true) * squareSize

  return (
    <motion.g
      style={{
        willChange: 'opacity',
      }}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        type: 'spring',
        delay: random(animationTime - 1, animationTime),
      }}
    >
      <rect
        height={bigSquareSize}
        width={bigSquareSize}
        fill={background}
        x={x}
        y={y}
      />
      <Decoration
        x={x}
        y={y}
        foreground={foreground}
        background={background}
        squareSize={bigSquareSize}
      />
    </motion.g>
  )
}

type DecorationProps = {
  x: number
  y: number
  squareSize: number
  colors: string[]
  foreground: string
  background: string
}
const Circle = ({
  x,
  y,
  foreground,
  background,
  squareSize,
}: DecorationProps) => {
  const circleRadius = squareSize / 2

  const showInner = random(0, 1) < 0.3
  return (
    <g>
      <circle
        r={circleRadius}
        fill={foreground}
        cx={x + circleRadius}
        cy={y + circleRadius}
      />
      {showInner && (
        <circle
          r={circleRadius / 2}
          fill={background}
          cx={x + circleRadius}
          cy={y + circleRadius}
        />
      )}
    </g>
  )
}

const Cross = ({ x, y, foreground, squareSize }: DecorationProps) => {
  const width = squareSize / 1.5
  const height = squareSize / 5
  return (
    <g>
      <rect
        width={width}
        height={height}
        fill={foreground}
        x={x + width / 4}
        y={y + height * 2}
      />
      <rect
        width={width}
        height={height}
        fill={foreground}
        x={x + width / 4}
        y={y + height * 2}
        transform="rotate(90)"
      />
    </g>
  )
}

const Dots = ({ x, y, foreground, squareSize }: DecorationProps) => {
  const size = random([2, 3, 4])
  const offset = squareSize / 10
  const circleSize = squareSize / 10

  const space = (squareSize - offset * 2 - circleSize) / (size - 1)

  const dotCoordinates = []
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cx = x + offset + i * space + circleSize / 2
      const cy = y + offset + j * space + circleSize / 2
      dotCoordinates.push({ x: cx, y: cy })
    }
  }

  return (
    <g>
      {dotCoordinates.map((coord) => (
        <circle
          key={`${coord.x}${coord.y}`}
          r={circleSize / 2}
          cx={coord.x}
          cy={coord.y}
          fill={foreground}
        />
      ))}
    </g>
  )
}

const OppositeCircles = ({ x, y, foreground, squareSize }: DecorationProps) => {
  const id = useId()
  const maskId = `mask-${id}`

  const circleRadius = squareSize / 2

  const positions = random([
    [x, y, x + squareSize, y + squareSize],
    [x, y + squareSize, x + squareSize, y],
  ])

  return (
    <>
      <defs>
        <SquareMask x={x} y={y} id={maskId} squareSize={squareSize} />
      </defs>
      <g mask={`url('#${maskId}'`}>
        <circle
          r={circleRadius}
          fill={foreground}
          cx={positions[0]}
          cy={positions[1]}
        />
        <circle
          r={circleRadius}
          fill={foreground}
          cx={positions[2]}
          cy={positions[3]}
        />
      </g>
    </>
  )
}

const QuarterCircle = ({
  x,
  y,
  foreground,
  background,
  squareSize,
}: DecorationProps) => {
  const id = useId()
  const maskId = `mask-${id}`

  const xOffset = squareSize * random([0, 1], true)
  const yOffset = squareSize * random([0, 1], true)
  const circleRadius = squareSize

  const showInner = random(0, 1) < 0.6
  return (
    <>
      <defs>
        <SquareMask x={x} y={y} id={maskId} squareSize={squareSize} />
      </defs>
      <g mask={`url(#${maskId})`}>
        <circle
          r={circleRadius}
          fill={foreground}
          cx={x + xOffset}
          cy={y + yOffset}
        />
        {showInner && (
          <circle
            r={circleRadius / 2}
            fill={background}
            cx={x + xOffset}
            cy={y + yOffset}
          />
        )}
      </g>
    </>
  )
}

const DiagonalSquare = ({ x, y, foreground, squareSize }: DecorationProps) => {
  const rightLeaning = `${x},${y} ${x},${y + squareSize}, ${
    x + squareSize
  },${y}`
  const leftLeaning = `${x},${y} ${x + squareSize},${y} ${x + squareSize},${
    y + squareSize
  }`
  const polygonPoints = random(0, 1) < 0.5 ? rightLeaning : leftLeaning

  return (
    <g>
      <polygon points={polygonPoints} fill={foreground} />
    </g>
  )
}

const HalfSquare = ({ x, y, foreground, squareSize }: DecorationProps) => {
  let halfX = 2
  let halfY = 2
  if (random([0, 1])) {
    halfX = 1
  } else {
    halfY = 1
  }

  return (
    <g>
      <rect
        width={squareSize / halfX}
        height={squareSize / halfY}
        fill={foreground}
        x={x}
        y={y}
      />
    </g>
  )
}

const SquareMask = ({
  id,
  x,
  y,
  squareSize,
}: {
  id: string
  x: number
  y: number
  squareSize: number
}) => {
  return (
    <mask id={id}>
      <rect width={squareSize} height={squareSize} fill={'#fff'} x={x} y={y} />
    </mask>
  )
}

const getTwoColors = function getTwoColors(colors: string[]) {
  let colorList = [...colors]
  // Get random index for this array of colors
  const colorIndex = random(0, colorList.length - 1, true)
  // Set the background to the color at that array
  const background = colorList[colorIndex]
  // Remove that color from the options
  colorList.splice(colorIndex, 1)
  // Set the foreground to any other color in the array
  const foreground = random(colorList)

  return { foreground, background }
}

const colorPalettes = [
  ['#69d2e7', '#a7dbd8', '#e0e4cc', '#f38630', '#fa6900'],
  ['#fe4365', '#fc9d9a', '#f9cdad', '#c8c8a9', '#83af9b'],
  ['#ecd078', '#d95b43', '#c02942', '#542437', '#53777a'],
  ['#556270', '#4ecdc4', '#c7f464', '#ff6b6b', '#c44d58'],
  ['#774f38', '#e08e79', '#f1d4af', '#ece5ce', '#c5e0dc'],
  ['#e8ddcb', '#cdb380', '#036564', '#033649', '#031634'],
  ['#490a3d', '#bd1550', '#e97f02', '#f8ca00', '#8a9b0f'],
  ['#594f4f', '#547980', '#45ada8', '#9de0ad', '#e5fcc2'],
  ['#00a0b0', '#6a4a3c', '#cc333f', '#eb6841', '#edc951'],
  ['#3fb8af', '#7fc7af', '#dad8a7', '#ff9e9d', '#ff3d7f'],
  ['#efffcd', '#dce9be', '#555152', '#2e2633', '#99173c'],
  ['#343838', '#005f6b', '#008c9e', '#00b4cc', '#00dffc'],
  ['#ff4e50', '#fc913a', '#f9d423', '#ede574', '#e1f5c4'],
  ['#99b898', '#fecea8', '#ff847c', '#e84a5f', '#2a363b'],
  ['#655643', '#80bca3', '#f6f7bd', '#e6ac27', '#bf4d28'],
  ['#00a8c6', '#40c0cb', '#f9f2e7', '#aee239', '#8fbe00'],
  ['#351330', '#424254', '#64908a', '#e8caa4', '#cc2a41'],
  ['#554236', '#f77825', '#d3ce3d', '#f1efa5', '#60b99a'],
  ['#8c2318', '#5e8c6a', '#88a65e', '#bfb35a', '#f2c45a'],
  ['#fad089', '#ff9c5b', '#f5634a', '#ed303c', '#3b8183'],
  ['#ff4242', '#f4fad2', '#d4ee5e', '#e1edb9', '#f0f2eb'],
  ['#f8b195', '#f67280', '#c06c84', '#6c5b7b', '#355c7d'],
  ['#1b676b', '#519548', '#88c425', '#bef202', '#eafde6'],
  ['#5e412f', '#fcebb6', '#78c0a8', '#f07818', '#f0a830'],
  ['#bcbdac', '#cfbe27', '#f27435', '#f02475', '#3b2d38'],
  ['#452632', '#91204d', '#e4844a', '#e8bf56', '#e2f7ce'],
  ['#eee6ab', '#c5bc8e', '#696758', '#45484b', '#36393b'],
  ['#f0d8a8', '#3d1c00', '#86b8b1', '#f2d694', '#fa2a00'],
  ['#2a044a', '#0b2e59', '#0d6759', '#7ab317', '#a0c55f'],
  ['#f04155', '#ff823a', '#f2f26f', '#fff7bd', '#95cfb7'],
  ['#b9d7d9', '#668284', '#2a2829', '#493736', '#7b3b3b'],
  ['#b3cc57', '#ecf081', '#ffbe40', '#ef746f', '#ab3e5b'],
  ['#a3a948', '#edb92e', '#f85931', '#ce1836', '#009989'],
  ['#300030', '#480048', '#601848', '#c04848', '#f07241'],
  ['#e8d5b7', '#0e2430', '#fc3a51', '#f5b349', '#e8d5b9'],
  ['#607848', '#789048', '#c0d860', '#f0f0d8', '#604848'],
  ['#3e4147', '#fffedf', '#dfba69', '#5a2e2e', '#2a2c31'],
  ['#fc354c', '#29221f', '#13747d', '#0abfbc', '#fcf7c5'],
  ['#cc0c39', '#e6781e', '#c8cf02', '#f8fcc1', '#1693a7'],
  ['#1c2130', '#028f76', '#b3e099', '#ffeaad', '#d14334'],
  ['#a7c5bd', '#e5ddcb', '#eb7b59', '#cf4647', '#524656'],
  ['#dad6ca', '#1bb0ce', '#4f8699', '#6a5e72', '#563444'],
  ['#5c323e', '#a82743', '#e15e32', '#c0d23e', '#e5f04c'],
  ['#230f2b', '#f21d41', '#ebebbc', '#bce3c5', '#82b3ae'],
  ['#3a111c', '#574951', '#83988e', '#bcdea5', '#e6f9bc'],
  ['#5e3929', '#cd8c52', '#b7d1a3', '#dee8be', '#fcf7d3'],
  ['#1c0113', '#6b0103', '#a30006', '#c21a01', '#f03c02'],
  ['#382f32', '#ffeaf2', '#fcd9e5', '#fbc5d8', '#f1396d'],
  ['#e3dfba', '#c8d6bf', '#93ccc6', '#6cbdb5', '#1a1f1e'],
  ['#f6f6f6', '#e8e8e8', '#333333', '#990100', '#b90504'],
  ['#1b325f', '#9cc4e4', '#e9f2f9', '#3a89c9', '#f26c4f'],
  ['#2d2d29', '#215a6d', '#3ca2a2', '#92c7a3', '#dfece6'],
  ['#cfffdd', '#b4dec1', '#5c5863', '#a85163', '#ff1f4c'],
  ['#9dc9ac', '#fffec7', '#f56218', '#ff9d2e', '#919167'],
  ['#4e395d', '#827085', '#8ebe94', '#ccfc8e', '#dc5b3e'],
  ['#a8a7a7', '#cc527a', '#e8175d', '#474747', '#363636'],
  ['#f8edd1', '#d88a8a', '#474843', '#9d9d93', '#c5cfc6'],
  ['#046d8b', '#309292', '#2fb8ac', '#93a42a', '#ecbe13'],
  ['#f38a8a', '#55443d', '#a0cab5', '#cde9ca', '#f1edd0'],
  ['#a70267', '#f10c49', '#fb6b41', '#f6d86b', '#339194'],
  ['#ff003c', '#ff8a00', '#fabe28', '#88c100', '#00c176'],
  ['#ffedbf', '#f7803c', '#f54828', '#2e0d23', '#f8e4c1'],
  ['#4e4d4a', '#353432', '#94ba65', '#2790b0', '#2b4e72'],
  ['#0ca5b0', '#4e3f30', '#fefeeb', '#f8f4e4', '#a5b3aa'],
  ['#fffbb7', '#a6f6af', '#66b6ab', '#5b7c8d', '#4f2958'],
  ['#30261c', '#403831', '#36544f', '#1f5f61', '#0b8185'],
  ['#aaff00', '#ffaa00', '#ff00aa', '#aa00ff', '#00aaff'],
  ['#d1313d', '#e5625c', '#f9bf76', '#8eb2c5', '#615375'],
  ['#73c8a9', '#dee1b6', '#e1b866', '#bd5532', '#373b44'],
]

const filters = [
  <filter
    key="filter"
    id="filter"
    width="140%"
    height="140%"
    filterUnits="objectBoundingBox"
    primitiveUnits="userSpaceOnUse"
    colorInterpolationFilters="linearRGB"
  >
    <feMorphology
      operator="erode"
      radius="15 15"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      in="SourceGraphic"
      result="morphology"
    />
  </filter>,
  <filter
    key="filter"
    id="filter"
    width="140%"
    height="140%"
    filterUnits="objectBoundingBox"
    primitiveUnits="userSpaceOnUse"
    colorInterpolationFilters="linearRGB"
  >
    <feDisplacementMap
      in="SourceGraphic"
      in2="SourceGraphic"
      scale="40"
      xChannelSelector="R"
      yChannelSelector="B"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      result="displacementMap"
    />
  </filter>,
]
