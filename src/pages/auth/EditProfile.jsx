import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GradientButton from '../../components/GradientButton.jsx'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthInput from '../../components/auth/AuthInput.jsx'
import { updateUser, getCurrentUser } from '../../services/authApi.js'
import { getUser, setUser } from '../../utils/tokenStorage.js'
import * as yup from 'yup'
import { parseYupErrors } from '../../utils/validationSchemas.js'

const editProfileSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required').min(2, 'Full name must be at least 2 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
})

function EditProfile() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // First try stored user data (fast)
        const storedUser = getUser()
        if (storedUser) {
          setFormValues({
            fullName: storedUser.fullName || storedUser.name || '',
            email: storedUser.email || '',
          })
          setIsLoading(false)
        }

        // Then fetch latest from API
        const user = await getCurrentUser()
        if (user) {
          setFormValues({
            fullName: user.fullName || user.name || '',
            email: user.email || '',
          })
        }
      } catch (error) {
        console.error('Failed to load user data:', error)
        setStatus({ type: 'error', message: 'Failed to load profile data.' })
      } finally {
        setIsLoading(false)
      }
    }
    loadUserData()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus(null)
    setErrors({})

    let validated
    try {
      validated = await editProfileSchema.validate(formValues, { abortEarly: false })
    } catch (error) {
      if (error instanceof yup.ValidationError) {
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
      }
      const response = await updateUser(payload)
      setStatus({ type: 'success', message: response?.message || 'Profile updated successfully.' })
      
      // Update stored user data
      const currentUser = getUser() || {}
      setUser({ ...currentUser, ...payload }, { remember: true })
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard', { replace: true })
      }, 1500)
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <AuthLayout title="Edit Profile" subtitle="Update your profile information.">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-sm text-slate-600">Loading profile...</p>
          </div>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Edit Profile"
      subtitle="Update your profile information and account settings."
      footerLinks={[
        { label: 'Back to dashboard', linkText: 'Dashboard', to: '/dashboard' },
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
          label="Email address"
          placeholder="you@domain.com"
          value={formValues.email}
          onChange={handleChange}
          autoComplete="email"
          error={errors.email}
        />

        <div className="flex gap-3">
          <GradientButton type="submit" className="flex-1 justify-center" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Profile'}
          </GradientButton>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2.5 rounded-xl border border-[#e5e7eb] bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default EditProfile

