import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '../utils/tokenStorage.js'

function ProtectedRoute({ children }) {
  const location = useLocation()
  const token = getToken()


  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute

