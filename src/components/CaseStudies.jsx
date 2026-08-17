import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { caseStudies } from '../data/portfolio'

function Section({ label, color, children }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color }}>
        <span className="w-4 h-px inline-block" style={{ background: color }} />
        {label}
      </div>
      {children}
    </div>
  )
}

// Architecture diagram — HTML-overlay nodes for clean text wrapping,
// SVG layer for edges only. Horizontal scroll on narrow viewports.
function ArchDiagram({ arch, color }) {
  if (!arch) return null
  const byId = Object.fromEntries(arch.nodes.map(n => [n.id, n]))

  // Node dimensions in % of container — used only for edge endpoint computation.
  // Actual rendering uses fixed-px nodes (HTML overlay), so endpoints land
  // on/near the box edge regardless of container width.
  const HALF_W_PCT = 8
  const HALF_H_PCT = 6

  const edgePath = (from, to) => {
    const f = byId[from], t = byId[to]
    if (!f || !t) return ''
    const sameRow = Math.abs(f.y - t.y) < 2
    if (sameRow) {
      // Horizontal arrow — start at right edge of source, end at left edge of target
      const fx = f.x + HALF_W_PCT
      const tx = t.x - HALF_W_PCT
      return `M ${fx} ${f.y} L ${tx} ${t.y}`
    }
    // Different rows — exit right, bend at midpoint, enter left
    const fromLeft = f.x < t.x
    const fx = fromLeft ? f.x + HALF_W_PCT : f.x - HALF_W_PCT
    const tx = fromLeft ? t.x - HALF_W_PCT : t.x + HALF_W_PCT
    const midX = (fx + tx) / 2
    return `M ${fx} ${f.y} L ${midX} ${f.y} L ${midX} ${t.y} L ${tx} ${t.y}`
  }

  return (
    <div className="rounded-2xl overflow-x-auto overflow-y-hidden"
      style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${color}20` }}>
      <div className="relative" style={{ height: 280, minWidth: 680 }}>
        {/* Edges layer */}
        <svg className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ overflow: 'visible', pointerEvents: 'none' }}
        >
          {arch.edges.map((e, i) => (
            <path key={i}
              d={edgePath(e.from, e.to)}
              fill="none"
              stroke={color}
              strokeWidth="1.4"
              strokeOpacity="0.45"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>

        {/* Nodes — HTML overlay, percentage-positioned, fixed px size */}
        {arch.nodes.map(n => {
          const accent = n.accent
          return (
            <div key={n.id}
              className="absolute flex items-center justify-center"
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                transform: 'translate(-50%, -50%)',
                width: 110,
                height: 42,
                padding: '4px 6px',
                background: accent ? `${color}24` : 'rgba(13,13,20,0.92)',
                border: `1px solid ${accent ? color : color + '55'}`,
                color: accent ? '#ffffff' : 'rgba(226,232,240,0.92)',
                borderRadius: 8,
                fontSize: 11,
                fontWeight: accent ? 700 : 500,
                fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
                textAlign: 'center',
                lineHeight: 1.2,
                boxShadow: accent ? `0 0 14px ${color}25` : 'none',
                whiteSpace: 'normal',
                wordBreak: 'normal',
              }}
            >
              {n.label}
            </div>
          )
        })}

        {/* Edge labels — HTML overlay so text isn't stretched by preserveAspectRatio */}
        {arch.edges.filter(e => e.label).map((e, i) => {
          const f = byId[e.from], t = byId[e.to]
          if (!f || !t) return null
          const midX = (f.x + t.x) / 2
          const midY = (f.y + t.y) / 2
          return (
            <div key={`lbl-${i}`}
              className="absolute font-mono"
              style={{
                left: `${midX}%`,
                top: `${midY}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: 10,
                color,
                background: 'rgba(13,13,20,0.92)',
                padding: '2px 6px',
                borderRadius: 4,
                border: `1px solid ${color}40`,
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {e.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CaseCard({ cs, i, inView }) {
  const c = cs.color
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))',
        border: `1px solid ${c}25`,
        boxShadow: `0 30px 80px rgba(0,0,0,0.4), 0 0 60px ${c}10`,
      }}
    >
      {/* Top accent strip */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }} />

      {/* Header */}
      <div className="px-6 md:px-8 pt-7 pb-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl md:text-3xl"
            style={{ background: `${c}15`, border: `1px solid ${c}35` }}
          >
            {cs.icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] md:text-xs font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                style={{ background: `${c}15`, color: c, border: `1px solid ${c}35` }}>
                {cs.badge}
              </span>
              <span className="text-[10px] md:text-xs font-mono px-2 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(148,163,184,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
                Case Study {String(i + 1).padStart(2, '0')}
              </span>
              {cs.scale && (
                <span className="text-[10px] md:text-xs font-mono px-2 py-1 rounded-full"
                  style={{ background: `${c}08`, color: c, border: `1px solid ${c}25` }}>
                  <i className="fas fa-chart-line mr-1.5 opacity-70" />{cs.scale}
                </span>
              )}
            </div>
            <h3 className="font-display font-bold text-white text-xl md:text-2xl leading-tight mb-1.5">
              {cs.title}
            </h3>
            <p className="text-sm" style={{ color: 'rgba(148,163,184,0.85)' }}>{cs.tagline}</p>
            {cs.ownership && (
              <p className="mt-2 text-xs font-mono inline-flex items-center gap-1.5"
                style={{ color: 'rgba(148,163,184,0.7)' }}>
                <i className="fas fa-user-shield text-[10px]" style={{ color: c }} />
                <span>{cs.ownership}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Architecture diagram */}
      {cs.architecture && (
        <div className="px-6 md:px-8 pt-6">
          <Section label="Architecture" color={c}>
            <ArchDiagram arch={cs.architecture} color={c} />
          </Section>
        </div>
      )}

      {/* Body grid */}
      <div className="px-6 md:px-8 py-7 grid lg:grid-cols-2 gap-7 lg:gap-10">
        {/* LEFT — Problem + Solution + Tech */}
        <div className="space-y-7">
          <Section label="Problem" color={c}>
            <p className="text-sm md:text-[15px] leading-relaxed" style={{ color: 'rgba(226,232,240,0.85)' }}>
              {cs.problem}
            </p>
          </Section>

          <Section label="Solution" color={c}>
            <ul className="space-y-2.5">
              {cs.solution.map((s, k) => (
                <li key={k} className="flex gap-3 text-sm md:text-[15px] leading-relaxed" style={{ color: 'rgba(226,232,240,0.85)' }}>
                  <span className="font-mono text-xs flex-shrink-0 mt-1" style={{ color: c }}>0{k + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Tech Stack" color={c}>
            <div className="flex flex-wrap gap-1.5">
              {cs.tech.map(t => (
                <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-full"
                  style={{ background: `${c}10`, color: c, border: `1px solid ${c}25` }}>
                  {t}
                </span>
              ))}
            </div>
          </Section>
        </div>

        {/* RIGHT — Impact + Challenges + Tradeoffs + Contribution */}
        <div className="space-y-7">
          <Section label="Impact" color={c}>
            <div className="grid grid-cols-3 gap-2.5">
              {cs.impact.map((m, k) => (
                <div key={k} className="rounded-xl p-3 text-center"
                  style={{ background: `${c}08`, border: `1px solid ${c}20` }}>
                  <div className="font-display font-extrabold text-base md:text-lg leading-none mb-1" style={{ color: c }}>
                    {m.metric}
                  </div>
                  <div className="text-[10px] md:text-[11px] uppercase tracking-wider font-mono leading-tight"
                    style={{ color: 'rgba(148,163,184,0.7)' }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section label="Engineering Challenges" color={c}>
            <ul className="space-y-2">
              {cs.challenges.map((ch, k) => (
                <li key={k} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: 'rgba(226,232,240,0.8)' }}>
                  <i className="fas fa-bolt text-[10px] flex-shrink-0 mt-1.5" style={{ color: c }} />
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </Section>

          {cs.tradeoffs && cs.tradeoffs.length > 0 && (
            <Section label="Tradeoffs / Alternatives" color={c}>
              <ul className="space-y-2.5">
                {cs.tradeoffs.map((t, k) => (
                  <li key={k} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: 'rgba(226,232,240,0.8)' }}>
                    <i className="fas fa-code-branch text-[10px] flex-shrink-0 mt-1.5" style={{ color: c }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {cs.retrospectives && cs.retrospectives.length > 0 && (
            <Section label="Retrospective / v2 Plan" color={c}>
              <ul className="space-y-2.5">
                {cs.retrospectives.map((r, k) => (
                  <li key={k} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: 'rgba(226,232,240,0.8)' }}>
                    <i className="fas fa-arrow-rotate-right text-[10px] flex-shrink-0 mt-1.5" style={{ color: c }} />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section label="My Contribution" color={c}>
            <div className="rounded-2xl p-4 text-sm leading-relaxed"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(226,232,240,0.85)' }}>
              <i className="fas fa-quote-left text-xs mr-2 opacity-40" style={{ color: c }} />
              {cs.contribution}
            </div>
          </Section>
        </div>
      </div>
    </motion.article>
  )
}

export default function CaseStudies() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="case-studies" ref={ref} className="py-24 md:py-28 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute pointer-events-none"
        style={{ top: '8%', left: '-8%', width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute pointer-events-none"
        style={{ bottom: '12%', right: '-6%', width: 380, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-sm mb-3 tracking-widest uppercase" style={{ color: '#00D4FF' }}>
            Production Deep Dives
          </p>
          <h2 className="section-title text-white">
            Featured <span className="gradient-text-cyan">Case Studies</span>
          </h2>
          <p className="mt-4 text-sm md:text-base max-w-2xl mx-auto" style={{ color: 'rgba(148,163,184,0.85)' }}>
            Four production systems — architecture, tradeoffs, and measurable outcomes.
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-10">
          {caseStudies.map((cs, i) => (
            <CaseCard key={cs.id} cs={cs} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
