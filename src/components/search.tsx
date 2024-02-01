import { useState } from 'react'

import { Search as SearchIcon } from 'lucide-react'

import { Input } from './ui/input'

interface SearchProps {
  onSearch?: (value: string) => void
}

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (value: string) => {
    setSearchValue(value)
    onSearch && onSearch(value)
  }

  return (
    <div
      className={`${!onSearch && 'h-0 lg:h-[72px]'} fixed flex w-full items-center justify-center gap-0 bg-white p-4 font-navigation font-medium text-blue-200 shadow-menu-shadow lg:fixed lg:left-64 lg:pb-[15px] lg:pl-8`}
      aria-label="search-input"
    >
      {onSearch && (
        <>
          <SearchIcon size={15} className="font-medium" />
          <Input
            className="border-none focus-visible:ring-transparent"
            placeholder="Busque um agente"
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </>
      )}
    </div>
  )
}
