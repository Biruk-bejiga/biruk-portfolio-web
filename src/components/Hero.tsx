"use client"
import { motion } from 'framer-motion'
import { site } from '../data/site'

export default function Hero() {
  return (
    <section className="h-[80vh] flex items-center justify-center text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{site.name}</h1>
        <p className="text-lg md:text-2xl mt-4">{site.title}</p>
        <p className="mt-6 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">{site.tagline}</p>
      </motion.div>
    </section>
  )
}
