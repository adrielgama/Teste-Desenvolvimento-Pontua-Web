import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
} from 'react'

import charactersData from '@/mocks/marvelHeroes.json'

interface CharacterProviderProps {
  children: ReactNode
}

interface Character {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

interface ICharacterContextData {
  selectedCharacter: Character | null
  selectCharacter: (character: Character | null) => void
  getCharacters: (query: string) => Promise<Character[]>
}

const CharacterContext = createContext({} as ICharacterContextData)

export const useCharacterContext = () => useContext(CharacterContext)

export const CharacterProvider: React.FC<CharacterProviderProps> = ({
  children,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  )

  const selectCharacter = useCallback((character: Character | null) => {
    setSelectedCharacter(character)
  }, [])

  const getCharacters = useCallback(
    async (query: string): Promise<Character[]> => {
      const characters: Character[] = charactersData.data.results

      if (query) {
        return characters.filter((character) =>
          character.name.toLowerCase().includes(query.toLowerCase())
        )
      }

      return characters
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
