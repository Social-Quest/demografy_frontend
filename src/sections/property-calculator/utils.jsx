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
          type="number"
          className={`h-12 w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
            prefix ? 'pl-10 pr-4' : 'px-4'
          }`}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
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

