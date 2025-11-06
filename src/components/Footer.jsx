import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="w-full border-t border-slate-200/60 bg-white/80 backdrop-blur-[10px] shadow-[0_-4px_6px_0_rgba(30,7,81,0.06)]">
      <div className="mx-auto flex w-full flex-col justify-between items-center gap-4 px-4 py-6 text-center md:px-6 lg:px-1 xl:px-24 lg:flex-row lg:justify-between lg:items-center">
        {/* Logo */}
        <div className="flex items-center">
          <button
            type="button"
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img 
              src={logo} 
              alt="Demografy Logo" 
              className="h-9 w-auto"
            />
          </button>
        </div>

        {/* Text */}
        <p className="text-sm text-secondary md:text-base">
          © 2025 Demografy. All rights reserved.
        </p>

      </div>
    </footer>
  )
}

export default Footer


