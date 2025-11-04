import { Link, useNavigate } from 'react-router-dom'
import GradientButton from '../components/GradientButton.jsx'
import { Home, ArrowLeft } from 'lucide-react'

function NotFound() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4 py-12 md:py-16">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#9b72f7] to-[#8b5cf6] leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-sm bg-[#EDE9FE] px-3 py-1 text-xs font-semibold text-primary ring-1 ring-slate-200 tracking-widest uppercase mb-4 md:mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
              Page Not Found
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">
            Oops! This page doesn't exist
          </h2>
          <p className="text-base md:text-lg text-[#374151] max-w-xl mx-auto leading-relaxed">
            The page you're looking for might have been moved, deleted, or doesn't exist. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <GradientButton
            to="/"
            className="w-full sm:w-auto justify-center"
            showIcon={false}
          >
            Go to Homepage
          </GradientButton>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-50 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
            Login
          </button>
        </div>
      </div>
    </main>
  )
}

export default NotFound

