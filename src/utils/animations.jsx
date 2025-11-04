import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Common animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
}

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

// Common transition presets
export const defaultTransition = {
  duration: 0.4,
  ease: [0.6, -0.05, 0.01, 0.99],
}

export const fastTransition = {
  duration: 0.3,
  ease: [0.6, -0.05, 0.01, 0.99],
}

export const slowTransition = {
  duration: 0.6,
  ease: [0.6, -0.05, 0.01, 0.99],
}

// Reusable animated wrapper component with viewport detection
export function FadeInUp({ children, delay = 0, className = '', ...props }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      exit="exit"
      variants={fadeInUp}
      transition={{ ...defaultTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function FadeIn({ children, delay = 0, className = '', ...props }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      exit="exit"
      variants={fadeIn}
      transition={{ ...defaultTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function FadeInDown({ children, delay = 0, className = '', ...props }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      exit="exit"
      variants={fadeInDown}
      transition={{ ...defaultTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SlideInLeft({ children, delay = 0, className = '', ...props }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      exit="exit"
      variants={slideInLeft}
      transition={{ ...defaultTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SlideInRight({ children, delay = 0, className = '', ...props }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      exit="exit"
      variants={slideInRight}
      transition={{ ...defaultTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({ children, delay = 0, className = '', ...props }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      exit="exit"
      variants={scaleIn}
      transition={{ ...defaultTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

