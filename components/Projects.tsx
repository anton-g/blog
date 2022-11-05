import styled, { keyframes } from 'styled-components'
import { DrawWTFButton } from './DrawWTFButton'
import { FredagslunchenButton } from './FredagslunchenButton'
import ProjectLink from './ProjectLink'
import { Spacer } from './Spacer'
import { TvShowQuiz } from './TvShowQuizButton'

export const Projects = () => {
  return (
    <ProjectsWrapper>
      <LeftSide>projects</LeftSide>
      <Inner>
        <Spacer size={96} />
        <DrawWTFButton />
        <Spacer size={32} />
        <FredagslunchenButton />
        <Spacer size={64} />
        <Scream href="/">
          AAAAAA<br></br>AAHHHH
        </Scream>
        <Spacer size={96} />
        <Quizify href="/">Quizify</Quizify>
        <Spacer size={64} />
        <TvShowQuiz />
        <Spacer size={64} />
        <Kamp href="/">Kampgeneratorn 🇸🇪</Kamp>
        <Spacer size={32} />
        <Charad href="/">Charadgeneratorn 🇸🇪</Charad>
        <Spacer size={64} />
        <Asdf href="/">asdf.pizza 🇸🇪</Asdf>
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
    var(--color-gray4) 0,
    var(--color-gray4) 1px,
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

const Inner = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  @media (max-width: 931px) {
    flex-direction: column;
  }
`

const Scream = styled(ProjectLink)`
  padding: 0px;
  line-height: 0.8;
  margin-bottom: -24px;
  &:hover {
    color: var(--color-orange11);
    background-color: #e5e5f7;
    background-size: 10px 10px;
    background-image: repeating-linear-gradient(
      45deg,
      #444cf7 0,
      #444cf7 1px,
      #e5e5f7 0,
      #e5e5f7 50%
    );
  }
  @media (max-width: 931px) {
    margin: 0;
    margin-right: -32px;
  }
`

const Quizify = styled(ProjectLink)`
  margin-top: -56px;
  margin-left: -24px;
  @media (max-width: 931px) {
    margin: 0;
    margin-right: -8px;
  }
`

const Kamp = styled(ProjectLink)`
  padding: 4px 8px;
  margin-bottom: -36px;
  @media (max-width: 931px) {
    margin: 0;
    margin-left: -48px;
  }
`

const Charad = styled(ProjectLink)`
  margin-right: 8px;
  &:hover {
    background-color: #e5e5f7;
    background-image: repeating-linear-gradient(
        45deg,
        var(--color-teal11) 25%,
        transparent 25%,
        transparent 75%,
        var(--color-teal11) 75%,
        var(--color-teal11)
      ),
      repeating-linear-gradient(
        45deg,
        var(--color-teal11) 25%,
        #e5e5f7 25%,
        #e5e5f7 75%,
        var(--color-teal11) 75%,
        var(--color-teal11)
      );
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;
    color: var(--color-gray12);
  }
  @media (max-width: 931px) {
    margin: 0;
    margin-left: -92px;
  }
`

const bob = keyframes`
  0% {
		transform: translateY(-8px);
	}
	50% {
		transform: translateY(-4px);
	}
	100% {
		transform: translateY(-8px);
	}
`

const bobFloat = keyframes`
  100% {
    transform: translateY(-8px);
  }
`

const Asdf = styled(ProjectLink)`
  margin-top: -32px;
  margin-left: -38px;
  &:hover {
    animation-name: ${bobFloat}, ${bob};
    animation-duration: 0.3s, 1.5s;
    animation-delay: 0s, 0.3s;
    animation-timing-function: ease-out, ease-in-out;
    animation-iteration-count: 1, infinite;
    animation-fill-mode: forwards;
    animation-direction: normal, alternate;
  }
  @media (max-width: 931px) {
    margin-top: 0;
  }
`
