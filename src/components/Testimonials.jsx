import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { testimonials } from '../data/portfolio'

const carouselItems = testimonials

function StarRating({ count = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#F59E0B', fontSize: 13 }}>★</span>
      ))}
    </div>
  )
}

// ─── Featured big card ───────────────────────────────────────────────────────
function FeaturedCard({ item, direction }) {
  const t = item
  return (
    <motion.div
      key={t.name}
      initial={{ opacity: 0, x: direction * 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -80 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${t.color}08, rgba(10,10,15,0.98))`,
        border: `1px solid ${t.color}22`,
        minHeight: 340,
      }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }} />

      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(${t.color}05 1px, transparent 1px), linear-gradient(90deg, ${t.color}05 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* Glow blob */}
      <div className="absolute pointer-events-none"
        style={{ top: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle, ${t.color}14 0%, transparent 70%)`, filter: 'blur(30px)' }} />

      <div className="relative z-10 p-10 flex flex-col justify-between" style={{ minHeight: 340 }}>
        {/* Top row */}
        <div className="flex items-start justify-between mb-6">
          <StarRating count={t.rating} />
          <div className="font-display font-black text-7xl leading-none select-none" style={{ color: `${t.color}12` }}>"</div>
        </div>

        {/* Quote */}
        <blockquote className="text-lg leading-relaxed mb-8 flex-1" style={{ color: 'rgba(226,232,240,0.88)' }}>
          "{t.quote}"
        </blockquote>

        {/* Person footer */}
        <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-lg flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${t.color}30, ${t.color}12)`, border: `2px solid ${t.color}40`, color: t.color }}>
              {t.avatar}
            </div>
            <div>
              <div className="font-display font-bold text-white text-base">{t.name}</div>
              <div className="text-xs font-semibold mt-0.5" style={{ color: t.color }}>{t.role}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(100,116,139,0.6)' }}>@ {t.company}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="px-3 py-1.5 rounded-full text-xs font-mono"
              style={{ background: 'rgba(10,102,194,0.1)', border: '1px solid rgba(10,102,194,0.25)', color: '#0A66C2' }}>
              <i className="fab fa-linkedin mr-1" />LinkedIn
            </div>
            <div className="text-xs font-mono" style={{ color: 'rgba(100,116,139,0.4)' }}>{t.relation}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Marquee strip of mini avatar chips ─────────────────────────────────────
function MarqueeStrip() {
  const doubled = [...testimonials, ...testimonials]
  return (
    <div className="overflow-hidden relative" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
      <motion.div
        className="flex gap-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ width: 'max-content' }}
      >
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full flex-shrink-0"
            style={{ background: `${t.color}10`, border: `1px solid ${t.color}22` }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono"
              style={{ background: `${t.color}25`, color: t.color }}>
              {t.avatar}
            </div>
            <span className="text-xs font-medium text-white whitespace-nowrap">{t.name}</span>
            <span className="text-xs whitespace-nowrap" style={{ color: 'rgba(100,116,139,0.5)' }}>{t.role.split(' ').slice(0, 2).join(' ')}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Sidebar mini-cards (vertical list) ──────────────────────────────────────
function SidebarCards({ items, activeIdx, onSelect }) {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: 380 }}>
      {items.map((item, i) => {
        const color = item.color
        const isActive = i === activeIdx
        return (
          <button key={i} onClick={() => onSelect(i)}
            className="text-left rounded-2xl p-3 transition-all duration-300 flex items-center gap-3"
            style={{
              background: isActive ? `${color}12` : 'rgba(255,255,255,0.02)',
              border: `1px solid ${isActive ? color + '35' : 'rgba(255,255,255,0.06)'}`,
              cursor: 'pointer',
            }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold font-mono flex-shrink-0"
              style={{ background: `${color}22`, color }}>
              {item.avatar}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">{item.name}</div>
              <div className="text-xs truncate mt-0.5" style={{ color: 'rgba(100,116,139,0.55)' }}>
                {item.role}
              </div>
            </div>
            {isActive && (
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 ml-auto" style={{ background: color }} />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeIdx, setActiveIdx] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalRef = useRef(null)

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setActiveIdx(prev => {
        setDirection(1)
        return (prev + 1) % carouselItems.length
      })
    }, 5000)
  }

  useEffect(() => {
    startAutoPlay()
    return () => clearInterval(intervalRef.current)
  }, [])

  const goTo = (idx) => {
    clearInterval(intervalRef.current)
    setDirection(idx > activeIdx ? 1 : -1)
    setActiveIdx(idx)
    startAutoPlay()
  }

  const prev = () => {
    clearInterval(intervalRef.current)
    setDirection(-1)
    setActiveIdx(i => (i - 1 + carouselItems.length) % carouselItems.length)
    startAutoPlay()
  }

  const next = () => {
    clearInterval(intervalRef.current)
    setDirection(1)
    setActiveIdx(i => (i + 1) % carouselItems.length)
    startAutoPlay()
  }

  const activeItem = carouselItems[activeIdx]
  const activeColor = activeItem.color

  return (
    <section id="testimonials" ref={ref} className="py-24 md:py-28 relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute pointer-events-none"
        style={{ top: '15%', left: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,212,255,0.05) 0%,transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute pointer-events-none"
        style={{ bottom: '10%', right: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.05) 0%,transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-sm mb-3 tracking-widest uppercase" style={{ color: '#8B5CF6' }}>
            What Colleagues Say
          </p>
          <h2 className="section-title text-white">
            LinkedIn <span className="gradient-text-cyan">Recommendations</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-sm" style={{ color: 'rgba(100,116,139,0.7)' }}>
            Kind words from {testimonials.length} people I've had the pleasure of building with — and a note on what drives me
          </p>
        </motion.div>

        {/* Marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <MarqueeStrip />
        </motion.div>

        {/* Main carousel layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="grid lg:grid-cols-[1fr_260px] gap-6"
        >
          {/* Featured card */}
          <div>
            {/* Issue header — newsletter feel */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-full font-mono text-xs uppercase tracking-widest"
                  style={{ background: `${activeColor}12`, color: activeColor, border: `1px solid ${activeColor}30` }}>
                  {activeItem.type === 'philosophy' ? 'Editorial' : 'Recommendation'} #{activeIdx + 1} of {carouselItems.length}
                </div>
                {/* Auto-play progress bar */}
                <div className="h-1 rounded-full overflow-hidden" style={{ width: 80, background: 'rgba(255,255,255,0.05)' }}>
                  <motion.div
                    key={activeIdx}
                    className="h-full rounded-full"
                    style={{ background: activeColor }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                  />
                </div>
              </div>
              {/* Prev / Next */}
              <div className="flex items-center gap-2">
                <button onClick={prev}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(148,163,184,0.7)', cursor: 'pointer' }}>
                  <i className="fas fa-chevron-left text-xs" />
                </button>
                <button onClick={next}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(148,163,184,0.7)', cursor: 'pointer' }}>
                  <i className="fas fa-chevron-right text-xs" />
                </button>
              </div>
            </div>

            {/* Card */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence mode="wait" custom={direction}>
                <FeaturedCard key={activeIdx} item={activeItem} direction={direction} />
              </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
              {carouselItems.map((item, i) => {
                const c = item.color
                return (
                  <button key={i} onClick={() => goTo(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIdx ? 20 : 6,
                      height: 6,
                      background: i === activeIdx ? c : 'rgba(255,255,255,0.12)',
                      cursor: 'pointer',
                    }}
                  />
                )
              })}
            </div>
          </div>

          {/* Sidebar — scrollable list */}
          <div className="hidden lg:block">
            <div className="text-xs font-mono uppercase tracking-widest mb-3 px-1" style={{ color: 'rgba(100,116,139,0.5)' }}>
              All Voices
            </div>
            <SidebarCards items={carouselItems} activeIdx={activeIdx} onSelect={goTo} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
