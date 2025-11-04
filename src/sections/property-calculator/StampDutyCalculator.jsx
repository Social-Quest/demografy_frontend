import { useMemo, useState } from 'react'
import { NumberInput, ResultCard, formatCurrency } from './utils.jsx'

function StampDutyCalculator() {
  const [price, setPrice] = useState(750000)
  const [state, setState] = useState('NSW')
  const [propertyType, setPropertyType] = useState('established')
  const [isFirstHomeBuyer, setIsFirstHomeBuyer] = useState('yes')

  const results = useMemo(() => {
    let stampDuty = 0
    let concession = 0

    if (state === 'NSW') {
      if (price <= 14000) stampDuty = price * 0.0125
      else if (price <= 32000) stampDuty = 175 + (price - 14000) * 0.015
      else if (price <= 85000) stampDuty = 445 + (price - 32000) * 0.0175
      else if (price <= 319000) stampDuty = 1372.5 + (price - 85000) * 0.035
      else if (price <= 1064000) stampDuty = 9562.5 + (price - 319000) * 0.045
      else stampDuty = 43087.5 + (price - 1064000) * 0.055

      if (isFirstHomeBuyer === 'yes' && propertyType !== 'investment') {
        if (price <= 650000) concession = stampDuty
        else if (price <= 800000) concession = stampDuty * (800000 - price) / 150000
      }
    } else if (state === 'VIC') {
      if (price <= 25000) stampDuty = price * 0.014
      else if (price <= 130000) stampDuty = 350 + (price - 25000) * 0.024
      else if (price <= 960000) stampDuty = 2870 + (price - 130000) * 0.06
      else stampDuty = 52670 + (price - 960000) * 0.055

      if (isFirstHomeBuyer === 'yes' && propertyType !== 'investment') {
        if (price <= 600000) concession = stampDuty
        else if (price <= 750000) concession = stampDuty * (750000 - price) / 150000
      }
    } else {
      stampDuty = price * 0.04
      if (isFirstHomeBuyer === 'yes' && price <= 600000 && propertyType !== 'investment') {
        concession = stampDuty * 0.5
      }
    }

    const finalDuty = Math.max(0, stampDuty - concession)
    const transferFee = 150
    const mortgageReg = 120
    const legalFees = 1500
    const totalCosts = finalDuty + transferFee + mortgageReg + legalFees

    return {
      stampDuty: finalDuty,
      concession,
      totalCosts,
      breakdown: {
        price,
        base: stampDuty,
        transferFee,
        mortgageReg,
        legalFees,
      },
    }
  }, [price, state, propertyType, isFirstHomeBuyer])

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      <header className="border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Stamp Duty Calculator</h2>
        <p className="mt-2 text-sm text-slate-600">Estimate government costs on your next purchase.</p>
      </header>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <NumberInput label="Property price" prefix="$" value={price} onChange={setPrice} />

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">State / Territory</span>
          <select
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            {['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Property type</span>
          <select
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="established">Established home</option>
            <option value="new">New home</option>
            <option value="land">Vacant land</option>
            <option value="investment">Investment property</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">First home buyer?</span>
          <select
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            value={isFirstHomeBuyer}
            onChange={(e) => setIsFirstHomeBuyer(e.target.value)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
      </div>

      <dl className="mt-8 grid gap-4 md:grid-cols-3">
        <ResultCard title="Stamp duty" value={formatCurrency(results.stampDuty)} />
        <ResultCard
          title="Concessions / savings"
          value={`-${formatCurrency(results.concession)}`}
        />
        <ResultCard title="Total upfront costs" value={formatCurrency(results.totalCosts)} helper="Including base fees" />
      </dl>

      <div className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Property price</span>
          <span className="font-semibold text-slate-800">{formatCurrency(results.breakdown.price)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Stamp duty (base)</span>
          <span>{formatCurrency(results.breakdown.base)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Transfer fee</span>
          <span>{formatCurrency(results.breakdown.transferFee)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Mortgage registration</span>
          <span>{formatCurrency(results.breakdown.mortgageReg)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Legal fees (est.)</span>
          <span>{formatCurrency(results.breakdown.legalFees)}</span>
        </div>
      </div>
    </div>
  )
}

export default StampDutyCalculator

