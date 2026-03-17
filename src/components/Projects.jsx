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
  const cat = CAT[project.category] || CAT.enterprise
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }} />

        <motion.div
          className="relative w-full sm:max-w-2xl max-h-screen sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col"
          style={{ background: '#0d0d14', border: `1px solid ${cat.color}25`, boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 60px ${cat.color}10` }}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="h-0.5 flex-shrink-0" style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }} />

          <div className="px-7 pt-7 pb-5 flex-shrink-0 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}30` }}>
                    {cat.label}
                  </span>
                  {project.links.code && (
                    <a href={project.links.code} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                      className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(148,163,184,0.8)' }}>
                      <i className="fab fa-github text-xs" /> Source
                    </a>
                  )}
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                      className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5"
                      style={{ background: `${cat.color}12`, border: `1px solid ${cat.color}25`, color: cat.color }}>
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
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: `${cat.color}20` }}>
              <img src={project.image} alt={project.title} className="w-full"
                style={{ maxHeight: 200, objectFit: 'cover', objectPosition: 'top' }}
                onError={e => { e.target.style.display = 'none' }}
              />
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color: cat.color }}>
                <span className="w-4 h-px inline-block" style={{ background: cat.color }} />
                Overview
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.85)' }}>{project.description}</p>
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#10B981' }}>
                <span className="w-4 h-px inline-block" style={{ background: '#10B981' }} />
                Key Impact
              </div>
              <div className="space-y-2">
                {project.highlights.map((h, i) => (
                  <motion.div key={h}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
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
                <span className="w-4 h-px inline-block" style={{ background: 'rgba(100,116,139,0.4)' }} />
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full font-mono"
                    style={{ background: `${cat.color}0d`, border: `1px solid ${cat.color}20`, color: `${cat.color}cc` }}>
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
// PROJECT CARD
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onOpenCase, muted = false }) {
  const wrapperRef = useRef(null)
  const cardRef = useRef(null)
  const rafRef = useRef(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const cat = CAT[project.category] || CAT.enterprise

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const wrapper = wrapperRef.current
      const card = cardRef.current
      if (!card || !wrapper) return
      const rect = wrapper.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      card.style.transform = `rotateX(${-((y - cy) / cy) * 5}deg) rotateY(${((x - cx) / cx) * 7}deg) translateZ(10px) scale(1.01)`
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)'
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)'
    setTimeout(() => { if (card) card.style.transition = '' }, 600)
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: muted ? 0.75 : 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.23, 1, 0.32, 1] }}
      layout
    >
      <div ref={wrapperRef}
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        onMouseEnter={() => { if (cardRef.current) cardRef.current.style.transition = 'transform 0.1s ease' }}
        style={{ perspective: '1000px' }}
      >
        <div
          ref={cardRef}
          className="group relative rounded-2xl border overflow-hidden cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.02)',
            borderColor: 'rgba(255,255,255,0.06)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          onClick={() => onOpenCase(project)}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = `${cat.color}30`
            e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${cat.color}0a`
            if (muted) e.currentTarget.parentElement?.parentElement?.setAttribute('style', 'opacity:1')
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
            e.currentTarget.style.boxShadow = ''
          }}
        >
          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
            style={{ background: `linear-gradient(to bottom, transparent, ${cat.color}, transparent)`, opacity: muted ? 0.35 : 0.6 }} />

          {/* Image */}
          <div className="relative h-36 overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <img src={project.image} alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
            />
            <div className="w-full h-full items-center justify-center text-3xl absolute inset-0"
              style={{ display: 'none', background: 'rgba(10,10,15,0.95)' }}>
              {project.category === 'enterprise' ? '🏢' : project.category === 'backend' ? '⚙️' : project.category === 'frontend' ? '🎨' : '🐍'}
            </div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.1) 60%, transparent 100%)' }} />

            <div className="absolute top-3 left-3.5">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                style={{ background: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}30`, backdropFilter: 'blur(8px)' }}>
                {cat.label}
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2"
                style={{ background: 'rgba(0,0,0,0.8)', border: `1px solid ${cat.color}40`, color: cat.color, backdropFilter: 'blur(12px)' }}>
                <i className="fas fa-expand-alt text-xs" /> Case Study
              </div>
            </div>

            <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.links.code && (
                <a href={project.links.code} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-xs"
                  style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(226,232,240,0.8)' }}>
                  <i className="fab fa-github" />
                </a>
              )}
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-xs"
                  style={{ background: 'rgba(0,0,0,0.8)', border: `1px solid ${cat.color}30`, color: cat.color }}>
                  <i className="fas fa-external-link" />
                </a>
              )}
              {!project.links.code && !project.links.live && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs"
                  style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(100,116,139,0.6)' }}>
                  <i className="fas fa-lock text-xs" />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 relative z-10">
            <h3 className="text-sm font-display font-bold text-white mb-2 leading-snug">{project.title}</h3>
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(148,163,184,0.65)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {project.highlights.slice(0, 2).map(h => (
                <span key={h} className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${cat.color}0d`, color: `${cat.color}bb`, border: `1px solid ${cat.color}20` }}>
                  ✓ {h}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-1 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
              {project.tech.slice(0, 4).map(t => (
                <span key={t} className="text-xs px-2 py-0.5 rounded font-mono"
                  style={{ color: 'rgba(100,116,139,0.6)', background: 'rgba(255,255,255,0.03)' }}>
                  {t}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ color: 'rgba(100,116,139,0.4)' }}>
                  +{project.tech.length - 4}
                </span>
              )}
            </div>
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
      <div className="absolute pointer-events-none" style={{ top: '15%', left: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.04) 0%,transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,212,255,0.04) 0%,transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-7xl mx-auto px-6">

        {/* ── ENTERPRISE PROJECTS ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-sm mb-3 tracking-widest uppercase font-mono" style={{ color: '#EC4899' }}>Production Systems</p>
          <h2 className="section-title text-white">Enterprise <span className="gradient-text-cyan">Projects</span></h2>
          <p className="mt-4 max-w-md mx-auto text-sm" style={{ color: 'rgba(100,116,139,0.7)' }}>
            Live production systems powering real business operations · Click any card to open a case study
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {enterpriseProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpenCase={setCaseProject} />
          ))}
        </motion.div>

        {/* Enterprise note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-20"
        >
          <div className="h-px w-16" style={{ background: 'rgba(0,212,255,0.2)' }} />
          <span className="text-xs font-mono flex items-center gap-2" style={{ color: 'rgba(100,116,139,0.5)' }}>
            <i className="fas fa-lock text-xs" style={{ color: '#00D4FF', opacity: 0.6 }} />
            Private repos · Production-grade · Not open source
          </span>
          <div className="h-px w-16" style={{ background: 'rgba(0,212,255,0.2)' }} />
        </motion.div>

        {/* ── DIVIDER ────────────────────────────────────── */}
        <div className="flex items-center gap-6 mb-16">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08))' }} />
          <div className="text-xs font-mono px-4 py-2 rounded-full border flex items-center gap-2"
            style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(100,116,139,0.5)', background: 'rgba(255,255,255,0.02)' }}>
            <i className="fas fa-graduation-cap" style={{ color: '#8B5CF6', opacity: 0.7 }} />
            Training years
          </div>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.08))' }} />
        </div>

        {/* ── LEARNING PROJECTS ──────────────────────────── */}
        <div ref={learningRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={learningInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="text-xs mb-2 tracking-widest uppercase font-mono" style={{ color: '#8B5CF6' }}>Masai & Self-Directed Learning</p>
            <h3 className="text-2xl font-display font-bold" style={{ color: 'rgba(226,232,240,0.6)' }}>
              Learning <span style={{ color: '#8B5CF6' }}>Projects</span>
            </h3>
            <p className="mt-3 max-w-md mx-auto text-xs" style={{ color: 'rgba(100,116,139,0.5)' }}>
              Built during training (2022–2024) to master backend, frontend, and Python fundamentals
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={learningInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {learningProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onOpenCase={setCaseProject} muted />
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={learningInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="text-center mt-12">
          <motion.a href="https://github.com/SakthivelMadhu" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(148,163,184,0.8)' }}
          >
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
