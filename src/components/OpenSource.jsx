import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { githubRepos } from '../data/portfolio'

const LANG_COLORS = {
  Java: '#b07219',
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
}

function RepoCard({ repo, i, inView }) {
  const [hov, setHov] = useState(false)
  const langColor = LANG_COLORS[repo.language] || '#8b949e'

  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative flex flex-col p-5 rounded-2xl border overflow-hidden"
      style={{
        background: hov ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        borderColor: hov ? `${langColor}40` : 'rgba(255,255,255,0.06)',
        boxShadow: hov ? `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${langColor}10` : 'none',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      {/* Left accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
        style={{ background: langColor }}
        animate={{ opacity: hov ? 1 : 0.3, scaleY: hov ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <i className="fab fa-github text-sm flex-shrink-0" style={{ color: 'rgba(226,232,240,0.5)' }} />
          <span className="font-mono font-bold text-sm text-white truncate" style={{ color: hov ? '#fff' : 'rgba(226,232,240,0.9)' }}>
            {repo.name}
          </span>
        </div>
        <motion.div
          animate={hov ? { x: 2, opacity: 1 } : { x: 0, opacity: 0.4 }}
          transition={{ duration: 0.2 }}
          style={{ color: langColor, fontSize: 12, flexShrink: 0 }}
        >
          <i className="fas fa-arrow-up-right-from-square" />
        </motion.div>
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: 'rgba(148,163,184,0.7)' }}>
        {repo.description}
      </p>

      {/* Topics */}
      {repo.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {repo.topics.map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full font-mono"
              style={{ background: `${langColor}12`, color: langColor, border: `1px solid ${langColor}25` }}>
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(100,116,139,0.6)' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: langColor }} />
          <span className="font-mono">{repo.language}</span>
        </div>
        <div className="flex items-center gap-1">
          <i className="fas fa-star" style={{ fontSize: 10, color: '#F59E0B' }} />
          <span>{repo.stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <i className="fas fa-code-fork" style={{ fontSize: 10 }} />
          <span>{repo.forks}</span>
        </div>
      </div>
    </motion.a>
  )
}

export default function OpenSource() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="opensource" ref={ref} className="py-24 md:py-28 relative overflow-hidden">
      <div className="absolute pointer-events-none"
        style={{ top: '10%', right: '-8%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,212,255,0.04) 0%,transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute pointer-events-none"
        style={{ bottom: '10%', left: '-5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.04) 0%,transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="font-mono text-sm mb-3 tracking-widest uppercase" style={{ color: '#10B981' }}>My Code in the Wild</p>
            <h2 className="section-title text-white">Open Source & <span className="gradient-text-cyan">GitHub</span></h2>
          </div>
          <motion.a
            href="https://github.com/SakthivelMadhu"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(226,232,240,0.8)' }}
          >
            <i className="fab fa-github" />
            View All Repos
            <i className="fas fa-arrow-right text-xs opacity-50" />
          </motion.a>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {githubRepos.map((repo, i) => (
            <RepoCard key={repo.name} repo={repo} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
