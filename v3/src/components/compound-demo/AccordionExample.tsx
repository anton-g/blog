import React from 'react'
import { Accordion } from './Accordion'

import raccoon from './raccoon.gif'
import Confettis from '../Confettis'
import Image from 'next/image'
import styled from 'styled-components'

export function AccordionExample() {
  return (
    <Wrapper>
      <Accordion>
        <Option>
          <StyledToggle eventKey="item1">Item 1</StyledToggle>
          <Accordion.Content eventKey="item1">
            <Content>
              Hey you! I&apos;m a <b>interactive</b> example! Try expanding the other items or closing this one!
            </Content>
          </Accordion.Content>
        </Option>
        <Option>
          <StyledToggle eventKey="item2">Item 2</StyledToggle>
          <Accordion.Content eventKey="item2">
            <Content>
              I&apos;m built with flexibility in mind so that I don&apos;t limit the type of content any section can
              have. Like a component with some more <Confettis>C O N F E T T I</Confettis>!
            </Content>
          </Accordion.Content>
        </Option>
        <Option>
          <StyledToggle eventKey="item3">Item 3</StyledToggle>
          <Accordion.Content eventKey="item3">
            <Content>
              Or why not a gif:
              <Image
                src={raccoon}
                alt="racoon"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Content>
          </Accordion.Content>
        </Option>
      </Accordion>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 auto 24px;
  max-width: 480px;
`

const Option = styled.div`
  border: 1px solid grey;
  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  &:not(:last-child) {
    border-bottom: 0;
  }
`

const StyledToggle = styled(Accordion.Toggle)`
  background: none;
  color: var(--color-text);
  padding: 8px 16px;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 16px;
`

const Content = styled.div`
  font-size: 14px;
  padding: 8px 16px 16px;
`
