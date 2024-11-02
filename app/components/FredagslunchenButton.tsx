import { CSSProperties } from 'react'
import { ProjectLink } from './ProjectLink'

export const FredagslunchenButton = ({ style }: { style?: CSSProperties }) => {
  return (
    <ProjectLink
      className="group text-3xl pl-12 relative overflow-hidden scale-50"
      to="https://fredagslunchen.club"
      style={style}
      onAnimationEnd={(e) => e.stopPropagation()}
    >
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
    </ProjectLink>
  )
}

const Bite = ({ style }: { style?: CSSProperties }) => {
  return (
    <svg
      width="66"
      height="37"
      viewBox="0 0 81 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className="absolute opacity-0 fill-gray-50 group-hover:animate-appearInstant group-focus:animate-appearInstant"
    >
      <ellipse className="fill-inherit" cx="42.5" cy="9" rx="10.5" ry="9" />
      <ellipse
        className="fill-inherit"
        cx="52.6775"
        cy="10.9932"
        rx="11.141"
        ry="9"
        transform="rotate(11.204 52.6775 10.9932)"
      />
      <ellipse
        className="fill-inherit"
        cx="64.1703"
        cy="14.6946"
        rx="9.60447"
        ry="9"
        transform="rotate(11.204 64.1703 14.6946)"
      />
      <ellipse
        className="fill-inherit"
        cx="29.1703"
        cy="10.6946"
        rx="9.60447"
        ry="9"
        transform="rotate(11.204 29.1703 10.6946)"
      />
      <ellipse
        className="fill-inherit"
        cx="18.1703"
        cy="15.6946"
        rx="9.60447"
        ry="9"
        transform="rotate(11.204 18.1703 15.6946)"
      />
      <ellipse
        className="fill-inherit"
        cx="11.1703"
        cy="19.6946"
        rx="9.60447"
        ry="9"
        transform="rotate(11.204 11.1703 19.6946)"
      />
      <ellipse
        className="fill-inherit"
        cx="69.1703"
        cy="19.6946"
        rx="9.60447"
        ry="9"
        transform="rotate(11.204 69.1703 19.6946)"
      />
      <ellipse className="fill-inherit" cx="39" cy="26" rx="36" ry="20" />
    </svg>
  )
}
