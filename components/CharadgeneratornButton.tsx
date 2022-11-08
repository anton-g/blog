import styled, { CSSProperties, keyframes } from 'styled-components'
import ProjectLink from './ProjectLink'

export const CharadgeneratornButton = ({
  style,
}: {
  style?: CSSProperties
}) => {
  return (
    <Charad href="/" style={style}>
      <span>C</span>
      <span>h</span>
      <span>a</span>
      <span>r</span>
      <span>a</span>
      <span>d</span>
      <span>g</span>
      <span>e</span>
      <span>n</span>
      <span>e</span>
      <span>r</span>
      <span>a</span>
      <span>t</span>
      <span>o</span>
      <span>r</span>
      <span>n</span> 🇸🇪
    </Charad>
  )
}
const bounce = keyframes`
  0% {
    transform: translateY(0px);
  }

  25% {
    transform: translateY(-8px);
  }

  75% {
    transform: translateY(8px);
  }

  100% {
    transform: translateY(0px);
  }
`
const Charad = styled(ProjectLink)`
  margin-right: 8px;
  > span {
    display: inline-block;
    animation-timing-function: linear;
    animation-duration: 1s;
    animation-iteration-count: infinite;

    &:nth-child(1) {
      animation-delay: 100ms;
    }
    &:nth-child(2) {
      animation-delay: 200ms;
    }
    &:nth-child(3) {
      animation-delay: 300ms;
    }
    &:nth-child(4) {
      animation-delay: 400ms;
    }
    &:nth-child(5) {
      animation-delay: 500ms;
    }
    &:nth-child(6) {
      animation-delay: 600ms;
    }
    &:nth-child(7) {
      animation-delay: 700ms;
    }
    &:nth-child(8) {
      animation-delay: 800ms;
    }
    &:nth-child(9) {
      animation-delay: 900ms;
    }
    &:nth-child(10) {
      animation-delay: 1000ms;
    }
    &:nth-child(11) {
      animation-delay: 1100ms;
    }
    &:nth-child(12) {
      animation-delay: 1200ms;
    }
    &:nth-child(13) {
      animation-delay: 1300ms;
    }
    &:nth-child(14) {
      animation-delay: 1400ms;
    }
    &:nth-child(15) {
      animation-delay: 1500ms;
    }
    &:nth-child(16) {
      animation-delay: 1600ms;
    }
  }

  &:hover {
    > span {
      animation-name: ${bounce};
    }
  }
  @media (max-width: 931px) {
    margin: 0;
    margin-left: -92px;
  }
`
