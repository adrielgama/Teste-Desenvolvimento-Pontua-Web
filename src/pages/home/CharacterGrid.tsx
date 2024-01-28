import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Character as CharacterComponent } from '@/components/character'
import { useCharacterContext } from '@/context/CharacterContext'
import { ICharacter } from '@/types/character'

interface CharacterGridProps {
  currentCharacters: ICharacter[]
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ currentCharacters }) => {
  const { selectCharacter } = useCharacterContext()
  const navigate = useNavigate()

  const handleSelectedCharacter = (id: number) => {
    const selectedCharacter = currentCharacters.find(
      (character) => character.id === id
    )
    selectCharacter(selectedCharacter || null)
    navigate('/profile')
  }

  return (
    <div
      className={`grid grid-cols-1 gap-3 lg:grid-flow-row lg:grid-cols-2 lg:grid-rows-3 xl:grid-cols-4`}
    >
      {currentCharacters.map(({ id, name, description, thumbnail }, index) => (
        <div
          key={id}
          className={`${
            index < 8
              ? `xl:col-span-1 xl:row-span-1`
              : `xl:col-span-2 xl:row-span-1`
          }`}
          onClick={() => handleSelectedCharacter(id)}
        >
          <CharacterComponent
            key={id}
            name={name}
            description={description}
            image={`${thumbnail.path}.${thumbnail.extension}`}
          />
        </div>
      ))}
    </div>
  )
}

export default CharacterGrid
