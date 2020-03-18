// Styles from https://github.com/React95/React95
import React, { useState } from 'react'
import styled from 'styled-components'
import { Btn, Modal } from './95'
import { Link } from 'gatsby'
import BlockWrapper from './BlockWrapper'

export default function About() {
  const [open, setOpen] = useState(false)

  return (
    <AboutWrapper>
      <Btn onClick={() => setOpen(!open)}>
        Hi Anton!
        <span role="img" aria-label="waving hand">
          👋
        </span>
      </Btn>
      <Modal
        width="400px"
        closeModal={() => setOpen(!open)}
        title="Hey you!"
        open={open}
      >
        <p>
          I'm Anton!{' '}
          <span role="img" aria-label="waving hand">
            👋
          </span>
        </p>
        <p>
          I'm a web developer from Stockholm, Sweden and I've been passionate
          about programming ever since I discovered that by writing words in a
          certain order, I could tell the computer what to do!{' '}
          <span role="img" aria-label="surprised face">
            😱
          </span>{' '}
          It was just like magic!{' '}
          <span role="img" aria-label="glitter">
            ✨
          </span>
        </p>
        <p>
          This is my personal site where I try to keep track of my side{' '}
          <Link to="/projects">projects</Link> and occasionally post stuff on my{' '}
          <Link to="/posts">blog</Link>. If you have any questions or just want
          to talk (or meet up if you're ever in Stockholm!), it's easiest to
          reach me on <a href="https://twitter.com/awnton">Twitter (@awnton)</a>
          .{' '}
          <span role="img" aria-label="party hat">
            🎉
          </span>
        </p>
        <p>Have a day full of joy!</p>
      </Modal>
    </AboutWrapper>
  )
}

const AboutWrapper = styled(BlockWrapper)`
  grid-column-start: span 2;
  grid-row-start: span 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5aa;
  font-family: 'MS Sans Serif';
  font-size: 13px;

  p {
    margin-bottom: 0;

    &:first-child {
      margin-top: 0;
    }
  }
`
