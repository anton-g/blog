import React from 'react'
import { Accordion } from './Accordion'
import { styled } from '@stitches/react'

import raccoon from './raccoon.gif'
import Confettis from '../Confettis'
import Image from 'next/image'

export function AccordionExample() {
  return (
    <Wrapper>
      <Accordion>
        <Option>
          <StyledToggle eventKey="item1">Item 1</StyledToggle>
          <Accordion.Content eventKey="item1">
            <Content>
              Hey you! I'm a <b>interactive</b> example! Try expanding the other items or closing this one!
            </Content>
          </Accordion.Content>
        </Option>
        <Option>
          <StyledToggle eventKey="item2">Item 2</StyledToggle>
          <Accordion.Content eventKey="item2">
            <Content>
              I'm built with flexibility in mind so that I don't limit the type of content any section can have. Like a
              component with some more <Confettis>C O N F E T T I</Confettis>!
            </Content>
          </Accordion.Content>
        </Option>
        <Option>
          <StyledToggle eventKey="item3">Item 3</StyledToggle>
          <Accordion.Content eventKey="item3">
            <Content>
              Or why not a gif:
              <Image src={raccoon} alt="racoon" />
            </Content>
          </Accordion.Content>
        </Option>
      </Accordion>
    </Wrapper>
  )
}

const Wrapper = styled('div', {
  margin: '0 auto 24px',
  maxWidth: '480px',
})

const Option = styled('div', {
  border: '1px solid grey',
  '&:first-child': {
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  },
  '&:last-child': {
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
  },
  '&:not(:last-child)': {
    borderBottom: 0,
  },
})

const StyledToggle = styled(Accordion.Toggle, {
  background: 'none',
  color: 'var(--color-text)',
  padding: '8px 16px',
  border: 'none',
  width: '100%',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: '16px',
})

const Content = styled('div', {
  fontSize: '14px',
  padding: '8px 16px 16px',
})
