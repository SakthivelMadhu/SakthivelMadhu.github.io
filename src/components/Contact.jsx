import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { personalInfo } from '../data/portfolio'

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING PARTICLES
// ─────────────────────────────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const h = (v) => { const s = Math.sin(v) * 43758.5453; return s - Math.floor(s) }
  return {
    x: h(i * 127.1) * 100,
    size: h(i * 311.7) * 4 + 2,
    delay: h(i * 47.2) * 4,
    duration: h(i * 213.5) * 6 + 8,
    opacity: h(i * 91.3) * 0.4 + 0.1,
    color: ['#00D4FF', '#8B5CF6', '#EC4899'][i % 3],
  }
})

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PARTICLES.map((p, i) => (
        <motion.div key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            bottom: 0,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}60`,
            opacity: p.opacity,
          }}
          animate={{ y: [0, -(Math.random() * 200 + 300)], opacity: [p.opacity, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL LINKS
// ─────────────────────────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/SakthivelMadhu', icon: 'fab fa-github', color: '#e2e8f0', description: 'View repositories' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sakthivel-madhu-864647238/', icon: 'fab fa-linkedin', color: '#0A66C2', description: 'Connect professionally' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/sakthi130597/', icon: 'fas fa-code', color: '#FFA116', description: 'Competitive coding' },
  { label: 'Email', href: `mailto:${personalInfo.contact.email}`, icon: 'fas fa-envelope', color: '#00D4FF', description: personalInfo.contact.email },
]

// ─────────────────────────────────────────────────────────────────────────────
// TERMINAL CURSOR
// ─────────────────────────────────────────────────────────────────────────────
function TerminalCursor() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setInterval(() => setVisible(v => !v), 530)
    return () => clearInterval(t)
  }, [])
  return (
    <motion.span
      style={{
        display: 'inline-block', width: 3, height: '1em',
        background: '#00D4FF', marginLeft: 2, verticalAlign: 'middle',
        opacity: visible ? 1 : 0,
      }}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────────────────────────────────────────
function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [focused, setFocused] = useState(null)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/sakthi130597@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: form.subject || 'Portfolio Contact' }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else setStatus('error')
    } catch { setStatus('error') }
  }

  const fieldStyle = (name) => ({
    width: '100%', padding: '12px 16px', fontSize: '0.875rem', color: '#fff',
    borderRadius: 12, outline: 'none', background: 'rgba(255,255,255,0.03)',
    border: `1.5px solid ${focused === name ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.07)'}`,
    boxShadow: focused === name ? '0 0 0 3px rgba(0,212,255,0.08), 0 0 20px rgba(0,212,255,0.1)' : 'none',
    transition: 'all 0.2s',
  })

  const focusProps = (name) => ({
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(null),
    style: fieldStyle(name),
    className: 'placeholder:text-slate-700',
  })

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-500 mb-1.5 font-mono uppercase tracking-wider">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" {...focusProps('name')} />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1.5 font-mono uppercase tracking-wider">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" {...focusProps('email')} />
        </div>
      </div>
      <div>
        <label className="block text-xs text-slate-500 mb-1.5 font-mono uppercase tracking-wider">Subject</label>
        <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" {...focusProps('subject')} />
      </div>
      <div>
        <label className="block text-xs text-slate-500 mb-1.5 font-mono uppercase tracking-wider">Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
          placeholder="Tell me about the opportunity, project, or just say hello..."
          style={{ ...fieldStyle('message'), resize: 'none' }}
          onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
          className="placeholder:text-slate-700"
        />
      </div>

      {/* Send button */}
      <motion.button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="relative w-full py-3.5 font-semibold text-sm text-[#0a0a0f] rounded-xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #00D4FF, #8B5CF6)' }}
      >
        {/* Sweep shine */}
        <motion.div
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.3) 50%,transparent 65%)' }}
          animate={{ x: ['-120%', '220%'] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
        />
        <span className="relative z-10 flex items-center justify-center gap-2">
          {status === 'sending' ? (
            <><motion.i className="fas fa-circle-notch" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />Sending...</>
          ) : status === 'success' ? (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-green-900">
              <i className="fas fa-check-circle" />Message Sent!
            </motion.span>
          ) : (
            <><i className="fas fa-paper-plane" />Send Message</>
          )}
        </span>
      </motion.button>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-xs text-red-400 text-center"
          >
            Something went wrong.{' '}
            <a href={`mailto:${personalInfo.contact.email}`} className="text-cyan-400 underline">Email directly</a>
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION
// ─────────────────────────────────────────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Radial bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 100%, rgba(0,212,255,0.07) 0%, transparent 60%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.05) 0%, transparent 50%)',
      }} />

      {/* Floating particles */}
      <FloatingParticles />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          {/* Animated ping dot */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: '#10B981' }}
              animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#10B981' }}>
              Open to Opportunities
            </span>
          </div>
          <p className="text-cyan-400 font-mono text-sm mb-3 tracking-widest uppercase">Let's Connect</p>
          <h2 className="section-title text-white">
            Get In <span className="gradient-text-cyan">Touch</span><TerminalCursor />
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Open to backend/cloud engineering roles, interesting projects, or a good conversation about distributed systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT: Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Availability pulse card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="rounded-2xl p-5 border mb-6 relative overflow-hidden"
              style={{ background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.25)' }}
            >
              <motion.div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.05), transparent)',
              }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <div className="relative z-10 flex items-center gap-3 mb-2">
                <motion.span className="w-3 h-3 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-green-400 font-semibold text-sm">Available for Opportunities</span>
              </div>
              <p className="relative z-10 text-slate-400 text-sm leading-relaxed">
                Currently seeking challenging roles in backend/cloud engineering. Typically respond within 24 hours.
              </p>
            </motion.div>

            {/* Contact details */}
            <div className="space-y-3 mb-6">
              {[
                { href: `mailto:${personalInfo.contact.email}`, icon: 'fas fa-envelope', color: '#00D4FF', label: 'Email', value: personalInfo.contact.email, link: true },
                { icon: 'fas fa-phone', color: '#8B5CF6', label: 'Phone', value: personalInfo.contact.phone, link: false },
                { icon: 'fas fa-location-dot', color: '#EC4899', label: 'Location', value: `${personalInfo.location} · Remote Available`, link: false },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  className="group"
                >
                  {item.link ? (
                    <a href={item.href}
                      className="flex items-center gap-4 p-4 rounded-2xl border transition-all duration-250"
                      style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = `${item.color}30`
                        e.currentTarget.style.background = `${item.color}07`
                        e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.3), 0 0 20px ${item.color}0d`
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                        e.currentTarget.style.boxShadow = ''
                      }}
                    >
                      <ContactDetailInner item={item} />
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-2xl border"
                      style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
                    >
                      <ContactDetailInner item={item} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs text-slate-600 mb-3 uppercase tracking-widest font-mono">Find me on</p>
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL_LINKS.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.35 + i * 0.08, type: 'spring', stiffness: 200 }}
                    className="flex items-center gap-3 p-3 rounded-2xl border relative overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.07)', transition: 'all 0.25s' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${s.color}40`
                      e.currentTarget.style.background = `rgba(255,255,255,0.04)`
                      e.currentTarget.style.transform = 'translateY(-3px)'
                      e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,0.3), 0 0 20px ${s.color}15`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                      e.currentTarget.style.transform = ''
                      e.currentTarget.style.boxShadow = ''
                    }}
                  >
                    {/* Hover beam */}
                    <motion.div style={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(105deg, transparent 30%, ${s.color}15 50%, transparent 70%)`,
                      opacity: 0,
                    }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <i className={`${s.icon} text-base relative z-10`} style={{ color: s.color }} />
                    <div className="relative z-10">
                      <p className="text-xs font-bold text-white">{s.label}</p>
                      <p className="text-[10px] text-slate-600 truncate max-w-[100px]">{s.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            className="rounded-2xl p-6 md:p-8 border relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(20px)', borderColor: 'rgba(0,212,255,0.12)' }}
          >
            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)', filter: 'blur(20px)', transform: 'translate(30%,-30%)' }} />
            <h3 className="text-xl font-display font-bold text-white mb-6 relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: '#00D4FF', boxShadow: '0 0 8px #00D4FF' }} />
              Send a Message
            </h3>
            <div className="relative z-10">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ContactDetailInner({ item }) {
  return (
    <>
      <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0"
        style={{ background: `${item.color}12`, border: `1px solid ${item.color}25`, color: item.color, fontSize: '0.875rem' }}
      >
        <i className={item.icon} />
      </div>
      <div>
        <p className="text-xs mb-0.5" style={{ color: 'rgba(100,116,139,0.7)' }}>{item.label}</p>
        <p className="text-sm text-white font-mono">{item.value}</p>
      </div>
      {item.link && <i className="fas fa-arrow-right ml-auto text-xs" style={{ color: 'rgba(100,116,139,0.4)' }} />}
    </>
  )
}
