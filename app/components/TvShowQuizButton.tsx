import { Link } from '@remix-run/react'
import { CSSProperties, useEffect, useState } from 'react'
import { cn } from '~/other/misc'
const buttonCls =
  'group-hover:animate-appearShort absolute w-[25px] bg-black h-[15px] bottom-[22px] opacity-0 z-40'
export const TvShowQuiz = ({ style }: { style?: CSSProperties }) => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    // Workaround to avoid initial animation on page load
    const timeoutId = setTimeout(() => {
      setLoaded(true)
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <Link
      className="group hover:rounded-t-lg relative h-[110px] w-[150px] bg-gray-950 overflow-hidden z-10"
      to="https://tv-show-quiz.netlify.app/"
      style={{ ...style, transition: 'border-radius 200ms' }}
      onAnimationEnd={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 border-8 border-gray-950 z-20" />
      <Line />
      <div
        className={buttonCls}
        style={{
          left: 15,
          animationDelay: '0.5s',
        }}
      />
      <div
        className={buttonCls}
        style={{
          left: 47,
          animationDelay: '0.6s',
        }}
      />
      <div
        className={buttonCls}
        style={{
          left: 79,
          animationDelay: '0.7s',
        }}
      />
      <div
        className={buttonCls}
        style={{
          left: 111,
          animationDelay: '0.8s',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div
          className="bg-white h-[1px] w-[1px] animate-tvOff transform scale-0 group-hover:animate-tvOn"
          style={{
            animationDuration: loaded ? undefined : '0s',
          }}
        />
      </div>
      <div
        className="text-gray-50 z-10 animate-appearDelayed group-hover:animate-disappearShort h-full w-full flex items-center justify-center text-center font-serif tracking-[1px] whitespace-nowrap text-xl"
        style={{
          animationDuration: loaded ? undefined : '0s',
        }}
      >
        TV Show
        <br />
        Ratings Quiz
      </div>
    </Link>
  )
}

const Line = () => {
  return (
    <svg
      className="absolute left-4 top-4 z-30 "
      width="119"
      height="42"
      viewBox="0 0 119 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="group-hover:animate-oneToZeroDashoffset"
        style={{ animationDelay: '350ms' }}
        d="M1.5 23L21 10L36 16L53 5.5L70 20L85.5 3L103.5 13L116.5 40.5"
        stroke="#FF0000"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDashoffset={1}
        strokeDasharray={1}
        pathLength={1}
      />
    </svg>
  )
}
