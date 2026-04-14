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
    detailDescription: "A high-stakes, fast-paced hacking competition designed to test your real-world security skills. Navigate through complex challenges in cryptography, reverse engineering, web exploitation, and digital forensics to secure the ultimate victory.",
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
    detailDescription: "Experience the ultimate test of teamwork and synchronicity where communication is key. One teammate acts as the 'Visionary' describing a secret design verbally, while the other acts as the 'Architect' coding the interface without ever seeing the layout.",
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
    detailDescription: "A grand stage to showcase your technical ingenuity and practical problem-solving skills. Present your prototypes, research projects, or software solutions to a panel of experts and compete with implementations that have real-world impact.",
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
    detailDescription: "Master the art of data storytelling in this comprehensive hands-on workshop. Learn how to transform raw datasets into compelling visual narratives using Microsoft Power BI, covering everything from data cleaning to advanced dashboard creation.",
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
    detailDescription: "Combine strategic bidding with rapid development in this unique competitive challenge. Participate in a high-stakes auction to secure essential tech resources and then race against the clock to build an innovative project using only the tools you've acquired.",
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
    detailDescription: "Embark on an exhilarating journey that tests your logic, knowledge, and collaborative spirit. Decipher complex technical riddles, solve intricate puzzles, and race through multiple stages in a quest to uncover the ultimate digital treasure.",
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
    detailDescription: "Put your coding skills to the test by building functional applications that solve real-world problems. From conceptualization to implementation, this challenge pushes you to create user-centric mobile or web solutions under tight performance and time constraints.",
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
    detailDescription: "Bridge the gap between development and operations in this deep-dive workshop. Gain practical experience with modern CI/CD pipelines, containerization tools like Docker, and automated deployment strategies that define today's software engineering landscape.",
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
      <section className="relative min-h-screen flex flex-col items-center py-24 overflow-hidden isolate">
        {/* Layer 0: Fixed Background Glow - ensures no sharp cutoffs on tall pages */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(45_10%_8%)_0%,_hsl(45_5%_4%)_80%)] z-0" />

        {/* Layer 10: Section Content */}
        <div className="relative z-20 flex flex-col items-center w-full">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
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
          <div className="w-full">
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
        </div>
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
