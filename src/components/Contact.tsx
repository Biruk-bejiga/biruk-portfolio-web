"use client"
import { motion } from 'framer-motion'
import { site } from '../data/site'

type Props = { id?: string }

export default function Contact({ id }: Props) {
  return (
    <section id={id} className="py-24 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center">Get In Touch</h2>
        <p className="mt-6 max-w-2xl mx-auto text-center text-gray-600 dark:text-gray-300">
          I’m currently open to new opportunities. If you have a project in mind or just want to say hi, feel free to reach out.
        </p>
        <div className="mt-8 text-center">
          <a
            href={`mailto:${site.email}`}
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Say Hello
          </a>
        </div>
      </motion.div>
    </section>
  )
}
