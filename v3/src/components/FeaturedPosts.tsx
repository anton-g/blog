import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Spacer } from './Spacer'
import { animated, useSpring, config } from '@react-spring/web'

export const FeaturedPosts = () => {
  const [ref, hover] = useHover<HTMLAnchorElement>()

  return (
    <Wrapper>
      <Heading>Selected writing</Heading>
      <Posts>
        <Link href="/posts/react-component-code-smells" passHref>
          <Post>React Component Code Smells</Post>
        </Link>
        <Spacer size={48} />
        <Link href="/posts/software-development-is-a-social-profession" passHref>
          <Post>Software Development is a Social Profession</Post>
        </Link>
        <Spacer size={48} />
        <Link href="/posts/render-props" passHref>
          <Post>Render Props in the Age of Hooks</Post>
        </Link>
      </Posts>
      <Link href="/posts" passHref>
        <AllPosts ref={ref}>
          All posts <Arrow hover={hover} />
        </AllPosts>
      </Link>
    </Wrapper>
  )
}

const Arrow = ({ hover }: { hover: boolean }) => {
  const length = 180
  const width = length - 14.5 + 17 + 38
  const margin = -(width - 17)

  const { first, second } = useSpring({
    first: hover
      ? `M1 5.25H.25v1.5H1v-1.5Zm${length} 1.5a.75.75 0 0 0 0-1.5v1.5ZM1 6.75h${length}v-1.5H1v1.5Z`
      : `M1 5.25H.25v1.5H1v-1.5Zm${14.5} 1.5a.75.75 0 0 0 0-1.5v1.5ZM1 6.75h${14.5}v-1.5H1v1.5Z`,
    second: hover
      ? `m${length - 3.5} 1 4.646 4.646a.5.5 0 0 1 0 .708L${length - 3.5} 11`
      : `m${11} 1 4.646 4.646a.5.5 0 0 1 0 .708L${11} 11`,
    config: config.wobbly,
  })

  return (
    <svg width={width} height="12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: margin }}>
      <animated.path d={first} fill="currentColor" />
      <animated.path d={second} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Posts = styled.div`
  display: flex;

  @media (max-width: 931px) {
    flex-direction: column;
  }
`

const Heading = styled.h2`
  font-weight: normal;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray12};
`

const Post = styled.a`
  font-family: 'Abril Fatface';
  font-size: 2rem;
  min-width: 280px;
  max-width: 280px;
  text-align: center;
  font-kerning: normal;
  letter-spacing: 1px;

  @media (min-width: 930px) {
    &:first-child {
      text-align: right;
    }

    &:last-child {
      text-align: left;
    }
  }

  &:hover {
    text-decoration: underline ${({ theme }) => theme.colors.primary11} wavy;
    text-decoration-skip-ink: none;
  }
`

const AllPosts = styled.a`
  margin-top: 48px;

  @media screen and (min-width: 1350px) {
    margin-top: 16px;
    align-self: flex-end;
  }
`

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
  }, [ref.current])
  return [ref, value] as const
}
