import { formatNumber } from './calculations.js'

export const formatCurrency = (() => {
  const formatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  })

  return (value) => formatter.format(Number.isFinite(value) ? value : 0)
})()

export const formatPercent = (value) => `${Number(value).toFixed(2)}%`

export function ResultCard({ title, value, helper }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-primary">{value}</p>
      {helper ? <p className="mt-1 text-xs text-slate-500">{helper}</p> : null}
    </div>
  )
}

export function NumberInput({ label, prefix, value, onChange }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
            {prefix}
          </span>
        ) : null}
        <input
          inputMode="decimal"
          className={`h-12 w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
            prefix ? 'pl-10 pr-4' : 'px-4'
          }`}
          value={value}
          onChange={(e) => {
            const numeric = formatNumber(e.target.value)
            onChange(numeric === '' ? 0 : Number(numeric))
          }}
        />
      </div>
    </label>
  )
}

export function RangeInput({ label, value, onChange, min, max, step = 1, formatValue, suffix = '' }) {
  const displayValue = formatValue ? formatValue(value) : value

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="range-input-primary h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200"
        />
        <span className="w-16 text-right text-sm font-semibold text-primary">
          {displayValue}{suffix}
        </span>
      </div>
    </div>
  )
}

export function CalculateButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 w-full cursor-pointer rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
    >
      {children}
    </button>
  )
}

export function BreakdownSection({ title, items }) {
  if (!items || items.length === 0) return null

  return (
    <section className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-6">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <dl className="mt-4 space-y-3 text-sm text-slate-600">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1
          const isTotal = item.isTotal || isLastItem

          return (
            <div
              key={index}
              className="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-3"
            >
              <dt
                className={`uppercase tracking-[0.18em] ${
                  isTotal ? 'text-xs md:text-sm' : 'text-[11px] md:text-xs'
                } ${
                  isTotal
                    ? 'text-black font-bold'
                    : item.labelColor || 'text-slate-500'
                } ${
                  !isTotal && (item.labelFontWeight === 'bold' || item.labelFontWeight === 'semibold')
                    ? 'font-semibold'
                    : !isTotal
                    ? 'font-medium'
                    : ''
                }`}
              >
                {item.label}
              </dt>
              <dd
                className={`${
                  isTotal ? 'text-base md:text-lg' : 'text-sm md:text-base'
                } ${
                  isTotal
                    ? 'font-semibold text-black'
                    : 'font-semibold'
                } ${!isTotal && item.valueColor ? item.valueColor : ''}`}
              >
                {item.isNegative ? '-' : ''}
                {item.formatValue ? item.formatValue(item.value) : formatCurrency(item.value)}
              </dd>
            </div>
          )
        })}
      </dl>
    </section>
  )
}

export function AffordableSuburbsSection({ state, affordable, stretch, affordablePrice, formatCurrency }) {
  const stateNames = {
    NSW: 'New South Wales',
    VIC: 'Victoria',
    QLD: 'Queensland',
    SA: 'South Australia',
    WA: 'Western Australia',
    TAS: 'Tasmania',
    ACT: 'Australian Capital Territory',
    NT: 'Northern Territory',
  }

  const displayState = stateNames[state] || state

  return (
    <div className="mt-6 rounded-2xl bg-white p-5 shadow-inner">
      <h3 className="text-lg font-semibold text-slate-900">
        Affordable Suburbs in <span className="text-primary">{displayState}</span>
      </h3>
      <div className="mt-4 space-y-3 text-sm text-slate-600">
        {affordable.length > 0 ? (
          <div>
            <p className="mb-2 font-semibold text-emerald-600">✅ Within Your Budget</p>
            <div className="space-y-2">
              {affordable.map((suburb, index) => {
                const isLast = index === affordable.length - 1
                return (
                  <div key={suburb.name} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className={isLast ? 'text-sm md:text-base font-bold text-black' : ''}>{suburb.name}</span>
                    <span className={isLast ? 'text-sm md:text-base font-bold text-black' : ''}>
                      {formatCurrency(suburb.median)}{' '}
                      <span className={isLast ? 'text-emerald-600 font-bold' : 'text-emerald-600'}>
                        (+{suburb.growth.toFixed(1)}% growth)
                      </span>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}

        {stretch.length > 0 ? (
          <div className="mt-5">
            <p className="mb-2 font-semibold text-amber-600">⚠️ Stretch Options (within 15%)</p>
            <div className="space-y-2">
              {stretch.map((suburb, index) => {
                const shortfall = suburb.median - affordablePrice
                const isLast = index === stretch.length - 1
                return (
                  <div key={suburb.name} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className={isLast ? 'text-sm md:text-base font-bold text-black' : ''}>{suburb.name}</span>
                    <span className={isLast ? 'text-sm md:text-base font-bold text-black' : ''}>
                      {formatCurrency(suburb.median)}{' '}
                      <span className={isLast ? 'text-black' : 'text-amber-600'}>
                        (need {formatCurrency(shortfall)} more)
                      </span>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}

        {affordable.length === 0 && stretch.length === 0 ? (
          <div className="rounded-xl bg-amber-50 px-4 py-3 text-amber-600">
            Based on your budget, you might want to consider increasing your deposit, looking at regional areas, or
            exploring shared equity schemes available in {state}.
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function FrequencyComparisonSection({ comparison, formatCurrency }) {
  if (!comparison || comparison.length === 0) return null

  return (
    <section className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Frequency comparison</h3>
      <div className="mt-4 space-y-3">
        {comparison.map((item, index) => {
          const isLast = index === comparison.length - 1
          return (
            <div
              key={item.id}
              className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className={
                    isLast
                      ? 'text-sm md:text-base font-bold text-black'
                      : 'text-sm font-semibold text-slate-900'
                  }
                >
                  {item.label} ({formatCurrency(item.payment)}/{item.cadence})
                </span>
              </div>
              <div className={isLast ? 'text-sm md:text-base font-bold text-black' : 'text-sm text-slate-600'}>
                {formatCurrency(item.totalInterest)} interest
                {item.savings > 0 ? (
                  <span className={isLast ? 'ml-2 font-bold text-emerald-600' : 'ml-2 font-semibold text-emerald-600'}>
                   (save {formatCurrency(item.savings)})
                  </span>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function YieldComparisonSection({ currentYield, benchmarks, formatPercent }) {
  if (!benchmarks || benchmarks.length === 0) return null

  const getYieldColor = (yieldValue) => {
    if (yieldValue >= 4) return 'text-emerald-600'
    if (yieldValue >= 3) return 'text-amber-600'
    return 'text-rose-600'
  }

  return (
    <section className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-inner">
      <h3 className="text-lg font-semibold text-slate-900">How your yield stacks up</h3>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        {currentYield !== null && currentYield !== undefined && (
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
            <span>Your property (net yield)</span>
            <span className={`font-semibold ${getYieldColor(currentYield)}`}>{formatPercent(currentYield)}</span>
          </div>
        )}
        {benchmarks.map((benchmark, index) => {
          const isLast = index === benchmarks.length - 1
          return (
            <div key={benchmark.market} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span className={isLast ? 'text-sm md:text-base font-bold text-black' : ''}>{benchmark.market}</span>
              <span className={isLast ? 'text-sm md:text-base font-bold text-black' : ''}>
                {benchmark.value.toFixed(1)}%
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function ImprovementTipsSection({ title, tips }) {
  if (!tips || tips.length === 0) return null

  return (
    <section className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-6">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm text-slate-600">
        {tips.map((tip, index) => {
          const isLast = index === tips.length - 1
          return (
            <li
              key={tip.label || index}
              className="flex flex-col gap-1 rounded-xl bg-white px-4 py-3 shadow-sm md:flex-row md:items-center md:justify-between"
            >
              <span
                className={
                  isLast
                    ? 'text-sm md:text-base font-bold text-black'
                    : 'font-medium text-slate-900'
                }
              >
                {tip.icon && <span className="mr-2 text-base">{tip.icon}</span>}
                {tip.label}
              </span>
              {tip.detail && (
                <span className={isLast ? 'text-sm md:text-base font-bold text-black md:text-right' : 'md:text-right'}>
                  {tip.detail}
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

