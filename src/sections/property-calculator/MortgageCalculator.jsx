import { useMemo, useState } from 'react'
import { Calendar } from 'lucide-react'
import CustomSelect from '../../components/CustomSelect.jsx'
import { NumberInput, RangeInput, ResultCard, formatCurrency } from './utils.jsx'

function MortgageCalculator() {
  const [loan, setLoan] = useState(600000)
  const [rate, setRate] = useState(6.5)
  const [term, setTerm] = useState(30)
  const [frequency, setFrequency] = useState('monthly')

  const results = useMemo(() => {
    const paymentsPerYear = frequency === 'monthly' ? 12 : frequency === 'fortnightly' ? 26 : 52
    const frequencyLabel = frequency === 'monthly' ? 'per month' : frequency === 'fortnightly' ? 'per fortnight' : 'per week'
    const periodicRate = rate / 100 / paymentsPerYear
    const totalPayments = term * paymentsPerYear
    const repayment =
      loan * (periodicRate * Math.pow(1 + periodicRate, totalPayments)) /
      (Math.pow(1 + periodicRate, totalPayments) - 1)
    const totalPaid = repayment * totalPayments
    const totalInterest = totalPaid - loan

    return {
      repayment,
      totalInterest,
      totalPaid,
      frequencyLabel,
    }
  }, [loan, rate, term, frequency])

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

      <dl className="mt-8 grid gap-4 md:grid-cols-3">
        <ResultCard title="Regular repayment" value={formatCurrency(results.repayment)} helper={results.frequencyLabel} />
        <ResultCard title="Total interest" value={formatCurrency(results.totalInterest)} helper="over loan term" />
        <ResultCard title="Total repayable" value={formatCurrency(results.totalPaid)} />
      </dl>
    </div>
  )
}

export default MortgageCalculator

