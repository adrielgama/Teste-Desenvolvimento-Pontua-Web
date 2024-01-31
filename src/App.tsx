import { Suspense, lazy } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Spinner } from '@/components/spinner'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/context/AuthContext'
import { CharacterProvider } from '@/context/CharacterContext'
import NotFound from '@/pages/404/NotFound'
import ProtectedWrapper from '@/routes/ProtectedWrapper'

import './globals.css'

const LazyFormPage = lazy(() => import('@/pages/login'))
const LazyHomePage = lazy(() => import('@/pages/home'))
const LazyProfilePage = lazy(() => import('@/pages/profile'))

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
      <AuthProvider>
        <CharacterProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Spinner />}>
                  <LazyFormPage page="login" />
                </Suspense>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <Suspense fallback={<Spinner />}>
                  <LazyFormPage page="forgotPassword" />
                </Suspense>
              }
            />
            <Route
              path="/recovery-password"
              element={
                <Suspense fallback={<Spinner />}>
                  <LazyFormPage page="passwordRecovery" />
                </Suspense>
              }
            />
            <Route
              path="/character-picker"
              element={
                <Suspense fallback={<Spinner />}>
                  <ProtectedWrapper>
                    <LazyFormPage page="characterPicker" />
                  </ProtectedWrapper>
                </Suspense>
              }
            />
            <Route
              path="/home"
              element={
                <Suspense fallback={<Spinner />}>
                  <ProtectedWrapper>
                    <LazyHomePage />
                  </ProtectedWrapper>
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<Spinner />}>
                  <ProtectedWrapper>
                    <LazyProfilePage />
                  </ProtectedWrapper>
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CharacterProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
