import React from 'react'

import { Character } from '@/components/character'
import { Pagination } from '@/components/pagination'
import Search from '@/components/search'
import Sidenav from '@/components/sidenav'
import { Separator } from '@/components/ui/separator'
import characters from '@/mocks/marvelHeroes.json'

function Home() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const charactersPerPage = 10

  const indexOfLastCharacter = currentPage * charactersPerPage
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage
  const currentCharacters = characters.data.results.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  )

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="">
      <Sidenav />
      <Search />
      <div className="absolute inset-0 bottom-14 top-16 -z-10 flex h-auto flex-col items-center justify-center gap-3 bg-white p-4 lg:left-64 lg:top-20 lg:gap-8">
        <div className="flex flex-col gap-3 overflow-scroll px-4">
          <div className="grid grid-cols-1 gap-3 lg:grid lg:grid-cols-4">
            {currentCharacters
              .slice(0, 8)
              .map(({ name, description, id, thumbnail }) => (
                <Character
                  key={id}
                  name={name}
                  description={description}
                  image={`${thumbnail.path}.${thumbnail.extension}`}
                />
              ))}
          </div>
          <div className="grid gap-3 lg:grid-cols-2 ">
            {currentCharacters
              .slice(8)
              .map(({ name, description, id, thumbnail }) => (
                <Character
                  key={id}
                  name={name}
                  description={description}
                  image={`${thumbnail.path}.${thumbnail.extension}`}
                />
              ))}
          </div>
        </div>
        <Separator className="hidden lg:block lg:max-w-7xl" />
        <Pagination
          currentPage={currentPage}
          totalItems={characters.data.results.length}
          itemsPerPage={charactersPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Home
