import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { achievements } from '../data/portfolio'

// Pre-computed star positions (deterministic — no random per render)
const STARS = [
  {x:8,y:12,s:1.2,o:0.6,d:0},{x:15,y:45,s:0.8,o:0.4,d:1.2},{x:23,y:7,s:1.5,o:0.7,d:0.5},
  {x:31,y:58,s:0.6,o:0.3,d:2},{x:42,y:22,s:1.0,o:0.5,d:0.8},{x:50,y:75,s:1.3,o:0.6,d:1.5},
  {x:58,y:35,s:0.7,o:0.4,d:0.3},{x:67,y:90,s:1.1,o:0.5,d:1.8},{x:74,y:18,s:0.9,o:0.6,d:0.9},
  {x:82,y:52,s:1.4,o:0.7,d:2.2},{x:90,y:68,s:0.6,o:0.3,d:0.6},{x:12,y:80,s:1.0,o:0.5,d:1.1},
  {x:37,y:93,s:0.8,o:0.4,d:0.4},{x:55,y:5,s:1.6,o:0.7,d:1.7},{x:78,y:40,s:0.7,o:0.3,d:2.3},
  {x:6,y:60,s:1.2,o:0.6,d:0.7},{x:19,y:30,s:0.9,o:0.5,d:1.4},{x:45,y:85,s:1.1,o:0.6,d:0.2},
  {x:62,y:55,s:0.8,o:0.4,d:1.9},{x:85,y:10,s:1.3,o:0.7,d:0.8},{x:95,y:82,s:0.6,o:0.3,d:2.5},
  {x:28,y:70,s:1.0,o:0.5,d:1.0},{x:70,y:25,s:1.4,o:0.6,d:0.3},{x:3,y:38,s:0.7,o:0.4,d:1.6},
  {x:48,y:48,s:1.2,o:0.7,d:2.1},{x:88,y:62,s:0.8,o:0.3,d:0.5},{x:35,y:15,s:1.1,o:0.6,d:1.3},
  {x:60,y:78,s:0.9,o:0.5,d:0.9},{x:17,y:95,s:1.5,o:0.7,d:2.4},{x:73,y:3,s:0.6,o:0.3,d:0.1},
]

function StarField({ accentColor = '#F59E0B' }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
      {/* Deep space base */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 40% 40%, rgba(20,12,40,0.98), rgba(4,4,12,0.99))' }} />
      {/* Nebula glow */}
      <div className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 60% 55%, ${accentColor}12 0%, transparent 65%)` }} />
      {/* Stars */}
      {STARS.map((s, i) => (
        <motion.div key={i}
          animate={{ opacity: [s.o, s.o * 0.25, s.o] }}
          transition={{ duration: s.d + 2, repeat: Infinity, ease: 'easeInOut', delay: s.d }}
          className="absolute rounded-full"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, background: 'white' }}
        />
      ))}
    </div>
  )
}

function SpinningRings({ color, size = 80 }) {
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      {/* Ring 1 */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full"
        style={{ border: `2px solid transparent`, borderTopColor: color, borderRightColor: `${color}50` }} />
      {/* Ring 2 reverse */}
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full"
        style={{ inset: 8, border: `1.5px dashed ${color}40`, borderBottomColor: `${color}80` }} />
      {/* Ring 3 slow */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full"
        style={{ inset: 16, border: `1px solid ${color}20`, borderLeftColor: `${color}60` }} />
      {/* Icon center */}
      <div className="relative z-10 flex items-center justify-center rounded-full"
        style={{ width: size * 0.45, height: size * 0.45, background: `${color}18`, border: `1px solid ${color}40` }}
      >
        <slot />
      </div>
    </div>
  )
}

// ── Employee of the Quarter — hero card ───────────────────────────────────────
function TrophyHeroCard({ inView }) {
  const ach = achievements.find(a => a.title === 'Employee of the Quarter')

  return (
    <motion.a
      href={ach.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="block relative rounded-2xl overflow-hidden group"
      style={{ border: '1px solid rgba(245,158,11,0.35)', boxShadow: '0 0 40px rgba(245,158,11,0.12), 0 20px 60px rgba(0,0,0,0.5)' }}
    >
      <StarField accentColor="#F59E0B" />

      {/* Shimmer on hover */}
      <motion.div
        initial={{ x: '-120%' }} whileHover={{ x: '220%' }}
        transition={{ duration: 0.9 }}
        className="absolute inset-0 pointer-events-none z-20"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(245,158,11,0.07),transparent)', width: '40%' }}
      />

      <div className="relative z-10 p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Trophy with spinning rings */}
          <div className="relative flex-shrink-0" style={{ width: 110, height: 110 }}>
            {/* Ring 1 */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full"
              style={{ border: '2px solid transparent', borderTopColor: '#F59E0B', borderRightColor: 'rgba(245,158,11,0.4)' }} />
            {/* Ring 2 */}
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
              className="absolute rounded-full"
              style={{ inset: 10, border: '1.5px dashed rgba(245,158,11,0.3)', borderBottomColor: 'rgba(245,158,11,0.7)' }} />
            {/* Ring 3 */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute rounded-full"
              style={{ inset: 20, border: '1px solid rgba(245,158,11,0.15)', borderLeftColor: 'rgba(245,158,11,0.5)' }} />
            {/* Orbiting dot */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                style={{ background: '#F59E0B', boxShadow: '0 0 10px #F59E0B, 0 0 20px #F59E0B' }} />
            </motion.div>
            {/* Icon */}
            <div className="absolute inset-6 rounded-full flex items-center justify-center text-3xl"
              style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', boxShadow: '0 0 20px rgba(245,158,11,0.2)' }}>
              🏆
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-2xl font-display font-black" style={{ color: '#F59E0B' }}>
                Employee of the Quarter
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold rounded-full font-mono"
                style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)' }}>
                🎖 Award
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: 'rgba(148,163,184,0.8)' }}>
              Twinleaves Retail Ecommerce India Pvt. Ltd.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(148,163,184,0.7)' }}>
              Recognized for full technical ownership of ERP, HRMS &amp; Finance platforms —
              driving <span style={{ color: '#F59E0B' }}>92% manual effort reduction</span> and{' '}
              <span style={{ color: '#10B981' }}>80% faster inventory onboarding</span> through
              AI/Doc-AI integration and automation-first engineering.
            </p>

            {/* Impact metrics */}
            <div className="flex flex-wrap gap-4 mb-6">
              {[
                { v: '92%', l: 'Effort Reduced', c: '#00D4FF' },
                { v: '80%', l: 'Faster Onboarding', c: '#10B981' },
                { v: '95%', l: 'Doc-AI Accuracy', c: '#8B5CF6' },
                { v: '4', l: 'Platforms Owned', c: '#F59E0B' },
              ].map((m, i) => (
                <motion.div key={m.l}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center px-4 py-2 rounded-xl"
                  style={{ background: `${m.c}10`, border: `1px solid ${m.c}25` }}>
                  <div className="text-lg font-black font-display" style={{ color: m.c }}>{m.v}</div>
                  <div className="text-xs" style={{ color: 'rgba(100,116,139,0.8)' }}>{m.l}</div>
                </motion.div>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
              style={{ color: '#F59E0B' }}>
              <i className="fas fa-certificate" />
              View Certificate
              <i className="fas fa-external-link text-xs opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  )
}

// ── Certification card ────────────────────────────────────────────────────────
function CertCard({ ach, index, inView }) {
  return (
    <motion.a
      href={ach.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="block relative rounded-2xl overflow-hidden group"
      style={{ border: `1px solid ${ach.color}30`, boxShadow: `0 0 30px ${ach.color}0a, 0 15px 40px rgba(0,0,0,0.4)` }}
    >
      <StarField accentColor={ach.color} />

      <motion.div
        initial={{ x: '-120%' }} whileHover={{ x: '220%' }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none z-20"
        style={{ background: `linear-gradient(90deg,transparent,${ach.color}08,transparent)`, width: '40%' }}
      />

      <div className="relative z-10 p-6">
        {/* Icon with rings */}
        <div className="relative flex-shrink-0 mb-5" style={{ width: 80, height: 80 }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid transparent', borderTopColor: ach.color, borderRightColor: `${ach.color}40` }} />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute rounded-full"
            style={{ inset: 8, border: `1px dashed ${ach.color}30`, borderBottomColor: `${ach.color}70` }} />
          {/* Orbiting dot */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{ background: ach.color, boxShadow: `0 0 8px ${ach.color}` }} />
          </motion.div>
          <div className="absolute inset-5 rounded-full flex items-center justify-center text-xl"
            style={{ background: `${ach.color}15`, border: `1px solid ${ach.color}30` }}>
            {ach.icon}
          </div>
        </div>

        <h3 className="text-base font-display font-bold mb-1 group-hover:opacity-80 transition-opacity" style={{ color: ach.color }}>
          {ach.title}
        </h3>
        <p className="text-xs mb-3 font-mono" style={{ color: 'rgba(100,116,139,0.7)' }}>{ach.org}</p>
        <p className="text-xs leading-relaxed mb-5" style={{ color: 'rgba(148,163,184,0.6)' }}>{ach.description}</p>

        <div className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all"
          style={{ color: ach.color }}>
          <i className="fas fa-certificate text-xs" />
          View Certificate
          <i className="fas fa-arrow-right text-xs opacity-60" />
        </div>
      </div>
    </motion.a>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Achievements() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const certifications = achievements.filter(a => a.title !== 'Employee of the Quarter')

  return (
    <section id="achievements" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(245,158,11,0.05) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-sm mb-3 tracking-widest uppercase" style={{ color: '#F59E0B' }}>
            Recognition
          </p>
          <h2 className="section-title text-white">
            Achievements &amp; <span className="gradient-text-gold">Awards</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm" style={{ color: 'rgba(100,116,139,0.7)' }}>
            Recognition earned through measurable impact and technical excellence.
          </p>
        </motion.div>

        {/* Employee of Quarter — hero */}
        <div className="mb-8">
          <TrophyHeroCard inView={inView} />
        </div>

        {/* Certifications row */}
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} ach={cert} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
