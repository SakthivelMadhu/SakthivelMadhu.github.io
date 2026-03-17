import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { workHistory } from '../data/portfolio'

// ─────────────────────────────────────────────────────────────────────────────
// DETERMINISTIC STARS
// ─────────────────────────────────────────────────────────────────────────────
const makeStars = (n, seed = 1) =>
  Array.from({ length: n }, (_, i) => {
    const h = (v) => { const s = Math.sin(v) * 43758.5453; return s - Math.floor(s) }
    return { x: h(seed + i * 127.1) * 100, y: h(seed + i * 311.7) * 100, r: h(seed + i * 523.9) * 1.4 + 0.3, o: h(seed + i * 91.3) * 0.5 + 0.2, d: h(seed + i * 47.2) * 3 + 2, delay: h(seed + i * 213.5) * 3 }
  })
const STARS_A = makeStars(35, 1)
const STARS_B = makeStars(35, 77)
const STARS_C = makeStars(35, 42)

function SpaceField({ stars, accent }) {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 40%, rgba(10,10,30,0.96) 0%, rgba(4,4,12,0.99) 100%)` }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 75% 25%, ${accent}14 0%, transparent 55%)` }} />
      <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(${accent}07 1px, transparent 1px),linear-gradient(90deg,${accent}07 1px,transparent 1px)`, backgroundSize: '44px 44px' }} />
      {stars.map((s, i) => (
        <motion.div key={i} className="absolute rounded-full"
          animate={{ opacity: [s.o * 0.3, s.o, s.o * 0.3] }}
          transition={{ duration: s.d, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r * 2, height: s.r * 2, background: '#fff', boxShadow: `0 0 ${s.r * 4}px rgba(255,255,255,0.7)` }}
        />
      ))}
    </div>
  )
}

function TiltWrapper({ children, accent }) {
  const innerRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)
  const onMove = useCallback((e) => {
    const el = innerRef.current?.parentElement
    if (!el) return
    const r = el.getBoundingClientRect()
    target.current = { x: ((e.clientY - r.top - r.height / 2) / r.height) * 8, y: ((e.clientX - r.left - r.width / 2) / r.width) * -8 }
  }, [])
  const onLeave = useCallback(() => { target.current = { x: 0, y: 0 } }, [])
  useEffect(() => {
    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.07
      current.current.y += (target.current.y - current.current.y) * 0.07
      if (innerRef.current) innerRef.current.style.transform = `rotateX(${current.current.x}deg) rotateY(${current.current.y}deg)`
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])
  return (
    <div className="relative rounded-2xl border" style={{ perspective: '900px', minHeight: '380px', background: 'rgba(4,4,12,0.97)', borderColor: `${accent}22`, boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 60px ${accent}0d, inset 0 1px 0 ${accent}18`, overflow: 'hidden' }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={innerRef} style={{ transformStyle: 'preserve-3d', height: '100%' }}>{children}</div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3D PANELS
// ─────────────────────────────────────────────────────────────────────────────
function TwinleavesPanel() {
  const metrics = [
    { label: '80% faster', sub: 'ERP processing', color: '#00D4FF', z: 45, top: '8%', left: '-6%' },
    { label: '95% accuracy', sub: 'Doc-AI ledger', color: '#10B981', z: 35, top: '5%', right: '-4%' },
    { label: '4 platforms', sub: 'ERP·VMS·HRMS·Fin', color: '#F59E0B', z: 40, bottom: '10%', left: '-4%' },
    { label: 'Real-time', sub: 'Face-ID attendance', color: '#8B5CF6', z: 30, bottom: '8%', right: '-2%' },
  ]
  return (
    <TiltWrapper accent="#00D4FF">
      <SpaceField stars={STARS_A} accent="#00D4FF" />
      <div className="relative z-10 px-5 pt-4 pb-2 flex items-center justify-between border-b" style={{ borderColor: 'rgba(0,212,255,0.12)' }}>
        <div className="flex items-center gap-2">
          <motion.div animate={{ boxShadow: ['0 0 6px #00D4FF', '0 0 20px #00D4FF80', '0 0 6px #00D4FF'] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full" style={{ background: '#00D4FF' }} />
          <span className="text-xs font-mono font-bold tracking-widest uppercase" style={{ color: '#00D4FF' }}>twinleaves.erp</span>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' }}>● LIVE</span>
      </div>
      <div className="relative z-10 flex items-center justify-center" style={{ minHeight: '310px', transformStyle: 'preserve-3d' }}>
        <motion.div
          animate={{ translateY: [0, -16, 0], rotateY: [-6, 6, -6], rotateX: [3, -3, 3] }}
          transition={{ translateY: { duration: 6, repeat: Infinity, ease: 'easeInOut' }, rotateY: { duration: 8, repeat: Infinity, ease: 'easeInOut' }, rotateX: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ transformStyle: 'preserve-3d', position: 'relative' }}
        >
          <div style={{ width: '240px', background: 'linear-gradient(145deg,#1e1e2e,#12121e)', borderRadius: '10px 10px 4px 4px', padding: '7px 7px 4px 7px', border: '1px solid rgba(0,212,255,0.35)', boxShadow: '0 0 40px rgba(0,212,255,0.18), 0 30px 80px rgba(0,0,0,0.85)' }}>
            <div style={{ background: 'rgba(0,212,255,0.06)', borderRadius: '4px 4px 0 0', padding: '3px 8px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />)}
              <span style={{ fontSize: '8px', color: 'rgba(0,212,255,0.5)', marginLeft: '6px', fontFamily: 'monospace' }}>twinleaves.enterprise.dashboard</span>
            </div>
            <div style={{ borderRadius: '3px', overflow: 'hidden', border: '1px solid rgba(0,212,255,0.15)' }}>
              <img src="/img/erp.webp" alt="ERP" style={{ width: '100%', display: 'block', maxHeight: '150px', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '50px', height: '7px', background: 'linear-gradient(to bottom,#1e1e2e,#12121e)', border: '1px solid rgba(0,212,255,0.2)', borderTop: 'none' }} />
            <div style={{ width: '80px', height: '3px', background: 'rgba(0,212,255,0.15)', borderRadius: '2px' }} />
          </div>
          {metrics.map((m, i) => (
            <motion.div key={m.label}
              animate={{ translateZ: m.z, translateY: [0, i % 2 === 0 ? -8 : 6, 0] }}
              transition={{ translateY: { duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 } }}
              style={{ position: 'absolute', ...(m.top ? { top: m.top } : { bottom: m.bottom }), ...(m.left ? { left: m.left } : { right: m.right }), background: `linear-gradient(135deg,${m.color}15,rgba(4,4,12,0.9))`, border: `1px solid ${m.color}35`, borderRadius: '10px', padding: '6px 10px', backdropFilter: 'blur(12px)', boxShadow: `0 8px 30px rgba(0,0,0,0.5),0 0 15px ${m.color}18`, whiteSpace: 'nowrap', transformStyle: 'preserve-3d' }}
            >
              <div style={{ fontSize: '11px', fontWeight: 700, color: m.color, fontFamily: 'monospace' }}>{m.label}</div>
              <div style={{ fontSize: '9px', color: 'rgba(148,163,184,0.6)', marginTop: '1px' }}>{m.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </TiltWrapper>
  )
}

function MasaiPanel() {
  return (
    <TiltWrapper accent="#8B5CF6">
      <SpaceField stars={STARS_B} accent="#8B5CF6" />
      <div className="relative z-10 px-5 pt-4 pb-2 flex items-center justify-between border-b" style={{ borderColor: 'rgba(139,92,246,0.12)' }}>
        <div className="flex items-center gap-2">
          <motion.div animate={{ boxShadow: ['0 0 6px #8B5CF6', '0 0 20px #8B5CF680', '0 0 6px #8B5CF6'] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-2 h-2 rounded-full" style={{ background: '#8B5CF6' }} />
          <span className="text-xs font-mono font-bold tracking-widest uppercase" style={{ color: '#8B5CF6' }}>masai.academy</span>
        </div>
        <span className="text-xs font-mono" style={{ color: 'rgba(139,92,246,0.5)' }}>Full-Stack Dev</span>
      </div>
      <div className="relative z-10 flex items-center justify-center" style={{ minHeight: '310px', transformStyle: 'preserve-3d' }}>
        <motion.div
          animate={{ translateY: [0, -20, 0], rotateY: [-25, 25, -25], rotateX: [8, -8, 8] }}
          transition={{ translateY: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }, rotateY: { duration: 7, repeat: Infinity, ease: 'easeInOut' }, rotateX: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ transformStyle: 'preserve-3d', position: 'relative' }}
        >
          <div style={{ width: '260px', height: '164px', borderRadius: '16px', background: 'linear-gradient(135deg,#2d1b69 0%,#7c3aed 45%,#a855f7 75%,#ec4899 100%)', boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(139,92,246,0.35)', padding: '20px 22px', position: 'relative', overflow: 'hidden', transformStyle: 'preserve-3d' }}>
            <motion.div animate={{ x: ['-120%', '220%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.18) 50%,transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ width: '36px', height: '26px', borderRadius: '5px', background: 'linear-gradient(135deg,#ffd700,#ffb700)', marginBottom: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.4)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '2px', padding: '4px' }}>
              {Array(6).fill(0).map((_, i) => <div key={i} style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '1px' }} />)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', marginBottom: '3px' }}>FULL-STACK DEVELOPER</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', fontFamily: 'monospace', letterSpacing: '1px' }}>SAKTHIVEL MADHU</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>MASAI SCHOOL · 2160+ HRS</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'rgba(255,255,255,0.9)', fontFamily: 'monospace', lineHeight: 1 }}>MS</div>
                <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>MASAI</div>
              </div>
            </div>
          </div>
          {[
            { v: '2160+', l: 'Hours Coded', color: '#8B5CF6', pos: { top: '4%', left: '4%' }, z: 50, dy: -8 },
            { v: '3+', l: 'Apps Built', color: '#EC4899', pos: { top: '4%', right: '4%' }, z: 40, dy: 6 },
            { v: 'Java', l: 'Spring + React', color: '#00D4FF', pos: { bottom: '4%', left: '5%' }, z: 45, dy: -6 },
            { v: '1 yr', l: 'Intensive Prog', color: '#10B981', pos: { bottom: '4%', right: '4%' }, z: 35, dy: 8 },
          ].map((badge, i) => (
            <motion.div key={badge.v}
              animate={{ translateZ: badge.z, translateY: [0, badge.dy, 0] }}
              transition={{ translateY: { duration: 4 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 } }}
              style={{ position: 'absolute', ...badge.pos, background: `linear-gradient(135deg,${badge.color}18,rgba(4,4,12,0.85))`, border: `1px solid ${badge.color}35`, borderRadius: '10px', padding: '7px 11px', backdropFilter: 'blur(12px)', boxShadow: `0 8px 30px rgba(0,0,0,0.5),0 0 12px ${badge.color}18`, textAlign: 'center', transformStyle: 'preserve-3d' }}
            >
              <div style={{ fontSize: '14px', fontWeight: 800, color: badge.color, fontFamily: 'monospace' }}>{badge.v}</div>
              <div style={{ fontSize: '8px', color: 'rgba(148,163,184,0.6)', marginTop: '1px', whiteSpace: 'nowrap' }}>{badge.l}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </TiltWrapper>
  )
}

function EFIPanel() {
  const features = [
    { icon: '🎨', label: 'Color Management', color: '#EC4899', z: 50, pos: { top: '8%', left: '2%' }, dy: -7 },
    { icon: '🖨️', label: 'Print Optimizer', color: '#F59E0B', z: 40, pos: { top: '8%', right: '1%' }, dy: 7 },
    { icon: '🔗', label: 'Driver API', color: '#00D4FF', z: 45, pos: { bottom: '8%', left: '3%' }, dy: -5 },
    { icon: '🚀', label: 'v2.1 & v2.2 Released', color: '#10B981', z: 35, pos: { bottom: '8%', right: '1%' }, dy: 6 },
  ]
  return (
    <TiltWrapper accent="#EC4899">
      <SpaceField stars={STARS_C} accent="#EC4899" />
      <div className="relative z-10 px-5 pt-4 pb-2 flex items-center justify-between border-b" style={{ borderColor: 'rgba(236,72,153,0.12)' }}>
        <div className="flex items-center gap-2">
          <motion.div animate={{ boxShadow: ['0 0 6px #EC4899', '0 0 20px #EC489980', '0 0 6px #EC4899'] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full" style={{ background: '#EC4899' }} />
          <span className="text-xs font-mono font-bold tracking-widest uppercase" style={{ color: '#EC4899' }}>efi.fiery</span>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' }}>2 Releases</span>
      </div>
      <div className="relative z-10 flex items-center justify-center" style={{ minHeight: '310px', transformStyle: 'preserve-3d' }}>
        <motion.div
          animate={{ translateY: [0, -18, 0], rotateY: [10, -10, 10], rotateX: [-5, 5, -5] }}
          transition={{ translateY: { duration: 6, repeat: Infinity, ease: 'easeInOut' }, rotateY: { duration: 8, repeat: Infinity, ease: 'easeInOut' }, rotateX: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ transformStyle: 'preserve-3d', position: 'relative' }}
        >
          <div style={{ width: '210px', borderRadius: '20px', background: 'linear-gradient(145deg,#1a0a1e,#2d0a28,#1e0818)', border: '1px solid rgba(236,72,153,0.4)', boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 50px rgba(236,72,153,0.2)', padding: '22px 20px', position: 'relative', overflow: 'hidden', transformStyle: 'preserve-3d' }}>
            <motion.div animate={{ x: ['-120%', '220%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg,transparent 35%,rgba(236,72,153,0.15) 50%,transparent 65%)', pointerEvents: 'none' }} />
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg,#EC4899,#be185d)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(236,72,153,0.4)', fontSize: '20px' }}>🖨️</div>
              <div><div style={{ fontSize: '16px', fontWeight: 800, color: '#fff', letterSpacing: '2px' }}>FIERY</div><div style={{ fontSize: '9px', color: 'rgba(236,72,153,0.7)', letterSpacing: '1px' }}>EFI Enterprise Print</div></div>
            </div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
              {['#EC4899', '#F59E0B', '#00D4FF', '#10B981', '#8B5CF6'].map(c => (
                <div key={c} style={{ width: '20px', height: '20px', borderRadius: '50%', background: c, boxShadow: `0 0 8px ${c}60`, border: '2px solid rgba(255,255,255,0.15)' }} />
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[{ v: 'C++ / SQL', l: 'Core Stack' }, { v: '2 Releases', l: 'Shipped' }, { v: '3 Modules', l: 'Built' }, { v: 'Enterprise', l: 'Scale' }].map(s => (
                <div key={s.l} style={{ background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.18)', borderRadius: '8px', padding: '6px 8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#EC4899', fontFamily: 'monospace' }}>{s.v}</div>
                  <div style={{ fontSize: '9px', color: 'rgba(148,163,184,0.5)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          {features.map((f, i) => (
            <motion.div key={f.label}
              animate={{ translateZ: f.z, translateY: [0, f.dy, 0] }}
              transition={{ translateY: { duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 } }}
              style={{ position: 'absolute', ...f.pos, background: `linear-gradient(135deg,${f.color}18,rgba(4,4,12,0.85))`, border: `1px solid ${f.color}35`, borderRadius: '10px', padding: '6px 10px', backdropFilter: 'blur(12px)', boxShadow: `0 8px 25px rgba(0,0,0,0.5),0 0 12px ${f.color}15`, transformStyle: 'preserve-3d', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}
            >
              <span style={{ fontSize: '12px' }}>{f.icon}</span>
              <div style={{ fontSize: '9px', fontWeight: 700, color: f.color, fontFamily: 'monospace' }}>{f.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </TiltWrapper>
  )
}

const PANELS = [TwinleavesPanel, MasaiPanel, EFIPanel]

// ─────────────────────────────────────────────────────────────────────────────
// JOB CARD — left or right side, with rotating achievements
// ─────────────────────────────────────────────────────────────────────────────
function JobCard({ job, index, align }) {
  const [activeAch, setActiveAch] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const t = setInterval(() => {
      setActiveAch(a => (a + 1) % job.achievements.length)
    }, 3200)
    return () => clearInterval(t)
  }, [job.achievements.length])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col h-full"
    >
      {/* Chapter label */}
      <div className="flex items-center gap-3 mb-5">
        <motion.div
          className="font-display font-black text-6xl leading-none select-none"
          style={{ color: `${job.color}20` }}
          animate={{ color: [`${job.color}20`, `${job.color}35`, `${job.color}20`] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: job.color }}>
            {job.chapter}
          </div>
          {job.isCurrent && (
            <span className="text-xs font-mono px-2 py-0.5 rounded-full inline-flex items-center gap-1.5"
              style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.25)' }}>
              <motion.span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#10B981' }}
                animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
              Current
            </span>
          )}
        </div>
      </div>

      {/* Main info */}
      <div className="mb-6">
        <h3 className="font-display font-bold text-white text-2xl md:text-3xl leading-tight mb-2">{job.company}</h3>
        <div className="font-medium text-base mb-1" style={{ color: job.color }}>{job.role}</div>
        <div className="text-sm font-mono" style={{ color: 'rgba(100,116,139,0.6)' }}>
          {job.duration} · {job.location}
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(148,163,184,0.75)' }}>{job.summary}</p>

      {/* Rotating achievement */}
      <div className="flex-1 min-h-0 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-px" style={{ background: job.color }} />
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: job.color }}>Key Achievement</span>
          <div className="flex gap-1 ml-auto">
            {job.achievements.map((_, i) => (
              <motion.button key={i} onClick={() => setActiveAch(i)}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{ background: i === activeAch ? job.color : `${job.color}30` }}
                animate={{ scale: i === activeAch ? 1.3 : 1 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border" style={{ background: `${job.color}06`, borderColor: `${job.color}18`, minHeight: 120 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="p-5"
            >
              <div className="font-bold text-white text-sm mb-3">{job.achievements[activeAch].title}</div>
              <div className="flex flex-wrap gap-1.5">
                {job.achievements[activeAch].impact.map(imp => (
                  <span key={imp} className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: `${job.color}15`, color: job.color, border: `1px solid ${job.color}30` }}>
                    ✓ {imp}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Tech */}
      <div className="flex flex-wrap gap-1.5">
        {job.tech.map(t => (
          <span key={t} className="text-xs px-2.5 py-1 rounded-full font-mono"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(148,163,184,0.6)' }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER ROW — full-width zigzag entry
// ─────────────────────────────────────────────────────────────────────────────
function ChapterRow({ job, index }) {
  // odd = panel left, even = panel right
  const panelLeft = index % 2 !== 0
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const Panel = PANELS[index]

  return (
    <div ref={ref} className="relative">
      {/* Timeline connector (not for last item) */}
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center py-16 md:py-20">
        {panelLeft ? (
          <>
            {/* LEFT: Panel */}
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.96 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <Panel />
            </motion.div>
            {/* RIGHT: Job info */}
            <JobCard job={job} index={index} align="right" />
          </>
        ) : (
          <>
            {/* LEFT: Job info */}
            <JobCard job={job} index={index} align="left" />
            {/* RIGHT: Panel */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <Panel />
            </motion.div>
          </>
        )}
      </div>

      {/* Section divider (not last) */}
      {index < workHistory.length - 1 && (
        <div className="relative flex items-center justify-center py-2">
          <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
          <div className="absolute flex items-center gap-3 px-6 rounded-full py-1"
            style={{ background: '#0a0a0f', border: '1px solid rgba(255,255,255,0.06)' }}>
            <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: workHistory[index].color }}
              animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <i className="fas fa-arrow-down text-xs" style={{ color: 'rgba(100,116,139,0.4)' }} />
            <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: workHistory[index + 1].color }}
              animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION
// ─────────────────────────────────────────────────────────────────────────────
export default function WorkHistory() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    let ctx
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      if (!sectionRef.current) return
      ctx = gsap.context(() => {
        if (headingRef.current)
          gsap.fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: headingRef.current, start: 'top 85%', end: 'top 45%', scrub: 0.5 } })
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute pointer-events-none" style={{ top: '5%', left: '-10%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.05) 0%,transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,212,255,0.04) 0%,transparent 70%)', filter: 'blur(50px)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-4">
          <p className="font-mono text-sm mb-3 tracking-widest uppercase" style={{ color: '#8B5CF6' }}>Career Journey</p>
          <h2 className="section-title text-white">Work <span className="gradient-text-cyan">History</span></h2>
          <p className="mt-4 max-w-xl mx-auto text-sm" style={{ color: 'rgba(100,116,139,0.7)' }}>
            Three chapters — each one bigger than the last
          </p>
        </div>

        {/* Zigzag chapters */}
        {workHistory.map((job, i) => (
          <ChapterRow key={job.id} job={job} index={i} />
        ))}
      </div>
    </section>
  )
}
