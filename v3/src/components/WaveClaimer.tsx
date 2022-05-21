import { useAbsoluteMinuteInterval } from '../hooks/useAbsoluteMinuteInterval'
import { useWaveLayer } from './WaveLayerContext'
import useCountDown from 'react-countdown-hook'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Spacer } from './Spacer'

export const WaveClaimer = () => {
  const [name, setName] = useState('')
  const { claiming, setClaiming, currentWave } = useWaveLayer()

  const [timeLeft, { start }] = useCountDown(60000, 1000)

  useAbsoluteMinuteInterval(() => {
    start(60000)
  })

  useEffect(() => {
    start((60 - new Date().getSeconds()) * 1000)
  }, [start])

  const alreadyClaimed = Boolean(currentWave)
  const seconds = timeLeft / 1000
  const time = `${seconds}`.length < 2 ? `0${seconds}` : seconds

  return (
    <Wrapper>
      <Text>
        Spread some joy by claiming a weekly minute of waving on this page. Choose a name and click where you want your
        waving to appear.
      </Text>
      <Spacer size={16} />
      <BottomRow>
        <Inputs>
          <input
            type="text"
            placeholder="First name"
            disabled={alreadyClaimed}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={22}
          ></input>
          <Spacer size={8} />
          <button disabled={Boolean(claiming) || alreadyClaimed} onClick={() => setClaiming(name)}>
            {alreadyClaimed ? 'This minute is already claimed' : 'Claim this minute'}
          </button>
        </Inputs>
        <Spacer size={8} />
        <Countdown>{time}</Countdown>
      </BottomRow>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 250px;
`

const BottomRow = styled.div`
  display: flex;
  align-items: center;
`

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Text = styled.p`
  font-size: 14px;
  margin: 0;
  padding: 0;
`

const Countdown = styled.div`
  font-variant-numeric: tabular-nums;
  font-size: 28px;
`
