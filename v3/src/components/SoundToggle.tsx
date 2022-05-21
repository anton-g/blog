import { SpeakerLoudIcon, SpeakerOffIcon } from '@radix-ui/react-icons'
import { useContext, useCallback } from 'react'
import styled from 'styled-components'
import { SoundContext } from '../SoundContext'
import onSound from '../sounds/on.mp3'
import offSound from '../sounds/off.mp3'
import useSound from 'use-sound'

export const SoundToggle = () => {
  const { soundMode, setSoundMode } = useContext(SoundContext)
  const [playOn] = useSound(onSound, { volume: 0.25 })
  const [playOff] = useSound(offSound, { volume: 0.5 })

  const onClick = useCallback(() => {
    if (soundMode) {
      playOff()
    } else {
      playOn()
    }
    setSoundMode(!soundMode)
  }, [soundMode, setSoundMode, playOff, playOn])

  return (
    <Button onClick={onClick} aria-label="sound toggle">
      {soundMode ? <SpeakerLoudIcon height="22px" width="22px" /> : <SpeakerOffIcon height="22px" width="22px" />}
    </Button>
  )
}

const Button = styled.button`
  all: unset;
  width: 22px;
  height: 22px;
  cursor: pointer;
`
