import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MDXProvider } from '@mdx-js/react'
import { ParsedUrlQuery } from 'querystring'
import { MDXRemote } from 'next-mdx-remote'
import { getAllPosts, getPostBySlug } from '../../api'
import { Callout } from '../../components/Callout'

const components = {
  Callout: Callout,
}

const PostPage: NextPage<{ post: any }> = ({ post }) => {
  return (
    <MDXProvider components={components}>
      <div>
        <h1>{post.title}</h1>
        <MDXRemote {...post.content} />
      </div>
    </MDXProvider>
  )
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps<{}, IParams> = async ({ params }) => {
  if (!params) throw Error('wtf')

  const post = await getPostBySlug(params.slug, [
    'slug',
    'title',
    'date',
    'description',
    'state',
    'unlisted',
    'content',
  ])

  return {
    props: { post },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts(['slug'])

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
