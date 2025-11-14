import { useState, useRef, useEffect, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'

function CustomSelect({ value, onChange, options, placeholder = 'Select...', searchable = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen && searchTerm) {
      setSearchTerm('')
    }
  }, [isOpen, searchTerm])

  const selectedOption = options.find((opt) => opt.value === value)
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm.trim()) {
      return options
    }
    const lowerSearch = searchTerm.toLowerCase()
    return options.filter((option) => option.label.toLowerCase().includes(lowerSearch))
  }, [options, searchTerm, searchable])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mt-1 w-full flex items-center justify-between rounded-xl border border-[#e5e7eb] bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer hover:bg-slate-100 transition-colors"
      >
        <span className={value ? 'text-slate-900' : 'text-[#6b7280]'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-[#e5e7eb] bg-white shadow-lg max-h-60 overflow-auto">
          {searchable && (
            <div className="sticky top-0 z-10 bg-white p-2 border-b border-[#e5e7eb]">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search..."
                className="w-full rounded-lg border border-[#d1d5db] px-2 py-1 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
            </div>
          )}
          {filteredOptions.length ? (
            filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange({ target: { value: option.value } })
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer ${
                  value === option.value
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-slate-900 hover:bg-slate-50'
                }`}
              >
                {option.label}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-slate-500">No matches found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default CustomSelect

