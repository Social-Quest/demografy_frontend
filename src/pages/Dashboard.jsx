import { useMemo, useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Filter as FilterIcon,
  Info,
  Map as MapIcon,
  TrendingUp,
  Users,
} from 'lucide-react'
import parseKPIDefinitions from '../utils/kpiParser.js'
import transformMasterData from '../utils/dataTransformer.js'
import Filters from '../components/Filters.jsx'
import DashboardHeader from '../components/DashboardHeader.jsx'


// Parse KPI definitions from JSON
const kpiDefinitions = parseKPIDefinitions()

const KPI_INDEX_FIELDS = {
  prosperityScore: 'prosperityScoreIndex',
  diversityIndex: 'diversityIndexIndex',
  migrationFootprint: 'migrationFootprintIndex',
  learningLevel: 'learningLevelIndex',
  socialHousing: 'socialHousingIndex',
  residentEquity: 'residentEquityIndex',
  rentalAccess: 'rentalAccessIndex',
  residentAnchor: 'residentAnchorIndex',
}

function Dashboard() {
  // Lazy load and transform master data only once when component mounts
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({ state: '', lga: '', region: '', populationMin: 1000, populationMax: '' })

  // Load data asynchronously to avoid blocking
  useEffect(() => {
    const timer = setTimeout(() => {
      const transformed = transformMasterData()
      setData(transformed)
      setIsLoading(false)
    }, 0)
    
    return () => clearTimeout(timer)
  }, [])
  const [selectedKPIs, setSelectedKPIs] = useState(() => {
    const keys = Object.keys(kpiDefinitions)
    return keys.slice(0, 3) 
  })
  const [sortConfig, setSortConfig] = useState({ key: 'finalRanking', direction: 'asc' })
  const [hoveredKPI, setHoveredKPI] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50
  const topScrollRef = useRef(null)
  const tableScrollRef = useRef(null)
  const [tableScrollWidth, setTableScrollWidth] = useState(0)

  const uniqueStates = useMemo(() => [...new Set(data.map((d) => d.state))].sort(), [data])
  const uniqueLGAs = useMemo(() => [...new Set(data.map((d) => d.lga))].sort(), [data])
  const uniqueRegions = useMemo(() => [...new Set(data.map((d) => d.region))].sort(), [data])

  const dataWithRankings = useMemo(() => {
    const filtered = data.filter((item) => {
      if (filters.state && item.state !== filters.state) return false
      if (filters.lga && item.lga !== filters.lga) return false
      if (filters.region && item.region !== filters.region) return false
      if (filters.populationMin && item.population < Number(filters.populationMin)) return false
      if (filters.populationMax && item.population > Number(filters.populationMax)) return false
      return true
    })

    if (selectedKPIs.length === 0) {
      return filtered.map((item) => ({ ...item, compositeScore: 0, finalRanking: null }))
    }

    const withScores = filtered.map((item) => {
      const totalScore = selectedKPIs.reduce((sum, kpi) => {
        const indexField = KPI_INDEX_FIELDS[kpi]
        if (!indexField) return sum
        const value = Number(item[indexField]) || 0
        return sum + value
      }, 0)

      return { ...item, compositeScore: totalScore }
    })

    withScores.sort((a, b) => b.compositeScore - a.compositeScore)
    return withScores.map((item, index) => ({ ...item, finalRanking: index + 1 }))
  }, [data, filters, selectedKPIs])

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return dataWithRankings
    return [...dataWithRankings].sort((a, b) => {
      const { key, direction } = sortConfig
      const dir = direction === 'asc' ? 1 : -1
      if (a[key] < b[key]) return -1 * dir
      if (a[key] > b[key]) return 1 * dir
      return 0
    })
  }, [dataWithRankings, sortConfig])

  // Calculate pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = sortedData.slice(startIndex, endIndex)

  // Reset to page 1 when filters or sorting changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filters, selectedKPIs, sortConfig])

  useEffect(() => {
    const updateWidths = () => {
      if (!tableScrollRef.current) return
      const tableWidth = tableScrollRef.current.scrollWidth
      const viewportWidth = tableScrollRef.current.clientWidth
      setTableScrollWidth(Math.max(tableWidth, viewportWidth))
    }

    updateWidths()
    window.addEventListener('resize', updateWidths)
    return () => window.removeEventListener('resize', updateWidths)
  }, [paginatedData, selectedKPIs])

  useEffect(() => {
    const top = topScrollRef.current
    const bottom = tableScrollRef.current
    if (!top || !bottom) return

    const handleTopScroll = () => {
      if (bottom.scrollLeft !== top.scrollLeft) {
        bottom.scrollLeft = top.scrollLeft
      }
    }

    const handleBottomScroll = () => {
      if (top.scrollLeft !== bottom.scrollLeft) {
        top.scrollLeft = bottom.scrollLeft
      }
    }

    top.addEventListener('scroll', handleTopScroll)
    bottom.addEventListener('scroll', handleBottomScroll)

    return () => {
      top.removeEventListener('scroll', handleTopScroll)
      bottom.removeEventListener('scroll', handleBottomScroll)
    }
  }, [paginatedData, selectedKPIs])

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const toggleKPI = (kpi) => {
    setSelectedKPIs((prev) => (prev.includes(kpi) ? prev.filter((item) => item !== kpi) : [...prev, kpi]))
  }

  // Pre-calculate percentile widths for all KPIs (performance optimization)
  const percentileWidths = useMemo(() => {
    const widthsMap = new Map()
    selectedKPIs.forEach((kpi) => {
      const values = dataWithRankings.map((item) => item[kpi]).filter((v) => v != null && !isNaN(v))
      if (values.length === 0) return

      const sorted = [...values].sort((a, b) => a - b)
      const isHigher = kpiDefinitions[kpi].higher
      const total = sorted.length

      // Create a map for O(1) lookup - count items <= each value
      const uniqueValues = [...new Set(values)]
      uniqueValues.forEach((value) => {
        // Count how many values are <= current value
        let count = 0
        for (let i = 0; i < total; i++) {
          if (sorted[i] <= value) count++
          else break
        }
        const percentile = (count / total) * 100
        const key = `${kpi}_${value}`
        widthsMap.set(key, isHigher ? percentile : 100 - percentile)
      })
    })
    return widthsMap
  }, [dataWithRankings, selectedKPIs])

  const getPercentileWidth = (value, kpi) => {
    const key = `${kpi}_${value}`
    return percentileWidths.get(key) || 0
  }

  const getPercentileColor = (value, kpi) => {
    const percentile = getPercentileWidth(value, kpi)
    if (percentile >= 80) {
      return 'bg-gradient-to-r from-green-500 to-green-600'
    } else if (percentile >= 60) {
      return 'bg-gradient-to-r from-green-400 to-yellow-400'
    } else if (percentile >= 40) {
      return 'bg-gradient-to-r from-yellow-400 to-orange-400'
    } else if (percentile >= 20) {
      return 'bg-gradient-to-r from-orange-400 to-red-400'
    } else {
      return 'bg-gradient-to-r from-red-500 to-red-600'
    }
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  if (isLoading) {
    return (
      <main className="bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen py-8 md:py-12 lg:py-16 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block h-6 w-6 md:h-8 md:w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-3 md:mt-4 text-xs md:text-sm text-slate-600">Loading data...</p>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <DashboardHeader />
      <main className="pt-16 md:pt-20 lg:pt-24 ">
        <div className="mx-auto flex w-full flex-col gap-6 md:gap-8 px-4 pb-8 md:px-6 lg:flex-row">

        {/* Sidebar - appears between summary cards and table on tablet, left side on desktop */}
        <aside className="order-2 md:order-2 lg:order-1 w-full md:w-full lg:w-[260px] lg:flex-shrink-0 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto scrollbar-hide">
          <div className="space-y-4 md:space-y-6 lg:pb-4">
            <Filters
              filters={filters}
              setFilters={setFilters}
              uniqueStates={uniqueStates}
              uniqueLGAs={uniqueLGAs}
              uniqueRegions={uniqueRegions}
            />

            <section className="rounded-2xl md:rounded-3xl border border-[#e5e7eb] bg-white p-4 md:p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-4 md:mb-5">
                <h2 className="text-xs md:text-sm font-semibold uppercase tracking-[0.28em] text-primary">KPIs</h2>
                <button
                  type="button"
                  className="text-[10px] md:text-xs font-medium uppercase tracking-[0.28em] text-primary hover:opacity-80 transition-opacity cursor-pointer"
                  onClick={() => setSelectedKPIs(Object.keys(kpiDefinitions).slice(0, 3))}
                >
                  Reset
                </button>
              </div>

              <div className="space-y-2">
                {Object.entries(kpiDefinitions).map(([key, kpi]) => {
                  const active = selectedKPIs.includes(key)
                  const IconComponent = kpi.icon
                  return (
                    <div
                      key={key}
                      className={`flex items-center justify-between w-full rounded-lg md:rounded-xl border px-2.5 md:px-3 py-2 md:py-2.5 transition-all cursor-pointer ${
                        active
                          ? 'border-blue-300 bg-blue-50 shadow-sm'
                          : 'border-[#e5e7eb] bg-slate-50 hover:border-blue-200'
                      }`}
                    >
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="button"
                        onClick={() => toggleKPI(key)}
                        className="flex items-center gap-1.5 md:gap-2 min-w-0 flex-1 text-left cursor-pointer"
                      >
                        {IconComponent && <IconComponent className="h-3.5 w-3.5 md:h-4 md:w-4 text-slate-600 flex-shrink-0" />}
                        <div className="min-w-0">
                          <p className="text-[10px] md:text-xs font-semibold text-slate-900 truncate">{kpi.shortName}</p>
                          <p className="text-[9px] md:text-[10px] text-[#6b7280] truncate">{kpi.name}</p>
                        </div>
                      </motion.button>
                      <div className="relative flex-shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setHoveredKPI(hoveredKPI === key ? null : key)
                          }}
                          className="p-1 rounded transition-colors cursor-pointer"
                        >
                          <Info className="h-3 w-3 md:h-3.5 md:w-3.5 text-slate-400" />
                        </button>
                        <AnimatePresence>
                          {hoveredKPI === key ? (
                            <motion.div
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              className="absolute right-0 top-8 z-50 w-48 md:w-56 rounded-lg md:rounded-xl bg-slate-800 p-2.5 md:p-3 text-[10px] md:text-xs text-white shadow-xl pointer-events-none"
                            >
                              {kpi.description}
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        </aside>

        {/* Main content container - normal block layout inside, flex child on desktop */}
        <div className="order-1 md:order-1 lg:order-2 flex-1 min-w-0 space-y-4 md:space-y-6">
          {/* Header and Summary Cards */}
          <section>
            <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
              <SummaryCard icon={<MapIcon className="h-6 w-6 md:h-7 md:w-7 text-slate-400" />} label="Total Subhurbs / SA2" value={dataWithRankings.length} />
                <SummaryCard icon={<TrendingUp className="h-6 w-6 md:h-7 md:w-7 text-slate-400" />} label="Active KPIs" value={selectedKPIs.length} />
              <SummaryCard
                icon={<FilterIcon className="h-6 w-6 md:h-7 md:w-7 text-slate-400" />}
                label="Active filters"
                value={activeFilterCount}
              />
              <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 md:p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm text-[#6b7280]">Top performer</p>
                    <p className="mt-1 text-base md:text-lg font-semibold text-slate-900 truncate">
                      {sortedData.length ? sortedData[0].sa2Name : 'No suburb'}
                    </p>
                  </div>
                  <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs md:text-sm font-semibold text-white flex-shrink-0 ml-2">
                    #{sortedData.length ? sortedData[0].finalRanking : '-'}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Table section */}
          <section className="rounded-2xl md:rounded-3xl border border-[#e5e7eb] bg-white overflow-hidden shadow-sm">
            <div
              ref={topScrollRef}
              className="overflow-x-auto -mx-4 md:mx-0 mb-2 cursor-grab active:cursor-grabbing"
              aria-label="Scroll table horizontally"
            >
              <div style={{ width: tableScrollWidth }} className="h-4" />
            </div>
            <div className="overflow-x-auto -mx-4 md:mx-0 scrollbar-hide" ref={tableScrollRef}>
              <table className="w-full min-w-[720px] text-xs md:text-sm">
                <thead className="bg-slate-50 text-left font-semibold text-slate-600">
                  <tr>
                    <SortableHeader label="Rank" sticky onClick={() => handleSort('finalRanking')} sortConfig={sortConfig} sortKey="finalRanking" />
                    <SortableHeader label="Total Subhurbs / SA2" onClick={() => handleSort('sa2Name')} sortConfig={sortConfig} sortKey="sa2Name" />
                    <SortableHeader label="Population" onClick={() => handleSort('population')} sortConfig={sortConfig} sortKey="population">
                      <Users className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </SortableHeader>
                    {selectedKPIs.map((kpi) => {
                      const IconComponent = kpiDefinitions[kpi].icon
                      return (
                        <SortableHeader
                          key={kpi}
                          label={kpiDefinitions[kpi].name}
                          onClick={() => handleSort(kpi)}
                          sortConfig={sortConfig}
                          sortKey={kpi}
                        >
                          {IconComponent && <IconComponent className="h-3.5 w-3.5 md:h-4 md:w-4" />}
                        </SortableHeader>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row) => (
                    <tr key={row.id} className="border-t border-[#f1f2f6] hover:bg-slate-50 cursor-pointer">
                      <td className="sticky left-0 bg-white px-3 md:px-6 py-3 md:py-4 font-semibold text-slate-900 z-10">
                        <span
                          className={`inline-flex h-7 w-10 md:h-8 md:w-12 items-center justify-center rounded-lg text-xs md:text-sm font-semibold ${
                            row.finalRanking <= 3
                              ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow'
                              : row.finalRanking >= 4 && row.finalRanking <= 10
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          #{row.finalRanking}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4">
                        <div className="font-medium text-slate-900 truncate max-w-[120px] md:max-w-none">{row.sa2Name}</div>
                        <div className="text-[10px] md:text-xs text-[#6b7280]">
                          {row.state} • {row.region}
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 text-slate-800 whitespace-nowrap">{row.population.toLocaleString()}</td>
                      {selectedKPIs.map((kpi) => (
                        <td key={kpi} className="px-3 md:px-6 py-3 md:py-4">
                          <div className="font-medium text-slate-900">{kpiDefinitions[kpi].format(row[kpi])}</div>
                          <div className="mt-1.5 md:mt-2 h-1 md:h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full ${getPercentileColor(row[kpi], kpi)}`}
                              style={{ width: `${getPercentileWidth(row[kpi], kpi)}%` }}
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 border-t border-[#f1f2f6] px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs text-[#6b7280]">
              <p className="order-2 sm:order-1">
                Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} areas
              </p>
              
              <div className="flex items-center gap-1.5 md:gap-2 order-1 sm:order-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center h-7 w-7 md:h-8 md:w-8 rounded-lg border border-[#e5e7eb] bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </button>
                
                <div className="flex items-center gap-0.5 md:gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`h-7 w-7 md:h-8 md:w-8 rounded-lg border text-[10px] md:text-xs font-medium transition-colors cursor-pointer ${
                          currentPage === pageNum
                            ? 'border-primary bg-primary text-white'
                            : 'border-[#e5e7eb] bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>
                
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center h-7 w-7 md:h-8 md:w-8 rounded-lg border border-[#e5e7eb] bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </button>
              </div>
            </footer>
          </section>
        </div>
        </div>
      </main>
    </div>
  )
}

function SummaryCard({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 md:p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#6b7280]">{label}</p>
          <p className="mt-1.5 md:mt-2 text-xl md:text-2xl font-semibold text-slate-900">{value}</p>
        </div>
        <div className="flex-shrink-0 ml-2">{icon}</div>
      </div>
    </div>
  )
}

function SortableHeader({ label, sortConfig, sortKey, onClick, sticky = false, children }) {
  const isActive = sortConfig.key === sortKey
  const directionIcon = isActive && sortConfig.direction === 'asc' ? <ChevronUp className="h-3.5 w-3.5 md:h-4 md:w-4" /> : <ChevronDown className="h-3.5 w-3.5 md:h-4 md:w-4" />
  return (
    <th className={`px-3 md:px-6 py-3 md:py-4 ${sticky ? 'sticky left-0 bg-slate-50 z-20' : ''}`}>
      <button
        type="button"
        onClick={onClick}
        className={`flex items-center gap-1 md:gap-2 text-xs md:text-sm font-semibold transition-colors ${
          isActive ? 'text-primary' : 'text-slate-700 hover:text-primary'
        }`}
      >
        {children}
        <span className="whitespace-nowrap">{label}</span>
        {isActive ? directionIcon : <ChevronDown className="h-3.5 w-3.5 md:h-4 md:w-4 opacity-0" />}
      </button>
    </th>
  )
}


export default Dashboard

