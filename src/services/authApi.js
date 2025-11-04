import { getToken, setToken, clearToken, setUser, clearUser, getUser } from '../utils/tokenStorage.js'

const API_BASE = (import.meta.env?.VITE_BACKEND_URL || '').replace(/\/$/, '')
const BASE_URL = '/api/auth'

async function request(path, { method = 'GET', body, headers = {}, requiresAuth = false } = {}) {
  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  }

  if (requiresAuth) {
    const token = getToken()
    if (token) {
      finalHeaders.Authorization = `Bearer ${token}`
    }
  }

  const url = `${API_BASE}${BASE_URL}${path}`
  const response = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  })

  let data
  try {
    data = await response.json()
  } catch (error) {
    data = {}
  }

  if (!response.ok) {
    const message = data?.message || 'Something went wrong. Please try again.'
    throw new Error(message)
  }

  return data
}

export async function register(payload, options = {}) {
  const { remember = true } = options
  const result = await request('/register', { method: 'POST', body: payload })
  if (result?.token) {
    setToken(result.token, { remember })
    if (result.user) {
      setUser(result.user, { remember })
    }
  }
  return result
}

export async function login(payload, options = {}) {
  const { remember = true } = options
  const result = await request('/login', { method: 'POST', body: payload })
  if (result?.token) {
    setToken(result.token, { remember })
    if (result.user) {
      setUser(result.user, { remember })
    }
  }
  return result
}

export function logout() {
  clearToken()
  clearUser()
}

export async function forgotPassword(payload) {
  return request('/forgot-password', { method: 'POST', body: payload })
}

export async function resetPassword(payload) {
  return request('/reset-password', { method: 'POST', body: payload })
}

export async function getCurrentUser() {
  const result = await request('/me', { requiresAuth: true })
  if (result) {
    if (result.user) {
      setUser(result.user, { remember: true })
      return result.user
    } else if (result.id || result.email) {
      setUser(result, { remember: true })
      return result
    }
  }
  return result?.user || result
}

export async function updateUser(payload) {
  const result = await request('/update', { method: 'PUT', body: payload, requiresAuth: true })
  // Update stored user data after successful update
  if (result) {
    if (result.user) {
      setUser(result.user, { remember: true })
    } else if (result.id || result.email) {
      // Merge updated fields with existing user data
      const currentUser = getUser() || {}
      setUser({ ...currentUser, ...payload }, { remember: true })
    }
  }
  return result
}

export async function deleteUser() {
  return request('/delete', { method: 'DELETE', requiresAuth: true })
}

