import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'

export const metadata = {
  title: 'Blog',
  description: 'Writing about full-stack development, Next.js, and performance.'
}

type SearchParams = { tag?: string }

export default function BlogIndex({ searchParams }: { searchParams?: SearchParams }) {
  const selectedTag = searchParams?.tag
  const posts = [...allPosts]
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .filter((p) => (selectedTag ? (p.tags || []).includes(selectedTag) : true))

  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags || []))).sort()

  return (
    <section className="py-24">
      <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href={{ pathname: '/blog' }} className={`px-3 py-1 rounded-full text-sm border ${!selectedTag ? 'bg-primary text-white border-primary' : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            All
          </Link>
          {allTags.map((t) => (
            <Link
              key={t}
              href={{ pathname: '/blog', query: { tag: t } }}
              className={`px-3 py-1 rounded-full text-sm border ${selectedTag === t ? 'bg-primary text-white border-primary' : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              #{t}
            </Link>
          ))}
        </div>
      )}

      <ul className="mt-8 divide-y divide-black/5 dark:divide-white/10 rounded-lg overflow-hidden border border-black/5 dark:border-white/10">
        {posts.map((p) => (
          <li key={p.slug} className="p-6 bg-white/60 dark:bg-gray-900/40 backdrop-blur">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <Link href={p.url} className="text-xl font-semibold hover:text-primary">
                  {p.title}
                </Link>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{p.description}</p>
              </div>
              <div className="text-right min-w-[160px]">
                <time className="block text-xs text-gray-500" dateTime={p.date}>
                  {new Date(p.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </time>
                <div className="mt-2 flex flex-wrap justify-end gap-1">
                  {(p.tags || []).map((t) => (
                    <Link key={t} href={{ pathname: '/blog', query: { tag: t } }} className="px-2 py-0.5 rounded-md text-xs border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                      #{t}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
