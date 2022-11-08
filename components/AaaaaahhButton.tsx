import Image from 'next/image'
import Link from 'next/link'
import styled, { CSSProperties, keyframes } from 'styled-components'

export const AaaaaahhButton = ({ style }: { style?: CSSProperties }) => {
  return (
    <Wrapper href="/" style={style}>
      <Text>
        <InnerText>AAAHHHAAAAAAAAAHHHHAAAAHHHAAAAHHHHHHHHHHAAA</InnerText>
      </Text>
      <MouthWrapper>
        <ShakeWrapper>
          <Mouth
            width={150}
            height={150}
            src="/mouth.png"
            alt="screaming mouth"
          />
        </ShakeWrapper>
      </MouthWrapper>
    </Wrapper>
  )
}

const shakeAnimation = keyframes`
  10%, 90% {
    transform: translate3d(-1px, -1px, 0);
  }
  
  20%, 80% {
    transform: translate3d(1px, 1px, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-2px, -1px, 0);
  }

  40%, 60% {
    transform: translate3d(2px, -2px, 0);
  }
`

const scrollAnimation = keyframes`
  to {
    transform: translateX(-100%);
  }
`

const scaleUpAnimation = keyframes`
 from {
  transform: scale(0);
 }
 to {
  transform: scale(1);
 }
`

const textScaleAnimation = keyframes`
 from {
  transform: scale(1);
 }
 to {
  transform: scale(0.6);
 }
`

const ShakeWrapper = styled.div``

const Text = styled.div`
  z-index: 1;
  background-color: var(--color-gray12);
  color: var(--color-gray1);
  max-width: 100px;
  overflow: hidden;
  scale: 1.5;
`

const InnerText = styled.span`
  position: relative;
  display: inline-block;
`

const MouthWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  pointer-events: none;
`

const Mouth = styled(Image)`
  transform: scale(0);
`

const Wrapper = styled(Link)`
  padding: 0px;
  line-height: 0.8;
  font-family: var(--font-abril);
  font-size: 24px;
  letter-spacing: 1px;
  white-space: nowrap;
  position: relative;
  z-index: 1;
  width: 150px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover,
  &:focus {
    ${Text} {
      animation: ${textScaleAnimation} ease-in 600ms;
      animation-fill-mode: forwards;
    }

    ${InnerText} {
      animation: ${scrollAnimation} linear 10s infinite;
      animation-delay: 550ms;
    }

    ${Mouth} {
      animation: ${scaleUpAnimation} ease-in 600ms;
      animation-fill-mode: forwards;
    }

    ${ShakeWrapper} {
      animation: ${shakeAnimation} linear 1.5s infinite;
    }
  }
`
