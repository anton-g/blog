import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import { Fireworks } from '../components/Fireworks'
import PageTitle from '../components/PageTitle'

const WoopWoop: NextPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>🤫</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Content>
        <PageTitle>WOOP WOOP</PageTitle>
        personal easteregg
        <Fireworks />
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-bottom: 36px;
  color: var(--color-gray1);
  background-color: var(--color-gray12);
  min-height: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default WoopWoop
