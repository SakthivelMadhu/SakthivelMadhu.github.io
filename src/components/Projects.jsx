import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { projects } from '../data/portfolio'

const CAT = {
  enterprise: { color: '#00D4FF', label: 'Enterprise' },
  backend:    { color: '#8B5CF6', label: 'Backend' },
  frontend:   { color: '#EC4899', label: 'Frontend' },
  python:     { color: '#F59E0B', label: 'Python' },
}

const enterpriseProjects = projects.filter(p => p.category === 'enterprise')
const learningProjects    = projects.filter(p => p.category !== 'enterprise')

// ─────────────────────────────────────────────────────────────────────────────
// CASE STUDY MODAL
// ─────────────────────────────────────────────────────────────────────────────
function CaseStudyModal({ project, onClose }) {
  const color = project.color || CAT[project.category]?.color || '#00D4FF'
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }} />
        <motion.div
          className="relative w-full sm:max-w-2xl max-h-screen sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col"
          style={{ background: '#0d0d14', border: `1px solid ${color}25`, boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 80px ${color}12` }}
          initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="h-0.5 flex-shrink-0" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

          <div className="px-7 pt-7 pb-5 flex-shrink-0 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                    {project.badge || 'Enterprise'}
                  </span>
                  {project.links?.code && (
                    <a href={project.links.code} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                      className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(148,163,184,0.8)' }}>
                      <i className="fab fa-github text-xs" /> Source
                    </a>
                  )}
                  {project.links?.live && (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                      className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5"
                      style={{ background: `${color}12`, border: `1px solid ${color}25`, color }}>
                      <i className="fas fa-external-link text-xs" /> Live
                    </a>
                  )}
                </div>
                <h3 className="text-xl font-display font-bold text-white leading-snug">{project.title}</h3>
              </div>
              <button onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(148,163,184,0.7)' }}>
                <i className="fas fa-times text-sm" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 px-7 py-6 space-y-6">
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: `${color}20` }}>
              <img src={project.image} alt={project.title} className="w-full"
                style={{ maxHeight: 200, objectFit: 'cover', objectPosition: 'top' }}
                onError={e => { e.target.style.display = 'none' }} />
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color }}>
                <span className="w-4 h-px inline-block" style={{ background: color }} /> Overview
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.85)' }}>{project.description}</p>
            </div>
            {project.metrics && (
              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((m, i) => (
                  <div key={i} className="rounded-xl p-3 text-center border"
                    style={{ background: `${color}08`, borderColor: `${color}20` }}>
                    <div className="font-display font-black text-lg" style={{ color }}>{m.value}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(100,116,139,0.7)' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            )}
            <div>
              <div className="font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#10B981' }}>
                <span className="w-4 h-px inline-block" style={{ background: '#10B981' }} /> Key Impact
              </div>
              <div className="space-y-2">
                {project.highlights.map((h, i) => (
                  <motion.div key={h} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
                    <i className="fas fa-check-circle text-xs" style={{ color: '#10B981' }} />
                    <span className="text-sm text-white font-medium">{h}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: 'rgba(100,116,139,0.7)' }}>
                <span className="w-4 h-px inline-block" style={{ background: 'rgba(100,116,139,0.4)' }} /> Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full font-mono"
                    style={{ background: `${color}0d`, border: `1px solid ${color}20`, color: `${color}cc` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="h-4 flex-shrink-0" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ENTERPRISE CARD — premium 3D with unique color per card
// ─────────────────────────────────────────────────────────────────────────────
function EnterpriseCard({ project, index, onOpenCase }) {
  const ref = useRef(null)
  const cardRef = useRef(null)
  const rafRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const color = project.color || '#00D4FF'

  // 3D tilt
  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      card.style.transform = `rotateX(${-y * 10}deg) rotateY(${x * 12}deg) translateZ(16px) scale(1.02)`
    })
  }, [])
  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transition = 'transform 0.7s cubic-bezier(0.23,1,0.32,1)'
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)'
    setTimeout(() => { if (card) card.style.transition = '' }, 700)
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        className="group relative rounded-3xl overflow-hidden cursor-pointer h-full"
        style={{
          background: '#0d0d18',
          border: `1px solid ${color}20`,
          boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 0 0 ${color}00`,
          transformStyle: 'preserve-3d',
          transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
          minHeight: 340,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = `0 24px 80px rgba(0,0,0,0.6), 0 0 60px ${color}20, inset 0 1px 0 ${color}30`
          e.currentTarget.style.borderColor = `${color}50`
          if (cardRef.current) cardRef.current.style.transition = 'transform 0.12s ease'
        }}
        onClick={() => onOpenCase(project)}
      >
        {/* Animated top gradient bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 z-20"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }}
        />

        {/* Corner glow */}
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
          style={{ background: `radial-gradient(circle at top right, ${color}18 0%, transparent 65%)` }} />
        <div className="absolute bottom-0 left-0 w-36 h-36 pointer-events-none"
          style={{ background: `radial-gradient(circle at bottom left, ${color}10 0%, transparent 65%)` }} />

        {/* Hero area */}
        <div className="relative overflow-hidden" style={{ height: 160 }}>
          {/* Bg pattern */}
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${color}15 0%, rgba(10,10,20,0.9) 60%, rgba(5,5,15,1) 100%)` }} />
          <div className="absolute inset-0"
            style={{ backgroundImage: `linear-gradient(${color}08 1px, transparent 1px), linear-gradient(90deg, ${color}08 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

          {/* Project image with overlay */}
          <img src={project.image} alt={project.title}
            className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity"
            style={{ opacity: 0.18 }}
            onError={e => { e.target.style.display = 'none' }} />

          {/* Big icon */}
          <motion.div
            className="absolute"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 52 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {project.icon}
          </motion.div>

          {/* Floating metric badges */}
          {project.metrics && project.metrics.slice(0, 2).map((m, i) => (
            <motion.div
              key={i}
              className="absolute px-2.5 py-1.5 rounded-xl border backdrop-blur-sm"
              style={{
                ...(i === 0 ? { top: 14, left: 14 } : { top: 14, right: 14 }),
                background: `${color}12`,
                borderColor: `${color}30`,
              }}
              animate={{ y: [0, i === 0 ? -4 : -6, 0] }}
              transition={{ duration: 2.8 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            >
              <span className="font-display font-black text-sm leading-none" style={{ color }}>{m.value}</span>
              <span className="block text-xs font-mono leading-tight mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{m.label}</span>
            </motion.div>
          ))}

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16"
            style={{ background: 'linear-gradient(to top, #0d0d18, transparent)' }} />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `${color}08` }}>
            <motion.div
              className="px-5 py-2.5 rounded-xl text-sm font-mono font-bold flex items-center gap-2"
              style={{ background: 'rgba(0,0,0,0.85)', border: `1px solid ${color}50`, color, backdropFilter: 'blur(12px)' }}
              whileHover={{ scale: 1.05 }}
            >
              <i className="fas fa-expand-alt text-xs" /> View Case Study
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          {/* Badge + lock */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
              style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}>
              {project.badge}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded-lg"
              style={{ color: 'rgba(100,116,139,0.5)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <i className="fas fa-lock text-xs" /> Private
            </div>
          </div>

          <h3 className="font-display font-bold text-white text-base leading-snug mb-2">{project.title}</h3>
          <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(148,163,184,0.6)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {project.description}
          </p>

          {/* Impact pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.highlights.map((h, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: `${color}0d`, color: `${color}bb`, border: `1px solid ${color}20` }}>
                ✓ {h}
              </span>
            ))}
          </div>

          {/* Tech row */}
          <div className="flex flex-wrap gap-1 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            {project.tech.slice(0, 4).map(t => (
              <span key={t} className="text-xs px-2 py-0.5 rounded font-mono"
                style={{ color: 'rgba(100,116,139,0.55)', background: 'rgba(255,255,255,0.03)' }}>
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ color: 'rgba(100,116,139,0.35)' }}>
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// LEARNING CARD — compact with hover glow
// ─────────────────────────────────────────────────────────────────────────────
function LearningCard({ project, index, onOpenCase }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const cat = CAT[project.category] || CAT.backend
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 0.8, y: 0 } : {}}
      whileHover={{ opacity: 1, y: -4 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.07, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        className="relative rounded-2xl border overflow-hidden cursor-pointer h-full"
        style={{
          background: hov ? `${cat.color}06` : 'rgba(255,255,255,0.018)',
          borderColor: hov ? `${cat.color}30` : 'rgba(255,255,255,0.06)',
          boxShadow: hov ? `0 12px 40px rgba(0,0,0,0.5), 0 0 30px ${cat.color}10` : 'none',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => onOpenCase(project)}
      >
        {/* Left accent bar animated on hover */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{ background: `linear-gradient(to bottom, transparent, ${cat.color}, transparent)` }}
          animate={{ opacity: hov ? 0.8 : 0.25 }}
          transition={{ duration: 0.3 }}
        />

        {/* Top shimmer on hover */}
        {hov && (
          <motion.div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${cat.color}80, transparent)` }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          />
        )}

        {/* Image strip */}
        <div className="relative h-28 overflow-hidden" style={{ background: 'rgba(0,0,0,0.25)' }}>
          <img src={project.image} alt={project.title}
            className="w-full h-full object-cover"
            style={{ opacity: hov ? 0.22 : 0.12, transition: 'opacity 0.35s ease' }}
            onError={e => { e.target.style.display = 'none' }} />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to top, rgba(10,10,20,0.95) 0%, rgba(10,10,20,0.5) 100%)` }} />

          {/* Category + links */}
          <div className="absolute top-2.5 left-3 flex items-center gap-1.5">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}25`, backdropFilter: 'blur(8px)' }}>
              {cat.label}
            </span>
          </div>
          <div className="absolute top-2.5 right-3 flex gap-1.5">
            {project.links?.code && (
              <a href={project.links.code} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                className="w-6 h-6 flex items-center justify-center rounded-lg text-xs"
                style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(226,232,240,0.7)' }}>
                <i className="fab fa-github" />
              </a>
            )}
            {project.links?.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                className="w-6 h-6 flex items-center justify-center rounded-lg text-xs"
                style={{ background: 'rgba(0,0,0,0.7)', border: `1px solid ${cat.color}30`, color: cat.color }}>
                <i className="fas fa-external-link" />
              </a>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <h3 className="text-sm font-display font-semibold text-white mb-1.5 leading-snug">{project.title}</h3>
          <p className="text-xs leading-relaxed mb-3"
            style={{ color: 'rgba(148,163,184,0.55)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 3).map(t => (
              <span key={t} className="text-xs px-1.5 py-0.5 rounded font-mono"
                style={{ color: 'rgba(100,116,139,0.5)', background: 'rgba(255,255,255,0.025)' }}>
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ color: 'rgba(100,116,139,0.3)' }}>
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  const [caseProject, setCaseProject] = useState(null)
  const sectionRef = useRef(null)
  const learningRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const learningInView = useInView(learningRef, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute pointer-events-none" style={{ top: '10%', left: '-8%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.05) 0%,transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '5%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,212,255,0.04) 0%,transparent 70%)', filter: 'blur(50px)' }} />

      <div className="max-w-7xl mx-auto px-6">

        {/* ── ENTERPRISE HEADING ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-sm mb-3 tracking-widest uppercase font-mono" style={{ color: '#EC4899' }}>Production Systems</p>
          <h2 className="section-title text-white">Enterprise <span className="gradient-text-cyan">Projects</span></h2>
          <p className="mt-4 max-w-lg mx-auto text-sm" style={{ color: 'rgba(100,116,139,0.65)' }}>
            Live production systems powering real business operations at scale
          </p>
        </motion.div>

        {/* ── ENTERPRISE GRID — 2×2 ────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {enterpriseProjects.map((project, i) => (
            <EnterpriseCard key={project.id} project={project} index={i} onOpenCase={setCaseProject} />
          ))}
        </div>

        {/* Private repos note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-3 mb-24"
        >
          <div className="h-px w-20" style={{ background: 'rgba(0,212,255,0.15)' }} />
          <span className="text-xs font-mono flex items-center gap-2" style={{ color: 'rgba(100,116,139,0.45)' }}>
            <i className="fas fa-lock text-xs" style={{ color: '#00D4FF', opacity: 0.5 }} />
            Private repos · Not open source · Production-grade systems
          </span>
          <div className="h-px w-20" style={{ background: 'rgba(0,212,255,0.15)' }} />
        </motion.div>

        {/* ── DIVIDER ─────────────────────────────────── */}
        <div className="flex items-center gap-6 mb-16">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07))' }} />
          <div className="text-xs font-mono px-4 py-2 rounded-full border flex items-center gap-2"
            style={{ borderColor: 'rgba(139,92,246,0.2)', color: 'rgba(139,92,246,0.5)', background: 'rgba(139,92,246,0.04)' }}>
            <i className="fas fa-graduation-cap" /> Training years · 2022 – 2024
          </div>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.07))' }} />
        </div>

        {/* ── LEARNING PROJECTS ───────────────────────── */}
        <div ref={learningRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={learningInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="text-xs mb-2 tracking-widest uppercase font-mono" style={{ color: '#8B5CF6' }}>Masai & Self-Directed Learning</p>
            <h3 className="text-2xl font-display font-bold" style={{ color: 'rgba(226,232,240,0.55)' }}>
              Learning <span style={{ color: '#8B5CF6' }}>Projects</span>
            </h3>
            <p className="mt-3 max-w-md mx-auto text-xs" style={{ color: 'rgba(100,116,139,0.45)' }}>
              Built during training to master backend, frontend, and Python fundamentals
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={learningInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {learningProjects.map((project, i) => (
              <LearningCard key={project.id} project={project} index={i} onOpenCase={setCaseProject} />
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={learningInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="text-center mt-12">
          <motion.a href="https://github.com/SakthivelMadhu" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(148,163,184,0.7)' }}>
            <i className="fab fa-github" /> View All on GitHub <i className="fas fa-arrow-right text-xs opacity-50" />
          </motion.a>
        </motion.div>
      </div>

      {caseProject && (
        <CaseStudyModal project={caseProject} onClose={() => setCaseProject(null)} />
      )}
    </section>
  )
}
