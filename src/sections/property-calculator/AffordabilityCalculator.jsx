import { useMemo, useState } from 'react'
import { MapPin } from 'lucide-react'
import CustomSelect from '../../components/CustomSelect.jsx'
import { NumberInput, RangeInput, ResultCard, formatCurrency } from './utils.jsx'

const suburbData = {
  NSW: [
    { name: 'Penrith', median: 750000, growth: 8.2 },
    { name: 'Liverpool', median: 680000, growth: 9.1 },
    { name: 'Blacktown', median: 720000, growth: 7.5 },
    { name: 'Campbelltown', median: 650000, growth: 8.8 },
    { name: 'Wollongong', median: 780000, growth: 6.9 },
  ],
  VIC: [
    { name: 'Werribee', median: 550000, growth: 9.5 },
    { name: 'Melton', median: 480000, growth: 10.2 },
    { name: 'Craigieburn', median: 520000, growth: 8.9 },
    { name: 'Pakenham', median: 510000, growth: 9.3 },
    { name: 'Geelong', median: 590000, growth: 7.8 },
  ],
  QLD: [
    { name: 'Logan', median: 520000, growth: 11.2 },
    { name: 'Ipswich', median: 480000, growth: 10.8 },
    { name: 'Caboolture', median: 510000, growth: 9.7 },
    { name: 'Redcliffe', median: 680000, growth: 8.5 },
    { name: 'Gold Coast', median: 750000, growth: 7.9 },
  ],
  SA: [
    { name: 'Salisbury', median: 420000, growth: 7.5 },
    { name: 'Playford', median: 380000, growth: 8.2 },
    { name: 'Onkaparinga', median: 480000, growth: 6.9 },
    { name: 'Port Adelaide', median: 450000, growth: 7.8 },
  ],
  WA: [
    { name: 'Rockingham', median: 480000, growth: 9.2 },
    { name: 'Mandurah', median: 450000, growth: 8.7 },
    { name: 'Armadale', median: 420000, growth: 9.5 },
    { name: 'Joondalup', median: 550000, growth: 7.8 },
  ],
  TAS: [
    { name: 'Glenorchy', median: 480000, growth: 7.2 },
    { name: 'Clarence', median: 520000, growth: 6.8 },
    { name: 'Kingborough', median: 580000, growth: 6.5 },
  ],
  ACT: [
    { name: 'Belconnen', median: 680000, growth: 5.8 },
    { name: 'Tuggeranong', median: 650000, growth: 6.2 },
    { name: 'Gungahlin', median: 720000, growth: 6.5 },
  ],
  NT: [
    { name: 'Palmerston', median: 480000, growth: 6.5 },
    { name: 'Darwin Suburbs', median: 550000, growth: 5.8 },
    { name: 'Alice Springs', median: 420000, growth: 4.2 },
  ],
}

function AffordabilityCalculator() {
  const [income, setIncome] = useState(120000)
  const [deposit, setDeposit] = useState(100000)
  const [expenses, setExpenses] = useState(4000)
  const [rate, setRate] = useState(6.5)
  const [term, setTerm] = useState(30)
  const [state, setState] = useState('NSW')

  const results = useMemo(() => {
    const monthlyIncome = income / 12
    const netSurplus = monthlyIncome - expenses
    const maxLoanIncome = income * 6
    const monthlyRate = rate / 100 / 12
    const totalPayments = term * 12
    const maxLoanServiceability = (netSurplus * (Math.pow(1 + monthlyRate, totalPayments) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))
    const maxLoan = Math.max(0, Math.min(maxLoanIncome, maxLoanServiceability))
    const maxPrice = maxLoan + deposit
    const stampDuty = maxPrice * 0.04
    const otherCosts = maxPrice * 0.01
    const affordablePrice = maxPrice - stampDuty - otherCosts
    const repayment = maxLoan * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1)

    return {
      maxLoan,
      affordablePrice,
      repayment,
      stampDuty,
      otherCosts,
      maxPrice,
    }
  }, [income, deposit, expenses, rate, term])

  const suburbs = suburbData[state]
  const affordable = suburbs.filter((suburb) => suburb.median <= results.affordablePrice)
  const stretch = suburbs.filter(
    (suburb) => suburb.median > results.affordablePrice && suburb.median <= results.affordablePrice * 1.15,
  )

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      <header className="border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Suburb Affordability Calculator</h2>
        <p className="mt-2 text-sm text-slate-600">Discover which areas fit your budget and borrowing capacity.</p>
      </header>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <NumberInput label="Household income" prefix="$" value={income} onChange={setIncome} />
        <NumberInput label="Deposit saved" prefix="$" value={deposit} onChange={setDeposit} />
        <NumberInput label="Monthly expenses" prefix="$" value={expenses} onChange={setExpenses} />
        <RangeInput
          label="Estimated interest rate (%)"
          value={rate}
          onChange={setRate}
          min={4}
          max={9}
          step={0.1}
          formatValue={(val) => val.toFixed(1)}
          suffix="%"
        />
        <RangeInput
          label="Loan term (years)"
          value={term}
          onChange={setTerm}
          min={15}
          max={30}
          step={5}
          suffix="y"
        />
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-500" />
            State / Territory
          </span>
          <CustomSelect
            value={state}
            onChange={(e) => setState(e.target.value)}
            options={Object.keys(suburbData).map((key) => ({
              value: key,
              label: key,
            }))}
            placeholder="Select state"
          />
        </label>
      </div>

      <dl className="mt-8 grid gap-4 md:grid-cols-3">
        <ResultCard title="Maximum property price" value={formatCurrency(results.affordablePrice)} />
        <ResultCard title="Maximum loan" value={formatCurrency(results.maxLoan)} />
        <ResultCard title="Monthly repayment" value={formatCurrency(results.repayment)} helper={`at ${rate.toFixed(1)}%`} />
      </dl>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600 space-y-3">
        <div className="flex items-center justify-between">
          <span>Deposit</span>
          <span>{formatCurrency(deposit)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Estimated stamp duty</span>
          <span>{formatCurrency(results.stampDuty)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Other costs (1%)</span>
          <span>{formatCurrency(results.otherCosts)}</span>
        </div>
        <div className="flex items-center justify-between font-semibold text-slate-800">
          <span>Total budget</span>
          <span>{formatCurrency(results.maxPrice)}</span>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-inner">
        <h3 className="text-lg font-semibold text-slate-900">
          Affordable suburbs in <span className="text-primary">{state}</span>
        </h3>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          {affordable.length > 0 ? (
            <div>
              <p className="mb-2 font-semibold text-emerald-600">✅ Within your budget</p>
              <div className="space-y-2">
                {affordable.map((suburb) => (
                  <div key={suburb.name} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span>{suburb.name}</span>
                    <span>{formatCurrency(suburb.median)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {stretch.length > 0 ? (
            <div className="mt-5">
              <p className="mb-2 font-semibold text-amber-600">⚠️ Stretch targets (within 15%)</p>
              <div className="space-y-2">
                {stretch.map((suburb) => (
                  <div key={suburb.name} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span>{suburb.name}</span>
                    <span>{formatCurrency(suburb.median)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {affordable.length === 0 && stretch.length === 0 ? (
            <div className="rounded-xl bg-amber-50 px-4 py-3 text-amber-600">
              Based on your current settings, consider increasing your deposit or exploring regional hubs for better value.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default AffordabilityCalculator

