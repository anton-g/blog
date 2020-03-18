import React from 'react'
import styled from 'styled-components'
import useMeasure from 'react-use-measure'
import { ResizeObserver } from '@juggle/resize-observer'

export default function Spotify() {
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver })

  return (
    <Wrapper ref={ref}>
      <iframe
        src="https://open.spotify.com/embed/track/0sf12qNH5qcw8qpgymFOqD"
        width={bounds.width}
        height="80"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        title="spotify"
      ></iframe>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-column-start: 3 span;
  grid-row-start: 1 span;
  display: flex;
  align-items: center;
  background: linear-gradient(#af681b, #1b1005);
`
