"use client"
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '../data/projects'

type Props = { id?: string }

export default function Projects({ id }: Props) {
  return (
    <section id={id} className="py-24 scroll-mt-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {projects.map((p) => (
          <motion.div key={p.title} className="rounded-lg overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-800"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
            <div className="relative w-full h-48">
              <Image src={p.image} alt={p.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{p.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {p.tags.map((t) => (
                  <span key={t} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">{t}</span>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <Link href={p.liveUrl} className="text-primary hover:underline">Live Demo</Link>
                <Link href={p.githubUrl} className="text-primary hover:underline">GitHub</Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
