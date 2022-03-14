import fs from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import imageSize from 'rehype-img-size'

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
      /* @ts-ignore */
      rehypePlugins: [[imageSize, { dir: 'public' }]],
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
