import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

const BlogIndex = (props) => {
  return (
    <Layout maxWidth="900px" location={props.location}>
      <SEO title={'home'} meta={[{ name: 'og:type', content: 'website' }]} />
      <Content>
        <Intro>
          <h1>
            Hi, I'm Anton!{' '}
            <span role="img" aria-label="waving hand emoji">
              👋
            </span>
          </h1>
          <p>
            I'm a web developer consultant and this is my corner of the internet, my{' '}
            <Link to="/digital-garden">Digital Garden</Link>{' '}
            <span role="img" aria-label="leaf emoji">
              🌿
            </span>
            . Here you'll mostly find things I write, a few of my favorites are why{' '}
            <Link to="software-development-is-a-social-profession">our profession is social at it's core</Link> and
            things I consider <Link to="react-component-code-smells">code smells in React</Link>, but also some of my
            talks and projects.
          </p>
          <p>
            Questions? Hit me up on <a href="https://twitter.com/awnton">Twitter!</a>
          </p>
        </Intro>
        <Sections>
          <Section>
            <Title>recorded talks</Title>
            <List>
              <li>
                <span role="img" aria-label="lightning bolt">
                  ⚡️
                </span>{' '}
                <a href="https://www.youtube.com/watch?v=uo3px1L3H70">Nordic.js: CSS *is* awesome</a>
              </li>
              <li>
                <span role="img" aria-label="two arrows in a circle creating a loop">
                  🔁
                </span>{' '}
                <a href="https://youtu.be/GYSD0JudjwI?t=125">sthlm.js: Into the Visual World of State Machines</a>
              </li>
              <li>
                <span role="img" aria-label="silloutes of two people">
                  👥
                </span>{' '}
                <a href="https://www.youtube.com/watch?v=q7bAYxZMJho">
                  sthlm.js: It's always better when we're together
                </a>
              </li>
            </List>
            <Title>appearances</Title>
            <List>
              <li>
                <span role="img" aria-label="microphone emoji">
                  🎙
                </span>{' '}
                <a href="https://kodsnack.se/409/">Kodsnack 409</a>{' '}
                <span role="img" aria-label="swedish flag">
                  🇸🇪
                </span>
              </li>
              <li>
                <span role="img" aria-label="microphone emoji">
                  🎙
                </span>{' '}
                <a href="https://kodsnack.se/393/">Kodsnack 393</a>{' '}
                <span role="img" aria-label="swedish flag">
                  🇸🇪
                </span>
              </li>
              <li>
                <span role="img" aria-label="microphone emoji">
                  🎙
                </span>{' '}
                <a href="https://kodsnack.se/194/">Kodsnack 194</a>{' '}
                <span role="img" aria-label="swedish flag">
                  🇸🇪
                </span>
              </li>
            </List>
          </Section>
          <Section>
            <Title>projects</Title>
            <List>
              <li>
                <span role="img" aria-label="hamburger emoji">
                  🍔
                </span>{' '}
                <a href="https://fredagslunchen.club">Fredagslunchen</a>
              </li>
              <li>
                <span role="img" aria-label="painting palette emoji">
                  🎨
                </span>{' '}
                <a href="https://draw.wtf">draw.wtf</a>
              </li>
              <li>
                <span role="img" aria-label="tv emoji">
                  📺
                </span>{' '}
                <a href="https://tv-show-quiz.netlify.app">TV Show Ratings Quiz</a>
              </li>
              <li>
                <span role="img" aria-label="screaming face emoji">
                  😱
                </span>{' '}
                <a href="https://github.com/anton-g/AAAAAAAHHHH">AAAAAAAHHHH</a>
              </li>
              <li>
                <span role="img" aria-label="music notes emoji">
                  🎶
                </span>{' '}
                <a href="https://github.com/anton-g/quizify">Quizify</a>
              </li>
              <li>
                <span role="img" aria-label="people wrestling emoji">
                  🤼
                </span>{' '}
                <a href="https://kampgeneratorn.se">Kampgeneratorn</a> 🇸🇪
              </li>
              <li>
                <span role="img" aria-label="theater emoji">
                  🎭
                </span>{' '}
                <a href="https://charades.netlify.app">Charadgeneratorn</a> 🇸🇪
              </li>
              <li>
                <span role="img" aria-label="microphone emoji">
                  🎙
                </span>{' '}
                <a href="https://asdf.pizza">asdf.pizza</a> 🇸🇪
              </li>
            </List>
          </Section>
        </Sections>
      </Content>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Content = styled.div`
  font-size: 14px;
  line-height: 1.5;
  padding: 0 16px;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Intro = styled.div`
  max-width: 450px;
`

const Sections = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const Section = styled.section`
  max-width: 50%;
`

const Title = styled.h2`
  font-size: 16px;
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  line-height: 1.7;
  margin-bottom: 2rem;
`
