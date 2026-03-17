import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolio'

const TITLES = ['Backend Engineer', 'System Architect', 'Cloud Engineer', 'API Specialist']

function TypedTitle() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const target = TITLES[index]
    let t
    if (!deleting && displayed.length < target.length)
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80)
    else if (!deleting && displayed.length === target.length)
      t = setTimeout(() => setDeleting(true), 2200)
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    else { setDeleting(false); setIndex(i => (i + 1) % TITLES.length) }
    return () => clearTimeout(t)
  }, [displayed, deleting, index])
  return (
    <span className="font-display" style={{ color: '#00D4FF' }}>
      {displayed}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ color: '#00D4FF' }}>|</motion.span>
    </span>
  )
}

// Name with entrance animation + continuous slow color wave
const NAME_COLORS = ['#ffffff', '#00D4FF', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#ffffff']
function AnimatedName({ name, baseDelay = 0 }) {
  return (
    <span aria-label={name} className="inline-flex flex-wrap justify-center md:justify-start">
      {name.split('').map((char, i) => (
        <motion.span key={i}
          initial={{ opacity: 0, y: 80, rotateX: -90, scale: 0.5, color: '#ffffff' }}
          animate={{
            opacity: 1, y: 0, rotateX: 0, scale: 1,
            color: NAME_COLORS,
          }}
          transition={{
            opacity: { duration: 0.7, delay: baseDelay + i * 0.05, ease: [0.23, 1, 0.32, 1] },
            y:       { duration: 0.7, delay: baseDelay + i * 0.05, ease: [0.23, 1, 0.32, 1] },
            rotateX: { duration: 0.7, delay: baseDelay + i * 0.05, ease: [0.23, 1, 0.32, 1] },
            scale:   { duration: 0.7, delay: baseDelay + i * 0.05, ease: [0.23, 1, 0.32, 1] },
            color: {
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: baseDelay + 1.5 + i * 0.35,
              times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1],
            },
          }}
          className="inline-block cursor-default"
          style={{ transformOrigin: 'bottom center' }}
        >{char === ' ' ? '\u00A0' : char}</motion.span>
      ))}
    </span>
  )
}

function ZoomBackground() {
  return (
    <motion.div
      initial={{ scale: 1.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-0"
    >
      <div className="absolute inset-0" style={{ background: '#0a0a0f' }} />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,212,255,0.22) 1px, transparent 1px)',
        backgroundSize: '40px 40px', opacity: 0.35,
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.07) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)',
      }} />
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: '900px', height: '900px' }}
      >
        {[1, 1.5, 2.1].map((s, i) => (
          <motion.div key={i}
            animate={{ scale: [s, s * 1.02, s], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 4 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
            className="absolute top-1/2 left-1/2 rounded-full border"
            style={{ width: '400px', height: '400px', marginLeft: '-200px', marginTop: '-200px', borderColor: i % 2 === 0 ? 'rgba(0,212,255,0.15)' : 'rgba(139,92,246,0.12)' }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

// ── Unique floating badge ─────────────────────────────────────────────────────
function Badge({ children, color, style, delay, animY = [-5, 5, -5], duration = 4 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="absolute"
      style={style}
    >
      <motion.div
        animate={{ y: animY }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap text-xs font-mono font-semibold"
        style={{ background: 'rgba(10,10,15,0.92)', border: `1px solid ${color}40`, color, backdropFilter: 'blur(8px)', boxShadow: `0 4px 20px ${color}20` }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// ── Profile with orbital rings + unique badges ────────────────────────────────
function ProfileSection() {
  return (
    <div className="relative flex-shrink-0 flex items-center justify-center" style={{ width: '340px', height: '340px' }}>
      {/* Ring 1 — cyan fast */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full" style={{ inset: 0, border: '1.5px solid rgba(0,212,255,0.3)', borderTopColor: '#00D4FF', borderRightColor: 'transparent' }}
      />
      {/* Ring 2 — purple reverse */}
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full" style={{ inset: '-14px', border: '1px dashed rgba(139,92,246,0.25)', borderTopColor: 'rgba(139,92,246,0.6)' }}
      />
      {/* Ring 3 — pink slowest */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full" style={{ inset: '-28px', border: '1px solid rgba(236,72,153,0.1)', borderBottomColor: 'rgba(236,72,153,0.4)' }}
      />

      {/* Orbiting dot on ring 1 */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 rounded-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
          style={{ background: '#00D4FF', boxShadow: '0 0 10px #00D4FF, 0 0 20px #00D4FF' }} />
      </motion.div>
      {/* Orbiting dot on ring 2 */}
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="absolute rounded-full" style={{ inset: '-14px' }}>
        <div className="absolute bottom-0 right-1/4 w-2 h-2 rounded-full" style={{ background: '#8B5CF6', boxShadow: '0 0 8px #8B5CF6' }} />
      </motion.div>

      {/* Photo */}
      <div className="relative rounded-full overflow-hidden z-10" style={{ width: '230px', height: '230px', border: '2px solid rgba(0,212,255,0.25)', boxShadow: '0 0 50px rgba(0,212,255,0.15)' }}>
        <img src={personalInfo.photo} alt="Sakthivel Madhu" className="w-full h-full object-cover object-top"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
        />
        <div className="w-full h-full hidden items-center justify-center font-display font-black text-5xl"
          style={{ background: 'linear-gradient(135deg,rgba(0,212,255,0.1),rgba(139,92,246,0.1))', color: '#00D4FF' }}>SM</div>
      </div>

      {/* ── UNIQUE FLOATING BADGES ── */}

      {/* 🏆 Employee of the Quarter */}
      <Badge color="#F59E0B" delay={2.0} duration={4} animY={[-4, 4, -4]}
        style={{ top: '-10px', left: '-90px' }}
      >
        <span>🏆</span>
        <span>Emp. of Quarter</span>
      </Badge>

      {/* 🤖 Doc-AI */}
      <Badge color="#EC4899" delay={2.2} duration={5} animY={[4, -4, 4]}
        style={{ top: '20px', right: '-100px' }}
      >
        <span>🤖</span>
        <span>Doc-AI Expert</span>
      </Badge>

      {/* 92% Automation */}
      <Badge color="#10B981" delay={2.4} duration={3.5} animY={[-3, 5, -3]}
        style={{ bottom: '80px', left: '-80px' }}
      >
        <span>⚡</span>
        <span>92% Automation</span>
      </Badge>

      {/* ☁️ GCP */}
      <Badge color="#00D4FF" delay={2.6} duration={4.5} animY={[5, -3, 5]}
        style={{ bottom: '80px', right: '-85px' }}
      >
        <span>☁️</span>
        <span>GCP Cloud Eng</span>
      </Badge>

      {/* Open to work */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap"
          style={{ background: 'rgba(10,10,15,0.95)', border: '1px solid rgba(16,185,129,0.35)' }}
        >
          <motion.span animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#10B981' }} />
          <span className="text-xs font-mono font-semibold" style={{ color: '#10B981' }}>Open to Work</span>
        </motion.div>
      </div>
    </div>
  )
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])
  const px = (mousePos.x - 0.5) * 40
  const py = (mousePos.y - 0.5) * 25

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ZoomBackground />

      {/* Parallax blobs */}
      <motion.div animate={{ x: px * 1.8, y: py * 1.8 }} transition={{ type: 'spring', stiffness: 25, damping: 20 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <motion.div animate={{ y: [-30, 30, -30] }} transition={{ duration: 9, repeat: Infinity }}
          className="absolute" style={{ top: '15%', right: '10%', width: '500px', height: '500px', borderRadius: '50%', opacity: 0.1, background: 'radial-gradient(circle,#8B5CF6,transparent)', filter: 'blur(40px)' }} />
        <motion.div animate={{ y: [25, -25, 25] }} transition={{ duration: 11, repeat: Infinity, delay: 2 }}
          className="absolute" style={{ bottom: '20%', left: '5%', width: '400px', height: '400px', borderRadius: '50%', opacity: 0.08, background: 'radial-gradient(circle,#00D4FF,transparent)', filter: 'blur(50px)' }} />
      </motion.div>

      {/* Content */}
      <motion.div animate={{ x: px * 0.3, y: py * 0.3 }} transition={{ type: 'spring', stiffness: 25, damping: 20 }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-0 w-full"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border"
              style={{ background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.25)' }}
            >
              <motion.span animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
              <span className="text-xs font-medium font-mono" style={{ color: '#10B981' }}>Available for Opportunities</span>
            </motion.div>

            <h1 className="font-display font-black text-white leading-[0.95] mb-5" style={{ fontSize: 'clamp(3.5rem,8vw,6rem)', perspective: '600px' }}>
              <AnimatedName name="Sakthivel" baseDelay={0.5} />
              <br />
              <AnimatedName name="Madhu" baseDelay={1.0} />
            </h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }}
              className="text-xl md:text-2xl font-display font-medium text-slate-300 mb-6 h-9"
            >
              <TypedTitle />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0 }}
              className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed mb-8"
            >
              3+ years building fault-tolerant enterprise platforms —
              <span style={{ color: '#00D4FF' }}> ERP, HRMS, Finance</span> — with
              <span style={{ color: '#8B5CF6' }}> Java 17, Spring Boot &amp; GCP</span>.
              Delivered <span style={{ color: '#10B981' }}>92% automation &amp; 80% faster onboarding</span>.
            </motion.p>

            {/* Key highlights row */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1 }}
              className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start"
            >
              {[
                { icon: '🏆', label: 'Employee of Quarter', color: '#F59E0B' },
                { icon: '🤖', label: 'Doc-AI Integrated', color: '#EC4899' },
                { icon: '⚡', label: '92% Manual Reduced', color: '#10B981' },
                { icon: '☁️', label: 'GCP Certified Exp', color: '#00D4FF' },
              ].map((k, i) => (
                <motion.span key={k.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.15 + i * 0.07 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono"
                  style={{ background: `${k.color}10`, border: `1px solid ${k.color}25`, color: k.color }}
                >
                  <span>{k.icon}</span> {k.label}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 }}
              className="flex flex-wrap gap-3 justify-center md:justify-start mb-8"
            >
              <motion.a href="#projects" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 font-bold text-sm rounded-xl text-[#0a0a0f] overflow-hidden"
                style={{ background: 'linear-gradient(135deg,#00D4FF,#8B5CF6)' }}
              ><i className="fas fa-rocket text-xs" /> View Projects</motion.a>

              <motion.a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-3.5 font-bold text-sm rounded-xl"
                style={{ background: 'linear-gradient(135deg,#F59E0B,#EC4899)', color: '#0a0a0f' }}
              >
                <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-white" />
                Hire Me
              </motion.a>

              <motion.a href="https://drive.google.com/file/d/1rLtlLlLSBEiQulypJezq-kmwUfeK5qNW/view?usp=sharing"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-3.5 font-bold text-sm rounded-xl text-white border"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.12)' }}
              ><i className="fas fa-download text-xs" /> Resume</motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              {[
                { href: 'https://github.com/SakthivelMadhu', icon: 'fab fa-github' },
                { href: 'https://www.linkedin.com/in/sakthivel-madhu-864647238/', icon: 'fab fa-linkedin' },
                { href: 'https://leetcode.com/u/sakthi130597/', icon: 'fas fa-code' },
                { href: 'mailto:sakthi130597@gmail.com', icon: 'fas fa-envelope' },
              ].map((s, i) => (
                <motion.a key={i} href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.15 }} whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 border text-sm hover:text-cyan-400 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
                ><i className={s.icon} /></motion.a>
              ))}
            </motion.div>
          </div>

          {/* Profile with badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="hidden md:flex items-center justify-center"
            style={{ minWidth: '340px' }}
          >
            <ProfileSection />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: 'rgba(148,163,184,0.4)' }}>Scroll</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.4, repeat: Infinity }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5 border" style={{ borderColor: 'rgba(100,116,139,0.35)' }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: '#00D4FF' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
