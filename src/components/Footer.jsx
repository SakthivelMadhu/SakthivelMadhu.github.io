import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { personalInfo } from '../data/portfolio'

const SOCIALS = [
  { icon: 'fab fa-github',   href: 'https://github.com/SakthivelMadhu',                          color: '#e2e8f0', label: 'GitHub'   },
  { icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/in/sakthivel-madhu-864647238/',      color: '#0A66C2', label: 'LinkedIn' },
  { icon: 'fas fa-code',     href: 'https://leetcode.com/u/sakthi130597/',                       color: '#FFA116', label: 'LeetCode' },
  { icon: 'fas fa-envelope', href: 'mailto:sakthi130597@gmail.com',                               color: '#00D4FF', label: 'Email'    },
]

const NAV_LINKS = [
  { label: 'About',       href: '#about'        },
  { label: 'Work',        href: '#work'          },
  { label: 'Projects',    href: '#projects'      },
  { label: 'Skills',      href: '#skills'        },
  { label: 'GitHub',      href: '#github'        },
  { label: 'Contact',     href: '#contact'       },
]

// deterministic hash
const dh = (v) => { const s = Math.sin(v) * 43758.5453; return s - Math.floor(s) }
const STARS = Array.from({ length: 80 }, (_, i) => ({
  x: dh(i * 127.1) * 100, y: dh(i * 311.7) * 100,
  r: dh(i * 523.9) * 1.2 + 0.2,
  o: dh(i * 91.3) * 0.35 + 0.08,
  d: dh(i * 47.2) * 4 + 2,
  delay: dh(i * 213.5) * 5,
}))

function SocialIcon({ s, i, inView }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.a
      href={s.href}
      target={s.href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      title={s.label}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.6 + i * 0.08, type: 'spring', stiffness: 220 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={{ y: -6, scale: 1.12 }}
      whileTap={{ scale: 0.93 }}
      className="relative flex flex-col items-center gap-2 group"
    >
      <motion.div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg relative overflow-hidden"
        style={{
          background: hov ? `${s.color}18` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${hov ? s.color + '45' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: hov ? `0 0 30px ${s.color}30, 0 8px 30px rgba(0,0,0,0.4)` : '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
          color: hov ? s.color : 'rgba(148,163,184,0.7)',
        }}
      >
        {/* Shine sweep on hover */}
        {hov && (
          <motion.div
            className="absolute inset-0"
            initial={{ x: '-100%', skewX: -15 }}
            animate={{ x: '200%' }}
            transition={{ duration: 0.5 }}
            style={{ background: `linear-gradient(90deg, transparent, ${s.color}25, transparent)` }}
          />
        )}
        <i className={s.icon} />
      </motion.div>
      <span className="text-xs font-mono transition-colors duration-200"
        style={{ color: hov ? s.color : 'rgba(100,116,139,0.5)' }}>
        {s.label}
      </span>
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
    <footer ref={ref} className="relative overflow-hidden" style={{ background: '#05050a' }}>

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Stars */}
        {STARS.map((s, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r * 2, height: s.r * 2, background: '#fff', opacity: s.o }}
            animate={{ opacity: [s.o * 0.2, s.o, s.o * 0.2] }}
            transition={{ duration: s.d, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          />
        ))}

        {/* Large aurora orbs */}
        <motion.div className="absolute rounded-full"
          style={{ top: '-10%', left: '-5%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 65%)', filter: 'blur(60px)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div className="absolute rounded-full"
          style={{ bottom: '-20%', right: '-10%', width: 800, height: 800, background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)', filter: 'blur(70px)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        <motion.div className="absolute rounded-full"
          style={{ top: '30%', right: '20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />

        {/* Subtle noise grid */}
        <div className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* ── Top glow border ── */}
      <div className="relative h-px overflow-hidden">
        <motion.div className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #00D4FF 20%, #8B5CF6 50%, #EC4899 80%, transparent 100%)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ══════════════════════════════════════════
            HERO CTA ZONE
        ══════════════════════════════════════════ */}
        <div className="pt-20 pb-16 text-center">

          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8"
            style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.2)' }}
          >
            <motion.span className="w-2 h-2 rounded-full"
              style={{ background: '#10B981' }}
              animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-xs font-mono font-bold tracking-widest" style={{ color: '#10B981' }}>
              OPEN TO OPPORTUNITIES · REMOTE WORLDWIDE
            </span>
          </motion.div>

          {/* Big headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <h2 className="font-display font-black leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}>
              <span className="text-white">Let's Build</span>
              <br />
              <motion.span
                style={{
                  background: 'linear-gradient(135deg, #00D4FF 0%, #8B5CF6 40%, #EC4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
                animate={{ filter: ['drop-shadow(0 0 20px rgba(0,212,255,0.3))', 'drop-shadow(0 0 40px rgba(139,92,246,0.4))', 'drop-shadow(0 0 20px rgba(236,72,153,0.3))', 'drop-shadow(0 0 20px rgba(0,212,255,0.3))'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                Something Great.
              </motion.span>
            </h2>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ color: 'rgba(148,163,184,0.65)' }}
          >
            Backend engineer with a passion for clean systems and real impact.
            If you have a problem worth solving — I want to hear about it.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            {/* Primary: email */}
            <motion.a
              href="mailto:sakthi130597@gmail.com"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="relative group px-8 py-4 rounded-2xl font-display font-bold text-base overflow-hidden flex items-center gap-3"
              style={{
                background: 'linear-gradient(135deg, #00D4FF, #8B5CF6)',
                color: '#fff',
                boxShadow: '0 8px 40px rgba(0,212,255,0.3), 0 4px 20px rgba(139,92,246,0.2)',
              }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
              />
              <i className="fas fa-paper-plane text-sm" />
              Say Hello
            </motion.a>

            {/* Secondary: resume */}
            <motion.a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-2xl font-display font-bold text-base flex items-center gap-3"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(226,232,240,0.9)',
              }}
            >
              <i className="fas fa-download text-sm" style={{ color: '#8B5CF6' }} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Email address — big + clickable */}
          <motion.a
            href="mailto:sakthi130597@gmail.com"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45 }}
            whileHover={{ scale: 1.02 }}
            className="inline-block font-mono text-sm md:text-base tracking-wide"
            style={{ color: 'rgba(100,116,139,0.5)', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#00D4FF' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(100,116,139,0.5)' }}
          >
            sakthi130597@gmail.com
          </motion.a>
        </div>

        {/* ══════════════════════════════════════════
            DIVIDER
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-px mb-14"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)', transformOrigin: 'center' }}
        />

        {/* ══════════════════════════════════════════
            SOCIAL ROW
        ══════════════════════════════════════════ */}
        <div className="flex items-center justify-center gap-8 md:gap-12 mb-14">
          {SOCIALS.map((s, i) => (
            <SocialIcon key={s.label} s={s} i={i} inView={inView} />
          ))}
        </div>

        {/* ══════════════════════════════════════════
            DIVIDER
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-px mb-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)', transformOrigin: 'center' }}
        />

        {/* ══════════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="pb-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Logo + tagline */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-baseline gap-1.5 group"
          >
            <motion.span
              className="font-display font-black text-2xl"
              style={{ background: 'linear-gradient(135deg,#00D4FF,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              whileHover={{ scale: 1.05 }}
            >SM</motion.span>
            <span className="font-mono text-xs" style={{ color: 'rgba(100,116,139,0.35)' }}>.dev</span>
            <span className="text-xs font-mono ml-2" style={{ color: 'rgba(100,116,139,0.35)' }}>
              · Backend Engineer · Bangalore
            </span>
          </button>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-xs font-mono transition-colors duration-200"
                style={{ color: 'rgba(100,116,139,0.45)' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(100,116,139,0.45)' }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Copyright */}
          <span className="font-mono text-xs" style={{ color: 'rgba(100,116,139,0.35)' }}>
            © {new Date().getFullYear()} Sakthivel Madhu
          </span>
        </motion.div>

      </div>

      {/* Bottom gradient fade to black */}
      <div className="h-8" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))' }} />
    </footer>
  )
}
