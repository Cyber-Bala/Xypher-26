// src/components/AboutSection.jsx
import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion"
import { useNavigate } from "react-router-dom"
import MagneticButton from "./MagneticButton"

const revealPhrases = [
  "XYPHER'26 is not just an event.",
  "It's where the future is written.",
  "Two days. Thrilling 8+ events.",
  "One unforgettable experience.",
]

const stats = [
  { value: "8+", label: "Events" },
  { value: "3K+", label: "Participants" },
  { value: "100+", label: "Mentors" },
  { value: "72H", label: "Non-Stop" },
]

export function AboutSection() {
  const sectionRef = useRef(null)
  const scrollProgress = useMotionValue(0)
  const smoothProgress = useSpring(scrollProgress, { stiffness: 100, damping: 30 })
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = sectionRef.current.offsetHeight
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight))
      )
      scrollProgress.set(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollProgress])

  const bgY = useTransform(smoothProgress, [0, 1], ["-10%", "10%"])

  const handleGoToEventsPage = (e) => {
    e.preventDefault()
    navigate("/events")
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ position: "relative" }}
      className="min-h-screen bg-[#0d0d0d] overflow-hidden"
    >
      {/* Background large text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ y: bgY }}
      >
        <span className="font-display text-[40vw] sm:text-[35vw] md:text-[30vw] font-bold text-[#fafaf9]/[0.015] select-none whitespace-nowrap">
          XYPHER
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-20 sm:py-28 md:py-32 lg:py-48">
        {/* Section indicator */}
        <motion.div
          className="mb-12 sm:mb-16 md:mb-20 lg:mb-32"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-[#c9a227] text-xs sm:text-sm font-mono">01</span>
            <div className="w-8 sm:w-12 h-px bg-[#c9a227]/50" />
            <span className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#fafaf9]/50">
              About
            </span>
          </div>
        </motion.div>

        {/* Main reveal text */}
        <div className="mb-20 sm:mb-28 md:mb-32 lg:mb-48">
          {revealPhrases.map((phrase, index) => (
            <RevealText key={index} text={phrase} index={index} />
          ))}
        </div>

        {/* Stats with horizontal scroll reveal */}
        <div className="relative">
          {/* Horizontal line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-[#fafaf9]/10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 pt-8 sm:pt-12 md:pt-16">
            {stats.map((stat, index) => (
              <StatItem key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom CTA section */}
        <motion.div
          className="mt-20 sm:mt-28 md:mt-32 lg:mt-48 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-xl">
            <motion.h3
              className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#fafaf9] mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to be part of something extraordinary?
            </motion.h3>
            <motion.p
              className="text-sm sm:text-base text-[#fafaf9]/50 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Join thousands of innovators, creators, and visionaries at the premier technical event
              of 2026.
            </motion.p>
          </div>

          <MagneticButton
            as="a"
            href="/events"
            onClick={handleGoToEventsPage}
            className="group flex items-center gap-3 sm:gap-4"
          >
            <span className="text-xs sm:text-sm tracking-widest uppercase text-[#fafaf9] group-hover:text-[#c9a227] transition-colors">
              Explore Events
            </span>
            <motion.span
              className="w-8 sm:w-12 h-px bg-[#c9a227]"
              whileHover={{ width: 64 }}
              transition={{ duration: 0.3 }}
            />
          </MagneticButton>
        </motion.div>
      </div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  )
}

function RevealText({ text, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="overflow-hidden mb-1 sm:mb-2 md:mb-4">
      <motion.h2
        className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#fafaf9] leading-[1.1] tracking-tight"
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{
          duration: 0.8,
          delay: index * 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {text}
      </motion.h2>
    </div>
  )
}

function StatItem({ stat, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (!isInView) return

    const numericMatch = stat.value.match(/\d+/)
    if (!numericMatch) {
      setDisplayValue(stat.value)
      return
    }

    const target = parseInt(numericMatch[0])
    const suffix = stat.value.replace(/\d+/, "")
    const duration = 1500
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(target * eased)

      setDisplayValue(current + suffix)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(stat.value)
      }
    }

    const delay = setTimeout(() => {
      requestAnimationFrame(animate)
    }, index * 150)

    return () => clearTimeout(delay)
  }, [isInView, stat.value, index])

  return (
    <motion.div
      ref={ref}
      className="relative py-6 sm:py-8 md:py-12 pr-4 sm:pr-8 md:pr-12"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {index > 0 && (
        <div className="absolute left-0 top-6 sm:top-8 bottom-6 sm:bottom-8 w-px bg-[#fafaf9]/10 hidden lg:block" />
      )}

      {index >= 2 && (
        <div className="absolute top-0 left-0 right-4 h-px bg-[#fafaf9]/10 lg:hidden" />
      )}

      <div className="lg:pl-8">
        <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold block mb-1 sm:mb-2 text-[#c9a227]">
          {displayValue}
        </span>
        <span className="text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#fafaf9]/40">
          {stat.label}
        </span>
      </div>
    </motion.div>
  )
}

export default AboutSection