import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
} from 'react'

import charactersData from '@/mocks/marvelHeroes.json'
import { ICharacter, GetCharactersResponse } from '@/types/character'

interface CharacterProviderProps {
  children: ReactNode
}

interface ICharacterContextData {
  selectedCharacter: ICharacter | null
  selectCharacter: (character: ICharacter | null) => void
  getCharacters: (
    query: string,
    page: number,
    pageSize: number
  ) => Promise<GetCharactersResponse>
}

const CharacterContext = createContext({} as ICharacterContextData)

export const useCharacterContext = () => useContext(CharacterContext)

export const CharacterProvider: React.FC<CharacterProviderProps> = ({
  children,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
    null
  )

  const selectCharacter = useCallback((character: ICharacter | null) => {
    setSelectedCharacter(character)
  }, [])

  const getCharacters = useCallback(
    async (
      query: string,
      page: number,
      pageSize: number
    ): Promise<GetCharactersResponse> => {
      const characters: ICharacter[] = charactersData.data.results

      const filteredCharacters = query
        ? characters.filter((character) =>
            character.name.toLowerCase().includes(query.toLowerCase())
          )
        : characters

      const startIndex = (page - 1) * pageSize
      const endIndex = startIndex + pageSize
      const paginatedCharacters = filteredCharacters.slice(startIndex, endIndex)

      return {
        data: paginatedCharacters,
        totalItems: filteredCharacters.length,
      }
    },
    []
  )

  const value = useMemo(
    () => ({
      selectedCharacter,
      selectCharacter,
      getCharacters,
    }),
    [selectedCharacter, selectCharacter, getCharacters]
  )

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  )
}
