import fs from 'fs'
import { join } from 'path'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkMdxImages from 'remark-mdx-images'
import { bundleMDX } from 'mdx-bundler'

const postsDirectory = join(process.cwd(), 'content')

export type PostFrontmatter = {
  title: string
  date: string
  updated?: string
  description: string
  state: 'budding' | 'growing' | 'bloomed'
  unlisted: boolean
}

export type Post = {
  code: string
  frontmatter: PostFrontmatter
  slug?: string
}

export const getPost = async (slug: string) => {
  return await bundleMDX<PostFrontmatter>({
    file: join(postsDirectory, `${slug}.mdx`),
    cwd: postsDirectory,
    esbuildOptions: (options) => {
      options.platform = 'node'
      options.target = ['es6']
      options.loader = {
        ...options.loader,
        '.png': 'dataurl',
      }

      return options
    },
    mdxOptions: (options) => {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypePrettyCode, codeOptions],
      ]
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkMdxImages,
      ]

      return options
    },
  })
}

export const getAllPublicPosts = async (): Promise<Post[]> => {
  const slugs = fs.readdirSync(postsDirectory)
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const mdx = await getPost(slug.replace('.mdx', ''))

      return {
        frontmatter: mdx.frontmatter,
        code: mdx.code,
        slug: slug.replace('.mdx', ''),
      }
    })
  )
  return posts.filter((x) => !x.frontmatter.unlisted)
}

const codeOptions = {
  // Use one of Shiki's packaged themes
  theme: 'light-plus',
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  // Feel free to add classNames that suit your docs
  onVisitHighlightedLine(node: any) {
    node.properties.className.push('highlighted')
  },
  onVisitHighlightedWord(node: any) {
    node.properties.className = ['word']
  },
}
