import { SpeakerLoudIcon, SpeakerOffIcon } from '@radix-ui/react-icons'
import { useContext, useCallback } from 'react'
import styled from 'styled-components'
import { SoundContext } from '../SoundContext'

export const SoundToggle = () => {
  const { soundMode, setSoundMode } = useContext(SoundContext)
  // const [playOn] = useSound(onSound, { volume: 0.5 })
  // const [playOff] = useSound(offSound, { volume: 0.25 })

  const onClick = useCallback(() => {
    // soundMode ? playOff() : playOn()
    setSoundMode(!soundMode)
  }, [soundMode, setSoundMode])

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
