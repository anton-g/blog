import { SpeakerLoudIcon, SpeakerOffIcon } from '@radix-ui/react-icons'
import { useCallback } from 'react'
import useSound from 'use-sound'
import { useSoundMode } from '~/other/sound-context'

export const SoundToggle = () => {
  const { soundMode, setSoundMode } = useSoundMode()
  const [playOn] = useSound('/sounds/on.mp3', { volume: 0.25 })
  const [playOff] = useSound('/sounds/off.mp3', { volume: 0.5 })

  const onClick = useCallback(() => {
    if (soundMode) {
      playOff()
    } else {
      playOn()
    }
    setSoundMode(!soundMode)
  }, [soundMode, setSoundMode, playOff, playOn])

  return (
    <button className="w-5 h-5 cursor-pointer" onClick={onClick} aria-label="sound toggle">
      {soundMode ? (
        <SpeakerLoudIcon height="18px" width="18px" />
      ) : (
        <SpeakerOffIcon height="18px" width="18px" />
      )}
    </button>
  )
}
