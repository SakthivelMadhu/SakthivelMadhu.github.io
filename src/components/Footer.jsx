import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const NAV_COLS = [
  {
    heading: 'Navigate',
    color: '#00D4FF',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Work History', href: '#work' },
      { label: 'Projects', href: '#projects' },
      { label: 'Skills', href: '#skills' },
    ],
  },
  {
    heading: 'More',
    color: '#8B5CF6',
    links: [
      { label: 'Achievements', href: '#achievements' },
      { label: 'GitHub Stats', href: '#github' },
      { label: 'Beyond the Code', href: '#beyond' },
      { label: 'Contact', href: '#contact' },
    ],
  },
]

const SOCIALS = [
  { icon: 'fab fa-github', href: 'https://github.com/SakthivelMadhu', color: '#e2e8f0', label: 'GitHub', glyph: 'GH' },
  { icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/in/sakthivel-madhu-864647238/', color: '#0A66C2', label: 'LinkedIn', glyph: 'IN' },
  { icon: 'fas fa-code', href: 'https://leetcode.com/u/sakthi130597/', color: '#FFA116', label: 'LeetCode', glyph: 'LC' },
  { icon: 'fas fa-envelope', href: 'mailto:sakthi130597@gmail.com', color: '#00D4FF', label: 'Email', glyph: '@' },
]

const STACK = [
  { label: 'React 18', color: '#00D4FF' },
  { label: 'Vite 5', color: '#8B5CF6' },
  { label: 'Framer Motion', color: '#EC4899' },
  { label: 'GSAP', color: '#10B981' },
  { label: 'Tailwind CSS', color: '#F59E0B' },
]

// Deterministic hash
const h = (v) => { const s = Math.sin(v) * 43758.5453; return s - Math.floor(s) }

// Stars
const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: h(i * 127.1) * 100, y: h(i * 311.7) * 100,
  r: h(i * 523.9) * 1.4 + 0.2,
  o: h(i * 91.3) * 0.5 + 0.1,
  d: h(i * 47.2) * 4 + 2,
  delay: h(i * 213.5) * 4,
}))

// Constellation nodes
const NODES = Array.from({ length: 8 }, (_, i) => ({
  x: 10 + h(i * 71.9) * 80, y: 10 + h(i * 153.3) * 80,
  r: h(i * 39.1) * 2 + 1,
}))

// Edges (only if dist < 30)
const EDGES = []
for (let i = 0; i < NODES.length; i++) {
  for (let j = i + 1; j < NODES.length; j++) {
    const dx = NODES[i].x - NODES[j].x
    const dy = NODES[i].y - NODES[j].y
    if (Math.sqrt(dx * dx + dy * dy) < 32) EDGES.push([i, j])
  }
}

// Big SM signature letter paths (decorative paths)
const SM_LETTERS = 'SM'

function ConstellationBg() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
      {EDGES.map(([a, b], i) => (
        <motion.line key={i}
          x1={NODES[a].x} y1={NODES[a].y}
          x2={NODES[b].x} y2={NODES[b].y}
          stroke="#00D4FF" strokeWidth="0.3"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      {NODES.map((n, i) => (
        <motion.circle key={i}
          cx={n.x} cy={n.y} r={n.r}
          fill="#8B5CF6"
          animate={{ r: [n.r, n.r * 2, n.r], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  )
}

function CircuitLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 1200 400" preserveAspectRatio="none">
      {/* Horizontal traces */}
      {[60, 120, 200, 300, 360].map((y, i) => (
        <motion.path key={i}
          d={`M 0 ${y} H 200 V ${y + 20} H 400 V ${y} H 700 V ${y - 20} H 900 V ${y} H 1200`}
          stroke={['#00D4FF', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'][i]}
          strokeWidth="0.6" fill="none"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear', delay: i * 0.8 }}
        />
      ))}
      {/* Via pads */}
      {[200, 400, 700, 900].map((x, i) => (
        <motion.circle key={i} cx={x} cy={[60, 120, 200, 300][i] + 10} r="4"
          stroke="#00D4FF" strokeWidth="1" fill="none"
          animate={{ opacity: [0.3, 1, 0.3], r: [3, 6, 3] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </svg>
  )
}

function BigMonogram() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <motion.div
        className="font-display font-black select-none"
        style={{
          fontSize: 'clamp(120px, 25vw, 320px)',
          background: 'linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(139,92,246,0.06) 50%, rgba(236,72,153,0.04) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        SM
      </motion.div>
    </div>
  )
}

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), rgba(139,92,246,0.3), transparent)' }}
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    />
  )
}

function StatusPip({ active = true }) {
  return (
    <span className="relative inline-flex h-2 w-2">
      {active && <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#10B981' }} />}
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: active ? '#10B981' : '#475569' }} />
    </span>
  )
}

function SocialCard({ s, i, inView }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.a
      href={s.href}
      target={s.href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      title={s.label}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 200 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl overflow-hidden"
      style={{
        background: hov ? `${s.color}18` : `${s.color}08`,
        border: `1px solid ${hov ? s.color + '50' : s.color + '18'}`,
        boxShadow: hov ? `0 0 20px ${s.color}25, inset 0 0 20px ${s.color}08` : 'none',
        transition: 'all 0.25s ease',
      }}
    >
      {hov && (
        <motion.div
          className="absolute inset-0"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.5 }}
          style={{ background: `linear-gradient(90deg, transparent, ${s.color}20, transparent)` }}
        />
      )}
      <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
      <span className="text-xs font-mono font-semibold" style={{ color: s.color }}>{s.label}</span>
    </motion.a>
  )
}

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const scrollTo = (href) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer ref={ref} className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #05050a 0%, #020208 100%)' }}>
      {/* Top divider glow */}
      <div className="relative h-px">
        <motion.div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #00D4FF 25%, #8B5CF6 50%, #EC4899 75%, transparent 100%)' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Big translucent SM monogram */}
        <BigMonogram />

        {/* Starfield */}
        {STARS.map((s, i) => (
          <motion.div key={i}
            className="absolute rounded-full"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r * 2, height: s.r * 2, background: '#fff', opacity: s.o }}
            animate={{ opacity: [s.o * 0.2, s.o, s.o * 0.2] }}
            transition={{ duration: s.d, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          />
        ))}

        {/* Circuit lines */}
        <CircuitLines />

        {/* Scan line */}
        <ScanLine />

        {/* Radial glows */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px]"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(30px)' }} />
        <div className="absolute top-1/2 left-0 w-64 h-64 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 right-0 w-64 h-64 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)' }} />

        {/* Grid overlay */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Top hero bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="pt-16 pb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.04)' }}
        >
          {/* Left: Brand */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group mb-4 block"
            >
              <div className="flex items-baseline gap-1">
                <motion.span
                  className="font-display font-black"
                  style={{
                    fontSize: '3.5rem',
                    background: 'linear-gradient(135deg, #00D4FF 0%, #8B5CF6 50%, #EC4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1,
                  }}
                  animate={{
                    filter: [
                      'drop-shadow(0 0 8px rgba(0,212,255,0.5))',
                      'drop-shadow(0 0 20px rgba(139,92,246,0.6))',
                      'drop-shadow(0 0 8px rgba(236,72,153,0.5))',
                      'drop-shadow(0 0 8px rgba(0,212,255,0.5))',
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >SM</motion.span>
                <span className="font-mono text-base" style={{ color: 'rgba(100,116,139,0.4)' }}>.dev</span>
              </div>
              <div className="font-mono text-xs tracking-[0.3em] uppercase mt-1"
                style={{ color: 'rgba(0,212,255,0.5)' }}>
                Backend Engineer
              </div>
            </button>

            <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.6)', maxWidth: 300 }}>
              Architecting large-scale enterprise systems with Java, Spring Boot &amp; GCP.
              Turning complex problems into elegant, scalable solutions.
            </p>
          </div>

          {/* Right: Status + CTA */}
          <div className="flex flex-col items-start lg:items-end gap-4">
            {/* Availability badge */}
            <motion.div
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border"
              style={{
                background: 'rgba(16,185,129,0.06)',
                borderColor: 'rgba(16,185,129,0.2)',
                boxShadow: '0 0 30px rgba(16,185,129,0.08)',
              }}
              animate={{ boxShadow: ['0 0 20px rgba(16,185,129,0.06)', '0 0 40px rgba(16,185,129,0.12)', '0 0 20px rgba(16,185,129,0.06)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <StatusPip />
              <div>
                <div className="text-xs font-mono font-bold" style={{ color: '#10B981' }}>OPEN TO WORK</div>
                <div className="text-xs" style={{ color: 'rgba(100,116,139,0.7)' }}>Remote · Bangalore</div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.a
              href="mailto:sakthi130597@gmail.com"
              className="relative px-6 py-2.5 rounded-xl font-mono font-bold text-sm overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(139,92,246,0.15))',
                border: '1px solid rgba(0,212,255,0.3)',
                color: '#00D4FF',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.5 }}
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent)' }}
              />
              hire@me →
            </motion.a>
          </div>
        </motion.div>

        {/* Middle: 4-column grid */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.5fr_1fr_1fr_1.8fr] gap-10">

          {/* Socials column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-xs uppercase tracking-widest mb-5 font-bold flex items-center gap-2" style={{ color: 'rgba(100,116,139,0.5)' }}>
              <span className="w-4 h-px inline-block" style={{ background: '#00D4FF' }} />
              Connect With Me
            </p>
            <div className="flex flex-col gap-2">
              {SOCIALS.map((s, i) => <SocialCard key={s.label} s={s} i={i} inView={inView} />)}
            </div>
          </motion.div>

          {/* Nav columns */}
          {NAV_COLS.map((col, ci) => (
            <motion.div key={col.heading}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + ci * 0.1, duration: 0.7 }}
            >
              <p className="font-mono text-xs uppercase tracking-widest mb-5 font-bold flex items-center gap-2"
                style={{ color: col.color }}>
                <span className="w-4 h-px inline-block" style={{ background: col.color }} />
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((link, li) => (
                  <li key={link.label}>
                    <motion.button
                      onClick={() => scrollTo(link.href)}
                      className="text-sm flex items-center gap-2 group"
                      style={{ color: 'rgba(100,116,139,0.7)' }}
                      whileHover={{ x: 4 }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(100,116,139,0.7)' }}
                    >
                      <motion.span
                        className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: col.color }}
                      >▸</motion.span>
                      {link.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Tech stack column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <p className="font-mono text-xs uppercase tracking-widest mb-5 font-bold flex items-center gap-2"
              style={{ color: '#EC4899' }}>
              <span className="w-4 h-px inline-block" style={{ background: '#EC4899' }} />
              Built With
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {STACK.map((tech, i) => (
                <motion.span key={tech.label}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.06, type: 'spring' }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="text-xs px-3 py-1.5 rounded-full font-mono cursor-default border"
                  style={{
                    background: `${tech.color}0d`,
                    borderColor: `${tech.color}25`,
                    color: tech.color,
                  }}
                >{tech.label}</motion.span>
              ))}
            </div>

            {/* Location card */}
            <motion.div
              className="p-4 rounded-2xl border relative overflow-hidden"
              style={{ background: 'rgba(245,158,11,0.05)', borderColor: 'rgba(245,158,11,0.15)' }}
              whileHover={{ borderColor: 'rgba(245,158,11,0.3)', boxShadow: '0 0 20px rgba(245,158,11,0.08)' }}
            >
              <div className="absolute top-2 right-3 font-mono text-xs opacity-20" style={{ color: '#F59E0B' }}>
                28.6°N · 77.2°E
              </div>
              <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: '#F59E0B' }}>Location</p>
              <p className="text-sm text-white flex items-center gap-2 font-medium">
                <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>📍</motion.span>
                Bangalore, India
              </p>
              <p className="text-xs mt-1" style={{ color: 'rgba(100,116,139,0.5)' }}>
                Remote · Worldwide Available
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Terminal quote strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="py-5 px-6 rounded-2xl border mb-8 relative overflow-hidden"
          style={{
            background: 'rgba(0,0,0,0.4)',
            borderColor: 'rgba(0,212,255,0.1)',
          }}
        >
          <div className="absolute top-3 left-5 flex items-center gap-1.5">
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div className="font-mono text-xs text-center pt-1" style={{ color: 'rgba(100,116,139,0.6)' }}>
            <span style={{ color: '#00D4FF' }}>❯ </span>
            <span style={{ color: '#8B5CF6' }}>sakthivel</span>
            <span style={{ color: 'rgba(100,116,139,0.4)' }}>@world</span>
            <span style={{ color: '#00D4FF' }}>:~$ </span>
            <motion.span
              style={{ color: '#e2e8f0' }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              echo "Build systems that scale. Write code that matters. Be the engineer who ships."
            </motion.span>
            <motion.span
              className="inline-block w-2 h-3.5 ml-1 align-middle"
              style={{ background: '#00D4FF' }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="pb-8 relative"
        >
          {/* Top line */}
          <motion.div
            className="h-px mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.15), rgba(139,92,246,0.25), rgba(236,72,153,0.15), transparent)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: 'rgba(100,116,139,0.5)' }}>
            <span className="font-mono flex items-center gap-2">
              <span style={{ color: '#00D4FF' }}>{'<'}</span>
              Crafted by
              <span className="font-bold" style={{ color: '#e2e8f0' }}>Sakthivel Madhu</span>
              <span style={{ color: '#00D4FF' }}>{'/>'}</span>
            </span>

            <div className="flex items-center gap-3">
              {['#00D4FF', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'].map((c, i) => (
                <motion.div key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: c }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>

            <span className="font-mono">
              © {new Date().getFullYear()} · All rights reserved
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
