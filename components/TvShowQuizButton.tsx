import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled, { CSSProperties, keyframes } from 'styled-components'

export const TvShowQuiz = ({ style }: { style?: CSSProperties }) => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    // Workaround to avoid initial animation on page load
    const timeoutId = setTimeout(() => {
      setLoaded(true)
    }, 100)

    return clearTimeout(timeoutId)
  }, [])

  return (
    <Wrapper href="/" style={style}>
      <Border />
      <Line />
      <Button
        style={{
          left: 15,
          animationDelay: '0.5s',
        }}
      />
      <Button
        style={{
          left: 47,
          animationDelay: '0.6s',
        }}
      />
      <Button
        style={{
          left: 79,
          animationDelay: '0.7s',
        }}
      />
      <Button
        style={{
          left: 111,
          animationDelay: '0.8s',
        }}
      />
      <TvEffect>
        <InnerEffect disableAnimation={!loaded} />
      </TvEffect>
      <TvShow disableAnimation={!loaded}>
        TV Show
        <br />
        Ratings Quiz
      </TvShow>
    </Wrapper>
  )
}

const delayedAppear = keyframes`
  0% {
    opacity: 0;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const disappear = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const TvShow = styled.div<{ disableAnimation: boolean }>`
  color: var(--color-gray1);
  font-family: var(--font-abril);
  letter-spacing: 1px;
  white-space: nowrap;
  font-size: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  place-content: center;
  place-items: center;
  text-align: center;
  animation: ${delayedAppear} linear 600ms;
  animation-fill-mode: forwards;
  animation-duration: ${({ disableAnimation }) =>
    disableAnimation ? '0s' : '400ms'};
`

const Border = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  border: 8px solid var(--color-gray12);
`

const tvOn = keyframes`
  0% {
    transform: scaleX(0) scaleY(0);
  }

  25% {
    transform: scaleX(50) scaleY(1);
  }

  50% {
    transform: scaleX(150) scaleY(2);
  }

  100% {
    transform: scaleX(150) scaleY(110);
  }
`

const tvOff = keyframes`
  100% {
    transform: scaleX(0) scaleY(0);
  }

  50% {
    transform: scaleX(50) scaleY(1);
  }

  25% {
    transform: scaleX(150) scaleY(2);
  }

  0% {
    transform: scaleX(150) scaleY(110);
  }
`

const TvEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`

const InnerEffect = styled.div<{ disableAnimation: boolean }>`
  background-color: white;
  height: 1px;
  width: 1px;
  transform: scaleX(0) scaleY(0);

  animation: ${tvOff} linear 400ms;
  animation-fill-mode: forwards;
  animation-duration: ${({ disableAnimation }) =>
    disableAnimation ? '0s' : '400ms'};
`

const LineSvg = styled.svg`
  position: absolute;
  left: 16px;
  top: 16px;
  z-index: 3;

  path {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
  }
`

const line = keyframes`
  from {
    stroke-dashoffset: 1;
  }
  to {
    stroke-dashoffset: 0;
  }
`

const Button = styled.div`
  position: absolute;
  background: black;
  width: 25px;
  height: 15px;
  z-index: 4;
  bottom: 22px;
  opacity: 0;
`

const Wrapper = styled(Link)`
  position: relative;
  height: 110px;
  width: 150px;
  background-color: var(--color-gray12);
  transition: border-radius 200ms;
  overflow: hidden;
  z-index: 1;

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;

      ${InnerEffect} {
        animation: ${tvOn} ease-out 400ms;
        animation-fill-mode: forwards;
      }

      ${TvShow} {
        animation-name: ${disappear};
        animation-duration: 0.1s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }

      ${LineSvg} path {
        animation: ${line} ease-in-out 400ms;
        animation-fill-mode: forwards;
        animation-delay: 350ms;
      }

      ${Button} {
        animation-name: ${appear};
        animation-duration: 0.1s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }
    }
  }
`

const Line = () => {
  return (
    <LineSvg
      width="119"
      height="42"
      viewBox="0 0 119 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 23L21 10L36 16L53 5.5L70 20L85.5 3L103.5 13L116.5 40.5"
        stroke="#FF0000"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDashoffset={1}
        pathLength={1}
      />
    </LineSvg>
  )
}
