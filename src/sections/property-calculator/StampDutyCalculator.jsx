 import { useState } from 'react'
import { MapPin, Home, UserCheck } from 'lucide-react'
import CustomSelect from '../../components/CustomSelect.jsx'
import { NumberInput, ResultCard, CalculateButton, BreakdownSection, formatCurrency } from './utils.jsx'
import { calculateStampDuty } from './calculations.js'

function StampDutyCalculator() {
  const [price, setPrice] = useState(750000)
  const [state, setState] = useState('NSW')
  const [propertyType, setPropertyType] = useState('established')
  const [isFirstHomeBuyer, setIsFirstHomeBuyer] = useState('yes')
  const [results, setResults] = useState(null)

  const handleCalculate = () => {
    const calculation = calculateStampDuty({
      price,
      state,
      propertyType,
      firstHomeBuyer: isFirstHomeBuyer,
    })

    setResults({
      stampDuty: calculation.finalDuty,
      concession: calculation.concession,
      totalCosts: calculation.totalCosts,
      breakdown: {
        price,
        base: calculation.stampDuty,
        transferFee: calculation.transferFee,
        mortgageReg: calculation.mortgageReg,
        legalFees: calculation.legalFees,
        totalCosts: calculation.totalCosts,
      },
    })
  }

  const breakdownItems = results
    ? [
        { label: 'Property price', value: results.breakdown.price, isNegative: false },
        { label: 'Stamp duty (base)', value: results.breakdown.base, isNegative: false },
        { label: 'First home buyer concession', value: results.concession, isNegative: true },
        { label: 'Transfer fee', value: results.breakdown.transferFee, isNegative: false },
        { label: 'Mortgage registration', value: results.breakdown.mortgageReg, isNegative: false },
        { label: 'Legal fees (estimated)', value: results.breakdown.legalFees, isNegative: false },
        { label: 'Total upfront costs', value: results.breakdown.totalCosts, isNegative: false, isTotal: true, fontWeight: 'bold', labelFontWeight: 'semibold', labelColor: 'text-black' },
      ]
    : []

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      <header className="border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Stamp Duty Calculator</h2>
        <p className="mt-2 text-sm text-slate-600">Estimate government costs on your next purchase.</p>
      </header>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <NumberInput label="Property price" prefix="$" value={price} onChange={setPrice} />

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

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Home className="h-4 w-4 text-slate-500" />
            Property type
          </span>
          <CustomSelect
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            options={[
              { value: 'established', label: 'Established home' },
              { value: 'new', label: 'New home' },
              { value: 'land', label: 'Vacant land' },
              { value: 'investment', label: 'Investment property' },
            ]}
            placeholder="Select property type"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-slate-500" />
            First home buyer?
          </span>
          <CustomSelect
            value={isFirstHomeBuyer}
            onChange={(e) => setIsFirstHomeBuyer(e.target.value)}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            placeholder="Select option"
          />
        </label>
      </div>

      <CalculateButton onClick={handleCalculate}>Calculate stamp duty</CalculateButton>

      {results ? (
        <>
          <dl className="mt-8 grid gap-4 md:grid-cols-3">
            <ResultCard title="Stamp duty" value={formatCurrency(results.stampDuty)} />
            <ResultCard
              title="Concessions / savings"
              value={`${formatCurrency(results.concession)}`}
            />
            <ResultCard title="Total upfront costs" value={formatCurrency(results.totalCosts)} helper="Including base fees" />
          </dl>

          <BreakdownSection title="Cost breakdown" items={breakdownItems} />

          <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5 text-sm text-amber-700">
            <strong className="font-semibold">Note:</strong>Stamp duty rates and concessions vary by state and are subject to change. This calculator provides estimates based on current rates. Consult with a conveyancer for exact figures.
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          Enter your details and hit calculate to see duty, concessions, and a full cost breakdown.
        </div>
      )}
    </div>
  )
}

export default StampDutyCalculator

