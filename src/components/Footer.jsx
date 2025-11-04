import GradientButton from './GradientButton.jsx'

function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/60 bg-white/80 backdrop-blur-[10px] shadow-[0_-4px_6px_0_rgba(30,7,81,0.06)]">
      <div className="mx-auto flex w-full flex-col justify-between items-center gap-4 px-4 py-6 text-center md:px-6 lg:px-1 xl:px-24 lg:flex-row lg:justify-between lg:items-center">
        {/* Logo */}
        <div className="flex items-center">
          <span className="flex items-center gap-3">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#9b72f7_0%,_#8b5cf6_100%)]">
              <span className="absolute inset-1 rounded-full bg-white/95" />
              <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-[linear-gradient(135deg,#9b72f7_0%,_#8b5cf6_100%)]" />
            </span>
            <span className="text-lg font-semibold text-slate-900">Demografy</span>
          </span>
        </div>

        {/* Text */}
        <p className="text-sm text-secondary md:text-base">
          Designed and built with love • All rights reserved Andrea Montini | Copyright© 2024
        </p>

        {/* Button */}
        <div className="flex justify-center">
          <GradientButton className="w-full max-w-xs justify-center lg:max-w-none">Get this Template</GradientButton>
        </div>
      </div>
    </footer>
  )
}

export default Footer


