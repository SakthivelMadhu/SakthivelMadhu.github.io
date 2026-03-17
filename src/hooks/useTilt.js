import { useRef, useCallback } from 'react'

export function useTilt(maxTilt = 12) {
  const cardRef = useRef(null)
  const shineRef = useRef(null)
  const animFrameRef = useRef(null)

  const handleMouseMove = useCallback(
    (e) => {
      const card = cardRef.current
      if (!card) return

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)

      animFrameRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateY = ((x - centerX) / centerX) * maxTilt
        const rotateX = -((y - centerY) / centerY) * maxTilt

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.02)`

        // Update shine position
        const shine = shineRef.current
        if (shine) {
          const mouseXPercent = (x / rect.width) * 100
          const mouseYPercent = (y / rect.height) * 100
          shine.style.background = `radial-gradient(circle at ${mouseXPercent}% ${mouseYPercent}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
          shine.style.opacity = '1'
        }
      })
    },
    [maxTilt]
  )

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)'
    if (shineRef.current) shineRef.current.style.opacity = '0'
    setTimeout(() => {
      if (card) card.style.transition = ''
    }, 500)
  }, [])

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current
    if (card) card.style.transition = 'transform 0.1s ease'
  }, [])

  return { cardRef, shineRef, handleMouseMove, handleMouseLeave, handleMouseEnter }
}
