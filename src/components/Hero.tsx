"use client"
import { motion } from 'framer-motion'
import Image from 'next/image'
import { site } from '../data/site'

export default function Hero() {
  return (
    <section className="h-[80vh] flex items-center justify-center text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="mb-6 flex justify-center">
          <Image
            src="/image/profile-picture.png"
            alt="Profile picture"
            width={128}
            height={128}
            unoptimized
            priority
            className="rounded-full object-cover ring-2 ring-indigo-500/20 shadow-md"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{site.name}</h1>
        <p className="text-lg md:text-2xl mt-4">{site.title}</p>
        <p className="mt-6 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">{site.tagline}</p>
      </motion.div>
    </section>
  )
}
