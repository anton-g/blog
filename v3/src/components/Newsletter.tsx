import styled from 'styled-components'
import Confettis from './Confettis'
import { Spacer } from './Spacer'

export const Newsletter = () => {
  return (
    <Wrapper>
      <Description>
        Now and then I send out a newsletter about <Confettis>web development things</Confettis> that I find
        interesting. Never more than once a month. Never any spam. It won't fill your inbox with noise since I've
        limited myself to just 50 words. How long that is? Like the text you just read.
      </Description>
      <Spacer size={24} />
      <Title>50 words</Title>
      <Spacer size={24} />
      <Signup>
        <Input type="email" placeholder="your@email.com"></Input>
        <Spacer size={16} />
        <Button>Subscribe</Button>
      </Signup>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 518px;
  font-size: 20px;
  letter-spacing: 1px;
  padding: 0 16px;
`

const Description = styled.p`
  margin: 0;
  padding: 0;
  font-family: 'Plus Jakarta Sans';
  line-height: 1.5;
  font-weight: normal;
`

const Title = styled.h2`
  font-family: 'Yeseva One';
  font-size: 4.5rem;
  margin: 0;
  padding: 0;
  font-weight: normal;
  line-height: 0.8;
`

const Signup = styled.div`
  display: flex;
  @media (max-width: 481px) {
    flex-wrap: wrap;
  }
`

const Input = styled.input`
  padding: 4px 8px;
  font-size: 28px;
  font-family: 'Plus Jakarta Sans';
  background: none;
  border: 2px solid ${({ theme }) => theme.colors.gray12};
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;

  outline: none;

  width: 100%;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gray12};
    outline-offset: 4px;
  }
`

const Button = styled.button`
  background: none;
  border: 0;
  color: ${({ theme }) => theme.colors.gray12};
  font-family: 'Yeseva One';
  font-size: 32px;
  border-radius: 8px;
  padding: 0 12px;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray3};
    color: ${({ theme }) => theme.colors.primary11};
  }

  @media (max-width: 481px) {
    margin-top: 8px;
  }
`
