// src/components/Navbar.jsx
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isEventsPage = location.pathname === "/events"

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Events", href: "/events" }, // route
    { label: "FAQ", href: "#faq" },
    { label: "Contact Us", href: "#footer" },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()

    // Events → route
    if (href === "/events") {
      navigate("/events")
      setIsMenuOpen(false)
      return
    }

    // Hash links
    if (href.startsWith("#")) {
      if (location.pathname === "/") {
        const id = href.slice(1)
        const target = document.getElementById(id)
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" })
        } else {
          window.location.hash = href
        }
      }
      setIsMenuOpen(false)
      return
    }

    setIsMenuOpen(false)
  }

  const scrollToHero = () => {
    const hero = document.getElementById("hero")
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleBack = () => {
    navigate("/", { replace: false })
    setTimeout(scrollToHero, 50)
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          {/* Left: Back on /events, Menu elsewhere */}
          {isEventsPage ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[#fafaf9] hover:text-[#c9a227] transition-colors"
            >
              <span className="text-xl leading-none">&larr;</span>
              <span className="text-xs tracking-[0.2em] uppercase hidden md:block">
                Back
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group flex items-center gap-3 text-[#fafaf9] hover:text-[#c9a227] transition-colors"
            >
              <div className="flex flex-col gap-[6px]">
                <span className="block w-6 h-[2px] bg-current group-hover:w-5 transition-all" />
                <span className="block w-6 h-[2px] bg-current" />
                <span className="block w-4 h-[2px] bg-current group-hover:w-6 transition-all" />
              </div>
              <span className="text-xs tracking-[0.2em] uppercase hidden md:block">
                Menu
              </span>
            </button>
          )}

          {/* Center logo -> home, then hero scroll */}
          <Link
            to="/"
            onClick={() => setTimeout(scrollToHero, 50)}
            className="absolute left-1/2 -translate-x-1/2 flex items-baseline gap-1"
          >
            <span className="font-display font-medium text-2xl md:text-3xl text-[#fafaf9] tracking-tight">
              XYPHER
            </span>
            <span className="font-display font-medium text-lg md:text-xl text-[#c9a227]">
              &apos;26
            </span>
          </Link>

          {/* Right side - Login / Sign up */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              className="text-xs tracking-[0.2em] uppercase text-[#fafaf9]/70 hover:text-[#c9a227] transition-colors"
            >
              Login
            </button>
            <button
              type="button"
              className="text-xs tracking-[0.2em] uppercase text-[#0a0a0a] bg-[#c9a227] px-4 py-1.5 rounded-full hover:bg-[#f4cf4a] transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
      </motion.nav>

      {/* 3/4 screen side menu – only when not on /events */}
      <AnimatePresence>
        {!isEventsPage && isMenuOpen && (
          <>
            {/* Dimmed backdrop but still clickable to close */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Left panel: 3/4 width on desktop, full on small screens */}
            <motion.div
              key="side-menu"
              className="fixed inset-y-0 left-0 z-50 w-[80%] sm:w-[70%] md:w-[60%] lg:w-[55%] bg-[#0a0a0a]"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Grid background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                  }}
                />
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 left-6 flex items-center gap-3 text-[#fafaf9] hover:text-[#c9a227] transition-colors z-10"
              >
                <div className="relative w-6 h-6">
                  <span className="absolute top-1/2 left-0 w-6 h-[2px] bg-current rotate-45" />
                  <span className="absolute top-1/2 left-0 w-6 h-[2px] bg-current -rotate-45" />
                </div>
                <span className="text-xs tracking-[0.2em] uppercase hidden md:block">
                  Close
                </span>
              </button>

              {/* Menu content */}
              <div className="h-full flex flex-col justify-center px-12 md:px-16 lg:px-20">
                <div className="space-y-2">
                  {menuItems.map((item, i) => (
                    <div key={item.label} className="overflow-hidden">
                      <motion.a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="group flex items-center gap-6 py-3"
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 80, opacity: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="text-[#c9a227] text-sm tracking-widest font-medium opacity-50 group-hover:opacity-100 transition-opacity">
                          0{i + 1}
                        </span>
                        <span className="font-display font-medium text-[12vw] sm:text-[8vw] md:text-[5vw] text-[#fafaf9] leading-none tracking-tight group-hover:text-[#c9a227] transition-colors duration-300">
                          {item.label}
                        </span>
                        <motion.div
                          className="h-[2px] bg-[#c9a227] origin-left hidden md:block"
                          initial={{ width: 0 }}
                          whileHover={{ width: 80 }}
                          transition={{ duration: 0.4 }}
                        />
                      </motion.a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar