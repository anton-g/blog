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

export function getPostSlugs(dir: string) {
  return fs.readdirSync(dir)
}

export async function getPostBySlug(slug: string): Promise<Record<string, any>> {
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

  return {
    slug: realSlug,
    ...source,
  }
}

export async function getAllPosts() {
  const slugs = getPostSlugs(postsDirectory)
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)))
  return posts
}
