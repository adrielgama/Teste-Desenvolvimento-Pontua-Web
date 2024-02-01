import React from 'react'

import { CornerUpLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

import LogoPontuaBlue from '@/assets/logo_pontua_blue.svg'
import { useAuthContext } from '@/context/AuthContext'
import { useCharacterContext } from '@/context/CharacterContext'
import { menuItems } from '@/mocks'

import { Separator } from './ui/separator'

function Sidenav() {
  const { logout } = useAuthContext()
  const location = useLocation()
  const navigate = useNavigate()
  const { defaultCharacter, selectedCharacter } = useCharacterContext()

  return (
    <div
      aria-label="sidenav"
      className="fixed bottom-0 z-50 flex h-16 w-full items-center justify-evenly bg-white shadow-menu-shadow lg:h-screen lg:w-64 lg:flex-col lg:items-start lg:justify-normal lg:space-y-2"
    >
      <img
        src={LogoPontuaBlue}
        alt="Logo PONTUA cor azul"
        className="hidden px-5 py-4 lg:mt-1 lg:block"
      />

      <Separator className="hidden lg:block" />
      {menuItems.map((item, index) => (
        <ul key={index} className="flex w-full flex-col gap-2 px-3">
          <li
            className={`flex cursor-pointer flex-row items-center justify-center gap-3 rounded-lg p-2 text-[13px] transition-all ${
              location.pathname.startsWith('/profile') &&
              item.route.startsWith('/profile')
                ? 'text-orange-500'
                : location.pathname === item.route
                  ? 'text-orange-500'
                  : ''
            } font-medium hover:bg-gray-100 lg:justify-normal`}
            onClick={() =>
              navigate(
                item.route === '/profile'
                  ? `/profile/${selectedCharacter?.id ?? defaultCharacter?.id}`
                  : item.route
              )
            }
          >
            {React.createElement(item.icon, { size: 20 })} {item.label}
          </li>
        </ul>
      ))}
      <Separator className="hidden lg:block" />
      <div className="w-full gap-2 px-3 py-4">
        <span
          onClick={() => logout()}
          className="flex cursor-pointer flex-row  items-center justify-center gap-3 rounded-lg p-2 text-[13px] font-medium hover:bg-gray-100 lg:justify-normal"
        >
          <CornerUpLeft size={20} /> Sair
        </span>
      </div>
    </div>
  )
}

export default Sidenav
