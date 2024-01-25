import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
} from 'react'

interface AuthProviderProps {
  children: ReactNode
}

interface IAuthContextData {
  isAuthenticated: boolean
  login: (username: string, password: string) => void
  logout: () => void
  recoverPassword: (email: string) => void
}

const AuthContext = createContext({} as IAuthContextData)

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const mockUser = {
    email: 'user@email.com',
    password: '123',
  }

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (email === mockUser.email && password === mockUser.password) {
          const token = 'mocked-jwt-token'
          localStorage.setItem('token', token)
          setIsAuthenticated(true)
          resolve()
        } else {
          reject(new Error('Credenciais inválidas.'))
        }
      })
    },
    [mockUser.email, mockUser.password]
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
    }),
    [isAuthenticated, login, logout, recoverPassword]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
