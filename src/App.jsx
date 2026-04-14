// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"

// pages
import HomePage from "./pages/HomePage"
import EventsPage from "./pages/EventsPage"
import NotFound from "./pages/NotFound.jsx" // or create a simple one if you don't have it yet

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App