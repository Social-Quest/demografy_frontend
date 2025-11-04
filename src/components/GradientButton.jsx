import { Link } from 'react-router-dom'
import arrowLeft from '../assets/arrowLeft.svg'
import arrowLeftBlack from '../assets/arrowLeftBlack.svg'

function GradientButton({
  children = 'Get this Template',
  onClick,
  className = '',
  to,
  type = 'button',
  variant = 'primary',
  showIcon = true,
  disabled = false,
  ...props
}) {
  const baseClasses =
    'group inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium font-sans transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9b72f7] focus-visible:ring-offset-transparent cursor-pointer'

  const variants = {
    primary:
      'text-white bg-[linear-gradient(#9b72f7_0%,_#8b5cf6_100%)] shadow-[0_4px_6px_0_rgba(30,7,81,0.12)] hover:shadow-[0_6px_10px_0_rgba(30,7,81,0.18)]',
    secondary:
      'text-black bg-white border border-[#e5e7eb] shadow-sm',
  }

  const iconForVariant = {
    primary: arrowLeft,
    secondary: arrowLeftBlack,
  }

  const Component = to ? Link : 'button'

  const componentProps = {
    className: `${baseClasses} ${variants[variant]} ${
      disabled ? 'pointer-events-none opacity-60' : ''
    } ${className}`.trim(),
    onClick,
    ...props,
  }

  if (to) {
    componentProps.to = to
  } else {
    componentProps.type = type
    componentProps.disabled = disabled
  }

  return (
    <Component {...componentProps}>
      <span className="inline-flex items-center gap-2 transition-all duration-200 group-hover:gap-3">
        <span className="whitespace-nowrap">{children}</span>
        {showIcon ? (
          <img
            src={iconForVariant[variant] || arrowLeft}
            alt=""
            className="h-6 w-6 translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        ) : null}
      </span>
    </Component>
  )
}

export default GradientButton


