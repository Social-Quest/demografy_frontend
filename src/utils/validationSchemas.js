import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  remember: yup.boolean().default(true),
})

export const signupSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required('Full name is required'),
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: yup.string().min(8, 'Password should be at least 8 characters').required('Password is required'),
  agree: yup.boolean().oneOf([true], 'Please accept the privacy policy to continue'),
})

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
})

export const resetPasswordSchema = yup.object({
  password: yup.string().min(8, 'Password should be at least 8 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
})

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  password: yup.string().min(8, 'Password should be at least 8 characters').required('New password is required'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
})

export function parseYupErrors(error) {
  if (!error) return {}

  if (Array.isArray(error.inner) && error.inner.length > 0) {
    const formErrors = {}
    error.inner.forEach((err) => {
      if (err.path && !formErrors[err.path]) {
        formErrors[err.path] = err.message
      }
    })
    return formErrors
  }

  if (error.path) {
    return { [error.path]: error.message }
  }

  return {}
}

