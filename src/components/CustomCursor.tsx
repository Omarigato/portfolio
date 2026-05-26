import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 120, damping: 20, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)

  const isVisible = useRef(false)
  const isPointer = useRef(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      isVisible.current = true
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      isPointer.current =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        getComputedStyle(target).cursor === 'pointer'
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [mouseX, mouseY, dotX, dotY])

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-8 h-8 rounded-full border border-accent/70 transition-transform duration-150" />
      </motion.div>

      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
      </motion.div>
    </>
  )
}
