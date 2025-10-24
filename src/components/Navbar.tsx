"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ModeToggle } from './mode-toggle'
import { site } from '../data/site'

const links = [
  { href: '#stats', label: 'Stats' },
  { href: '#projects', label: 'Projects' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Blog', external: false },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [active, setActive] = useState<string>('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sectionIds = links
      .filter(l => l.href.startsWith('#'))
      .map(l => l.href.replace('#', ''))
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border-b border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg md:text-xl lg:text-2xl font-bold">
          {site.name}
        </Link>
        <nav className="hidden md:flex gap-6">
          {links.map((l) => {
            const isAnchor = l.href.startsWith('#')
            const isActive = isAnchor && active === l.href.replace('#', '')
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive ? 'page' : undefined}
                className={`hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {open ? (
              // Close icon (X)
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden ${open ? 'block' : 'hidden'}`}
      >
        <nav className="px-4 pb-4 pt-2">
          <ul className="flex flex-col gap-2 rounded-lg border border-black/5 dark:border-white/5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm mx-4">
            {links.map((l) => {
              const isAnchor = l.href.startsWith('#')
              const isActive = isAnchor && active === l.href.replace('#', '')
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block w-full px-4 py-3 ${isActive ? 'text-primary' : ''}`}
                  >
                    {l.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
