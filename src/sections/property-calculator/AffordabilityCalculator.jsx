import { useState } from 'react'
import { MapPin } from 'lucide-react'
import CustomSelect from '../../components/CustomSelect.jsx'
import { NumberInput, RangeInput, ResultCard, CalculateButton, BreakdownSection, AffordableSuburbsSection, formatCurrency } from './utils.jsx'
import { calculateAffordability } from './calculations.js'

const suburbData = {
  NSW: [
    { name: 'Penrith', median: 750000, growth: 8.2 },
    { name: 'Liverpool', median: 680000, growth: 9.1 },
    { name: 'Blacktown', median: 720000, growth: 7.5 },
    { name: 'Campbelltown', median: 650000, growth: 8.8 },
    { name: 'Wollongong', median: 780000, growth: 6.9 },
    { name: 'Newcastle', median: 700000, growth: 7.2 },
  ],
  VIC: [
    { name: 'Werribee', median: 550000, growth: 9.5 },
    { name: 'Melton', median: 480000, growth: 10.2 },
    { name: 'Craigieburn', median: 520000, growth: 8.9 },
    { name: 'Pakenham', median: 510000, growth: 9.3 },
    { name: 'Geelong', median: 590000, growth: 7.8 },
    { name: 'Ballarat', median: 470000, growth: 8.1 },
  ],
  QLD: [
    { name: 'Logan', median: 520000, growth: 11.2 },
    { name: 'Ipswich', median: 480000, growth: 10.8 },
    { name: 'Caboolture', median: 510000, growth: 9.7 },
    { name: 'Redcliffe', median: 680000, growth: 8.5 },
    { name: 'Gold Coast', median: 750000, growth: 7.9 },
    { name: 'Sunshine Coast', median: 780000, growth: 8.2 },
  ],
  SA: [
    { name: 'Salisbury', median: 420000, growth: 7.5 },
    { name: 'Playford', median: 380000, growth: 8.2 },
    { name: 'Onkaparinga', median: 480000, growth: 6.9 },
    { name: 'Port Adelaide', median: 450000, growth: 7.8 },
    { name: 'Tea Tree Gully', median: 510000, growth: 6.5 },
  ],
  WA: [
    { name: 'Rockingham', median: 480000, growth: 9.2 },
    { name: 'Mandurah', median: 450000, growth: 8.7 },
    { name: 'Armadale', median: 420000, growth: 9.5 },
    { name: 'Joondalup', median: 550000, growth: 7.8 },
    { name: 'Wanneroo', median: 520000, growth: 8.3 },
  ],
  TAS: [
    { name: 'Glenorchy', median: 480000, growth: 7.2 },
    { name: 'Clarence', median: 520000, growth: 6.8 },
    { name: 'Kingborough', median: 580000, growth: 6.5 },
    { name: 'Launceston', median: 450000, growth: 7.5 },
  ],
  ACT: [
    { name: 'Belconnen', median: 680000, growth: 5.8 },
    { name: 'Tuggeranong', median: 650000, growth: 6.2 },
    { name: 'Gungahlin', median: 720000, growth: 6.5 },
    { name: 'Weston Creek', median: 780000, growth: 5.5 },
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
  const [results, setResults] = useState(null)

  const handleCalculate = () => {
    setResults(calculateAffordability({ income, deposit, expenses, rate, term }))
  }

  const affordabilityItems = results
    ? [
        { label: 'Your Deposit', value: deposit, isNegative: false },
        { label: 'Maximum Loan (6x income rule)', value: results.maxLoan, isNegative: false },
        { label: 'Estimated Stamp Duty', value: results.stampDuty, isNegative: false },
        { label: 'Other Costs (1% of price)', value: results.otherCosts, isNegative: false },
        { label: 'Maximum Affordable Price', value: results.affordablePrice, isNegative: false, isTotal: true },
      ]
    : []

  const suburbs = suburbData[state]
  const affordable = results
    ? suburbs.filter((suburb) => suburb.median <= results.affordablePrice)
    : []
  const stretch = results
    ? suburbs.filter((suburb) => suburb.median > results.affordablePrice && suburb.median <= results.affordablePrice * 1.15)
    : []

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
            options={[
              { value: 'NSW', label: 'New South Wales' },
              { value: 'VIC', label: 'Victoria' },
              { value: 'QLD', label: 'Queensland' },
              { value: 'SA', label: 'South Australia' },
              { value: 'WA', label: 'Western Australia' },
              { value: 'TAS', label: 'Tasmania' },
              { value: 'ACT', label: 'Australian Capital Territory' },
              { value: 'NT', label: 'Northern Territory' },
            ]}
            placeholder="Select state"
          />
        </label>
      </div>

      <CalculateButton onClick={handleCalculate}>Calculate affordability</CalculateButton>

      {results ? (
        <>
          <dl className="mt-8 grid gap-4 md:grid-cols-3">
            <ResultCard title="Maximum property price" value={formatCurrency(results.affordablePrice)} />
            <ResultCard title="Maximum loan" value={formatCurrency(results.maxLoan)} />
            <ResultCard title="Monthly repayment" value={formatCurrency(results.monthlyRepayment)} helper={`at ${rate.toFixed(1)}%`} />
          </dl>

          <BreakdownSection title="Affordability Breakdown" items={affordabilityItems} />

          <AffordableSuburbsSection
            state={state}
            affordable={affordable}
            stretch={stretch}
            affordablePrice={results.affordablePrice}
            formatCurrency={formatCurrency}
          />

          <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5 text-sm text-amber-700">
            <strong className="font-semibold">Smart tip:</strong> We recommend keeping your mortgage repayments below 30% of your gross income for comfortable living. The suburbs shown are based on median prices and typical borrowing capacity in your selected state.
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          Enter your income, deposit, and rates to reveal suburb suggestions and affordability breakdown.
        </div>
      )}
    </div>
  )
}

export default AffordabilityCalculator

