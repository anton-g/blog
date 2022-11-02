import Link from 'next/link'
import styled, { keyframes } from 'styled-components'
import { Spacer } from './Spacer'

export const Projects = () => {
  return (
    <ProjectsWrapper>
      <LeftSide>projects</LeftSide>
      <Inner>
        <Spacer size={96} />
        <DrawWTF href="https://draw.wtf">draw.wtf</DrawWTF>
        <Spacer size={32} />
        <DrawWTF href="https://fredagslunchen.club">Fredagslunchen</DrawWTF>
        <Spacer size={64} />
        <Scream href="/">
          AAAAAA<br></br>AAHHHH
        </Scream>
        <Spacer size={96} />
        <Quizify href="/">Quizify</Quizify>
        <Spacer size={64} />
        <TvShow href="/">TV Show Ratings Quiz</TvShow>
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
    ${({ theme }) => theme.colors.gray4} 0,
    ${({ theme }) => theme.colors.gray4} 1px,
    ${({ theme }) => theme.colors.gray1} 0,
    ${({ theme }) => theme.colors.gray1} 50%
  );
`

const Side = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: 'Yeseva One';
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

const Project = styled(Link)`
  background-color: ${({ theme }) => theme.colors.gray12};
  color: ${({ theme }) => theme.colors.gray1};
  padding: 8px 16px;
  font-family: 'Abril Fatface';
  font-size: 24px;
  letter-spacing: 1px;
  white-space: nowrap;
`

const DrawWTF = styled(Project)`
  font-size: 32px;
  padding-left: 48px;
  margin-top: -48px;

  &:hover {
    color: ${({ theme }) => theme.colors.gray1};
    background-color: #e5e5f7;
    background-image: repeating-radial-gradient(circle at 24px 12px, transparent 0, #e5e5f7 10px),
      repeating-linear-gradient(#ce015d55, #ce015d);
  }

  @media (max-width: 931px) {
    margin: 0;
    margin-left: -28px;
  }
`

const Scream = styled(Project)`
  padding: 0px;
  line-height: 0.8;
  margin-bottom: -24px;

  &:hover {
    color: ${({ theme }) => theme.colors.orange11};
    background-color: #e5e5f7;
    background-size: 10px 10px;
    background-image: repeating-linear-gradient(45deg, #444cf7 0, #444cf7 1px, #e5e5f7 0, #e5e5f7 50%);
  }

  @media (max-width: 931px) {
    margin: 0;
    margin-right: -32px;
  }
`

const Quizify = styled(Project)`
  margin-top: -56px;
  margin-left: -24px;

  @media (max-width: 931px) {
    margin: 0;
    margin-right: -8px;
  }
`

const pulse = keyframes`
  to {
    transform: scale(1.1);
  }
`

const TvShow = styled(Project)`
  font-size: 16px;
  padding-bottom: 32px;
  margin-top: -16px;
  text-shadow: -3px 4px black;

  &:hover {
    background-color: #e5e5f7;
    opacity: 0.8;
    background-image: radial-gradient(circle at center center, ${({ theme }) => theme.colors.blue11}, #e5e5f7),
      repeating-radial-gradient(
        circle at center center,
        ${({ theme }) => theme.colors.blue11},
        ${({ theme }) => theme.colors.blue11},
        10px,
        transparent 20px,
        transparent 10px
      );
    background-blend-mode: multiply;

    will-change: transform;
    animation-name: ${pulse};
    animation-duration: 0.3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @media (max-width: 931px) {
    margin: 0;
    margin-right: -64px;
  }
`

const Kamp = styled(Project)`
  padding: 4px 8px;
  margin-bottom: -36px;

  @media (max-width: 931px) {
    margin: 0;
    margin-left: -48px;
  }
`

const Charad = styled(Project)`
  margin-right: 8px;

  &:hover {
    background-color: #e5e5f7;
    background-image: repeating-linear-gradient(
        45deg,
        ${({ theme }) => theme.colors.teal11} 25%,
        transparent 25%,
        transparent 75%,
        ${({ theme }) => theme.colors.teal11} 75%,
        ${({ theme }) => theme.colors.teal11}
      ),
      repeating-linear-gradient(
        45deg,
        ${({ theme }) => theme.colors.teal11} 25%,
        #e5e5f7 25%,
        #e5e5f7 75%,
        ${({ theme }) => theme.colors.teal11} 75%,
        ${({ theme }) => theme.colors.teal11}
      );
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;
    color: ${({ theme }) => theme.colors.gray12};
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

const Asdf = styled(Project)`
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
