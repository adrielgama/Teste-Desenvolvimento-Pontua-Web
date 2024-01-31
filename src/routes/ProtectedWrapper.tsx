import React, { ReactNode, useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { Spinner } from '@/components/spinner'
import { useAuthContext } from '@/context/AuthContext'

interface ProtectedWrapperProps {
  children: ReactNode
}

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
  const { isAuthenticated, validateToken } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleRedirect = async () => {
      const isValidToken = await validateToken()

      if (isValidToken) {
        navigate(location.pathname || '/home')
      } else {
        navigate('/')
      }
    }

    if (!isAuthenticated) {
      handleRedirect()
    }
  }, [isAuthenticated, location.pathname, navigate, validateToken])

  if (!isAuthenticated) {
    return <Spinner />
  }

  return <>{children}</>
}

export default ProtectedWrapper
