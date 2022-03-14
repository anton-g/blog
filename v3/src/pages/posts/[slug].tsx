import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MDXProvider } from '@mdx-js/react'
import { ParsedUrlQuery } from 'querystring'
import { MDXRemote } from 'next-mdx-remote'
import { getAllPosts, getPostBySlug } from '../../api'
import { Callout } from '../../components/Callout'
import Image, { ImageProps } from 'next/image'
import RenderPropsCounter from '../../components/RenderPropsCounter'
import { Extracurricular } from '../../components/Extracurricular'
import Confettis from '../../components/Confettis'
import { AccordionExample } from '../../components/compound-demo/AccordionExample'
import { Folders } from '../../components/recursive-demo/Folders'

const ResponsiveImage = (props: any) => <Image alt={props.alt} layout="responsive" {...props} />

const components = {
  img: ResponsiveImage,
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
      <div>
        <h1>{post.frontmatter.title}</h1>
        <MDXRemote {...post} />
      </div>
    </MDXProvider>
  )
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps<{}, IParams> = async ({ params }) => {
  if (!params) throw Error('wtf')

  const post = await getPostBySlug(params.slug)

  return {
    props: { post },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()

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
