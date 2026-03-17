import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '../data/portfolio'

export default function FloatingResume() {
  const [visible, setVisible] = useState(false)
  const [hov, setHov] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed right-0 top-1/2 z-50 hidden md:flex"
          style={{ transform: 'translateY(-50%)' }}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        >
          <motion.a
            href={personalInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex flex-col items-center justify-center gap-2 py-5 px-3 rounded-l-2xl overflow-hidden cursor-pointer"
            style={{
              background: hov
                ? 'linear-gradient(180deg, rgba(0,212,255,0.2), rgba(139,92,246,0.2))'
                : 'rgba(10,10,15,0.9)',
              border: '1px solid rgba(0,212,255,0.25)',
              borderRight: 'none',
              boxShadow: hov
                ? '-8px 0 30px rgba(0,212,255,0.15), inset 0 0 20px rgba(0,212,255,0.05)'
                : '-4px 0 20px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(16px)',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Shine on hover */}
            {hov && (
              <motion.div
                className="absolute inset-0"
                initial={{ y: '-100%' }}
                animate={{ y: '200%' }}
                transition={{ duration: 0.6 }}
                style={{ background: 'linear-gradient(180deg, transparent, rgba(0,212,255,0.12), transparent)' }}
              />
            )}

            {/* Download icon */}
            <motion.div
              animate={hov ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 0.5, repeat: hov ? Infinity : 0 }}
              style={{ color: '#00D4FF', fontSize: 14 }}
            >
              <i className="fas fa-download" />
            </motion.div>

            {/* Vertical text */}
            <div
              className="font-mono font-bold text-xs tracking-widest uppercase"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                color: hov ? '#00D4FF' : 'rgba(148,163,184,0.7)',
                transition: 'color 0.3s',
                letterSpacing: '0.15em',
              }}
            >
              Resume
            </div>

            {/* Pulse dot */}
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#10B981' }}
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
