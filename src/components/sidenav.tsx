import React from 'react'

import { CornerUpLeft } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import LogoPontuaBlue from '@/assets/logo_pontua_blue.svg'
import { menuItems } from '@/mocks/menuItemMock'

import { Separator } from './ui/separator'

function Sidenav() {
  const location = useLocation()

  return (
    <div className="fixed bottom-0 flex h-16 w-full items-center justify-evenly shadow-menu-shadow lg:h-screen lg:w-64 lg:flex-col lg:items-start lg:justify-normal lg:space-y-2">
      <img
        src={LogoPontuaBlue}
        alt="Logo PONTUA cor azul"
        className="hidden px-5 py-4 lg:block"
      />

      <Separator className="hidden lg:block" />
      {menuItems.map((item, index) => (
        <ul key={index} className="flex w-full flex-col gap-2 px-3">
          <li
            className={`flex cursor-pointer flex-row items-center justify-center gap-3 rounded-lg p-2 text-[13px] transition-all ${
              location.pathname === item.route ? 'bg-[#F5F6F8]' : ''
            } font-medium hover:bg-gray-100 lg:justify-normal`}
          >
            {React.createElement(item.icon, { size: 20 })} {item.label}
          </li>
        </ul>
      ))}
      <Separator className="hidden lg:block" />
      <div className="w-full gap-2 px-3 py-4">
        <span className="flex cursor-pointer flex-row  items-center justify-center gap-3 rounded-lg p-2 text-[13px] font-medium hover:bg-gray-100 lg:justify-normal">
          <CornerUpLeft size={20} /> Sair
        </span>
      </div>
    </div>
  )
}

export default Sidenav
