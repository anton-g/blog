import { HTMLMotionProps, motion } from 'framer-motion'
import { useRef } from 'react'
import styled from 'styled-components'

export const Puzzle = () => {
  const ref = useRef<HTMLDivElement>(null)

  const pieceProps: HTMLMotionProps<'img'> = {
    drag: true,
    dragMomentum: false,
    dragConstraints: ref,
  }

  return (
    <Wrapper ref={ref}>
      <Inner>
        <Piece src="/puzzle/piece-1.png" {...pieceProps}></Piece>
        <Piece src="/puzzle/piece-2.png" {...pieceProps}></Piece>
        <Piece src="/puzzle/piece-3.png" {...pieceProps}></Piece>
        <Piece src="/puzzle/piece-4.png" {...pieceProps}></Piece>
        <Piece src="/puzzle/piece-5.png" {...pieceProps}></Piece>
        <Piece src="/puzzle/piece-6.png" {...pieceProps}></Piece>
        <Piece src="/puzzle/piece-7.png" {...pieceProps}></Piece>
        <Piece src="/puzzle/piece-8.png" {...pieceProps}></Piece>
        <Piece src="/puzzle/piece-9.png" {...pieceProps}></Piece>
        <Piece src="/puzzle/piece-10.png" {...pieceProps}></Piece>
        <Piece src="/puzzle/piece-11.png" {...pieceProps}></Piece>
        <Piece src="/puzzle/piece-12.png" {...pieceProps}></Piece>
        <Piece src="/puzzle/piece-13.png" {...pieceProps}></Piece>
        <Piece src="/puzzle/piece-14.png" {...pieceProps}></Piece>
        <Piece src="/puzzle/piece-15.png" {...pieceProps}></Piece>
        <Piece src="/puzzle/piece-16.png" {...pieceProps}></Piece>
      </Inner>
      <Text>🤔</Text>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  min-width: 450px;
  max-width: 450px;
  height: 450px;
  padding: 45px;
  position: relative;
`

const Inner = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

const Piece = styled(motion.img)`
  display: block;
`

const Text = styled.p`
  text-align: center;
  font-size: 24px;
  padding: 0;
  margin: 0;
`
