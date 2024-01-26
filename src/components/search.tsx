import { Search as SearchIcon } from 'lucide-react'

import { Input } from './ui/input'

function Search() {
  return (
    <div className="fixed flex w-full items-center justify-center gap-0 bg-white p-4 font-navigation font-medium text-blue-200 shadow-menu-shadow lg:fixed lg:left-64 lg:pb-[15px] lg:pl-8">
      <SearchIcon size={15} className="font-medium" />
      <Input
        className="border-none focus-visible:ring-transparent"
        placeholder="Busque um agente"
        type="text"
      />
    </div>
  )
}

export default Search
