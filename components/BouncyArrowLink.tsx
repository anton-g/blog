import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { animated, useSpring, config } from '@react-spring/web'
import { useReducedMotion } from 'framer-motion'

export const BouncyArrowLink = ({
  text,
  href,
}: {
  text: string
  href: string
}) => {
  const [ref, hover] = useHover<HTMLAnchorElement>()

  return (
    <StyledLink href={href} ref={ref}>
      {text} <Arrow hover={hover} />
    </StyledLink>
  )
}
const StyledLink = styled(Link)`
  margin-top: 48px;
  align-self: flex-end;
  @media screen and (min-width: 1350px) {
    margin-top: 16px;
  }
`
const Arrow = ({ hover }: { hover: boolean }) => {
  const prefersReducedMotion = useReducedMotion()
  const length = 180
  const width = length - 14.5 + 17 + 38
  const margin = -(width - 17)

  const { first, second } = useSpring({
    immediate: prefersReducedMotion ?? false,
    first: hover
      ? `M1 5.25H.25v1.5H1v-1.5Zm${length} 1.5a.75.75 0 0 0 0-1.5v1.5ZM1 6.75h${length}v-1.5H1v1.5Z`
      : `M1 5.25H.25v1.5H1v-1.5Zm${14.5} 1.5a.75.75 0 0 0 0-1.5v1.5ZM1 6.75h${14.5}v-1.5H1v1.5Z`,
    second: hover
      ? `m${length - 3.5} 1 4.646 4.646a.5.5 0 0 1 0 .708L${length - 3.5} 11`
      : `m${11} 1 4.646 4.646a.5.5 0 0 1 0 .708L${11} 11`,
    config: config.wobbly,
  })

  return (
    <svg
      width={width}
      height="12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: margin }}
    >
      <animated.path d={first} fill="currentColor" />
      <animated.path
        d={second}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
function useHover<T>() {
  const [value, setValue] = useState<boolean>(false)
  const ref = useRef<T | null>(null)
  const handleMouseOver = (): void => setValue(true)
  const handleMouseOut = (): void => setValue(false)
  useEffect(() => {
    const node: any = ref.current
    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)
      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseout', handleMouseOut)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current])
  return [ref, value] as const
}
