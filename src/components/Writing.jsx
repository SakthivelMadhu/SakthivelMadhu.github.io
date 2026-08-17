import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { writingPosts } from '../data/portfolio'

export default function Writing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="writing" ref={ref} className="py-20 md:py-24 relative overflow-hidden"
      aria-labelledby="writing-heading">
      <div className="absolute pointer-events-none"
        style={{ top: '15%', left: '-6%', width: 380, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute pointer-events-none"
        style={{ bottom: '12%', right: '-5%', width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)', filter: 'blur(45px)' }} />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-sm mb-3 tracking-widest uppercase" style={{ color: '#00D4FF' }}>
            Engineering Writing
          </p>
          <h2 id="writing-heading" className="section-title text-white">
            Notes &amp; <span className="gradient-text-cyan">Design Docs</span>
          </h2>
          <p className="mt-4 text-sm md:text-base max-w-2xl mx-auto" style={{ color: 'rgba(148,163,184,0.85)' }}>
            Distilled lessons from production systems — patterns, tradeoffs, and failure modes I learned the hard way.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {writingPosts.map((post, i) => {
            const isDraft = post.status === 'draft'
            const Tag = isDraft ? 'div' : 'a'
            const tagProps = isDraft
              ? { role: 'article', 'aria-label': `${post.title} — coming soon` }
              : { href: post.url, target: '_blank', rel: 'noopener noreferrer' }

            return (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={isDraft ? {} : { y: -4 }}
              >
                <Tag
                  {...tagProps}
                  className="block rounded-2xl p-5 md:p-6 border h-full"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    borderColor: `${post.color}25`,
                    boxShadow: `0 16px 40px rgba(0,0,0,0.3), 0 0 24px ${post.color}08`,
                    cursor: isDraft ? 'default' : 'pointer',
                    textDecoration: 'none',
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: `${post.color}15`, border: `1px solid ${post.color}30` }}
                      aria-hidden="true">
                      {post.icon}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{
                        background: isDraft ? 'rgba(245,158,11,0.1)' : `${post.color}10`,
                        color: isDraft ? '#F59E0B' : post.color,
                        border: `1px solid ${isDraft ? 'rgba(245,158,11,0.25)' : post.color + '25'}`,
                      }}>
                      {isDraft ? 'Drafting' : post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-white text-base md:text-lg leading-snug mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(148,163,184,0.85)' }}>
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map(t => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{ background: `${post.color}08`, color: post.color, border: `1px solid ${post.color}20` }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs font-mono flex items-center gap-2"
                    style={{ color: 'rgba(148,163,184,0.6)' }}>
                    {isDraft ? (
                      <><i className="fas fa-pen-nib opacity-60" /> Coming {post.date}</>
                    ) : (
                      <><i className="fas fa-arrow-right" style={{ color: post.color }} /> Read post</>
                    )}
                  </div>
                </Tag>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
