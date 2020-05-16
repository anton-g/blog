import React, { useState } from 'react'
import styled from 'styled-components'

import rightHand from './retro.gif'
import leftHand from './Retroceder.gif'

const gifs = [
  'dancingbaby',
  '3demail',
  'earth',
  'home',
  'ie',
  'internet',
  'loading',
  'skeleton',
]

export default function Retro() {
  const [displayedGifs, setDisplayedGifs] = useState([])

  const addGif = () => {
    const x = Math.floor(Math.random() * window.innerWidth) + 1
    const y = Math.floor(Math.random() * window.innerHeight) + 1
    const gifName = gifs[Math.floor(Math.random() * gifs.length)]
    setDisplayedGifs(g => [...g, { name: gifName, x, y }])
  }

  return (
    <RetroWrapper>
      <Button onClick={addGif}>
        <HandRow>
          <img
            style={{
              transform: 'scaleX(-1) rotateZ(-45deg)',
            }}
            src={leftHand}
          ></img>
          <img style={{ transform: 'rotateZ(-45deg)' }} src={rightHand}></img>
        </HandRow>
        retro!
        <HandRow>
          <img
            style={{ transform: 'scaleX(-1) rotateZ(45deg)' }}
            src={rightHand}
          ></img>
          <img
            style={{
              transform: 'rotateZ(45deg)',
            }}
            src={leftHand}
          ></img>
        </HandRow>
      </Button>
      {displayedGifs.map((x, idx) => (
        <Gif key={idx} src={`/gifs/${x.name}.gif`} x={x.x} y={x.y}></Gif>
      ))}
    </RetroWrapper>
  )
}

const RetroWrapper = styled.div`
  grid-column-start: 2 span;
  grid-row-start: 1 span;

  width: 100%;
  height: 100%;

  background-color: paleturquoise;
  font-size: 2em;
`

const HandRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const Gif = styled.img`
  position: absolute;
  top: ${p => p.y}px;
  left: ${p => p.x}px;
`

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  font-size: 1em;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  cursor: pointer;
  text-align: center;
  font-family: 'Press Start 2P', cursive;
  color: palevioletred;
`
