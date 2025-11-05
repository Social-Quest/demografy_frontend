import { useState } from 'react'
import { Calendar } from 'lucide-react'
import CustomSelect from '../../components/CustomSelect.jsx'
import { NumberInput, RangeInput, ResultCard, CalculateButton, BreakdownSection, FrequencyComparisonSection, formatCurrency } from './utils.jsx'
import { calculateMortgage } from './calculations.js'

function MortgageCalculator() {
  const [loan, setLoan] = useState(600000)
  const [rate, setRate] = useState(6.5)
  const [term, setTerm] = useState(30)
  const [frequency, setFrequency] = useState('monthly')
  const [results, setResults] = useState(null)

  const handleCalculate = () => {
    setResults(calculateMortgage({ loan, rate, term, frequency }))
  }

  const summaryItems = results?.summary
    ? [
        { label: 'Loan amount', value: results.summary.loanAmount, formatValue: formatCurrency },
        { label: 'Interest rate', value: results.summary.interestRate, formatValue: (val) => `${val.toFixed(2)}% p.a.` },
        { label: 'Loan term', value: results.summary.termYears, formatValue: (val) => `${val} years` },
        { label: 'Total interest paid', value: results.summary.totalInterest, formatValue: formatCurrency },
        { label: 'Total amount repayable', value: results.summary.totalRepaid, formatValue: formatCurrency },
      ]
    : []

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      <header className="border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Mortgage Repayment Calculator</h2>
        <p className="mt-2 text-sm text-slate-600">See how your repayments change with rate, term and frequency.</p>
      </header>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <NumberInput label="Loan amount" prefix="$" value={loan} onChange={setLoan} />

        <RangeInput
          label="Interest rate (%)"
          value={rate}
          onChange={setRate}
          min={2}
          max={10}
          step={0.1}
          formatValue={(val) => val.toFixed(1)}
          suffix="%"
        />

        <RangeInput
          label="Loan term (years)"
          value={term}
          onChange={setTerm}
          min={5}
          max={30}
          step={1}
          suffix="y"
        />

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-500" />
            Repayment frequency
          </span>
          <CustomSelect
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'fortnightly', label: 'Fortnightly' },
              { value: 'weekly', label: 'Weekly' },
            ]}
            placeholder="Select frequency"
          />
        </label>
      </div>

      <CalculateButton onClick={handleCalculate}>Calculate repayments</CalculateButton>

      {results ? (
        <>
          <dl className="mt-8 grid gap-4 md:grid-cols-3">
            <ResultCard title="Regular repayment" value={formatCurrency(results.repayment)} helper={results.frequencyLabel} />
            <ResultCard title="Total interest" value={formatCurrency(results.totalInterest)} helper="over loan term" />
            <ResultCard title="Total repayable" value={formatCurrency(results.totalRepaid)} />
          </dl>

          <BreakdownSection title="Loan summary" items={summaryItems} />

          <FrequencyComparisonSection comparison={results.comparison} formatCurrency={formatCurrency} />

          <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5 text-sm text-amber-700">
            <strong className="font-semibold">Tip:</strong> Making repayments more frequently (weekly or fortnightly) can save you thousands in interest and help you pay off your loan faster!
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          Adjust the sliders, choose a frequency, then run the calculation to see repayments and loan summary.
        </div>
      )}
    </div>
  )
}

export default MortgageCalculator

