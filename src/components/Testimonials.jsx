import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { testimonials } from '../data/portfolio'

function StarRating({ count = 5, color }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, type: 'spring', stiffness: 250 }}
          style={{ color: '#F59E0B', fontSize: 14 }}
        >★</motion.span>
      ))}
    </div>
  )
}

function TestimonialCard({ t, i, inView }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative rounded-3xl p-8 border flex flex-col gap-6 overflow-hidden"
      style={{
        background: hov ? `${t.color}06` : 'rgba(255,255,255,0.02)',
        borderColor: hov ? `${t.color}35` : 'rgba(255,255,255,0.06)',
        boxShadow: hov ? `0 30px 80px rgba(0,0,0,0.4), 0 0 40px ${t.color}0a` : '0 4px 30px rgba(0,0,0,0.3)',
        transition: 'all 0.35s ease',
      }}
    >
      {/* Top accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }}
        animate={{ opacity: hov ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -60, right: -60, width: 200, height: 200, borderRadius: '50%',
          background: `radial-gradient(circle, ${t.color}10 0%, transparent 70%)`,
          filter: 'blur(30px)',
          opacity: hov ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Quote mark */}
      <div className="absolute top-6 right-8 font-display font-black text-7xl leading-none select-none pointer-events-none"
        style={{ color: `${t.color}10` }}>
        "
      </div>

      {/* Stars */}
      <StarRating count={t.rating} color={t.color} />

      {/* Quote */}
      <blockquote className="text-base leading-relaxed relative z-10" style={{ color: 'rgba(226,232,240,0.85)' }}>
        "{t.quote}"
      </blockquote>

      {/* Person */}
      <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        {/* Avatar */}
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center font-display font-black text-lg flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${t.color}30, ${t.color}15)`,
            border: `2px solid ${t.color}40`,
            color: t.color,
          }}
          animate={hov ? { boxShadow: `0 0 20px ${t.color}30` } : { boxShadow: 'none' }}
          transition={{ duration: 0.3 }}
        >
          {t.avatar}
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="font-display font-bold text-white">{t.name}</div>
          <div className="text-xs mt-0.5" style={{ color: t.color }}>{t.role}</div>
          <div className="text-xs mt-0.5 truncate" style={{ color: 'rgba(100,116,139,0.6)' }}>@ {t.company}</div>
        </div>

        {/* LinkedIn badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono flex-shrink-0"
          style={{ background: 'rgba(10,102,194,0.1)', border: '1px solid rgba(10,102,194,0.25)', color: '#0A66C2' }}>
          <i className="fab fa-linkedin text-xs" />
          LinkedIn
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="testimonials" ref={ref} className="py-24 md:py-28 relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute pointer-events-none"
        style={{ top: '20%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,212,255,0.05) 0%,transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute pointer-events-none"
        style={{ bottom: '10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.05) 0%,transparent 70%)', filter: 'blur(50px)' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-sm mb-3 tracking-widest uppercase" style={{ color: '#8B5CF6' }}>
            What Colleagues Say
          </p>
          <h2 className="section-title text-white">
            LinkedIn <span className="gradient-text-cyan">Recommendations</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-sm" style={{ color: 'rgba(100,116,139,0.7)' }}>
            Kind words from people I've had the pleasure of building with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} i={i} inView={inView} />
          ))}
        </div>

        {/* Disclaimer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 text-xs font-mono"
          style={{ color: 'rgba(100,116,139,0.4)' }}
        >
          * Recommendations pending LinkedIn publish — content is accurate & will be updated
        </motion.p>
      </div>
    </section>
  )
}
