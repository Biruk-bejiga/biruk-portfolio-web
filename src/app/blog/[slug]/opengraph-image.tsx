/* eslint-disable */
import { ImageResponse } from 'next/og'
import { allPosts } from 'contentlayer/generated'
import { site } from '@/data/site'

export const runtime = 'edge'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

function getPost(slug: string) {
  return allPosts.find((p) => p.slug === slug)
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  const title = post?.title ?? site.name
  const description = post?.description ?? site.tagline
  const date = post?.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : undefined
  const tags = (post?.tags ?? []).slice(0, 3)
  const initials = site.name
    .split(' ')
    .map((s) => s.charAt(0))
    .slice(0, 2)
    .join('')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0ea5e9 100%)',
          color: '#fff',
          padding: '64px',
        }}
      >
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 9999,
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 56,
              fontWeight: 800,
              color: '#ffffff',
            }}
          >
            {initials}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 28, opacity: 0.9 }}>{site.name}</div>
            <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 960 }}>{title}</div>
          </div>
        </div>

        {description ? (
          <div style={{ display: 'flex' }}>
            <div style={{ fontSize: 28, opacity: 0.92, maxWidth: 1060, marginTop: 12 }}>{description}</div>
          </div>
        ) : null}

        {tags.length > 0 ? (
          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            {tags.map((t) => (
              <div
                key={t}
                style={{
                  fontSize: 22,
                  padding: '6px 14px',
                  borderRadius: 9999,
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}
              >
                #{t}
              </div>
            ))}
          </div>
        ) : null}
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', opacity: 0.9 }}>
          <div style={{ fontSize: 24 }}>{site.url?.replace(/^https?:\/\//, '') || 'your-domain.com'}</div>
          {date ? <div style={{ fontSize: 24 }}>{date}</div> : null}
        </div>
      </div>
    ),
    { ...size }
  )
}
