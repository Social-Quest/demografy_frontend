import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GradientButton from '../../components/GradientButton.jsx'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthInput from '../../components/auth/AuthInput.jsx'
import { login as loginRequest } from '../../services/authApi.js'
import { loginSchema, parseYupErrors } from '../../utils/validationSchemas.js'
import { ValidationError } from 'yup'

function Login() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '', remember: true })
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
      validated = await loginSchema.validate(formValues, { abortEarly: false })
      setFormValues((prev) => ({ ...prev, email: validated.email, remember: validated.remember ?? prev.remember }))
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
        email: validated.email,
        password: validated.password,
      }
      const response = await loginRequest(payload, { remember: validated.remember })
      setStatus({ type: 'success', message: response?.message || 'Login successful.' })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to explore growth indicators, shortlist suburbs, and share dashboards with clients."
      footerLinks={[
        { label: "Don't have an account?", linkText: 'Create one', to: '/signup' },
        { label: 'Forgot your password?', linkText: 'Reset it', to: '/forgot-password' },
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
          id="email"
          name="email"
          type="email"
          label="Email address"
          placeholder="you@domain.com"
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
          placeholder="••••••••"
          value={formValues.password}
          onChange={handleChange}
          autoComplete="current-password"
          error={errors.password}
          enablePasswordToggle
          rightLabel={
            <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline cursor-pointer">
              Forgot?
            </Link>
          }
        />

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm text-[#4b5563]">
            <input
              type="checkbox"
              name="remember"
              checked={formValues.remember}
              onChange={handleChange}
              className="h-4 w-4 rounded border border-[#d1d5db] text-primary focus:ring-primary/40 cursor-pointer"
            />
            Remember me
          </label>
          <span className="text-xs uppercase tracking-[0.3em] text-[#9ca3af]">Beta access</span>
        </div>

        <GradientButton type="submit" className="w-full justify-center" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </GradientButton>
      </form>
    </AuthLayout>
  )
}

export default Login

