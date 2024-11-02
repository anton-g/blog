import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: ['"Abril Fatface"', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        title: ['"Yeseva One"', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono: ['"Share Tech Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        shake: 'shake 1.5s infinite',
        scaleUp: 'scaleUp 600ms ease-in forwards',
        scroll: 'scroll 10s linear infinite',
        scaleDown: 'scaleDown 600ms ease-in forwards',
        bounce: 'bounce 1s linear infinite',
        tvOn: 'tvOn 400ms ease-out forwards',
        appearInstant: 'appear 0.01s linear forwards',
        appearShort: 'appear 0.1s linear forwards',
        disappearShort: 'disappear 0.1s linear forwards',
        appearDelayed: 'appearDelayed 400ms linear forwards',
        tvOff: 'tvOff 400ms linear forwards',
        oneToZeroDashoffset: 'oneToZeroDashoffset 1s linear forwards',
      },
    },
    keyframes: {
      oneToZeroDashoffset: {
        '0%': {
          strokeDashoffset: '1',
        },
        '100%': {
          strokeDashoffset: '0',
        },
      },
      tvOn: {
        '0%': {
          transform: 'scaleX(0) scaleY(0)',
        },
        '25%': {
          transform: 'scaleX(50) scaleY(1)',
        },
        '50%': {
          transform: 'scaleX(150) scaleY(2)',
        },
        '100%': {
          transform: 'scaleX(150) scaleY(110)',
        },
      },
      tvOff: {
        '0%': {
          transform: 'scaleX(150) scaleY(110)',
        },
        '25%': {
          transform: 'scaleX(150) scaleY(2)',
        },
        '50%': {
          transform: 'scaleX(50) scaleY(1)',
        },
        '100%': {
          transform: 'scaleX(0) scaleY(0)',
        },
      },
      appear: {
        from: {
          opacity: '0',
        },
        to: {
          opacity: '1',
        },
      },
      appearDelayed: {
        '0%': {
          opacity: '0',
        },
        '80%': {
          opacity: '0',
        },
        '100%': {
          opacity: '1',
        },
      },
      disappear: {
        from: {
          opacity: '1',
        },
        to: {
          opacity: '0',
        },
      },
      shake: {
        '10%, 90%': {
          transform: 'translate3d(-1px, -1px, 0)',
        },
        '20%, 80%': {
          transform: 'translate3d(1px, 1px, 0)',
        },
        '30%, 50%, 70%': {
          transform: 'translate3d(-2px, -1px, 0)',
        },
        '40%, 60%': {
          transform: 'translate3d(2px, -2px, 0)',
        },
      },
      scroll: {
        to: {
          transform: 'translateX(-100%)',
        },
      },
      scaleUp: {
        from: {
          transform: 'scale(0)',
        },
        to: {
          transform: 'scale(1)',
        },
      },
      scaleDown: {
        from: {
          transform: 'scale(1)',
        },
        to: {
          transform: 'scale(0.6)',
        },
      },
      bounce: {
        '0%': {
          transform: 'translateY(0px)',
        },
        '25%': {
          transform: 'translateY(-8px)',
        },
        '75%': {
          transform: 'translateY(8px)',
        },
        '100%': {
          transform: 'translateY(0px)',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animation-delay')],
} satisfies Config

// const Wrapper = styled(Link)`
//   @media (prefers-reduced-motion: no-preference) {
//     &:hover,
//     &:focus {
//       ${Text} {
//         animation: ${textScaleAnimation} ease-in 600ms;
//         animation-fill-mode: forwards;
//       }

//       ${InnerText} {
//         animation: ${scrollAnimation} linear 10s infinite;
//         animation-delay: 550ms;
//       }

//       ${Mouth} {
//         animation: ${scaleUpAnimation} ease-in 600ms;
//         animation-fill-mode: forwards;
//       }

//       ${ShakeWrapper} {
//         animation: ${shakeAnimation} linear 1.5s infinite;
//       }
//     }
//   }
// `

// const shakeAnimation = keyframes`
//   10%, 90% {
//     transform: translate3d(-1px, -1px, 0);
//   }

//   20%, 80% {
//     transform: translate3d(1px, 1px, 0);
//   }

//   30%, 50%, 70% {
//     transform: translate3d(-2px, -1px, 0);
//   }

//   40%, 60% {
//     transform: translate3d(2px, -2px, 0);
//   }
// `

// const scrollAnimation = keyframes`
//   to {
//     transform: translateX(-100%);
//   }
// `

// const scaleUpAnimation = keyframes`
//  from {
//   transform: scale(0);
//  }
//  to {
//   transform: scale(1);
//  }
// `

// const textScaleAnimation = keyframes`
//  from {
//   transform: scale(1);
//  }
//  to {
//   transform: scale(0.6);
//  }
// `
