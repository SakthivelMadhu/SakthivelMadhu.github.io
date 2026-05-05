import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { leadership } from '../data/portfolio'

export default function Leadership() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="leadership" ref={ref} className="py-20 md:py-24 relative overflow-hidden"
      aria-labelledby="leadership-heading">
      <div className="absolute pointer-events-none"
        style={{ top: '8%', right: '-5%', width: 380, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute pointer-events-none"
        style={{ bottom: '10%', left: '-5%', width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)', filter: 'blur(45px)' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-sm mb-3 tracking-widest uppercase" style={{ color: '#10B981' }}>
            {leadership.eyebrow}
          </p>
          <h2 id="leadership-heading" className="section-title text-white">
            Mentorship &amp; <span className="gradient-text-cyan">Hiring</span>
          </h2>
          <p className="mt-4 text-sm md:text-base max-w-2xl mx-auto" style={{ color: 'rgba(148,163,184,0.85)' }}>
            {leadership.summary}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {leadership.items.map((item, i) => (
            <motion.div
              key={item.headline}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-5 md:p-6 border flex gap-4"
              style={{
                background: 'rgba(255,255,255,0.025)',
                borderColor: `${item.color}25`,
                boxShadow: `0 16px 40px rgba(0,0,0,0.3), 0 0 24px ${item.color}08`,
              }}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}35` }}
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-bold text-white text-base md:text-lg leading-tight mb-1.5">
                  {item.headline}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.85)' }}>
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
