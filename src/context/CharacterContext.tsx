import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
} from 'react'

import { fetchMarvelData } from '@/api/fetchData'
import { mockedHeroResponse } from '@/mocks/marvelHeroesMocked'
import { ICharacter, GetCharactersResponse } from '@/types/character'

interface CharacterProviderProps {
  children: ReactNode
}

interface ICharacterContextData {
  selectedCharacter: ICharacter | null
  defaultCharacter: ICharacter | null
  selectCharacter: (character: ICharacter | null, id?: number) => void
  getCharacters: (
    query: string,
    page: number,
    pageSize: number,
    mockData?: boolean | false
  ) => Promise<GetCharactersResponse>
  getCharacterDetails: (id: number) => Promise<void>
}

const CharacterContext = createContext({} as ICharacterContextData)

export const useCharacterContext = () => useContext(CharacterContext)

export const CharacterProvider: React.FC<CharacterProviderProps> = ({
  children,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
    null
  )
  const [defaultCharacter, setDefaultCharacter] = useState<ICharacter | null>(
    null
  )

  const fetchSingleCharacter = useCallback(async (id: number) => {
    try {
      const queryParams = {
        limit: 1,
        offset: 0,
      }

      const response = await fetchMarvelData(`characters/${id}`, queryParams)
      const character: ICharacter | undefined = response.data.data.results[0]

      return character
    } catch (error) {
      console.error('Erro ao obter personagem:', error)
      throw error
    }
  }, [])

  const fetchDefaultCharacter = useCallback(
    async (id: number) => {
      const character = await fetchSingleCharacter(id)

      if (character) {
        setDefaultCharacter(character)
      }
    },
    [fetchSingleCharacter]
  )

  const getCharacterDetails = useCallback(
    async (id: number) => {
      const character = await fetchSingleCharacter(id)

      if (character) {
        setSelectedCharacter(character)
      }
    },
    [fetchSingleCharacter]
  )

  const selectCharacter = useCallback(
    (character: ICharacter | null, id?: number) => {
      setSelectedCharacter(character)
      if (id) {
        fetchDefaultCharacter(id)
      }
    },
    [fetchDefaultCharacter]
  )

  const getCharacters = useCallback(
    async (
      query: string,
      page: number,
      pageSize: number,
      mockedData = false
    ): Promise<GetCharactersResponse> => {
      try {
        if (mockedData) {
          const filteredCharacters = mockedHeroResponse.data.results.filter(
            (character) =>
              character.name.toLowerCase().includes(query.toLowerCase())
          )
          const startIdx = (page - 1) * pageSize
          const endIdx = startIdx + pageSize

          const characters: ICharacter[] = filteredCharacters.slice(
            startIdx,
            endIdx
          )
          const totalItems: number = mockedHeroResponse.data.total

          return {
            data: characters,
            totalItems,
          }
        } else {
          const queryParams = {
            limit: pageSize,
            offset: (page - 1) * pageSize,
            ...(query && { nameStartsWith: query }),
          }

          const response = await fetchMarvelData('characters', queryParams)
          const characters: ICharacter[] = response.data.data.results
          const totalItems: number = response.data.data.total

          return {
            data: characters,
            totalItems,
          }
        }
      } catch (error) {
        console.error('Erro ao obter personagens:', error)
        throw error
      }
    },
    []
  )

  const value = useMemo(
    () => ({
      selectedCharacter,
      defaultCharacter,
      selectCharacter,
      getCharacters,
      getCharacterDetails,
    }),
    [
      selectedCharacter,
      defaultCharacter,
      selectCharacter,
      getCharacters,
      getCharacterDetails,
    ]
  )

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  )
}
