import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import fs from 'fs'
// import { MDXProvider } from '@mdx-js/react'
import { ParsedUrlQuery } from 'querystring'
// import { MDXRemote } from 'next-mdx-remote'
// import { getAllPublicPosts, getPostBySlug, Post } from '../../api'
// import { Callout } from '../../components/Callout'
import Image, { ImageProps } from 'next/image'
// import RenderPropsCounter from '../../components/RenderPropsCounter'
// import { Extracurricular } from '../../components/Extracurricular'
import Confettis from '../../components/Confettis'
// import { AccordionExample } from '../../components/compound-demo/AccordionExample'
// import { Folders } from '../../components/recursive-demo/Folders'
import styled from 'styled-components'
// import { Code } from '../../components/Code'
import { Nav } from '../../components/Nav'
import { join } from 'path'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import { Code } from '../../components/Code'
import { getPost } from '../../lib/mdx'

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

const PostPage: NextPage<{ result: any }> = ({ result }) => {
  const Component = useMemo(() => getMDXComponent(result.code), [result.code])

  return (
    <div>
      <Nav />
      <Wrapper>
        <Title>{result.frontmatter.title}</Title>
        <Content>
          <Component components={components} />
        </Content>
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
`
