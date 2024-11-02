import { Link } from '@remix-run/react'
import { CSSProperties } from 'react'

export const AaaaaahhButton = ({ style }: { style?: CSSProperties }) => {
  return (
    <Link
      to="https://github.com/anton-g/AAAAAAAHHHH"
      style={style}
      onAnimationEnd={(e) => e.stopPropagation()}
      className="group leading-[0.8] z-10 w-[150px] h-[30px] flex items-center justify-center font-serif text-2xl whitespace-nowrap relative tracking-[1px]"
    >
      <div className="group-focus:animate-scaleDown group-hover:animate-scaleDown z-10 bg-gray-950 text-gray-50 max-w-[100px] overflow-hidden">
        <span className="group-focus:animate-scroll group-hover:animate-scroll relative inline-block">
          AAAHHHAAAAAAAAAHHHHAAAAHHHAAAAHHHHHHHHHHAAA
        </span>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
        <div className="group-focus:animate-shake group-hover:animate-shake w-[150px]">
          <img
            className="group-focus:animate-scaleUp group-hover:animate-scaleUp transform scale-0"
            src="/mouth.png"
            alt="screaming mouth"
          />
        </div>
      </div>
    </Link>
  )
}
