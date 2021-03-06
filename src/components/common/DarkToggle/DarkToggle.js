import React, { useContext, useCallback } from 'react'
import styled from 'styled-components'
import useSound from 'use-sound'
import { ThemeContext } from '../../../ThemeContext'
import { SoundContext } from '../../../SoundContext'
import lightSound from './light.wav'
import darkSound from './dark.wav'

export const DarkToggle = () => {
  const { colorMode, setColorMode } = useContext(ThemeContext)
  const { soundMode } = useContext(SoundContext)
  const [playLightSound] = useSound(lightSound, { volume: 0.5 })
  const [playDarkSound] = useSound(darkSound, { volume: 0.5 })

  const isDark = colorMode === 'dark'

  const onClick = useCallback(() => {
    if (soundMode) {
      isDark ? playLightSound() : playDarkSound()
    }
    setColorMode(isDark ? 'light' : 'dark')
  }, [playDarkSound, playLightSound, soundMode, setColorMode, isDark])

  if (!colorMode) {
    return null
  }

  const sun = (
    <svg viewBox="0 0 20 20" fill="currentColor" className="sun w-6 h-6">
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clipRule="evenodd"
      ></path>
    </svg>
  )

  const moon = (
    <svg viewBox="0 0 20 20" fill="currentColor" className="moon w-6 h-6">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
    </svg>
  )

  return (
    <Button onClick={onClick} aria-label="theme toggle">
      {isDark ? moon : sun}
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
