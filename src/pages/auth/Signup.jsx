import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GradientButton from '../../components/GradientButton.jsx'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthInput from '../../components/auth/AuthInput.jsx'
import { register as registerRequest } from '../../services/authApi.js'
import { signupSchema, parseYupErrors } from '../../utils/validationSchemas.js'
import { getToken } from '../../utils/tokenStorage.js'
import { ValidationError } from 'yup'

function Signup() {
  const navigate = useNavigate()
  
  useEffect(() => {
    const token = getToken()
    if (token) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    password: '',
    agree: false,
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus(null)
    setErrors({})

    let validated
    try {
      validated = await signupSchema.validate(formValues, { abortEarly: false })
      setFormValues((prev) => ({
        ...prev,
        fullName: validated.fullName,
        email: validated.email,
      }))
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(parseYupErrors(error))
        setStatus({ type: 'error', message: 'Please fix the highlighted fields.' })
        return
      }
      setStatus({ type: 'error', message: error.message })
      return
    }

    try {
      setIsSubmitting(true)
      const payload = {
        fullName: validated.fullName,
        email: validated.email.toLowerCase(),
        password: validated.password,
      }
      const response = await registerRequest(payload)
      setStatus({ type: 'success', message: response?.message || 'Account created successfully.' })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Set up your Demografy workspace to unlock suburb comparisons, demographic overlays, and partner integrations."
      footerLinks={[
        { label: 'Already onboard?', linkText: 'Log in', to: '/login' },
      ]}
    >
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {status?.message ? (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm ${
              status.type === 'error'
                ? 'border-red-200 bg-red-50 text-red-600'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700'
            }`}
          >
            {status.message}
          </div>
        ) : null}

        <AuthInput
          id="fullName"
          name="fullName"
          label="Full name"
          placeholder="Alex Tan"
          value={formValues.fullName}
          onChange={handleChange}
          autoComplete="name"
          error={errors.fullName}
        />

        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Work email"
          placeholder="you@agency.com"
          value={formValues.email}
          onChange={handleChange}
          autoComplete="email"
          error={errors.email}
        />

        <AuthInput
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Create a strong password"
          value={formValues.password}
          onChange={handleChange}
          autoComplete="new-password"
          error={errors.password}
          enablePasswordToggle
        />

        <div className="space-y-1 text-sm text-[#4b5563]">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="agree"
              checked={formValues.agree}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border border-[#d1d5db] bg-white text-[#8b5cf6] accent-[#8b5cf6] cursor-pointer"
            />
            <span>
              I agree to receive onboarding updates and product tips. View our{' '}
              <Link to="/privacy" className="font-medium text-primary hover:underline">
                privacy policy
              </Link>{' '}
              for how we handle data.
            </span>
          </label>
          {errors.agree ? <p className="text-xs text-red-600">{errors.agree}</p> : null}
        </div>

        <GradientButton type="submit" className="w-full justify-center" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Sign up'}
        </GradientButton>
      </form>
    </AuthLayout>
  )
}

export default Signup

