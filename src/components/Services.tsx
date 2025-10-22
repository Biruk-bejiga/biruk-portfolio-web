"use client"
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const items = [
  'Full-stack web application development',
  'API development and integration',
  'UI/UX design and implementation',
  'Performance optimization',
  'Database design and management',
  'Deployment and hosting',
]

type Props = { id?: string }

export default function Services({ id }: Props) {
  return (
    <section id={id} className="py-24 scroll-mt-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center">Services I Offer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {items.map((s) => (
          <motion.div key={s} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg flex items-start"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
            <CheckCircle className="text-primary mr-4 mt-1 flex-shrink-0" />
            <p>{s}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
