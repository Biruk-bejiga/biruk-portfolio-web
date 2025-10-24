import { allPosts } from 'contentlayer/generated'
import { NextResponse } from 'next/server'
import { site } from '@/data/site'

export const dynamic = 'force-static'
export const revalidate = 60 * 60 // 1 hour

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const baseUrl = site.url || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const items = [...allPosts]
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => {
      const link = new URL(post.url, baseUrl).toString()
      const categories = (post.tags || [])
        .map((t) => `<category>${escapeXml(t)}</category>`) 
        .join('')

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${link}</link>
          <guid>${link}</guid>
          <description>${escapeXml(post.description)}</description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          ${categories}
        </item>
      `
    })
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>${escapeXml(site.name)} — Blog</title>
      <link>${baseUrl}</link>
      <description>${escapeXml(site.tagline)}</description>
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${items}
    </channel>
  </rss>`

  return new NextResponse(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': `public, s-maxage=${revalidate}, stale-while-revalidate=${revalidate}`,
    },
  })
}
