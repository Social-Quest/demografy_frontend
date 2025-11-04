import { useState } from 'react'

function AuthInput({
  id,
  label,
  rightLabel,
  type = 'text',
  placeholder,
  className = '',
  inputClassName = '',
  error,
  enablePasswordToggle = false,
  ...props
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isPasswordField = type === 'password'
  const shouldToggle = isPasswordField && enablePasswordToggle
  const inputType = shouldToggle ? (isPasswordVisible ? 'text' : 'password') : type

  return (
    <div className={`space-y-2 ${className}`}>
      {label ? (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="text-sm font-medium text-slate-700">
            {label}
          </label>
          {rightLabel || null}
        </div>
      ) : null}

      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          aria-invalid={error ? 'true' : 'false'}
          className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none focus:ring-2 ${
            error
              ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
              : 'border-[#e5e7eb] focus:border-primary focus:ring-primary/20'
          } ${shouldToggle ? 'pr-16' : ''} ${inputClassName}`.trim()}
          {...props}
        />
        {shouldToggle ? (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="absolute inset-y-0 right-4 flex items-center text-xs font-medium uppercase tracking-[0.2em] text-primary transition-colors duration-150 hover:text-[#6d28d9] cursor-pointer"
          >
            {isPasswordVisible ? 'Hide' : 'Show'}
          </button>
        ) : null}
      </div>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  )
}

export default AuthInput

