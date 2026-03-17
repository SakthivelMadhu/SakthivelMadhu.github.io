import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 3, suffix: '+', label: 'Years Experience', sub: 'Enterprise backend engineering', color: '#00D4FF', icon: '⚡' },
  { value: 12, suffix: '+', label: 'Projects Built', sub: 'Enterprise to open source', color: '#8B5CF6', icon: '🏗️' },
  { value: 92, suffix: '%', label: 'Manual Work Reduced', sub: 'via Doc-AI & automation', color: '#EC4899', icon: '🤖' },
  { value: 80, suffix: '%', label: 'Faster Onboarding', sub: 'ERP inventory pipeline', color: '#F59E0B', icon: '🚀' },
]

function CountUp({ target, suffix, color, inView }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span className="font-display font-black tabular-nums" style={{ color }}>
      {count}{suffix}
    </span>
  )
}

export default function ImpactNumbers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative overflow-hidden py-0">
      {/* Separator top */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.15), rgba(139,92,246,0.2), rgba(236,72,153,0.15), transparent)' }} />

      <div className="relative" style={{ background: 'linear-gradient(180deg, rgba(0,212,255,0.03) 0%, rgba(139,92,246,0.03) 50%, rgba(236,72,153,0.02) 100%)' }}>
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border"
            style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.04)' }}>
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center text-center px-6 py-8 group cursor-default"
                style={{ background: 'rgba(10,10,15,0.85)' }}
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% 100%, ${stat.color}0c 0%, transparent 70%)` }}
                />

                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                />

                <motion.div
                  className="text-2xl mb-2"
                  animate={inView ? { scale: [0.5, 1.2, 1] } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5, type: 'spring' }}
                >
                  {stat.icon}
                </motion.div>

                <div className="text-4xl md:text-5xl leading-none mb-2">
                  <CountUp target={stat.value} suffix={stat.suffix} color={stat.color} inView={inView} />
                </div>

                <div className="font-display font-bold text-white text-sm mb-1">{stat.label}</div>
                <div className="text-xs font-mono" style={{ color: 'rgba(100,116,139,0.55)' }}>{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Separator bottom */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.15), rgba(0,212,255,0.2), rgba(139,92,246,0.15), transparent)' }} />
    </section>
  )
}
