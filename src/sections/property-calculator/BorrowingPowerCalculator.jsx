import { useState } from 'react'
import { Users } from 'lucide-react'
import CustomSelect from '../../components/CustomSelect.jsx'
import { NumberInput, ResultCard, CalculateButton, BreakdownSection, ImprovementTipsSection, formatCurrency } from './utils.jsx'
import { calculateBorrowing } from './calculations.js'

function BorrowingPowerCalculator() {
  const [income, setIncome] = useState(100000)
  const [otherIncome, setOtherIncome] = useState(0)
  const [expenses, setExpenses] = useState(3000)
  const [debts, setDebts] = useState(0)
  const [dependents, setDependents] = useState(0)
  const [deposit, setDeposit] = useState(100000)
  const [results, setResults] = useState(null)

  const handleCalculate = () => {
    const calculation = calculateBorrowing({ income, otherIncome, expenses, debts, dependents, deposit })

    setResults({
      maxLoan: calculation.maxLoan,
      propertyBudget: calculation.propertyBudget,
      repayment: calculation.monthlyRepayment,
      dti: calculation.dti,
      netSurplus: calculation.netSurplus,
      monthlyIncome: calculation.monthlyIncome,
      monthlyExpenses: calculation.totalExpenses,
      debts: calculation.debts,
    })
  }

  const serviceabilityItems = results
    ? [
      { label: 'Gross monthly income', value: results.monthlyIncome, isNegative: false },
      { label: 'Monthly expenses', value: results.monthlyExpenses, isNegative: true },
      { label: 'Existing debt repayments', value: results.debts || 0, isNegative: true },
      { label: 'Available for mortgage', value: results.netSurplus, isNegative: false, isTotal: false},
      {
        label: 'Debt-to-income ratio',
        value: results.dti,
        isNegative: false,
        isTotal: true,
        formatValue: (val) => `${val.toFixed(1)}x`,
      },
    ]
    : []

  const improvementTips = [
    {
      label: 'Increase gross income by $10k',
      detail: `Potential extra borrowing ${formatCurrency(60000)}`,
      icon: '📈',
    },
    {
      label: 'Trim monthly expenses by $500',
      detail: `Frees up roughly ${formatCurrency(75000)} in capacity`,
      icon: '💰',
    },
    {
      label: 'Clear existing debt commitments',
      detail: `Could borrow ${formatCurrency(debts * 12 * 5)} more`,
      icon: '💳',
    },
    {
      label: 'Extend loan term to 30 years',
      detail: 'Maximizes serviceability',
      icon: '⏰',
    },
  ]

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      <header className="border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Borrowing Power Calculator</h2>
        <p className="mt-2 text-sm text-slate-600">Understand how much lenders may be willing to finance.</p>
      </header>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <NumberInput label="Annual income (before tax)" prefix="$" value={income} onChange={setIncome} />
        <NumberInput label="Other annual income" prefix="$" value={otherIncome} onChange={setOtherIncome} />
        <NumberInput label="Monthly expenses" prefix="$" value={expenses} onChange={setExpenses} />
        <NumberInput label="Existing debts (monthly)" prefix="$" value={debts} onChange={setDebts} />
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-500" />
            Dependents
          </span>
          <CustomSelect
            value={dependents}
            onChange={(e) => setDependents(Number(e.target.value))}
            options={[0, 1, 2, 3, 4, 5].map((option) => ({
              value: option,
              label: option.toString(),
            }))}
            placeholder="Select dependents"
          />
        </label>
        <NumberInput label="Deposit available" prefix="$" value={deposit} onChange={setDeposit} />
      </div>

      <CalculateButton onClick={handleCalculate}>Calculate borrowing power</CalculateButton>

      {results ? (
        <>
          <dl className="mt-8 grid gap-4 md:grid-cols-3">
            <ResultCard title="Maximum loan" value={formatCurrency(results.maxLoan)} />
            <ResultCard title="Property budget" value={formatCurrency(results.propertyBudget)} helper="Loan + deposit" />
            <ResultCard title="Monthly repayment" value={formatCurrency(results.repayment)} helper="@ 6.5%" />
          </dl>

          <BreakdownSection title="Serviceability assessment" items={serviceabilityItems} />

          <ImprovementTipsSection title="Ways to improve your borrowing power" tips={improvementTips} />

          <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5 text-sm text-amber-700">
            <strong className="font-semibold">Note:</strong> This is an estimate only. Actual borrowing capacity varies between lenders and depends on your credit history, employment stability, and other factors. Banks typically assess at a higher interest rate (buffer) than the current rate.
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          Add your income, expenses, and deposit to estimate borrowing power and lender buffers.
        </div>
      )}
    </div>
  )
}

export default BorrowingPowerCalculator

