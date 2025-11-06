import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Don't scroll to top if there's a section to scroll to (handled by Home component)
    const sectionId = sessionStorage.getItem('scrollToSection')
    if (!sectionId) {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

export default ScrollToTop

