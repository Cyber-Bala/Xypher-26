// src/pages/EventsPage.jsx
import Navbar from "../components/Navbar"
import EventSection from "../components/EventSection"
import Footer from "../components/Footer"

function EventsPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen selection:bg-[#c9a227] selection:text-[#0a0a0a]">
      <Navbar />
      <EventSection />
      <Footer />
    </main>
  )
}

export default EventsPage