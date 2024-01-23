import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AuthProvider } from '@/context/AuthContext'
import FormPage from '@/pages/home'
import ProtectedWrapper from '@/routes/ProtectedWrapper'

import './globals.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<FormPage page="login" />} />
          <Route
            path="/forgot-password"
            element={<FormPage page="forgotPassword" />}
          />
          <Route
            path="/recovery-password"
            element={<FormPage page="passwordRecovery" />}
          />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedWrapper>
                <h1>Dashboard</h1>
              </ProtectedWrapper>
            }
          />
          <Route
            path="*"
            element={
              <>
                <h1>404</h1>
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
