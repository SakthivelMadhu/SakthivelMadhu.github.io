import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const GITHUB_USER = 'SakthivelMadhu'

// GitHub readme stats cards — dark theme matching portfolio palette.
// Use solid bg_color (matches portfolio bg) + hide_border + bright text
// for reliable rendering across the upstream cache.
const statsCards = [
  {
    label: 'GitHub Stats',
    src: `https://github-readme-stats.vercel.app/api?username=${GITHUB_USER}&show_icons=true&hide_border=true&bg_color=0a0a0f&title_color=00D4FF&icon_color=8B5CF6&text_color=e2e8f0&include_all_commits=true&count_private=true&card_width=500`,
    color: '#00D4FF',
    span: 'md:col-span-2',
  },
  {
    label: 'Top Languages',
    src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USER}&layout=compact&hide_border=true&bg_color=0a0a0f&title_color=8B5CF6&text_color=e2e8f0&langs_count=8&card_width=320`,
    color: '#8B5CF6',
    span: 'md:col-span-1',
  },
  {
    label: 'GitHub Streak',
    src: `https://github-readme-streak-stats.herokuapp.com?user=${GITHUB_USER}&hide_border=true&background=0a0a0f&stroke=EC489940&ring=EC4899&fire=F59E0B&currStreakLabel=EC4899&sideLabels=e2e8f0&dates=94a3b8&currStreakNum=EC4899&sideNums=e2e8f0`,
    color: '#EC4899',
    span: 'md:col-span-2',
  },
  {
    label: 'LeetCode Stats',
    icon: '💡',
    isCustom: true,
    color: '#F59E0B',
    span: 'md:col-span-1',
    stats: [
      { label: 'Problems Solved', value: '100+', color: '#F59E0B' },
      { label: 'Acceptance Rate', value: '~65%', color: '#10B981' },
      { label: 'Contest Rating', value: 'Active', color: '#00D4FF' },
    ],
    leetcodeUrl: 'https://leetcode.com/u/sakthi130597/',
  },
]

function StatCard({ card, inView, i }) {
  if (card.isCustom) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`rounded-2xl p-5 border ${card.span} flex flex-col`}
        style={{
          background: 'rgba(255,255,255,0.025)',
          backdropFilter: 'blur(20px)',
          borderColor: `${card.color}25`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${card.color}08`,
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">{card.icon}</span>
          <p className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: card.color }}>
            {card.label}
          </p>
        </div>
        <div className="flex flex-col gap-3 flex-1 justify-center">
          {card.stats.map((s) => (
            <div key={s.label} className="flex items-center justify-between rounded-xl px-4 py-2.5"
              style={{ background: `${s.color}0c`, border: `1px solid ${s.color}20` }}
            >
              <span className="text-xs" style={{ color: 'rgba(148,163,184,0.7)' }}>{s.label}</span>
              <span className="font-mono font-bold text-sm" style={{ color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>
        <a
          href={card.leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-xs font-mono text-center py-2 rounded-lg transition-all"
          style={{ color: card.color, background: `${card.color}10`, border: `1px solid ${card.color}20` }}
          onMouseEnter={e => { e.currentTarget.style.background = `${card.color}20` }}
          onMouseLeave={e => { e.currentTarget.style.background = `${card.color}10` }}
        >
          View on LeetCode →
        </a>
      </motion.div>
    )
  }

  return <RemoteStatCard card={card} inView={inView} i={i} />
}

function RemoteStatCard({ card, inView, i }) {
  const [errored, setErrored] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl p-5 border ${card.span} flex flex-col`}
      style={{
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(20px)',
        borderColor: `${card.color}25`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${card.color}08`,
        minHeight: 200,
      }}
    >
      <p className="font-mono text-xs font-bold uppercase tracking-widest mb-3" style={{ color: card.color }}>
        {card.label}
      </p>
      <div className="flex-1 flex items-center justify-center w-full">
        {!errored && (
          <img
            src={card.src}
            alt={card.label}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className="rounded-xl"
            style={{
              width: '100%',
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 0 16px rgba(0,0,0,0.5))',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}
        {!loaded && !errored && (
          <div className="text-xs font-mono py-8" style={{ color: 'rgba(148,163,184,0.5)' }}>
            <i className="fas fa-spinner fa-spin mr-2" />Loading…
          </div>
        )}
        {errored && (
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-6 rounded-xl text-sm"
            style={{ background: `${card.color}08`, border: `1px dashed ${card.color}30`, color: card.color }}
          >
            <i className="fab fa-github text-xl block mb-2 opacity-70" />
            Stats unavailable — view on GitHub
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function GitHubStats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="github" ref={ref} className="py-24 md:py-28 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute pointer-events-none"
        style={{ top: '20%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,212,255,0.05) 0%,transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute pointer-events-none"
        style={{ bottom: '10%', left: '-5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.06) 0%,transparent 70%)', filter: 'blur(45px)' }} />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-sm mb-3 tracking-widest uppercase" style={{ color: '#00D4FF' }}>Code Activity</p>
          <h2 className="section-title text-white">GitHub <span className="gradient-text-cyan">Stats</span></h2>
          <p className="mt-4 max-w-md mx-auto text-sm" style={{ color: 'rgba(100,116,139,0.7)' }}>
            Open source activity, streaks, and language breakdown
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {statsCards.map((card, i) => (
            <StatCard key={card.label} card={card} inView={inView} i={i} />
          ))}
        </div>

        {/* View profile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-mono font-semibold text-sm transition-all"
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.25)',
              color: '#00D4FF',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.15)'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.08)'
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <i className="fab fa-github text-base" />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  )
}
