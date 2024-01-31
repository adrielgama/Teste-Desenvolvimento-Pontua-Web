import React from 'react'

import { useParams } from 'react-router-dom'

import ProfileGenericList from '@/components/profile/profileGenericLists'
import { ProfileNavbar } from '@/components/profile/profileNavbar'
import { Search } from '@/components/search'
import Sidenav from '@/components/sidenav'
import { useCharacterContext } from '@/context/CharacterContext'
import { updateSessionStorage } from '@/hooks/updateSessionStorage'
import { categoryToListMap } from '@/mocks'
import { speciesList } from '@/mocks/fakers'

import { General } from './General'

const Profile: React.FC = () => {
  const { selectedCharacter, getCharacterDetails } = useCharacterContext()
  const [activeTabs, setActiveTabs] = React.useState<number>(1)
  const { characterId } = useParams()

  const activePageListItem = categoryToListMap.find(
    (item) => item.page === activeTabs
  ) || {
    page: 0,
    list: [],
  }

  React.useEffect(() => {
    const loadProfileData = async () => {
      const currentCharacterId = selectedCharacter?.id || characterId
      const storedCharacterId = sessionStorage.getItem('currentCharacterId')
      updateSessionStorage(String(currentCharacterId), storedCharacterId)

      if (!selectedCharacter) {
        await getCharacterDetails(Number(currentCharacterId))
      }
    }
    loadProfileData()
  }, [selectedCharacter, characterId, getCharacterDetails])

  return (
    <>
      <Sidenav />
      <Search />
      <div className="absolute inset-0 bottom-14 top-8 -z-10 flex h-auto flex-col items-center gap-3 bg-white p-4 lg:left-64 lg:top-20 lg:gap-8 lg:px-9">
        <div className="w-full">
          <div className="flex items-center font-navigation text-2xl">
            <h1 className="font-bold text-blue-800">Perfil</h1>
            <span className="px-2 font-bold text-orange-500">/</span>
            <span className="font-light text-gray-500">
              {selectedCharacter?.name.split('(')[0]}
            </span>
          </div>
        </div>
        <div className="w-full">
          <ProfileNavbar setActiveTab={setActiveTabs} activeTab={activeTabs} />
          {activeTabs === 1 && <General />}
          {activeTabs >= 2 && activeTabs <= 5 && (
            <ProfileGenericList
              page={activePageListItem.page}
              list={activePageListItem.list}
              maxItems={activePageListItem.list === speciesList ? 2 : 7}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Profile
