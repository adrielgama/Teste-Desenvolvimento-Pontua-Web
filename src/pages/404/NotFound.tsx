import { useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import BuildingImage from '@/assets/building.svg'
import LogoPontuaWhite from '@/assets/logo_pontua_white.svg'
import { Button } from '@/components/ui/button'

function NotFound() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/profile') {
      navigate('/home')
    }
  }, [location.pathname, navigate])

  return (
    <div className="h-screen w-screen bg-blue-900 p-4 font-navigation">
      <div className="absolute lg:left-36">
        <img src={LogoPontuaWhite} alt="Logo PONTUA cor branca" />
      </div>
      <div className="container flex h-full items-center justify-center lg:gap-12 xl:gap-36">
        <img
          className="hidden lg:block lg:max-w-lg xl:max-w-full"
          src={BuildingImage}
          alt="Imagem de um predio"
        />
        <div className="flex flex-col items-center">
          <h1 className="text-9xl font-bold text-orange-500">404</h1>
          <h3 className="text-2xl font-bold -tracking-wider text-white">
            Página não encontrada
          </h3>
          <Button
            variant="outline"
            className="mt-12 p-6"
            onClick={() => navigate('/')}
          >
            Voltar para página inicial
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
