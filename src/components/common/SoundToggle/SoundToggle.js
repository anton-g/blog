import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import useSound from 'use-sound'
import { SoundContext } from '../../../SoundContext'
import onSound from './on.wav'
import offSound from './off.mp3'

export const SoundToggle = () => {
  const { soundMode, setSoundMode } = useContext(SoundContext)
  const [playOn] = useSound(onSound, { volume: 0.5 })
  const [playOff] = useSound(offSound, { volume: 0.25 })

  const onClick = useCallback(() => {
    soundMode ? playOff() : playOn()
    setSoundMode(!soundMode)
  }, [playOff, playOn, soundMode, setSoundMode])

  return (
    <Button onClick={onClick} aria-label="sound toggle">
      <svg viewBox="0 0 20 20" fill="currentColor" className="volume-up w-6 h-6">
        <defs>
          <clipPath id="volume-off">
            <rect x="0" y="0" width="10" height="20"></rect>
          </clipPath>
        </defs>
        <path
          fillRule="evenodd"
          d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
          clipRule="evenodd"
          key={soundMode}
          clipPath={soundMode === true ? '' : 'url(#volume-off)'}
        ></path>
      </svg>
    </Button>
  )
}

const Button = styled.button`
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--color-text);
  outline: none;

  svg {
    height: 20px;
    width: 20px;
  }
`
