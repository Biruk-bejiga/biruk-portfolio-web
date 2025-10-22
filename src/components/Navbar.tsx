"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ModeToggle } from './mode-toggle'
import { site } from '../data/site'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const sectionIds = links.map(l => l.href.replace('#', ''))
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
            const isActive = active === l.href.replace('#', '')
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
        <ModeToggle />
      </div>
    </header>
  )
}
