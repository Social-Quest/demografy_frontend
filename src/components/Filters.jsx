import CustomSelect from './CustomSelect.jsx'

function Filters({ filters, setFilters, uniqueStates, uniqueLGAs, uniqueRegions }) {
  const stateOptions = [
    { value: '', label: 'All states' },
    ...uniqueStates.map((state) => ({ value: state, label: state })),
  ]

  const lgaOptions = [
    { value: '', label: 'All LGAs' },
    ...uniqueLGAs.map((lga) => ({ value: lga, label: lga })),
  ]

  const regionOptions = [
    { value: '', label: 'All regions' },
    ...uniqueRegions.map((region) => ({ value: region, label: region })),
  ]

  return (
    <section className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Filters</h2>
      <div className="mt-5 space-y-3 text-sm">
        <label className="block">
          <span className="text-xs font-medium text-[#6b7280]">State</span>
          <CustomSelect
            value={filters.state}
            onChange={(event) => setFilters((prev) => ({ ...prev, state: event.target.value }))}
            options={stateOptions}
            placeholder="All states"
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-[#6b7280]">Local Government Area</span>
          <CustomSelect
            value={filters.lga}
            onChange={(event) => setFilters((prev) => ({ ...prev, lga: event.target.value }))}
            options={lgaOptions}
            placeholder="All LGAs"
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-[#6b7280]">Region type</span>
          <CustomSelect
            value={filters.region}
            onChange={(event) => setFilters((prev) => ({ ...prev, region: event.target.value }))}
            options={regionOptions}
            placeholder="All regions"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-medium text-[#6b7280]">Population min</span>
            <input
              type="number"
              value={filters.populationMin}
              onChange={(event) => setFilters((prev) => ({ ...prev, populationMin: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#e5e7eb] bg-slate-50 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[#6b7280]">Population max</span>
            <input
              type="number"
              value={filters.populationMax}
              onChange={(event) => setFilters((prev) => ({ ...prev, populationMax: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#e5e7eb] bg-slate-50 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={() => setFilters({ state: '', lga: '', region: '', populationMin: '', populationMax: '' })}
          className="text-xs font-medium text-primary hover:text-[#6d28d9] cursor-pointer"
        >
          Clear filters
        </button>
      </div>
    </section>
  )
}

export default Filters

