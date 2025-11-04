const TOKEN_KEY = 'demografy_jwt'
const USER_KEY = 'demografy_user'

function isBrowser() {
  return typeof window !== 'undefined'
}

export function getToken() {
  if (!isBrowser()) return null
  return window.localStorage.getItem(TOKEN_KEY) || window.sessionStorage.getItem(TOKEN_KEY)
}

export function setToken(token, { remember = true } = {}) {
  if (!isBrowser()) return
  const storage = remember ? window.localStorage : window.sessionStorage
  const otherStorage = remember ? window.sessionStorage : window.localStorage

  if (token) {
    storage.setItem(TOKEN_KEY, token)
    otherStorage.removeItem(TOKEN_KEY)
  } else {
    storage.removeItem(TOKEN_KEY)
  }
}

export function clearToken() {
  if (!isBrowser()) return
  window.localStorage.removeItem(TOKEN_KEY)
  window.sessionStorage.removeItem(TOKEN_KEY)
}

export function getUser() {
  if (!isBrowser()) return null
  try {
    const userStr = window.localStorage.getItem(USER_KEY) || window.sessionStorage.getItem(USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  } catch (error) {
    console.error('Error parsing user data:', error)
    return null
  }
}

export function setUser(user, { remember = true } = {}) {
  if (!isBrowser()) return
  const storage = remember ? window.localStorage : window.sessionStorage
  const otherStorage = remember ? window.sessionStorage : window.localStorage

  if (user) {
    storage.setItem(USER_KEY, JSON.stringify(user))
    otherStorage.removeItem(USER_KEY)
  } else {
    storage.removeItem(USER_KEY)
  }
}

export function clearUser() {
  if (!isBrowser()) return
  window.localStorage.removeItem(USER_KEY)
  window.sessionStorage.removeItem(USER_KEY)
}

