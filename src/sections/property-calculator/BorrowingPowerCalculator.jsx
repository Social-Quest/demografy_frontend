import { useMemo, useState } from 'react'
import { Users } from 'lucide-react'
import CustomSelect from '../../components/CustomSelect.jsx'
import { NumberInput, ResultCard, formatCurrency } from './utils.jsx'

function BorrowingPowerCalculator() {
  const [income, setIncome] = useState(100000)
  const [otherIncome, setOtherIncome] = useState(0)
  const [expenses, setExpenses] = useState(3000)
  const [debts, setDebts] = useState(0)
  const [dependents, setDependents] = useState(0)
  const [deposit, setDeposit] = useState(100000)

  const results = useMemo(() => {
    const totalIncome = income + otherIncome
    const monthlyIncome = totalIncome / 12
    const minLivingExpenses = 2000 + dependents * 500
    const monthlyExpenses = Math.max(expenses, minLivingExpenses)
    const netSurplus = monthlyIncome - monthlyExpenses - debts
    const incomeMultiple = totalIncome * 6
    const assessmentRate = 0.095
    const loanTermYears = 30
    const monthlyRate = assessmentRate / 12
    const paymentPeriods = loanTermYears * 12
    const maxLoanServiceability = (netSurplus * (Math.pow(1 + monthlyRate, paymentPeriods) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, paymentPeriods))
    const maxLoan = Math.max(0, Math.min(incomeMultiple, maxLoanServiceability))
    const propertyBudget = maxLoan + deposit

    const currentRate = 0.065
    const currentMonthlyRate = currentRate / 12
    const repayment = maxLoan * (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, paymentPeriods)) /
      (Math.pow(1 + currentMonthlyRate, paymentPeriods) - 1)
    const dti = maxLoan / totalIncome

    return {
      maxLoan,
      propertyBudget,
      repayment,
      dti,
      netSurplus,
      monthlyIncome,
      monthlyExpenses,
    }
  }, [income, otherIncome, expenses, debts, dependents, deposit])

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

      <dl className="mt-8 grid gap-4 md:grid-cols-3">
        <ResultCard title="Maximum loan" value={formatCurrency(results.maxLoan)} />
        <ResultCard title="Property budget" value={formatCurrency(results.propertyBudget)} helper="Loan + deposit" />
        <ResultCard title="Monthly repayment" value={formatCurrency(results.repayment)} helper="@ 6.5%" />
      </dl>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Debt-to-income ratio</span>
          <span className="font-semibold text-primary">{results.dti.toFixed(1)}x</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Monthly income</span>
          <span>{formatCurrency(results.monthlyIncome)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Monthly expenses</span>
          <span>-{formatCurrency(results.monthlyExpenses)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Available for mortgage</span>
          <span className="font-semibold text-slate-800">{formatCurrency(results.netSurplus)}</span>
        </div>
      </div>
    </div>
  )
}

export default BorrowingPowerCalculator

