/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { Pagination } from '@/components/pagination'
import { Search } from '@/components/search'
import Sidenav from '@/components/sidenav'
import { CharacterSkeleton } from '@/components/skeleton/CharacterCard'
import { Separator } from '@/components/ui/separator'
import { useCharacterContext } from '@/context/CharacterContext'
import { useDebounce } from '@/hooks/useDebounce'
import { GetCharactersResponse } from '@/types/character'

import CharacterGrid from './CharacterGrid'

const ITEMS_PER_PAGE = 10

const Home: React.FC = () => {
  const { getCharacters } = useCharacterContext()
  const [searchValue, setSearchValue] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isDebouncing, setIsDebouncing] = React.useState(false)

  const debouncedSearchValue = useDebounce(searchValue, 500)

  const {
    data: charactersData,
    isLoading: isCharactersLoading,
    refetch,
  } = useQuery<GetCharactersResponse, Error>({
    queryKey: ['characters', debouncedSearchValue, currentPage],
    queryFn: () =>
      getCharacters(debouncedSearchValue, currentPage, ITEMS_PER_PAGE),
    staleTime: 30000,
    enabled: !isDebouncing,
  })

  const currentCharacters = charactersData?.data || []
  const totalItems = charactersData?.totalItems || 0
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
    setCurrentPage(1)
    setIsDebouncing(true)
  }

  React.useEffect(() => {
    if (isDebouncing) {
      const timer = setTimeout(() => {
        setIsDebouncing(false)
        refetch()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isDebouncing, refetch])

  return (
    <>
      <Sidenav />
      <Search onSearch={handleSearch} />
      <div className="absolute inset-0 bottom-14 top-16 -z-10 flex h-auto flex-col items-center gap-3 bg-white p-4 lg:left-64 lg:top-20 lg:gap-8">
        <div className="w-full pb-36">
          {(isDebouncing || isCharactersLoading) && <CharacterSkeleton />}
          {!isDebouncing && !isCharactersLoading && (
            <CharacterGrid currentCharacters={currentCharacters} />
          )}
        </div>
        <div className="fixed bottom-16 z-10 flex w-full flex-col items-center justify-center bg-white lg:bottom-0 lg:h-36">
          <Separator className="fixed bottom-32 hidden lg:block lg:max-w-7xl" />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Home
