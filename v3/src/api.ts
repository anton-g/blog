import fs from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import imageSize from 'rehype-img-size'
import rehypePrettyCode from 'rehype-pretty-code'

const options = {
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
const postsDirectory = join(process.cwd(), 'src/content')

export type Post = {
  slug?: string
  compiledSource: string
  frontmatter: {
    title?: string
    date?: string
    description?: string
    dev?: string
    state?: string
    unlisted?: string
    tags?: string
  }
}

type PostField = Exclude<Exclude<keyof Post, 'frontmatter'>, 'compiledSource'> | keyof Post['frontmatter'] | 'content'

export function getPostSlugs(dir: string) {
  return fs.readdirSync(dir)
}

export async function getPostBySlug(slug: string, fields: PostField[]): Promise<Post> {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const source = await serialize(fileContents, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [
        /* @ts-ignore */
        [imageSize, { dir: 'public' }],
        [rehypePrettyCode, options],
      ],
      options: {
        providerImportSource: '@mdx-js/react',
      },
    },
  })

  const result: Post = {
    compiledSource: '',
    frontmatter: {},
  }
  fields.forEach((field) => {
    if (field === 'slug') {
      result[field] = realSlug
      return
    }
    if (field === 'content') {
      result.compiledSource = source.compiledSource
      return
    }

    if (source.frontmatter?.[field]) {
      result.frontmatter[field] = source.frontmatter[field]
    }
  })

  return result
}

export async function getAllPublicPosts(fields: PostField[]) {
  const slugs = getPostSlugs(postsDirectory)
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug, fields)))
  const publicPosts = posts.filter((x) => !x.frontmatter.unlisted)
  return publicPosts
}
