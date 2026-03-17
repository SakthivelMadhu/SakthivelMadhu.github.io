import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { skillCategories } from '../data/portfolio'

// ── Proficiency label ─────────────────────────────────────────────────────────
function profLabel(level) {
  if (level >= 90) return { text: 'Expert',        color: '#00D4FF' }
  if (level >= 80) return { text: 'Advanced',      color: '#10B981' }
  if (level >= 70) return { text: 'Proficient',    color: '#8B5CF6' }
  if (level >= 55) return { text: 'Intermediate',  color: '#F59E0B' }
  return              { text: 'Familiar',          color: '#EC4899' }
}

// ── Grid pill (collapsed view) ────────────────────────────────────────────────
function SkillPill({ skill, color, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const lv = profLabel(skill.level)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.85 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.022, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={`${skill.name} — ${skill.level}% (${lv.text})`}
      className="relative flex items-center justify-center rounded-lg cursor-default transition-all duration-200"
      style={{
        height: '36px', padding: '0 12px',
        background: hovered ? `${color}18` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? color + '50' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered ? `0 0 12px ${color}30` : 'none',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <span className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-lg"
        style={{ background: color, opacity: hovered ? 1 : 0, transition: 'opacity 0.2s' }} />
      <span className="text-xs font-mono font-medium text-center leading-none transition-colors duration-200"
        style={{ color: hovered ? color : '#e2e8f0', whiteSpace: 'nowrap' }}
      >{skill.name}</span>
    </motion.div>
  )
}

// ── Proficiency bar row (expanded view) ───────────────────────────────────────
function SkillBar({ skill, color, index, inView }) {
  const lv = profLabel(skill.level)
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-mono text-white group-hover:text-white transition-colors">{skill.name}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: `${lv.color}15`, color: lv.color, border: `1px solid ${lv.color}25`, fontSize: '10px' }}>{lv.text}</span>
          <span className="text-xs font-bold font-mono" style={{ color }}>{skill.level}%</span>
        </div>
      </div>
      {/* Track */}
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: 0.15 + index * 0.04, ease: [0.23, 1, 0.32, 1] }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}90)`, boxShadow: `0 0 8px ${color}50` }}
        >
          {/* Shimmer */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: index * 0.1 }}
            className="absolute inset-0 w-1/3"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

// ── Category card ─────────────────────────────────────────────────────────────
function SkillCategory({ category, catIndex }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [expanded, setExpanded] = useState(false)

  const expertCount = category.skills.filter(s => s.level >= 80).length
  const avgLevel = Math.round(category.skills.reduce((a, s) => a + s.level, 0) / category.skills.length)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: catIndex * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="rounded-2xl overflow-hidden border transition-all duration-300"
      style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(20px)', borderColor: `${category.color}22` }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${category.color}45`; e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3),0 0 30px ${category.color}10` }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = `${category.color}22`; e.currentTarget.style.boxShadow = '' }}
    >
      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-4 border-b" style={{ borderColor: `${category.color}18` }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}
            >{category.icon}</div>
            <div>
              <h3 className="text-sm font-display font-bold text-white">{category.title}</h3>
              <p className="text-xs mt-0.5 font-mono" style={{ color: 'rgba(100,116,139,0.7)' }}>
                {category.skills.length} skills · {expertCount} Expert/Adv
              </p>
            </div>
          </div>
          {/* Avg proficiency badge */}
          <div className="text-right">
            <div className="text-lg font-black font-display" style={{ color: category.color }}>{avgLevel}%</div>
            <div className="text-xs font-mono" style={{ color: 'rgba(100,116,139,0.6)' }}>avg</div>
          </div>
        </div>

        {/* Category-level progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${avgLevel}%` } : {}}
            transition={{ duration: 1.2, delay: catIndex * 0.1 + 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg,${category.color},${category.color}70)`, boxShadow: `0 0 8px ${category.color}50` }}
          />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-5">
        {/* Collapsed: neat pill grid */}
        {!expanded && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(110px,1fr))', gap: '8px' }}>
            {category.skills.map((skill, i) => (
              <SkillPill key={skill.name} skill={skill} color={category.color} index={i} inView={inView} />
            ))}
          </div>
        )}

        {/* Expanded: proficiency bars */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                {category.skills
                  .slice()
                  .sort((a, b) => b.level - a.level)
                  .map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} color={category.color} index={i} inView={inView} />
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand / Collapse toggle */}
        <motion.button
          onClick={() => setExpanded(v => !v)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-mono font-semibold border transition-all"
          style={{
            background: expanded ? `${category.color}15` : 'rgba(255,255,255,0.03)',
            borderColor: expanded ? `${category.color}35` : 'rgba(255,255,255,0.08)',
            color: expanded ? category.color : 'rgba(148,163,184,0.7)',
          }}
        >
          {expanded ? (
            <><i className="fas fa-chevron-up text-xs" /> Hide Proficiency</>
          ) : (
            <><i className="fas fa-chart-bar text-xs" /> Show Proficiency Levels</>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Skills() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const totalSkills = skillCategories.reduce((a, c) => a + c.skills.length, 0)
  const expertSkills = skillCategories.reduce((a, c) => a + c.skills.filter(s => s.level >= 80).length, 0)

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(139,92,246,0.06) 0%,transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-sm mb-3 tracking-widest uppercase" style={{ color: '#8B5CF6' }}>Technical Arsenal</p>
          <h2 className="section-title text-white">Skills &amp; <span className="gradient-text-cyan">Technologies</span></h2>
          <p className="mt-4 max-w-xl mx-auto text-sm" style={{ color: 'rgba(100,116,139,0.7)' }}>
            {totalSkills} technologies · {expertSkills} at Expert/Advanced level.
            Click <strong className="text-white">Show Proficiency</strong> on any category to expand contribution bars.
          </p>
        </motion.div>

        {/* Quick stats strip */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
        >
          {[
            { icon: '☕', label: 'Primary Language', value: 'Java 17',      color: '#00D4FF', level: 95 },
            { icon: '🍃', label: 'Framework',        value: 'Spring Boot',  color: '#10B981', level: 95 },
            { icon: '☁️', label: 'Cloud',            value: 'GCP',         color: '#F59E0B', level: 85 },
            { icon: '🔗', label: 'Architecture',     value: 'Microservices',color: '#8B5CF6', level: 90 },
          ].map((item, i) => (
            <motion.div key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.07 }}
              whileHover={{ y: -4 }}
              className="flex items-center gap-3 p-3 rounded-xl border transition-all"
              style={{ background: `${item.color}08`, borderColor: `${item.color}25` }}
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs truncate" style={{ color: 'rgba(100,116,139,0.7)' }}>{item.label}</p>
                <p className="text-sm font-bold font-display" style={{ color: item.color }}>{item.value}</p>
                {/* mini bar */}
                <div className="mt-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.4 + i * 0.07 }}
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-8 justify-center"
        >
          {[
            { text: 'Expert',       color: '#00D4FF', range: '90–100%' },
            { text: 'Advanced',     color: '#10B981', range: '80–89%' },
            { text: 'Proficient',   color: '#8B5CF6', range: '70–79%' },
            { text: 'Intermediate', color: '#F59E0B', range: '55–69%' },
            { text: 'Familiar',     color: '#EC4899', range: '<55%' },
          ].map(l => (
            <div key={l.text} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border"
              style={{ background: `${l.color}08`, borderColor: `${l.color}20` }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              <span className="text-xs font-mono" style={{ color: l.color }}>{l.text}</span>
              <span className="text-xs" style={{ color: 'rgba(100,116,139,0.5)' }}>{l.range}</span>
            </div>
          ))}
        </motion.div>

        {/* 2-col category grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {skillCategories.map((cat, i) => (
            <SkillCategory key={cat.title} category={cat} catIndex={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="https://github.com/SakthivelMadhu" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all hover:border-white/20"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(226,232,240,0.7)' }}
          ><i className="fab fa-github" /> View GitHub Profile</a>
          <motion.a href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold"
            style={{ background: 'linear-gradient(135deg,#F59E0B,#EC4899)', color: '#0a0a0f' }}
          >
            <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-white" />
            Hire Me <i className="fas fa-arrow-right text-xs" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
