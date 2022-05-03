import styled from 'styled-components'
import { useUserConfig } from '../UserConfigContext'

export const ControlPanel = () => {
  const { userConfig, updateConfig } = useUserConfig()

  return (
    <Panel>
      <PanelInside>
        <TopLeftScrew />
        <TopRightScrew />
        <Section>
          <SectionHeader>Confetti colors</SectionHeader>
          <SectionContent>
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
          </SectionContent>
        </Section>
        <BottomLeftScrew />
        <BottomRightScrew />
      </PanelInside>
    </Panel>
  )
}

const Panel = styled.div`
  background-color: ${({ theme }) => theme.colors.gray12};
  padding: 6px 12px 12px;
  user-select: text;
`

const PanelInside = styled.div`
  background-color: ${({ theme }) => theme.colors.gray3};
  border: 1px solid ${({ theme }) => theme.colors.gray7};
  position: relative;
  padding: 32px;
  display: flex;
`

const SectionHeader = styled.h5`
  margin: 0;
  font-size: 12px;
  line-height: 1;
  margin-top: -15px;
  margin-bottom: 4px;
  background-color: ${({ theme }) => theme.colors.gray3};
  width: fit-content;
  color: ${({ theme }) => theme.colors.gray12};
  font-weight: normal;
  text-transform: uppercase;
`

const Section = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 2px;
  padding: 8px;
  display: flex;
  flex-direction: column;
`

const SectionContent = styled.div`
  display: flex;
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

const Screw = ({ className }: { className?: string }) => {
  return (
    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" className={className}>
      <circle cx="3.5" cy="3.5" r="3.5" fill="url(#screw-gradient)"></circle>
      <line x1="4.20708" y1="4.20709" x2="2.79286" y2="2.79288" stroke="#9D9D9D" strokeLinecap="round"></line>
      <line x1="2.79291" y1="4.20708" x2="4.20712" y2="2.79286" stroke="#9D9D9D" strokeLinecap="round"></line>
      <defs>
        <radialGradient
          id="screw-gradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(3.5 3.5) rotate(90) scale(3.5)"
        >
          <stop stopColor="#EAEAEA"></stop>
          <stop offset="1" stopColor="#DFDFDF"></stop>
        </radialGradient>
      </defs>
    </svg>
  )
}

const TopLeftScrew = styled(Screw)`
  position: absolute;
  top: 4px;
  left: 4px;
`

const TopRightScrew = styled(Screw)`
  position: absolute;
  top: 4px;
  right: 4px;
`

const BottomLeftScrew = styled(Screw)`
  position: absolute;
  bottom: 4px;
  left: 4px;
`

const BottomRightScrew = styled(Screw)`
  position: absolute;
  bottom: 4px;
  right: 4px;
`
