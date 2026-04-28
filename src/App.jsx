import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { useScrollProgress } from './hooks/useScrollProgress'

// Below-fold sections are code-split so the initial JS bundle stays small.
// Each section becomes its own chunk fetched on demand.
const About          = lazy(() => import('./components/About'))
const WorkHistory    = lazy(() => import('./components/WorkHistory'))
const Projects       = lazy(() => import('./components/Projects'))
const Skills         = lazy(() => import('./components/Skills'))
const Achievements   = lazy(() => import('./components/Achievements'))
const GitHubStats    = lazy(() => import('./components/GitHubStats'))
const BeyondCode     = lazy(() => import('./components/BeyondCode'))
const Contact        = lazy(() => import('./components/Contact'))
const Footer         = lazy(() => import('./components/Footer'))
const ImpactNumbers  = lazy(() => import('./components/ImpactNumbers'))
const Testimonials   = lazy(() => import('./components/Testimonials'))
const OpenSource     = lazy(() => import('./components/OpenSource'))
const FloatingResume = lazy(() => import('./components/FloatingResume'))
const LeetCodeStats  = lazy(() => import('./components/LeetCodeStats'))

// Mounts children only when its placeholder scrolls within `rootMargin` of viewport.
// Reserves vertical space via `minHeight` to avoid layout shift.
function LazyMount({ children, minHeight = 400, rootMargin = '400px' }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (show) return
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setShow(true); return }
    const io = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        setShow(true)
        io.disconnect()
      }
    }, { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [show, rootMargin])
  return <div ref={ref} style={{ minHeight: show ? undefined : minHeight }}>{show && children}</div>
}

// Section ID → accent color mapping
const SECTION_COLORS = {
  hero:         '#00D4FF',
  about:        '#8B5CF6',
  work:         '#EC4899',
  projects:     '#F59E0B',
  skills:       '#10B981',
  achievements: '#F59E0B',
  testimonials: '#8B5CF6',
  github:       '#00D4FF',
  beyond:       '#EC4899',
  contact:      '#10B981',
}
const SECTION_IDS = Object.keys(SECTION_COLORS)

function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf = useRef(null)
  const colorRef = useRef('#00D4FF')

  const applyColor = (color) => {
    colorRef.current = color
    if (dotRef.current) {
      dotRef.current.style.background = color
      dotRef.current.style.boxShadow = `0 0 12px ${color}90, 0 0 4px ${color}`
    }
    if (ringRef.current) {
      ringRef.current.style.borderColor = `${color}80`
      ringRef.current.style.boxShadow = `0 0 8px ${color}30`
    }
  }

  useEffect(() => {
    // Section-aware color tracking
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const color = SECTION_COLORS[entry.target.id] || '#00D4FF'
          applyColor(color)
        }
      })
    }, { threshold: 0.35 })

    const observe = () => {
      SECTION_IDS.forEach(id => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }
    // Observe after a tick so sections are mounted
    setTimeout(observe, 500)

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }
      raf.current = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      if (!ringRef.current) return
      ringRef.current.classList.add('cursor-hover')
      ringRef.current.style.borderColor = colorRef.current
      ringRef.current.style.background = `${colorRef.current}12`
      ringRef.current.style.boxShadow = `0 0 20px ${colorRef.current}40`
    }
    const onLeave = () => {
      if (!ringRef.current) return
      ringRef.current.classList.remove('cursor-hover')
      ringRef.current.style.background = ''
      ringRef.current.style.borderColor = `${colorRef.current}80`
      ringRef.current.style.boxShadow = `0 0 8px ${colorRef.current}30`
    }

    const attachInteractives = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], .tilt-card')
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
      return interactives
    }

    let interactives = attachInteractives()
    // Re-attach after slight delay for dynamically rendered elements
    const reattach = setTimeout(() => { interactives = attachInteractives() }, 1500)

    window.addEventListener('mousemove', move, { passive: true })
    raf.current = requestAnimationFrame(animate)

    // Initial color
    applyColor('#00D4FF')

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
      observer.disconnect()
      clearTimeout(reattach)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

// Deterministic hash
const _h = (v) => { const s = Math.sin(v) * 43758.5453; return s - Math.floor(s) }

// Space elements: planets, rings, satellites
function SpaceBackground() {
  const PLANETS = [
    {
      // Large cyan-purple planet — upper right, visible in Hero section
      x: '88%', y: '8vh', size: 340, color1: '#00D4FF', color2: '#8B5CF6',
      ringTilt: '-12deg', ringColor: 'rgba(0,212,255,0.25)',
      opacity: 0.12, blur: 0, speed: 40,
    },
    {
      // Mid pink planet — left side near Projects
      x: '-4%', y: '45vh', size: 220, color1: '#EC4899', color2: '#8B5CF6',
      ringTilt: '8deg', ringColor: 'rgba(236,72,153,0.2)',
      opacity: 0.1, blur: 0, speed: 55,
    },
    {
      // Small gold planet — right near BeyondCode
      x: '92%', y: '72vh', size: 140, color1: '#F59E0B', color2: '#EC4899',
      ringTilt: '-20deg', ringColor: 'rgba(245,158,11,0.2)',
      opacity: 0.11, blur: 0, speed: 30,
    },
    {
      // Tiny green asteroid cluster — lower left
      x: '5%', y: '82vh', size: 80, color1: '#10B981', color2: '#00D4FF',
      ringTilt: '5deg', ringColor: 'rgba(16,185,129,0.15)',
      opacity: 0.09, blur: 2, speed: 20,
    },
  ]

  // Satellites: small dots orbiting
  const SATS = Array.from({ length: 5 }, (_, i) => ({
    startX: _h(i * 173.3) * 100,
    startY: _h(i * 91.7) * 100,
    size: _h(i * 53.1) * 3 + 2,
    color: ['#00D4FF', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'][i],
    duration: 15 + _h(i * 37.9) * 20,
    delay: i * 3 + _h(i * 211.3) * 8,  // positive delay: stagger start, no negative offset
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Planets */}
      {PLANETS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], rotate: [0, 360] }}
          transition={{ y: { duration: p.speed, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: p.speed * 3, repeat: Infinity, ease: 'linear' } }}
        >
          {/* Planet body */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${p.color1}, ${p.color2} 60%, #050510 100%)`,
              opacity: p.opacity,
              filter: p.blur ? `blur(${p.blur}px)` : undefined,
              boxShadow: `0 0 ${p.size * 0.3}px ${p.color1}15`,
            }}
          />
          {/* Atmosphere glow */}
          <div
            className="absolute rounded-full"
            style={{
              inset: -p.size * 0.08,
              background: `radial-gradient(circle, transparent 45%, ${p.color1}08 70%, transparent 100%)`,
            }}
          />
          {/* Ring */}
          <div
            className="absolute"
            style={{
              top: '40%',
              left: '-30%',
              width: '160%',
              height: '20%',
              border: `2px solid ${p.ringColor}`,
              borderRadius: '50%',
              transform: `rotateX(${p.ringTilt})`,
              transformStyle: 'preserve-3d',
            }}
          />
          {/* Surface bands */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{ opacity: 0.3 }}
          >
            {[30, 50, 70].map((top, j) => (
              <div key={j}
                className="absolute w-full"
                style={{
                  top: `${top}%`,
                  height: '8%',
                  background: `linear-gradient(90deg, transparent, ${p.color2}20, transparent)`,
                  transform: 'rotate(-10deg)',
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Satellites */}
      {SATS.map((sat, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ width: sat.size, height: sat.size, borderRadius: '50%', background: sat.color }}
          animate={{
            x: ['-10vw', '110vw'],
            y: [`${sat.startY}vh`, `${(sat.startY + 20) % 100}vh`],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: sat.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: sat.delay,
          }}
        >
          {/* Satellite trail */}
          <div
            className="absolute"
            style={{
              right: '100%',
              top: '50%',
              width: sat.size * 6,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${sat.color}60)`,
              transform: 'translateY(-50%)',
            }}
          />
        </motion.div>
      ))}

      {/* Nebula clouds */}
      <motion.div
        className="absolute"
        style={{
          top: '20vh', right: '-10%',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, rgba(0,212,255,0.02) 50%, transparent 100%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute"
        style={{
          bottom: '30vh', left: '-8%',
          width: 500, height: 350,
          background: 'radial-gradient(ellipse, rgba(236,72,153,0.04) 0%, rgba(139,92,246,0.02) 50%, transparent 100%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />
    </div>
  )
}

function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.3
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.4 + 0.1
        this.color = ['#00D4FF', '#8B5CF6', '#EC4899'][Math.floor(Math.random() * 3)]
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset()
        }
      }
      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.shadowColor = this.color
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Halved particle count + connection cap → big CPU savings (was O(n²) over 120)
    const COUNT = window.innerWidth < 768 ? 30 : 60
    for (let i = 0; i < COUNT; i++) particles.push(new Particle())

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.save()
            ctx.globalAlpha = (1 - dist / 100) * 0.08
            ctx.strokeStyle = '#00D4FF'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} id="particles-canvas" />
}

export default function App() {
  const scrollProgress = useScrollProgress()
  const [particlesReady, setParticlesReady] = useState(false)
  const [bgReady, setBgReady] = useState(false)

  useEffect(() => {
    // Defer non-critical decorative backgrounds until after first paint
    // so Hero LCP isn't blocked by heavy animation work on the main thread.
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200))
    const idleId = idle(() => setBgReady(true))
    const t = setTimeout(() => setParticlesReady(true), 2500)
    return () => {
      clearTimeout(t)
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId)
    }
  }, [])

  return (
    <div className="relative bg-[#0a0a0f] min-h-screen overflow-x-hidden">
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Space background: planets, satellites, nebula — deferred past first paint */}
      {bgReady && <SpaceBackground />}

      {/* Particle background — delayed to avoid animation overload on first load */}
      {particlesReady && <ParticleBackground />}

      {/* Custom cursor (desktop only) — deferred past first paint */}
      {bgReady && (
        <div className="hidden md:block">
          <CustomCursor />
        </div>
      )}

      <Navbar />
      <Suspense fallback={null}>
        <FloatingResume />
      </Suspense>
      <main>
        <Hero />
        <Suspense fallback={null}>
          <LazyMount minHeight={200}><ImpactNumbers /></LazyMount>
          <LazyMount minHeight={600}><About /></LazyMount>
          <LazyMount minHeight={800}><WorkHistory /></LazyMount>
          <LazyMount minHeight={800}><Projects /></LazyMount>
          <LazyMount minHeight={500}><OpenSource /></LazyMount>
          <LazyMount minHeight={600}><Skills /></LazyMount>
          <LazyMount minHeight={500}><Achievements /></LazyMount>
          <LazyMount minHeight={500}><LeetCodeStats /></LazyMount>
          <LazyMount minHeight={500}><Testimonials /></LazyMount>
          <LazyMount minHeight={500}><GitHubStats /></LazyMount>
          <LazyMount minHeight={400}><BeyondCode /></LazyMount>
          <LazyMount minHeight={600}><Contact /></LazyMount>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <LazyMount minHeight={200}><Footer /></LazyMount>
      </Suspense>
    </div>
  )
}
