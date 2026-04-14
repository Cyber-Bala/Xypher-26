// src/components/EventSection.jsx
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import EventCard from "./EventCard"
import EventDetail from "./EventDetail"
import SmokeEffect from "./SmokeEffect"

import imgCTF from "../assets/CTF.png"
import imgUIBlindfold from "../assets/ui_blindfold.png"
import imgProjectExpo from "../assets/project_expo.png"
import imgPowerBI from "../assets/power_bi_workshop.png"
import imgTechAuction from "../assets/tech_auction.png"
import imgTreasureHunt from "../assets/technical_treasurehunt.png"
import imgAppDev from "../assets/app_dev.png"
import imgDevOps from "../assets/dev_ops.png"

const events = [
  {
    number: "I",
    label: "CTF",
    title: "Cyber CTF",
    slug: "capture-the-flag",
    image: imgCTF,
    description: "Solve cybersecurity challenges in cryptography, web security, and forensics",
    detailTitle: "Capture The Flag",
    detailDescription: "A fast-paced hacking competition testing real-world security skills.",
    details: [
      { label: "Duration", value: "6 hours" },
      { label: "Team Size", value: "3-4 members" },
      { label: "Registration Fee", value: "₹250 (IEEE) / ₹300 (Non-IEEE)" },
      { label: "Expected Teams", value: "20" },
      { label: "Prize Pool", value: "₹6000" },
    ],
  },
  {
    number: "II",
    label: "Technical",
    title: "UI Blindfolded",
    slug: "building-ui-blindfolded",
    image: imgUIBlindfold,
    description: "One designs verbally, one codes blindly — testing communication and UI skills",
    detailTitle: "Building UI Blindfolded",
    detailDescription: "A communication-heavy UI challenge testing accuracy and teamwork.",
    details: [
      { label: "Duration", value: "3 hours" },
      { label: "Team Size", value: "2 members" },
      { label: "Registration Fee", value: "₹125 (IEEE) / ₹175 (Non-IEEE)" },
      { label: "Expected Teams", value: "20" },
      { label: "Prize Pool", value: "₹2500" },
    ],
  },
  {
    number: "III",
    label: "Technical",
    title: "Project Expo",
    slug: "project-expo",
    image: imgProjectExpo,
    description: "Showcase innovative real-world technical projects demonstrating practical applications",
    detailTitle: "Project Expo",
    detailDescription: "Present your ideas and compete with practical implementations.",
    details: [
      { label: "Duration", value: "3 hours" },
      { label: "Registration Fee", value: "₹175 (IEEE) / ₹150 (Non-IEEE)" },
      { label: "Expected Teams", value: "20" },
      { label: "Prize Pool", value: "₹3000" },
    ],
  },
  {
    number: "IV",
    label: "Workshop",
    title: "Power BI Workshop",
    slug: "power-bi-workshop",
    image: imgPowerBI,
    description: "Hands-on workshop introducing interactive dashboards using Power BI",
    detailTitle: "Power BI Workshop",
    detailDescription: "Hands-on session on data visualization and analytics.",
    details: [
      { label: "Duration", value: "2 hours" },
      { label: "Registration Fee", value: "Free (IEEE) / ₹150 (Non-IEEE)" },
      { label: "Expected Participants", value: "100" },
      { label: "Speaker", value: "Alumni" },
    ],
  },
  {
    number: "V",
    label: "Technical",
    title: "Mystery Tech Auction",
    slug: "mystery-tech-auction",
    image: imgTechAuction,
    description: "Bid for tech tools and build a project under constraints",
    detailTitle: "Mystery Tech Auction",
    detailDescription: "Strategy meets development in this unique auction-based challenge.",
    details: [
      { label: "Duration", value: "6 hours" },
      { label: "Team Size", value: "2-3 members" },
      { label: "Registration Fee", value: "₹250 (IEEE) / ₹300 (Non-IEEE)" },
      { label: "Expected Teams", value: "15" },
      { label: "Prize Pool", value: "₹6000" },
    ],
  },
  {
    number: "VI",
    label: "Technical",
    title: "Treasure Hunt",
    slug: "technical-treasure-hunt",
    image: imgTreasureHunt,
    description: "Follow technical clues and puzzles to progress through stages",
    detailTitle: "Technical Treasure Hunt",
    detailDescription: "A fun and challenging technical hunt testing logic and teamwork.",
    details: [
      { label: "Duration", value: "3 hours" },
      { label: "Team Size", value: "2-3 members" },
      { label: "Registration Fee", value: "₹250 (IEEE) / ₹300 (Non-IEEE)" },
      { label: "Expected Teams", value: "15" },
      { label: "Prize Pool", value: "₹2500" },
    ],
  },
  {
    number: "VII",
    label: "Technical",
    title: "App Development",
    slug: "app-development",
    image: imgAppDev,
    description: "Design and develop applications that address real-world problems",
    detailTitle: "App Development",
    detailDescription: "Design and develop functional apps under constraints.",
    details: [
      { label: "Team Size", value: "2-3 members" },
      { label: "Registration Fee", value: "₹125 (IEEE) / ₹175 (Non-IEEE)" },
      { label: "Expected Teams", value: "20" },
      { label: "Prize Pool", value: "₹2500" },
    ],
  },
  {
    number: "VIII",
    label: "Workshop",
    title: "DevOps Workshop",
    slug: "devops-workshop",
    image: imgDevOps,
    description: "Learn practical DevOps concepts, integration, and deployment",
    detailTitle: "DevOps Workshop",
    detailDescription: "Practical introduction to modern development workflows.",
    details: [
      { label: "Duration", value: "2 hours" },
      { label: "Registration Fee", value: "Free (IEEE) / ₹50 (Non-IEEE)" },
      { label: "Expected Participants", value: "150" },
      { label: "Speaker", value: "Alumni" },
    ],
  },
]

const EventSection = () => {
  const [selectedEvent, setSelectedEvent] = useState(null)

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden">
        {/* Background radial */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(45_40%_8%)_0%,_hsl(45_20%_4%)_70%)]" />

        {/* Section header */}
        <motion.div
          className="relative z-20 text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/60" />
            <span className="text-primary text-xs">◆</span>
            <div className="border border-primary/40 px-6 py-1.5">
              <span className="font-display text-xs tracking-[0.3em] uppercase text-primary/80">
                Choose Your Path
              </span>
            </div>
            <span className="text-primary text-xs">◆</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/60" />
          </div>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-foreground text-glow">
            Event Categories
          </h2>
          <p className="font-display text-muted-foreground mt-3 text-lg">
            Click a card to reveal what awaits within
          </p>
        </motion.div>

        {/* Categorized Cards */}
        <div className="w-full relative z-20">
          {Object.entries(
            events.reduce((acc, event) => {
              if (!acc[event.label]) acc[event.label] = []
              acc[event.label].push(event)
              return acc
            }, {})
          ).map(([category, categoryEvents]) => (
            <div key={category} className="mb-20 last:mb-0">
              <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-primary mb-10 text-center flex items-center justify-center gap-4">
                <span className="hidden md:block h-px w-24 bg-gradient-to-r from-transparent to-primary/60" />
                {category}
                <span className="hidden md:block h-px w-24 bg-gradient-to-l from-transparent to-primary/60" />
              </h3>
              <div className="flex flex-wrap justify-center gap-10 lg:gap-16 px-4 max-w-[1300px] mx-auto w-full">
                {categoryEvents.map((e, i) => (
                  <motion.div
                    key={`${e.number}-${i}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                  >
                    <EventCard event={e} onSelect={setSelectedEvent} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Smoke */}
        <SmokeEffect density={10} />
      </section>

      {/* Detail overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetail event={selectedEvent} onBack={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

export default EventSection
