import React, { useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import styled, { css, keyframes } from 'styled-components'
import useKonami from '../hooks/useKonami'
import { Spacer } from './Spacer'
import { Achievement } from './Achievement'

export const AchievementsModal = () => {
  const [open, setOpen] = useState(false)
  useKonami(() => {
    setOpen(true)
  })

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Overlay />
        <Content>
          <Title>
            <svg viewBox="0 0 500 156">
              <path
                id="curve"
                d="M73.2002 148.6C77.2002 142.5 138.7 79.3 251.8 80.5C363.1 81.7 422.6 143.3 426.9 150"
                fill="none"
              />
              <path
                d="M250 108L254.715 122.511H269.972L257.629 131.479L262.343 145.989L250 137.021L237.657 145.989L242.371 131.479L230.028 122.511H245.285L250 108Z"
                fill="black"
              />
              <path
                d="M214 118L216.47 125.601H224.462L217.996 130.298L220.466 137.899L214 133.202L207.534 137.899L210.004 130.298L203.538 125.601H211.53L214 118Z"
                fill="black"
              />
              <path
                d="M188 123L189.347 127.146H193.706L190.18 129.708L191.527 133.854L188 131.292L184.473 133.854L185.82 129.708L182.294 127.146H186.653L188 123Z"
                fill="black"
              />
              <path
                d="M286 118L283.53 125.601H275.538L282.004 130.298L279.534 137.899L286 133.202L292.466 137.899L289.996 130.298L296.462 125.601H288.47L286 118Z"
                fill="black"
              />
              <path
                d="M312 123L310.653 127.146H306.294L309.82 129.708L308.473 133.854L312 131.292L315.527 133.854L314.18 129.708L317.706 127.146H313.347L312 123Z"
                fill="black"
              />
              <text width="500">
                <textPath xlinkHref="#curve">Achievements</textPath>
              </text>
            </svg>
          </Title>
          <Inner>
            <Description>
              Wow, you found the super secret list of achivements! Now you just
              have to go explore the site to unlock your badges!
            </Description>
            <Spacer size={24} />
            <Achievements>
              <Achievement variant="birb" locked={true} />
              <Achievement variant="eggo" locked={false} />
              <Achievement variant="space" locked={true} />
              <Achievement variant="balloon" locked={true} />
              <Achievement variant="barrel" locked={true} />
            </Achievements>
          </Inner>
          <Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Close>
        </Content>
      </Dialog.Root>
    </>
  )
}

const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Overlay = styled(Dialog.Overlay)`
  background-color: hsl(0 0% 0% / 0.2);
  backdrop-filter: blur(2px);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
`

const Content = styled(Dialog.Content)`
  z-index: 2;
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  max-width: 550px;
  max-height: 85vh;
  padding-top: 0;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }
`

const Inner = styled.div`
  padding: 24px;
`

const Title = styled(Dialog.Title)`
  margin: 0;
  font-family: var(--font-yeseva);
  font-size: 56px;
`

const Description = styled(Dialog.Description)`
  margin: 0;
  padding: 0;
  text-align: center;
`

const Close = styled(Dialog.Close)`
  position: absolute;
  top: 4px;
  right: 4px;
  border: 0;
  border-radius: 8px;
  background-color: transparent;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--color-gray3);
  }
`

const Achievements = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
`
