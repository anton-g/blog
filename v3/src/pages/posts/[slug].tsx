import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MDXProvider } from '@mdx-js/react'
import { ParsedUrlQuery } from 'querystring'
import { MDXRemote } from 'next-mdx-remote'
import { getAllPublicPosts, getPostBySlug } from '../../api'
import { Callout } from '../../components/Callout'
import Image from 'next/image'
import RenderPropsCounter from '../../components/RenderPropsCounter'
import { Extracurricular } from '../../components/Extracurricular'
import Confettis from '../../components/Confettis'
import { AccordionExample } from '../../components/compound-demo/AccordionExample'
import { Folders } from '../../components/recursive-demo/Folders'
import styled from 'styled-components'
import { Code } from '../../components/Code'
import { Nav } from '../../components/Nav'

const ResponsiveImage = (props: any) => <Image alt={props.alt} layout="responsive" {...props} />

const components = {
  img: ResponsiveImage,
  pre: Code,
  Callout,
  RenderPropsCounter,
  Folders,
  AccordionExample,
  Confettis,
  Extracurricular,
}

const PostPage: NextPage<{ post: any }> = ({ post }) => {
  return (
    <MDXProvider components={components}>
      <Nav />
      <Wrapper>
        <Title>{post.frontmatter.title}</Title>
        <Content>
          <MDXRemote {...post} />
        </Content>
      </Wrapper>
    </MDXProvider>
  )
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps<{}, IParams> = async ({ params }) => {
  if (!params) throw Error('wtf')

  const post = await getPostBySlug(params.slug, ['slug', 'title', 'content'])

  return {
    props: { post },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPublicPosts(['slug', 'content', 'date', 'title'])

  return {
    paths: posts.map((post) => {
      return {
        params: { ...post },
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
  font-family: 'Yeseva One';
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
    background-color: ${({ theme }) => theme.colors.gray2};
    font-family: 'Share Tech Mono', monospace;
  }

  a {
    color: ${({ theme }) => theme.colors.primary11};

    &:focus,
    &:hover {
      text-decoration: underline ${({ theme }) => theme.colors.primary11} wavy;
      text-decoration-skip-ink: none;
    }
  }
`
