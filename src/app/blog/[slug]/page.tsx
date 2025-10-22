import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import MDXComponents from '@/components/mdx-components'

export const dynamicParams = false

export function generateStaticParams() {
  return allPosts.filter((p) => !p.draft).map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, url: post.url },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => p.slug === params.slug)
  if (!post) return notFound()
  const MDX = useMDXComponent(post.body.code)

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto py-24">
      <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{post.description}</p>
      <time className="block mt-1 text-xs text-gray-500" dateTime={post.date}>
        {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
      </time>
      <div className="mt-8">
        <MDX components={MDXComponents} />
      </div>
    </article>
  )
}
