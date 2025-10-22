import Link from 'next/link'

export const metadata = {
  title: 'Blog',
  description: 'Writing about full-stack development, Next.js, and performance.'
}

const posts = [
  { slug: 'hello-world', title: 'Hello World — MDX', excerpt: 'An example MDX post rendered by Next.js App Router.' },
]

export default function BlogIndex() {
  return (
    <section className="py-24">
      <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
      <ul className="mt-8 space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="border-b border-black/5 dark:border-white/10 pb-6">
            <Link href={`/blog/${p.slug}`} className="text-xl font-semibold hover:text-primary">
              {p.title}
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{p.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
