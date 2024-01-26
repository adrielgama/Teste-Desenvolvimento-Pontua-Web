import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'
import { CharacterProvider } from '@/context/CharacterContext'
// import { AuthProvider } from '@/context/AuthContext'
import NotFound from '@/pages/404/NotFound'
import Home from '@/pages/home'
import FormPage from '@/pages/login'
import { Profile } from '@/pages/profile'
import ProtectedWrapper from '@/routes/ProtectedWrapper'

import './globals.css'

function App() {
  return (
    <Router>
      <Toaster
        richColors
        theme="light"
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
          },
        }}
      />
      {/* <AuthProvider> */}
      <CharacterProvider>
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
            path="/character-picker"
            element={
              <ProtectedWrapper>
                <FormPage page="characterPicker" />
              </ProtectedWrapper>
            }
          />
          {/* <Route
            path="/home/*"
            element={
              <ProtectedWrapper>
                <Home />
              </ProtectedWrapper>
            }
          /> */}
          <Route path="/home/*" element={<Home />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CharacterProvider>
      {/* </AuthProvider> */}
    </Router>
  )
}

export default App
