import styled, { css, keyframes } from 'styled-components'
import useMouse from '@react-hook/mouse-position'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import { MouseEventHandler } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Claim } from '../pages/api/claims'
import { useWaveLayer, Wave } from './WaveLayerContext'
import * as Tooltip from '@radix-ui/react-tooltip'

export const WaveLayer = () => {
  const queryClient = useQueryClient()
  const { claiming, setClaiming, currentWave } = useWaveLayer()
  const ref = useRef<HTMLDivElement>(null)
  const mouse = useMouse(ref)

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    ({ x, y, name }: Wave) => {
      return fetch('/api/claims', {
        method: 'POST',
        body: JSON.stringify({
          x,
          y,
          name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (!response.ok) throw new Error()
        return response.json()
      })
    },
    {
      onSuccess: (newClaim: Claim) => {
        queryClient.setQueryData('claims', (claims: Claim[] | undefined) =>
          claims ? [...claims, newClaim] : [newClaim]
        )
      },
    }
  )

  let mouseXPosition = mouse.pageX || 0
  let mouseYPosition = mouse.pageY || 0

  const onClaim: MouseEventHandler<HTMLDivElement> = (e) => {
    const relativeX = e.pageX / document.body.clientWidth
    const relativeY = e.pageY / document.body.clientHeight

    if (!claiming) return

    mutate({
      x: relativeX,
      y: relativeY,
      name: claiming,
    })

    setClaiming(null)
  }

  return (
    <Wavings ref={ref} claiming={Boolean(claiming)} onClick={onClaim}>
      {claiming && (
        <Cursor
          animate={{
            opacity: 1,
            x: mouseXPosition,
            y: mouseYPosition,
            transition: {
              type: 'spring',
              mass: 0.6,
            },
          }}
          transition={{
            type: 'spring',
            stiffness: 0,
            damping: 28,
          }}
        >
          <Hand>👋</Hand>
        </Cursor>
      )}
      <Tooltip.Provider>
        <AnimatePresence>
          {!claiming && currentWave && (
            <Tooltip.Root>
              <motion.div
                style={{
                  position: 'absolute',
                }}
                initial={{
                  opacity: 0,
                  scale: 0.1,
                  left: document.body.clientWidth * currentWave.x,
                  top: document.body.clientHeight * currentWave.y,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  left: document.body.clientWidth * currentWave.x,
                  top: document.body.clientHeight * currentWave.y,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.1,
                }}
              >
                <TooltipTrigger>
                  <Hand>👋</Hand>
                </TooltipTrigger>
                <TooltipContent>
                  <Tooltip.Arrow />
                  {currentWave.name} says hi!
                </TooltipContent>
              </motion.div>
            </Tooltip.Root>
          )}
        </AnimatePresence>
      </Tooltip.Provider>
    </Wavings>
  )
}

const wave = keyframes`
  0% { transform: rotate( 0.0deg) }
  10% { transform: rotate(16.0deg) }
  20% { transform: rotate(-10.0deg) }
  30% { transform: rotate(16.0deg) }
  40% { transform: rotate(-6.0deg) }
  50% { transform: rotate(12.0deg) }
  60% { transform: rotate( 0.0deg) }
  100% { transform: rotate( 0.0deg) }
`

const Wavings = styled.div<{ claiming: boolean }>`
  position: absolute;
  min-height: 100%;
  width: 100%;
  z-index: 99;
  pointer-events: none;

  ${({ claiming }) =>
    claiming &&
    css`
      pointer-events: all;
      cursor: none;
    `}
`

const Cursor = styled(motion.div)``

const TooltipTrigger = styled(Tooltip.Trigger)`
  background: none;
  border: 0;
  pointer-events: all;
`

const TooltipContent = styled(Tooltip.Content)`
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 16;
  background-color: ${({ theme }) => theme.colors.gray12};
  color: ${({ theme }) => theme.colors.primary1};
  border: 1px solid ${({ theme }) => theme.colors.primary1};
  border-top: 0;
`

const Hand = styled.div`
  font-size: 24px;
  animation-name: ${wave};
  animation-duration: 2.2s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
  display: inline-block;
  user-select: none;
`
