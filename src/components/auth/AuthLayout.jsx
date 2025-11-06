import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'

function AuthLayout({ title, subtitle, children, footerLinks = [] }) {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-[#f8faff]">
      <div className="mx-auto flex min-h-screen w-full max-w-[700px] flex-col justify-center px-4 py-12 md:px-6">
        <section className="w-full rounded-[32px] border border-[#e5e7eb] bg-white p-8 shadow-md md:p-12">
          <header className="mb-8 space-y-3">
            <div className="flex items-center justify-center mb-4">
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
            <span className="inline-flex items-center gap-2 rounded-full bg-[#ede9fe] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" /> Secure Portal
            </span>
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">{title}</h1>
            {subtitle ? <p className="text-sm text-[#4b5563] md:text-base">{subtitle}</p> : null}
          </header>

          <div className="space-y-6">{children}</div>

          {footerLinks.length ? (
            <footer className="mt-10 space-y-2 text-sm text-[#4b5563]">
              {footerLinks.map(({ label, linkText, to }) => (
                <p key={`${label}-${to}`}>
                  {label}{' '}
                  <Link to={to} className="font-medium text-primary hover:underline">
                    {linkText}
                  </Link>
                </p>
              ))}
            </footer>
          ) : null}
        </section>

      </div>
    </main>
  )
}

export default AuthLayout

