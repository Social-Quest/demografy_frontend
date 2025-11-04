import { useEffect, useState } from 'react'
import StampDutyCalculator from './property-calculator/StampDutyCalculator.jsx'
import MortgageCalculator from './property-calculator/MortgageCalculator.jsx'
import BorrowingPowerCalculator from './property-calculator/BorrowingPowerCalculator.jsx'
import RentalYieldCalculator from './property-calculator/RentalYieldCalculator.jsx'
import AffordabilityCalculator from './property-calculator/AffordabilityCalculator.jsx'

const calculators = [
  { id: 'stamp-duty', label: 'Stamp Duty', component: StampDutyCalculator },
  { id: 'mortgage', label: 'Mortgage Repayment', component: MortgageCalculator },
  { id: 'borrowing', label: 'Borrowing Power', component: BorrowingPowerCalculator },
  { id: 'rental-yield', label: 'Rental Yield', component: RentalYieldCalculator },
  { id: 'affordability', label: 'Suburb Affordability', component: AffordabilityCalculator },
]

export default function PropertyCalculator() {
  const [activeCalculator, setActiveCalculator] = useState(calculators[0].id)
  const ActiveComponent = calculators.find((calc) => calc.id === activeCalculator)?.component

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.08),_transparent_55%)] py-20 md:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-4 md:px-6">
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#ede9fe] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Calculators
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 md:text-5xl">
            Property calculators to back every decision
          </h2>
          <p className="mt-3 text-sm text-slate-600 md:text-base">
            From stamp duty to rental yield—use Australian-specific tools to stress-test your next move.
          </p>
        </header>

        <nav className="flex flex-wrap justify-center gap-3">
          {calculators.map((calc) => (
            <button
              key={calc.id}
              type="button"
              onClick={() => setActiveCalculator(calc.id)}
              className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition ${
                activeCalculator === calc.id
                  ? 'border-transparent bg-[#8b5cf6] text-white shadow-lg shadow-primary/30'
                  : 'border-transparent bg-white/70 text-primary/70 hover:text-primary hover:shadow'
              }`}
            >
              {calc.label}
            </button>
          ))}
        </nav>

        {ActiveComponent ? <ActiveComponent /> : null}
      </div>
    </section>
  )
}

