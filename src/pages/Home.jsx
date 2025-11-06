import { useEffect } from 'react'
import Hero from '../sections/Hero.jsx'
import Features from '../sections/Features.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import Integrations from '../sections/Integrations.jsx'
import Pricing from '../sections/Pricing.jsx'
import Who from '../sections/Who.jsx'

function Home() {
  useEffect(() => {
    // Check if there's a section to scroll to (set by Header when navigating from other pages)
    const sectionId = sessionStorage.getItem('scrollToSection')
    if (sectionId) {
      // Clear the sessionStorage
      sessionStorage.removeItem('scrollToSection')
      
      // Wait for the page to render, then scroll to the section
      // Use requestAnimationFrame for more reliable timing
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId)
          if (el) {
            // Calculate offset for fixed header based on screen size
            const baseOffset = window.innerWidth >= 1024 ? 100 : window.innerWidth >= 768 ? 80 : 70
            const targetPosition = el.getBoundingClientRect().top + window.scrollY - baseOffset
            window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' })
          }
        }, 150) // Delay to ensure DOM is fully ready
      })
    }
  }, [])

  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <Integrations />
      <Who />
      <Pricing />
    </>
  )
}

export default Home


