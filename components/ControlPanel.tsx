import styled from 'styled-components'
import { Spacer } from './Spacer'

export const ControlPanel = () => {
  return (
    <Wrapper>
      <Title>
        Heyy! You found an <span>easter egg!</span>
      </Title>
      <Spacer size={8} />
      <Instruction>Here&apos;s a riddle for you:</Instruction>
      <Riddle>
        If you have me, you want to share me. If you share me, you haven&apos;t
        got me.
      </Riddle>
      <Spacer size={24} />
      <Instruction>
        Continue your adventure at antongunnarsson.com/your-answer
      </Instruction>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  font-family: var(--font-share-tech);
  padding-bottom: 16px;
`

const Title = styled.h2`
  margin: 0;
  font-size: 36px;
  color: black;

  span {
    font-family: var(--font-yeseva);
  }
`

const Instruction = styled.p`
  margin: 0;
  font-size: 20px;
`

const Riddle = styled.p`
  margin: 0;
  font-size: 24px;
`
