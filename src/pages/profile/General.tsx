import { PorfileNavbar } from '@/components/profileNavbar'
import { useCharacterContext } from '@/context/CharacterContext'
import { ICharacter } from '@/types/character'

export const General = () => {
  const { selectedCharacter } = useCharacterContext()
  const { name, description, thumbnail }: ICharacter = selectedCharacter!

  return (
    <div>
      <PorfileNavbar />
      <div className="mt-7 w-full">
        <div>
          <img
            src={`${thumbnail.path}.${thumbnail.extension}`}
            alt={name}
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
