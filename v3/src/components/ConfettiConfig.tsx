import styled from 'styled-components'
import { useUserConfig } from '../UserConfigContext'
import { Spacer } from './Spacer'

export const ConfettiConfig = () => {
  const { userConfig, updateConfig } = useUserConfig()

  if (!userConfig?.confettiColor1) return null

  return (
    <Wrapper>
      <Text>
        What&apos;s more fun than confetti? Confetti with your own colors! Select whatever colors you want and
        they&apos;ll be used for all the confetti across the site (and it&apos;s a lot, promise).
      </Text>
      <Spacer size={8} />
      <Pickers>
        <ColorPicker
          type="color"
          value={userConfig.confettiColor1}
          onChange={(e) => {
            updateConfig({ ...userConfig, confettiColor1: e.target.value })
          }}
        />
        <ColorPicker
          type="color"
          value={userConfig.confettiColor2}
          onChange={(e) => {
            updateConfig({ ...userConfig, confettiColor2: e.target.value })
          }}
        />
        <ColorPicker
          type="color"
          value={userConfig.confettiColor3}
          onChange={(e) => {
            updateConfig({ ...userConfig, confettiColor3: e.target.value })
          }}
        />
        <ColorPicker
          type="color"
          value={userConfig.confettiColor4}
          onChange={(e) => {
            updateConfig({ ...userConfig, confettiColor4: e.target.value })
          }}
        />
        <ColorPicker
          type="color"
          value={userConfig.confettiColor5}
          onChange={(e) => {
            updateConfig({ ...userConfig, confettiColor5: e.target.value })
          }}
        />
      </Pickers>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 250px;
`

const Pickers = styled.div`
  display: flex;
  justify-content: center;
`

const ColorPicker = styled.input`
  padding: 0;
  margin: 0;
  background: none;
  border: 0;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`

const Text = styled.p`
  font-size: 14px;
  margin: 0;
  padding: 0;
`
