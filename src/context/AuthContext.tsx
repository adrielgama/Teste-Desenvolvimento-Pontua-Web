/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
} from 'react'

import { jwtDecode } from 'jwt-decode'
import { useLocation, useNavigate } from 'react-router-dom'

interface AuthProviderProps {
  children: ReactNode
}

interface IAuthContextData {
  isAuthenticated: boolean
  login: (username: string, password: string) => void
  logout: () => void
  recoverPassword: (email: string) => void
  validateToken: () => Promise<boolean>
}

const AuthContext = createContext({} as IAuthContextData)

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const mockUser = {
    email: 'user@email.com',
    password: '123',
  }

  const validateToken = useCallback(async (): Promise<boolean> => {
    const token = localStorage.getItem('token')

    if (!token) {
      return false
    }

    try {
      const decodedToken = jwtDecode(token)
      const isTokenExpired = decodedToken.exp! * 1000 < Date.now()

      if (isTokenExpired) {
        return false
      }

      return true
    } catch (error) {
      return false
    }
  }, [])

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (email === mockUser.email && password === mockUser.password) {
          const token = 'mocked-jwt-token'
          localStorage.setItem('token', token)
          setIsAuthenticated(true)

          const redirectPath =
            location.pathname === '/' ? '/character-picker' : location.pathname
          navigate(redirectPath)

          resolve()
        } else {
          reject(new Error('Credenciais inválidas.'))
        }
      })
    },
    [location.pathname, mockUser.email, mockUser.password, navigate]
  )

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }, [])

  const recoverPassword = useCallback(
    (email: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (email === mockUser.email) {
          console.log(`Solicitado recuperação de senha para: ${email}`)
          resolve()
        } else {
          reject(new Error('E-mail não encontrado.'))
        }
      })
    },
    [mockUser.email]
  )

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      recoverPassword,
      validateToken,
    }),
    [isAuthenticated, login, logout, recoverPassword, validateToken]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
