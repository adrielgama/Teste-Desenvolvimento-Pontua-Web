import { useLocation } from 'react-router-dom'

import { Separator } from '@/components/ui/separator'
import { profileNavigation } from '@/mocks/menuItemMock'

export const PorfileNavbar = () => {
  const location = useLocation()

  return (
    <ul className="flex flex-col gap-4">
      <div className="flex gap-5 px-0">
        {profileNavigation.map(({ label, route }) => (
          <li
            key={route}
            className={`${location.pathname === route ? 'relative font-bold text-blue-800 after:absolute after:left-0 after:top-[2.45rem] after:w-full after:border-b-2 after:border-blue-800 after:content-[""]' : 'font-medium text-gray-500 hover:text-orange-500'} cursor-pointer`}
          >
            {label}
          </li>
        ))}
      </div>
      <Separator />
    </ul>
  )
}
