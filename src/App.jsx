import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Calculators from './pages/Calculators.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Career from './pages/Career.jsx'
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'
import EditProfile from './pages/auth/EditProfile.jsx'
import NotFound from './pages/NotFound.jsx'

const AUTH_ROUTES = ['/login', '/signup', '/forgot-password', '/reset-password', '/edit-profile']
const DASHBOARD_ROUTES = ['/dashboard']

function App() {
  const location = useLocation()
  const isAuthRoute = AUTH_ROUTES.includes(location.pathname)
  const isDashboardRoute = DASHBOARD_ROUTES.includes(location.pathname)

  return (
    <div className={`min-h-screen text-slate-900 ${isAuthRoute || isDashboardRoute ? '' : 'pt-16 md:pt-24'}`}>
      {!isAuthRoute && !isDashboardRoute ? <Header /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/career" element={<Career />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAuthRoute && !isDashboardRoute ? <Footer /> : null}
    </div>
  )
}

export default App
