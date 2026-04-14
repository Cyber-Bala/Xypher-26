import { motion } from "framer-motion";

import SmokeEffect from "./SmokeEffect";






const EventDetail = ({ event, onBack }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}>
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(270_40%_10%)_0%,_hsl(270_20%_4%)_70%)]" />

      {/* Top bar */}
      <div className="relative z-30 flex items-center justify-between px-6 py-3 border-b border-primary/30">
        <div className="flex items-center gap-3">
          <span className="text-primary text-[10px]">◆</span>
          <div className="border border-primary/40 px-5 py-1">
            <span className="font-display text-xs tracking-[0.25em] uppercase text-primary font-semibold">
              The Outcome
            </span>
          </div>
          <span className="text-primary text-[10px]">◆</span>
          <div className="h-px w-20 md:w-40 bg-gradient-to-r from-primary/60 to-transparent" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-px w-20 md:w-40 bg-gradient-to-l from-primary/60 to-transparent" />
          <span className="text-primary text-[10px]">◆</span>
          <div className="border border-primary/40 px-5 py-1">
            <span className="font-display text-xs tracking-[0.25em] uppercase text-primary font-semibold">
              You Selected...
            </span>
          </div>
          <span className="text-primary text-[10px]">◆</span>
        </div>
      </div>

      {/* Left controls */}
      <div className="absolute left-5 top-20 z-30 flex flex-col gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors">
          
          ‹
        </button>
        <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary/50">
          <span className="text-xs">ⓘ</span>
        </div>
        <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary/50">
          <span className="text-xs">♪</span>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative z-20 flex h-[calc(100vh-52px)]">
        {/* Left: Event details */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-16">
          {/* Hexagon icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6">
            
            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
                <span className="text-primary/50 text-xs">◆</span>
                <div className="w-14 h-14 border-2 border-primary/50 flex items-center justify-center rotate-45">
                  <div className="w-10 h-10 border border-primary/30 flex items-center justify-center bg-card/80">
                    <span className="-rotate-45 text-primary text-lg">✦</span>
                  </div>
                </div>
                <span className="text-primary/50 text-xs">◆</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-cinzel text-4xl md:text-6xl font-bold text-foreground text-glow text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}>
            
            {event.detailTitle}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="font-display text-muted-foreground text-center text-lg md:text-xl leading-relaxed max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}>
            
            {event.detailDescription}
          </motion.p>

          {/* Details Grid */}
          {event.details && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}>
              {event.details.map((detail, idx) => (
                <div key={idx} className="flex flex-col border border-primary/20 bg-background/50 backdrop-blur-sm p-3 rounded-sm border-glow">
                  <span className="font-display text-xs uppercase tracking-widest text-primary/70 mb-1">{detail.label}</span>
                  <span className="font-display text-base md:text-lg text-foreground">{detail.value}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Tagline - rendered if it exists */}
          {event.detailTagline && (
            <motion.p
              className="font-display text-primary italic text-lg mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.5 }}>
              
              {event.detailTagline}
            </motion.p>
          )}

          {/* Continue button */}
          <motion.button
            className="flex items-center gap-3 border border-primary/50 px-10 py-3 rounded-full font-display uppercase tracking-[0.2em] text-sm text-primary hover:bg-primary/10 transition-colors border-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            onClick={onBack}>
            
            <span className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center">
              ▸
            </span>
            Continue
          </motion.button>
        </div>

        {/* Right: Selected card */}
        <motion.div
          className="hidden md:flex items-center justify-center w-[360px] pr-8"
          initial={{ x: -400, opacity: 0, rotate: -8 }}
          animate={{ x: 0, opacity: 1, rotate: 4 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
          
          <div className="w-72 h-[400px] relative rounded-lg border border-primary/40 bg-card overflow-hidden border-glow shadow-2xl">
            {/* Corner ornaments */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-primary/60" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-primary/60" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-primary/60" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-primary/60" />
            <div className="absolute inset-4 border border-primary/20 rounded" />

            {/* Decorative arcs */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-36 h-14">
              <svg viewBox="0 0 160 60" className="w-full h-full opacity-25">
                <path d="M20,55 Q80,5 140,55" fill="none" stroke="hsl(270, 80%, 60%)" strokeWidth="0.8" />
                <path d="M35,50 Q80,15 125,50" fill="none" stroke="hsl(270, 80%, 60%)" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Number */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <div className="bg-card border border-primary/50 px-4 py-1.5 mt-1">
                <span className="font-cinzel text-base text-primary font-bold">{event.number}</span>
              </div>
            </div>

            {/* Label */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2">
              <div className="border border-primary/50 overflow-hidden w-40 h-24">
                {event.image && (
                  <img src={event.image} alt={event.label} className="w-full h-full object-cover" />
                )}
              </div>
            </div>

            {/* Card content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-12">
              <h3 className="font-cinzel text-lg text-foreground font-bold mb-2 text-center text-glow-black">
                {event.title}
              </h3>
              <p className="font-display text-muted-foreground text-center text-sm leading-relaxed">
                {event.description}
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/10 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Smoke - denser on detail page */}
      <SmokeEffect density={80} />
    </motion.div>);

};

export default EventDetail;
