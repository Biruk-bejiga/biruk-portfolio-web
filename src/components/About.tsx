"use client"
import { motion } from 'framer-motion'

type Props = { id?: string }

export default function About({ id }: Props) {
  const skills = ['Next.js 14', 'React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Framer Motion']
  return (
    <section id={id} className="py-24 scroll-mt-24">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <h2 className="text-3xl md:text-4xl font-bold text-center">About Me</h2>
        <p className="mt-6 max-w-3xl mx-auto text-center text-gray-600 dark:text-gray-300">
          I’m a passionate Full-Stack Developer focused on creating modern, scalable, and creative digital experiences.
          I work across the stack with a special love for great UX and performance.
        </p>
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-semibold">My Skills</h3>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {skills.map((s) => (
              <span key={s} className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
