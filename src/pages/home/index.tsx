/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { Character } from '@/components/character'
import { Pagination } from '@/components/pagination'
import { Search } from '@/components/search'
import Sidenav from '@/components/sidenav'
import { CharacterSkeleton } from '@/components/skeleton/CharacterCard'
import { Separator } from '@/components/ui/separator'
import { useCharacterContext } from '@/context/CharacterContext'

function Home() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [searchValue, setSearchValue] = React.useState('')
  const { getCharacters } = useCharacterContext()
  const charactersPerPage = 10

  const { data: charactersData, isLoading: isCharactersLoading } = useQuery({
    queryKey: ['characters', currentPage, searchValue],
    queryFn: () => getCharacters(searchValue),
  })

  const currentCharacters = charactersData

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  return (
    <div className="">
      <Sidenav />
      <Search onSearch={handleSearch} />
      {/* //TODO - ajuste de busca, após busca o item está centralizado quando retornado poucos AGENTS */}
      <div className="absolute inset-0 bottom-14 top-16 -z-10 flex h-auto flex-col items-center justify-center gap-3 bg-white p-4 lg:left-64 lg:top-20 lg:gap-8">
        <div className="flex flex-col gap-3 overflow-scroll px-4">
          <div className="grid grid-cols-1 gap-3 lg:grid lg:grid-cols-4">
            {currentCharacters
              ?.slice(0, 8)
              .map(({ id, name, description, thumbnail }) => (
                <Character
                  key={id}
                  name={name}
                  description={description}
                  image={`${thumbnail.path}.${thumbnail.extension}`}
                />
              ))}
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {currentCharacters
              ?.slice(8)
              .map(({ id, name, description, thumbnail }) => (
                <Character
                  key={id}
                  name={name}
                  description={description}
                  image={`${thumbnail.path}.${thumbnail.extension}`}
                />
              ))}
          </div>
          {(!currentCharacters || isCharactersLoading) && <CharacterSkeleton />}
        </div>
        <Separator className="hidden lg:block lg:max-w-7xl" />
        {/* //TODO - organizar a paginação  */}
        <Pagination
          currentPage={currentPage}
          totalItems={charactersData?.length || 0}
          itemsPerPage={charactersPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Home
