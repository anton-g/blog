import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import fs from 'fs'
import { ParsedUrlQuery } from 'querystring'
import Image from 'next/image'
import styled from 'styled-components'
import { Nav } from '../../components/Nav'
import { join } from 'path'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo, useState } from 'react'
import { Code } from '../../components/Code'
import { getPost, Post } from '../../lib/mdx'
import Head from 'next/head'
import ConfettiCanon from '../../components/ConfettiCanon'
import { useRouter } from 'next/router'
import { Spacer } from '../../components/Spacer'
import Confettis from '../../components/Confettis'
import { DragHandlers, motion } from 'framer-motion'
import useDimensions from '../../hooks/useDimensions'
import useSound from 'use-sound'
import { trackGoal } from 'fathom-client'
import { useSoundMode } from '../../contexts/SoundContext'

if (process.platform === 'win32') {
  process.env.ESBUILD_BINARY_PATH = join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'esbuild.exe'
  )
} else {
  process.env.ESBUILD_BINARY_PATH = join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'bin',
    'esbuild'
  )
}

const ResponsiveImage = (props: any) => (
  <Image
    {...props}
    alt={props.alt}
    sizes="100vw"
    width={1}
    height={1}
    style={{
      display: 'block',
      width: '100%',
      height: 'auto',
      margin: '0 auto',
    }}
  />
)

const components = {
  pre: Code,
  img: ResponsiveImage,
}

const PostPage: NextPage<{ result: Post }> = ({ result }) => {
  const Component = useMemo(() => getMDXComponent(result.code), [result.code])
  console.log('render')

  return (
    <div>
      <Head>
        <title>{result.frontmatter.title}</title>
        <meta
          name="description"
          content={`${result.frontmatter.description}, written by Anton Gunnarsson`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Wrapper>
        <Title>{result.frontmatter.title}</Title>
        <Content>
          <Component components={components} />
        </Content>
        <Spacer size={96} />
        <PostFooter post={result} />
      </Wrapper>
    </div>
  )
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

const postsDirectory = join(process.cwd(), 'content')

export const getStaticProps: GetStaticProps<{}, IParams> = async ({
  params,
}) => {
  if (!params) throw Error('wtf')

  const result = await getPost(params.slug)

  if (result.errors.length > 0) {
    throw Error('wtf')
  }

  return {
    props: { result },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(postsDirectory)
  const posts = await Promise.all(
    files.map(async (fileName) => {
      const slug = fileName.replace('.mdx', '')
      const mdx = await getPost(slug)

      return {
        frontmatter: mdx.frontmatter,
        slug,
      }
    })
  )
  const publicPosts = posts.filter((x) => !x.frontmatter.unlisted)

  return {
    paths: publicPosts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export default PostPage

const Wrapper = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;

  @media screen and (max-width: 420px) {
    padding: 16px;
  }
`

const Title = styled.h1`
  font-family: var(--font-yeseva);
  max-width: 1000px;
  font-size: clamp(46px, 6vw + 1rem, 96px);
  text-align: center;
  font-weight: normal;
  line-height: 1;
  margin-top: clamp(66px, 10vw + 1rem, 96px);
`

const Content = styled.div`
  max-width: 660px;
  width: 100%;
  code {
    background-color: var(--color-gray2);
    font-family: var(--font-share-tech), monospace;
  }
  a {
    color: var(--color-primary11);
    &:focus,
    &:hover {
      text-decoration: underline var(--color-primary11) wavy;
      text-decoration-skip-ink: none;
    }
  }
  h2 {
    margin-top: 48px;
  }
`

const PostFooter = ({ post }: { post: Post }) => {
  const [draggedClass, setDraggedClass] = useState('')
  const [birdFed, setBirdFed] = useState(false)
  const { soundMode } = useSoundMode()
  const [playEatingSound] = useSound('/sounds/eating.mp3', { volume: 0.5 })
  const [ref, feedDimensions] = useDimensions({ liveMeasure: true })
  const router = useRouter()

  const encodedTitle = encodeURI('"' + post.frontmatter.title + '"')
  const url = `https://antongunnarsson.com/${router.asPath}`
  const shareLink = `https://twitter.com/share?url=${url}&text=${encodedTitle}%20by%20Anton%20Gunnarsson.&via=Awnton`

  const onDragFeedEnd: DragHandlers['onDragEnd'] = (e, info) => {
    if (!feedDimensions) return
    setDraggedClass('')
    const { x, y } = info.point

    const targetMinX = feedDimensions.left + window.pageXOffset - 10
    const targetMaxX = feedDimensions.left + window.pageXOffset + 10
    const targetMinY = feedDimensions.top + window.pageYOffset - 10
    const targetMaxY = feedDimensions.top + window.pageYOffset + 10

    const matchingX = x > targetMinX && x < targetMaxX
    const matchingY = y > targetMinY && y < targetMaxY

    if (matchingX && matchingY) {
      console.log('woop woop')
      setBirdFed(true)
      soundMode && playEatingSound()
      trackGoal('8CF5F0FV', 0)
    }
  }

  return (
    <FooterWrapper>
      <motion.svg
        drag
        dragSnapToOrigin
        onDrag={() => setDraggedClass('dragged')}
        onDragEnd={onDragFeedEnd}
        className={draggedClass}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="12px"
        height="12px"
        viewBox="0 0 12 12"
        xmlSpace="preserve"
        overflow="visible"
        style={
          birdFed
            ? {
                opacity: 0,
              }
            : undefined
        }
      >
        <circle fill="black" r="3" cx="6" cy="6"></circle>
      </motion.svg>
      <Spacer size={96} />
      <Footer>
        <ConfettiWrapper>
          <ConfettiCanon></ConfettiCanon>
          <Arrow>
            <svg
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
          </Arrow>
          <p>
            Enjoyed the post? <br />
            Celebrate with <Confettis>confetti</Confettis>!
          </p>
        </ConfettiWrapper>
        <TwitterWrapper>
          <p>Share this post on Twitter!</p>
          <Arrow>
            <svg
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Arrow>
          <ShareLink href={shareLink} target="_blank" rel="noopener noreferrer">
            <FeedAnchor ref={ref} />
            <Bird fed={birdFed} />
          </ShareLink>
        </TwitterWrapper>
      </Footer>
    </FooterWrapper>
  )
}

const Footer = styled.div`
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 64px;
  width: 100%;
  gap: 12px 0;
`

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &:has(svg.dragged) ${Footer} {
    pointer-events: none;
    user-select: none;
  }
`

const Arrow = styled.div`
  width: 20px;
  height: 20px;
`

const TwitterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;

  svg {
    transition: transform 0.3s;
  }

  a:hover svg {
    transform: scale(1.2) rotateZ(-10deg);
  }

  p {
    max-width: 150px;
    text-align: right;
  }

  ${Arrow} {
    margin-left: 20px;
  }
`

const ConfettiWrapper = styled.div`
  display: flex;
  align-items: center;

  ${Arrow} {
    margin-right: 20px;
  }
`

const ShareLink = styled.a`
  position: relative;
`

const FeedAnchor = styled.div`
  top: 5px;
  left: 65px;
  position: absolute;
  width: 1px;
  height: 1px;
`

const Bird = ({ fed }: { fed: boolean }) => {
  return (
    <svg
      width="80"
      height="50"
      viewBox="0 0 247 201"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        animate={fed ? 'eat' : undefined}
        variants={birdVariants}
        d="M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 229.43 9.53262 239.35 3.65262C235.58 15.3426 227.69 25.2726 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z"
        fill="#1D9BF0"
      />
    </svg>
  )
}

const birdVariants = {
  eat: {
    d: [
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 229.43 9.53262 239.35 3.65262C235.58 15.3426 227.69 25.2726 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // open
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 236 15.9126 246.15 23.6326C237.5 28 230 30.0678 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // closed
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C219.5 15.9126 235 15.9126 246.15 19C233 23.6326 226 25 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // half
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 236 15.9126 246.15 23.6326C237.5 28 230 30.0678 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // closed
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 229.43 9.53262 239.35 3.65262C235.58 15.3426 227.69 25.2726 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // open
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 236 15.9126 246.15 23.6326C237.5 28 230 30.0678 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // closed
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C219.5 15.9126 235 15.9126 246.15 19C233 23.6326 226 25 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // half
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 236 15.9126 246.15 23.6326C237.5 28 230 30.0678 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // closed
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 229.43 9.53262 239.35 3.65262C235.58 15.3426 227.69 25.2726 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // open
    ],
    transition: {
      ease: 'easeInOut',
      duration: 2,
      times: [0, 1],
      delay: 0.2,
    },
  },
}
