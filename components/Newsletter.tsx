import styled from 'styled-components'
import { Spacer } from './Spacer'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Fireworks } from './Fireworks'
import useSound from 'use-sound'
import Confettis from './Confettis'
import { useSoundMode } from '../contexts/SoundContext'

export const Newsletter = ({ onEasterEgg }: { onEasterEgg: () => void }) => {
  const prefersReducedMotion = useReducedMotion()
  const [email, setEmail] = useState('')
  const [playFanfare] = useSound('sounds/fanfare.mp3', { volume: 0.4 })
  const { soundMode } = useSoundMode()

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    async ({ email }: { email: string }) => {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error()
      else {
        soundMode && playFanfare()
        return response.json()
      }
    }
  )

  const handleSignup = () => {
    if (email.toLowerCase() === 'do a barrel roll') {
      onEasterEgg()
      return
    }

    mutate({ email })
  }

  return (
    <Wrapper>
      <Description>
        Now and then I send out a newsletter about{' '}
        <Confettis>web development things</Confettis> that I find interesting.
        Never more than once a month. Never any spam. It won&apos;t fill your
        inbox with noise since I&apos;ve limited myself to just 50 words. How
        long that is? Just as long as this text.
      </Description>
      <Spacer size={24} />
      <Title>50 words</Title>
      <Spacer size={24} />
      <div style={{ position: 'relative' }}>
        <AnimatePresence>
          {isSuccess ? (
            <>
              {!prefersReducedMotion && <Fireworks />}
              <SuccessMessage
                key="success"
                initial={{
                  opacity: 0,
                  transform: 'perspective(600px) rotateX(-90deg)',
                }}
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
            </>
          ) : (
            <Signup
              key="signup"
              animate={{
                opacity: 1,
                transform: 'perspective(600px) rotateX(0deg)',
              }}
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
              <Button
                disabled={isLoading || email.length < 4}
                onClick={handleSignup}
              >
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
            initial={{
              opacity: 0,
              transform: 'perspective(600px) rotateX(-90deg)',
            }}
            animate={{
              opacity: 1,
              transform: 'perspective(600px) rotateX(0deg)',
            }}
            transition={{ type: 'spring' }}
          >
            Hmm.. Something went wrong. Try again or{' '}
            <a href="https://twitter.com/awnton">reach out to me</a> if it still
            doesn&apos;t work.
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
  font-family: var(--font-jakarta);
  line-height: 1.5;
  font-weight: normal;
`

const Title = styled.h2`
  font-family: var(--font-yeseva);
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
  font-family: var(--font-jakarta);
  background: none;
  border: 2px solid var(--color-gray12);
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
  outline: none;
  width: 100%;
  &:focus-visible {
    outline: 2px solid var(--color-gray12);
    outline-offset: 4px;
  }
`

const Button = styled.button`
  background: none;
  border: 0;
  color: var(--color-gray12);
  font-family: var(--font-yeseva);
  font-size: 32px;
  border-radius: 8px;
  padding: 0 12px;
  cursor: pointer;
  margin-left: auto;
  &:hover {
    background-color: var(--color-gray3);
    color: var(--color-primary11);
  }
  &:disabled {
    cursor: no-drop;
    color: var(--color-gray10);
  }
  @media (max-width: 481px) {
    margin-top: 8px;
  }
`

const ErrorMessage = styled(motion.p)`
  margin: 0;
  padding: 8px;
  background-color: var(--color-red9);
  color: var(--color-primary1);
  font-size: 16px;
  transform-origin: center top;
  > a {
    text-decoration: underline;
    &:hover {
      color: var(--color-primary4);
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
      color: var(--color-primary4);
    }
  }
`
