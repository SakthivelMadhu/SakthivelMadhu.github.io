import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { personalInfo, achievements, education } from '../data/portfolio'

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED COUNT-UP
// ─────────────────────────────────────────────────────────────────────────────
function CountUp({ target, suffix = '', duration = 1800 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const numeric = parseInt(target, 10)
    if (isNaN(numeric)) { setVal(target); return }
    let start = 0
    const step = numeric / (duration / 16)
    const t = setInterval(() => {
      start = Math.min(start + step, numeric)
      setVal(Math.floor(start))
      if (start >= numeric) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [inView, target, duration])
  return <span ref={ref}>{val}{suffix}</span>
}

// ─────────────────────────────────────────────────────────────────────────────
// HOLOGRAPHIC ID CARD PROFILE
// ─────────────────────────────────────────────────────────────────────────────
function HoloIDCard({ inView }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const onMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect()
    if (!r) return
    setTilt({
      x: ((e.clientY - r.top - r.height / 2) / r.height) * 14,
      y: ((e.clientX - r.left - r.width / 2) / r.width) * -14,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotateY: -20 }}
      animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{ perspective: 1000 }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <motion.div
        ref={cardRef}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        style={{
          transformStyle: 'preserve-3d',
          width: 320,
          borderRadius: 24,
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #0d0d18, #111120)',
          border: '1px solid rgba(0,212,255,0.2)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(0,212,255,0.08)',
          position: 'relative',
        }}
      >
        {/* Holographic sweep */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
            background: 'linear-gradient(105deg, transparent 30%, rgba(0,212,255,0.07) 48%, rgba(139,92,246,0.06) 52%, transparent 70%)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
        />
        {/* Corner circuit lines */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.12 }} viewBox="0 0 320 420">
          <path d="M0,40 L30,40 L30,10 L60,10" fill="none" stroke="#00D4FF" strokeWidth="1" />
          <path d="M320,40 L290,40 L290,10 L260,10" fill="none" stroke="#8B5CF6" strokeWidth="1" />
          <path d="M0,380 L30,380 L30,410 L60,410" fill="none" stroke="#EC4899" strokeWidth="1" />
          <path d="M320,380 L290,380 L290,410 L260,410" fill="none" stroke="#F59E0B" strokeWidth="1" />
        </svg>

        {/* Header band */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(139,92,246,0.1))',
          borderBottom: '1px solid rgba(0,212,255,0.12)',
          padding: '14px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 9, fontFamily: 'monospace', color: 'rgba(0,212,255,0.6)', letterSpacing: 3, marginBottom: 2 }}>DEVELOPER ID</div>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#fff', letterSpacing: 1 }}>BACKEND ENGINEER</div>
          </div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #00D4FF, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 900, color: '#0a0a0f',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >SM</motion.div>
        </div>

        {/* Photo + info */}
        <div style={{ display: 'flex', gap: 14, padding: '18px 18px 14px' }}>
          {/* Photo in hex clip */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: 90, height: 104,
              clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(139,92,246,0.3))',
            }}>
              <img src={personalInfo.photo} alt="Sakthivel Madhu"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
            {/* Hex border glow */}
            <motion.div style={{
              position: 'absolute', inset: -3,
              clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
              background: 'linear-gradient(135deg, #00D4FF, #8B5CF6, #EC4899)',
              zIndex: -1,
            }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>

          {/* Text info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1.2, marginBottom: 4 }}>
              Sakthivel<br />Madhu
            </div>
            <div style={{ fontSize: 10, color: '#00D4FF', fontFamily: 'monospace', letterSpacing: 1, marginBottom: 8 }}>
              @sakthivel_madhu
            </div>
            {[
              { icon: '📍', text: 'Bangalore, India' },
              { icon: '💼', text: '3+ Years Exp' },
              { icon: '☁️', text: 'GCP · Java · Spring' },
            ].map(row => (
              <div key={row.text} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                <span style={{ fontSize: 10 }}>{row.icon}</span>
                <span style={{ fontSize: 10, color: 'rgba(148,163,184,0.75)', fontFamily: 'monospace' }}>{row.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill chips */}
        <div style={{ padding: '0 18px 14px', display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {['Java 17', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker', 'GCP Pub/Sub'].map((s, i) => (
            <motion.span key={s}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.07, type: 'spring', stiffness: 250 }}
              style={{
                fontSize: 9, fontFamily: 'monospace', padding: '3px 7px',
                borderRadius: 4, background: 'rgba(0,212,255,0.08)',
                border: '1px solid rgba(0,212,255,0.2)', color: '#00D4FF',
              }}
            >{s}</motion.span>
          ))}
        </div>

        {/* Status bar */}
        <div style={{
          background: 'rgba(16,185,129,0.06)', borderTop: '1px solid rgba(16,185,129,0.15)',
          padding: '8px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <motion.div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981' }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span style={{ fontSize: 10, color: '#10B981', fontFamily: 'monospace', letterSpacing: 1 }}>OPEN TO WORK</span>
          </div>
          <span style={{ fontSize: 9, color: 'rgba(100,116,139,0.5)', fontFamily: 'monospace' }}>ID-SM-2026</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────────────────────────────────────
const STAT_COLORS = ['#00D4FF', '#8B5CF6', '#EC4899', '#10B981']
function StatCard({ stat, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5, type: 'spring', stiffness: 200 }}
      className="rounded-2xl p-4 text-center relative overflow-hidden cursor-default"
      style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${STAT_COLORS[index]}18` }}
      onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${STAT_COLORS[index]}40`; e.currentTarget.style.background = `${STAT_COLORS[index]}08` }}
      onMouseLeave={e => { e.currentTarget.style.border = `1px solid ${STAT_COLORS[index]}18`; e.currentTarget.style.background = 'rgba(255,255,255,0.025)' }}
    >
      <motion.div style={{ position: 'absolute', top: -20, right: -20, width: 60, height: 60, borderRadius: '50%', background: `radial-gradient(circle, ${STAT_COLORS[index]}20, transparent)`, pointerEvents: 'none' }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3 + index, repeat: Infinity }}
      />
      <div className="text-2xl font-display font-black relative z-10" style={{ color: STAT_COLORS[index] }}>
        {inView ? <CountUp target={stat.value} suffix={stat.suffix} /> : '0'}
      </div>
      <div className="text-xs font-medium mt-0.5 relative z-10" style={{ color: 'rgba(100,116,139,0.85)' }}>{stat.label}</div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// EDUCATION TIMELINE
// ─────────────────────────────────────────────────────────────────────────────
function EducationTimeline({ inView }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-3 bottom-3 w-px" style={{ background: 'linear-gradient(to bottom, #8B5CF6, #00D4FF)' }} />
      <div className="space-y-4 pl-10">
        {education.map((edu, i) => (
          <motion.div key={edu.institution}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl p-4 border"
            style={{ background: `${edu.color}07`, borderColor: `${edu.color}25` }}
          >
            {/* Timeline dot */}
            <motion.div style={{
              position: 'absolute', left: -28, top: '50%', transform: 'translateY(-50%)',
              width: 14, height: 14, borderRadius: '50%', background: edu.color,
              border: '3px solid #0a0a0f', boxShadow: `0 0 12px ${edu.color}80`,
            }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2 + i, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white leading-tight mb-1">{edu.degree}</div>
                <div className="text-xs font-medium mb-0.5" style={{ color: edu.color }}>{edu.institution}</div>
                <div className="text-xs" style={{ color: 'rgba(100,116,139,0.7)' }}>{edu.location} · {edu.board}</div>
              </div>
              <div className="text-right flex-shrink-0">
                {edu.grade && (
                  <div className="text-sm font-black mb-1" style={{ color: '#F59E0B' }}>{edu.grade}</div>
                )}
                <div className="text-xs font-mono" style={{ color: 'rgba(100,116,139,0.6)' }}>{edu.duration}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT SECTION
// ─────────────────────────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.05) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(0,212,255,0.04) 0%, transparent 50%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm mb-3 tracking-widest uppercase" style={{ color: '#00D4FF' }}>About Me</p>
          <h2 className="section-title text-white">
            The Engineer Behind the <span className="gradient-text-cyan">Systems</span>
          </h2>
        </motion.div>

        {/* Three-column layout: Profile | Bio+Strengths | Education+Certs */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr] gap-12 items-start">

          {/* ── COL 1: Holo ID Card + Stats ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-center lg:items-start gap-6"
          >
            <HoloIDCard inView={inView} />

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 w-full" style={{ maxWidth: 320 }}>
              {personalInfo.stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
              ))}
            </div>

            {/* Hire me */}
            <motion.a
              href="#contact"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm overflow-hidden relative"
              style={{ background: 'linear-gradient(135deg,#F59E0B,#EC4899)', color: '#0a0a0f', maxWidth: 320 }}
            >
              <motion.div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.25) 50%,transparent 65%)' }}
                animate={{ x: ['-120%', '220%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              />
              <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-white relative z-10" />
              <span className="relative z-10">Hire Me · Let's Build Together</span>
              <i className="fas fa-arrow-right text-xs relative z-10" />
            </motion.a>
          </motion.div>

          {/* ── COL 2: Bio + Core Strengths + Trophy ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-6"
          >
            {/* Bio */}
            <div className="space-y-3">
              {personalInfo.bio.map((para, i) => (
                <motion.p key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(148,163,184,0.85)' }}
                >{para}</motion.p>
              ))}
            </div>

            {/* Employee of the Quarter */}
            <motion.a
              href="https://drive.google.com/file/d/1uu_cF3-hacTCve8xITkrSTivhXP8U5jS/view?usp=drive_link"
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.01, y: -3 }}
              className="block rounded-2xl p-5 border relative overflow-hidden group"
              style={{ background: 'linear-gradient(135deg,rgba(245,158,11,0.08),rgba(236,72,153,0.05))', borderColor: 'rgba(245,158,11,0.3)' }}
            >
              <motion.div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(245,158,11,0.06),transparent)', pointerEvents: 'none' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <div className="flex items-start gap-4 relative z-10">
                <div className="relative flex-shrink-0">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full" style={{ border: '1.5px dashed rgba(245,158,11,0.45)' }} />
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' }}>🏆</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold" style={{ color: '#F59E0B' }}>Employee of the Quarter</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)' }}>🎖 Award</span>
                  </div>
                  <p className="text-xs mb-1" style={{ color: 'rgba(148,163,184,0.65)' }}>Twinleaves Retail Ecommerce India Pvt. Ltd.</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(148,163,184,0.6)' }}>92% manual effort reduction · 80% faster inventory onboarding</p>
                  <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: '#F59E0B' }}>
                    <i className="fas fa-certificate text-xs" /> View Certificate <i className="fas fa-arrow-right text-xs" />
                  </div>
                </div>
              </div>
            </motion.a>

            {/* Core Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(100,116,139,0.7)' }}>Core Strengths</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: '⚙️', label: 'Microservices', color: '#00D4FF' },
                  { icon: '☁️', label: 'Cloud (GCP)', color: '#8B5CF6' },
                  { icon: '🔄', label: 'Event-Driven', color: '#EC4899' },
                  { icon: '🤖', label: 'AI Integration', color: '#F59E0B' },
                  { icon: '📊', label: 'ERP / Finance', color: '#10B981' },
                  { icon: '🔒', label: 'Secure APIs', color: '#00D4FF' },
                ].map((item, i) => (
                  <motion.div key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.55 + i * 0.07 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl border transition-all"
                    style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)', borderLeft: `3px solid ${item.color}` }}
                  >
                    <span>{item.icon}</span>
                    <span className="text-xs font-medium text-white">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── COL 3: Education + Certifications ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-6"
          >
            {/* Education header */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(100,116,139,0.7)' }}>Education</p>
              <EducationTimeline inView={inView} />
            </div>

            {/* Certifications */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(100,116,139,0.7)' }}>Certifications</p>
              <div className="space-y-2">
                {achievements.filter(a => a.title !== 'Employee of the Quarter').map((cert, i) => (
                  <motion.a key={cert.title}
                    href={cert.link} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ x: 4, scale: 1.01 }}
                    className="flex items-center gap-3 p-3 rounded-xl border group transition-all"
                    style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${cert.color}30`; e.currentTarget.style.background = `${cert.color}07` }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                  >
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg text-base"
                      style={{ background: `${cert.color}12`, border: `1px solid ${cert.color}25` }}
                    >{cert.icon}</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors">{cert.title}</p>
                      <p className="text-xs" style={{ color: 'rgba(100,116,139,0.8)' }}>{cert.org}</p>
                    </div>
                    <i className="fas fa-external-link text-xs opacity-0 group-hover:opacity-50 transition-opacity flex-shrink-0" style={{ color: '#00D4FF' }} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Location card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75 }}
              className="flex items-center gap-3 p-4 rounded-2xl border"
              style={{ background: 'rgba(0,212,255,0.04)', borderColor: 'rgba(0,212,255,0.15)' }}
            >
              <motion.span className="text-xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>📍</motion.span>
              <div>
                <p className="text-sm font-semibold text-white">{personalInfo.location}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(100,116,139,0.7)' }}>Remote Available Worldwide</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <motion.div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs font-mono" style={{ color: '#10B981' }}>Available</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
