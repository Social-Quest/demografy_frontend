import { useState, useRef, useEffect, useMemo } from 'react'
import { ChevronDown, X } from 'lucide-react'

function CustomSelect({ value, onChange, options, placeholder = 'Select...', searchable = false, multiple = false }) {
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

  const selectedValues = multiple ? (Array.isArray(value) ? value : []) : []
  const selectedValue = multiple ? null : value

  const selectedOptions = multiple
    ? options.filter((opt) => selectedValues.includes(opt.value))
    : []
  const selectedOption = multiple ? null : options.find((opt) => opt.value === selectedValue)

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm.trim()) {
      return options
    }
    const lowerSearch = searchTerm.toLowerCase()
    return options.filter((option) => option.label.toLowerCase().includes(lowerSearch))
  }, [options, searchTerm, searchable])

  const handleSelect = (optionValue) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : []
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue]
      onChange({ target: { value: newValues } })
    } else {
      onChange({ target: { value: optionValue } })
      setIsOpen(false)
    }
  }

  const handleRemove = (optionValue, e) => {
    e.stopPropagation()
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : []
      const newValues = currentValues.filter((v) => v !== optionValue)
      onChange({ target: { value: newValues } })
    }
  }

  const displayText = multiple
    ? selectedOptions.length > 0
      ? `${selectedOptions.length} selected`
      : placeholder
    : selectedOption
    ? selectedOption.label
    : placeholder

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mt-1 w-full flex items-center justify-between rounded-xl border border-[#e5e7eb] bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer hover:bg-slate-100 transition-colors min-h-[42px] "
      >
        <span className={selectedValue || (multiple && selectedOptions.length > 0) ? 'text-slate-900' : 'text-[#6b7280] '}>
          {displayText}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-slate-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {multiple && selectedOptions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selectedOptions.map((opt) => (
            <span
              key={opt.value}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium cursor-pointer"
            >
              {opt.label}
              <button
                type="button"
                onClick={(e) => handleRemove(opt.value, e)}
                className="hover:bg-primary/20 rounded p-0.5 transition-colors cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

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
            filteredOptions.map((option) => {
              const isSelected = multiple
                ? selectedValues.includes(option.value)
                : selectedValue === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {multiple && (
                    <span
                      className={`w-4 h-4 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'bg-primary border-primary'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                  )}
                  <span>{option.label}</span>
                </button>
              )
            })
          ) : (
            <div className="px-3 py-2 text-sm text-slate-500">No matches found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default CustomSelect

