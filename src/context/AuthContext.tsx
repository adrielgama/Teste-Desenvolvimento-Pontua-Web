import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
} from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { mockUsers } from '@/mocks'
import { IUser } from '@/types/user'

interface AuthProviderProps {
  children: ReactNode
}

interface IAuthContextData {
  isAuthenticated: boolean
  currentUser: IUser | null
  login: (email: string, password: string) => void
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
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)

  const users = useMemo(() => mockUsers, [])

  const validateToken = useCallback(async (): Promise<boolean> => {
    const token = localStorage.getItem('token')
    const isAuthenticated = Boolean(token)
    setIsAuthenticated(isAuthenticated)
    return isAuthenticated
  }, [])

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const user = users.find(
          (hasUser) => hasUser.email === email && hasUser.password === password
        )

        if (user) {
          const token = 'mocked-jwt-token'
          localStorage.setItem('token', token)
          setIsAuthenticated(true)
          setCurrentUser(user)

          const redirectPath =
            location.pathname === '/' ? '/character-picker' : location.pathname
          navigate(redirectPath)

          resolve()
        } else {
          reject(new Error('Credenciais inválidas.'))
        }
      })
    },
    [location.pathname, navigate, users]
  )

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setCurrentUser(null)
  }, [])

  const recoverPassword = useCallback(
    (email: string): Promise<void> => {
      const matchedUser = users.find((hasUser) => hasUser.email === email)

      return new Promise((resolve, reject) => {
        if (matchedUser) {
          console.log(`Solicitado recuperação de senha para: ${email}`)
          resolve()
        } else {
          reject(new Error('E-mail não encontrado.'))
        }
      })
    },
    [users]
  )

  const value = useMemo(
    () => ({
      isAuthenticated,
      currentUser,
      login,
      logout,
      recoverPassword,
      validateToken,
    }),
    [
      currentUser,
      isAuthenticated,
      login,
      logout,
      recoverPassword,
      validateToken,
    ]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
