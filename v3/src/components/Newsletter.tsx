import styled from 'styled-components'
import Confettis from './Confettis'
import { Spacer } from './Spacer'
import { useMutation } from 'react-query'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export const Newsletter = () => {
  const [email, setEmail] = useState('')

  const { mutate, isLoading, isError, isSuccess } = useMutation(({ email }: { email: string }) => {
    return fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) throw new Error()
      else return response.json()
    })
  })

  return (
    <Wrapper>
      <Description>
        Now and then I send out a newsletter about <Confettis>web development things</Confettis> that I find
        interesting. Never more than once a month. Never any spam. It won&apos;t fill your inbox with noise since
        I&apos;ve limited myself to just 50 words. How long that is? Like the text you just read.
      </Description>
      <Spacer size={24} />
      <Title>50 words</Title>
      <Spacer size={24} />
      <div style={{ position: 'relative' }}>
        <AnimatePresence>
          {isSuccess ? (
            <SuccessMessage
              key="success"
              initial={{ opacity: 0, transform: 'perspective(600px) rotateX(-90deg)' }}
              animate={{
                opacity: 1,
                transform: 'perspective(600px) rotateX(0deg)',
                transitionEnd: {
                  position: 'relative',
                },
              }}
              transition={{ type: 'spring' }}
            >
              Woho! Check your email to confirm your subscription!
            </SuccessMessage>
          ) : (
            <Signup
              key="signup"
              animate={{ opacity: 1, transform: 'perspective(600px) rotateX(0deg)' }}
              exit={{
                opacity: 0,
                transform: 'perspective(600px) rotateX(90deg)',
              }}
              transition={{ type: 'spring' }}
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
              <Spacer size={16} />
              <Button disabled={isLoading} onClick={() => mutate({ email: '' })}>
                Subscribe
              </Button>
            </Signup>
          )}
        </AnimatePresence>
      </div>
      {isError && (
        <>
          <Spacer size={16} />
          <ErrorMessage
            initial={{ opacity: 0, transform: 'perspective(600px) rotateX(-90deg)' }}
            animate={{
              opacity: 1,
              transform: 'perspective(600px) rotateX(0deg)',
            }}
            transition={{ type: 'spring' }}
          >
            Hmm.. Something went wrong. Try again or <a href="https://twitter.com/awnton">reach out to me</a> if it
            still doesn&apos;t work.
          </ErrorMessage>
        </>
      )}
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

const Signup = styled(motion.div)`
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

  &:disabled {
    cursor: no-drop;
    color: ${({ theme }) => theme.colors.gray10};
  }

  @media (max-width: 481px) {
    margin-top: 8px;
  }
`

const ErrorMessage = styled(motion.p)`
  margin: 0;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.red9};
  color: ${({ theme }) => theme.colors.primary1};
  font-size: 16px;
  transform-origin: center top;

  > a {
    text-decoration: underline;

    &:hover {
      color: ${({ theme }) => theme.colors.primary4};
    }
  }
`

const SuccessMessage = styled(motion.p)`
  margin: 0;
  padding: 0;
  font-size: 20px;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  > a {
    text-decoration: underline;

    &:hover {
      color: ${({ theme }) => theme.colors.primary4};
    }
  }
`
