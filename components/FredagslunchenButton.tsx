import styled, { CSSProperties, keyframes } from 'styled-components'
import ProjectLink from './ProjectLink'

export const FredagslunchenButton = ({ style }: { style?: CSSProperties }) => {
  return (
    <FredagslunchenLink href="https://fredagslunchen.club" style={style}>
      Fredagslunchen
      <Bite
        style={{
          top: '-5px',
          left: '-20px',
          transform: 'rotateZ(130deg)',
          animationDelay: '0s',
        }}
      />
      <Bite
        style={{
          bottom: '-15px',
          left: '-12px',
          transform: 'rotateZ(40deg)',
          animationDelay: '0.3s',
        }}
      />
      <Bite
        style={{
          bottom: '-15px',
          right: '-16px',
          transform: 'rotateZ(-45deg)',
          animationDelay: '0.6s',
        }}
      />
      <Bite
        style={{
          top: '-5px',
          right: '-18px',
          transform: 'rotateZ(-100deg)',
          animationDelay: '0.9s',
        }}
      />
      <Bite
        style={{
          bottom: 0,
          left: '-8px',
          transform: 'rotateZ(90deg)',
          animationDelay: '1.2s',
        }}
      />
    </FredagslunchenLink>
  )
}
const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const StyledSvg = styled.svg`
  position: absolute;
  opacity: 0;

  ellipse {
    fill: var(--color-gray1);
  }
`
const FredagslunchenLink = styled(ProjectLink)`
  font-size: 28px;
  padding-left: 48px;
  position: relative;
  overflow: hidden;

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus {
      ${StyledSvg} {
        animation-name: ${appear};
        animation-duration: 0.01s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }
    }
  }
`
const Bite = ({ style }: { style?: CSSProperties }) => {
  return (
    <StyledSvg
      width="66"
      height="37"
      viewBox="0 0 81 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <ellipse cx="42.5" cy="9" rx="10.5" ry="9" />
      <ellipse
        cx="52.6775"
        cy="10.9932"
        rx="11.141"
        ry="9"
        transform="rotate(11.204 52.6775 10.9932)"
      />
      <ellipse
        cx="64.1703"
        cy="14.6946"
        rx="9.60447"
        ry="9"
        transform="rotate(11.204 64.1703 14.6946)"
      />
      <ellipse
        cx="29.1703"
        cy="10.6946"
        rx="9.60447"
        ry="9"
        transform="rotate(11.204 29.1703 10.6946)"
      />
      <ellipse
        cx="18.1703"
        cy="15.6946"
        rx="9.60447"
        ry="9"
        transform="rotate(11.204 18.1703 15.6946)"
      />
      <ellipse
        cx="11.1703"
        cy="19.6946"
        rx="9.60447"
        ry="9"
        transform="rotate(11.204 11.1703 19.6946)"
      />
      <ellipse
        cx="69.1703"
        cy="19.6946"
        rx="9.60447"
        ry="9"
        transform="rotate(11.204 69.1703 19.6946)"
      />
      <ellipse cx="39" cy="26" rx="36" ry="20" />
    </StyledSvg>
  )
}
