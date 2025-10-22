"use client"
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

type Stat = { label: string; value: number; suffix?: string }
const STATS: Stat[] = [
  { label: 'Years Experience', value: 3, suffix: '+' },
  { label: 'Projects Delivered', value: 25, suffix: '+' },
  { label: 'Satisfied Clients', value: 12, suffix: '+' },
]

function Counter({ to, duration = 1200 }: { to: number; duration?: number }) {
  const [value, setValue] = useState(0)
  const start = useRef<number | null>(null)
  const raf = useRef<number | null>(null)
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const animate = (ts: number) => {
    if (start.current === null) start.current = ts
    const progress = Math.min((ts - start.current) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
    setValue(Math.floor(eased * to))
    if (progress < 1) raf.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (prefersReduced) {
      setValue(to)
      return
    }
    raf.current = requestAnimationFrame(animate)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [prefersReduced, to])

  return <span>{value}</span>
}

export default function Stats({ id }: { id?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px -60% 0px' })
  const base = 900

  return (
    <section id={id} className="py-24 scroll-mt-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center">At a Glance</h2>
      <div ref={ref} className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {STATS.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.05 }} className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="text-4xl font-extrabold">
              {inView ? <Counter to={s.value} duration={Math.min(2000, base + s.value * 40)} /> : 0}
              {s.suffix}
            </div>
            <div className="mt-2 text-gray-600 dark:text-gray-300">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
