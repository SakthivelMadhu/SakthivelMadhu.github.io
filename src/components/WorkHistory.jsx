import { useEffect, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
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
// GAP CARD — self-learning period
// ─────────────────────────────────────────────────────────────────────────────
function GapCard({ gap }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto max-w-2xl my-2"
    >
      {/* Vertical connector lines */}
      <div className="absolute left-1/2 -top-8 h-8 w-px" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(16,185,129,0.3))', transform: 'translateX(-50%)' }} />
      <div className="absolute left-1/2 -bottom-8 h-8 w-px" style={{ background: 'linear-gradient(to bottom, rgba(16,185,129,0.3), rgba(255,255,255,0.06))', transform: 'translateX(-50%)' }} />

      <div className="rounded-2xl border p-6 relative overflow-hidden"
        style={{ background: 'rgba(16,185,129,0.03)', borderColor: 'rgba(16,185,129,0.15)', borderStyle: 'dashed' }}>
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.25)' }}>
                {gap.chapter}
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(16,185,129,0.06)', color: 'rgba(16,185,129,0.7)', border: '1px solid rgba(16,185,129,0.12)' }}>
                🎓 Self-Directed
              </span>
            </div>
            <span className="text-xs font-mono" style={{ color: 'rgba(100,116,139,0.5)' }}>{gap.duration}</span>
          </div>

          <h4 className="font-display font-bold text-white text-lg mb-1">{gap.role}</h4>
          <p className="text-xs mb-4" style={{ color: 'rgba(148,163,184,0.6)' }}>{gap.summary}</p>

          <div className="grid sm:grid-cols-3 gap-3">
            {gap.achievements.map((ach, i) => (
              <motion.div key={ach.title}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-3 rounded-xl border"
                style={{ background: 'rgba(16,185,129,0.04)', borderColor: 'rgba(16,185,129,0.1)' }}>
                <div className="text-xs font-semibold text-white mb-1">{ach.title}</div>
                <div className="flex flex-wrap gap-1">
                  {ach.impact.map(imp => (
                    <span key={imp} className="text-xs px-1.5 py-0.5 rounded font-mono"
                      style={{ color: 'rgba(16,185,129,0.7)', background: 'rgba(16,185,129,0.08)' }}>
                      {imp}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1 mt-4 pt-3 border-t" style={{ borderColor: 'rgba(16,185,129,0.08)' }}>
            {gap.tech.map(t => (
              <span key={t} className="text-xs px-2 py-0.5 rounded font-mono"
                style={{ color: 'rgba(100,116,139,0.5)', background: 'rgba(255,255,255,0.02)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// JOB CARD — full detail view with all achievements expanded
// ─────────────────────────────────────────────────────────────────────────────
function JobCard({ job, index, align }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Collect all unique impact tags across achievements for the metrics row
  const allImpact = job.achievements.flatMap(a => a.impact).slice(0, 4)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-5"
    >
      {/* Timeline spine */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0" style={{ paddingTop: 6 }}>
        {/* Circle node */}
        <motion.div
          className="w-4 h-4 rounded-full border-2 flex-shrink-0 relative z-10"
          style={{ borderColor: job.color, background: '#0a0a0f', boxShadow: `0 0 12px ${job.color}50` }}
          animate={{ boxShadow: [`0 0 8px ${job.color}40`, `0 0 20px ${job.color}70`, `0 0 8px ${job.color}40`] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-1 rounded-full"
            style={{ background: job.color }}
            animate={{ scale: [0.6, 1, 0.6], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        {/* Vertical line */}
        <motion.div
          className="w-px flex-1 mt-2"
          style={{ background: `linear-gradient(to bottom, ${job.color}50, ${job.color}10)` }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 pb-4">

        {/* ── Header ── */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-mono text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
            style={{ background: `${job.color}12`, color: job.color, border: `1px solid ${job.color}25` }}>
            {job.chapter}
          </span>
          {job.isCurrent && (
            <span className="text-xs font-mono px-2.5 py-1 rounded-full inline-flex items-center gap-1.5"
              style={{ background: 'rgba(16,185,129,0.08)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' }}>
              <motion.span className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0" style={{ background: '#10B981' }}
                animate={{ scale: [1, 1.7, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
              Current Role
            </span>
          )}
        </div>

        {/* ── Company + role ── */}
        <div className="mb-3">
          <h3 className="font-display font-bold text-white text-2xl md:text-3xl leading-tight mb-1.5">
            {job.company}
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-base" style={{ color: job.color }}>{job.role}</span>
            <span className="text-sm font-mono" style={{ color: 'rgba(100,116,139,0.55)' }}>
              {job.duration}
            </span>
            <span className="text-xs px-2 py-0.5 rounded font-mono"
              style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(100,116,139,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
              📍 {job.location}
            </span>
          </div>
        </div>

        {/* ── Summary ── */}
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(148,163,184,0.7)' }}>
          {job.summary}
        </p>

        {/* ── Key metrics row ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-6 p-3 rounded-xl border"
          style={{ background: `${job.color}06`, borderColor: `${job.color}15` }}
        >
          <span className="font-mono text-xs uppercase tracking-widest w-full mb-1" style={{ color: `${job.color}80` }}>
            Key Metrics
          </span>
          {allImpact.map((imp, i) => (
            <motion.span
              key={imp}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 250 }}
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ background: `${job.color}12`, color: job.color, border: `1px solid ${job.color}25` }}
            >
              ⚡ {imp}
            </motion.span>
          ))}
        </motion.div>

        {/* ── All achievements expanded ── */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-px" style={{ background: job.color }} />
            <span className="font-mono text-xs uppercase tracking-widest font-bold" style={{ color: job.color }}>
              Achievements
            </span>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${job.color}20, transparent)` }} />
          </div>

          <div className="space-y-3">
            {job.achievements.map((ach, i) => {
              // Malaysia client achievement — special flagship card
              if (ach.isMalaysiaClient) {
                return (
                  <motion.div
                    key={ach.title}
                    initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl overflow-hidden relative"
                    style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(0,212,255,0.04))', border: '1px solid rgba(16,185,129,0.35)', boxShadow: '0 8px 40px rgba(16,185,129,0.08)' }}
                  >
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ background: 'linear-gradient(90deg, transparent, #10B981, #00D4FF, transparent)' }} />
                    {/* Grid bg */}
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                    <div className="relative z-10 px-4 pt-4 pb-3">
                      {/* Header row */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-2xl">🇲🇾</span>
                        <span className="font-mono text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}>
                          International Client
                        </span>
                        <span className="font-mono text-xs px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(0,212,255,0.08)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.2)' }}>
                          Malaysia 🏢 Abroad
                        </span>
                        <motion.span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#10B981' }}
                          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                      </div>

                      <div className="font-bold text-white text-sm leading-snug mb-2">{ach.title}</div>
                      <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(148,163,184,0.7)' }}>
                        {ach.description}
                      </p>

                      {/* Modules grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                        {[
                          { icon: '📄', label: 'E-Invoice', sub: 'Malaysia Compliant' },
                          { icon: '🏢', label: 'Purchase Job', sub: 'Multi-company' },
                          { icon: '📋', label: 'PO & Express PO', sub: 'Full lifecycle' },
                          { icon: '💳', label: 'Bills → Payable', sub: 'Auto ledger' },
                          { icon: '🧾', label: 'Tax Master', sub: 'SST · Excise · Import' },
                          { icon: '📊', label: 'BigQuery Reports', sub: 'All modules' },
                        ].map(m => (
                          <div key={m.label} className="rounded-xl p-2.5 border"
                            style={{ background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.15)' }}>
                            <div className="text-sm mb-0.5">{m.icon}</div>
                            <div className="text-xs font-semibold text-white">{m.label}</div>
                            <div className="text-xs" style={{ color: 'rgba(100,116,139,0.6)' }}>{m.sub}</div>
                          </div>
                        ))}
                      </div>

                      {/* Impact tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {ach.impact.map(imp => (
                          <span key={imp} className="text-xs px-2.5 py-0.5 rounded-full"
                            style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.22)' }}>
                            ✓ {imp}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="h-px mx-4 mb-3" style={{ background: 'linear-gradient(90deg, rgba(16,185,129,0.25), transparent)' }} />
                  </motion.div>
                )
              }

              return (
                <motion.div
                  key={ach.title}
                  initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.02)', borderColor: `${job.color}18` }}
                >
                  {/* Achievement header */}
                  <div className="flex items-start gap-3 px-4 pt-4 pb-3">
                    {/* Number badge */}
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5"
                      style={{ background: `${job.color}18`, color: job.color, border: `1px solid ${job.color}30` }}
                    >
                      {i}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-sm leading-snug mb-2">{ach.title}</div>
                      {/* Description */}
                      <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(148,163,184,0.65)' }}>
                        {ach.description}
                      </p>
                      {/* Impact tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {ach.impact.map(imp => (
                          <span key={imp}
                            className="text-xs px-2.5 py-0.5 rounded-full"
                            style={{ background: `${job.color}10`, color: job.color, border: `1px solid ${job.color}22` }}
                          >
                            ✓ {imp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Bottom accent line */}
                  <div className="h-px mx-4 mb-3" style={{ background: `linear-gradient(90deg, ${job.color}20, transparent)` }} />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── Tech stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-px" style={{ background: 'rgba(100,116,139,0.4)' }} />
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'rgba(100,116,139,0.5)' }}>
              Stack Used
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {job.tech.map(t => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full font-mono"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(148,163,184,0.55)' }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER ROW — full-width zigzag entry
// ─────────────────────────────────────────────────────────────────────────────
function ChapterRow({ job, index, isLast, nextColor }) {
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
      {!isLast && (
        <div className="relative flex items-center justify-center py-2">
          <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
          <div className="absolute flex items-center gap-3 px-6 rounded-full py-1"
            style={{ background: '#0a0a0f', border: '1px solid rgba(255,255,255,0.06)' }}>
            <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: job.color }}
              animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <i className="fas fa-arrow-down text-xs" style={{ color: 'rgba(100,116,139,0.4)' }} />
            <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: nextColor }}
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
          <h2 className="section-title text-white">Professional Work <span className="gradient-text-cyan">Experience</span></h2>
          <p className="mt-4 max-w-xl mx-auto text-sm" style={{ color: 'rgba(100,116,139,0.7)' }}>
            From foundation to full-scale enterprise engineering
          </p>
        </div>

        {/* Zigzag chapters — main jobs only; gap rendered as a bridge card */}
        {(() => {
          const mainJobs = workHistory.filter(j => !j.isGap)
          const gapEntry = workHistory.find(j => j.isGap)
          return mainJobs.map((job, i) => (
            <div key={job.id}>
              <ChapterRow
                job={job}
                index={i}
                isLast={i === mainJobs.length - 1}
                nextColor={i < mainJobs.length - 1 ? mainJobs[i + 1].color : job.color}
              />
              {/* After Twinleaves (index 0), show the self-learning gap bridge */}
              {i === 0 && gapEntry && <GapCard gap={gapEntry} />}
            </div>
          ))
        })()}
      </div>
    </section>
  )
}
