// src/components/Navbar.jsx
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  const isSpecialPage = ["/events", "/login", "/signup", "/register"].some(path => location.pathname.startsWith(path));

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Events", href: "/events" }, // route
    { label: "FAQ", href: "#faq" },
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
        }
      } else {
        // Navigate to home; HomePage.jsx will handle the scroll via useEffect
        navigate("/")
        // Small delay to ensure hash is processed if needed, 
        // though HomePage.jsx check is sturdier.
        window.location.hash = href
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group flex items-center gap-3 text-[#fafaf9] hover:text-[#c9a227] transition-colors"
            >
              <div className="flex flex-col gap-[6px]">
                <span className="block w-6 h-[2px] bg-current group-hover:w-5 transition-all" />
                <span className="block w-6 h-[2px] bg-current" />
                <span className="block w-4 h-[2px] bg-current group-hover:w-6 transition-all" />
              </div>
              <span className="text-sm tracking-[0.2em] uppercase hidden md:block">
                Menu
              </span>
            </button>

            {isSpecialPage && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-[#fafaf9]/60 hover:text-[#c9a227] transition-colors pl-4 border-l border-[#fafaf9]/20"
              >
                <span className="text-xl leading-none">&larr;</span>
                <span className="text-sm tracking-[0.2em] uppercase hidden md:block">
                  Back
                </span>
              </button>
            )}
          </div>

          {/* Center logo -> home, then hero scroll - Hidden on auth pages per user request */}
          {!["/login", "/signup"].includes(location.pathname) && (
            <Link
              to="/"
              onClick={() => setTimeout(scrollToHero, 50)}
              className="absolute left-1/2 -translate-x-1/2 flex items-baseline gap-1"
            >
              <span className="font-display font-medium text-4xl md:text-5xl text-[#fafaf9] tracking-tight">
                XYPHER
              </span>
              <span className="font-display font-medium text-2xl md:text-3xl text-[#c9a227]">
                &apos;26
              </span>
            </Link>
          )}

          {/* Right side - Login / Sign up or Logout */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-sm tracking-[0.2em] uppercase text-[#fafaf9]/70 hover:text-[#c9a227] transition-colors"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-sm tracking-[0.2em] uppercase text-[#0a0a0a] bg-[#c9a227] px-6 py-2 rounded-full hover:bg-[#f4cf4a] transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-xs tracking-widest uppercase text-[#c9a227] font-medium border-r border-[#c9a227]/30 pr-4">
                  {user?.first_name || 'Survivor'}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="text-sm tracking-[0.2em] uppercase text-[#fafaf9]/70 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* 3/4 screen side menu */}
      <AnimatePresence>
        {isMenuOpen && (
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
                <span className="text-sm tracking-[0.2em] uppercase hidden md:block">
                  Close
                </span>
              </button>

              {/* Menu content */}
              <div className="h-full flex flex-col justify-center px-12 md:px-16 lg:px-20 relative">
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

                {/* Mobile-only Auth Links */}
                <motion.div 
                  className="mt-12 pt-8 border-t border-[#fafaf9]/10 md:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}>
                  
                  {!isAuthenticated ? (
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={() => { navigate("/login"); setIsMenuOpen(false); }}
                        className="text-left text-lg tracking-[0.1em] uppercase text-[#fafaf9]/70 hover:text-[#c9a227]"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => { navigate("/signup"); setIsMenuOpen(false); }}
                        className="text-left text-lg tracking-[0.1em] uppercase text-[#c9a227] font-bold"
                      >
                        Sign up
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <span className="text-[#c9a227] text-[10px] uppercase tracking-widest mb-1">Authenticated as</span>
                        <span className="text-[#fafaf9] text-xl font-display">{user?.first_name} {user?.last_name}</span>
                      </div>
                      <button
                        onClick={() => { logout(); setIsMenuOpen(false); }}
                        className="text-left text-lg tracking-[0.1em] uppercase text-red-500/80 hover:text-red-500 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Large decorative XYPHER */}
              <div className="absolute bottom-6 right-4 md:bottom-8 md:right-8 pointer-events-none select-none opacity-[0.03]">
                <span className="font-display text-[18vw] sm:text-[14vw] md:text-[10vw] lg:text-[8vw] text-[#fafaf9] tracking-[0.2em] leading-none">
                  XYPHER
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar