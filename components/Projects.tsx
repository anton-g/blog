import styled from 'styled-components'
import { AaaaaahhButton } from './AaaaaahhButton'
import { CharadgeneratornButton } from './CharadgeneratornButton'
import { DrawWTFButton } from './DrawWTFButton'
import { FredagslunchenButton } from './FredagslunchenButton'
import { KampgeneratorButton } from './KampgeneratorButton'
import { PodcastButton } from './PodcastButton'
import { Spacer } from './Spacer'
import { TvShowQuiz } from './TvShowQuizButton'

export const Projects = () => {
  return (
    <ProjectsWrapper>
      <LeftSide>projects</LeftSide>
      <Inner>
        <Spacer size={32} />
        <DrawWTFButton style={{ marginBottom: -12 }} />
        <Spacer size={32} />
        <FredagslunchenButton style={{ marginTop: -12 }} />
        <Spacer size={64} />
        <KampgeneratorButton style={{ marginTop: -24 }} />
        <Spacer size={96} />
        <TvShowQuiz />
        <Spacer size={96} />
        <AaaaaahhButton />
        <Spacer size={32} />
        <CharadgeneratornButton style={{ marginTop: -36 }} />
        <Spacer size={64} />
        <PodcastButton />
        <Spacer size={96} />
      </Inner>
      <Side>projects</Side>
    </ProjectsWrapper>
  )
}

const ProjectsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8px 4px;
  max-width: 1500px;
  background-size: 10px 10px;
  background-image: repeating-linear-gradient(
    45deg,
    var(--color-gray5) 0,
    var(--color-gray5) 1px,
    var(--color-gray1) 0,
    var(--color-gray1) 50%
  );
`

const Side = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: var(--font-yeseva);
  font-size: 4rem;
  text-align: end;
`

const LeftSide = styled(Side)`
  transform: rotate(180deg);
`

// TODO probably easier to do this with a grid and then offset the elements?
const Inner = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 16px;
  @media (max-width: 931px) {
    flex-direction: column;
    gap: 16px;
  }
`
