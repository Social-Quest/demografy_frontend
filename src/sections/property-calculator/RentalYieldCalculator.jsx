import { useMemo, useState } from 'react'
import { NumberInput, ResultCard, formatCurrency, formatPercent } from './utils.jsx'

function RentalYieldCalculator() {
  const [propertyValue, setPropertyValue] = useState(750000)
  const [weeklyRent, setWeeklyRent] = useState(600)
  const [rates, setRates] = useState(2000)
  const [insurance, setInsurance] = useState(1500)
  const [management, setManagement] = useState(7)
  const [maintenance, setMaintenance] = useState(3000)

  const results = useMemo(() => {
    const annualRent = weeklyRent * 52
    const managementFee = annualRent * (management / 100)
    const totalExpenses = managementFee + rates + insurance + maintenance
    const netIncome = annualRent - totalExpenses
    const grossYield = (annualRent / propertyValue) * 100
    const netYield = (netIncome / propertyValue) * 100

    return {
      annualRent,
      managementFee,
      totalExpenses,
      netIncome,
      grossYield,
      netYield,
    }
  }, [propertyValue, weeklyRent, rates, insurance, management, maintenance])

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      <header className="border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Rental Yield Calculator</h2>
        <p className="mt-2 text-sm text-slate-600">Gauge the returns on your investment property after expenses.</p>
      </header>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <NumberInput label="Property value" prefix="$" value={propertyValue} onChange={setPropertyValue} />
        <NumberInput label="Weekly rent" prefix="$" value={weeklyRent} onChange={setWeeklyRent} />
        <NumberInput label="Annual council rates" prefix="$" value={rates} onChange={setRates} />
        <NumberInput label="Annual insurance" prefix="$" value={insurance} onChange={setInsurance} />
        <NumberInput label="Management (%)" prefix="%" value={management} onChange={setManagement} />
        <NumberInput label="Annual maintenance" prefix="$" value={maintenance} onChange={setMaintenance} />
      </div>

      <dl className="mt-8 grid gap-4 md:grid-cols-3">
        <ResultCard title="Gross yield" value={formatPercent(results.grossYield)} helper="Before expenses" />
        <ResultCard title="Net yield" value={formatPercent(results.netYield)} helper="After expenses" />
        <ResultCard title="Annual cash flow" value={formatCurrency(results.netIncome)} />
      </dl>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Annual rental income</span>
          <span className="font-semibold text-slate-800">{formatCurrency(results.annualRent)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Management fees</span>
          <span>-{formatCurrency(results.managementFee)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total expenses</span>
          <span>-{formatCurrency(results.totalExpenses)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Net annual return</span>
          <span className="font-semibold text-primary">{formatCurrency(results.netIncome)}</span>
        </div>
      </div>
    </div>
  )
}

export default RentalYieldCalculator

