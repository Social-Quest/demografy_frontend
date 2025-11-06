import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GradientButton from './GradientButton.jsx'
import menuIcon from '../assets/viewBox.svg'
import closeIcon from '../assets/close.svg'
import logo from '../assets/logo.svg'

const navigation = [
  { id: 'hero', label: 'Home', route: '/' },
  { id: 'features', label: 'Features' },
  { id: 'use-case', label: 'Use Case' },
  { id: 'integrations', label: 'Integration' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'career', label: 'Career', route: '/career' },
  { id: 'property-calculator', label: 'Property Calculator', route: '/calculators' },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])
  const handleScrollTo = (sectionId, route) => {
    if (route) {
      navigate(route)
      return
    }
    const el = document.getElementById(sectionId)
    if (el) {
      // Calculate offset for fixed header based on screen size
      const baseOffset = window.innerWidth >= 1024 ? 100 : window.innerWidth >= 768 ? 80 : 70
      const targetPosition = el.getBoundingClientRect().top + window.scrollY - baseOffset
      window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full backdrop-blur-[10px] bg-[rgba(255,255,255,0.65)] opacity-100">
      <div className="flex w-full items-center px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-5 xl:px-24 xl:py-6">
        {/* Left: Logo */}
        <div className="flex min-w-0 flex-1 items-center">
          <button
            type="button"
            className="flex items-center cursor-pointer"
            onClick={() => {
              navigate('/')
              closeMenu()
            }}
          >
            <img 
              src={logo} 
              alt="Demografy Logo" 
              className="h-9 w-auto"
            />
          </button>
        </div>

        {/* Center: Menu (desktop only) */}
        <nav className="hidden flex-1 items-center justify-center gap-8 text-base font-medium text-secondary xl:flex whitespace-nowrap">
          {navigation.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleScrollTo(item.id, item.route)}
              className="transition-colors duration-150 hover:text-black cursor-pointer whitespace-nowrap text-secondary"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Login/Signup buttons (desktop only) and Hamburger (mobile & laptop) */}
        <div className="ml-4 flex min-w-0 flex-1 items-center justify-end gap-3">
          <div className="hidden xl:flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 rounded-xl font-medium text-base text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
            >
              Login
            </button>
            <GradientButton onClick={() => navigate('/signup')} showIcon={false}>
              Signup
            </GradientButton>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 transition hover:ring-slate-300 xl:hidden cursor-pointer"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <img
              src={isMenuOpen ? closeIcon : menuIcon}
              alt=""
              className="h-5 w-5"
            />
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="px-4 pb-4 xl:hidden">
          <div className="space-y-4 rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(21,12,81,0.12)] ring-1 ring-slate-100">
            <nav className="flex flex-col gap-3 text-base font-medium text-secondary">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="rounded-xl px-2 py-2 text-left transition-colors duration-150 hover:bg-slate-100 hover:text-primary cursor-pointer"
                  onClick={() => {
                    handleScrollTo(item.id, item.route)
                    closeMenu()
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  navigate('/login')
                  closeMenu()
                }}
                className="w-full px-5 py-2.5 rounded-xl font-medium text-base text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
              >
                Login
              </button>
              <GradientButton
                className="w-full justify-center"
                onClick={() => {
                  navigate('/signup')
                  closeMenu()
                }}
                showIcon={false}
              >
                Signup
              </GradientButton>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Header


