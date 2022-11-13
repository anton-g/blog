import styled, { CSSProperties, keyframes } from 'styled-components'
import ProjectLink from './ProjectLink'

export const KampgeneratorButton = ({ style }: { style?: CSSProperties }) => {
  return (
    <Wrapper style={style}>
      <Boot />
      <Kamp href="https://kampgeneratorn.se">Kampgeneratorn 🇸🇪</Kamp>
    </Wrapper>
  )
}

const followPath = keyframes`
  0% {
    motion-offset: 100%;
    offset-distance: 100%;
  }

  100% {
    motion-offset: 0%;
    offset-distance: 0%;
  }
`

const rotate = keyframes`
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(-720deg);
  }
`

const Boot = () => {
  // TODO support in safari?
  return (
    <StyledSvg
      width="26"
      height="30"
      viewBox="0 0 37 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        top: -96,
        left: 16,
      }}
    >
      <path
        d="M21.2902 0.00509853C12.9057 -0.0391381 8.23933 0.192821 0 1.1609C0.401704 4.32999 0.627875 6.19099 1.03115 9.61647C1.73234 13.9009 2.21603 16.3646 3.1541 20.8095C5.26798 27.7844 5.42837 31.002 3.76066 35.409C2.89367 35.3082 2.91406 35.5123 3.57869 36.1998C3.56216 36.819 3.5288 37.1758 3.39672 37.8423C3.40013 38.4716 3.43232 38.8298 3.57869 39.4847C3.74082 39.5241 3.87982 40.0151 3.7 40.3363C3.52018 40.6575 3.56436 41.5499 3.57869 42.283C6.14048 43.0317 8.47942 43.1147 13.6475 42.8913C13.9727 42.3464 14.1095 42.0125 14.2541 41.3705C14.4171 41.0091 14.5749 40.9059 15.0426 41.0055C17.0217 41.3644 18.1681 41.4597 20.259 41.4921L20.3803 41.9788C27.4164 43.0129 31.1164 42.5871 37 39.7889C37 39.7889 36.9193 38.9522 36.8787 37.9639L36.6967 37.7814C36.4457 36.062 35.9405 35.462 34.2098 35.2265C33.5886 35.1582 33.2285 35.1334 32.5721 35.1048C30.4365 35.1382 29.2874 34.8885 27.2951 34.1315C24.6541 32.83 23.3051 31.7875 21.1689 29.265L20.3197 27.6834C19.6127 25.6641 19.6233 24.0686 19.5311 21.7219C19.4406 19.4163 19.8344 15.8213 19.8344 15.8213C19.9827 12.9394 20.077 11.2589 20.441 8.46067C20.8049 5.66243 21.0427 3.30967 21.2902 0.00509853Z"
        fill="black"
      />
    </StyledSvg>
  )
}

const StyledSvg = styled.svg`
  motion-offset: 100%;
  offset-distance: 100%;
  position: absolute;
  overflow: visible;
  offset-path: path('M1 77.9999C23.5 -23.5 137.5 -35.5 203 110');
  offset-rotate: 0deg;
  pointer-events: none;
`

const Kamp = styled(ProjectLink)`
  position: relative;
  padding: 4px 8px;
  z-index: 1;
`

const Wrapper = styled.div`
  position: relative;

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus {
      ${StyledSvg} {
        animation: ${followPath} 1s cubic-bezier(0, 0, 1, 1) 1,
          ${rotate} 1s linear 1;
        animation-fill-mode: forwards;
      }
    }
  }
`
