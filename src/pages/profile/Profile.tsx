/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { Route, Routes } from 'react-router-dom'

import ProfileGenericList from '@/components/profile/profileGenericLists'
import { PorfileNavbar } from '@/components/profile/profileNavbar'
import { Search } from '@/components/search'
import Sidenav from '@/components/sidenav'
import { useCharacterContext } from '@/context/CharacterContext'
import { teamsList, authorsList, powersList, speciesList } from '@/mocks/fakers'

import { General } from './General'

export const Profile: React.FC = () => {
  const { selectedCharacter } = useCharacterContext()
  const categoryToListMap: { [key: string]: string[] } = {
    teams: teamsList,
    powers: powersList,
    species: speciesList,
    authors: authorsList,
  }

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
          <Routes>
            <Route path="/" element={<General />} />
            {['teams', 'powers', 'species', 'authors'].map((category) => (
              <Route
                key={category}
                path={`/${category}`}
                element={
                  <>
                    <PorfileNavbar />
                    <ProfileGenericList
                      list={categoryToListMap[category]}
                      maxItems={category === 'species' ? 2 : 7}
                    />
                  </>
                }
              />
            ))}
          </Routes>
        </div>
      </div>
    </>
  )
}
