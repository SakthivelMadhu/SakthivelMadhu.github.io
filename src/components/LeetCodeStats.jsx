import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const LEETCODE_USERNAME = 'sakthi130597'
const LEETCODE_URL = 'https://leetcode.com/u/sakthi130597/'

// Animated count-up
function CountUp({ target, duration = 1.5, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const DIFFICULTY_COLORS = {
  Easy: '#10B981',
  Medium: '#F59E0B',
  Hard: '#EC4899',
}

export default function LeetCodeStats() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use LeetCode stats API (unofficial, commonly used for portfolios)
    fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'success' || data.totalSolved !== undefined) {
          setStats(data)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Fallback data from portfolio.js mention ("150+ LeetCode problems")
  const totalSolved = stats?.totalSolved ?? 150
  const easySolved = stats?.easySolved ?? 60
  const mediumSolved = stats?.mediumSolved ?? 70
  const hardSolved = stats?.hardSolved ?? 20
  const ranking = stats?.ranking ?? null
  const acceptanceRate = stats?.acceptanceRate ?? null

  const difficulties = [
    { label: 'Easy', solved: easySolved, color: '#10B981' },
    { label: 'Medium', solved: mediumSolved, color: '#F59E0B' },
    { label: 'Hard', solved: hardSolved, color: '#EC4899' },
  ]

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute pointer-events-none"
        style={{ top: '20%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(245,158,11,0.05) 0%,transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="rounded-3xl overflow-hidden border"
          style={{ background: 'rgba(245,158,11,0.03)', borderColor: 'rgba(245,158,11,0.15)' }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />

          <div className="relative z-10 p-8 md:p-10">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                {/* LeetCode icon */}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(236,72,153,0.1))', border: '1px solid rgba(245,158,11,0.3)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="#F59E0B"/>
                  </svg>
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(245,158,11,0.6)' }}>DSA Practice</div>
                  <h3 className="font-display font-bold text-white text-xl">LeetCode <span style={{ color: '#F59E0B' }}>Progress</span></h3>
                </div>
              </div>
              <a href={LEETCODE_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono transition-all"
                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#F59E0B' }}>
                <i className="fas fa-external-link-alt text-xs" />
                View Profile
              </a>
            </div>

            <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
              {/* Total solved — big number */}
              <div className="text-center md:text-left">
                <div className="font-display font-black leading-none mb-1"
                  style={{ fontSize: 'clamp(3rem,6vw,5rem)', background: 'linear-gradient(135deg, #F59E0B, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {inView ? <CountUp target={totalSolved} suffix="+" /> : '0+'}
                </div>
                <div className="font-mono text-sm uppercase tracking-widest" style={{ color: 'rgba(100,116,139,0.7)' }}>Problems Solved</div>
                {ranking && (
                  <div className="mt-2 text-xs font-mono" style={{ color: 'rgba(245,158,11,0.6)' }}>
                    Global Rank #{ranking.toLocaleString()}
                  </div>
                )}
              </div>

              {/* Difficulty breakdown */}
              <div className="space-y-4">
                {difficulties.map((d, i) => (
                  <motion.div key={d.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                        <span className="text-xs font-mono font-semibold" style={{ color: d.color }}>{d.label}</span>
                      </div>
                      <span className="text-xs font-mono font-bold" style={{ color: 'rgba(226,232,240,0.8)' }}>
                        {inView ? <CountUp target={d.solved} duration={1.2} /> : 0} solved
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${d.color}, ${d.color}80)` }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${(d.solved / totalSolved) * 100}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}

                {/* Extra stats row */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {acceptanceRate && (
                    <div className="px-3 py-1.5 rounded-xl text-xs font-mono"
                      style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#10B981' }}>
                      {acceptanceRate.toFixed(1)}% Acceptance
                    </div>
                  )}
                  <div className="px-3 py-1.5 rounded-xl text-xs font-mono"
                    style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', color: '#8B5CF6' }}>
                    System Design + DSA
                  </div>
                  <div className="px-3 py-1.5 rounded-xl text-xs font-mono"
                    style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00D4FF' }}>
                    Java solutions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
