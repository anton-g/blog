import { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'
import { Spacer } from './Spacer'

export const BlogRoll = () => {
  return (
    <Wrapper>
      <Title>BlogRoll:</Title>
      <Marquee>
        •
        <Spacer size={16} inline />
        <Link href="https://sara.fail">Sara Vieira</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://www.atrost.com">Alex Trost</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://cassidoo.co">Cassidy Williams</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://wattenberger.com">Amelia Wattenberger</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://www.joshwcomeau.com">Josh W. Comeau</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://kitze.io">Kitze</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://www.sarasoueidan.com">Sara Soueidan</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://theworst.dev">Kurt Kemple</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://twitter.com/tkomstadius">Therése Komstadius</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://charliegerard.dev">Charlie Gerard</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://huangxuan.me">Xuan Huang</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://erikras.com">Erik Rasmussen</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://seldo.com">Laurie Voss</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://hakim.se">Hakim El Hattab</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://bruno-simon.com">Bruno Simon</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="http://rachelnabors.com">Rachel Lee Nabors</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://www.irisclasson.com">Iris Classon</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="https://www.barbarianmeetscoding.com">Jaime González García</Link>
        <Spacer size={16} inline />
        •
        <Spacer size={16} inline />
        <Link href="http://www.bjoreman.com">Fredrik Björeman</Link>
        <Spacer size={16} inline />•
      </Marquee>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.gray12};
  color: ${({ theme }) => theme.colors.gray1};
  font-size: 2rem;
  font-family: 'Abril Fatface';
  letter-spacing: 1px;
  display: flex;
  align-items: center;
`

const Title = styled.span`
  padding-left: 8px;
  padding-right: 16px;
  user-select: none;
  cursor: grab;
`

const Link = styled.a`
  &:hover {
    text-decoration: underline ${({ theme }) => theme.colors.primary11} wavy;
    text-decoration-skip-ink: none;
  }
`

const Marquee = ({ children }: { children: ReactNode }) => {
  return (
    <MarqueeWrapper>
      <MarqueeInner>{children}</MarqueeInner>
    </MarqueeWrapper>
  )
}

const MarqueeWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
`

const marquee = keyframes`
  0% { transform: translateX(101vw); }
  100% { transform: translateX(-100%); }
`

const MarqueeInner = styled.div`
  display: block;
  width: max-content;

  position: absolute;
  overflow: hidden;

  animation: ${marquee} 70s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`
