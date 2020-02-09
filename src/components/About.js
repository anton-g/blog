// Styles from https://github.com/React95/React95
import React, { useState } from 'react'
import styled from 'styled-components'
import { Btn, Modal } from './95'
import { Link } from 'gatsby'

export default function About({ width, height }) {
  const [open, setOpen] = useState(false)

  return (
    <AboutWrapper width={width} height={height}>
      <Btn onClick={() => setOpen(!open)}>Hi Anton! 👋</Btn>
      <Modal
        width="400px"
        closeModal={() => setOpen(!open)}
        title="Hey you!"
        open={open}
      >
        <p>I'm Anton! 👋</p>
        <p>
          I'm a web developer from Stockholm, Sweden and I've been passionate
          about programming ever since I discovered that by writing words in a
          certain order, I could tell the computer what to do! 😱 It was just
          like magic! ✨
        </p>
        <p>
          This is my personal site where I try to keep track of my side{' '}
          <Link to="/projects">projects</Link> and occasionally post stuff on my{' '}
          <Link to="/posts">blog</Link>. If you have any questions or just want
          to talk (or meet up if you're ever in Stockholm!), it's easiest to
          reach me on <a href="https://twitter.com/awnton">Twitter (@awnton)</a>
          . 🎉
        </p>
        <p>Have a day full of joy!</p>
      </Modal>
    </AboutWrapper>
  )
}

const AboutWrapper = styled.div`
  grid-column-start: span ${props => props.width};
  grid-row-start: span ${props => props.height};
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
