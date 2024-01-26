/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { Search } from '@/components/search'
import Sidenav from '@/components/sidenav'
import { useCharacterContext } from '@/context/CharacterContext'

import { General } from './General'

export const Profile: React.FC = () => {
  const { selectedCharacter } = useCharacterContext()

  return (
    <>
      <Sidenav />
      <Search />
      <div className="absolute inset-0 bottom-14 top-8 -z-10 flex h-auto flex-col items-center gap-3 bg-white p-4 lg:left-64 lg:top-20 lg:gap-8">
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
          </Routes>
        </div>
      </div>
    </>
  )
}
