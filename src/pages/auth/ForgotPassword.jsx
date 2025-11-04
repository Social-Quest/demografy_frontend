import { useState } from 'react'
import GradientButton from '../../components/GradientButton.jsx'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthInput from '../../components/auth/AuthInput.jsx'
import { forgotPassword as forgotPasswordRequest } from '../../services/authApi.js'
import { forgotPasswordSchema, parseYupErrors } from '../../utils/validationSchemas.js'
import { ValidationError } from 'yup'

function ForgotPassword() {
  const [formValues, setFormValues] = useState({ email: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus(null)
    setErrors({})

    let validated
    try {
      validated = await forgotPasswordSchema.validate(formValues, { abortEarly: false })
      setFormValues((prev) => ({ ...prev, email: validated.email }))
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(parseYupErrors(error))
        setStatus({ type: 'error', message: 'Please provide a valid email.' })
        return
      }
      setStatus({ type: 'error', message: error.message })
      return
    }

    try {
      setIsSubmitting(true)
      const response = await forgotPasswordRequest({ email: validated.email.toLowerCase() })
      setStatus({ type: 'success', message: response?.message || 'Password reset email sent successfully.' })
      setFormValues({ email: '' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="We’ll send a secure reset link to your email. The link stays active for 24 hours."
      footerLinks={[{ label: 'Remember your credentials?', linkText: 'Go back to login', to: '/login' }]}
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
          label="Work email"
          placeholder="you@agency.com"
          value={formValues.email}
          onChange={handleChange}
          autoComplete="email"
          error={errors.email}
        />

        <GradientButton type="submit" className="w-full justify-center" disabled={isSubmitting}>
          {isSubmitting ? 'Sending link…' : 'Send reset link'}
        </GradientButton>
      </form>
    </AuthLayout>
  )
}

export default ForgotPassword

