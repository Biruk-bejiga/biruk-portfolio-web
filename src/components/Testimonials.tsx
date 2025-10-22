"use client"
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: 'Working with Biruk was effortless. He delivered on time with an eye for detail.',
    author: 'Sarah M.',
    role: 'Product Manager',
  },
  {
    quote: 'Clean code, great communication, and impressive performance improvements.',
    author: 'David L.',
    role: 'CTO',
  },
  {
    quote: 'Our conversion rate went up after his UI/UX revamp. Highly recommended.',
    author: 'Priya S.',
    role: 'Founder',
  },
]

export default function Testimonials({ id }: { id?: string }) {
  const [index, setIndex] = useState(0)
  const startX = useRef<number | null>(null)
  const isDragging = useRef(false)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 4000)
    return () => clearInterval(t)
  }, [])

  const item = TESTIMONIALS[index]

  const goPrev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const goNext = () => setIndex((i) => (i + 1) % TESTIMONIALS.length)

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev() }
    if (e.key === 'ArrowRight') { e.preventDefault(); goNext() }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX
    isDragging.current = true
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current || startX.current === null) return
    const delta = e.clientX - startX.current
    const threshold = 40
    if (delta > threshold) goPrev()
    if (delta < -threshold) goNext()
    startX.current = null
    isDragging.current = false
  }

  return (
    <section id={id} className="py-24 scroll-mt-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center">Testimonials</h2>
      <div className="mt-10 flex justify-center">
        <div
          className="relative w-full max-w-3xl"
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-center px-6 py-10 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm"
            >
              <p className="text-xl md:text-2xl leading-relaxed">“{item.quote}”</p>
              <footer className="mt-4 text-sm text-gray-600 dark:text-gray-300">— {item.author}, {item.role}</footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="mt-6 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} aria-label={`Go to testimonial ${i + 1}`} onClick={() => setIndex(i)} className={`size-2 rounded-full ${i === index ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`} />
            ))}
          </div>
          <div className="sr-only" aria-live="polite">Slide {index + 1} of {TESTIMONIALS.length}</div>
        </div>
      </div>
    </section>
  )
}
