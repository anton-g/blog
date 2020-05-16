import React, { useContext } from 'react'
import styled from 'styled-components'
import { SoundContext } from '../../common/SoundContext'

export default function SoundToggle() {
  const [soundEnabled, setSoundEnabled] = useContext(SoundContext)

  const soundOn = (
    <svg
      style={{ width: '50%', height: '50%' }}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
    </svg>
  )

  const soundOff = (
    <svg
      style={{ width: '50%', height: '50%' }}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        clipRule="evenodd"
      ></path>
      <path d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
    </svg>
  )

  return (
    <SoundToggleWrapper>
      <MetalButton onClick={() => setSoundEnabled(!soundEnabled)}>
        {soundEnabled ? soundOn : soundOff}
      </MetalButton>
    </SoundToggleWrapper>
  )
}

const SoundToggleWrapper = styled.div`
  grid-column-start: span 1;
  grid-row-start: span 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: hsla(0, 0%, 90%, 1);
  background-image: linear-gradient(
    -45deg,
    hsla(0, 0%, 0%, 0),
    hsla(0, 0%, 0%, 0.05)
  );
  background-size: 5px;
`

const MetalButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 40px auto;
  outline: none;

  font: bold 2em/2em 'Helvetica Neue', Arial, Helvetica, Geneva, sans-serif;
  text-align: center;
  color: hsla(0, 0%, 20%, 1);
  text-shadow: hsla(0, 0%, 40%, 0.5) 0 -1px 0, hsla(0, 0%, 100%, 0.6) 0 2px 1px;

  background-color: hsl(0, 0%, 90%);
  box-shadow: inset hsla(0, 0%, 15%, 1) 0 0px 0px 4px,
    /* border */ inset hsla(0, 0%, 15%, 0.8) 0 -1px 5px 4px,
    /* soft SD */ inset hsla(0, 0%, 0%, 0.25) 0 -1px 0px 7px,
    /* bottom SD */ inset hsla(0, 0%, 100%, 0.7) 0 2px 1px 7px,
    /* top HL */ hsla(0, 0%, 0%, 0.15) 0 -5px 6px 4px,
    /* outer SD */ hsla(0, 0%, 100%, 0.5) 0 5px 6px 4px; /* outer HL */

  transition: color 0.2s;

  width: 80%;
  height: 80%;
  border-radius: 80px;
  background-image: -webkit-radial-gradient(
      50% 0%,
      8% 50%,
      hsla(0, 0%, 100%, 0.5) 0%,
      hsla(0, 0%, 100%, 0) 100%
    ),
    -webkit-radial-gradient(50% 100%, 12% 50%, hsla(0, 0%, 100%, 0.6) 0%, hsla(
            0,
            0%,
            100%,
            0
          )
          100%),
    -webkit-radial-gradient(0% 50%, 50% 7%, hsla(0, 0%, 100%, 0.5) 0%, hsla(
            0,
            0%,
            100%,
            0
          )
          100%),
    -webkit-radial-gradient(100% 50%, 50% 5%, hsla(0, 0%, 100%, 0.5) 0%, hsla(
            0,
            0%,
            100%,
            0
          )
          100%),
    -webkit-repeating-radial-gradient(50% 50%, 100% 100%, hsla(0, 0%, 0%, 0) 0%, hsla(
            0,
            0%,
            0%,
            0
          )
          3%, hsla(0, 0%, 0%, 0.1) 3.5%),
    -webkit-repeating-radial-gradient(50% 50%, 100% 100%, hsla(0, 0%, 100%, 0)
          0%, hsla(0, 0%, 100%, 0) 6%, hsla(0, 0%, 100%, 0.1) 7.5%),
    -webkit-repeating-radial-gradient(50% 50%, 100% 100%, hsla(0, 0%, 100%, 0)
          0%, hsla(0, 0%, 100%, 0) 1.2%, hsla(0, 0%, 100%, 0.2) 2.2%),
    -webkit-radial-gradient(50% 50%, 200% 50%, hsla(0, 0%, 90%, 1) 5%, hsla(
            0,
            0%,
            85%,
            1
          )
          30%, hsla(0, 0%, 60%, 1) 100%);

  &:before,
  &:after {
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: inherit;

    /* fake conical gradients */
    background-image: -webkit-radial-gradient(
        50% 0%,
        10% 50%,
        hsla(0, 0%, 0%, 0.1) 0%,
        hsla(0, 0%, 0%, 0) 100%
      ),
      -webkit-radial-gradient(50% 100%, 10% 50%, hsla(0, 0%, 0%, 0.1) 0%, hsla(
              0,
              0%,
              0%,
              0
            )
            100%),
      -webkit-radial-gradient(0% 50%, 50% 10%, hsla(0, 0%, 0%, 0.1) 0%, hsla(
              0,
              0%,
              0%,
              0
            )
            100%),
      -webkit-radial-gradient(100% 50%, 50% 06%, hsla(0, 0%, 0%, 0.1) 0%, hsla(
              0,
              0%,
              0%,
              0
            )
            100%);
  }

  &:before {
    transform: rotate(65deg);
  }

  &:after {
    transform: rotate(-65deg);
  }

  &:active {
    color: hsl(210, 100%, 40%);
    text-shadow: hsla(210, 100%, 20%, 0.3) 0 -1px 0,
      hsl(210, 100%, 85%) 0 2px 1px, hsla(200, 100%, 80%, 1) 0 0 5px,
      hsla(210, 100%, 50%, 0.6) 0 0 20px;
    box-shadow: inset hsla(210, 100%, 30%, 1) 0 0px 0px 4px,
      /* border */ inset hsla(210, 100%, 15%, 0.4) 0 -1px 5px 4px,
      /* soft SD */ inset hsla(210, 100%, 20%, 0.25) 0 -1px 0px 7px,
      /* bottom SD */ inset hsla(210, 100%, 100%, 0.7) 0 2px 1px 7px,
      /* top HL */ hsla(210, 100%, 75%, 0.8) 0 0px 3px 2px,
      /* outer SD */ hsla(210, 50%, 40%, 0.25) 0 -5px 6px 4px,
      /* outer SD */ hsla(210, 80%, 95%, 1) 0 5px 6px 4px; /* outer HL */
  }
`
