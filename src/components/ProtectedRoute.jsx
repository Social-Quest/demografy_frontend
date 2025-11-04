import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '../utils/tokenStorage.js'

function ProtectedRoute({ children }) {
  const location = useLocation()
  const token = getToken()

  // If no token, redirect to login with return URL
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute

