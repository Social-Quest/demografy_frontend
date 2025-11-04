import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import GradientButton from '../../components/GradientButton.jsx'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthInput from '../../components/auth/AuthInput.jsx'
import { resetPassword as resetPasswordRequest } from '../../services/authApi.js'
import { resetPasswordSchema, parseYupErrors } from '../../utils/validationSchemas.js'
import { ValidationError } from 'yup'

function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [formValues, setFormValues] = useState({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(token ? null : { type: 'error', message: 'Reset link is invalid or has expired.' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const redirectTimeoutRef = useRef(null)

  useEffect(() => {
    if (!token) {
      setStatus({ type: 'error', message: 'Reset link is invalid or has expired.' })
    }
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current)
      }
    }
  }, [token])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus(null)
    setErrors({})

    if (!token) {
      setStatus({ type: 'error', message: 'Reset link is invalid or has expired.' })
      return
    }

    let validated
    try {
      validated = await resetPasswordSchema.validate(formValues, { abortEarly: false })
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
      const response = await resetPasswordRequest({ token, password: validated.password })
      setStatus({ type: 'success', message: response?.message || 'Password reset successfully.' })
      redirectTimeoutRef.current = setTimeout(() => navigate('/login', { replace: true }), 1500)
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Your new password must be at least 8 characters, include a number, and a special character."
      footerLinks={[{ label: 'Know your password?', linkText: 'Return to login', to: '/login' }]}
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
          id="password"
          name="password"
          type="password"
          label="New password"
          placeholder="Create a strong password"
          value={formValues.password}
          onChange={handleChange}
          autoComplete="new-password"
          error={errors.password}
          enablePasswordToggle
        />

        <AuthInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm new password"
          placeholder="Re-enter password"
          value={formValues.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          error={errors.confirmPassword}
          enablePasswordToggle
        />

        <div className="space-y-3 rounded-2xl bg-[#f9fafb] p-4 text-sm text-[#4b5563]">
          <p className="font-medium text-slate-900">Password tips</p>
          <ul className="list-disc pl-5">
            <li>Use at least one uppercase character.</li>
            <li>Keep it unique and avoid previous passwords.</li>
            <li>Consider using a password manager to stay secure.</li>
          </ul>
        </div>

        <GradientButton type="submit" className="w-full justify-center" disabled={isSubmitting || !token}>
          {isSubmitting ? 'Updating…' : 'Update password'}
        </GradientButton>
      </form>
    </AuthLayout>
  )
}

export default ResetPassword

