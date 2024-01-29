import { Separator } from '@/components/ui/separator'
import { profileNavigation } from '@/mocks'

interface ProfileNavbarProps {
  activeTab: number
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
}

export const ProfileNavbar: React.FC<ProfileNavbarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const handlePageChange = (page: number) => {
    setActiveTab(page)
  }

  return (
    <ul className="flex flex-col gap-4">
      <div className="flex gap-5 px-0">
        {profileNavigation.map(({ label, route, page }) => (
          <li
            key={route}
            className={`${activeTab === page ? 'relative font-bold text-blue-800 after:absolute after:left-0 after:top-[2.45rem] after:w-full after:border-b-2 after:border-blue-800 after:content-[""]' : 'font-medium text-gray-500 hover:text-orange-500'} cursor-pointer`}
            onClick={() => handlePageChange(page)}
          >
            {label}
          </li>
        ))}
      </div>
      <Separator />
    </ul>
  )
}
