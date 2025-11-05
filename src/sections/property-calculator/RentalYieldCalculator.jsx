import { useState } from 'react'
import { NumberInput, ResultCard, CalculateButton, BreakdownSection, YieldComparisonSection, formatCurrency, formatPercent } from './utils.jsx'
import { calculateRentalYield } from './calculations.js'

function RentalYieldCalculator() {
  const [propertyValue, setPropertyValue] = useState(750000)
  const [weeklyRent, setWeeklyRent] = useState(600)
  const [rates, setRates] = useState(2000)
  const [insurance, setInsurance] = useState(1500)
  const [management, setManagement] = useState(7)
  const [maintenance, setMaintenance] = useState(3000)
  const [results, setResults] = useState(null)

  const handleCalculate = () => {
    setResults(
      calculateRentalYield({
        value: propertyValue,
        rent: weeklyRent,
        rates,
        insurance,
        management,
        maintenance,
      }),
    )
  }

  const incomeExpenseItems = results
    ? [
        { label: 'Annual Rental Income', value: results.annualRent, isNegative: false },
        { label: 'Property Management Fees', value: results.managementFee, isNegative: true },
        { label: 'Council Rates', value: results.councilRates, isNegative: true },
        { label: 'Insurance', value: results.insuranceCost, isNegative: true },
        { label: 'Maintenance & Repairs', value: results.maintenanceCost, isNegative: true },
        { label: 'Total Expenses', value: results.totalExpenses, isNegative: true },
        { label: 'Net Annual Return', value: results.netIncome, isNegative: false, isTotal: true },
      ]
    : []

  const comparisonBenchmarks = [
    { market: 'Sydney average', value: 2.8 },
    { market: 'Melbourne average', value: 3.2 },
    { market: 'Brisbane average', value: 4.1 },
    { market: 'Regional Australia average', value: 5.2 },
  ]

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

      <CalculateButton onClick={handleCalculate}>Calculate rental yield</CalculateButton>

      {results ? (
        <>
          <dl className="mt-8 grid gap-4 md:grid-cols-3">
            <ResultCard title="Gross yield" value={formatPercent(results.grossYield)} helper="Before expenses" />
            <ResultCard title="Net yield" value={formatPercent(results.netYield)} helper="After expenses" />
            <ResultCard title="Annual cash flow" value={formatCurrency(results.netIncome)} />
          </dl>

          <BreakdownSection title="Annual Income & Expenses" items={incomeExpenseItems} />

          <YieldComparisonSection
            currentYield={results.netYield}
            benchmarks={comparisonBenchmarks}
            formatPercent={formatPercent}
          />

          <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5 text-sm text-amber-700">
            <strong className="font-semibold">Good to know:</strong> Vacancy periods, capital growth, and future rate rises all influence returns.
            Stress-test your numbers before committing to a purchase.
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          Enter your rent and costs, then calculate to see gross/net yields and cash flow.
        </div>
      )}
    </div>
  )
}

export default RentalYieldCalculator

