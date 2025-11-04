import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, User, Edit, ChevronDown, Lock } from 'lucide-react'
import menuIcon from '../assets/viewBox.svg'
import closeIcon from '../assets/close.svg'
import { getCurrentUser, logout } from '../services/authApi.js'
import { getUser } from '../utils/tokenStorage.js'

function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [userName, setUserName] = useState('User')
  const navigate = useNavigate()
  const profileRef = useRef(null)

  // Get username from stored user data or API
  const getUserName = (user) => {
    if (!user) return 'User'
    return user.name || user.fullName || user.username || user.email || 'User'
  }

  // Fetch user data on mount
  useEffect(() => {
    const storedUser = getUser()
    if (storedUser) {
      setUserName(getUserName(storedUser))
    }

    // Then fetch from API to get latest data
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser()
        if (user) {
          setUserName(getUserName(user))
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
        if (!storedUser) {
          setUserName('User')
        }
      }
    }
    fetchUser()
  }, [])

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProfileOpen])

  const handleLogout = () => {
    logout() // Clear token and user data from storage
    navigate('/login')
    closeMenu()
    setIsProfileOpen(false)
  }

  const handleEdit = () => {
    setIsProfileOpen(false)
    closeMenu()
    navigate('/edit-profile')
  }

  const handleChangePassword = () => {
    setIsProfileOpen(false)
    closeMenu()
    navigate('/forgot-password')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full backdrop-blur-[10px] bg-[rgba(255,255,255,0.65)] border-b border-[#e5e7eb]">
      <div className="flex w-full items-center px-4 py-3 md:px-6 md:py-4 lg:px-8">
        {/* Left: Logo */}
        <div className="flex min-w-0 flex-1 items-center">
          <Link to="/" className="flex items-center gap-2.5 md:gap-3" onClick={closeMenu}>
            <span className="relative flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#9b72f7_0%,_#8b5cf6_100%)]">
              <span className="absolute inset-0.5 md:inset-1 rounded-full bg-white/95" />
              <span className="relative flex h-3 w-3 md:h-4 md:w-4 items-center justify-center rounded-full bg-[linear-gradient(135deg,#9b72f7_0%,_#8b5cf6_100%)]" />
            </span>
            <span className="text-base md:text-lg font-semibold text-slate-900">Demografy</span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="ml-4 flex min-w-0 flex-1 items-center justify-end gap-3 md:gap-4">
          {/* Profile dropdown - Desktop */}
          <div className="hidden md:flex items-center relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 md:py-2 rounded-lg transition-all hover:bg-slate-50 cursor-pointer"
              aria-label="Profile menu"
              aria-expanded={isProfileOpen}
            >
              <span className="text-sm md:text-base font-medium text-slate-700 truncate max-w-[120px] md:max-w-[200px]">
                {userName}
              </span>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center h-8 w-8 md:h-9 md:w-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-sm ring-1 ring-purple-200">
                  <User className="h-4 w-4 md:h-4 md:w-4" />
                </div>
                <ChevronDown className={`h-3.5 w-3.5 md:h-4 md:w-4 text-slate-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Profile dropdown menu */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-48 rounded-xl bg-white shadow-[0_12px_40px_rgba(21,12,81,0.12)] ring-1 ring-slate-100 overflow-hidden z-[60]"
                >
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer"
                    >
                      <Edit className="h-4 w-4 text-slate-500" />
                      Edit Profile
                    </button>
                    <button
                      type="button"
                      onClick={handleChangePassword}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer"
                    >
                      <Lock className="h-4 w-4 text-slate-500" />
                      Change Password
                    </button>
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 text-red-500" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 transition hover:ring-slate-300 md:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <img
              src={isMenuOpen ? closeIcon : menuIcon}
              alt=""
              className="h-4 w-4 md:h-5 md:w-5"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-4 md:hidden overflow-hidden"
          >
            <div className="space-y-3 rounded-2xl bg-white p-4 shadow-[0_12px_40px_rgba(21,12,81,0.12)] ring-1 ring-slate-100">
              <button
                type="button"
                onClick={handleEdit}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 cursor-pointer"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
              <button
                type="button"
                onClick={handleChangePassword}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 cursor-pointer"
              >
                <Lock className="h-4 w-4" />
                Change Password
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default DashboardHeader

