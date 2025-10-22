import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'

export const metadata = {
  title: 'Blog',
  description: 'Writing about full-stack development, Next.js, and performance.'
}

export default function BlogIndex() {
  const posts = [...allPosts]
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <section className="py-24">
      <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
      <ul className="mt-8 space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="border-b border-black/5 dark:border-white/10 pb-6">
            <Link href={p.url} className="text-xl font-semibold hover:text-primary">
              {p.title}
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{p.description}</p>
            <time className="block mt-1 text-xs text-gray-500" dateTime={p.date}>
              {new Date(p.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
            </time>
          </li>
        ))}
      </ul>
    </section>
  )
}
