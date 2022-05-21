import styled from 'styled-components'
import { ConfettiConfig } from './ConfettiConfig'
import { Screw } from './Screw'
import { WaveClaimer } from './WaveClaimer'

export const ControlPanel = () => {
  return (
    <Panel>
      <PanelInside>
        <TopLeftScrew />
        <TopRightScrew />
        <Section>
          <SectionHeader>Confetti colors</SectionHeader>
          <SectionContent>
            <ConfettiConfig />
          </SectionContent>
        </Section>
        <Section>
          <SectionHeader>A friendly wave</SectionHeader>
          <WaveClaimer />
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

const Section = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 2px;
  padding: 8px;
  display: flex;
  flex-direction: column;
`

const PanelInside = styled.div`
  background-color: ${({ theme }) => theme.colors.gray3};
  border: 1px solid ${({ theme }) => theme.colors.gray7};
  position: relative;
  padding: 16px 32px 32px 32px;
  display: flex;
  max-height: 100%;
  overflow-y: scroll;
  flex-wrap: wrap;

  > ${Section} {
    margin: 16px 0 0 16px;
  }
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

const SectionContent = styled.div`
  display: flex;
`

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
