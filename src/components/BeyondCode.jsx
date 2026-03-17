import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  currentlyLearning,
  onTheWay,
  funFacts,
  hobbies,
  philosophy,
} from '../data/portfolio'

// ─────────────────────────────────────────────────────────────────────────────
// LIVE HOBBY ANIMATIONS
// ─────────────────────────────────────────────────────────────────────────────

function SwimmingAnim({ active }) {
  return (
    <div style={{ position: 'relative', height: 44, overflow: 'hidden', borderRadius: 8 }}>
      <svg viewBox="0 0 200 44" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <motion.path
          d="M-75,22 C-50,14 -25,30 0,22 C25,14 50,30 75,22 C100,14 125,30 150,22 C175,14 200,30 225,22 C250,14 275,30 300,22"
          fill="none" stroke="rgba(0,212,255,0.55)" strokeWidth="2.5"
          animate={active ? { x: [0, 75] } : { x: 0 }}
          transition={{ duration: 1.2, repeat: active ? Infinity : 0, ease: 'linear' }}
        />
        <motion.path
          d="M-75,30 C-50,22 -25,38 0,30 C25,22 50,38 75,30 C100,22 125,38 150,30 C175,22 200,38 225,30 C250,22 275,38 300,30"
          fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1.5"
          animate={active ? { x: [0, 50] } : { x: 0 }}
          transition={{ duration: 1.8, repeat: active ? Infinity : 0, ease: 'linear' }}
        />
      </svg>
      {/* Swimmer */}
      <motion.div
        style={{ position: 'absolute', top: '18%', fontSize: 18, zIndex: 2 }}
        animate={active ? { x: [10, 155, 10], y: [0, -4, 0, 3, 0] } : { x: 10, y: 0 }}
        transition={{
          x: { duration: 2.5, repeat: Infinity, ease: 'linear' },
          y: { duration: 0.7, repeat: Infinity, ease: 'easeInOut' },
        }}
      >🏊</motion.div>
    </div>
  )
}

function DrivingAnim({ active }) {
  return (
    <div style={{ position: 'relative', height: 44, overflow: 'hidden', borderRadius: 8 }}>
      {/* Road */}
      <div style={{ position: 'absolute', top: '65%', left: 0, right: 0, height: 2, background: 'rgba(139,92,246,0.25)' }} />
      {/* Moving center dashes */}
      <motion.div
        style={{ position: 'absolute', top: '65%', display: 'flex', gap: 10, transform: 'translateY(-50%)' }}
        animate={active ? { x: [-60, 220] } : { x: -60 }}
        transition={{ duration: 1.2, repeat: active ? Infinity : 0, ease: 'linear' }}
      >
        {Array(8).fill(0).map((_, i) => (
          <div key={i} style={{ width: 18, height: 2, background: 'rgba(139,92,246,0.6)', flexShrink: 0 }} />
        ))}
      </motion.div>
      {/* Car */}
      <motion.div
        style={{ position: 'absolute', top: '8%', fontSize: 22, zIndex: 2 }}
        animate={active ? { x: [0, 155, 0] } : { x: 60 }}
        transition={{ duration: 3.5, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
      >🚗</motion.div>
    </div>
  )
}

function ReadingAnim({ active }) {
  return (
    <div style={{ position: 'relative', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: 80, height: 36, perspective: 200 }}>
        {/* Spine */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 3, height: '100%', background: '#F59E0B', borderRadius: 2 }} />
        {/* Left page */}
        <motion.div
          style={{
            position: 'absolute', top: 0, right: '50%', width: '48%', height: '100%',
            background: 'linear-gradient(135deg,rgba(245,158,11,0.2),rgba(245,158,11,0.1))',
            border: '1px solid rgba(245,158,11,0.35)', borderRadius: '4px 0 0 4px',
            transformOrigin: 'right center',
          }}
          animate={active ? { rotateY: [0, -20, 0] } : { rotateY: 0 }}
          transition={{ duration: 2.5, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
        >
          {[12, 20, 28].map(y => (
            <div key={y} style={{ position: 'absolute', left: 3, right: 5, top: y, height: 1.5, background: 'rgba(245,158,11,0.3)', borderRadius: 1 }} />
          ))}
        </motion.div>
        {/* Right page */}
        <motion.div
          style={{
            position: 'absolute', top: 0, left: '50%', width: '48%', height: '100%',
            background: 'linear-gradient(135deg,rgba(245,158,11,0.25),rgba(245,158,11,0.12))',
            border: '1px solid rgba(245,158,11,0.4)', borderRadius: '0 4px 4px 0',
            transformOrigin: 'left center',
          }}
          animate={active ? { rotateY: [0, 25, 0] } : { rotateY: 0 }}
          transition={{ duration: 2.5, repeat: active ? Infinity : 0, ease: 'easeInOut', delay: 0.3 }}
        >
          {[12, 20, 28].map(y => (
            <div key={y} style={{ position: 'absolute', left: 5, right: 3, top: y, height: 1.5, background: 'rgba(245,158,11,0.3)', borderRadius: 1 }} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function CookingAnim({ active }) {
  const steams = [
    { x: '30%', delay: 0, color: '#10B981' },
    { x: '50%', delay: 0.5, color: '#10B98199' },
    { x: '70%', delay: 0.25, color: '#10B981' },
  ]
  return (
    <div style={{ position: 'relative', height: 44, overflow: 'hidden' }}>
      {/* Pan */}
      <div style={{ position: 'absolute', bottom: 2, left: '30%', right: '30%', height: 7, background: 'rgba(16,185,129,0.3)', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '0 0 6px 6px' }} />
      {/* Steam wisps */}
      {steams.map((s, i) => (
        <motion.div key={i}
          style={{
            position: 'absolute', bottom: 10, left: s.x,
            width: 5, borderRadius: 3,
            background: `linear-gradient(to top, ${s.color}, transparent)`,
          }}
          animate={active ? {
            height: [4, 22, 4],
            opacity: [0, 0.85, 0],
            y: [0, -14, -26],
            x: [0, i % 2 === 0 ? 4 : -4, 0],
          } : { height: 4, opacity: 0 }}
          transition={{ duration: 1.6, repeat: active ? Infinity : 0, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
      <div style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)', fontSize: 16 }}>🍳</div>
    </div>
  )
}

function ExploreAnim({ active }) {
  return (
    <div style={{ position: 'relative', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {[0, 1, 2].map(i => (
        <motion.div key={i}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            border: '1.5px solid rgba(0,212,255,0.7)',
          }}
          animate={active ? {
            width: [8, 70], height: [8, 70],
            opacity: [0.9, 0],
          } : { width: 8, height: 8, opacity: 0 }}
          transition={{ duration: 2, repeat: active ? Infinity : 0, ease: 'easeOut', delay: i * 0.65 }}
        />
      ))}
      <motion.div
        style={{ fontSize: 20, zIndex: 2, position: 'relative' }}
        animate={active ? { y: [0, -5, 0] } : { y: 0 }}
        transition={{ duration: 1.5, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
      >📍</motion.div>
    </div>
  )
}

function LearningAnim({ active }) {
  return (
    <div style={{ position: 'relative', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Glow ring */}
      <motion.div style={{
        position: 'absolute', borderRadius: '50%',
        border: '2px solid rgba(139,92,246,0.6)',
      }}
        animate={active ? { width: [20, 55], height: [20, 55], opacity: [0.8, 0] } : { width: 20, height: 20, opacity: 0 }}
        transition={{ duration: 1.5, repeat: active ? Infinity : 0, ease: 'easeOut' }}
      />
      <motion.div
        style={{ fontSize: 24, position: 'relative', zIndex: 2 }}
        animate={active ? {
          filter: ['drop-shadow(0 0 2px #8B5CF6)', 'drop-shadow(0 0 16px #8B5CF6)', 'drop-shadow(0 0 2px #8B5CF6)'],
          rotate: [0, 10, 0, -10, 0],
        } : {}}
        transition={{ duration: 2, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
      >💡</motion.div>
    </div>
  )
}

const HOBBY_ANIMS = {
  'Explore New Places': ExploreAnim,
  'Driving': DrivingAnim,
  'Swimming': SwimmingAnim,
  'Reading Books': ReadingAnim,
  'Cooking': CookingAnim,
  'Learn Something New': LearningAnim,
}

// ─────────────────────────────────────────────────────────────────────────────
// HOBBY CARD
// ─────────────────────────────────────────────────────────────────────────────
function HobbyCard({ hobby, inView, i }) {
  const [hovered, setHovered] = useState(false)
  const AnimComp = HOBBY_ANIMS[hobby.name]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.05 + i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col p-4 rounded-2xl border cursor-default"
      style={{
        background: 'rgba(255,255,255,0.02)',
        borderColor: `${hobby.color}22`,
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => {
        setHovered(true)
        e.currentTarget.style.borderColor = `${hobby.color}55`
        e.currentTarget.style.background = `${hobby.color}0a`
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.35), 0 0 25px ${hobby.color}14`
      }}
      onMouseLeave={e => {
        setHovered(false)
        e.currentTarget.style.borderColor = `${hobby.color}22`
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = ''
      }}
    >
      {/* Live animation area */}
      <div className="mb-2" style={{ minHeight: 44 }}>
        {AnimComp ? <AnimComp active={hovered} /> : (
          <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
            {hobby.icon}
          </div>
        )}
      </div>
      <div className="font-bold text-white text-sm text-center mb-1">{hobby.name}</div>
      <div className="text-xs leading-relaxed text-center" style={{ color: 'rgba(100,116,139,0.7)' }}>{hobby.desc}</div>
      {/* Bottom accent line */}
      <motion.div
        style={{ height: 2, borderRadius: 1, background: `linear-gradient(90deg, transparent, ${hobby.color}, transparent)`, marginTop: 10 }}
        animate={hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CURRENTLY LEARNING
// ─────────────────────────────────────────────────────────────────────────────
function LearningBar({ item, inView, i }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
      className="rounded-xl px-4 py-3 border transition-all duration-200 cursor-default"
      style={{
        background: hovered ? `${item.color}0c` : 'rgba(255,255,255,0.02)',
        borderColor: hovered ? `${item.color}35` : `${item.color}15`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <motion.span className="text-base"
            animate={hovered ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.4 }}
          >{item.icon}</motion.span>
          <span className="text-sm font-medium text-white">{item.label}</span>
        </div>
        <span className="font-mono text-xs font-bold" style={{ color: item.color }}>{item.progress}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${item.progress}%` } : {}}
          transition={{ delay: 0.3 + i * 0.08, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}bb)` }}
        >
          {/* Shimmer sweep */}
          <motion.div
            style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 1.5 + i * 0.3, ease: 'linear' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ON THE WAY
// ─────────────────────────────────────────────────────────────────────────────
function OTWCard({ item, inView, i }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.1 + i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-4 border flex items-start gap-4 cursor-default"
      style={{
        background: hovered ? `${item.color}0a` : 'rgba(255,255,255,0.025)',
        borderColor: hovered ? `${item.color}45` : `${item.color}20`,
        transition: 'all 0.25s ease',
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.35), 0 0 20px ${item.color}10` : '',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
        animate={hovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.5 }}
      >{item.icon}</motion.div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-white text-sm">{item.title}</span>
          <motion.span
            className="text-xs font-mono px-1.5 py-0.5 rounded-full"
            style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}25` }}
            animate={hovered ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 0.4 }}
          >OTW</motion.span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: 'rgba(148,163,184,0.65)' }}>{item.desc}</p>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FUN FACT
// ─────────────────────────────────────────────────────────────────────────────
const FACT_DIRECTIONS = [
  { x: -30, y: 0 }, { x: 30, y: 0 }, { x: 0, y: -30 },
  { x: -20, y: 20 }, { x: 20, y: -20 }, { x: 0, y: 30 },
]
function FunFactCard({ item, inView, i }) {
  const [hovered, setHovered] = useState(false)
  const dir = FACT_DIRECTIONS[i % FACT_DIRECTIONS.length]
  return (
    <motion.div
      initial={{ opacity: 0, x: dir.x, y: dir.y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ delay: 0.08 + i * 0.09, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-3 p-4 rounded-2xl border cursor-default relative overflow-hidden"
      style={{
        background: hovered ? `${item.color}10` : `${item.color}07`,
        borderColor: hovered ? `${item.color}45` : `${item.color}20`,
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow corner */}
      <motion.div style={{
        position: 'absolute', top: -20, right: -20, width: 60, height: 60, borderRadius: '50%',
        background: `radial-gradient(circle, ${item.color}25, transparent)`,
        pointerEvents: 'none',
      }}
        animate={hovered ? { scale: 2, opacity: 1 } : { scale: 1, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
      <motion.span
        className="text-xl flex-shrink-0 mt-0.5"
        animate={hovered ? { scale: [1, 1.4, 1], rotate: [0, 15, 0] } : {}}
        transition={{ duration: 0.5 }}
      >{item.icon}</motion.span>
      <p className="text-sm leading-relaxed relative z-10" style={{ color: 'rgba(148,163,184,0.85)' }}>{item.fact}</p>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PHILOSOPHY & DRIVE
// ─────────────────────────────────────────────────────────────────────────────
function PhilosophyCard({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl p-8 md:p-10 border overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(139,92,246,0.07) 50%, rgba(236,72,153,0.04) 100%)',
        borderColor: 'rgba(139,92,246,0.3)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
      }}
    >
      {/* Animated corner glows */}
      <motion.div className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)', filter: 'blur(30px)', transform: 'translate(-30%,-30%)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)', filter: 'blur(30px)', transform: 'translate(30%,30%)' }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
        {/* Quote */}
        <div className="flex-1">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#8B5CF6' }}>Philosophy</p>
          <motion.blockquote
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl font-display font-bold text-white mb-3 leading-tight"
          >
            "{philosophy.quote}"
          </motion.blockquote>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.65)' }}>{philosophy.belief}</p>
        </div>

        <div className="hidden md:block w-px self-stretch" style={{ background: 'linear-gradient(to bottom, transparent, rgba(139,92,246,0.4), transparent)' }} />
        <div className="md:hidden h-px w-full" style={{ background: 'rgba(139,92,246,0.3)' }} />

        {/* Drive */}
        <div className="flex-1">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#F59E0B' }}>What Drives Me</p>
          <div className="flex items-start gap-3">
            <motion.div
              className="text-3xl flex-shrink-0"
              animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >🎯</motion.div>
            <p className="text-xl md:text-2xl font-display font-bold leading-tight" style={{
              background: 'linear-gradient(135deg, #F59E0B, #EC4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{philosophy.drive}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// PARALLAX SECTION ROW
// ─────────────────────────────────────────────────────────────────────────────
function ParallaxRow({ children, speed = 0.15, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 60}px`, `-${speed * 60}px`])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

export default function BeyondCode() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Parallax for background blobs
  const blob1Y = useTransform(scrollYProgress, [0, 1], ['0px', '-120px'])
  const blob2Y = useTransform(scrollYProgress, [0, 1], ['0px', '80px'])
  const blob3Y = useTransform(scrollYProgress, [0, 1], ['-40px', '100px'])
  const headingScale = useTransform(scrollYProgress, [0, 0.25], [0.9, 1])
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0.6, 1])

  return (
    <section id="beyond" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Parallax background blobs */}
      <motion.div className="absolute pointer-events-none" style={{ y: blob1Y, top: '5%', left: '-8%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,212,255,0.06) 0%,transparent 70%)', filter: 'blur(60px)' }} />
      <motion.div className="absolute pointer-events-none" style={{ y: blob2Y, top: '40%', right: '-5%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 70%)', filter: 'blur(50px)' }} />
      <motion.div className="absolute pointer-events-none" style={{ y: blob3Y, bottom: '5%', left: '30%', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(236,72,153,0.05) 0%,transparent 70%)', filter: 'blur(40px)' }} />

      {/* Floating depth dots */}
      {[
        { x: '8%', top: '18%', color: '#00D4FF', size: 4, speed: [0, 1], range: ['0px', '-80px'] },
        { x: '92%', top: '30%', color: '#8B5CF6', size: 3, speed: [0, 1], range: ['0px', '-50px'] },
        { x: '15%', top: '55%', color: '#EC4899', size: 5, speed: [0, 1], range: ['20px', '-60px'] },
        { x: '88%', top: '70%', color: '#F59E0B', size: 3, speed: [0, 1], range: ['-10px', '-90px'] },
      ].map((dot, i) => {
        const dotY = useTransform(scrollYProgress, dot.speed, dot.range)
        return (
          <motion.div key={i}
            className="absolute pointer-events-none rounded-full"
            style={{ left: dot.x, top: dot.top, width: dot.size, height: dot.size, background: dot.color, opacity: 0.35, y: dotY, boxShadow: `0 0 ${dot.size * 4}px ${dot.color}` }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
          />
        )
      })}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header with zoom parallax */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ scale: headingScale, opacity: headingOpacity }}
          className="text-center mb-20"
        >
          <p className="font-mono text-sm mb-3 tracking-widest uppercase" style={{ color: '#EC4899' }}>
            The Human Behind the Code
          </p>
          <h2 className="section-title text-white">
            Beyond the{' '}
            <span style={{ background: 'linear-gradient(135deg,#EC4899,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Code
            </span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm" style={{ color: 'rgba(100,116,139,0.7)' }}>
            What I'm learning, where I'm heading, what keeps me going — the full picture
          </p>
        </motion.div>

        {/* Row 1: Learning + OTW — left slides in, right slides in from other side */}
        <ParallaxRow speed={0.08} className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          <div>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0, duration: 0.7 }} className="mb-6">
              <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: '#00D4FF' }}>Always Growing</p>
              <h3 className="text-2xl font-display font-bold text-white">What I'm Learning</h3>
            </motion.div>
            <div className="space-y-3">
              {currentlyLearning.map((item, i) => (
                <LearningBar key={item.label} item={item} inView={inView} i={i} />
              ))}
            </div>
          </div>
          <div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.05, duration: 0.7 }} className="mb-6">
              <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: '#F59E0B' }}>Next Destinations</p>
              <h3 className="text-2xl font-display font-bold text-white">On The Way</h3>
            </motion.div>
            <div className="space-y-3">
              {onTheWay.map((item, i) => (
                <OTWCard key={item.title} item={item} inView={inView} i={i} />
              ))}
            </div>
          </div>
        </ParallaxRow>

        {/* Row 2: Hobbies — slight zoom in from depth */}
        <ParallaxRow speed={0.12} className="mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: '#8B5CF6' }}>Life Outside the Terminal</p>
            <h3 className="text-2xl font-display font-bold text-white">
              Hobbies & Interests{' '}
              <span className="text-sm font-normal font-mono" style={{ color: 'rgba(100,116,139,0.6)' }}>
                — hover for live preview
              </span>
            </h3>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {hobbies.map((hobby, i) => (
              <HobbyCard key={hobby.name} hobby={hobby} inView={inView} i={i} />
            ))}
          </div>
        </ParallaxRow>

        {/* Row 3: Fun Facts — stagger from different depths */}
        <ParallaxRow speed={0.1} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6"
          >
            <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: '#EC4899' }}>Random Things About Me</p>
            <h3 className="text-2xl font-display font-bold text-white">Fun Facts</h3>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {funFacts.map((item, i) => (
              <FunFactCard key={i} item={item} inView={inView} i={i} />
            ))}
          </div>
        </ParallaxRow>

        {/* Row 4: Philosophy — zooms in from far */}
        <ParallaxRow speed={0.06}>
          <PhilosophyCard inView={inView} />
        </ParallaxRow>
      </div>
    </section>
  )
}
